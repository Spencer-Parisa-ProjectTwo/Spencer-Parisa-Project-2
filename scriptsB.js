
const movieApp = {}

movieApp.apiKey = `bfb23e9c017a2be83f91472023334cb6`
movieApp.apiUrl = 'https://api.themoviedb.org/3/search/movie'


movieApp.getMovieInfo = (argument) => {
    const url = new URL(movieApp.apiUrl)
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        query: argument,
        // language: argumentTwo
    })
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((jsonResponse) => {
            movieApp.displayMovieInfo(jsonResponse)
        })
}

movieApp.expandingBar = () => {
    const searchBtn = document.querySelector('.searchBtn')
    const inputEl = document.querySelector('.searchInput')

    searchBtn.addEventListener('click', function(){
        inputEl.style.width = '50%'
        inputEl.style.cursor = 'text';
        inputEl.focus();
        searchBtn.style.display = 'none'
    })
}

movieApp.emptyResults = () => {
    const resultsEl = document.querySelector('ul')
    resultsEl.innerHTML = ""
}

movieApp.displayMovieInfo = (dataMovie) => {
    movieApp.emptyResults()
    const firstFive = dataMovie.results.slice(0, 4)
    firstFive.forEach((item) => {
        
        if(item.poster_path && item.overview && item.popularity){
            const ulElement = document.querySelector('ul')
            const li = document.createElement('li')
            const img = document.createElement('img')
            const infoElement = document.createElement('p')
            const imgDefault = 'https://image.tmdb.org/t/p/w500'
    
            img.src = imgDefault.concat(item.poster_path)
            img.alt = item.title
    
            li.append(img)
            ulElement.appendChild(li)
    
            infoElement.innerHTML = `<div>${item.original_title}</div><p>${item.overview}</p><div>${item.popularity}</div>`
            li.append(infoElement)
        }
    });
} 

movieApp.setUpEventListner = () => {

    const formElement = document.querySelector('form')
    formElement.addEventListener('submit', function(e){
        e.preventDefault();
        const headerElement = document.querySelector('header')
        movieApp.userSearchTerm = document.querySelector('input[name=search]').value;
        movieApp.userLanguage = document.querySelector('select[name=language]').value;

        if(movieApp.userSearchTerm !== ""){
            movieApp.getMovieInfo(movieApp.userSearchTerm)
            movieApp.headerElement.style.display = 'none' 
            movieApp.iconElement.style.display = 'block'
        }else{
            alert('Please enter a movie name; at least!')
        }
    })
}

movieApp.backButton = () => {
    movieApp.iconElement = document.querySelector('i')
    movieApp.headerElement = document.querySelector('header')
    movieApp.iconElement.addEventListener('click', function(event){
        movieApp.headerElement.style.display = 'flex' 
        movieApp.emptyResults()

    })
}

movieApp.init = () => {
    movieApp.expandingBar()
    movieApp.setUpEventListner()
    movieApp.backButton()
}

movieApp.init();