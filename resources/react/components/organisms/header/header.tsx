import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { toggleNav } from '../../../redux/modules/ui'

const styles = createStyles({
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
})

export interface Props extends WithStyles<typeof styles> {}

function Header(props: Props) {
  const { classes } = props
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
          <Button color="inherit">
            <Link to="/login">LOGIN</Link>
          </Button>
          <Button color="inherit">
            <Link to="/signup">signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header)
