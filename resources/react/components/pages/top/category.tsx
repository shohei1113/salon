import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import useFetchApi from '../../../hooks/use-fetch-api'
import PATH from '../../../const/path'
import { initCategories } from '../../../redux/modules/categories'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    category: {
      marginTop: 16,
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
    cardLink: {
      marginTop: 16,
    },
  })
)

function Category() {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const { categories } = useMappedState(useCallback(state => state, []))
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/category`,
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (response) {
      console.log(response)
      dispatch(initCategories(response))
    }
    if (error) {
    }
  }, [response, error])

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        color="textPrimary"
      >
        サロンカテゴリー
      </Typography>

      <Grid container spacing={4} className={classes.category}>
        {categories.categories.map(item => (
          <Grid item key={item.category.id} xs={12} md={6}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h3" variant="h6">
                    {item.category.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="caption"
                    color="textSecondary"
                  >
                    {item.category.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    className={classes.cardLink}
                  >
                    <Link to={`/salons?category-id=${item.category.id}`}>
                      サロン一覧へ
                    </Link>
                  </Typography>
                </CardContent>
              </div>

              <CardMedia
                className={classes.cardMedia}
                image={item.category.image_url}
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
