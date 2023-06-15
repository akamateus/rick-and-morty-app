import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

// fetch Character function start
async function fetchCharacter(page, searchQuery) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    cardContainer.innerHTML = "";

    if (response.ok) {
      // Success (Good Response)
      const data = await response.json();
      maxPage = data.info.pages;
      pagination.innerHTML = `${page} / ${maxPage}`;
      data.results.forEach((character) => {
        let newCard = createCharacterCard(character);
        cardContainer.append(newCard);
      });
    } else {
      // Failure (Bad Response)
      console.error("Bad Response");
    }
  } catch (error) {
    // Failure (Network error, etc)
    console.error("An Error occurred", error);
  }
}

fetchCharacter(page, searchQuery);

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page = page + 1;
    fetchCharacter(page, searchQuery);
    pagination.innerHTML = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    fetchCharacter(page, searchQuery);
    pagination.innerHTML = `${page} / ${maxPage}`;
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.firstElementChild.value;
  page = 1;
  fetchCharacter(page, searchQuery);
});
