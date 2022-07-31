const API_KEY = `24558564-a16a5722e1280d44cb84f27e6`;

export function fetchImages(value, page) {
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Something did go wrong'));
  });
}
