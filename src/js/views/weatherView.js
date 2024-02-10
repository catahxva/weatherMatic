import View from "./View.js";
import { icons } from "./../icons.js";

class WeatherView extends View {
  _parentElement = document.querySelector(".header");
  _errorMsg = "There was an error getting the location";

  addHandlerHash(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--location--bookmark");

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
        <section class="header__container--1">
            <section class="current">
                <div class="current__container current__main__container">
                    <img src="${
                      icons[this._data.iconName]
                    }" alt="" class="img--big">
                    <div class="current__main__spans">
                        <span class="big__span">${this._data.locationName}, ${
      this._data.locationCountry
    }</span>
                        <span class="big__span">${this._data.weather}</span>
                        <span class="big__span--bold">${
                          this._data.temperature
                        }°C</span>
                    </div>
                    <button class="btn--common btn--location--bookmark">
                        ${
                          this._data.bookmarked
                            ? `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 svg--big">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                            </svg>                      
                        `
                            : `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 svg--big">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>               
                        `
                        }           
                    </button>
                </div>
                <div class="current__container current__others__container">
                    <div class="current__others__cell">
                        <img src="${
                          icons["feelsLike"]
                        }" alt="" class="img--small">
                        <div class="current__others__spans">
                            <span class="small__span">
                                Feels like
                            </span>
                            <span class="small__span small__span--bold">
                                ${this._data.feelsLike}°C
                            </span>
                        </div>
                    </div>
                    <div class="current__others__cell current__others__cell--place-at-end">
                        <img src="${
                          icons["humidity"]
                        }" alt="" class="img--small">
                        <div class="current__others__spans">
                            <span class="small__span">
                                Humidity
                            </span>
                            <span class="small__span small__span--bold">
                                ${this._data.humidity}%
                            </span>
                        </div>
                    </div>
                    <div class="current__others__cell">
                        <img src="${icons["uv"]}" alt="" class="img--small">
                        <div class="current__others__spans">
                            <span class="small__span">
                                UV
                            </span>
                            <span class="small__span small__span--bold">
                                ${this._data.uv}
                            </span>
                        </div>
                    </div>
                    <div class="current__others__cell current__others__cell--place-at-end">
                        <img src="${
                          icons["windSpeed"]
                        }" alt="" class="img--small">
                        <div class="current__others__spans">
                            <span class="small__span">
                                Wind
                            </span>
                            <span class="small__span small__span--bold">
                                ${this._data.windSpeed} km/h
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="hourly">
                ${this._data.hourly
                  .map((el) => {
                    return `
                        <div class="hourly__item">
                            <div class="hourly__item__interior">
                                <span class="medium__span">
                                    ${el.hour}
                                </span>
                                <img src="${
                                  icons[el.iconName]
                                }" alt="" class="img--medium">
                                <span class="medium__span medium__span--bold">
                                    ${el.temperature}°C
                                </span>
                            </div>
                        </div>
                    `;
                  })
                  .join("")}
            </section>
            <section class="additional">
                <div class="additional__container">
                    <img src="${icons["sunrise"]}" alt="" class="img--medium">
                    <div class="additional__spans">
                        <span class="medium__span">Sunrise at:</span>
                        <span class="medium__span medium__span--bold">${
                          this._data.sunrise
                        }</span>
                    </div>
                </div>
                <div class="additional__container">
                    <img src="${icons["sunset"]}" alt="" class="img--medium">
                    <div class="additional__spans">
                        <span class="medium__span">Sunset at:</span>
                        <span class="medium__span medium__span--bold">${
                          this._data.sunset
                        }</span>
                    </div>
                </div>
            </section>
        </section>
        <section class="header__container--2">
            <h2 class="daily__title">8 day forecast</h2>
            <ul class="daily__list">
                ${this._data.daily
                  .map((el) => {
                    return `
                        <li class="daily__item">
                            <span class="medium__span">${el.day}</span>
                            <div class="daily__item__conditions">
                                <img src="${
                                  icons[el.iconName]
                                }" alt="" class="img--extra--small">
                                <span class="medium__span medium__span--bold">${
                                  el.weather
                                }</span>
                            </div>
                            <span class="medium__span">${
                              el.temperature
                            }°C</span>
                        </li>
                    `;
                  })
                  .join("")}
            </ul>
        </section>
    `;
  }

  _generateSpinner() {
    return `
            <div class="header__container__spinner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 header__spinner">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>           
            </div>
        `;
  }

  _generateErrorMessage() {
    return `
        <div class="header__container__message">
            <span class="header__message">
                ${this._errorMsg}!
            </span>            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 header__svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
        </div>
    `;
  }
}

export default new WeatherView();
