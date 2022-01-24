const cardInfo = [{
    id: 'monkey',
    img: './img/monkey.jpeg'
  },
  {
    id: 'elephant',
    img: './img/elephant.jpeg'
  },
  {
    id: 'zebra',
    img: './img/zebra.jpeg'
  },
  {
    id: 'rhinoceros',
    img: './img/rhinoceros.jpeg'
  },
  {
    id: 'lion',
    img: './img/lion.jpeg'
  },
  {
    id: 'antelope',
    img: './img/antelope.jpeg'
  },
]

export const createblock = () => {
  const front = './img/front.jpeg'
  const arr = []
  cardInfo.forEach(item => {
    const card = {
      tag: 'div',
      class: 'card',
      attribute: {
        id: item.id
      },
      child: [{
          tag: 'div',
          class: 'front',
          child: [{
            tag: 'img',
            src: front
          }]
        },
        {
          tag: 'div',
          class: 'back',
          child: [{
            tag: 'img',
            src: item.img
          }]
        }
      ]
    }
    const test = createCard(card)
    arr.push(test)
  })

  return arr
}

const createCard = (data) => {
  let tag


  if (!data?.tag) return

  tag = document.createElement(data.tag)

  if (data.tag === 'img') {
    tag.src = data.src
  }

  if (data.class) tag.className += data.class

  data.id && tag.setAttribute('id', data.id)

  if (data.content) tag.innerHTML = data.content

  if (data.attribute) {
    const attrKeys = Object.keys(data.attribute)
    attrKeys.forEach((key) => {
      tag.setAttribute(key, data.attribute[key])
    })
  }
  if (data.child?.length) {
    data.child.forEach(item => {
      tag.append(item.tag ? createCard(item) : item)
    })
  }
  return tag
}