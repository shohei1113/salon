import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = (theme: any) => ({
  layout: {
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    backgroundImage: 'url(/assets/images/hero.jpg)',
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    // filter: 'brightness(0.6)',
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
})

function Blog(props: any) {
  const { classes } = props

  return (
    <div className={classes.layout}>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Title of a longer featured blog post
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Multiple lines of text that form the lede, informing new readers
                quickly and efficiently about what&apos;s most interesting in
                this post&apos;s contents…
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Blog)
