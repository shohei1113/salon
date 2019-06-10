import React, { useState, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import { Field, Formik } from 'formik'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PATH from '../../../const/path'
import { composeValidators, required } from '../../../utils/validator'
import getUrlParam from '../../../utils/get-url-param'
import useFetchApi from '../../../hooks/use-fetch-api'
import { initAuth } from '../../../redux/modules/auth'
import { setLoader, clearLoader } from '../../../redux/modules/ui'
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
  submit: {
    marginTop: 60,
  },
  form: {
    width: 300,
  },
})

const Register: React.FC = (props: any) => {
  const { classes } = props
  const token = getUrlParam('token')
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
      url: `${PATH}/api/register`,
      data: {
        token,
        name: form.name,
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
          本登録
        </Typography>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {}
            const nameError = composeValidators(
              required('名前を入力してください')
            )(values.name)

            if (nameError) {
              errors.name = nameError
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
                    placeholder="田中 太郎"
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

export default withRouter(withStyles(styles)(Register) as any)
