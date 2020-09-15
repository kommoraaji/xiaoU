import { getMenuList, getRoleList } from '@/axios'


export default ({
  //获取菜单列表
  getActionMenu({
    commit
  }) {
    getMenuList({
      istree: 1
    }).then(res => {
      if (res.code == 200) {
        commit('reqMenuList', res.list)
      }
    })
  },
  //获取角色列表
  getActionRole({
    commit
  }) {
    getRoleList().then(res => {
      if (res.code == 200) {
        commit('reqRoleList', res.list)
      }
    })
  }
})