import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import getUrlParam from '../../../utils/get-url-param'
import { initSalons } from '../../../redux/modules/salons'
import { DefaultTemplate } from '../../templates/default-template'
import { Album } from '../../molecules/album'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroUnit: {
      position: 'relative',
      height: 150,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      [theme.breakpoints.up('sm')]: {
        height: 150,
      },
    },
    heroMask: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    heroContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: 600,
      textShadow: '2px 2px 10px #000',
    },
    salons: {
      marginTop: 60,
    },
  })
)

const Salons: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const { salons } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const categoryId = getUrlParam('category-id')
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/category/${categoryId}/salon`,
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (!categoryId) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if (response) {
      dispatch(initSalons(response))
    }

    if (error) {
    }
  }, [response, error])

  return (
    <DefaultTemplate {...props}>
      <div
        className={classes.heroUnit}
        style={{ backgroundImage: `url(${salons.category.image_url})` }}
      >
        <div className={classes.heroMask} />
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ color: '#fff' }}
          >
            {salons.category.name}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ color: '#fff' }}
            paragraph
          >
            {salons.category.description}
          </Typography>
        </div>
      </div>
      <div className={classes.salons}>
        <Album cards={salons.category.salons} />
      </div>
    </DefaultTemplate>
  )
}

export default withRouter(Salons as any)
