export default {
  reqMenuList(state, payload) {
    state.menuList = payload
  },
  reqRoleList(state, payload) {
    state.roleList = payload
  },
  TOGGLE(state) {
    state.iscollapse = !state.iscollapse
  }
}