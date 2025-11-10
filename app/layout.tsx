import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WhatsApp Inventory Bot',
  description: 'WhatsApp chatbot for order and inventory management via Google Sheets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
