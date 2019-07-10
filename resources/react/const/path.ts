// TODO: change api in production

const PATH =
  process.env.NODE_ENV === 'production'
    ? 'https://hayaokuri.com'
    : 'http://stg.hayaokuri.com'

export default PATH
