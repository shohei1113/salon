import React from 'react'
import { withRouter } from 'react-router-dom'
import { Field, Formik } from 'formik'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {
  composeValidators,
  required,
  email,
  alphabeticAndNumeric,
} from '../../../utils/validator'
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

const Signup: React.FC = (props: any) => {
  const { classes } = props

  const handleSubmit = form => {
    console.log(form)
  }

  return (
    <DefaultTemplate {...props}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {}
            const emailError = composeValidators(
              required('メールアドレスを入力してください'),
              email
            )(values.email)
            const passwordError = composeValidators(
              required('パスワードを入力してください'),
              alphabeticAndNumeric
            )(values.password)
            const nameError = composeValidators(
              required('名前を入力してください')
            )(values.name)

            if (emailError) {
              errors.email = emailError
            }
            if (passwordError) {
              errors.password = passwordError
            }
            if (nameError) {
              errors.name = nameError
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
                    placeholder="password"
                  />
                )}
              />
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

export default withRouter(withStyles(styles)(Signup) as any)
