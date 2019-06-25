import React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  wrap: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contents: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    textAlign: 'center' as 'center',
    transform: 'translate(-50%, -50%)',
  },
  loader: {
    // marginBottom: 20,
  },
})

const Loader = (props: any) => {
  const { classes } = props

  return (
    <div className={classes.wrap}>
      <div className={classes.contents}>
        <CircularProgress className={classes.loader} />
        {/* <Typography
          component="p"
          variant="subtitle2"
          align="center"
          color="textPrimary"
        >
          now loading...
        </Typography> */}
      </div>
    </div>
  )
}
export default withStyles(styles)(Loader)
