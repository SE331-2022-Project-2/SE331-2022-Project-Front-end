import { createRouter, createWebHistory } from 'vue-router'
import PeopleListView from '@/views/PeopleListView.vue'
import PeopleInformationView from '@/views/event/people/PeopleInformationView'
import AddVaccineView from '../views/AddVaccineView.vue'
import PeopleLayoutView from '@/views/event/people/PeopleLayoutView'
import PeopleVaccineView from '@/views/event/people/PeopleVaccineView'
import AddCommentView from '@/views/event/people/AddCommentView'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddPeople from '@/views/PeopleForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import PeopleService from '@/services/PeopleService'
import OrganizerService from '@/services/DoctorService.js'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
import DoctorService from '@/services/DoctorService.js'
import UserListView from '@/views/UserListView.vue'
import UserLayoutView from '@/views/user/UserLayoutView.vue'
import UserService from '@/services/UserService'

const routes = [
  {
    path: '/',
    name: 'PeopleList',
    component: PeopleListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/addVaccine',
    name: 'AddVaccine',
    component: AddVaccineView,
    beforeEnter: () => {
      PeopleService.getPeopleAll()
        .then((response) => {
          GStore.peoples = response.data
        })
        .catch(() => {
          GStore.peoples = null
          console.log('cannot load organizer')
        })

      DoctorService.getDoctorAll()
        .then((response) => {
          GStore.doctors = response.data
        })
        .catch(() => {
          GStore.doctors = null
          console.log('cannot load organizer')
        })
      return
    }
  },
  {
    path: '/people/:id',
    name: 'PeopleLayoutView',
    component: PeopleLayoutView,
    beforeEnter: (to) => {
      PeopleService.getPeople(to.params.id)
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
      DoctorService.getDoctorAll()
        .then((response) => {
          GStore.doctors = response.data
        })
        .catch(() => {
          GStore.doctors = null
          console.log('cannot load organizer')
        })
      return
    },
    props: true,
    children: [
      {
        path: '',
        name: 'PeopleInformations',
        component: PeopleInformationView,
        props: true
      },
      {
        path: 'Vaccine',
        name: 'PeopleVaccine',
        props: true,
        component: PeopleVaccineView
      },
      {
        path: 'add',
        name: 'AddComment',
        props: true,
        component: AddCommentView
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
    path: '/userlist',
    name: 'UserList',
    component: UserListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/user/:id',
    name: 'UserLayoutView',
    component: UserLayoutView,
    beforeEnter: (to) => {
      return UserService.getUser(to.params.id)
        .then((response) => {
          GStore.user = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'user' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    props: true,
    children: []
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
