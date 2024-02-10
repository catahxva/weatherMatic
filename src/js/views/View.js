export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._insertMarkup(markup);
  }

  update(data) {
    if (!data) return;

    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEl, i) => {
      const cEl = currentElements[i];

      if (
        !newEl.isEqualNode(cEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        cEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(cEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          cEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = this._generateSpinner();
    this._clear();
    this._insertMarkup(markup);
  }

  renderError() {
    const markup = this._generateErrorMessage();
    this._clear();
    this._insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
