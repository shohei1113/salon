import React from 'react'
import { withRouter } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { DefaultTemplate } from '../../templates/default-template'

declare const FB: any

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column' as any,
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: 30,
  },
})

const Login: React.FC = (props: any) => {
  const { classes } = props
  console.log(props)

  const responseFacebook = response => {
    console.log(response)
  }

  return (
    <DefaultTemplate {...props}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={checkLoginState}
        >
          sign up or login
        </Button> */}
      </div>
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Login) as any)
