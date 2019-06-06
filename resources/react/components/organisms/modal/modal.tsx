import React from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { setModal, clearModal } from '../../../redux/modules/ui'

const Modal = () => {
  const { isOpen, title, description } = useMappedState(
    React.useCallback(state => state.ui.modal, [])
  )
  const dispatch = useDispatch()

  function handleOpen() {
    dispatch(
      setModal({
        title: 'タイトル',
        description: '説明',
      })
    )
  }

  function handleClose() {
    dispatch(clearModal())
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            いいえ
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
