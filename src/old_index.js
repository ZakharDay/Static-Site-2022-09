import Cookies from 'js-cookie'
import { generateHash } from './utilities'

const selectOptions = []
const multiSelectOptions = []
const content = []

function transformToLowercase(array) {
  const transformedArray = []

  array.forEach((item) => {
    transformedArray.push(item.toLowerCase())
  })

  return transformedArray
}

function updateSelectData(option) {
  multiSelectOptions.forEach((o) => {
    if (o.text === option.text) {
      o.active = !option.active
    }
  })
}

// function updateContent() {
//   const contentItems = document.getElementsByClassName('O_ContentItem')
//   const selectedTags = []

//   multiSelectOptions.forEach((item) => {
//     if (item.active) {
//       selectedTags.push(item.text)
//     }
//   })

//   console.log('selectedTags', selectedTags)

//   for (let i = 0; i < contentItems.length; i++) {
//     const contentItem = contentItems[i]
//     const contentItemTags = transformToLowercase(
//       contentItem.dataset.tags.split(',')
//     )

//     contentItem.classList.remove('hidden')

//     selectedTags.forEach((tag) => {
//       if (!contentItemTags.includes(tag)) {
//         contentItem.classList.add('hidden')
//       }
//     })
//   }
// }

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

function rerenderContent() {
  const contentItemsContainer = document.querySelector('.S_Content')
  const searchInput = document.querySelector('.A_SearchInput')
  const requestText = searchInput.value.toLowerCase()
  const selectedTags = []

  multiSelectOptions.forEach((item) => {
    if (item.active) {
      selectedTags.push(item.text)
    }
  })

  contentItemsContainer.innerHTML = ''

  let contentItemIds = []

  content.forEach((contentItem) => {
    const nbspRegex = /[\u202F\u00A0]/gm
    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm
    let { title, description } = contentItem

    title = title.toLowerCase().replaceAll(nbspRegex, ' ')
    title = title.replaceAll(punctuationRegex, '')
    description = description.toLowerCase().replaceAll(nbspRegex, ' ')
    description = description.replaceAll(punctuationRegex, '')

    if (requestText.length >= 3 && selectedTags.length === 0) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(contentItem.id)
      }
    } else if (requestText.length < 3 && selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (transformToLowercase(contentItem.tags).includes(tag)) {
          contentItemIds.push(contentItem.id)
        }
      })
    } else if (requestText.length >= 3 && selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (transformToLowercase(contentItem.tags).includes(tag)) {
          if (
            title.includes(requestText) ||
            description.includes(requestText)
          ) {
            contentItemIds.push(contentItem.id)
          }
        }
      })
    } else {
      contentItemIds.push(contentItem.id)
    }
  })

  renderCardsByIds(contentItemsContainer, contentItemIds)
}

function rerenderFilteredContent() {
  const contentItemsContainer = document.querySelector('.S_Content')
  const selectedTags = []

  multiSelectOptions.forEach((item) => {
    if (item.active) {
      selectedTags.push(item.text)
    }
  })

  console.log('selectedTags', selectedTags)

  contentItemsContainer.innerHTML = ''

  // content.forEach((contentItem) => {
  //   if (selectedTags.length > 0) {
  //     selectedTags.forEach((tag) => {
  //       if (transformToLowercase(contentItem.tags).includes(tag)) {
  //         console.log('true')
  //         contentItemsContainer.appendChild(createContentCard(contentItem))
  //       } else {
  //         console.log('false')
  //       }
  //     })
  //   } else {
  //     contentItemsContainer.appendChild(createContentCard(contentItem))
  //   }
  // })

  let contentItemIds = []

  content.forEach((contentItem) => {
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (transformToLowercase(contentItem.tags).includes(tag)) {
          contentItemIds.push(contentItem.id)
        }
      })
    } else {
      contentItemIds.push(contentItem.id)
    }
  })

  renderCardsByIds(contentItemsContainer, contentItemIds)
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

  renderCardsByIds(contentItemsContainer, contentItemIds)
}

