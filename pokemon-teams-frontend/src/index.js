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
    if (event.target.innerText === 'Add Pokemon' && event.target.nextElementSibling.children.length < 6) {
        fetch(POKEMONS_URL, reqObj(event))
        .then(resp => resp.json())
        .then(pokemon => {
            const ul = event.target.nextElementSibling
            const liList = document.createElement('li')
            liList.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
            ul.appendChild(liList)
        })
    }
     else if (event.target.innerText === 'Release') {
        fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, deleteReq)
        .then(resp => resp.json())
        .then(pokemon => console.log(pokemon))
        event.target.parentElement.remove()
    }
})

const deleteReq = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

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