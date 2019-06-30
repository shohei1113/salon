import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import PATH from '../../../../const/path'
import useFetchApi from '../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../templates/default-template'
import { RequireAuth } from '../../../utils/require-auth'
import getUrlParam from '../../../../utils/get-url-param'
import { setSnackbar } from '../../../../redux/modules/ui'
import {
  init,
  reset,
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
    postForm: {
      marginBottom: 80,
    },
    posts: {},
    post: {
      marginBottom: 40,
    },
  })
)

const Member: React.FC = (props: any) => {
  const { history } = props
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

  const getRole = (ownerId: number, isMember: boolean) => {
    // 1: オーナー, 2: メンバー, 3: 権限なし
    if (auth.user.id === ownerId) return 1
    if (isMember) return 2
    return 3
  }

  useEffect(() => {
    if (response) {
      console.log('成功！', response)
      const role = getRole(
        response.data.salon.owner.id,
        response.data.salon.is_member
      )
      if (role === 3) {
        history.push('/')
        dispatch(setSnackbar({ message: '権限がありません' }))
        return
      }

      dispatch(fetchPosts(response))
      dispatch(
        init({
          role,
          owner: response.data.salon.owner,
        })
      )
    }

    if (error) {
      console.log('エラー！')
      dispatch(clearLoading())
    }

    return () => {
      dispatch(reset())
    }
  }, [response, error])

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <RequireAuth {...props}>
        <>
          {member.isPrepared ? (
            <div className={classes.wrap}>
              {member.role === 1 && (
                <div className={classes.postForm}>
                  <PostForm salonId={salonId} />
                </div>
              )}
              <div className={classes.posts}>
                {member.posts.map((post, i) => (
                  <div key={i} className={classes.post}>
                    <Post
                      owner={member.owner}
                      role={member.role}
                      auth={auth}
                      {...post}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <LoaderPage />
          )}

          {member.isLoading && <LoaderPage />}
        </>
      </RequireAuth>
    </DefaultTemplate>
  )
}

export default withRouter(Member as any)
