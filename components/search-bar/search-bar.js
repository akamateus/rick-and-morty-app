import { fetchCharacter, variables } from "../../index.js";

export function createSearchBar(search) {
  // create search bar element and include innerHTML
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.innerHTML = `
    <input
      name="query"
      class="search-bar__input"
      type="text"
      placeholder="search characters"
      aria-label="character name"
    />
    <button class="search-bar__button" aria-label="search for character">
      <img
        class="search-bar__icon"
        src="assets/magnifying-glass.png"
        alt=""
      />
    </button>
    `;
  search.append(searchBar);

  // add eventListener to then update the searchQuery and page variables (inside the object in index.js) and to then run the fetchCharacter function with the updated variables
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    variables.searchQuery = event.target.firstElementChild.value;
    variables.page = 1;
    fetchCharacter(variables.page, variables.searchQuery);
  });
}
