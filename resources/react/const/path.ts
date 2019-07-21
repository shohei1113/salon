let PATH = 'http://stg.hayaokuri.com'

if (process.env.NODE_ENV === 'development') {
  // PATH = 'https://hayaokuri.com'
  PATH = 'http://stg.hayaokuri.com'
} else {
  PATH = ''
}

export default PATH
