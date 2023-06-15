export function createButton(navigation) {
  const prevButton = document.createElement("prevButton");
  prevButton.classList.add("button", "button--prev");
  prevButton.textContent = "Prev";
  navigation.prepend(prevButton);

  const nextButton = document.createElement("nextButton");
  nextButton.classList.add("button");
  nextButton.classList.add("button--next");
  nextButton.textContent = "Next";
  navigation.append(nextButton);
}
