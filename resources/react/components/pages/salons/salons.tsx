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
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
    },
    salons: {
      marginTop: 24,
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
    <DefaultTemplate {...props} isDefaultSpace={true}>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            経営者コース
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
        </div>
      </div>
      <div className={classes.salons}>
        <Album cards={salons.salons} />
      </div>
    </DefaultTemplate>
  )
}

export default withRouter(Salons as any)
