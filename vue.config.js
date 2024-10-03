const { defineConfig } = require('@vue/cli-service')
const SitemapPlugin = require('sitemap-webpack-plugin').default

// You can write the paths as an array of strings or an array of objects
const paths = [
  {
      path: '/',
      lastmod: '2024-10-02',
      priority: 1.0,
      changefreq: 'monthly'
  },
  {
    path: '/boards/',
    lastmod: '2024-10-02',
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/templates/',
    lastmod: '2024-10-02',
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/pricing/',
    lastmod: '2024-10-02',
    priority: 1.0,
    changefreq: 'monthly'
  }
]

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
        new SitemapPlugin({ base: 'https://ziinlo.com', paths })
    ]
  },
  transpileDependencies: true
})
