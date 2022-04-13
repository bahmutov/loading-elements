const loading1 = document.querySelector('#page1 .loading')
const loading2 = document.querySelector('#page2 .loading')

setTimeout(() => {
  console.log('hiding the first loading element')
  loading1.style.display = 'none'
}, 2000)

setTimeout(() => {
  console.log('removing the second loading element')
  loading2.parentNode.removeChild(loading2)
}, 4000)
