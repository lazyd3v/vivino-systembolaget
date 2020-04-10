import localforage from "localforage";
import extensionStorageDriver from "localforage-webextensionstorage-driver/local";
import { setup } from "axios-cache-adapter";
import rateLimit from "axios-rate-limit";

export let axios;

export async function configureAxios() {
  if (axios) {
    return;
  }

  await localforage.defineDriver(extensionStorageDriver);

  const forageStore = localforage.createInstance({
    driver: ["webExtensionLocalStorage"],
    name: "response-cache",
  });

  axios = setup({
    baseURL: "https://www.vivino.com/",
    responseType: "text",
    cache: {
      maxAge: 15 * 60 * 1000,
      exclude: { query: false },
      store: forageStore,
    },
  });

  axios = rateLimit(axios, { maxRPS: 2 });
}
