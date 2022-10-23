import { createRouter, createWebHistory } from 'vue-router'
import PeopleListView from '@/views/PeopleListView.vue'
import PeopleEditView from '@/views/event/PeopleEditView.vue'
import PeopleRegisterView from '@/views/event/PeopleRegisterView.vue'
import AboutView from '../views/AboutView.vue'
import PeopleLayoutView from '@/views/event/PeopleLayoutView.vue'
import PeopleDetailView from '@/views/event/PeopleDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddPeople from '@/views/PeopleForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import PeopleService from '@/services/PeopleService'
import OrganizerService from '@/services/OrganizerService.js'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
const routes = [
  {
    path: '/',
    name: 'PeopleList',
    component: PeopleListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/people/:id',
    name: 'PeopleLayoutView',
    component: PeopleLayoutView,
    beforeEnter: (to) => {
      return PeopleService.getPeople(to.params.id)
        .then((response) => {
          GStore.people = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'people' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    props: true,
    children: [
      {
        path: '',
        name: 'PeopleDetails',
        component: PeopleDetailView,
        props: true
      },
      {
        path: 'register',
        name: 'PeopleRegister',
        props: true,
        component: PeopleRegisterView
      },
      {
        path: 'edit',
        name: 'PeopleEdit',
        props: true,
        component: PeopleEditView
      }
    ]
  },
  {
    path: '/add-event',
    name: 'AddPeople',
    component: AddPeople,
    beforeEnter: () => {
      return OrganizerService.getOrganizers()
        .then((response) => {
          GStore.organizers = response.data
        })
        .catch(() => {
          GStore.organizers = null
          console.log('cannot load organizer')
        })
    }
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
