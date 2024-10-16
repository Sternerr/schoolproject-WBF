const hamburger = document.getElementById("hamburger");
const primaryMennu = document.getElementById("primaryMenu");
const container = document.querySelector('.header__container');

hamburger.addEventListener("click", () => {
    const b = hamburger.getAttribute("data-isclosed") === "true";

    hamburger.setAttribute("data-isclosed", `${!b}`);
    primaryMennu.setAttribute("data-isclosed", `${!b}`);
    container.classList.toggle("nav-open")
});