// function getContentItemDataTags() {
//   const contentItems = document.getElementsByClassName('O_ContentItem')
//   const tags = []

//   for (let i = 0; i < contentItems.length; i++) {
//     const contentItem = contentItems[i]
//     const contentItemTags = contentItem.dataset.tags.split(',')

//     // contentItemTags.forEach((item) => {
//     //   tags.push(item)
//     // })

//     tags.push(...contentItemTags)
//   }

//   const uniqTags = transformToLowercase([...new Set(tags)])
//   // const uniqTagsTransformed = []

//   // uniqTags.forEach((item) => {
//   //   uniqTagsTransformed.push(item.toLowerCase())
//   // })

//   return uniqTags.sort()
// }

function getContentItemDataTags() {
  const tags = []

  for (let i = 0; i < content.length; i++) {
    tags.push(...content[i].tags)
  }

  const uniqTags = transformToLowercase([...new Set(tags)])

  return uniqTags.sort()
}

function updateSelectOptionList() {
  const optionListElement = document.querySelector('.C_MultiSelectOptionList')
  const selectElement = document.querySelector('.O_MultiSelect')
  const selectInput = document.querySelector('.A_MultiSelectInput')

  optionListElement.innerHTML = ''

  multiSelectOptions.forEach((option) => {
    const { text, active } = option

    if (!active) {
      const listItem = document.createElement('div')
      listItem.classList.add('A_MultiSelectOptionListItem')
      listItem.innerText = text

      listItem.addEventListener('click', () => {
        updateSelectData(option)
        updateSelectOptionList()
        rerenderContent()

        const chipElement = createChip(option)
        selectInput.appendChild(chipElement)

        selectElement.classList.remove('focus')
      })

      optionListElement.appendChild(listItem)
    }
  })
}

function createChip(option) {
  const { text } = option

  const chipElement = document.createElement('div')
  const chipElementText = document.createElement('span')
  const chipElementButton = document.createElement('div')
  chipElement.classList.add('A_MultiSelectChip')
  chipElementText.classList.add('Q_MultiSelectChipText')
  chipElementButton.classList.add('Q_MultiSelectChipButton')

  chipElementText.innerText = text

  chipElementButton.addEventListener('click', () => {
    updateSelectData(option)
    updateSelectOptionList()
    rerenderContent()
    chipElement.remove()
  })

  chipElement.appendChild(chipElementText)
  chipElement.appendChild(chipElementButton)

  return chipElement
}

// function initMultiSelect() {
//   const selectElement = document.querySelector('.O_MultiSelect')
//   const selectInput = document.querySelector('.A_MultiSelectInput')
//   const dropdownButton = document.querySelector('.A_MultiSelectDropdownButton')

//   getContentItemDataTags().forEach((item) => {
//     multiSelectOptions.push({
//       text: item,
//       active: false
//     })
//   })

//   updateSelectOptionList()

//   dropdownButton.addEventListener('click', () => {
//     selectElement.classList.toggle('focus')
//   })

//   selectInput.addEventListener('focus', () => {
//     selectElement.classList.add('focus')
//   })

//   document.body.addEventListener('click', (e) => {
//     console.log(multiSelectOptions)

//     if (
//       !e.target.classList.contains('A_MultiSelectInput') &&
//       !e.target.classList.contains('A_MultiSelectDropdownButton')
//     ) {
//       selectElement.classList.remove('focus')
//     }
//   })
// }

function initMultiSelect() {
  const selectElement = document.querySelector('.O_MultiSelect')
  const selectInput = document.querySelector('.A_MultiSelectInput')
  const dropdownButton = document.querySelector('.A_MultiSelectDropdownButton')

  getContentItemDataTags().forEach((item) => {
    multiSelectOptions.push({
      text: item,
      active: false
    })
  })

  updateSelectOptionList()

  dropdownButton.addEventListener('click', () => {
    selectElement.classList.toggle('focus')
  })

  selectInput.addEventListener('focus', () => {
    selectElement.classList.add('focus')
  })

  document.body.addEventListener('click', (e) => {
    console.log('multiSelectOptions', multiSelectOptions)

    if (
      !e.target.classList.contains('A_MultiSelectInput') &&
      !e.target.classList.contains('A_MultiSelectDropdownButton')
    ) {
      selectElement.classList.remove('focus')
    }
  })
}

