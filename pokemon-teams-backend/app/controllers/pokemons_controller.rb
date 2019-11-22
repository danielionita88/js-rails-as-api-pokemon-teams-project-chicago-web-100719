class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
    end

    def create

            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params['pokemon']['trainer_id'])
            render json: pokemon
    end
end
