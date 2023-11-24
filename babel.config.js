// babel.config.js

module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV === 'development')

  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = []

  return {
    presets,
    plugins,
  }
}
