const getImageFetch = (imgName, page) => {
  const apiKey = `24435694-017d2bab3470121913608c0c0`;
  const URL = "https://pixabay.com/api";
  return fetch(
    `${URL}/?q=${imgName}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Nothing found"));
  });
};

const apiFunc = { getImageFetch };
export default apiFunc;
