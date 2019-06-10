import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import classNames from 'classnames'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import { initSalons } from '../../../redux/modules/salons'
import { DefaultTemplate } from '../../templates/default-template'
import { Album } from '../../molecules/album'

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

const Salons: React.FC = (props: any) => {
  const { classes } = props
  const { salons } = useMappedState(useCallback(state => state.salons, []))
  const dispatch = useDispatch()
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/salon`,
  }
  const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  useEffect(() => {
    // dispatch(
    //   initSalons({
    //     salons: data.salons,
    //   })
    // )
  }, [response])

  return (
    <DefaultTemplate {...props}>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            経営者コース
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
        </div>
      </div>
      <Album cards={salons} />
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Salons) as any)
