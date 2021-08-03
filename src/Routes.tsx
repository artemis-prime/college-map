import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { CollegeMapPage } from './pages'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" ><CollegeMapPage /></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes