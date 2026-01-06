<template>
  <div class="vendor-container">

  </div>
</template>

<script>
import paystack from '../components/paystack.vue';
import { PAYSTACK_KEY } from '@/config';
export default {
    data() {
        return {
            paystack: PAYSTACK_KEY, 
            receiptEmail: "receipt@ziinlo.com"
        }
    }, 
    mounted() {
        console.log("params: ", this.$route.params)
    }
}
</script>

<style scoped>
.vendor-container {
    width: 100vw;
    height: 100vh;
    background-color: rebeccapurple;
}
</style>