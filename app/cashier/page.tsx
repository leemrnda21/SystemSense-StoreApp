import { redirect } from 'next/navigation'

export default function CashierRedirectPage() {
  // Expose a short URL for the Cashier/POS page.
  // This file intentionally does a server-side redirect to the existing
  // App Router page at /dashboard/cashier so we don't change any UI.
  redirect('/dashboard/cashier')
}
