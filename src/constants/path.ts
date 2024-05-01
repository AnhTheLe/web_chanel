const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/account/login',
  register: '/account/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const;

export default path;
