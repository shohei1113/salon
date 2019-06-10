import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
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

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column' as any,
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: 300,
  },
  submit: {
    marginTop: 60,
  },
})

const Login: React.FC = (props: any) => {
  const { classes, history } = props
  console.log(props)
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(
        initAuth({
          token: response.access_token,
          user: response.user.user,
        })
      )
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: 'ログインしました' }))
      history.push('/')
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
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
    <DefaultTemplate {...props}>
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
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Login) as any)
