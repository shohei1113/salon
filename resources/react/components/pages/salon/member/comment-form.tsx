import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PATH from '../../../../const/path'
import { composeValidators, required } from '../../../../utils/validator'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { setSnackbar } from '../../../../redux/modules/ui'
import {
  editPost,
  setLoading,
  clearLoading,
} from '../../../../redux/modules/member'
import { TextField } from '../../../atoms/text-field'

interface Props {
  postId: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '0 8px 8px',
    },
    formItem: {
      flex: 1,
    },
    submit: {
      marginLeft: 16,
    },
  })
)

function CommentForm(props: Props) {
  const classes = useStyles({})
  const { auth } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const [axiosConfig, setAxiosConfig] = useState({})
  const [isStartFetch, setStartFetch] = useState(false)
  const { isLoading, response, error } = useFetchApi(axiosConfig, isStartFetch)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(editPost(response.data.post))
      dispatch(clearLoading())
      dispatch(setSnackbar({ message: response.message }))
      setStartFetch(false)
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoading())
      setStartFetch(false)
    }
  }, [response, error])

  const handleSubmit = (form, { resetForm }) => {
    dispatch(setLoading())
    setAxiosConfig({
      method: 'POST',
      url: `${PATH}/api/comment`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        post_id: props.postId,
        content: form.content,
      },
    })
    resetForm({ content: '' })
    setStartFetch(true)
  }

  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={handleSubmit}
      validate={(values: any) => {
        const errors: any = {}
        const contentError = composeValidators(
          required('コメントを入力してください')
        )(values.content)

        if (contentError) {
          errors.content = contentError
        }

        return errors
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formItem}>
            <Field
              name="content"
              render={({ field, form }) => (
                <TextField
                  field={field}
                  form={form}
                  type="text"
                  label=""
                  placeholder="コメントする"
                />
              )}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            送信
          </Button>
        </form>
      )}
    />
  )
}

export default CommentForm
