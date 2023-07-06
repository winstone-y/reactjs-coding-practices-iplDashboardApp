import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import TeamMatches from './components/TeamMatches'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/team-matches/:id" component={TeamMatches} />
  </Switch>
)

export default App
