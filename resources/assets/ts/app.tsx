import * as React from 'react'
import { render } from 'react-dom'

interface Props {}

const App = (props: Props) => <div>hello react</div>

render(<App />, document.getElementById('root'))
