//KEY AND URLs
const API_KEY = "7d149566af8dd84bd3a1e75d071091be";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const URL =
	"https://api.themoviedb.org/3/search/movie?api_key=7d149566af8dd84bd3a1e75d071091be";

//DOM elements
const submitElement = document.getElementById("searchTab");
const inputElement = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

//fetch
submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const value = inputElement.value;

	const modifiedURL = URL + "&query=" + value;

	fetch(modifiedURL)
		.then((res) => res.json())
		.then((data) => {
			movieSearch.innerHTML = "";
			const movies = data.results;
			const movieBlock = createContainer(movies);
			movieSearch.appendChild(movieBlock);
		})
		.catch((error) => {
			console.log(error);
		});

	console.log(value);

	inputElement.value = ""; // reset
});

//function to create elements to be appended to movie-search div with child movieElement

function createContainer(movies, title = "") {
	const movieElement = document.createElement("div"); //div to nest all movie elements
	movieElement.setAttribute("class", "movie");

	const header = document.createElement("h2");
	header.innerText = title;

	const section = document.createElement("section");
	section.classList = "section";

	movies.map((movie) => {
		if (movie.poster_path) {
			const img = document.createElement("img");
			img.src = IMAGE_URL + movie.poster_path;
			img.setAttribute("data-movie-id", movie.id);

			section.appendChild(img);
		}
	});

	const content = document.createElement("div");
	content.classList = "content";

	const contentClose = `<button id="content-close" aria-label="Close"></button>`;
	content.innerHTML = contentClose;

	movieElement.appendChild(header);
	movieElement.appendChild(section);
	movieElement.appendChild(content);

	return movieElement;
}