<template>
  <body>
    <div class="col-md-12">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />

        <Form @submit="handleRegister" :validation-schema="schema">
          <div v-if="!successful">
            <div class="form-group">
              <label for="username">Username</label>

              <Field name="username" type="text" class="form-control" />

              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="email">Email</label>

              <Field name="email" type="email" class="form-control" />

              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>

              <Field name="password" type="password" class="form-control" />

              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="firstname">First Name</label>

              <Field name="firstname" type="firstname" class="form-control" />

              <ErrorMessage name="firstname" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="lastname">Last Name</label>

              <Field name="lastname" type="lastname" class="form-control" />

              <ErrorMessage name="lastname" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="age">Age</label>

              <Field name="age" type="age" class="form-control" />

              <ErrorMessage name="age" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="hometown">Hometown</label>

              <Field name="hometown" type="hometown" class="form-control" />

              <ErrorMessage name="hometown" class="error-feedback" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>

                Sign Up
              </button>
            </div>
          </div>
        </Form>

        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
// eslint-disable-next-line
    
import AuthService from '@/services/AuthServices.js'
export default {
  name: 'RegisterView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  // eslint-disable-next-line
    
  inject: ['GStore'],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
      firstname: yup
        .string()
        .required('First name is required!')
        .max(40, 'Must be maximum 40 characters!'),
      lastname: yup
        .string()
        .required('Last name is required!')
        .max(40, 'Must be maximum 40 characters!'),
      age: yup
        .string()
        .required('Age is required!')
        .max(3, 'Must be maximum 3 characters!'),
      hometown: yup
        .string()
        .required('Hometown is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })
    return {
      successful: false,
      loading: false,
      message: '',
      schema
    }
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push('/event')
    }
  },
  methods: {
    // eslint-disable-next-line
    
    handleRegister(user) {
      this.message = ''
      this.successful = false
      this.loading = true
      AuthService.register(user).then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style scoped>
body {
  background-image: url(../assets/v870-tang-36.jpg);
  position: static;
}
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
}
</style>
