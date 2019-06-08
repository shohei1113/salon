import React, { useState } from 'react'
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
import useFetchApi from '../../../hooks/use-fetch-api'
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
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, data, error } = useFetchApi(axiosConfig, isStartFetch)

  if (!isLoading && data) {
    console.log('成功！', data)
    dispatch(clearLoader())
  }

  if (!isLoading && error) {
    console.log('エラー！')
    dispatch(clearLoader())
  }

  const handleSubmit = form => {
    console.log('submit')
    dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/register`,
      data: {
        name: 'hoge7',
        email: 'hoge7@hayaokuri.com',
        password: '00000000',
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
