export default class SortableTable {
  constructor( headersConfig,
    {
      data = [],
      sorted = {},
    } = {}
  ) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render()
  }

  render() {
    const sortedData = this.sortData(this.sorted.id, this.sorted.order);

    const elem = document.createElement("div");
    elem.innerHTML = this.getTable(sortedData);
    this.element = elem.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();
  }

  getTable(sortedData) {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.getHeader()}
          ${this.getBody(sortedData)}
      </div>
    `;
  }

  getHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.getHeaderCell(this.headersConfig)}
      </div>
    `;
  }

  getHeaderCell(headersConfig) {
    return headersConfig.map((header) => {
      const order = this.sorted.id === header.id ? this.sorted.order : "";
      const arrow = order ? this.getHeaderArrow() : "";

      return `
        <div class="sortable-table__cell" data-id="${header.id}" data-sortable="${header.sortable}" data-order="${order}">
          <span>${header.title}</span>
          ${arrow}
        </div>
      `;
    }).join("");
  }

  getHeaderArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `
  }

  getBody(sortedData) {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getBodyRow(sortedData)}
      </div>
    `
  }

  getBodyRow(sortedData) {
    return sortedData.map(product => {
      return `
        <a href="/products/${product.id}" class="sortable-table__row">
          ${this.getBodyCell(product)}
        </a>
    `
    }).join("")
  }

  getBodyCell(product) {
    return this.headersConfig.map(header => {
      if (header.template) {
        return header.template(product.images)
      }
      return `
        <div class="sortable-table__cell">${product[header.id]}</div>
      `
    }).join("")
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll("[data-element]")
    elements.forEach(subElement => {
      const name = subElement.dataset.element;
      result[name] = subElement;
    })
    return result;
  }

  sortData(id, order) {
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id === id);
    const sortType = column.sortType;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[id] - b[id]);
      case 'string':
        return direction * a[id].localeCompare(b[id], 'ru');
      }
    });
  }

  initEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.eventHandler)
  }

  eventHandler = event => {
    const column = event.target.closest("[data-sortable='true']")
    const {id, order} = column.dataset;
    const sortedData = this.sortData(id, order);

    column.dataset.order = column.dataset.order === "asc" ?  "desc" : "asc"

    column.append(this.subElements.arrow)
    this.subElements.body.innerHTML = this.getBody(sortedData)
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}
