module.exports = {
  install: function (Vue, options) {
    Vue.component("SidebarNavigation", require('./components/SidebarNavigation').default)
  }
};