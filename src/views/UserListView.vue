<template>
  <div>
    <h1>Vaccine Status</h1>

    <div class="events">
      <div v-for="user in users" :key="user.id" :user="user">
        <UserCard :user="user" />
      </div>

      <div class="pagination">
        <router-link
          id="page-prev"
          :to="{ name: 'UserList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page
        </router-link>

        <router-link
          id="page-next"
          :to="{ name: 'UserList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthServices from '@/services/AuthServices'
import UserCard from '@/components/UserCard.vue'
import UserService from '@/services/UserService'

export default {
  name: 'UserListView',
  inject: ['GStore'],
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    UserCard
  },
  data() {
    return {
      users: null,
      totalPeoples: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    UserService.getUsers(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.users = response.data
          comp.totalPeoples = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction

    queryFunction = UserService.getUsers(3, parseInt(routeTo.query.page) || 1)

    queryFunction
      .then((response) => {
        this.users = response.data // <---
        this.totalPeoples = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalPeoples / 3)
      return this.page < totalPages
    },
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthServices.hasRoles('ROLE_ADMIN')
    },
    isPeople() {
      return AuthServices.hasRoles('ROLE_PEOPLE')
    },
    isDoctor() {
      return AuthServices.hasRoles('ROLE_DOCTOR')
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-box {
  width: 300px;
}
</style>
