import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PATH from '../../../../const/path'
import { RequireAuth } from '../../../utils/require-auth'
import { composeValidators, required, image } from '../../../../utils/validator'
import getThumbnail from '../../../../utils/get-thumbnail'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { updateUser } from '../../../../redux/modules/auth'
import {
  setLoader,
  clearLoader,
  setSnackbar,
} from '../../../../redux/modules/ui'
import { DefaultTemplate } from '../../../templates/default-template'
import { InputImageWithThumbnail } from '../../../molecules/input-image-with-thumbnail'
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
    fileWrap: {
      marginTop: 24,
    },
  })
)

function Info(props: any) {
  const classes = useStyles({})
  const { auth } = useMappedState(useCallback(state => state, []))
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
    if (response) {
      console.log('成功！', response)
      dispatch(
        updateUser({
          user: response.data.user,
        })
      )
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
    const { name, image } = form
    dispatch(setLoader())
    const formData = new FormData()
    formData.append('_method', 'put')
    formData.append('name', name)
    if (image) formData.append('image', image)

    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/user/${auth.user.id}`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    setStartFetch(true)

    resetForm({ name, image: null })
    const obj = document.getElementById('image') as any
    obj.value = ''
    setImageUri(undefined)
  }

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h6">
            ユーザー情報変更
          </Typography>
          <Formik
            initialValues={{ name: auth.user.name, image: null }}
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
                  <Typography component="h1" variant="caption">
                    プロフィール画像
                  </Typography>
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
                <div className={classes.formItem}>
                  <Typography component="h1" variant="caption">
                    メールアドレス
                  </Typography>
                  <Typography component="h1" variant="body2">
                    {auth.user.email}
                  </Typography>
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

export default withRouter(Info as any)
