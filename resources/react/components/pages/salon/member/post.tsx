import React, { useState, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import dateFns from 'date-fns'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccountCircle from '@material-ui/icons/AccountCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import {
  deletePost,
  setLoading,
  clearLoading,
} from '../../../../redux/modules/member'
import { setSnackbar, setModal } from '../../../../redux/modules/ui'
import CommentForm from './comment-form'
import Comment from './comment'

interface Props {
  auth: any
  owner: any
  role: 1 | 2
  id: number
  content: string
  image_url: string | null
  created_at: Date
  comments: any[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      // maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#bbb',
    },
  })
)

function Post(props: Props) {
  const classes = useStyles({})
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const [isStartFetch, setStartFetch] = useState(false)
  const axiosConfig = {
    method: 'DELETE',
    url: `${PATH}/api/post/${props.id}`,
    headers: { Authorization: `Bearer ${props.auth.token}` },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  function handleDelete() {
    dispatch(
      setModal({
        title: '投稿を削除しますか？',
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
      dispatch(deletePost(response.data.post))
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
    <Card className={classes.card}>
      <CardHeader
        avatar={
          props.owner.image_url ? (
            <Avatar alt="" src={props.owner.image_url} />
          ) : (
            <Avatar className={classes.avatar}>
              <AccountCircle color="inherit" style={{ fontSize: 40 }} />
            </Avatar>
          )
        }
        action={
          props.role === 1 && (
            <IconButton aria-label="Delete" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )
        }
        subheader={dateFns.format(props.created_at, 'YYYY-MM-DD hh:mm')}
      />

      {props.image_url && (
        <CardMedia
          className={classes.media}
          image={props.image_url}
          title="Paella dish"
        />
      )}

      <CardContent>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" component="p">
          コメント一覧
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <CommentForm postId={props.id} />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.comments.map(comment => (
            <Comment key={comment.id} auth={props.auth} {...comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Post
