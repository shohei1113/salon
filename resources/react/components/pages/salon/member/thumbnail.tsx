import React, { useState, useEffect, useCallback } from 'react'

class Thumbnail extends React.Component<{ file: any; reset: any }> {
  state = {
    loading: false,
    thumb: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file, reset } = this.props
    const { loading, thumb } = this.state

    if (!file) {
      return null
    }

    if (loading) {
      return <p>loading...</p>
    }

    return (
      <div>
        <div onClick={reset}>X</div>
        <img
          src={thumb}
          alt={file.name}
          width={100}
          style={{ marginTop: 16 }}
        />
      </div>
    )
  }
}

export default Thumbnail
