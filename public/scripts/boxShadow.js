function addBoxShadow() {
    search.classList.add("boxShadow")
    btn.classList.add("boxShadow")
}
function removeBoxShadow() {
    search.classList.remove("boxShadow")
    btn.classList.remove("boxShadow")
}
let search = document.querySelector("#modal form input")
let btn = document.querySelector("#modal form button")
search.addEventListener("focus", addBoxShadow)
search.addEventListener("blur", removeBoxShadow)