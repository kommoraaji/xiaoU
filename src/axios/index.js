//接口集合模块
import http from './axios'

/* ------------------------------------菜单------------------------------------- */

//菜单添加接口
export function getMenuAdd(data) {
  return http.post('/menuadd', data)
}

//菜单列表接口
export function getMenuList(params) {
  return http.get('/menulist?istree=1', {
    params
  })
}

//菜单获取（一条）
export function getMenuInfo(params) {
  return http.get('/menuinfo', {
    params
  })
}

//菜单修改
export function getMenuEdit(data) {
  return http.post('/menuedit', data)
}

//菜单删除
export function getMenuDel(id) {
  return http.post('/menudelete', { id })
}

/* ------------------------------------角色------------------------------------- */

//角色添加接口
export function getRoleAdd(data) {
  return http.post('/roleadd', data)
}

//角色列表接口
export function getRoleList() {
  return http.get('/rolelist')
}

//角色获取（一条）
export function getRoleInfo(params) {
  return http.get('/roleinfo', {
    params
  })
}

//角色修改
export function getRoleEdit(data) {
  return http.post('/roleedit', data)
}

//角色删除
export function getRoleDel(id) {
  return http.post('/roledelete', { id })
}

/* ------------------------------------管理员------------------------------------- */

//管理员添加接口
export function getUserAdd(data) {
  return http.post('/useradd', data)
}

//管理员总数
export function getUserCount() {
  return http.get('/usercount')
}

//管理员列表接口
export function getUserList(params) {
  return http.get('/userlist', {
    params
  })
}

//管理员获取（一条）
export function getUserInfo(params) {
  return http.get('/userinfo', {
    params
  })
}

//管理员修改
export function getUserEdit(data) {
  return http.post('/useredit', data)
}

//管理员删除
export function getUserDel(data) {
  return http.post('/userdelete', data)
}

//管理员登陆
export function getUserLogin(data) {
  return http.post('/userlogin', data)
}

/* ------------------------------------分类------------------------------------- */

//商品分类添加接口
export function getCateAdd(data) {
  return http.post('/cateadd', data)
}

//商品分类列表接口
export function getCateList(params) {
  return http.get('/catelist?istree=1', {
    params
  })
}

//商品分类获取（一条）
export function getCateInfo(params) {
  return http.get('/cateinfo', {
    params
  })
}

//商品分类修改
export function getCateEdit(data) {
  return http.post('/cateedit', data)
}

//商品分类删除
export function getCateDel(id) {
  return http.post('/catedelete', { id })
}