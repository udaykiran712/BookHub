import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import HomeContext from './context/homeContext'

class App extends Component {
  state = {
    activeTabId: 'HOME',
  }

  onChangeTab = event => {
    this.setState({activeTabId: event.target.id})
  }

  render() {
    const {activeTabId} = this.state
    return (
      <HomeContext.Provider
        value={{activeTabId, onChangeTab: this.onChangeTab}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </HomeContext.Provider>
    )
  }
}

export default App
