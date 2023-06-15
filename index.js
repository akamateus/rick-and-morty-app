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
const maxPage = 1;
const page = 1;
const searchQuery = "";

// fetch Character function start
async function fetchCharacter() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    cardContainer.innerHTML = "";

    if (response.ok) {
      // Success (Good Response)
      const data = await response.json();
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

fetchCharacter();
