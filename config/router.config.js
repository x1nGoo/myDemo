export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/cloudlogin' },
      { path: '/user/cloudlogin', component: './User/CloudLogin' },
      { path: '/user/register', component: './User/CloudRegister' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user', 'clouduser'],
    routes: [
      // 登录默认跳转
      { path: '/', redirect: '/analysis' },
      // 数据分析
      {
        path: '/analysis',
        icon: 'dashboard',
        name: 'analysis',
        routes: [
          { path: '/analysis', redirect: '/analysis/overview' },
          // 分析总览
          {
            path: '/analysis/overview',
            name: 'overview',
            component: './Analysis/Overview',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
