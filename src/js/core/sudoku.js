import { Generator } from './generator';

export default class Sudoku {
  constructor () {
    let generator = new Generator(); // 生成完整的数独
    generator.generate();
    this.matrix = generator.matrix;
  }
  makeSudoku (level = 4) {
    this.sudoku = this.matrix
      .map(row => row
        .map(cell => Math.random() * 9 < level ? 0 : cell)) // 小于lv的填充0，如果填充''，当一行全是''时，不会绘制这一行
  }
}
