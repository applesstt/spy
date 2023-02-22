import Users from './components/Users'
import User from './components/User'

export default [
  {
    path: '/',
    component: Users
  }, {
    path: '/users/:id',
    component: User
  }
]
