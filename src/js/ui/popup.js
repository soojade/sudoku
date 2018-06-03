import $ from 'jquery';

export default class Popup {
  constructor (panel) {
    this.panel = panel.hide().removeClass('hidden');
    this.panel.on('click', 'span', e => {
      let span = $(e.target);
      let cell = this.targetCell;
      if (span.hasClass('nosure')) {
        if (cell.hasClass('nosure')) {
          cell.removeClass('nosure');
        } else {
          cell.removeClass('sure').addClass('nosure')
        }
      } else if (span.hasClass('sure')) {
        if (cell.hasClass('sure')) {
          cell.removeClass('sure');
        } else {
          cell.removeClass('nosure').addClass('sure')
        }
      } else if (span.hasClass('empty')) {
        if (cell.hasClass('sure')) {
          cell.removeClass('sure');
        } else if (cell.hasClass('nosure')) {
          cell.removeClass('nosure');
        }
        cell.text(0).addClass('empty');
      } else {
        cell.text(span.text()).removeClass('empty'); // 填充数字并移除覆盖的颜色
      }
      this.panel.hide(); // 关闭填充面板
    })
  }

  /**
   * 传递点击的单元格的jquery对象，获取其位置，
   * 并设置为弹出面板的位置
   * @param {jquery对象} cell jquery对象
   */
  popup (cell) {
    this.targetCell = cell; // 保存当前点击单元格，用于之后填充数字
    let { left, top } = cell.position();
    let width = this.panel.width(); // 弹出面板宽
    let height = this.panel.height(); // 弹出面板高
    left = left <= width ? left : width;
    top = top <= height ? top : height;
    this.panel.css({
      left: `${left}px`,
      top: `${top}px`
    }).toggle(); // 使用toggle，当再次点击其它地方时隐藏弹出面板
  }
}
