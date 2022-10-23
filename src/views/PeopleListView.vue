<template>
  <div>
    <h1>Vaccine Status</h1>

    <div class="events">
      <div class="search-box">
        <BaseInput
          v-model="keyword"
          type="text"
          label="Search..."
          @input="updateKeyword"
        />
      </div>

      <PeopleCard v-for="people in peoples" :key="people.id" :people="people" />

      <div class="pagination">
        <router-link
          id="page-prev"
          :to="{ name: 'PeopleList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page
        </router-link>

        <router-link
          id="page-next"
          :to="{ name: 'PeopleList', query: { page: page + 1 } }"
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
import PeopleCard from '@/components/PeopleCard.vue'
import PeopleService from '@/services/PeopleService.js'

export default {
  name: 'PeopleListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    PeopleCard
  },
  data() {
    return {
      peoples: null,
      totalPeoples: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PeopleService.getPeoples(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.peoples = response.data
          comp.totalPeoples = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = PeopleService.getPeoples(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = PeopleService.getPeopleByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.peoples = response.data // <---
        this.totalPeoples = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = PeopleService.getPeoples(3, 1)
      } else {
        queryFunction = PeopleService.getPeopleByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.peoples = response.data
          console.log(this.peoples)
          this.totalPeoples = response.headers['x-total-count']
          console.log(this.totalPeoples)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalPeoples / 3)
      return this.page < totalPages
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
