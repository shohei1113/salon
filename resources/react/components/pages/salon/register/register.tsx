import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import classNames from 'classnames'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import { RequireAuth } from '../../../utils/require-auth'
import getUrlParam from '../../../../utils/get-url-param'
import { composeValidators, required } from '../../../../utils/validator'
import { setLoader, clearLoader } from '../../../../redux/modules/ui'
import { TextField } from '../../../atoms/text-field'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column' as any,
      alignItems: 'center',
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: 20,
    },
    form: {
      width: 300,
    },
    submit: {
      marginTop: 60,
    },
  })
)

const Salon: React.FC = (props: any) => {
  const classes = useStyles({})
  const { token } = useMappedState(useCallback(state => state.auth, []))
  const salonId = getUrlParam('salon-id')
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      // dispatch(
      //   initAuth({
      //     token: response.data.access_token,
      //     user: response.data.user,
      //   })
      // )
      dispatch(clearLoader())
    }

    if (error) {
      console.log('エラー！')
      // dispatch(clearLoader())
    }
  }, [response, error])

  const handleSubmit = form => {
    dispatch(setLoader())
    console.log('ok')
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/salon/${salonId}/payment/card`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: form.name,
        number: form.number,
        exp_month: form.exp_month,
        exp_year: form.exp_year,
        cvc: form.cvc,
      },
    })
    setStartFetch(true)
  }

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            サロン入会
          </Typography>
          <Formik
            initialValues={{
              name: '',
              number: '',
              exp_month: '',
              exp_year: '',
              cvc: '',
            }}
            onSubmit={handleSubmit}
            validate={(values: any) => {
              const errors: any = {}
              const nameError = composeValidators(
                required('名前を入力してください')
              )(values.name)
              const numberError = composeValidators(
                required('カード番号を入力してください')
              )(values.number)
              const monthError = composeValidators(
                required('月を入力してください')
              )(values.exp_month)
              const yearError = composeValidators(
                required('年を入力してください')
              )(values.exp_year)
              const cvcError = composeValidators(
                required('セキュリティコードを入力してください')
              )(values.cvc)

              if (nameError) {
                errors.name = nameError
              }
              if (numberError) {
                errors.number = numberError
              }
              if (monthError) {
                errors.exp_month = monthError
              }
              if (yearError) {
                errors.exp_year = yearError
              }
              if (cvcError) {
                errors.cvc = cvcError
              }

              return errors
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Field
                  name="name"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="text"
                      label="名前"
                      placeholder="TARO YAMADA"
                    />
                  )}
                />
                <Field
                  name="number"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="text"
                      label="カード番号"
                      placeholder="0123456789012345"
                    />
                  )}
                />
                <Field
                  name="exp_month"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="text"
                      label="月"
                      placeholder="01"
                    />
                  )}
                />
                <Field
                  name="exp_year"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="text"
                      label="年"
                      placeholder="20"
                    />
                  )}
                />
                <Field
                  name="cvc"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="text"
                      label="セキュリティコード"
                      placeholder="000"
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  送信
                </Button>
              </form>
            )}
          />
        </div>
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(Salon as any)
