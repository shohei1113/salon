import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PATH from '../../../../const/path'
import { RequireAuth } from '../../../utils/require-auth'
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
    submit: {
      marginTop: 60,
    },
    form: {
      width: 300,
    },
    formItem: {
      marginTop: 32,
    },
  })
)

function Email(props: any) {
  const classes = useStyles({})
  const { auth } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      // dispatch(
      //   updateUser({
      //     user: response.data.user,
      //   })
      // )
      dispatch(clearLoader())
      dispatch(setSnackbar({ message: response.message }))
      setStartFetch(false)
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
      setStartFetch(false)
    }
  }, [response, error])

  const handleSubmit = (form, { resetForm }) => {
    const { password } = form
    dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/user/${auth.user.id}/auth`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        email: email,
      },
    })
    setStartFetch(true)
    resetForm({ email: '' })
  }

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h6">
            メールアドレス変更
          </Typography>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
            validate={(values: any) => {
              const errors: any = {}
              const emailError = composeValidators(
                required('メールアドレスを入力してください')
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
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(Email as any)
