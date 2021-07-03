const app = require("../app")
const movies = require("../models/filmes.json")

movies.sort((a,b)=> b.year - a.year)
const home = (request, response) =>{
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vindo ao {Reprograma} flix <3<3"
        }
    )
}

const getAll = (request, response) => {
    response.status(200).send(movies);
}

const getById = (request, response) => {
    const idRequerido = request.params.id;
   
    const idFiltrado = movies.find(movie => movie.id == idRequerido)
    response.status(200).send(idFiltrado)
}

const getByTitle = (request, response) => {
    
    const requestedTitle = request.query.title.toLowerCase()
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))


    if(requestedTitle === "" || filteredTitle === undefined){
        response.status(404).send({
            "message": "Favor colocar um valor valido"
        })

    }else{
        response.status(200).send(filteredTitle)
    }
    

}
const getByGenre = (request, response) => {
    const requestGenre = request.query.genre;
    let movieList = [];

    movies.forEach(movie => {

        let genreList = movie.genre.split(",")

        for (genre of genreList){
            if (genre.includes(requestGenre)){
                movieList.push(movie)
            }
        }
    }
    )
    response.status(200).send(movieList)
};


module.exports = { home, getAll, getById, getByTitle , getByGenre}