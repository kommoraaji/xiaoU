import { getMenuList, getRoleList, getUserList, getCateList } from '@/axios'


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
  },
  //获取管路员列表
  getActionUser({
    commit
  }, pageInfo) {
    getUserList(pageInfo).then(res => {
      if (res.code == 200) {
        commit('reqUserList', res.list)
      }
    })
  },
  //获取分类列表
  getActionCate({
    commit
  }, pageInfo) {
    getCateList(pageInfo).then(res => {
      if (res.code == 200) {
        commit('reqCateList', res.list)
      }
    })
  }
})