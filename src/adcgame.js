import './adcgame.css'

import { speed, stages } from './adcgame/model.js'

const elementsWithEventListeners = []

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function showAnswersOrNextStage(stageContent) {
  if (stageContent.answers) {
    showAnswers(stageContent.answers)
  } else {
    showQuestions(stageContent.stage)
  }
}

function showQuestions(stage) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('questionsWrapper')
  document.body.appendChild(wrapper)

  const stageContent = sample(stages[stage])
  let timeout = speed

  if (stageContent.questions.length == 1) {
    showQuestion(wrapper, stageContent.questions[0])
    showAnswersOrNextStage(stageContent)
  } else {
    stageContent.questions.forEach((question, i) => {
      if (i == 0) {
        showQuestion(wrapper, question)
        showTexting(wrapper)
      } else {
        if (i + 1 == stageContent.questions.length) {
          setTimeout(() => {
            removeTexting()
            showQuestion(wrapper, question)
            showAnswersOrNextStage(stageContent)
          }, timeout)
        } else {
          setTimeout(() => {
            removeTexting()
            showQuestion(wrapper, question)
            showTexting(wrapper)
          }, timeout)
        }

        // timeout = timeout + 2000
        timeout += speed
      }
    })
  }
}

function showQuestion(wrapper, question) {
  removeListenerFromAnswer()

  const element = document.createElement('div')
  element.innerText = question
  element.classList.add('question')
  wrapper.appendChild(element)
}

function showTexting(wrapper) {
  const element = document.createElement('div')
  element.innerText = '...'
  element.classList.add('texting')
  wrapper.appendChild(element)
}

function removeTexting() {
  document.getElementsByClassName('texting')[0].remove()
}

function showAnswers(answers) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('answersWrapper')
  document.body.appendChild(wrapper)

  answers.forEach((answer, i) => {
    const element = document.createElement('div')
    element.innerText = answer.text
    element.classList.add('answer')

    element.addEventListener('click', () => {
      showQuestions(answer.stage)
    })

    elementsWithEventListeners.push(element)

    wrapper.appendChild(element)
  })
}

function removeListenerFromAnswer() {
  elementsWithEventListeners.forEach((element, i) => {
    element.removeEventListener('click', () => {})
  })
}

document.addEventListener('DOMContentLoaded', () => {
  showQuestions('stage1')
})
