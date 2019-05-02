const BASE_URL = "https://gateway.marvel.com/v1/public/";
const API_KEY = "aea1bd9fdb254661f30a5f4fdd291f6c";
const HASH = "ed180657d87dc301ebcafec2ddc77bf7";

class MarvelModel {
  getMarvelInfo(filter, type) {
    if (!type) {
      type = "characters";
    }

    if (!filter) {
      this._url = `${BASE_URL}${type}?limit=12&ts=1&apikey=${API_KEY}&hash=${HASH}`;
    } else {
      if (!(type === "characters" || type === "events")) {
        this._url = `${BASE_URL}${type}?titleStartsWith=${filter}&limit=12&ts=1&apikey=${API_KEY}&hash=${HASH}`;
      } else {
        this._url = `${BASE_URL}${type}?nameStartsWith=${filter}&limit=12&ts=1&apikey=${API_KEY}&hash=${HASH}`;
      }
    }
    return fetch(this._url)
      .then(this.processResponse)
      .then(response => response.data);
  }

  getDetailsInfo(type, id) {
    this._url = `${BASE_URL}${type}/${id}?limit=12&ts=1&apikey=${API_KEY}&hash=${HASH}`;
    return fetch(this._url)
      .then(this.processResponse)
      .then(response => response.data);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

const modelinstance = new MarvelModel();
export default modelinstance;
