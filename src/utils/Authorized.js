import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

// by hzy 获取当前用户的菜单权限
const getMyAuthResources = () => {
  const menujson = sessionStorage.getItem('antd-menus');
  const menuAuths = getAuthority();
  if (menujson != null) {
    const menuData = JSON.parse(menujson);
    const { code, resourceIds } = menuData;
    if (code === 200) {
      resourceIds.forEach(item => {
        menuAuths.push(item);
      });
    }
  }
  // console.log('资源权限：')
  // console.log(menuAuths);
  return menuAuths;
};
// by hzy
let Authorized = RenderAuthorized(getMyAuthResources()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getMyAuthResources()); // by hzy
};

export { getMyAuthResources, reloadAuthorized };
export default Authorized;
