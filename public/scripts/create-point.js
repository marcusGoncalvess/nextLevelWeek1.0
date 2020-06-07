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
    loading.style.bottom = "50px"
    loading.style.left = "220px"
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

function handleSelectedItem(event){
    const itemId = event.target.dataset.id
    const itemLi = event.target
    itemLi.classList.toggle("selected")

// verificar se existem itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
//se já estiver selecionado, tirar da seleção
    if(alreadySelected != -1) {
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems
    } else { // se não estiver selecionado, add à seleção
        selectedItems.push(itemId)
    }
// atualizar o input hidden
    collectedItems.value = selectedItems
}
//variaveis que serão usadas na function handleSelectedItem
let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

//pegar todos os li dos itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//event do input stage
document.querySelector("select[name=uf]")
.addEventListener("change", getCities)