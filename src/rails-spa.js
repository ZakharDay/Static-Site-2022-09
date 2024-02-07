import './rails-spa.css'
import Cookies from 'js-cookie'

const SIGN_UP_URL = 'http://localhost:3000/api/v1/sign_up.json'
const SIGN_IN_URL = 'http://localhost:3000/api/v1/sign_in.json'
const SIGN_OUT_URL = 'http://localhost:3000/api/v1/sign_out.json'
const PINS_INDEX_URL = 'http://localhost:3000/api/v1/pins.json'

function initApp() {
  if (Cookies.get('jwt') == undefined) {
    switchToSignIn()
  } else {
    switchToSignedIn()
  }
}

function switchToSignIn() {
  const body = document.body

  body.classList.remove('signedIn')
  body.classList.add('signIn')

  initSingInForm()
  initSingUpForm()
}

function switchToSignedIn() {
  const body = document.body

  body.classList.remove('signIn')
  body.classList.add('signedIn')

  initPinForm()
  getPins()
  initSignOutLink()
}

function initSingInForm() {
  const form = document.querySelector('#signInForm')
  const button = form.querySelector("input[type = 'submit']")

  button.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    fetch(SIGN_IN_URL, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        console.log('RESPONSE', response)

        response.json().then((data) => {
          Cookies.set('jwt', data.jwt)
          switchToSignedIn()
        })
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  })
}

function initSingUpForm() {
  const form = document.querySelector('#signUpForm')
  const button = form.querySelector("input[type = 'submit']")

  button.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    fetch(SIGN_UP_URL, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        console.log('RESPONSE', response)

        response.json().then((data) => {
          Cookies.set('jwt', data.jwt)
          switchToSignedIn()
        })
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  })
}

function initPinForm() {
  const form = document.querySelector('#pinForm')
  const button = form.querySelector("input[type = 'submit']")

  button.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    fetch(PINS_INDEX_URL, {
      headers: { Authorization: Cookies.get('jwt') },
      method: 'POST',
      body: formData
    })
      .then((response) => {
        console.log('RESPONSE', response)

        const notice = document.createElement('div')
        notice.innerText = 'Done'

        form.replaceWith(notice)
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  })
}

function getPins() {
  fetch(PINS_INDEX_URL)
    .then((response) => {
      console.log('RESPONSE', response)

      response.json().then((data) => {
        console.log('DATA', data)
        renderPins(data.pins)
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
}

function renderPins(data) {
  const container = document.querySelector('#pinsSection')

  data.forEach((pin) => {
    const pinElement = document.createElement('a')
    pinElement.classList.add('pin')
    pinElement.href = pin.url

    const pinTitle = document.createElement('div')
    pinTitle.classList.add('pinTitle')
    pinTitle.innerText = pin.title

    const pinDescription = document.createElement('div')
    pinDescription.classList.add('pinDescription')
    pinDescription.innerText = pin.description

    const pinImage = document.createElement('img')
    pinImage.classList.add('pinImage')
    pinImage.src = pin.pin_image

    pinElement.appendChild(pinTitle)
    pinElement.appendChild(pinDescription)
    pinElement.appendChild(pinImage)

    container.appendChild(pinElement)
  })
}

function initSignOutLink() {
  const link = document.querySelector('#signOutLink')

  link.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(SIGN_OUT_URL, {
      headers: { Authorization: Cookies.get('jwt') },
      method: 'POST',
      body: {}
    })
      .then((response) => {
        console.log('RESPONSE', response)

        Cookies.remove('jwt')
        switchToSignIn()
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initApp()
})
