import React, { useState, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
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
  sameValue,
} from '../../../utils/validator'
import useFetchApi from '../../../hooks/use-fetch-api'
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
    submit: {
      marginTop: 60,
    },
  })
)

const Signup: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: response.message }))
      history.push('/signup/complete')
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
      url: `${PATH}/api/signup`,
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
          新規登録
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', passwordConfirm: '' }}
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
            const passwordConfirmError = composeValidators(
              required('パスワードを入力してください'),
              sameValue(values.password)
            )(values.passwordConfirm)

            if (emailError) {
              errors.email = emailError
            }
            if (passwordError) {
              errors.password = passwordError
            }
            if (passwordConfirmError) {
              errors.passwordConfirm = passwordConfirmError
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
              <Field
                name="passwordConfirm"
                render={({ field, form }) => (
                  <TextField
                    field={field}
                    form={form}
                    type="password"
                    label="パスワード確認"
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

export default withRouter(Signup as any)
