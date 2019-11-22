const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main')

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(trainers => addTrainers(trainers))



function addTrainers(trainers) {
    trainers.forEach(trainer => {
        addTrainer(trainer)
    })
}

function addTrainer(trainer) {
    // const main = document.querySelector('main')
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('data-id', `${trainer.id}`)
    card.innerHTML = `<p>${trainer.name}</p> <button data-trainer-id=${trainer.id}>Add Pokemon</button>`
    const ulList = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
        const liList = document.createElement('li')
        liList.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
        ulList.appendChild(liList)
    })
    card.appendChild(ulList)
    main.appendChild(card)
}


main.addEventListener('click', (event) => {
    if (event.target.innerText === 'Add Pokemon') {
        fetch(POKEMONS_URL, reqObj(event))
        .then(resp => resp.json())
        .then(pokemon => console.log(pokemon))
    } else if (event.target.innerText === 'Release') {
        //Do something here
    }
})



const reqObj = (event) => {
    
  return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: event.target.dataset.trainerId
        })
    }
}










})