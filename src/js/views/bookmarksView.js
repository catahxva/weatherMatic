import View from "./View.js";

class Bookmarks extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _bookmarksContainer = document.querySelector(".bookmarks__container");
  _openBtn = document.querySelector(".btn--open--bookmarks");
  _closeBtn = document.querySelector(".bookmarks__btn--close");
  _overView = document.querySelector(".overview");
  _errorMsg = "You have no bookmarks yet";

  constructor() {
    super();

    this._openBookmarksContainer();
    this._closeBookmarksContainer();
    this._closeBookmarksContainerLink();
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }

  _openBookmarksContainer() {
    const eventHandler = function () {
      this._overView.classList.add("overview--active");
      this._bookmarksContainer.classList.add("bookmarks__container--active");
    };

    this._openBtn.addEventListener("click", eventHandler.bind(this));
  }

  _closeBookmarksContainer() {
    this._closeBtn.addEventListener(
      "click",
      this._eventHandlerClose.bind(this)
    );
    this._overView.addEventListener(
      "click",
      this._eventHandlerClose.bind(this)
    );
  }

  _closeBookmarksContainerLink() {
    const eventHandler = function (e) {
      if (e.target.classList.contains("bookmark-link"))
        this._eventHandlerClose();
    };

    this._parentElement.addEventListener("click", eventHandler.bind(this));
  }

  _eventHandlerClose() {
    this._overView.classList.remove("overview--active");
    this._bookmarksContainer.classList.remove("bookmarks__container--active");
  }

  _generateMarkup() {
    return `
        ${this._data
          .map((el) => {
            return `
            <li class="preview__list__item">
                <a href="#${el.lat}&${el.lon}" class="preview__link bookmark-link">
                    <span class="medium__span bookmark-link">${el.locationName}, ${el.locationCountry}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 svg--common bookmark-link">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>                              
                </a>
            </li>
            `;
          })
          .join("")}
        `;
  }

  _generateErrorMessage() {
    return `
        <div class="bookmarks__message__container">
            <span class="bookmarks__message">
                ${this._errorMsg}
            </span>
        </div>
    `;
  }
}

export default new Bookmarks();
