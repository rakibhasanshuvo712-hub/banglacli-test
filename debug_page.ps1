$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$proc = Start-Process -FilePath "npm.cmd" `
  -ArgumentList "--prefix", (Join-Path $root "nextjs-website"), "run", "dev" `
  -PassThru -WindowStyle Hidden `
  -RedirectStandardOutput (Join-Path $root "debug.out.log") `
  -RedirectStandardError (Join-Path $root "debug.err.log")
try {
  for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Seconds 1
    try {
      $html = (Invoke-WebRequest -UseBasicParsing "http://localhost:3000/" -TimeoutSec 3).Content
      if ($html) { break }
    } catch { }
  }
  [System.IO.File]::WriteAllText((Join-Path $root "debug-home.html"), $html)
  $idx = $html.IndexOf("Est.")
  if ($idx -ge 0) {
    Write-Output $html.Substring([Math]::Max(0, $idx - 200), 500)
  } else {
    Write-Output "Est. not found in page"
  }
} finally {
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
  Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object { $_.CommandLine -like "*nextjs-website*" -and $_.CommandLine -like "*dev*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
