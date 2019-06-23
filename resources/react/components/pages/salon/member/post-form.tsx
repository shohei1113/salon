import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PATH from '../../../../const/path'
import { composeValidators, required } from '../../../../utils/validator'
import getUrlParam from '../../../../utils/get-url-param'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { initAuth } from '../../../../redux/modules/auth'
import {
  setLoader,
  clearLoader,
  setSnackbar,
} from '../../../../redux/modules/ui'
import { addPost } from '../../../../redux/modules/member'

import { TextField } from '../../../atoms/text-field'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
    submit: {
      marginTop: 60,
    },
    form: {
      width: 300,
    },
  })
)

class Thumb extends React.Component<{ file: any }> {
  state = {
    loading: false,
    thumb: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file } = this.props
    const { loading, thumb } = this.state

    if (!file) {
      return null
    }

    if (loading) {
      return <p>loading...</p>
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    )
  }
}

const PostForm: React.FC = (props: any) => {
  const classes = useStyles({})
  const { token } = useMappedState(useCallback(state => state.auth, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      // dispatch(
      //   initAuth({
      //     token: response.data.access_token,
      //     user: response.data.user,
      //   })
      // )
      // dispatch(clearLoader())
      dispatch(addPost(response))
      dispatch(setSnackbar({ message: response.message }))
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
    }
  }, [response, error])

  const handleSubmit = (form, { resetForm }) => {
    const { content, file } = form

    const formData = new FormData()
    formData.append('salon_id', '3')
    formData.append('title', 'a')
    formData.append('content', content)
    formData.append('image', file)

    // dispatch(setLoader())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/post`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    resetForm({ content: '', file: null })

    setStartFetch(true)
  }

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{ content: '', file: null }}
        onSubmit={handleSubmit}
        validate={(values: any) => {
          const errors: any = {}
          const contentError = composeValidators(
            required('テキストを入力してください')
          )(values.content)

          if (contentError) {
            errors.content = contentError
          }

          return errors
        }}
        render={({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Field
              name="content"
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
            <Field
              name="image"
              render={({ field, form }) => (
                <div>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={event => {
                      setFieldValue('file', event.currentTarget.files[0])
                    }}
                    className="form-control"
                  />
                  <label htmlFor="image">
                    <Button variant="outlined" component="span">
                      ファイルを選択
                    </Button>
                  </label>

                  <Thumb file={values.file} />
                </div>
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
    </Paper>
  )
}

export default PostForm
