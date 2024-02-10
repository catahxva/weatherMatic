class SearchView {
  _parentElement = document.querySelector(".nav__form");
  _inputEl = document.querySelector(".nav__form__input");
  _resultsContainer = document.querySelector(".results__container");
  _btnClose = document.querySelector(".btn--close-form");

  constructor() {
    this._showResultsContainer();
    this._homeBtn();
  }

  getQuery() {
    const query = this._inputEl.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._inputEl.value = "";
  }

  addHandlerSearch(handler) {
    const eventHandlerFunction = function (e) {
      e.preventDefault();

      handler(this.getQuery());
    };

    this._parentElement.addEventListener(
      "submit",
      eventHandlerFunction.bind(this)
    );
  }

  _showResultsContainer() {
    const handlerFunction = function () {
      this._inputEl.classList.add("nav__form__input--active-search");
      this._resultsContainer.classList.add("results__container--active");
    };

    this._inputEl.addEventListener("click", handlerFunction.bind(this));
  }

  _homeBtn() {
    document.querySelector(".btn--home").addEventListener("click", function () {
      const currentUrl = window.location.href;

      if (currentUrl.includes("#")) {
        const cleanUrl = currentUrl.split("#")[0];

        window.location.href = cleanUrl;
      }
    });
  }

  addRenderHideContainer(renderFunc) {
    const handlerFunction = function (e) {
      if (e.target.classList.contains("search")) return;

      this._removeClasses();
      renderFunc();
    };

    document.addEventListener("click", handlerFunction.bind(this));
  }

  addRenderHideContainerBtn(renderFunc) {
    const handlerFunction = function (e) {
      e.preventDefault();
      this._inputEl.value = "";
      this._removeClasses();
      renderFunc();
    };

    this._btnClose.addEventListener("click", handlerFunction.bind(this));
  }

  _removeClasses() {
    this._inputEl.classList.remove("nav__form__input--active-search");
    this._resultsContainer.classList.remove("results__container--active");
  }
}

export default new SearchView();
