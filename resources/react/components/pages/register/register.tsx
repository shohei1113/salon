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
import { composeValidators, required, image } from '../../../utils/validator'
import getUrlParam from '../../../utils/get-url-param'
import getThumbnail from '../../../utils/get-thumbnail'
import useFetchApi from '../../../hooks/use-fetch-api'
import { initAuth } from '../../../redux/modules/auth'
import { setLoader, clearLoader, setSnackbar } from '../../../redux/modules/ui'
import { DefaultTemplate } from '../../templates/default-template'
import { InputImageWithThumbnail } from '../../molecules/input-image-with-thumbnail'
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
    submit: {
      marginTop: 60,
    },
    form: {
      width: 300,
    },
    formItem: {
      marginTop: 16,
    },
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
  })
)

const Register: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles({})
  const token = getUrlParam('token')
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const [imageUri, setImageUri] = useState()
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  const resetImage = setFieldValue => {
    setFieldValue('image', null)
    const obj = document.getElementById('image') as any
    obj.value = ''
    setImageUri(undefined)
  }

  const imageChangeHandler = async e => {
    const { imageFile, imageUri } = (await getThumbnail(e)) as any
    setImageUri(imageUri)
  }

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  }, [])

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
      dispatch(setSnackbar({ message: response.message }))
      history.push('/')
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
    }
  }, [response, error])

  const handleSubmit = (form, { resetForm }) => {
    const { name, image } = form
    dispatch(setLoader())
    const formData = new FormData()
    formData.append('name', name)
    formData.append('token', token)
    if (image) formData.append('image', image)

    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/register`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
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
          本登録
        </Typography>
        <Formik
          initialValues={{ name: '', image: null }}
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {}
            const nameError = composeValidators(
              required('名前を入力してください')
            )(values.name)
            const imageError = composeValidators(
              image('10MB以下の画像を選択してください')
            )(values.image)

            if (nameError) {
              errors.name = nameError
            }
            if (imageError) {
              errors.image = imageError
            }

            return errors
          }}
          render={({ values, handleSubmit, setFieldValue }) => (
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
                      placeholder="田中 太郎"
                    />
                  )}
                />
              </div>
              <div className={classes.formItem}>
                <Field
                  name="image"
                  render={({ field, form }) => (
                    <div className={classes.fileWrap}>
                      <InputImageWithThumbnail
                        imageUri={imageUri}
                        errorMessage={form.errors.image}
                        handleChange={event => {
                          setFieldValue('image', event.currentTarget.files[0])
                          imageChangeHandler(event.currentTarget.files[0])
                        }}
                        handleReset={() => {
                          resetImage(setFieldValue)
                        }}
                      />
                    </div>
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

export default withRouter(Register as any)
