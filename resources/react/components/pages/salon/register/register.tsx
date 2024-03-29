import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import { RequireAuth } from '../../../utils/require-auth'
import { composeValidators, required } from '../../../../utils/validator'
import { setLoader, clearLoader } from '../../../../redux/modules/ui'
import { TextField } from '../../../atoms/text-field'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      maxWidth: 600,
      margin: '0 auto',
    },
    main: {
      marginTop: 40,
    },
    contents: {
      marginTop: 80,
    },
    tableWrap: {
      width: '100%',
      maxWidth: 600,
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {},

    form: {},
    formItem: {
      marginTop: 16,
    },
    submit: {
      marginTop: 60,
    },
  })
)

const Salon: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const { auth, salon } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (!salon.salon.id) {
      history.push('/')
    }
  }, [salon])

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      setStartFetch(false)
      history.push(`/salon/member?salon-id=${salon.salon.id}`)
      dispatch(clearLoader())
    }

    if (error) {
      console.log('エラー！')
      setStartFetch(false)
      dispatch(clearLoader())
    }
  }, [response, error])

  const handleSubmit = form => {
    dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/salon/${salon.salon.id}/payment/card`,
      headers: { Authorization: `Bearer ${auth.token}` },
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
        <div className={classes.wrap}>
          <Typography component="h1" variant="h5" align="center">
            サロン入会
          </Typography>
          <div className={classes.main}>
            <div>
              <Typography component="h1" variant="subtitle1">
                サロン詳細
              </Typography>
              <Paper className={classes.tableWrap}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">項目</TableCell>
                      <TableCell align="left" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        タイトル
                      </TableCell>
                      <TableCell align="left">{salon.salon.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        オーナー
                      </TableCell>
                      <TableCell align="left">
                        {salon.salon.owner.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        料金（月額）
                      </TableCell>
                      <TableCell align="left">¥{salon.salon.price}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </div>
            <div className={classes.contents}>
              <Typography component="h1" variant="subtitle1">
                クレジットカード情報入力
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
                    <div className={classes.formItem}>
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
                    </div>
                    <div className={classes.formItem}>
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
                    </div>
                    <div className={classes.formItem}>
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
                    </div>
                    <div className={classes.formItem}>
                      <Field
                        name="exp_year"
                        render={({ field, form }) => (
                          <TextField
                            field={field}
                            form={form}
                            type="text"
                            label="年(西暦下2ケタ)"
                            placeholder="20"
                          />
                        )}
                      />
                    </div>
                    <div className={classes.formItem}>
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
          </div>
        </div>
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(Salon as any)
