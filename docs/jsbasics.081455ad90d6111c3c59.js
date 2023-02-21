/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/jsbasics/store.js
var store_text = '';

function getText() {
  return store_text;
}

function setText(newText) {
  store_text = newText;
}


;// CONCATENATED MODULE: ./src/jsbasics.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



console.error('=====================');
var test1 = [1, 2, 3];
var test2 = 'Yo';
test1.push(4);
test2 = 'ADC';
console.log(test1, test2);
var number = 1;
var string = 'String';
var array = [1, 2, 3];
var object = {
  key1: 1,
  hse: 2,
  design: 3
};
console.log(_typeof(number), _typeof(string), _typeof(array), _typeof(object));
console.log(number, string, array, object);
console.log(array[1], object.hse, object['hse']);
console.log(Object.keys(object), Object.values(object));
var complexArray = [[1, 2, 3], {
  firstname: 'Yo',
  lastname: 'Rap',
  albums: ['2019', '2020', '2021']
}];
var complexObject = {
  firstname: 'Yo',
  lastname: 'Rap',
  albums: [{
    title: 'Superalbum',
    year: 2020,
    label: 'Blablabla'
  }, {
    title: 'Superalbum 2',
    year: 2021,
    label: 'Blablabla'
  }]
};
console.log(complexArray.length, complexArray, complexObject);

function functionName(a) {
  console.log('Yo', a);
}

var arrowFunction = function arrowFunction(a) {
  console.log('Yo', a);
};

functionName('x');
arrowFunction('x');
console.log('getText', getText());
setText('Yo');
console.log('getText', getText());
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
});
/******/ })()
;