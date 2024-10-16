document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".product__button").forEach(button => {
        button.addEventListener("click", async () => {
            const productId = button.getAttribute("data-productId");

            await fetch("/cart/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId }),
            })
        });
    });
});