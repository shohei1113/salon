import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
      <Typography
        variant="caption"
        align="center"
        color="textSecondary"
        component="p"
      >
        © 2019 HAYAOKURI
      </Typography>
    </footer>
  )
}

export default withStyles(styles)(Header)
