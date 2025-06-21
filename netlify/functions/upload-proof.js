exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      name,
      email,
      address,
      total,
      proofUrl,
      items,
    } = data;

    const whatsappNumber = "2348074143841"; // your WhatsApp number

    let message = `*New Order Received!*%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Email:* ${email}%0A`;
    message += `*Address:* ${address}%0A%0A`;
    message += `*Items Ordered:*%0A`;

    items.forEach(item => {
      message += `- ${item.name} (${item.price}) x${item.quantity}%0A`;
    });

    message += `%0A*Total:* ${total}%0A`;
    message += `%0A*Proof of Payment:* ${proofUrl}%0A`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, whatsappUrl }),
    };

  } catch (error) {
    console.error("Order submission error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
