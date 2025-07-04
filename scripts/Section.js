export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);  // nome correto

    this.renderItems();
  } 

  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}