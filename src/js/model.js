import * as helpers from "./helpers.js";

export const state = {
  currentLocation: {},
  search: {
    recentSearches: [],
    results: [],
  },
  bookmarks: [],
};

export const getCurrentLocation = async function (lat, lon) {
  try {
    const weatherData = await helpers.getJSON(
      `${process.env.API_WEATHER}?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${process.env.API_KEY_DATA}`
    );
    const locationData = await helpers.getJSON(
      `${process.env.API_LOCATION_REVERSE}?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.API_KEY_DATA}`
    );

    state.currentLocation = {
      locationName: locationData[0].name,
      locationCountry: locationData[0].country,
      lat: locationData[0].lat,
      lon: locationData[0].lon,
      bookmarked:
        state.bookmarks.findIndex(
          (el) =>
            el.lat === locationData[0].lat && el.lon === locationData[0].lon
        ) !== -1
          ? true
          : false,
      weather: weatherData.current.weather[0].main,
      iconName: helpers.getIconName(
        weatherData.current.weather[0].main,
        weatherData.current.dt
      ),
      temperature: Math.round(weatherData.current.temp),
      feelsLike: Math.round(weatherData.current.feels_like),
      humidity: weatherData.current.humidity,
      uv: weatherData.current.uvi,
      windSpeed: Math.round(weatherData.current.wind_speed),
      sunrise: helpers.getFormattedHours(weatherData.current.sunrise),
      sunset: helpers.getFormattedHours(weatherData.current.sunset),
      hourly: weatherData.hourly.splice(0, 24).map((el) => {
        return {
          temperature: Math.round(el.temp),
          hour: helpers.getFormattedHours(el.dt),
          iconName: helpers.getIconName(el.weather[0].main, el.dt),
        };
      }),
      daily: weatherData.daily.map((el) => {
        return {
          day: helpers.getFormattedDay(el.dt),
          iconName: helpers.getIconName(el.weather[0].main, el.dt),
          weather: el.weather[0].main,
          temperature: Math.round(el.temp.day),
        };
      }),
    };
  } catch (err) {
    throw err;
  }
};

const updateRecentSearches = function (arr, query) {
  const arrCopy = [...arr];

  if (arrCopy.includes(query)) {
    arrCopy.splice(
      arrCopy.findIndex((el) => el === query),
      1
    );

    arrCopy.unshift(query);

    return arrCopy;
  }

  if (!arrCopy.includes(query)) {
    arrCopy.unshift(query);

    arrCopy.length === 6 ? arrCopy.pop(arrCopy.length - 1) : "";

    return arrCopy;
  }
};

const persistLocalStorage = function (itemName, itemValue) {
  localStorage.setItem(itemName, itemValue);
};

export const getSearchResults = async function (query) {
  try {
    state.search.recentSearches = updateRecentSearches(
      state.search.recentSearches,
      query
    );

    persistLocalStorage(
      "recentSearches",
      JSON.stringify(state.search.recentSearches)
    );

    const searchResults = await helpers.getJSON(
      `${process.env.API_LOCATION_DIRECT}?q=${query}&limit=10&appid=${process.env.API_KEY_DATA}`
    );

    if (!Array.isArray(searchResults)) return;

    state.search.results = searchResults.map((el) => {
      return {
        name: el.name,
        country: el.country,
        lat: el.lat,
        lon: el.lon,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const addBookmark = function (current) {
  state.bookmarks.push(current);

  if (
    current.lat === state.currentLocation.lat &&
    current.lon === state.currentLocation.lon
  )
    state.currentLocation.bookmarked = true;

  persistLocalStorage("bookmarks", JSON.stringify(state.bookmarks));
};

export const removeBookmark = function (lat, lon) {
  const index = state.bookmarks.findIndex(
    (el) => el.lat === lat && el.lon === lon
  );

  state.bookmarks.splice(index, 1);

  if (lat === state.currentLocation.lat && lon === state.currentLocation.lon)
    state.currentLocation.bookmarked = false;

  persistLocalStorage("bookmarks", JSON.stringify(state.bookmarks));
};

const initLocalStorage = function () {
  const storage = localStorage.getItem("recentSearches");
  const storageBookmarks = localStorage.getItem("bookmarks");

  if (storage) state.search.recentSearches = JSON.parse(storage);
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);
};
initLocalStorage();
