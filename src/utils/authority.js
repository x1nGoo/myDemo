import defaultUserAvatar from '@/assets/user.png';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? sessionStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // by hzy
  if (authority === null) {
    authority = ['guest'];
  }
  return authority; // by hzy
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

// 对接ljdp后端登录的验证 by hzy
export function setAuthorityCloud(user) {
  if (user.userAccount.length > 0) {
    sessionStorage.setItem('antd-pro-authority', JSON.stringify(['clouduser']));
    sessionStorage.setItem('authority-token', user.tokenId);
    if (user.headImg != null) {
      sessionStorage.setItem('avatar-img', user.headImg);
    } else {
      sessionStorage.setItem(
        'avatar-img',
        defaultUserAvatar
      );
    }
    sessionStorage.setItem('username', user.userName);
    sessionStorage.setItem('rolealias', user.roleAlias);
    sessionStorage.setItem('jobnumber', user.jobNumber);
    sessionStorage.setItem('nickname', user.nickName);
    sessionStorage.setItem('useraccount', user.userAccount);
    sessionStorage.setItem('servicestatus', user.serviceStatus);
  } else {
    sessionStorage.removeItem('antd-pro-authority');
    sessionStorage.removeItem('authority-token');
    sessionStorage.removeItem('avatar-img');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rolealias');
    sessionStorage.removeItem('jobnumber');
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('useraccount');
    sessionStorage.removeItem('servicestatus');
  }
}

export function getAuthorityToken() {
  const tokenid = sessionStorage.getItem('authority-token');
  if (tokenid != null) {
    return tokenid;
  }
  return '';
}
