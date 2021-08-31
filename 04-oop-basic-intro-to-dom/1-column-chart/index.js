export default class ColumnChart {
  constructor(data = {}) {
    ({data: this.data = [],
      label: this.label = '',
      value: this.value = '',
      link: this.link = '',
      formatHeading: this.formatHeading = ''
    } = data);

    this.chartHeight = 50;
    this.render();
  }

  render() {
    const element = document.createElement("div");
    const header = this.formatHeading
      ? this.formatHeading(this.value)
      : this.value;

    element.innerHTML = `
    <div class="column-chart" style="--chart-height: 50">
        <div class="column-chart__title">
            ${this.label}
            <a href="/${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${header}</div>
            <div data-element="body" class="column-chart__chart">
            </div>
        </div>
    </div>`;

    this.element = element.firstElementChild;
    this.update();
  }

  update() {
    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
      return;
    }

    const dataBody = this.element.querySelector(".column-chart__chart");
    const columnProps = this.getColumnProps(this.data);
    dataBody.innerHTML = this.getTooltips(columnProps);
  }

  getTooltips(columnProps) {
    return columnProps.map(({value, percent}) => {
      return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
    }).join('');
  }

  getColumnProps(arr) {
    const maxValue = Math.max(...arr);
    const scale = this.chartHeight / maxValue;

    return arr.map((item) => ({
      percent: ((item / maxValue) * 100).toFixed(0) + "%",
      value: Math.floor(item * scale) + "",
    }));
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
