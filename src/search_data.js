import { generateHash } from './utilities'

var Airtable = require('airtable')

const token =
  'patgMILzkAoLTAAWw.247ac2e7c0f0395d7bfc96ff802bb6418bba9534953314a257508be68055a5a4'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})

var base = Airtable.base('appx0vzpYoEu58TMz')

function getPostTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('Post Teasers')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        console.log(result)

        result.forEach((record) => {
          content.push({
            id: record.id,
            tags: record.fields['Tags'],
            image: record.fields['Image'],
            title: record.fields['Title'],
            description: record.fields['Description']
          })
        })

        resolve(content)
      })
  })
}

// function getPostTeasers() {
//   const content = []

//   base('Post Teasers')
//     .select({
//       // Selecting the first 3 records in Grid view:
//       maxRecords: 100,
//       view: 'Grid view'
//     })
//     .eachPage(
//       function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.

//         records.forEach(function (record) {
//           console.log('Retrieved', record.get('Title'))

//           const contentItemData = {
//             id: generateHash(),
//             tags: contentItemTags,
//             image: contentItemImage,
//             title: contentItemTitle,
//             description: contentItemDescription
//           }

//           content.push(contentItemData)
//         })

//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage()
//       },
//       function done(err) {
//         if (err) {
//           console.error(err)
//           return
//         } else {
//           return content
//         }
//       }
//     )
// }

// const content = [
//   {
//     id: '2d7bff',
//     tags: ['криптовалюта'],
//     image: 'http://localhost:8080/images/cd88e82d369a07e7de9f.png',
//     title: 'Как криптовалюты изменили нашу экономику',
//     description:
//       'Подробнее о том, как криптовалюты влияют на мировую экономику и нашу повседневную жизнь'
//   },
//   {
//     id: '376365',
//     tags: ['инвестиции'],
//     image: 'http://localhost:8080/images/e5e1276c9b253be90c8a.png',
//     title: 'Прогнозы по росту биткоина в ближайшее время',
//     description:
//       'Анализ экспертов о том, как изменится курс биткоина в ближайшем будущем'
//   },
//   {
//     id: '688335',
//     tags: ['криптовалюта'],
//     image: 'http://localhost:8080/images/85dcb542ced625671712.png',
//     title: 'Криптовалюты и налоги: что нужно знать',
//     description:
//       'Как правильно учитывать доходы от криптовалют и на что обратить внимание при заполнении налоговой декларации'
//   },
//   {
//     id: '656419',
//     tags: ['майнинг', 'криптовалюта'],
//     image: 'http://localhost:8080/images/26d0d89bb23acce8bee3.png',
//     title: 'Майнинг криптовалют: что это и как заработать',
//     description:
//       'Подробный обзор майнинга криптовалют, его особенностей и возможных способов заработка'
//   },
//   {
//     id: '6614c7',
//     tags: ['криптовалюта', 'инвестиции'],
//     image: 'http://localhost:8080/images/6be01850a67f30dddd5f.png',
//     title: 'Как выбрать надежный обменник криптовалют',
//     description:
//       'Советы по выбору обменника криптовалют, чтобы не попасть на мошенников и не потерять свои сбережения'
//   },
//   {
//     id: '17e640',
//     tags: ['криптовалюта', 'инвестиции'],
//     image: 'http://localhost:8080/images/9aa9a4c5c28729fefbd5.png',
//     title: 'Криптовалюты и безопасность: как защитить свои инвестиции',
//     description:
//       'Основные угрозы для криптовалютных инвесторов и советы по защите своих сбережений'
//   },
//   {
//     id: '3afad5',
//     tags: ['криптовалюта', 'инвестиции', 'ICO'],
//     image: 'http://localhost:8080/images/a9ed3d162784f371a0ba.png',
//     title: 'Что такое ICO и как на них зарабатывать',
//     description:
//       'Подробный обзор ICO-проектов, их особенностей и возможных рисков, а также советы по инвестированию'
//   },
//   {
//     id: 'cb92c3',
//     tags: ['криптовалюта', 'блокчейн'],
//     image: 'http://localhost:8080/images/4eca093cb85ddf862907.png',
//     title: 'Криптовалюты и блокчейн: как это работает',
//     description:
//       'Основные принципы работы криптовалют и технологии блокчейн, на которой они основаны'
//   },
//   {
//     id: 'bb2c91',
//     tags: ['криптовалюта', 'инвестиции'],
//     image: 'http://localhost:8080/images/0c52aada349c7be5abb1.png',
//     title: 'Какие криптовалюты стоит купить в 2021 году',
//     description:
//       'Анализ экспертов о том, какие криптовалюты будут наиболее перспективными в 2021 году и почему'
//   }
// ]

export { getPostTeasers }
