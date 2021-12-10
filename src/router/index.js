import Vue from 'vue'
import Router from 'vue-router'
import AppRouter from './router.config'

Vue.use(Router)

const createRoute = (basePath, routes) => {
  const newRoutes =  routes.reduce((processedRoutes, currentRoute) => {
    processedRoutes.push(processRouteObj(basePath, currentRoute))
    return processedRoutes
  }, [])
  console.log(newRoutes)
  return newRoutes
}

const processRouteObj = (basePath, { menuCode, children, component, meta, ...args }) => {
  return Object.assign({
    meta: {menuCode, ...meta},
    component: resolve => require([`@/${basePath}/${component}`], resolve),
    children: children ? createRoute(basePath, children) : []
  }, args)
}

const rootRoutes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/shelf',
    component: resolve => require(['@/pages/shelf/Shelf'], resolve)
  },
  ...createRoute('pages', AppRouter)

]
export default new Router({
  routes: rootRoutes
})
