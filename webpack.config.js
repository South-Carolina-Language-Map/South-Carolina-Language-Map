use: {
    loader: 'babel-loader',
    options: {
      presets: ['my-custom-babel-preset'],
      ..,
      ..,
      ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
    }
  }
  