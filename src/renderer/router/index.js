import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/home'),
    hidden: true,
  },
  {
    path: '/print',
    component: () => import('@/views/print'),
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
