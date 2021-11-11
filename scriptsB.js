
const movieApp = {}

movieApp.apiKey = `bfb23e9c017a2be83f91472023334cb6`
movieApp.apiUrl = 'https://api.themoviedb.org/3/search/movie'


movieApp.getMovieInfo = (argument, argumentTwo) => {
    const url = new URL(movieApp.apiUrl)
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        query: argument,
        language: argumentTwo
    })
    fetch(url)
        .then((response) => {
            if(response.ok){
                return response.json()
            }else{
                throw new Error(res.statusText)
            }
        })
        .then((jsonResponse) => {
            movieApp.displayMovieInfo(jsonResponse)
        })
        .catch((error) => {
            if (error.message === "Not Found"){
                alert("Please search again!")
            }
        })
}

movieApp.expandingBar = () => {
    const searchBtn = document.querySelector('.searchBtn')
    const inputEl = document.querySelector('.searchInput')

    searchBtn.addEventListener('click', function () {
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

        if (item.poster_path && item.overview && item.popularity) {
            const ulElement = document.querySelector('ul')
            const img = document.createElement('img')
            const li = document.createElement('li')
            const infoElement = document.createElement('p')
            const imgDefault = 'https://image.tmdb.org/t/p/w500'

            img.src = imgDefault.concat(item.poster_path)
            img.alt = item.title

            li.append(img)
            ulElement.appendChild(li)

            infoElement.innerHTML = `<h2>${item.original_title}</h2><p>${item.overview}</p><div>${item.popularity}</div>`
            li.append(infoElement)
        }
    });
}

movieApp.setUpEventListner = () => {

    const formElement = document.querySelector('form')
    const popUpElement = document.querySelector('.popUpError')

    formElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const headerElement = document.querySelector('header')
        movieApp.userSearchTerm = document.querySelector('input[name=search]').value;
        movieApp.userLanguage = document.querySelector('select[name=language]').value;
        if (movieApp.userSearchTerm !== "") {
            movieApp.getMovieInfo(movieApp.userSearchTerm, movieApp.userLanguage)
            movieApp.headerElement.style.display = 'none'
            movieApp.iconElement.style.display = 'block'
            movieApp.carousel()
        } else {
            popUpElement.innerHTML = '<p>At least put something!!!</p><button class="goBack">Return</button>'
            popUpElement.addEventListener('click', function(event){
                if(event.target.tagName === 'BUTTON'){
                    event.preventDefault();
                    document.getElementById('popUp').style.display='none'
                    document.getElementById('popUp').innerHTML = ''
                }
            })

        }
    })
}

movieApp.backButton = () => {
    movieApp.iconElement = document.querySelector('i')
    movieApp.headerElement = document.querySelector('header')
    movieApp.iconElement.addEventListener('click', function (event) {
        movieApp.headerElement.style.display = 'flex'
        movieApp.emptyResults()

    })
}

movieApp.carousel = () => {

    
}

movieApp.init = () => {
    movieApp.expandingBar()
    movieApp.setUpEventListner()
    movieApp.backButton()
}

movieApp.init();