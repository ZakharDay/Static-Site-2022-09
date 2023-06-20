import Airtable from 'airtable'

const token =
  'patgMILzkAoLTAAWw.247ac2e7c0f0395d7bfc96ff802bb6418bba9534953314a257508be68055a5a4'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})

const base = Airtable.base('appx0vzpYoEu58TMz')

function getPostTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('Post Teasers')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          console.log(record)
          content.push({
            id: record.id,
            tags: record.fields['Tags'],
            image: record.fields['Image'],
            title: record.fields['Title'],
            description: record.fields['Description'],
            url: record.fields['Url']
          })
        })

        resolve(content)
      })
  })
}

function getHomepageTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('Homepage')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        resolve({ records: result })
      })
  })
}

export { getPostTeasers, getHomepageTeasers }
