let PATH = 'http://stg.hayaokuri.com'

if (process.env.NODE_ENV === 'production') {
  PATH = 'https://hayaokuri.com'
} else {
  PATH = 'http://stg.hayaokuri.com'
}

export default PATH
