import React, { useState, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import {
  editPost,
  setLoading,
  clearLoading,
} from '../../../../redux/modules/member'
import { setSnackbar, setModal } from '../../../../redux/modules/ui'

interface Props {
  auth: any
  id: number
  content: string
  user: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    content: {
      display: 'flex',
    },
    action: {
      // display: 'flex',
    },
    delete: {
      padding: 5,
    },
    avatar: {
      width: 30,
      height: 30,
    },
    text: {
      marginLeft: 8,
      paddingTop: 8,
    },
  })
)

function Comment(props: Props) {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const [isStartFetch, setStartFetch] = useState(false)
  const axiosConfig = {
    method: 'DELETE',
    url: `${PATH}/api/comment/${props.id}`,
    headers: { Authorization: `Bearer ${props.auth.token}` },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  function handleDelete() {
    dispatch(
      setModal({
        title: 'コメントを削除しますか？',
        description: '',
        callback: () => {
          dispatch(setLoading())
          setStartFetch(true)
        },
      })
    )
  }

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(editPost(response.data.post))
      dispatch(clearLoading())
      dispatch(setSnackbar({ message: response.message }))
      setStartFetch(false)
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoading())
      setStartFetch(false)
    }
  }, [response, error])

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        {props.user.image_url ? (
          <Avatar
            alt=""
            src={props.user.image_url}
            className={classes.avatar}
          />
        ) : (
          <Avatar className={classes.avatar}>
            <AccountCircle color="inherit" style={{ fontSize: 30 }} />
          </Avatar>
        )}
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          {props.content}
        </Typography>
      </div>
      {props.auth.user.id === props.user.id && (
        <div className={classes.action}>
          <IconButton
            aria-label="Delete"
            className={classes.delete}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default Comment
