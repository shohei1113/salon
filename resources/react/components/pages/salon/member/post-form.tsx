import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import PATH from '../../../../const/path'
import { composeValidators, required, image } from '../../../../utils/validator'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { setSnackbar } from '../../../../redux/modules/ui'
import {
  setLoading,
  clearLoading,
  createPost,
} from '../../../../redux/modules/member'
import { InputImageWithThumbnail } from '../../../molecules/input-image-with-thumbnail'
import { TextArea } from '../../../atoms/text-area'
// import Thumbnail from './thumbnail'
import resizeImage from './thumbnail-2'

interface Props {
  salonId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
    submit: {
      marginTop: 60,
    },
    form: {},
    fileWrap: {
      marginTop: 24,
    },
    inputFile: {
      display: 'none',
    },
    inputLabel: {
      display: 'block',
    },
    inputButton: {
      width: '100%',
    },
    invalidMessage: {
      marginTop: 8,
      color: 'red',
      fontSize: 11,
    },
  })
)

function PostForm(props: Props) {
  const { salonId } = props
  const classes = useStyles({})
  const { token } = useMappedState(useCallback(state => state.auth, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const [imageUri, setImageUri] = useState()
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(createPost(response.data.post))
      dispatch(clearLoading())
      dispatch(setSnackbar({ message: response.message }))
      setStartFetch(false)
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoading())
      dispatch(setSnackbar({ message: '投稿エラー' }))
      setStartFetch(false)
    }
  }, [response, error])

  const resetImage = setFieldValue => {
    setFieldValue('file', null)
    const obj = document.getElementById('image') as any
    obj.value = ''
    setImageUri(undefined)
  }

  const imageChangeHandler = async e => {
    const { imageFile, imageUri } = (await resizeImage(e)) as any
    setImageUri(imageUri)
  }

  const handleSubmit = (form, { resetForm }) => {
    const { content, file } = form
    dispatch(setLoading())

    const formData = new FormData()
    formData.append('salon_id', salonId)
    formData.append('content', content)
    if (file) formData.append('image', file)

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
    const obj = document.getElementById('image') as any
    obj.value = ''
    setImageUri(undefined)

    setStartFetch(true)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="body1" component="p">
        投稿を作成
      </Typography>
      <Formik
        initialValues={{ content: '', file: null }}
        onSubmit={handleSubmit}
        validate={(values: any) => {
          const errors: any = {}
          const contentError = composeValidators(
            required('投稿内容を入力してください')
          )(values.content)
          const imageError = composeValidators(
            image('10MB以下の画像を選択してください')
          )(values.file)

          if (contentError) {
            errors.content = contentError
          }
          if (imageError) {
            errors.image = imageError
          }
          return errors
        }}
        render={({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Field
              name="content"
              render={({ field, form }) => (
                <TextArea
                  field={field}
                  form={form}
                  type="text"
                  label=""
                  placeholder="投稿内容を入力してください"
                />
              )}
            />
            <Field
              name="image"
              render={({ field, form }) => (
                <div className={classes.fileWrap}>
                  <InputImageWithThumbnail
                    imageUri={imageUri}
                    errorMessage={form.errors.image}
                    handleChange={event => {
                      setFieldValue('file', event.currentTarget.files[0])
                      imageChangeHandler(event.currentTarget.files[0])
                    }}
                    handleReset={() => {
                      resetImage(setFieldValue)
                    }}
                  />
                </div>
              )}
            />
            {/* <Field
              name="image"
              render={({ field, form }) => (
                <div className={classes.fileWrap}>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={event => {
                      setFieldValue('file', event.currentTarget.files[0])
                      imageChangeHandler(event.currentTarget.files[0])
                    }}
                    className={classes.inputFile}
                  />

                  <label htmlFor="image" className={classes.inputLabel}>
                    <Button
                      variant="outlined"
                      component="span"
                      className={classes.inputButton}
                    >
                      画像を選択
                    </Button>
                  </label>

                  <Thumbnail
                    file={values.file}
                    reset={() => {
                      resetImage(setFieldValue)
                    }}
                  />
                  <img src={imageUri} alt="" />
                  <div className={classes.invalidMessage}>
                    {form.errors.image}
                  </div>
                </div>
              )}
            /> */}

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
