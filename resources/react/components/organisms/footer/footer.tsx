import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import classNames from 'classnames'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = (theme: Theme) => ({
  layout: {
    width: 'auto',
    [theme.breakpoints.up(900)]: {
      width: 1200,
      margin: '0 auto',
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
})

export interface Props extends WithStyles<typeof styles> {}

function Header(props: Props) {
  const { classes } = props

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
    </footer>
  )
}

export default withStyles(styles)(Header)
