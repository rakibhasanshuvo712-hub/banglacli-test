$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$logOut = Join-Path $root "smoke.out.log"
$logErr = Join-Path $root "smoke.err.log"

$proc = Start-Process -FilePath "npm.cmd" `
  -ArgumentList "--prefix", (Join-Path $root "nextjs-website"), "run", "dev" `
  -PassThru -WindowStyle Hidden `
  -RedirectStandardOutput $logOut -RedirectStandardError $logErr

try {
  $ready = $false
  for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Seconds 1
    try {
      $response = Invoke-WebRequest -UseBasicParsing "http://localhost:3000/" -TimeoutSec 3
      if ($response.StatusCode -eq 200) {
        $html = $response.Content
        $ready = $true
        break
      }
    } catch {
      # Server is still starting.
    }
  }

  if (-not $ready) {
    throw "Dev server did not become ready. See $logErr"
  }

  Write-Output "home: 200"
  foreach ($needle in @("Est.", "2014", "bouquet=tulip-reverie#order", "hello@bloomandstem.example")) {
    if ($html -notlike "*$needle*") {
      throw "Homepage is missing expected content: $needle"
    }
    Write-Output "home contains: $needle"
  }

  $checks = @(
    @{ Name = "newsletter invalid email"; Url = "http://localhost:3000/api/newsletter"; Data = '{"email":"not-an-email"}'; Expected = 400 },
    @{ Name = "newsletter honeypot"; Url = "http://localhost:3000/api/newsletter"; Data = '{"email":"test@example.com","website":"spam"}'; Expected = 202 },
    @{ Name = "newsletter malformed json"; Url = "http://localhost:3000/api/newsletter"; Data = 'not-json'; Expected = 400 },
    @{ Name = "order invalid payload"; Url = "http://localhost:3000/api/orders"; Data = '{"name":""}'; Expected = 400 }
  )

  foreach ($check in $checks) {
    $bodyFile = Join-Path $root "smoke-body.txt"
    $code = [int](curl.exe -s -o $bodyFile -w "%{http_code}" -X POST $check.Url -H "Content-Type: application/json" --data $check.Data)
    if ($code -ne $check.Expected) {
      $body = Get-Content $bodyFile -Raw
      throw "$($check.Name): expected $($check.Expected), got $code - $body"
    }
    Write-Output "$($check.Name): $code"
  }

  Write-Output "SMOKE TEST PASSED"
} finally {
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
  Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object { $_.CommandLine -like "*nextjs-website*" -and $_.CommandLine -like "*dev*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
