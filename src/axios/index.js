//接口集合模块
import http from './axios'

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