import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });

  try {
    const { title, quantity, unit_price, currency_id } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity,
          unit_price,
          currency_id: currency_id || "CLP",
        },
      ],
      back_urls: {
        success: "https://panappetit.vercel.app?status=success",
        failure: "https://panappetit.vercel.app?status=failure",
        pending: "https://panappetit.vercel.app?status=pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({ id: response.body.id });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
}

