/**
 * Priklad webhook endpointu:
 * Shoptet -> Node.js endpoint -> Google Sheets
 *
 * Poznamka: toto je demo kod, pred nasadenim dopln:
 * - realnu validaciu podpisu webhooku
 * - databazu na idempotenciu
 * - robustne retry a monitoring
 */

import express from "express";
import { google } from "googleapis";

const app = express();
app.use(express.json());

const processedKeys = new Set(); // demo dedupe ulozisko

function isValidWebhook(req) {
  const secret = req.headers["x-webhook-secret"];
  return secret && secret === process.env.WEBHOOK_SECRET;
}

function mapShoptetOrder(payload) {
  const items = (payload.items || []).map((item) => ({
    sku: item.sku || "",
    name: item.name || "",
    qty: Number(item.quantity || 0),
    price: Number(item.unit_price || 0),
  }));

  return {
    id: payload.order_id,
    createdAt: payload.created_at,
    status: payload.status,
    customerName: payload.customer?.name || "",
    customerEmail: payload.customer?.email || "",
    customerPhone: payload.customer?.phone || "",
    country: payload.shipping_address?.country || payload.billing_address?.country || "",
    paymentMethod: payload.payment_method || "",
    shippingMethod: payload.shipping_method || "",
    subtotal: Number(payload.subtotal || 0),
    shippingPrice: Number(payload.shipping_price || 0),
    discountTotal: Number(payload.discount_total || 0),
    total: Number(payload.total || 0),
    currency: payload.currency || "EUR",
    items,
  };
}

async function appendToSheet(order) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const row = [
    order.id,
    order.createdAt,
    order.status,
    order.customerName,
    order.customerEmail,
    order.customerPhone,
    order.country,
    order.paymentMethod,
    order.shippingMethod,
    order.subtotal,
    order.shippingPrice,
    order.discountTotal,
    order.total,
    order.currency,
    order.items.map((i) => `${i.sku} x${i.qty}`).join(" | "),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Orders!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

app.post("/webhooks/shoptet/order-created", async (req, res) => {
  try {
    if (!isValidWebhook(req)) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    const order = mapShoptetOrder(req.body);
    const dedupeKey = `shoptet-order-${order.id}`;

    if (processedKeys.has(dedupeKey)) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    await appendToSheet(order);
    processedKeys.add(dedupeKey);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return res.status(500).json({ ok: false, error: "Processing failed" });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Webhook server running on port ${port}`);
});
