import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'

import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Avatar from '@material-ui/core/Avatar'
import CommentForm from './comment-form'

interface Props {
  id: number
  content: string
  user: string
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

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        {/* <Avatar alt={user.name} src={user.image_url} /> */}
        <Avatar
          alt=""
          src="https://hayaokuri.s3-ap-northeast-1.amazonaws.com/stg/user/CPt2RoyvXzM8yfgu2ZA9SoGF1aZVffG2GPwCj3FX.png"
          className={classes.avatar}
        />
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          {props.content}
        </Typography>
      </div>
      <div className={classes.action}>
        <IconButton aria-label="Delete" className={classes.delete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default Comment
