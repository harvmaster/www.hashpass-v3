import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     // { path: '/auth', component: () => import('pages/Auth/AuthPage.vue') }
  //   ],
  // },
  {
    name: 'authed',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue'), meta: { routePosition: 1} },
      { path: '/settings', component: () => import('pages/SettingsPage.vue'), meta: { routePosition: 2} },
      { path: '/settings/pin', component: () => import('pages/Settings/PinChangePage.vue'), meta: { routePosition: 3} },
      { path: '/service', component: () => import('pages/Service/ServicePage.vue'), meta: { routePosition: 1} },
      { path: '/service/:service', component: () => import('pages/Service/ServicePage.vue'), meta: { routePosition: 2, keepAlive: false} },
      { path: '/test', component: () => import('pages/Service/TestPage.vue'), meta: { routePosition: 2, keepAlive: false} },
    ]
  },
  {
    name: 'unauthed',
    path: '/',
    component: () => import('layouts/UnAuthedLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/', component: () => import('pages/OnboardPage.vue') },
      { path: '/auth', component: () => import('pages/Auth/AuthPage.vue')},
      { path: '/signup', component: () => import('pages/Auth/SignupPage.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