function initSelect() {
  const selectElement = document.querySelector('.O_Select')
  const optionListElement = document.querySelector('.C_SelectOptionList')
  const selectInput = document.querySelector('.A_SelectInput')
  const dropdownButton = document.querySelector('.A_SelectDropdownButton')

  optionListElement.innerHTML = ''

  getContentItemDataTags().forEach((item) => {
    selectOptions.push(item)
  })

  fillSelect(selectOptions)

  dropdownButton.addEventListener('click', () => {
    selectElement.classList.toggle('focus')
  })

  selectInput.addEventListener('focus', () => {
    selectElement.classList.add('focus')
  })

  selectInput.addEventListener('input', (e) => {
    const { value } = e.target

    const filteredSelectOptions = []

    selectOptions.forEach((option) => {
      if (value.length > 0) {
        if (option.startsWith(value)) {
          filteredSelectOptions.push(option)
        }
      } else {
        filteredSelectOptions.push(option)
      }
    })

    optionListElement.innerHTML = ''
    fillSelect(filteredSelectOptions)
  })

  document.body.addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('A_SelectInput') &&
      !e.target.classList.contains('A_SelectDropdownButton')
    ) {
      selectElement.classList.remove('focus')
    }
  })
}

function fillSelect(selectOptions) {
  const selectElement = document.querySelector('.O_Select')
  const optionListElement = document.querySelector('.C_SelectOptionList')
  const selectInput = document.querySelector('.A_SelectInput')

  selectOptions.forEach((option) => {
    const listItem = document.createElement('div')
    listItem.classList.add('A_SelectOptionListItem')
    listItem.innerText = option

    listItem.addEventListener('click', () => {
      console.log('click')
      const listItems = document.getElementsByClassName(
        'A_SelectOptionListItem'
      )

      for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index]
        element.classList.remove('active')
      }

      listItem.classList.add('active')

      selectInput.value = option
      selectElement.classList.remove('focus')
    })

    optionListElement.appendChild(listItem)
  })
}

function initModal() {
  const openButton = document.getElementById('openModal')
  const closeButton = document.getElementById('closeModal')
  const resetButton = document.getElementById('reset')
  const modal = document.querySelector('.modal')

  openButton.addEventListener('click', () => {
    console.log('open clicked')

    modal.classList.add('visible')
  })

  closeButton.addEventListener('click', () => {
    console.log('close clicked')

    modal.classList.remove('visible')
  })

  resetButton.addEventListener('click', () => {
    console.log('reset clicked')

    Cookies.remove('modal')
  })

  if (Cookies.get('modal') == undefined) {
    modal.classList.add('visible')
    Cookies.set('modal', true)
  }
}

function initFilters() {
  const contentItems = document.getElementsByClassName('O_ContentItem')

  for (let i = 0; i < contentItems.length; i++) {
    const contentItem = contentItems[i]
    const contentItemTags = contentItem.dataset.tags.split(',')

    const contentItemImage = contentItem.querySelector(
      '.A_ContentItemCover'
    ).src

    const contentItemTitle = contentItem.querySelector(
      '.A_ContentItemTitle'
    ).innerText

    const contentItemDescription = contentItem.querySelector(
      '.A_ContentItemDescription'
    ).innerText

    const contentItemData = {
      id: generateHash(),
      tags: contentItemTags,
      image: contentItemImage,
      title: contentItemTitle,
      description: contentItemDescription
    }

    content.push(contentItemData)
  }

  console.log('content', content)
}

function initSearch() {
  const searchInput = document.querySelector('.A_SearchInput')

  searchInput.addEventListener('input', () => {
    rerenderContent()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('index')) {
    initModal()
    initFilters()
    initMultiSelect()
    initSearch()
    initSelect()
  }
})
