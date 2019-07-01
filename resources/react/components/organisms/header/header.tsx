import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { toggleNav } from '../../../redux/modules/ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    avatar: {
      color: '#fff',
    },
  })
)

function Header() {
  const classes = useStyles({})
  const { isLoggedin, user } = useMappedState(
    React.useCallback(state => state.auth, [])
  )
  const dispatch = useDispatch()
  const toggleDrawer = () => {
    dispatch(toggleNav())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/">HAYAOKURI</Link>
          </Typography>
          {isLoggedin ? (
            user.image_url ? (
              <Avatar alt={user.name} src={user.image_url} />
            ) : (
              <Avatar className={classes.avatar}>
                <AccountCircle color="inherit" style={{ fontSize: 40 }} />
              </Avatar>
            )
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login">LOGIN</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
