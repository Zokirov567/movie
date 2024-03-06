let themeBtn = document.querySelector('.themeChange')
themeBtn.addEventListener('click', changeTheme)

function changeTheme() {
    let body = document.querySelector('body')
   // let currentTheme = body.getAttribute('data-theme')
   let currentTheme = localStorage.getItem('theme')
    if(currentTheme == "dark") {
        body.setAttribute('data-theme', 'white')
        localStorage.setItem('theme', 'white');
    } else {
        body.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark');
    }
}

function startTheme() {
    let theme =  localStorage.getItem('theme')
    let body = document.querySelector('body')
    if(theme == "dark") {
        body.setAttribute('data-theme', 'dark')
    } else {
        body.setAttribute('data-theme', 'white')
    }
}

startTheme()

 async function sendRequest(url, method, data) {
 
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        })
        response = await response.json()
        return response
    }
}
  
let searchBtn = document.querySelector('.searchLine button')
searchBtn.addEventListener('click', search)


  async function search() {
    let searchQuery = document.getElementsByName('search')[0].value
     
      let response = await sendRequest('https://www.omdbapi.com/', "GET", {"apikey":"b258a1d2", "t": searchQuery})
      if(response.Response == "False") {
        let movie = document.querySelector('.movie')
        movie.classList.remove('active')

        let error = document.querySelector('.error')
        error.classList.add('active')
        error.innerHTML = "Фильм не найден"

        let similar = document.querySelector('.similar')
        similar.classList.add('.active')
        similar.innerHTML = ""
        //similarLine.innerHTML = ""
      } else {
        let error = document.querySelector('.error')
        error.classList.remove('active')
        

        showfilm(response)        

        similarResult(searchQuery)
      }

   console.log(response)
}

 function showfilm(obj) {
    let movieTitle = document.querySelector('.movieTitle')
    movieTitle.innerHTML = obj.Title
    
    let poster = document.querySelector('.movieCover')
    poster.setAttribute('src', obj.Poster)

    let movieFullData = document.querySelector('.movieFullData')
    movieFullData.innerHTML = ""

    let arr = ['Genre', 'Year', 'Relased', 'Runtime', 'Country', 'Writer', 'Type', 'Language', 'Director', 'Plot']

    for(let elem of arr) {
        if(obj[elem]) {
        movieFullData.innerHTML = movieFullData.innerHTML +`
        <div class="movieLine">
            <div class="lineTitle">
          ${elem}
        </div>   
        <div class="lineData">
            ${obj[elem]}
            </div>
        </div>
          `
      }
    }




    let movie = document.querySelector('.movie')
    movie.classList.add('active')
  }

   async function similarResult(query) {
    let response = await sendRequest('https://www.omdbapi.com/', "GET", {"apikey":"b258a1d2", "s": query})
    if(response.Response == "False") {
        let similarLine = document.querySelector('.similarLine')
        similarLine.innerHTML = 'Похожих фильмов 0'
        
   } else {
    showSimilarfilms(response.Search)
    let similarLine = document.querySelector('.similarLine')
    similarLine.innerHTML = `Похожих фильмов ${response.totalResults}`
   }
}

   function showSimilarfilms(arr) {
    let similar = document.querySelector('.similar')
    similar.innerHTML = ""

    for(let movie of arr) {
        similar.innerHTML = similar.innerHTML + `
        <div class="similarMovie">
        <div class="favorite">
            <img src="./img/favBtn.svg">
        </div>
        <img src="${movie.Poster}">
        <div class="title">${movie.Title}</div>
    </div>
     `
    }
   }








































    //   let movie = document.querySelector('.movie')
    //   movie.classList.add('.active')



 