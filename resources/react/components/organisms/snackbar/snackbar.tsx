import React from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { setSnackbar, clearSnackbar } from '../../../redux/modules/ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
)

function SimpleSnackbar() {
  const classes = useStyles({})
  const { isOpen, variant, message } = useMappedState(
    React.useCallback(state => state.ui.snackbar, [])
  )
  const dispatch = useDispatch()

  function handleOpen() {
    dispatch(setSnackbar({ variant: '', message: 'test' }))
  }

  function handleClose() {
    dispatch(clearSnackbar())
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open simple snackbar</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        autoHideDuration={6000}
        // onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}

export default SimpleSnackbar
