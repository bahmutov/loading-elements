const [loading1, loading2] = document.querySelectorAll('#page1 .loading')
const loading3 = document.querySelector('#page2 .loading')

setTimeout(() => {
  console.log('hiding the first loading element')
  loading1.style.display = 'none'
}, 2000)

setTimeout(() => {
  console.log('removing the second loading element')
  loading2.parentNode.removeChild(loading2)
}, 3000)

setTimeout(() => {
  console.log('removing the third loading element')
  loading3.parentNode.removeChild(loading3)
}, 4500)
