import $ from 'jquery';
import Sudoku from '../core/sudoku';
// 生成九宫格
export class Grid {
  constructor (container) {
    this.container = container;
    this.sudoku = new Sudoku();
  }

  build (lv) {
    this.sudoku.makeSudoku(lv);
    let matrix = this.sudoku.sudoku;
    const cells = matrix
      .map(rowVal => rowVal
        .map(cellVal => $('<span>')
          .addClass(cellVal ? 'fixed' : 'empty')
          .text(cellVal))); // 创建9x9个span，并赋值
    const divArr = cells.map(span => $('<div>').append(span));
    this.container.append(divArr);
  }

  /**
   * 校验结果，错误提供标记
   */
  check () {
    let data = this.sudoku.matrix; // 完整的数独
    let sudo = this.sudoku.sudoku; // 遮挡后的数独
    let arr = []; // 应该填入的正确答案
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if ((data[i][j] - sudo[i][j]) !== 0) {
          arr.push(data[i][j]);
        }
      }
    }

    let inputs = Array.from(this.container.find('span:not(.fixed)')); // 获取所有要输入的单元格元素
    let flags = []; // 设置标记，全部正确为true，提示成功
    inputs.forEach((item, index) => {
      if (item.innerText != arr[index]) { // 比较填入内容和正确答案是否相同
        $(item).addClass('error');
        flags.push(false);
      } else {
        $(item).removeClass('error');
        flags.push(true);
      }
    });
    if (flags.every(i => i === true)) {
      alert('恭喜你，成功通关！')
    }
  }

  /**
   * 恢复当前数独到初始状态
   */
  reset () {
    this.container.find('span:not(.fixed)')
      .removeClass('error sure nosure')
      .addClass('empty')
      .text(0);
  }

  /**
   * 清除标记
   */
  clear () {
    this.container.find('span.error').removeClass('error');
  }

  /**
   * 生成一个全新的数独游戏
   */
  rebuild () {
    this.container.empty(); // 清空
    this.sudoku = new Sudoku();
    this.build(); // 重建
  }
  /**
   * 绑定点击事件，点击单元格弹出面板，
   * 并调用popup.js的popup()设置弹出面板位置
   * @param {Popup对象} pop Popup对象
   */
  bindPopup (pop) {
    this.container.on('click', 'span', e => {
      let cell = $(e.target); // 转换成jquery对象
      if (!cell.hasClass('fixed')) { // 只有class是empty的单元格才能弹出面板
        pop.popup(cell); // 调用popup.js中的popup()
      }
    })
  }
}
