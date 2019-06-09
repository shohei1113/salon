const getUrlParam = (key: string) => {
  const query = window.location.search
  if (query === '') {
    return null
  }

  const value = query
    .split('?')[1]
    .split('&')
    .find(param => param.split('=')[0] === key)
  return value ? value.split('=')[1] : null
}

export default getUrlParam
