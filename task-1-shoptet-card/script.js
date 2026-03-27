document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");
  const now = new Date();

  cards.forEach((card) => {
    const createdAtRaw = card.dataset.createdAt;
    const price = parseFloat(card.dataset.price || "0");
    const badge = card.querySelector(".badge-new");
    const shippingNote = card.querySelector(".shipping-note");

    // 1) Novinka pre produkty vytvorene za poslednych 30 dni
    if (createdAtRaw && badge) {
      const createdAt = new Date(createdAtRaw);
      const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (!Number.isNaN(diffDays) && diffDays <= 30) {
        badge.hidden = false;
      }
    }

    // 2) Text pod cenou iba ak je cena produktu nizsia ako 50
    if (shippingNote && price < 50) {
      shippingNote.hidden = false;
    }
  });
});
