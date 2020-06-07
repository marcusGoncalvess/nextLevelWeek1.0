function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() ) //return res.json()
    .then(states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    //Loading
    let fatherLoading = document.querySelector("select[name=city]").parentNode
    let loading = document.createElement("img")
    loading.setAttribute('src',"../assets/loading.gif")
    loading.style.width = "90px"
    loading.style.height = "50px"
    loading.style.position = "relative"
    loading.style.bottom = "90px"
    loading.style.left = "70px"
    fatherLoading.appendChild(loading)


    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Recuperando o nome do estado selecionado
    stateInput.value = event.target.options[event.target.selectedIndex].text


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url).then( res => res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
        loading.remove()
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)