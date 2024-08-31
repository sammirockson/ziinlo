<template>
  <div class="pricing">

  </div>
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {
         this.handleNavToLogin()
       }, 2000); 
    }, 
    methods: {
        handleNavToLogin() {
            this.$router.push({path: "/login"})
        }
    }
}
</script>

<style scoped>
.pricing {
    height: 100vh;
    width: 100vw;
    background-color: red;
}

</style>