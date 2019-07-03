const TerserPlugin = require('terser-webpack-plugin')
let mix = require('laravel-mix')

mix.browserSync('http://localhost:8085')

mix
  .react('resources/react/index.tsx', 'public/assets/javascript')
  .sourceMaps()
  .disableNotifications()
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  })

if (mix.inProduction()) {
  mix
    .webpackConfig({
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: { drop_console: true },
            },
          }),
        ],
      },
    })
    .version()
}
