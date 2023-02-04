import './adcgame.css'

const elementsWithEventListeners = []

const messageGroups = [
  {
    questions: [
      'Ghbdtn! Rfr ltkf?',
      'Ой',
      'Привет! Как дела?',
      'Ладно, знаешь меня?'
    ],
    answers: ['Да', 'Нет']
  },
  {
    questions: [
      'Хей! приветствую тебя из глубин интернета',
      'Ты ведь не знаешь кто я, верно?'
    ],
    answers: ['Вообще-то знаю', 'Нет']
  },
  {
    questions: [
      'О, как хорошо, что ты заглянул',
      'Кажется, мы уже встречались?',
      'На вечеринке... Ну этого... того '
    ],
    answers: ['Ну точно, было', 'Ты меня с кем-то путаешь']
  },
  {
    questions: ['ЙОУ', 'ДИП!', 'РЭП'],
    answers: ['ДИП!', 'ЭЭЭ, ЧТО?']
  }
]

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function showQuestions() {
  const wrapper = document.createElement('div')
  wrapper.classList.add('questionsWrapper')
  document.body.appendChild(wrapper)

  const messageGroup = sample(messageGroups)
  let timeout = 2000

  messageGroup.questions.forEach((question, i) => {
    if (i == 0) {
      showQuestion(wrapper, question)
    } else {
      if (i + 1 == messageGroup.questions.length) {
        setTimeout(() => {
          showQuestion(wrapper, question)
          showAnswers(messageGroup.answers)
        }, timeout)
      } else {
        setTimeout(() => {
          showQuestion(wrapper, question)
        }, timeout)
      }

      // timeout = timeout + 2000
      timeout += 2000
    }
  })
}

function showQuestion(wrapper, question) {
  removeListenerFromAnswer()

  const element = document.createElement('div')
  element.innerText = question
  element.classList.add('question')
  wrapper.appendChild(element)
}

function showAnswers(answers) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('answersWrapper')
  document.body.appendChild(wrapper)

  answers.forEach((answer, i) => {
    const element = document.createElement('div')
    element.innerText = answer
    element.classList.add('answer')

    element.addEventListener('click', showQuestions)
    elementsWithEventListeners.push(element)

    wrapper.appendChild(element)
  })
}

function removeListenerFromAnswer() {
  elementsWithEventListeners.forEach((element, i) => {
    element.removeEventListener('click', showQuestions)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  showQuestions()
})
