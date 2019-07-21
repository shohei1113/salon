import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PATH from '../../../../const/path'
import { composeValidators, required, email } from '../../../../utils/validator'
import useFetchApi from '../../../../hooks/use-fetch-api'
import {
  setLoader,
  clearLoader,
  setSnackbar,
} from '../../../../redux/modules/ui'
import { DefaultTemplate } from '../../../templates/default-template'
import { TextField } from '../../../atoms/text-field'

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
  })
)

const Send: React.FC = (props: any) => {
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
      setStartFetch(false)
      history.push('/')
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: error.response.data.message }))
      setStartFetch(false)
    }
  }, [response, error])

  const handleSubmit = form => {
    dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/user/reset/password`,
      data: {
        email: form.email,
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
        <Typography component="h1" variant="h6">
          パスワードリセット
        </Typography>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {}
            const emailError = composeValidators(
              required('メールアドレスを入力してください'),
              email
            )(values.email)

            if (emailError) {
              errors.email = emailError
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

export default withRouter(Send as any)
