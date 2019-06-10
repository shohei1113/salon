import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import { resetAuth } from '../../../redux/modules/auth'
import {
  toggleNav,
  setLoader,
  clearLoader,
  setSnackbar,
} from '../../../redux/modules/ui'

const styles = createStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

export interface Props extends WithStyles<typeof styles> {
  history: any
}

function Navigation(props: Props) {
  const { classes, history } = props
  const { auth, ui } = useMappedState(React.useCallback(state => state, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(resetAuth())
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: response.message }))
      history.push('/')
    }
  }, [response])

  useEffect(() => {
    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
    }
  }, [error])

  const toggleDrawer = () => {
    dispatch(toggleNav())
  }

  const changePage = (path: string) => {
    dispatch(toggleNav())
    history.push(path)
  }

  const handleLogout = () => {
    dispatch(setLoader())
    setAxiosConfig({
      method: 'DELETE',
      url: `${PATH}/api/me`,
      data: {
        token: auth.token,
      },
    })
    setStartFetch(true)
  }

  return (
    <div>
      <Drawer open={ui.isOpenNav} onClose={toggleDrawer}>
        <div className={classes.list}>
          <List>
            <ListItem
              button
              onClick={() => {
                changePage('/')
              }}
            >
              <ListItemText primary="top" />
            </ListItem>
          </List>
          <Divider />
          {auth.isLoggedin && (
            <>
              <List>
                <ListSubheader inset>サロン</ListSubheader>
                <Link to="/">
                  <ListItem button>
                    <ListItemText primary="開講サロン" />
                  </ListItem>
                </Link>

                <ListItem button>
                  <ListItemText primary="受講サロン" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  <ListItemText primary="ログアウト" />
                </ListItem>
              </List>
            </>
          )}
          <Divider />
        </div>
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(Navigation)
