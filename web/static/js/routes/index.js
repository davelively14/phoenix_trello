import React from 'react'
import { IndexRoute, Route } from 'react-router'
import MainLayout from '../layouts/main'
import RegistrationsNew from '../views/registrations/new'

export default (
  <Route component={MainLayout}>
    <Route path="/" component={RegistrationsNew} />
  </Route>
)
