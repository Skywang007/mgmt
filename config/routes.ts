export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/auth/login',
        component: './Auth/Login',
      },
      {
        name: '重置密码',
        path: '/auth/forget-password',
        component: './Auth/ForgotPassword',
      },
    ],
  },
  {
    name: '首页',
    path: '/home',
    icon: 'HomeOutlined',
    component: './Home',
  },
  // {
  //   name: '详情',
  //   path: '/detail/:id',
  //   icon: 'TableOutlined',
  //   component: './Detail',
  // },
  {
    name: '权限',
    path: '/access',
    icon: 'SafetyOutlined',
    component: './Access',
    hideInMenu: true,
  },
  // {
  //   name: '经营主体',
  //   path: '/table',
  //   icon: 'TableOutlined',
  //   component: './Table',
  // },
  // {
  //   name: '加工厂管理',
  //   path: '/factory',
  //   icon: 'TableOutlined',
  //   component: './Factory',
  // },
  {
    name: '经营主体管理',
    path: '/table',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/table', redirect: '/table/list' },
      {
        path: '/table/list',
        component: './Table/List',
        name: '经营主体列表',
        exact: true,
      },
      {
        path: '/table/detail/:id',
        component: './Table/Detail',
        name: '经营主体详情',
        exact: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: '加工厂管理',
    path: '/factory',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/factory', redirect: '/factory/list' },
      {
        path: '/factory/list',
        component: './Factory/List',
        name: '加工厂列表',
        exact: true,
      },
      {
        path: '/factory/detail/:id',
        component: './Factory/Detail',
        name: '加工厂详情',
        exact: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: '地块管理',
    path: '/land',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/land', redirect: '/land/list' },
      {
        path: '/land/list',
        component: './Land/List',
        name: '地块列表',
        exact: true,
      },
      {
        path: '/land/detail/:id',
        component: './Land/Detail',
        name: '地块详情',
        exact: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'IdcardOutlined',
    component: './User',
  },
  {
    path: '/reset-password',
    component: './Me/ResetPassword',
    name: '修改密码',
    hideInMenu: true,
  },
  // {
  //   name: '我的账号',
  //   path: '/me',
  //   icon: 'IdcardOutlined',
  //   routes: [
  //     { path: '/me', redirect: '/me/account' },
  //     {
  //       path: '/me/account',
  //       component: './Me/Account',
  //       name: '我的账号',
  //       exact: true,
  //     },
  //     {
  //       path: '/me/reset-password',
  //       component: './Me/ResetPassword',
  //       name: '修改密码',
  //       exact: true,
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
