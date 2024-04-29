document.addEventListener('DOMContentLoaded', function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGQ4MTJlMmI3ODVlODI1Y2FiZWY1YTNlMTc5MDAwMCIsInN1YiI6IjY2MmYwMzlmMzU4MTFkMDEyYmU4ODQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbfEpgy24wgAwf06rVvhZudw8JrM4SEKKlgtof3UiXI'
        }
    };

    const searchForm = document.querySelector('.search');
    const searchInput = document.getElementById('searchinput');
    const cardList = document.querySelector('.cardlist');
    let moviesData = null; // 받아온 영화 데이터 저장할 변수 지정

    function loadMovies() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                moviesData = data.results;

                filterMovies();
            })
            .catch(err => console.error(err));
    }

    function filterMovies() {
        const searchTerm = searchInput.value.trim().toLowerCase(); // 입력된 검색어를 소문자로 변환

        // 기존 카드 리스트 초기화
        cardList.innerHTML = '';

        moviesData.forEach(movie => {
            const title = movie.title.toLowerCase(); // 각 영화의 제목을 소문자로 변환

            if (title.includes(searchTerm)) {
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                img.alt = `${title} Poster`;

                const h3 = document.createElement('h3');
                h3.textContent = `제목: ${movie.title}`;

                const pOverview = document.createElement('p');
                pOverview.textContent = `줄거리: ${movie.overview}`

                const pVoteAverage = document.createElement('p');
                pVoteAverage.textContent = `평점: ${movie.vote_average}`;

                card.appendChild(img);
                card.appendChild(h3);
                card.appendChild(pOverview);
                card.appendChild(pVoteAverage);

                // 영화 카드에 클릭 이벤트 추가
                card.addEventListener('click', function () {
                    alert(`선택한 영화의 ID는 ${movie.id}입니다.`);
                });

                cardList.appendChild(card);
            }
        });
    }

    loadMovies();

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 이벤트 동작 방지

        filterMovies();
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 이벤트 동작 방지

            filterMovies();
        }
    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     const searchInput = document.getElementById('searchinput');
    //     searchInput.focus();
    // }); 이렇게 했더니 새로고침 시 커서 로딩이 안됨

    window.onload = function () {
        const searchInput = document.getElementById('searchinput');
        searchInput.focus();
    };
    // 페이지가 완전히 로드되기 전 스크립트가 실행됨
    // 이슈 해결 위해 window.onload 이벤트 사용해서 페이지의 모든 리소스 로드 후 실행될 수 있게 함


});
