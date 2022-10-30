<template>
  <body>
    <div class="container" onclick="onclick">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="col-md-12">
        <div class="card card-container">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-group">
              <label for="username">Username</label>

              <Field name="username" type="text" class="form-control" />

              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>

              <Field name="password" type="password" class="form-control" />

              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>

                <span>Login</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthServices.js'
export default {
  name: 'LoginView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required('Username is required!'),
      password: yup.string().required('Password is required!')
    })
    return {
      loading: false,
      message: '',
      schema
    }
  },
  methods: {
    handleLogin(user) {
      console.log(user)
      AuthService.login(user).then(() => {
        console.log(12)
        this.$router.push({ name: 'PeopleList' })
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  font-family: 'Raleway', sans-serif;
}
.container {
  position: relative;
  width: 300%;
  height: 300%;
  overflow: hidden;
}
.container:hover .top:before,
.container:active .top:before,
.container:hover .bottom:before,
.container:active .bottom:before,
.container:hover .top:after,
.container:active .top:after,
.container:hover .bottom:after,
.container:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container:hover .center,
.container:active .center {
  opacity: 1;
  transition-delay: 0.1s;
}
.top:before,
.bottom:before,
.top:after,
.bottom:after {
  content: '';
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.3s;
}
.top:before {
  transform: rotate(45deg);
  background: #fab700;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}
.bottom:before {
  transform: rotate(-45deg);
  background: #212121;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #ffef62;
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
  box-sizing: border-box;
  display: block;
  width: 90%;
  border: 3px solid currentColor;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: transparent;
  border-radius: var(--size-radius);
  margin-left: auto;
  margin-right: auto;
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
