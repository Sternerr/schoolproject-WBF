const dropdown = document.querySelector(".dropdown");
const target = document.querySelector(".dropdown__content");

dropdown.addEventListener("click", (e) => {
    if(e.target == dropdown) {
        target.classList.toggle("active")
    }
})
