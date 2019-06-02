import { Component } from 'react'
import { withRouter, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {}

class ScrollToTop extends Component<Props> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop as any)
