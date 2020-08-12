import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import GuestState from './context/guestContext/GuestState'
import Register from './components/pages/Register'
import Login from './components/pages/Login'

function App() {
  return (
    <GuestState>
      <Router>
        <div >
          <Navbar />
          <Switch>
            <Route exact path ='/' component={Home} />
            <Route exact path ='/register' component={Register} />
            <Route exact path ='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </GuestState>
  )
}

export default App
