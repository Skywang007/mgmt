/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
  body?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryCirculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    // ...(options || {}),
  });
}
export async function queryDetail(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}
export async function queryLand(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryLand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}
export async function queryFactoryList(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryFactoryList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}
export async function updateLand(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/updateLand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}
export async function updateFactory(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/updateFactory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}
export async function updateCirculate(
  params?: any,
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/updateCirculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params },
    // ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/user */
export async function addUser(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
export async function modifyUser(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_string_>(`/api/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
