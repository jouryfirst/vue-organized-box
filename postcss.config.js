const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

module.exports = ({ file }) => {
  let rootValue
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 16
  } else {
    rootValue = 37.5
  }
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: rootValue,
        propList: ['*'],
        minPixelValue: 2
      })
    ]
  }
}
