<template>
  <body>
    <div class="home">
      <h1>Welcome!</h1>
      <h2>Please Login or register before</h2>
      
      <img src="../assets/welcome-gif.gif" alt="welcome" class="center" />
    </div>
  </body>
</template>
<style scoped>
img{
    margin-top: 100px;
}
.home {
  background: #fab700;
  padding: calc(4 * var(--size-bezel));
  margin-top: 100px;
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
