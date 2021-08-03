import React from 'react'
import { Provider as MobxProvider } from 'mobx-react'

import Routes from './Routes'

import { default as schoolsServiceInstance }  from './domain/SchoolsService'

const App = () => (
  <div className="outermost">
    <MobxProvider schoolsService={schoolsServiceInstance}>
      <Routes />
    </MobxProvider>
  </div>
)

export default App

