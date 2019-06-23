import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  })
)

function NavItem(props) {
  const { text, handleClick } = props
  const dispatch = useDispatch()
  const changePage = () => {
    dispatch(toggleNav())
    if (handleClick) {
      console.log('0')
      handleClick()
    }
  }

  return (
    <ListItem button onClick={changePage}>
      <ListItemText primary={text} />
    </ListItem>
  )
}

function Navigation(props: any) {
  const { history } = props
  const classes = useStyles({})
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
          <Divider />
          {auth.isLoggedin ? (
            <>
              <List>
                <ListSubheader inset>サロン</ListSubheader>
                <Link to="/">
                  <NavItem text="開講サロン" />
                </Link>
                <Link to="/">
                  <NavItem text="受講サロン" />
                </Link>
              </List>
              <Divider />
              <List>
                <NavItem text="ログアウト" handleClick={handleLogout} />
              </List>
            </>
          ) : (
            <List>
              <Link to="/login">
                <NavItem text="ログイン" />
              </Link>
              <Link to="/signup">
                <NavItem text="新規登録" />
              </Link>
            </List>
          )}
          <Divider />
        </div>
      </Drawer>
    </div>
  )
}

export default Navigation
