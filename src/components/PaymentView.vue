<template>
    <div class="payment">
        <p class="payment-intro">
            <paystack
                :amount="amount"
                :email="email"
                :paystackkey="paystackkey"
                :reference="reference"
                :callback="callback"
                :close="close"
                :embed="false"
            >
            </paystack>
        </p>
    </div>
</template>

<script type="text/javascript">
import paystack from '../components/paystack.vue';
export default {
    props: {
        amount: {
            type: Number, 
            default: 10000
        }
    },
    components: {
        paystack
    },
    data(){
        return{
          paystackkey: "pk_test_d6d4ce7c71acf6aa0d38b521b5f96af17e0b7c9d",
          email: "receipt@eziinlo.com",
          amount: this.amount
        }
    },
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
    },
    methods: {
      callback: function(response){
        console.log(response)
//         {
//     "reference": "O8rDqLt48Z",
//     "trans": "4227058879",
//     "status": "success",
//     "message": "Approved",
//     "transaction": "4227058879",
//     "trxref": "O8rDqLt48Z",
//     "return": "{\"redirecturl\":\"?trxref=O8rDqLt48Z&reference=O8rDqLt48Z\",\"trans\":\"4227058879\",\"trxref\":\"O8rDqLt48Z\",\"reference\":\"O8rDqLt48Z\",\"status\":\"success\",\"message\":\"Success\",\"response\":\"Approved\"}",
//     "redirecturl": "?trxref=O8rDqLt48Z&reference=O8rDqLt48Z"
// }
      },
      close: function(){
        console.log("Payment closed")
      }
    }
}
</script>
<style scoped>
    .payment {
        text-align: center;
    }

    .payment-intro {
        font-size: large;
    }
    .payButton{
        color: #61DAFB;
        width: 250px;
        height: 50px;
        font-weight: 800;
    }
</style>