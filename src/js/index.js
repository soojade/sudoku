import $ from 'jquery';
import { Grid } from './ui/grid';
import Popup from './ui/popup';

$(() => {
  let grid = new Grid($('#box'));
  grid.build();

  // 选择等级
  $('#simple').on('click', () => {
    grid.build()
    console.log(grid);
  });
  $('#middle').on('click', () => grid.build(5));
  $('#diffcult').on('click', () => grid.build(7));

  // 生成弹出面板
  let popup = new Popup($('#pop'));
  grid.bindPopup(popup);

  // 下方按钮点击事件
  $('#check').on('click', () => grid.check());
  $('#reset').on('click', () => grid.reset());
  $('#clear').on('click', () => grid.clear());
  $('#rebuild').on('click', () => grid.rebuild());
})
