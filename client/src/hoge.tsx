import * as React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import withStyles, {
  WithStyles,
  StyleRules,
} from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import Button from '@material-ui/core/Button'
// TypeScript で書く場合の styles 定義方法
// theme を使わない場合は、 styles = createStyles(object) でもよい
const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    paragraph: {
      fontFamily: 'serif',
      padding: theme.spacing.unit * 2,
    },
  })

// Component の Props を WithStyles<typeof styles> で拡張
interface Props extends WithStyles<typeof styles> {
  title?: string
}

// Component を定義
const FirstComponent: React.FC<Props> = ({ classes, title }: Props) => (
  <div className={classes.root}>
    <p className={classes.paragraph}>{title || 'My First TS Component'}</p>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  </div>
)

// withStyles(styles)(Component) で スタイリングした Component を export
export default withStyles(styles)(FirstComponent)
