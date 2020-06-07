function addBoxShadowState() {
    searchState.classList.add("boxShadow")
}
function addBoxShadowCity() {
    searchCity.classList.add("boxShadow")
}

function removeBoxShadowState() {
    searchState.classList.remove("boxShadow")
}

function removeBoxShadowCity() {
    searchCity.classList.remove("boxShadow")
}

let searchState = document.querySelector("#modal form select[name=uf]")
let searchCity = document.querySelector("#modal form select[name=city]")
let btn = document.querySelector("#modal form button")

searchState.addEventListener("focus", addBoxShadowState)
searchState.addEventListener("blur", removeBoxShadowState)

searchCity.addEventListener("focus", addBoxShadowCity)
searchCity.addEventListener("blur", removeBoxShadowCity)