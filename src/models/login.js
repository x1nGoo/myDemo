import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority, setAuthorityCloud } from '@/utils/authority'; // by hzy
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
// by hzy
import { loginAdminUser } from '@/services/lmapi';
import { queryMyMenuIds } from '@/services/user';

// by hzy
const STORE_MENUS = 'antd-menus';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // by hzy
      sessionStorage.removeItem(STORE_MENUS);
      sessionStorage.removeItem('antd-pro-authority');
      sessionStorage.removeItem('authority-token');
      sessionStorage.removeItem('avatar-img');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('jobnumber');
      sessionStorage.removeItem('nickname');
      sessionStorage.removeItem('useraccount');
      sessionStorage.removeItem('servicestatus');
      sessionStorage.clear();
      yield put(
        routerRedux.push({
          pathname: '/user/cloudlogin',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    // by hzy
    *cloudLogin({ payload }, { call, put }) {
      // 对接ljdp后端登录
      const response = yield call(loginAdminUser, payload);
      yield put({
        type: 'changeCloudLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 200) {
        const menuResult = yield call(queryMyMenuIds);
        yield put({
          type: 'updateMenus',
          payload: menuResult,
        });
        // 重新初始菜单权限
        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
      return response
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    // 对接ljdp后端登录 by hzy
    changeCloudLoginStatus(state, { payload }) {
      if (payload.user) {
        setAuthorityCloud(payload.user);
      }
      sessionStorage.removeItem(STORE_MENUS);
      let loginstatus = '';
      if (payload.code === 200) {
        loginstatus = 'ok';
      } else {
        loginstatus = 'error';
      }
      return {
        ...state,
        status: loginstatus,
        type: payload.type,
      };
    },
    updateMenus(state, action) {
      const { payload } = action;
      sessionStorage.setItem(STORE_MENUS, JSON.stringify(payload));
      return {
        ...state,
      };
    },
  },
};
