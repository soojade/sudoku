/**
 * 矩阵和数组相关工具
 */
class MatrixToolkit {
  /**
   * 生成长度为 9 的数组，默认值 0
   * @param {int} val
   */
  static makeRow (val = 0) {
    return new Array(9).fill(val)
  }

  /**
   * 生成 9x9 矩阵
   * @param {int} val 矩阵填充值，默认0
   */
  static makeMatrix (val = 0) {
    return Array.from({ length: 9 }, () => this.makeRow(val))
  }

  /**
   * fisher-yates洗牌算法，当前值和后面的随机值交换
   * @param {int[]} arr
   */
  static shuffle (arr) {
    const len = arr.length;
    for (let i = 0; i <= len - 2; i++) { // 最后一位不需要交换
      let j = i + Math.floor(Math.random() * (len - i));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * 检查是否可填充
   */
  static checkFillable (matrix, n, rowIndex, colIndex) {
    const row = matrix[rowIndex];
    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
    const { boxIndex } = BoxToolkit.convertToBoxIndex(rowIndex, colIndex);
    const box = BoxToolkit.getBoxCells(matrix, boxIndex);
    for (let i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }
    return true;
  }

  /**
   * 生成 0-n 的随机数
   * @param {int} n
   */
  static random (n) {
    Math.floor(Math.random() * n);
  }
}

/**
 * 宫坐标系相关工具
 */

class BoxToolkit {
  static getBoxCells (matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3;
    const startColIndex = boxIndex % 3 * 3;
    const result = [];
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  }
  static convertToBoxIndex (rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3), // 宫坐标 0-8
      cellIndex: rowIndex % 3 * 3 + colIndex % 3 // 每一宫9小格 0-9
    }
  }
  static convertFromBoxIndex (boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
}

export { MatrixToolkit, BoxToolkit };
