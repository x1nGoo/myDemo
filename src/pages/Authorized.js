import React from 'react';
// import RenderAuthorized from '@/components/Authorized';
// import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';
// by hzy 权限移到这里进行统一获取
import Authorized from '@/utils/Authorized';
// by hzy 移到util/Authorized.js
// const Authority = getAuthority();
// const Authorized = RenderAuthorized(Authority);

export default ({ children }) => (
  <Authorized
    authority={children.props.route.authority}
    noMatch={<Redirect to="/user/cloudlogin" />}
  >
    {children}
  </Authorized>
);
