import Guard from '@quartz/auth/src/app/Middlewares/Guard'

var routes = [
  {
    name: 'app',
    path: '/',
    component: () => import('../components/Application'),
    beforeEnter: Guard.auth,
    children: [
      {
        path: '/',
        redirect: { name: 'dashboard' }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../components/Dashboard')
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('../components/Services/Services')
      }
    ]
  },
  { 
    path: '/404', 
    component: () => import('../components/Errors/NotFound'), 
    beforeEnter: Guard.auth
  },
  { 
    path: '*', 
    redirect: '/404'
  }
];

export default routes;