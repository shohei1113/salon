import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PATH from '../../../../../const/path'
import getUrlParam from '../../../../../utils/get-url-param'
import useFetchApi from '../../../../../hooks/use-fetch-api'
import { DefaultTemplate } from '../../../../templates/default-template'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column' as any,
      alignItems: 'center',
    },
    conetnt: {
      marginTop: 24,
    },
  })
)

const Complete: React.FC = (props: any) => {
  const classes = useStyles({})
  const token = getUrlParam('token')
  const axiosConfig = {
    method: 'POST',
    url: `${PATH}/api/user/update/email`,
    data: {
      token,
    },
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  // useEffect(() => {
  //   if (response) {
  //     console.log('成功！', response)
  //     dispatch(clearLoader())
  //     dispatch(setSnackbar({ message: response.message }))
  //     setStartFetch(false)
  //   }

  //   if (error) {
  //     console.log('エラー！')
  //     dispatch(clearLoader())
  //     dispatch(setSnackbar({ message: error.response.data.message }))
  //     setStartFetch(false)
  //   }
  // }, [response, error])

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          メールアドレス変更完了
        </Typography>
        <div className={classes.conetnt}>
          <Typography component="p" variant="body2">
            メールアドレスの変更が完了しました。
          </Typography>
        </div>
      </div>
    </DefaultTemplate>
  )
}

export default Complete as any
