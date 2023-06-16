import { fetchCharacter, variables } from "../../index.js";

// the created element needs to be outside because they need to be exported and imported to be updated in the fetchCharacter function in index.js
export const pagination = document.createElement("span");

export function createNavigation(navigation) {
  // create and append prev button
  const prevButton = document.createElement("button");
  prevButton.classList.add("button", "button--prev");
  prevButton.textContent = "Prev";
  navigation.append(prevButton);

  // listen to prev button click and update pagination and run fetchCharacter function
  prevButton.addEventListener("click", () => {
    if (variables.page > 1) {
      variables.page = variables.page - 1;
      fetchCharacter(variables.page, variables.searchQuery);
      pagination.innerHTML = `${variables.page} / ${variables.maxPage}`;
    }
  });

  // create and append pagination element
  pagination.classList.add("navigation__pagination");
  navigation.append(pagination);

  // create and append prev button
  const nextButton = document.createElement("button");
  nextButton.classList.add("button", "button--next");
  nextButton.textContent = "Next";
  navigation.append(nextButton);

  // listen to prev button click and update pagination and run fetchCharacter function
  nextButton.addEventListener("click", () => {
    if (variables.page < variables.maxPage) {
      variables.page = variables.page + 1;
      fetchCharacter(variables.page, variables.searchQuery);
      pagination.innerHTML = `${variables.page} / ${variables.maxPage}`;
    }
  });
}
