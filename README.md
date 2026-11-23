This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Studio details

Business details (name, established year, phone, email and address) live in
`lib/site.ts`. They are shared by the home page, layout and footer — update them
there instead of editing individual components. The shipped phone/email values
are placeholders; replace them with real contact details before launch.

## Order email notifications

When a customer submits the order form, `POST /api/orders` validates the details and sends a notification email to the studio using [Resend](https://resend.com).

One-time setup:

1. Create a free account at [resend.com](https://resend.com) and create an API key in **API Keys**.
2. Copy the example env file and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   | Variable                    | Meaning                                                              |
   | --------------------------- | -------------------------------------------------------------------- |
   | `RESEND_API_KEY`            | Your Resend API key (`re_...`)                                        |
   | `ORDER_NOTIFICATION_EMAIL`  | Your inbox — every new order is delivered here                        |
   | `ORDER_FROM_EMAIL`          | Verified Resend sender (defaults to `onboarding@resend.dev`)          |

   > `onboarding@resend.dev` is handy for local testing but only sends to the email you signed up with. Verify your own domain in Resend and set `ORDER_FROM_EMAIL=Bloom & Stem <orders@yourdomain.com>` before going live.

3. Restart `npm run dev`, place a test order, and check your inbox. The customer's optional email is used as the **Reply-To**, so you can answer directly from your mail app.

For deployment on Vercel, add the same three variables under **Project Settings → Environment Variables** and redeploy. Never commit `.env.local`.

If the variables are missing, the API returns `503` and the form shows a "call the studio" message instead of pretending the order went through.

## Newsletter signups

The "Bloom notes" form in the footer posts to `POST /api/newsletter`, which
adds the subscriber to a Resend audience. Create an audience in the Resend
dashboard (**Contacts → Audiences**) and set these variables in `.env.local`:

| Variable              | Meaning                                          |
| --------------------- | ------------------------------------------------ |
| `RESEND_API_KEY`      | Same API key used by the order endpoint          |
| `RESEND_AUDIENCE_ID`  | The ID of the audience that receives signups     |

Re-subscribing an existing email is treated as success. When either variable is
missing the endpoint returns `503` and the form tells visitors to email the
studio rather than faking a successful signup. Add the same two variables to
Vercel when deploying.

Product cards link to `/?bouquet=<product-id>#order`, so the order form opens
with the clicked arrangement preselected.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
