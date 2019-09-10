import { stringify } from 'qs';
import request from '@/utils/request';

export async function searchAdminUser(params) {
  return request(`/api/admin/user/sysUser/search?${stringify(params)}`);
}
export async function getAdminUser(params) {
  return request(`/api/admin/user/sysUser/${params}`);
}
export async function saveAdminUser(params) {
  return request(`/api/admin/user/sysUser`, {
    method: 'POST',
    'Content-Type': 'application/x-www-form-urlencoded;',
    body: params,
  });
}
export async function removeAdminUser(params) {
  return request(`/api/admin/user/sysUser/remove`, {
    method: 'POST',
    'Content-Type': 'application/x-www-form-urlencoded;',
    body: params,
  });
}
export async function loginAdminUser(params) {
  return request(`/api/admin/user/sysUser/login`, {
    method: 'POST',
    'Content-Type': 'application/x-www-form-urlencoded;',
    body: params,
  });
}
