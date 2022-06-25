$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".navbar").toggleClass("open-side-nav");
    // $(".navbar-item").addClass("open-side-nav");
    // $(".side-nav div ul li").toggleClass('return-top')
    $('.side-nav div ul li a').addClass('show-up')


    if($(".navbar").hasClass("open-side-nav")){
    $(".toggle-btn").html('<a href="#"><i class="fas fa-solid fa-xmark"></i></a>');
  }else{
    $(".toggle-btn").html('<a href="#"><i class="fas fa-solid fa-bars"></i></a>');
  }
  });


  let searchWord = document.querySelector(".word-search-input");
  let searchInput = document.querySelector(".search-input");
  let cards = document.querySelector(".cards");
  let Trending = document.querySelector(".trending");
  let nowPlaying = document.querySelector(".nowplaying");
  let TopRated = document.querySelector(".toprated");
  let popular = document.querySelector(".popular");
  let upcoming = document.querySelector(".upcoming");


  

  
  let keyword = ``;
  let movies = [];


  let Api = {
    key: "129ca7ac5c25323836d2639b1e712f3e",
    baseUrl: "https://api.themoviedb.org/3/discover/movie?",
    img: "https://image.tmdb.org/t/p/w500",
  };
  
  async function getMovies() {
    let Data = await fetch(
      `${Api.baseUrl}api_key=${Api.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );
    let response = await Data.json();
    movies = response.results;
    // console.log(movies);
    displayCards(movies);
  }
  getMovies();


  function displayCards(movies) {
    let container = ``;
    for (let i = 0; i < movies.length; i++) {
      container += `<div class="col-12 col-md-6 col-lg-4 movie-card" >
         <div class="wrapper">
         <img class="card-image" src="${Api.img}${movies[i].poster_path}" alt="">

                <div class="movie-card-layer d-flex flex-column justify-content-center">
                <h2 class="fs-4 py-1 mb-2 title">${movies[i].original_title}</h2>
                <p class="desc lfs-5 p-1 mb-1">${movies[i].overview}</p>
                <p class="rate fs-6 py-1 mb-1" >Rate : ${movies[i].vote_average}</p>
                <p  class="date  fs-6 py-1">${movies[i].release_date}</p>
                </div>
         
                </div>
         </div>`;
    }
    // console.log(container);
    cards.innerHTML = container;
  }

 
  searchWord.addEventListener("keypress", async function (e, keyword) {
    {
      keyword = searchWord.value;
      if (e.code == "Enter") {
        let Data = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${Api.key}&language=en-US&query=${keyword}&include_adult=false`
        );
        let response = await Data.json();
        movies = response.results;
        displayCards(movies);
        resetForm();
      }
    }
  });

  searchInput.addEventListener("input", async function (keyword) {
    
      keyword = searchInput.value.trim(); 
      let searchedMovies = [];
      if (keyword.length >= 3) {
       
        let Data = await fetch(`${Api.baseUrl}api_key=${Api.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
        let response = await Data.json();
        movies = response.results;
        console.log(movies);

        searchedMovies = movies.filter((obj) => obj.title.toLowerCase().includes(keyword.toLowerCase()));
      //   for (let i = 0; i < movies.length; i++) {
      //     if (movies[i].title.toLowerCase().includes(keyword.toLowerCase()))
      //       searchedMovies.push(`${movies[i]}`);
      // }
      debugger;
      console.log(searchedMovies);
      displayCards(searchedMovies);
      // resetForm();
     
    
    }
    else{
      displayCards(movies)
    }
    
  });

  function resetForm() {
    searchInput.value ="";
    searchWord.value ="";
  }

  async function getTrending() {
    let Data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${Api.key}`
    );
    let response = await Data.json();
    movies = response.results;
    console.log(movies);
    displayCards(movies);
  }

  async function getTopRated() {
    let Data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api.key}&language=en-US&page=1`
    );
    let response = await Data.json();
    movies = response.results;
    console.log(movies);
    displayCards(movies);
  }

  async function getPopular() {
    let Data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Api.key}&language=en-US&page=1`
    );
    let response = await Data.json();
    movies = response.results;
    console.log(movies);
    displayCards(movies);
  }

  async function getNP() {
    let Data = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${Api.key}&language=en-US&page=1`);
    let response = await Data.json();
    movies = response.results;
    console.log(movies);
    displayCards(movies);
  }

  async function getUpcoming() {
    let Data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api.key}&language=en-US&page=1`);
    let response = await Data.json();
    movies = response.results;
    console.log(movies);
    displayCards(movies);
  }



  


  Trending.addEventListener('click',function(){
    getTrending();
  })

  nowPlaying.addEventListener('click',function(){
    getNP();
  })

  TopRated.addEventListener('click',function(){
    getTopRated();
  })

  popular.addEventListener('click',function(){
    getPopular();
  })

  upcoming.addEventListener('click',function(){
    getUpcoming();
  })


  
});














