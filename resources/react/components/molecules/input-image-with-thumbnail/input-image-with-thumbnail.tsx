import React, { useState, useEffect, useCallback } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

interface Props {
  imageUri: string
  errorMessage: string
  handleChange: any
  handleReset: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputFile: {
      display: 'none',
    },
    inputLabel: {
      display: 'block',
    },
    inputButton: {
      width: '100%',
    },
    invalidMessage: {
      marginTop: 8,
      color: 'red',
      fontSize: 11,
    },
    previewWrap: {
      display: 'flex',
      marginTop: 32,
    },
  })
)

function InputImageWithThumbnail(props: Props) {
  const { imageUri, errorMessage, handleChange, handleReset } = props
  const classes = useStyles({})

  return (
    <>
      <input
        id="image"
        name="image"
        type="file"
        onChange={handleChange}
        className={classes.inputFile}
      />

      <label htmlFor="image" className={classes.inputLabel}>
        <Button
          variant="outlined"
          component="span"
          className={classes.inputButton}
        >
          画像を選択
        </Button>
      </label>

      {imageUri && (
        <div className={classes.previewWrap}>
          <img src={imageUri} alt="" />
          <IconButton aria-label="Delete" onClick={handleReset}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      <div className={classes.invalidMessage}>{errorMessage}</div>
    </>
  )
}

export default InputImageWithThumbnail
