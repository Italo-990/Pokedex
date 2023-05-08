const divInfoPokemon = document.querySelector('.InfoPokemon')
const divBaseStatus = document.querySelector('.baseStatus')
//FUNÇÕES
const errorNoAnimatedImage = ()=>{
    divInfoPokemon.innerHTML = `<p style="padding:16px;">Try pokemon under 650</p>`
}
const errorPromisse = ()=>{
    divInfoPokemon.innerHTML = `<p style="padding:16px;">Not found, try again</p>`
}
const showScreen = ({icon,image,id,attack,hp,defense})=>{
    //DIV INFO POKEMON
    divInfoPokemon.innerHTML = 
    `<img class="pokemonImg"alt="pokemon"src="${image}">
    <img class="pokemonIcon"alt="iconPokemon"src="${icon}">
    <span class="pokemonName">${data.name} - ${id}</span>`
    //FIM DIV INFO POKEMON
    
    //BASE STATUS INFO
    divBaseStatus.innerHTML= 
    `<ul>
        <li>
            <span>Attack - ${data.attack}</span>
            <div class="statusDivAttack" style="width:calc(${attack}px * 2.5);"></div>
        </li>
        <li>
            <span>Hp - ${data.hp}</span>
            <div class="statusDivHp" style="width:calc(${hp}px * 2.5);"></div>
        </li>
        <li>
            <span>Defense - ${data.defense}</span>
            <div class="statusDivDefense" style="width:calc(${defense}px * 2.5);"></div>
        </li>
    </ul>`

//REMOVE FOCUS
document.querySelector('.inputPokedex').blur()
}
const filterResponse = (response)=>{
   if(response.id >= 650){
        errorNoAnimatedImage()
   }else{
        const data = {
            name : response.name,
            id: response.id,
            image: response['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
            attack: response.stats[1].base_stat,
            hp: response.stats[0].base_stat,
            defense: response.stats[2].base_stat,
            icon: response['sprites']['versions']['generation-vii']['icons']['front_default']
        }
        showScreen(data)
   }
}
const requestApi  = async (pokemon)=>{
    //CARREGAR REQUISIÇÃO
    loadingFetch()
    //TENTAR A PROMISSE
    try{
        const response = await(await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json()
        filterResponse(response)
    }catch(e){
        //ERROR
        console.log(e)
        errorPromisse()
    }
}
const loadingFetch = ()=>{
    divInfoPokemon.innerHTML = `<img class="pokebolaImg"src="imagens/pokebola.svg">`
}
//FIM FUNÇÕES


//PRIMEIRA REQUSIÇÃO AO ABRIR O SITE
requestApi('1')
//EVENT SUBMIT
document.querySelector('.submitPokedex').addEventListener('click',(e)=>{
    e.preventDefault()
    requestApi(document.querySelector('.inputPokedex').value.toLowerCase())
})
document.querySelector('.submitPokedex').addEventListener('touchstart',(e)=>{
    e.preventDefault()
    requestApi(document.querySelector('.inputPokedex').value.toLowerCase() )
})
