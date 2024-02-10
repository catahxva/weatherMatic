import * as model from "./model.js";
import weatherView from "./views/weatherView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import recentsView from "./views/recentsView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlWeather = async function (lat, lon) {
  try {
    weatherView.renderSpinner();

    await model.getCurrentLocation(lat, lon);

    weatherView.render(model.state.currentLocation);
  } catch (err) {
    weatherView.renderError();
  }
};

const controlGeolocationWeather = function () {
  if (!navigator.geolocation || window.location.hash) return;

  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude: lat, longitude: lon } = position.coords;
    controlWeather(lat, lon);
  });
};

const controlCurrentWeather = function () {
  const coords = window.location.hash.slice(1);

  if (!coords) return;

  const [lat, lon] = coords.split("&");

  controlWeather(lat * 1, lon * 1);
};

const controlSearchResults = async function (query) {
  try {
    resultsView.renderSpinner();

    await model.getSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (err) {
    resultsView.renderError();
  }
};

const renderRecentSearches = function () {
  recentsView.render(model.state.search.recentSearches);
};

const renderRecentSearchesOnLoad = function () {
  if (model.state.search.recentSearches.length === 0) return;

  recentsView.render(model.state.search.recentSearches);
};

const controlAddBookmark = function () {
  if (!model.state.currentLocation.bookmarked)
    model.addBookmark(model.state.currentLocation);
  else
    model.removeBookmark(
      model.state.currentLocation.lat,
      model.state.currentLocation.lon
    );

  weatherView.update(model.state.currentLocation);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  controlGeolocationWeather();

  weatherView.addHandlerHash(controlCurrentWeather);

  weatherView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);

  recentsView.addHandlerSearchRecents(controlSearchResults);

  recentsView.addHandlerLoadRecentsOnLoad(renderRecentSearchesOnLoad);

  bookmarksView.addHandlerLoad(controlBookmarks);

  searchView.addRenderHideContainer(renderRecentSearches);
  searchView.addRenderHideContainerBtn(renderRecentSearches);
  resultsView.addRenderRecents(renderRecentSearches);
};

init();
