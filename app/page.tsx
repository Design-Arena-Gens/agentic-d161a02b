import React from 'react';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6'
    }}>
      <h1 style={{ color: '#25D366', marginBottom: '10px' }}>📱 WhatsApp Inventory Bot</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Connected to Google Sheets for real-time order and inventory tracking</p>

      <div style={{
        background: '#f5f5f5',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: '0' }}>🚀 Setup Instructions</h2>

        <h3>1. Configure Environment Variables</h3>
        <p>Set the following in your Vercel project settings:</p>
        <ul>
          <li><code>TWILIO_ACCOUNT_SID</code> - Your Twilio Account SID</li>
          <li><code>TWILIO_AUTH_TOKEN</code> - Your Twilio Auth Token</li>
          <li><code>TWILIO_WHATSAPP_NUMBER</code> - Your Twilio WhatsApp number (e.g., +14155238886)</li>
          <li><code>GOOGLE_SHEET_ID</code> - Your Google Sheet ID</li>
          <li><code>GOOGLE_SHEETS_CREDENTIALS</code> - Service account JSON credentials</li>
        </ul>

        <h3>2. Setup Google Sheets</h3>
        <p>Create a Google Sheet with two tabs:</p>
        <ul>
          <li><strong>Orders</strong> tab with columns: Order ID | Customer Name | Status | Date</li>
          <li><strong>Inventory</strong> tab with columns: Product Name | Quantity | Status</li>
        </ul>

        <h3>3. Setup Twilio WhatsApp</h3>
        <ul>
          <li>Sign up for <a href="https://www.twilio.com/try-twilio" target="_blank" rel="noopener">Twilio</a></li>
          <li>Enable WhatsApp sandbox or get approved WhatsApp number</li>
          <li>Set webhook URL to: <code>https://agentic-d161a02b.vercel.app/api/webhook</code></li>
        </ul>

        <h3>4. Create Google Service Account</h3>
        <ul>
          <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener">Google Cloud Console</a></li>
          <li>Create a service account with Google Sheets API access</li>
          <li>Share your Google Sheet with the service account email</li>
          <li>Download JSON credentials and set as <code>GOOGLE_SHEETS_CREDENTIALS</code></li>
        </ul>
      </div>

      <div style={{
        background: '#e8f5e9',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: '0' }}>💬 Available Commands</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#25D366', marginBottom: '5px' }}>ORDER [ID]</h3>
          <p style={{ margin: '0' }}>Check order status</p>
          <code style={{
            display: 'block',
            background: 'white',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>order ORD123</code>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#25D366', marginBottom: '5px' }}>INVENTORY [Product]</h3>
          <p style={{ margin: '0' }}>Check specific product stock</p>
          <code style={{
            display: 'block',
            background: 'white',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>inventory laptop</code>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#25D366', marginBottom: '5px' }}>INVENTORY</h3>
          <p style={{ margin: '0' }}>View all inventory</p>
          <code style={{
            display: 'block',
            background: 'white',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>inventory</code>
        </div>

        <div>
          <h3 style={{ color: '#25D366', marginBottom: '5px' }}>HELP</h3>
          <p style={{ margin: '0' }}>Show command menu</p>
          <code style={{
            display: 'block',
            background: 'white',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>help</code>
        </div>
      </div>

      <div style={{
        background: '#fff3e0',
        padding: '20px',
        borderRadius: '8px',
        borderLeft: '4px solid #ff9800'
      }}>
        <h3 style={{ marginTop: '0' }}>⚠️ Important Notes</h3>
        <ul style={{ marginBottom: '0' }}>
          <li>Webhook endpoint: <code>/api/webhook</code></li>
          <li>Ensure Google Sheet is shared with service account email</li>
          <li>Twilio sandbox requires users to send "join [code]" first</li>
          <li>Response times depend on Google Sheets API latency</li>
        </ul>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#999' }}>
        <p>Built with Next.js, Twilio, and Google Sheets API</p>
      </div>
    </div>
  );
}
