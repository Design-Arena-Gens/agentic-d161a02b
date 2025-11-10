import { NextRequest, NextResponse } from 'next/server';
import { getOrderStatus, getInventoryStatus, getAllInventory } from '@/lib/sheets';
import { parseWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;

    if (!body) {
      return new NextResponse('No message body', { status: 400 });
    }

    const { command, query } = parseWhatsAppMessage(body);
    let responseMessage = '';

    switch (command) {
      case 'order':
        if (!query) {
          responseMessage = '❌ Please provide an order ID.\n\nExample: order ORD123';
        } else {
          const order = await getOrderStatus(query);
          if (order) {
            responseMessage = `📦 *Order Status*\n\n` +
              `Order ID: ${order.orderId}\n` +
              `Customer: ${order.customerName}\n` +
              `Status: ${order.status}\n` +
              `Date: ${order.date}`;
          } else {
            responseMessage = `❌ Order "${query}" not found.\n\nPlease check the order ID and try again.`;
          }
        }
        break;

      case 'inventory':
        if (!query) {
          const inventory = await getAllInventory();
          if (inventory.length > 0) {
            responseMessage = `📊 *Full Inventory*\n\n` +
              inventory.map(item =>
                `• ${item.productName}: ${item.quantity} (${item.status})`
              ).join('\n');
          } else {
            responseMessage = '❌ No inventory data found.';
          }
        } else {
          const product = await getInventoryStatus(query);
          if (product) {
            responseMessage = `📦 *Inventory Status*\n\n` +
              `Product: ${product.productName}\n` +
              `Quantity: ${product.quantity}\n` +
              `Status: ${product.status}`;
          } else {
            responseMessage = `❌ Product "${query}" not found.\n\nPlease check the product name and try again.`;
          }
        }
        break;

      case 'help':
        responseMessage = `🤖 *WhatsApp Bot Commands*\n\n` +
          `📦 *ORDER [ID]*\n` +
          `Check order status\n` +
          `Example: order ORD123\n\n` +
          `📊 *INVENTORY [Product]*\n` +
          `Check specific product stock\n` +
          `Example: inventory laptop\n\n` +
          `📋 *INVENTORY*\n` +
          `View all inventory\n\n` +
          `❓ *HELP*\n` +
          `Show this menu`;
        break;

      default:
        responseMessage = `❓ Unknown command.\n\nType "help" to see available commands.`;
    }

    // Return TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${responseMessage}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);

    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>❌ Sorry, an error occurred. Please try again later.</Message>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'WhatsApp webhook is running',
    endpoints: {
      webhook: '/api/webhook'
    }
  });
}
