import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      position: 'relative',
    },
    mainFeaturedPost: {
      backgroundColor: theme.palette.grey[800],
      backgroundImage: 'url(/assets/images/hero.jpg)',
      backgroundSize: 'cover',
      color: theme.palette.common.white,
      filter: 'brightness(0.6)',
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
      [theme.breakpoints.up('sm')]: {
        height: 200,
      },
    },
    mainFeaturedPostContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      transform: 'translate(-50%, -50%)',
      textShadow: '2px 2px 10px #000',
      color: theme.palette.common.white,
      [theme.breakpoints.up('md')]: {
        paddingRight: 0,
      },
    },
  })
)

function Hero() {
  const classes = useStyles({})

  return (
    <div className={classes.layout}>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6} />
        </Grid>
      </Paper>
      <div className={classes.mainFeaturedPostContent}>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          align="center"
          gutterBottom
        >
          HAYAOKURI
        </Typography>
        <Typography variant="body1" color="inherit" align="center">
          会員制オンラインサロン
        </Typography>
      </div>
    </div>
  )
}

export default Hero
