import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Field, Formik } from 'formik'
import classNames from 'classnames'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import { RequireAuth } from '../../../utils/require-auth'
import getUrlParam from '../../../../utils/get-url-param'
import { composeValidators, required } from '../../../../utils/validator'
import { setLoader, clearLoader } from '../../../../redux/modules/ui'
import { fetchPosts } from '../../../../redux/modules/member'
import { TextField } from '../../../atoms/text-field'
import Post from './post'
import PostForm from './post-form'

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  wrap: {
    maxWidth: 500,
    margin: '0 auto',
  },
  posts: {
    marginTop: 80,
  },
  post: {
    marginTop: 40,
  },
})

// const posts = [
//   {
//     id: 1,
//     text:
//       'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
//     image: null,
//     author: {
//       name: '作者',
//       created_at: new Date(),
//     },
//   },
// ]

const Member: React.FC = (props: any) => {
  const { classes } = props
  const { auth, member } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()

  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/post`,
    headers: { Authorization: `Bearer ${auth.token}` },
  }

  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(fetchPosts(response))
      // dispatch(
      //   initAuth({
      //     token: response.data.access_token,
      //     user: response.data.user,
      //   })
      // )
      // dispatch(clearLoader())
      // dispatch(setSnackbar({ message: response.message }))
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoader())
    }
  }, [response, error])

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <div className={classes.wrap}>
          <PostForm />
          <div className={classes.posts}>
            {member.posts.map((post, i) => (
              <div key={i} className={classes.post}>
                <Post {...post.post} />
              </div>
            ))}
          </div>
        </div>
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Member) as any)
