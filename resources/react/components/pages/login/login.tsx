import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PATH from '../../../const/path'
import {
  composeValidators,
  required,
  email,
  alphabeticAndNumeric,
  greaterNumber,
} from '../../../utils/validator'
import useFetchApi from '../../../hooks/use-fetch-api'
import { initAuth } from '../../../redux/modules/auth'
import { setLoader, clearLoader, setSnackbar } from '../../../redux/modules/ui'
import { DefaultTemplate } from '../../templates/default-template'
import { TextField } from '../../atoms/text-field'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column' as any,
      alignItems: 'center',
    },
    avatar: {
      marginBottom: 20,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: 300,
    },
    formItem: {
      marginTop: 16,
    },
    submit: {
      marginTop: 60,
    },
    passwordLink: {
      marginTop: 40,
      fontSize: 12,
      textDecoration: 'underline',
    },
  })
)

const Login: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(
        initAuth({
          token: response.data.access_token,
          user: response.data.user,
        })
      )
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: response.message }))
      setStartFetch(false)
      history.push('/')
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: 'ログインに失敗しました' }))
      // dispatch(setSnackbar({ message: error.response.data.message }))
      setStartFetch(false)
    }
  }, [response, error])

  const handleSubmit = form => {
    dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/me`,
      data: {
        email: form.email,
        password: form.password,
      },
    })
    setStartFetch(true)
  }

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {}
            const emailError = composeValidators(
              required('メールアドレスを入力してください'),
              email
            )(values.email)
            const passwordError = composeValidators(
              required('パスワードを入力してください'),
              alphabeticAndNumeric,
              greaterNumber(6)
            )(values.password)

            if (emailError) {
              errors.email = emailError
            }
            if (passwordError) {
              errors.password = passwordError
            }

            return errors
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.formItem}>
                <Field
                  name="email"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="email"
                      label="メールアドレス"
                      placeholder="example.com"
                    />
                  )}
                />
              </div>
              <div className={classes.formItem}>
                <Field
                  name="password"
                  render={({ field, form }) => (
                    <TextField
                      field={field}
                      form={form}
                      type="password"
                      label="パスワード"
                      placeholder="半角英数6文字以上"
                    />
                  )}
                />
              </div>
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
        <Link to="/password/send" className={classes.passwordLink}>
          パスワードを忘れた方はこちら
        </Link>
      </div>
    </DefaultTemplate>
  )
}

export default withRouter(Login as any)
