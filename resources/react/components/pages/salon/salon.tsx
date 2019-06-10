import React, { useEffect, useCallback } from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'
import classNames from 'classnames'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PATH from '../../../const/path'
import useFetchApi from '../../../hooks/use-fetch-api'
import { initSalons } from '../../../redux/modules/salons'
import { DefaultTemplate } from '../../templates/default-template'

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  wrap: {
    maxWidth: 960,
    margin: '0 auto',
    padding: 20,
  },
  hero: {
    marginBottom: 80,
  },
  title: {
    display: 'inline-block',
    borderBottom: '2px solid #ccc',
  },
  content: {
    marginBottom: 40,
  },
  contentTitle: { marginBottom: 20 },
})

const Salon: React.FC = (props: any) => {
  const { classes } = props
  const { salons } = useMappedState(useCallback(state => state.salons, []))
  const dispatch = useDispatch()
  const axiosConfig = {
    method: 'GET',
    url: `${PATH}/api/category/1/salon`,
  }
  // const { isLoading, response, error } = useFetchApi(axiosConfig, true)

  // useEffect(() => {
  //   // dispatch(
  //   //   initSalons({
  //   //     salons: data.salons,
  //   //   })
  //   // )
  // }, [response])

  return (
    <DefaultTemplate {...props}>
      <div className={classes.wrap}>
        <div className={classes.hero}>
          <Typography
            variant="h5"
            color="inherit"
            align="center"
            gutterBottom
            className={classes.grow}
          >
            うらこみゅ～URA-KiSS Commune～
          </Typography>
          <Typography variant="body2" color="inherit" className={classes.grow}>
            平均年齢19歳の女の子7人組のアイドルYouTuberグループ、URA-KiSSのオンラインサロンです。
            全てに全力で挑戦して、みんなと一緒に最高のコミュニティを作っていきたいです！
          </Typography>
        </div>

        <div className={classes.content}>
          <div className={classes.contentTitle}>
            <Typography variant="h6" color="inherit" className={classes.title}>
              メッセージ
            </Typography>
          </div>
          <Typography variant="body2" color="inherit" className={classes.a}>
            初めましてURA-KiSSです！YouTubeで毎日二本の動画投稿をしながら、アイドル活動をしています。
            今回は、ファンのみんなと私たちだけの濃いコミュニティを作ることで、更にうちらがやりたいことを楽しくみんなと一緒にできたらと思って、オンラインサロンを作ることを決めました。
            普通のオンラインサロンは、サロンオーナーがカリスマ的で、サロンメンバーはみんなそのカリスマについて行って勉強するって形だと思うんですが、私たちのサロンは真逆です。
          </Typography>
        </div>

        <div className={classes.content}>
          <div className={classes.contentTitle}>
            <Typography variant="h6" color="inherit" className={classes.title}>
              コンテンツ
            </Typography>
          </div>
          <Typography variant="body2" color="inherit" className={classes.a}>
            私たちがみんなに何かを教えるってことはできないので、私たちが楽しく色んなことにチャレンジするのを一緒に楽しんでもらいたいです。
            むしろみんなからもたくさん勉強させてもらいたいし、みんなの意見でこのコミュニティをどんどん進化させていければと思ってます。
            DMMさんにも、こういう形のオンラインサロンの形は新しいし面白いって言って頂いたので、何も分からなくて不安ですが挑戦してみることにしました。
            オンラインサロンって何？って方のためにも、DMMさんに無理を言って無料にしてもらったので、是非うちらURA-KiSSを知らない人も、試しに覗いて行って頂けると嬉しいです。
            とにかく私たちはどんどん色んなことに全力でチャレンジしていきたいので、一緒に楽しんでいってくれたら嬉しいです！
          </Typography>
        </div>

        <div className={classes.content}>
          <div className={classes.contentTitle}>
            <Typography variant="h6" color="inherit" className={classes.title}>
              こんな人におすすめ
            </Typography>
          </div>
          <Typography variant="body2" color="inherit" className={classes.a}>
            私たちがみんなに何かを教えるってことはできないので、私たちが楽しく色んなことにチャレンジするのを一緒に楽しんでもらいたいです。
            むしろみんなからもたくさん勉強させてもらいたいし、みんなの意見でこのコミュニティをどんどん進化させていければと思ってます。
            DMMさんにも、こういう形のオンラインサロンの形は新しいし面白いって言って頂いたので、何も分からなくて不安ですが挑戦してみることにしました。
            オンラインサロンって何？って方のためにも、DMMさんに無理を言って無料にしてもらったので、是非うちらURA-KiSSを知らない人も、試しに覗いて行って頂けると嬉しいです。
            とにかく私たちはどんどん色んなことに全力でチャレンジしていきたいので、一緒に楽しんでいってくれたら嬉しいです！
          </Typography>
        </div>

        <Link to="/salon/register?salon-id=1">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登録
          </Button>
        </Link>
      </div>
    </DefaultTemplate>
  )
}

export default withRouter(withStyles(styles)(Salon) as any)
