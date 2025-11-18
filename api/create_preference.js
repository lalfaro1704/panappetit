// api/create_preference.js

const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, quantity, unit_price, currency_id } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            quantity,
            unit_price,
            currency_id: currency_id || "CLP",
          },
        ],
        back_urls: {
          success: "https://www.panappetit.cl?status=success",
          failure: "https://www.panappetit.cl?status=failure",
          pending: "https://www.panappetit.cl?status=pending",
        },
        auto_return: "approved",
      },
    });

    // result tiene la preferencia, el id viene en result.id o result.body.id según versión
    return res.status(200).json({ id: result.id || result.body?.id });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
};
