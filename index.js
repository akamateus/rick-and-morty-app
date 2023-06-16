import { createCharacterCard } from "./components/card/card.js";

import {
  createNavigation,
  pagination,
} from "./components/nav-button/nav-button.js";

import { createSearchBar } from "./components/search-bar/search-bar.js";

// export an object with variables used across all documents (because JS doesn't allow changes the values of exported variables, even if defined as let or var)
export const variables = {
  maxPage: 42,
  page: 1,
  searchQuery: "",
};

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

// fetch Character function getting data from Rick and Morty API (see URL)
export async function fetchCharacter(page, searchQuery) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    cardContainer.innerHTML = "";

    if (response.ok) {
      // Success (Good Response)
      const data = await response.json();
      // update variables inside the variables object
      variables.maxPage = data.info.pages;
      pagination.innerHTML = `${variables.page} / ${variables.maxPage}`;
      // create a chard for each character (with the createCharacterCard function) of the array we got from the API
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

// create the navigaton element with prev button, pagination and next button
createNavigation(navigation);
// create the search bar
createSearchBar(searchBarContainer);
// initally run the fetchCharacter function so the characters are displayed
fetchCharacter(variables.page, variables.searchQuery);
