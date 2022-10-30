<template>
  <body>
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
  </body>
  
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
@import url('https://fonts.googleapis.com/css?family=Abel|Abril+Fatface|Alegreya|Arima+Madurai|Dancing+Script|Dosis|Merriweather|Oleo+Script|Overlock|PT+Serif|Pacifico|Playball|Playfair+Display|Share|Unica+One|Vibur');
/* End Fonts */
/* Start Global rules */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
/* End Global rules */

/* Start body rules */
body {
    background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
background-attachment: fixed;
  background-repeat: no-repeat;

    font-family: 'Vibur', cursive;
/*   the main font */
    font-family: 'Abel', sans-serif;
opacity: .95;
/* background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%); */
background-image: url(@/assets/v870-tang-36.jpg);
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
   width: 450px;
    min-height: 500px;
    height: auto;
    border-radius: 5px;
    margin: 2% auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 2%;
    background-image: linear-gradient(-225deg, #efb0b2 50%, #bfe6f2 50%);
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
button{
  margin-top: 50px;
}
</style>
