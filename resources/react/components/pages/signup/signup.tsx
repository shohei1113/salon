import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Field, Formik } from 'formik'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {
  composeValidators,
  required,
  email,
  alphabeticAndNumeric,
  greaterNumber,
  sameValue,
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

  const handleSubmit = async form => {
    console.log(form)
    const res = await axios({
      method: 'GET',
      url: '/api/test',
      headers: {},
    })
    console.log(res)
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

export default withRouter(withStyles(styles)(Signup) as any)
