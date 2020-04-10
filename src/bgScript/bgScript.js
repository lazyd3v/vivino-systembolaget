import { configureAxios } from "./api/axios";
import getRating from "./api/getRating";

const setup = async () => {
  await configureAxios();

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === "getRating") {
      getRating(request.query)
        .then((response) => sendResponse([response, null]))
        .catch((error) => {
          sendResponse([null, error]);
        });
    }

    return true;
  });
};

setup();
