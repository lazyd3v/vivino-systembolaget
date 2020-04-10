import getRating from "./api/getRating";

function initializeScript() {
  const shouldInititialize = window.location.search.includes(
    "categoryLevel1=Vin"
  );

  if (!shouldInititialize) {
    return;
  }

  const wineListItems = document.querySelectorAll(
    'a[href*="/vin"]:not(.navbar-level-1-link)'
  );
  wineListItems.forEach((item) => {
    appendRating(item);
  });
}

async function appendRating(element) {
  const wineName = element.querySelector("h3").innerText;
  const { score, numOfReviews, url } = await getRating(wineName);

  element.parentElement.style.position = "relative";

  const priceElement = document.createElement("a");
  priceElement.href = url;
  priceElement.innerText = `Vivino score: ${score} (${numOfReviews} reviews)`;
  priceElement.style.position = "absolute";
  priceElement.style.bottom = "14px";
  priceElement.style.right = "14px";

  element.parentElement.appendChild(priceElement);
}

window.addEventListener("load", initializeScript);
