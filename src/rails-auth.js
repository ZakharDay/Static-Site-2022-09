import './rails-integration.css'

function initForm(url) {
  const form = document.querySelector('form')
  const button = form.querySelector("input[type = 'submit']")

  button.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Click stopped')

    const formData = new FormData(form)

    console.log(formData)

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        console.log('RESPONSE', response)

        response.json().then((data) => {
          console.log('DATA', data)
        })
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initForm('http://localhost:3000/api/v1/sign_in.json')
})
