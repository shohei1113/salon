import React, { useEffect, useCallback } from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import getUrlParam from '../../../utils/get-url-param'
import getRole from '../../../utils//get-role'
import { setModal, clearModal } from '../../../redux/modules/ui'
import { initSalon, resetSalon } from '../../../redux/modules/salon'
import { DefaultTemplate } from '../../templates/default-template'
import { LoaderPage } from '../../organisms/loader-page'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      maxWidth: 960,
      margin: '0 auto',
      padding: '0 16px',
    },
    hero: {
      marginBottom: 80,
    },
    title: {
      display: 'inline-block',
      borderBottom: '2px solid #ccc',
    },
    content: {
      marginBottom: 40,
    },
    buttonWrap: {
      textAlign: 'center',
    },
    contentTitle: { marginBottom: 20 },
  })
)

const Salon: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const { auth, salon } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const salonId = getUrlParam('salon-id')

  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/salon/preview/${salonId}`,
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (auth.isPrepared) {
      if (response) {
        if (!auth.user) {
          dispatch(initSalon({ salon: response.data.salon, role: 3 }))
          return
        }
        const role = getRole(
          auth.user.id,
          response.data.salon.owner.id,
          response.data.salon.is_member
        )
        dispatch(initSalon({ salon: response.data.salon, role }))
      }

      if (error) {
      }
    }
  }, [response, error, auth])

  useEffect(() => {
    return () => {
      dispatch(resetSalon())
    }
  }, [])

  const handleRegister = () => {
    if (auth.isLoggedin) {
      history.push('/salon/register')
    } else {
      dispatch(
        setModal({
          title: 'サロン入会',
          description: 'サロンに入会するにはログインを行ってください。',
          callback: () => {
            history.push('/login')
          },
        })
      )
    }
  }

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      {salon.isPrepared ? (
        <div className={classes.wrap}>
          <div className={classes.hero}>
            <Typography
              variant="h5"
              color="inherit"
              align="center"
              gutterBottom
            >
              {salon.salon.title}
            </Typography>
            <Typography variant="body2" color="inherit">
              {salon.salon.description}
            </Typography>
          </div>

          <div className={classes.content}>
            <div className={classes.contentTitle}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                メッセージ
              </Typography>
            </div>
            <Typography variant="body2" color="inherit">
              {salon.salon.salon_detail.message}
            </Typography>
          </div>

          <div className={classes.content}>
            <div className={classes.contentTitle}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                コンテンツ
              </Typography>
            </div>
            <Typography variant="body2" color="inherit">
              {salon.salon.salon_detail.contents}
            </Typography>
          </div>

          <div className={classes.content}>
            <div className={classes.contentTitle}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                こんな人におすすめ
              </Typography>
            </div>
            <Typography variant="body2" color="inherit">
              {salon.salon.salon_detail.target}
            </Typography>
          </div>

          <div className={classes.buttonWrap}>
            {salon.role === 1 || salon.role === 2 ? (
              <Link to={`/salon/member?salon-id=${salon.salon.id}`}>
                <Button type="submit" variant="contained" color="primary">
                  サロンへ進む
                </Button>
              </Link>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                サロン登録
              </Button>
            )}
          </div>
        </div>
      ) : (
        <LoaderPage />
      )}
    </DefaultTemplate>
  )
}

export default withRouter(Salon as any)
