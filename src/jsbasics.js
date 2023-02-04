import './jsbasics.css'
import { getText, setText } from './jsbasics/store.js'

console.error('=====================')

const test1 = [1, 2, 3]
let test2 = 'Yo'

test1.push(4)
test2 = 'ADC'

console.log(test1, test2)

let number = 1
let string = 'String'

let array = [1, 2, 3]

let object = {
  key1: 1,
  hse: 2,
  design: 3
}

console.log(typeof number, typeof string, typeof array, typeof object)
console.log(number, string, array, object)
console.log(array[1], object.hse, object['hse'])

console.log(Object.keys(object), Object.values(object))

let complexArray = [
  [1, 2, 3],
  {
    firstname: 'Yo',
    lastname: 'Rap',
    albums: ['2019', '2020', '2021']
  }
]

let complexObject = {
  firstname: 'Yo',
  lastname: 'Rap',
  albums: [
    {
      title: 'Superalbum',
      year: 2020,
      label: 'Blablabla'
    },
    {
      title: 'Superalbum 2',
      year: 2021,
      label: 'Blablabla'
    }
  ]
}

console.log(complexArray.length, complexArray, complexObject)

function functionName(a) {
  console.log('Yo', a)
}

const arrowFunction = (a) => {
  console.log('Yo', a)
}

functionName('x')
arrowFunction('x')

console.log('getText', getText())
setText('Yo')
console.log('getText', getText())

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
})
