// TODO: change api in production

const PATH =
  process.env.NODE_ENV === 'production'
    ? 'http://stg.hayaokuri.com'
    : 'http://stg.hayaokuri.com'

export default PATH
