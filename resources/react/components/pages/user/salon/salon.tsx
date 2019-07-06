import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import Card from './card'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
    },
    contents: {
      marginTop: 60,
    },
    salons: {
      marginTop: 24,
      flexGrow: 1,
      maxWidth: 900,
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        padding: '0 16px',
      },
    },
  })
)

const Salons: React.FC = (props: any) => {
  const classes = useStyles({})
  const [ownerSalons, setOwnerSalons] = useState([])
  const [memberSalons, setMemberSalons] = useState([])
  const { auth } = useMappedState(useCallback(state => state, []))
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/user/mypage`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (response) {
      setOwnerSalons(response.data.owner)
      setMemberSalons(response.data.member)
    }

    if (error) {
    }
  }, [response, error])

  return (
    <DefaultTemplate {...props} isDefaultSpace={true}>
      <div className={classes.heroUnit}>
        <div>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              開設サロン
            </Typography>
          </div>
          <div className={classes.salons}>
            <Grid container spacing={2}>
              {ownerSalons.map(card => (
                <Card key={card.salon.id} card={card.salon} />
              ))}
            </Grid>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              受講サロン
            </Typography>
          </div>
          <div className={classes.salons}>
            <Grid container spacing={2}>
              {memberSalons.map(card => (
                <Card key={card.salon.id} card={card.salon} />
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  )
}

export default Salons as any
