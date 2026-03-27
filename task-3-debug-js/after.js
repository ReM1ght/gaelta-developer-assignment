document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");

  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const productId = btn.getAttribute("data-product");
      const qtyInput = document.querySelector("#qty-" + productId);
      const quantity = qtyInput ? qtyInput.value : 1;

      fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          qty: Number(quantity),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pridane do kosika", data);
        })
        .catch((error) => {
          console.error("Chyba pri pridavani do kosika", error);
        });
    });
  });
});
