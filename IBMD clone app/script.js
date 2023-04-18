"use strict";
(function(){
  const searchkeyword = document.getElementById("search");
    const suggestionContainer = document.getElementById("card-container");
    const favMoviesContainer= document.getElementById("fav-movies-container");
    const emptyText= document.getElementById("empty-search-text");
    const showFavourites = document.getElementById("favorites-section");
    const emptyFavText = document.getElementById("empty-fav-text");

    addToFavDOM();
    showEmptyText();
    let suggestionList = [];
    let favMovieArray = [];

    searchkeyword.addEventListener("keydown",(event) {
      if(event.key == "Enter"){
        event.preventDefault();
      }
    });
    function showEmptyText(){
      if(favMoviesContainer.innerHTMl == ""){
        emptyFavText.style.display = "block";
      }else{
        emptyFavText.style.display = "none";
      }
    }
    searchkeyword.addEventListener("keyup",function(){
      let search = searchkeyword.value;
      if(search === ""){
        emptyText.style.display = "block";
        suggestionsContainer.innerHTML = "";
        suggestionList = [];
      }else{
        emptyText.style.display = "none";
        (async () {
          let data = await fetchMovies(search);
          addToSuggestionContainerDom(data);
        })();
        suggestionsContainer.style.display = "grid";
      }
    });
            async function fetchMovies(search){
            const url = https://wwww.omdbapi.com/?t=${search}&apikey=d19cd846;
            try{
              const response = await response.json();
              return data;
            } catch(err){
              console.log(err);
            }
          }
          function addToSuggestionContainerDom(data){
            document.getElementById("empty-fav-text").style.display = "none";
            let isPresent = false;

            suggestionList.forEach((movie) {
            if(movie.Title == data.Title){
              isPresent = true;
            }
          })
          if(!isPresent && data.Title !=undefined){
            if(data.Poster == "N/A"){
              data.Poster = "./images/not-found.png";
             }
             suggestionList.push(data);
             const movieCard = document.createElement("div");
             movieCard.setAttribute("class", "text-decoration");

             movieCard.innerHTML =
             <div class = "card my-2" data-id = "${data.Title}">
             <a href="movie.html">
             <img src = "${data.Poster}"
                  class = "card-img-top"
                  data-id = "${data.Title}"/>
                  <div class = "card-body text-start">
                  <h5 class = "card-title">
                  < a href = "movie.html" data-id = "${data.Title}">${data.Title} </a>
                  </h5>
                  <p class = "card-text">
                  <i class = "fa-solid fa-star">
                  <span id= "rating">&nbsp;${data.imdbRating}</span>
                  </i>
                  <button class ="fav-btn">
                  <i class="fa-solid fa-heart add-fav" data-id=""${data.Title}"></i>
                  </buton>
                  </p>
                  </div>
                  </a>
                  </div>
                  suggestionContainer.prepend(movieCard);
                }
                async function handleFavBtn(e){
                  const taget = e.target;

                  let data = await fetchMovies(target.dataset.id);
                  let favMoviesLocal = localStorage.getItem("favMoviesList");
                  if(favMoviesLocal){
                    favMovieArray = Array.from(JSON.parse(favMoviesLocal));

                  }else{
                    localStorage.setItem("favMoviesList", JSON.stringify(data));

                  }
                  let isPresent= false;
                  favMovieArray.forEach((movie)
                {
                  if(data.Title == movie.Title){
                    notify("already added to fav list");
                    isPresent =true;
                  }
                })
                if(!isPresent){
                  favMovieArray.push(data);
                }
                localStorage.setItem("favMoviesList",JSON.stringify(favMovieArray));
                isPresent = !isPresent;
                addToFavDOM();

                }
                function addToFavDOM(){
                  favMoviesContainer.innerHTML = "";
                  let favList = JSON.parse(localStorage.getItem("favMoviesList"));
                  if(favList){
                    favList.forEach((movie){
                      const div = document.createElement("div");
                      div.classList.add(
                        "fav-movie-card",
                        "d-flex",
                        "justify-content-between",
                        "align-content-center",
                        "my-2"

                      );
                      div.innerHTML =
                      <img
                      src= "${movie.Poster}"
                      class = "fav-movie-Poster"/>
                      <div class = "movie-card-details">
                      <p class = "movie-name mt-3 mb-0">
                      <a href = "movie.html" class="fav-movie" data-id="${movie.Title}">${movie.Title}<a>
                      </p>
                      <small class="text-muted">${movie.Year}</small>
                      </div>
                      favMoviesContainer.prepend(div);
                    });
                  }
                }
                funtion notify(text){
                  window.alert(text);
                }
                function deleteMovies(name){
                  let favList =JSON.Parse(localStorage.getItem("favMoviesList"));
                  let updatedList =Array.from(favList).filter((movie) = {
                    return movie.Title != name;

                  }
                )
                localStorage.setItem("favMoviesList",JSON.stringify(updatedList));
                addToFavDOM();
                showEmptyText();

                async function handleClickListener(e){
                  cont target = e.target;
                  if(target.classList.contains("add-Fav")){
                    e.preventDefault();
                    handleFavBtn(e);

                  }else if{
                    target.classList.contains("fa-trash-can")){
                      deleteMovie(target.dataset.id);

                    }else if(target.classList.contains("fa-bars")){
                      if(showFavourites.style.display == "flex"){
                        document.getElementById("showFavourites").style.color = "#8b9595";
                        showFavourites.style.display = "none";


                      }else{
                        showFavourites.classList.add("animate_backInRight");
                        document.getElementById("show-favorites").style.color = "var(--logo-color)";
                        showFavourites.style.display="flex";

                      }

                    }
                    localStorage.setItems("movieName",target.dataset.id);
                  }
                  document.addEventListener("click", handleClickListener);
                })();


                  }
                }
                }
                (function() {
                  const title = document.getElementById("title");
                  title.innerHTML = localStorage.getItem("movieName");
                  const year = document.getElementById("year");
                  const runtime = document.getElementById("runtime");
                  const rating = document.getElementById("rating");
                  const poster = document.getElementById("poster");
                  const plot = document.getElementById("plot");
                  const directorsName = document.getElementById("directorsName");
                  const castName = document.getElementById("cast-name");
                  const genre = document.getElementById("genre");
                  fetchMovies(title.innerHTML);
                  async function fetchMovies(search){
                    const url = https://www.omdbapi.com/?t=${search}&type=movie&apikey=d19cd846;
                    try {
                      const response = await fetch(url);
                      const data = await response.json();

                      year.innerHTML = data.Year;
                      runtime.innerHTML = data.Runtime;
                      rating.innerHTML = '${data.imbdRating}/10';
                      poster.setAttribute("src", '${data.poster}');
                      plot.innerHTML = data.plot;
                      directorsName.innerHTML = data.Director;
                      castName.innerHTML = data.Actors;
                      genre.innerHTML = data.Genre;

                    } catch(err){
                      console.log(err);
                    }
                  }

                }

                )



                        }
                      }
                    }

                  )
                  }
                }




          }

        }

        )
      }
    }
  )




}
)
