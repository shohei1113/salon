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
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
  },
  layout: {
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    padding: 200,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    backgroundImage: 'url(/assets/images/hero.jpg)',
    color: theme.palette.common.white,
    // filter: 'brightness(0.6)',
  },
  mainFeaturedPostContent: {
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
    title: '経営コース',
    url: '/salons?category-id=1',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'management.jpg',
  },
  {
    title: '芸能コース',
    url: '/salons?category-id=2',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'entertainment.jpg',
  },
]

function Category(props: any) {
  const { classes } = props

  return (
    <div>
      <div className={classes.heroContent}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          サロンカテゴリー
        </Typography>
      </div>

      <Grid container spacing={4} className={classes.cardGrid}>
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
                    <Link to={post.url}>もっとみる</Link>
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={`/assets/images/category/${post.image}`}
                  title="Image title"
                />
              </Hidden>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Category)
