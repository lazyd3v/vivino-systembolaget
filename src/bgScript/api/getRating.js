import cheerio from "cheerio";
import { axios } from "./axios";

const extractRating = (html, query) => {
  const $ = cheerio.load(html);

  let wines = [];
  $(".card").each((index, el) => {
    const name = $(el)
      .find(".wine-card__name .link-color-alt-grey")
      .text()
      .trim();
    const score = $(el)
      .find(".average__number")
      .text()
      .trim()
      .replace(",", ".");
    const numOfReviews = $(el)
      .find(".average__stars .text-micro")
      .text()
      .trim();
    const href = $(el).find("a").attr("href");
    const url = `https://www.vivino.com` + href;

    if (!numOfReviews) {
      return;
    }

    wines.push({
      name,
      score: parseFloat(score),
      numOfReviews: parseFloat(numOfReviews),
      url,
    });
  });

  return wines[0];
};

export default async function getRating(query) {
  const response = await axios.get(
    `/search/wines?q=${encodeURIComponent(query)}`
  );

  return extractRating(response.data, query);
}
