import './rails-integration.css'

let jti

function renderPins(data) {
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

    document.body.appendChild(pinElement)
  })
}

function initForm(url) {
  const form = document.querySelector('form')
  // form.setAttribute('action', url)

  const button = form.querySelector("input[type = 'submit']")

  button.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Click stopped')

    const formData = new FormData(form)

    console.log(formData)

    fetch(url, {
      // headers: { Authorization: `Bearer ${jti}` },
      headers: { Authorization: jti },
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

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/v1/pins.json')
    .then((response) => {
      console.log('RESPONSE', response)

      response.json().then((data) => {
        console.log('DATA', data)

        renderPins(data.pins)
        initForm(data.create_url)

        jti = data.jti

        console.log(jti)
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})
