
// A movie app where the user enters a complete title of a movie and gets the ratings and an overview of the movie (with other information possibly from the API), or selects a criteria from a drop down menu to find movies accordingly that match the criteria 

//1. Create app object
// 1. Save user inputs into constants 
// 2. Fetching movie data from the API and storing it in a function
// 3. Then go through the API and filter movies by matching criteria of user (could be using if statements according to which criteria user has filled) 
// 4. Create a function for display movie function append to the page with a poster and about blurb containing popularity, release date, title, genre, overview, adult movie or not, and total rating (can be modified)
// 5. Specifically, when we fetch the data, we want to append it to a separate page (empty div in html)
// 6. make init method and call displaymovie and getmovieinfo functions
// 7. call init function

// 8. error handling to empty each time our divs, make sure at least one criteria in entered

// STRETCH GOALS
// Carousel/image gallery that you can swipe through of different movies
// A 2nd api that displays trailers in a small pop up box to the side

const movieApp = {}

movieApp.apiKey = `bfb23e9c017a2be83f91472023334cb6`
movieApp.apiUrl = 'https://api.themoviedb.org/3/search/movie'

movieApp.userSearchTerm = document.querySelector('input[name=search]').value;
movieApp.userLanguage = document.querySelector('select[name=language]').value;

movieApp.getMovieInfo = () => {
    const url = new URL(movieApp.apiUrl)
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        query: movieApp.userSearchTerm,
        page: 1,
        //language: movieApp.userLanguage
    })
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((jsonResponse) => {
            console.log(jsonResponse)
            movieApp.displayMovieInfo(jsonResponse)
            //movieApp.getLanguage(jsonResponse)
            //movieApp.fiveRandomOptions(jsonResponse)
        })
}

movieApp.getLanguage = (dataLanguage) => {
    let currentLanguage = dataLanguage.filter((item) => {
        return movieApp.userLanguage === dataLanguage.original_language
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

movieApp.displayMovieInfo = (dataMovie) => {

    const ulElement = document.querySelector('ul')
    const formElement = document.querySelector('form')
    // const summary = document.querySelector('.overview')

    formElement.addEventListener('submit', function(e){
        e.preventDefault();
        dataMovie.results.forEach((item) => {
            const li = document.createElement('li')
            const img = document.createElement('img')
            const infoElement = document.createElement('p')
            // const titleElement = document.createElement('p')
            // const popularityElement = document.createElement('p')
            const imgDefault = 'https://image.tmdb.org/t/p/w500'

            img.src = imgDefault.concat(item.poster_path)
            img.alt = item.title

            li.append(img)
            ulElement.appendChild(li)

            infoElement.innerHTML = `<div>${item.original_title}</div><p>${item.overview}</p><div>${item.popularity}</div>`
            li.append(infoElement)

            // infoElement.textContent = item.overview
            // li.append(infoElement)

            // titleElement.textContent = item.original_title
            // li.append(titleElement)

            // popularityElement.textContent = item.popularity
            // li.append(popularityElement)

            //adding
            //formElement.style.display = 'none'


        });
    })
}  

movieApp.emptyResults = () => {
    const resultsEl = document.querySelector('.results')
    resultsEl.innerHTML = ""
}

movieApp.init = () => {
    movieApp.expandingBar()
    movieApp.getMovieInfo()
}

movieApp.init()


// const resultsEl = document.querySelector('.results')
// resultsEl.innerHTML = ""
//movieApp.userSearchTerm.textContent = ''

// if(movieApp.userSearchTerm !== ""){
//     movieApp.getMovieInfo()
// }else{
//     alert("enter a title!")
// }


//only publishing 5 of the results 
// movieApp.fiveRandomOptions = (allData) => {
//    const movieIndexOne = Math.floor(math.random() * allData.length)
//    const movieIndexTwo = Math.floor(math.random() * allData.length)
//    const movieIndexThree = Math.floor(math.random() * allData.length)
//    const movieIndexFour = Math.floor(math.random() * allData.length)
//    //movieApp.displayMovieInfo(movieIndexOne, movieIndexTwo, movieIndexThree, movieIndexFour)
//    //return allData[movieIndexOne, movieIndexTwo, movieIndexThree, movieIndexFour]
//    const randomChoices = []
//    return randomChoices[movieIndexOne, movieIndexTwo, movieIndexThree, movieIndexFour]
// }

// const choices = []
// choices = movieApp.fiveRandomOptions()
// console.log(choices)