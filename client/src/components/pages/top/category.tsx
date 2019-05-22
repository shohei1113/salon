import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
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
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
})

const featuredPosts = [
  {
    title: 'management',
    url: '/category/management',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    title: 'entertainment',
    url: '/category/entertainment',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
]

function Category(props: any) {
  const { classes } = props

  return (
    <Grid container spacing={40} className={classes.cardGrid}>
      {featuredPosts.map(post => (
        <Grid item key={post.title} xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  <Link to={post.url}>Continue reading...</Link>
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image="/assets/images/hero.jpg" // eslint-disable-line max-len
                title="Image title"
              />
            </Hidden>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default withStyles(styles)(Category)
