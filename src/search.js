import './search.css'
import { content } from './search_data.js'

function createContentCard(contentItemData) {
  const contentItem = document.createElement('div')
  contentItem.classList.add('O_ContentItem')

  const contentItemCover = document.createElement('img')
  contentItemCover.classList.add('A_ContentItemCover')
  contentItemCover.src = contentItemData.image

  const contentItemTags = document.createElement('div')
  contentItemTags.classList.add('C_ContentItemTags')

  contentItemData.tags.forEach((tag) => {
    const contentItemTag = document.createElement('div')
    contentItemTag.classList.add('A_ContentItemTag')
    contentItemTag.innerText = tag
    contentItemTags.appendChild(contentItemTag)
  })

  const contentItemTitle = document.createElement('h2')
  contentItemTitle.classList.add('A_ContentItemTitle')
  contentItemTitle.innerText = contentItemData.title

  const contentItemDescription = document.createElement('p')
  contentItemDescription.classList.add('A_ContentItemDescription')
  contentItemDescription.innerText = contentItemData.description

  contentItem.appendChild(contentItemCover)
  contentItem.appendChild(contentItemTags)
  contentItem.appendChild(contentItemTitle)
  contentItem.appendChild(contentItemDescription)

  return contentItem
}

function renderCardsByIds(container, ids) {
  ids = [...new Set(ids)]

  ids.forEach((id) => {
    content.forEach((item) => {
      if (item.id === id) {
        container.appendChild(createContentCard(item))
      }
    })
  })
}

function rerenderSearchedContent(requestText) {
  const contentItemsContainer = document.querySelector('.S_Content')
  contentItemsContainer.innerHTML = ''

  let contentItemIds = []

  content.forEach((contentItem) => {
    const nbspRegex = /[\u202F\u00A0]/gm
    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm
    let { title, description } = contentItem

    title = title.replaceAll(nbspRegex, ' ')
    title = title.replaceAll(punctuationRegex, '')
    description = description.replaceAll(nbspRegex, ' ')
    description = description.replaceAll(punctuationRegex, '')

    if (requestText.length >= 3) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(contentItem.id)
      }
    } else {
      contentItemIds.push(contentItem.id)
    }
  })

  if (contentItemIds.length > 0) {
    renderCardsByIds(contentItemsContainer, contentItemIds)
  } else {
    renderNothingFound()
  }
}

function renderNothingFound() {
  const contentItemsContainer = document.querySelector('.S_Content')
  contentItemsContainer.innerHTML = 'Ничего не найдено'
}

function initSearch() {
  const O_Search = document.querySelector('.O_Search')
  const A_SearchInput = O_Search.querySelector('.A_SearchInput')
  const A_Button = O_Search.querySelector('.A_Button')
  let requestText = getSearchRequest()

  if (requestText != undefined) {
    A_SearchInput.value = requestText
    rerenderSearchedContent(requestText)
  } else {
    A_SearchInput.value = ''
  }

  A_SearchInput.addEventListener('input', (e) => {
    requestText = e.target.value

    if (requestText.length >= 3) {
      A_Button.classList.remove('disabled')
    } else {
      A_Button.classList.add('disabled')
    }
  })

  A_SearchInput.addEventListener('keydown', (e) => {
    requestText = e.target.value

    if (e.key === 'Enter') {
      setSearchRequest(requestText)
    }
  })

  A_Button.addEventListener('click', (e) => {
    if (!e.target.classList.contains('disabled')) {
      requestText = A_SearchInput.value
      setSearchRequest(requestText)
      rerenderSearchedContent(requestText)
    }
  })
}

function getSearchRequest() {
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)

  if (searchParams.has('request')) {
    return searchParams.get('request')
  }
}

function setSearchRequest(requestText) {
  const url = getPathFromUrl(window.location.href)
  window.location.href = url + '?request=' + requestText
}

function getPathFromUrl(url) {
  return url.split('?')[0]
}

document.addEventListener('DOMContentLoaded', () => {
  initSearch()
})
