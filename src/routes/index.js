import Guard from '@railken/quartz/auth/src/app/Middlewares/Guard'

var routes = [
  {
    name: 'app',
    path: '/',
    component: () => import ('../components/App'),
    beforeEnter: Guard.auth,
    children: [
      {
        path: '/',
        redirect: { name: 'services' }
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
  { path: '/404', component: () => import('../components/Errors/NotFound') },
  { path: '*', redirect: '/404' }
];

export default routes;