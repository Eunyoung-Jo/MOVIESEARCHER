document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGQ4MTJlMmI3ODVlODI1Y2FiZWY1YTNlMTc5MDAwMCIsInN1YiI6IjY2MmYwMzlmMzU4MTFkMDEyYmU4ODQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbfEpgy24wgAwf06rVvhZudw8JrM4SEKKlgtof3UiXI"
    }
  };

  const searchForm = document.querySelector(".search");
  const searchInput = document.getElementById("search-input");
  const cardList = document.querySelector(".cardlist");
  let moviesData = null;

  function loadMovies() {
    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
      .then((response) => response.json())
      .then((data) => {
        moviesData = data.results;

        filterMovies();
      })
      .catch((err) => console.error(err));
  }

  function filterMovies() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // 기존 카드 리스트 초기화
    cardList.innerHTML = "";

    moviesData.forEach((movie) => {
      const title = movie.title.toLowerCase();

      if (title.includes(searchTerm)) {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = `${title} Poster`;

        const h3 = document.createElement("h3");
        h3.textContent = `제목: ${movie.title}`;

        const pOverview = document.createElement("p");
        pOverview.textContent = `줄거리: ${movie.overview}`;

        const pVoteAverage = document.createElement("p");
        pVoteAverage.textContent = `평점: ${movie.vote_average}`;

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(pOverview);
        card.appendChild(pVoteAverage);

        card.addEventListener("click", function () {
          alert(`선택한 영화의 ID는 ${movie.id}입니다.`);
        });

        cardList.appendChild(card);
      }
    });
  }

  loadMovies();

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    filterMovies();
  });

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      filterMovies();
    }
  });

  window.onload = function () {
    const searchInput = document.getElementById("search-input");
    searchInput.focus();
  };
});
