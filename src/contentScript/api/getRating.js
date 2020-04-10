export default function getRating(query) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "getRating", query },
      (messageResponse) => {
        const [response, error] = messageResponse;

        if (!response) {
          reject(error);
        }

        resolve(response);
      }
    );
  });
}
