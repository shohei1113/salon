import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import { RequireAuth } from '../../../utils/require-auth'
import getUrlParam from '../../../../utils/get-url-param'
import { setLoader, clearLoader } from '../../../../redux/modules/ui'
import {
  setLoading,
  clearLoading,
  fetchPosts,
} from '../../../../redux/modules/member'
import { LoaderPage } from '../../../organisms/loader-page'
import Post from './post'
import PostForm from './post-form'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
)

const Member: React.FC = (props: any) => {
  const classes = useStyles({})
  const { auth, member } = useMappedState(useCallback(state => state, []))
  const dispatch = useDispatch()
  const salonId = getUrlParam('salon-id')

  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/salon/${salonId}`,
    headers: { Authorization: `Bearer ${auth.token}` },
  }

  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      dispatch(fetchPosts(response))

      dispatch(clearLoading())
      // dispatch(setSnackbar({ message: response.message }))
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoading())
    }
  }, [response, error])

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <>
          <div className={classes.wrap}>
            <PostForm />
            <div className={classes.posts}>
              {member.posts.map((post, i) => (
                <div key={i} className={classes.post}>
                  <Post {...post} />
                </div>
              ))}
            </div>
          </div>
          {member.isLoading && <LoaderPage />}
        </>
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(Member as any)
