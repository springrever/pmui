const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  usercode: state => state.user.usercode,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  authoritys: state => state.user.authoritys,
  contenxtmenuFlag: state => state.app.contenxtmenuFlag,
  onProject: state => state.app.onProject,
  showProject: state => state.app.showProject,
  onDemand: state => state.app.onDemand
}
export default getters
