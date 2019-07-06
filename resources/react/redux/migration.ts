const version = 1
const migrations = {
  [version - 1]: state => {
    return {
      ...state,
    }
  },
  [version]: state => {
    return {}
  },
}

export { version, migrations }
