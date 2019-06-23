import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import useFetchApi from '../../../hooks/use-fetch-api'
import PATH from '../../../const/path'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
)

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

function Category() {
  const classes = useStyles({})
  const { token } = useMappedState(useCallback(state => state.auth, []))
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/category`,
    headers: { Authorization: `Bearer ${token}` },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (error) {
      // dispatch(clearLoader())
    }

    if (response) {
      console.log(response)
      // dispatch(
      //   loginAuth({
      //     user: response.data.user,
      //   })
      // )
      // dispatch(clearLoader())
    }
  }, [response, error])

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        サロンカテゴリー
      </Typography>

      <Grid container spacing={4}>
        {featuredPosts.map(post => (
          <Grid item key={post.title} xs={12} md={6}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h6">
                    {post.title}
                  </Typography>
                  <Typography variant="caption" paragraph>
                    {post.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    <Link to={post.url}>サロン一覧へ</Link>
                  </Typography>
                </CardContent>
              </div>

              <CardMedia
                className={classes.cardMedia}
                image={`/assets/images/category/${post.image}`}
                title="Image title"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Category
