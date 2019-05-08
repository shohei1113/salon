import React from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { toggleNav } from '../../../redux/modules/ui'

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
  const isOpenNav = useMappedState(
    React.useCallback(state => state.ui.isOpenNav, [])
  )
  const dispatch = useDispatch()

  const toggleDrawer = () => {
    dispatch(toggleNav())
  }
  const changePage = (path: string) => {
    dispatch(toggleNav())
    history.push(path)
  }

  return (
    <div>
      <Drawer open={isOpenNav} onClose={toggleDrawer}>
        <div className={classes.list}>
          <List>
            {[
              { name: 'top', path: '/' },
              { name: 'about', path: '/about' },
            ].map((item, index) => (
              <ListItem
                key={item.path}
                button
                onClick={() => {
                  changePage(item.path)
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(Navigation)
