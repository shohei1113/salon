import React, { useState, useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { DefaultTemplate } from '../../../templates/default-template'

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

  return (
    <DefaultTemplate {...props} isDefaultSpace>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          仮登録完了
        </Typography>
        <div className={classes.conetnt}>
          <Typography component="p" variant="body2">
            本登録用URLを送信しました。
          </Typography>
          <Typography component="p" variant="body2">
            メールアドレスのリンクをクリックし、本登録を完了させてください。
          </Typography>
        </div>
      </div>
    </DefaultTemplate>
  )
}

export default Complete as any
