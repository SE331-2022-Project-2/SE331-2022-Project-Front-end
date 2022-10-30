<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="container">
        
      </div>
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

          <UploadImages @changed="handleImages" />

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
</template>

<script>
import UploadImages from 'vue-upload-drop-images'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
// eslint-disable-next-line

import AuthService from '@/services/AuthServices.js'
import PeopleServices from '@/services/PeopleService.js'
export default {
  name: 'RegisterView',
  components: {
    Form,
    Field,
    ErrorMessage,
    UploadImages
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
      this.$router.push('/people')
    }
  },
  methods: {
    // eslint-disable-next-line

    handleRegister(user) {
      Promise.all(
        this.files.map((file) => {
          return PeopleServices.uploadFile(file)
        })
      ).then((response) => {
        console.log(response)
        console.log(response.map((r) => r.data))
        user.image = response.map((r) => r.data).toString()
        AuthService.register(user).then(() => {
          this.$router.push({ name: 'Login' })
        })
        this.message = ''
        this.successful = false
        this.loading = true
      })
    },
    handleImages(files) {
      console.log('called handle images')
      this.files = files
    }
  }
}
</script>

<style scoped>
@import url('https://rsms.me/inter/inter.css');
:root {
  --color-light: white;
  --color-dark: #212121;
  --color-signal: #fab700;
  --color-background: var(--color-light);
  --color-text: var(--color-dark);
  --color-accent: var(--color-signal);
  --size-bezel: 0.5rem;
  --size-radius: 4px;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
  font-size: calc(0.6rem + 0.4vw);
  color: var(--color-text);
  background: var(--color-background);
  font-weight: 300;
  padding: 0 calc(var(--size-bezel) * 3);
}
h1,
h3 {
  font-weight: 900;
}
.card {
  background: white;
  padding: calc(4 * var(--size-bezel));
  margin-top: calc(4 * var(--size-bezel));
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
input {
  position: relative;
}
.form-control {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 3px solid currentColor;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: transparent;
  border-radius: var(--size-radius);
  margin-left: auto;
  margin-right: auto;
}
button {
  color: currentColor;
  padding: 5px;
  background: #fab700;
  border: 2px solid #212121;
  border-radius: var(--size-radius);
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
}
button + button {
  margin-left: calc(var(--size-bezel) * 2);
}
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
/* .card {
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
} */
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
