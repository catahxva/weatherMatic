import View from "./View";

class RecentsView extends View {
  _parentElement = document.querySelector(".results__container");

  addHandlerSearchRecents(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const listElement = e.target.closest(".preview__list__item--recent");

      if (!listElement) return;

      const query = listElement.dataset.query;

      handler(query);
    });
  }

  addHandlerLoadRecentsOnLoad(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return `
        <span class="big__span margin--bottom search">Recent searches</span>
        <ul class="results__list search">
            ${this._data
              .map((el) => {
                return `
                    <li class="preview__list__item--recent search" data-query="${el}">
                        <span class="medium__span search">${el}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFF0" class="w-6 h-6 svg--common search">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>                              
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
}

export default new RecentsView();
