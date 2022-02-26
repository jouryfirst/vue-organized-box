module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
