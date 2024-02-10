import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results__container");
  _errorMsg = "Could not get any results";

  addRenderRecents(renderFunc) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("results-link")) renderFunc();
    });
  }

  _generateMarkup() {
    return `
        <ul class="results__list search">
            ${this._data
              .map((el) => {
                return `
                    <li class="preview__list__item">
                        <a href="#${el.lat}&${el.lon}" class="preview__link results-link">
                            <span class="medium__span results-link">${el.name}, ${el.country}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 svg--common results-link">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>                              
                        </a>
                    </li>
                `;
              })
              .join("")}
        </ul> 
    `;
  }

  _generateSpinner() {
    return `
        <div class="results__container__spinner search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 results__spinner search">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>                      
        </div>
    `;
  }

  _generateErrorMessage() {
    return `
        <div class="results__container__message search">
            <div class="results__message search">
                <div class="results__message__interior search">
                    <span class="big__span results__message__span search">
                        ${this._errorMsg}
                    </span>                             
                </div>
            </div>
        </div>
    `;
  }
}

export default new ResultsView();
