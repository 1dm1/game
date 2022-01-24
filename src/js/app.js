// import {
//   createblock
// } from './createCard.js'

// const wrap = document.querySelector('.wrap')

// const arr = createblock().concat(createblock()).sort(() => Math.random() - 0.5);

// arr.forEach(item => {
//   wrap.append(item)
// })



// const cardEl = document.querySelectorAll('.card')
// const arrCard = []

// cardEl.forEach(item => {
//   item.addEventListener('click', () => {
//     if (item.getAttribute('data-done', 'true') || arrCard.includes(item) || arrCard.length >= 2) return
//     item.querySelector('.front').style.transform = 'rotateY(180deg)'
//     item.querySelector('.back').style.transform = 'rotateY(360deg)'
//     arrCard.push(item)
//     checkCard()
//   })
// })

// const checkCard = () => {
//   if (arrCard.length != 2) return
//   if (arrCard[0].getAttribute('id') === arrCard[1].getAttribute('id')) {
//     setTimeout(() => {
//       arrCard.forEach(item => {
//         item.setAttribute('data-done', 'true')
//         item.style.boxShadow = '0px 1px 20px 8px #e40000'
//       })
//       arrCard.length = 0
//     }, 1000)
//   } else {
//     setTimeout(() => {
//       arrCard.forEach((item, index) => {
//         item.querySelector('.back').style.transform = 'rotateY(180deg)'
//         item.querySelector('.front').style.transform = 'rotateY(360deg)'
//       })
//       arrCard.length = 0
//     }, 1500)
//   }

// }





const cardInfo = [{
    id: 'monkey',
    img: '../src/img/monkey.jpeg'
  },
  {
    id: 'elephant',
    img: '../src/img/elephant.jpeg'
  },
  {
    id: 'zebra',
    img: '../src/img/zebra.jpeg'
  },
  {
    id: 'rhinoceros',
    img: '../src/img/rhinoceros.jpeg'
  },
  {
    id: 'lion',
    img: '../src/img/lion.jpeg'
  },
  {
    id: 'antelope',
    img: '../src/img/antelope.jpeg'
  },
]


class Game {
  constructor(parent,cardInfo) {
    this.cardInfo = cardInfo
    this.parent = document.querySelector(parent)
    this.wrap = document.createElement('div')
    this.arrCard = []
    
  }
  startGame() {
    this.addCard()
    this.tracking()
    this.preview()
  }

  preview() {
    setTimeout(() => {
      this.wrap.style.display = 'grid'
      setTimeout(() => {
        this.wrap.style.transform =  'scale(1)'
      },100)
    },1000)
  }

  templateCard () {
    const front = '../src/img/front.jpeg'
    const arr = []
    this.cardInfo.forEach(item => {
      const temlate = {
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
      
      arr.push(this.createCards(temlate))
    })
    return arr
  }

  createCards(data) {
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
        tag.append(item.tag ? this.createCards(item) : item)
      })
    }
    return tag
  }
  addCard() {    
    const arr = this.templateCard().concat(this.templateCard()).sort(() => Math.random() - 0.5)
    this.wrap.classList.add('wrap_card')
    
    arr.forEach(item => {
      this.wrap.append(item)
    })
    this.parent.append(this.wrap)
  }

  tracking() {
    this.cards = [...this.parent.querySelectorAll('.card')]
    
    this.parent.addEventListener('click',({target}) => {
      if(target.classList.value !== 'card') return
      if (target.getAttribute('data-done', 'true') || this.arrCard.includes(target) || this.arrCard.length >= 2) return
      target.querySelector('.front').style.transform = 'rotateY(180deg)'
      target.querySelector('.back').style.transform = 'rotateY(360deg)'
      this.arrCard.push(target)
      this.test()
    })
  }
  test() {
    if (this.arrCard.length != 2) return
    if (this.arrCard[0].getAttribute('id') === this.arrCard[1].getAttribute('id')) {
      setTimeout(() => {
        this.arrCard.forEach(item => {
          item.setAttribute('data-done', 'true')
          item.style.boxShadow = '0px 1px 20px 8px #e40000'
        })
        this.arrCard.length = 0

        const finish = this.cards.every(item => item.getAttribute('data-done') === 'true')
        if(finish) {
          setTimeout(() => {
            this.cards.forEach(item => {
              item.style.boxShadow = ''
              item.removeAttribute('data-done')
              item.querySelector('.back').style.transform = 'rotateY(180deg)'
              item.querySelector('.front').style.transform = 'rotateY(360deg)'
            })
          },1000)
        }
      }, 1000)
    } else {
      setTimeout(() => {
        this.arrCard.forEach((item) => {
          item.querySelector('.back').style.transform = 'rotateY(180deg)'
          item.querySelector('.front').style.transform = 'rotateY(360deg)'
        })
        this.arrCard.length = 0
      }, 1500)
    }
  }
}

const card = new Game('.wrap',cardInfo).startGame()
