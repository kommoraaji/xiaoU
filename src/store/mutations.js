export default {
  reqMenuList(state, payload) {
    state.menuList = payload
  },
  reqRoleList(state, payload) {
    state.roleList = payload
  },
  reqUserList(state, payload) {
    state.userList = payload
  },
  reqCateList(state, payload) {
    state.cateList = payload
  },
  TOGGLE(state) {
    state.iscollapse = !state.iscollapse
  }
}