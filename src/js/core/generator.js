import { MatrixToolkit } from './toolkit';

export class Generator {
  generate () {
    while (!this.generateMatrix()) {
      console.warn('生成失败，再次生成！');
    }
  }
  generateMatrix () {
    this.matrix = MatrixToolkit.makeMatrix();
    this.orders = MatrixToolkit.makeMatrix()
      .map(row => row.map((v, i) => i)) // 获取矩阵索引
      .map(row => MatrixToolkit.shuffle(row)); // 随机打乱索引
    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false;
      }
    }
    return true;
  }

  fillNumber (n) {
    return this.fillRow(n, 0);
  }

  fillRow (n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }
    let row = this.matrix[rowIndex];
    let orders = this.orders[rowIndex];
    for (let i = 0; i < 9; i++) {
      let colIndex = orders[i];
      if (row[colIndex]) {
        continue; // 值已存在，跳过
      }

      if (!MatrixToolkit.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue; // 当前位置不可填充，跳过
      }
      row[colIndex] = n;
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0; // 填充失败，当前位置恢复0
        continue;
      }
      return true;
    }
    return false;
  }
}
