import debounce from "lodash/debounce";
import get from "lodash/get";
import getRating from "./api/getRating";

function initializeScript() {
  const shouldInititialize =
    window.location.search.includes("categoryLevel1=Vin") ||
    window.location.href.includes("/sok/");

  if (!shouldInititialize) {
    return;
  }

  appendRatings();

  // can't use MutationObserver unfortunately :(
  window.addEventListener("scroll", debounce(appendRatings, 1000));
}

function appendRatings() {
  const wineListItems = document.querySelectorAll(
    'a[href*="/vin"]:not(.navbar-level-1-link)'
  );

  wineListItems.forEach((item) => {
    if (!item.parentNode.style.position) {
      appendRating(item);
    }
  });
}

async function appendRating(element) {
  element.parentElement.style.position = "relative";
  const wineName = get(element.querySelector("h3"), "innerText");

  if (!wineName) {
    return;
  }

  try {
    const { score, numOfReviews, url } = await getRating(wineName);

    const priceElement = document.createElement("a");
    priceElement.href = url;
    priceElement.innerText = `Score: ${score} (${numOfReviews} reviews)`;
    priceElement.style.position = "absolute";
    priceElement.style.bottom = "20px";
    priceElement.style.right = "130px";

    element.parentElement.appendChild(priceElement);
  } catch (e) {
    console.error(`${wineName} is not found on Vivino`);
  }
}

window.addEventListener("load", initializeScript);
