import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import classNames from 'classnames'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { DefaultTemplate } from '../../../templates/default-template'

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
  },
})

const Salon: React.FC = (props: any) => {
  const { classes } = props

  return (
    <DefaultTemplate {...props}>
      <div className={classes.heroUnit}>サロン登録</div>
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Salon) as any)
