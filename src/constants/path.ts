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
  cart: '/cart',
  checkout: '/checkout',
  addresses: '/user/addresses'
} as const;

export default path;
