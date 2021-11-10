
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
            return response.json()
        })
        .then(jsonResponse) => {
            movieApp.displayMovieInfo(jsonResponse)
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
            //movieApp.carousel()
        } else {
            popUpElement.innerHTML = 'At least type something!'
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

// movieApp.carousel = () => {
    
//     const controls = document.querySelector('.controls')
//     controls.style.display = 'flex'

//     const ulElement = document.querySelector('ul')
//     ulElement.style.display = 'inherit'
    
//     const delay = 3000;

//     const slides = document.querySelector('ul');
//     const slidesCount = slides.childElementCount;
//     const maxLeft = (slidesCount - 1) * 100 * -1;
    
//     let current = 0;
    
//     function changeSlide(next = true) {
//       if (next) {
//         current += current > maxLeft ? -100 : current * -1;
//       } else {
//         current = current < 0 ? current + 100 : maxLeft;
//       }
    
//       slides.style.left = current + "%";
//     }

//     document.querySelector(".next-slide").addEventListener("click", function() {
//       changeSlide();
//     });
    
//     document.querySelector(".prev-slide").addEventListener("click", function() {
//       changeSlide(false);
//     });
// }

movieApp.init = () => {
    movieApp.expandingBar()
    movieApp.setUpEventListner()
    movieApp.backButton()
}

movieApp.init();