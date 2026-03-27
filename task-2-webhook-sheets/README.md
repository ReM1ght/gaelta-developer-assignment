# Zadanie 2 - Shoptet webhook -> Google Sheets

## Navrh postupu

1. V Shoptete nastavim webhook na udalost vytvorenia objednavky.
2. Webhook bude volat endpoint (napr. Node.js API).
3. Endpoint overi payload (podpis/secret), namapuje data a pripravi riadok pre tabulku.
4. Data sa zapisu do Google Sheets cez Google Sheets API.
5. Pouzijem idempotenciu (dedupe podla order id), aby sa objednavka nezapisala 2x.
6. Doplni sa logovanie a retry mechanizmus.

## Data z objednavky

- order_id
- created_at
- status
- customer_name
- customer_email
- customer_phone
- billing_country / shipping_country
- payment_method
- shipping_method
- products (sku, nazov, qty, jednotkova cena)
- subtotal, shipping_price, discount_total, total_price, currency
- poznamka klienta (ak je k dispozicii)

## Volba nastroja

### n8n/Make (MVP)

- rychle nasadenie
- menej custom kodu
- jednoducha sprava scenarov

### Vlastny endpoint (produkcia)

- vyssia kontrola nad validaciou a bezpecnostou
- lepsia idempotencia
- pokrocila obchodna logika
- vhodne pre vacsie objemy dat

V tomto repozitari je ukazka vlastneho Node.js endpointu v subore `webhook-example.js`.

## Kam to nastavit v Shoptete

- Administracia -> Prepojenia / API -> Webhooky
- Pridat URL endpointu + udalost objednavky
- Otestovat testovacou objednavkou a skontrolovat zapis v Google Sheets
