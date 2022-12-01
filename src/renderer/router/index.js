import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/template'),
    hidden: true,
  },
  {
    path: '/editTemplate',
    component: () => import('@/views/template/edit'),
    hidden: true,
  },
  {
    path: '/data',
    component: () => import('@/views/data'),
    hidden: true,
    meta: {
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/preview',
    component: () => import('@/views/preview'),
    hidden: true,
  },
  {
    path: '*',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
  })

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
const router = createRouter()

export default router
