<template>
    <form class="authContentView">
      <paystack v-if="isPay"
      :amount="amount"
      :email="receiptEmail"
      :paystackkey="paystackkey"
      :reference="reference"
      :callback="callback"
      :close="close"
      :embed="false"
    >
    </paystack>
      <div class="inputFieldContainer">
        <img src="@/assets/logo.png" class="brandLogo">
        <v-text-field type="name" prepend-inner-icon="mdi-account-circle-outline" class="fullNameField" v-model="fullName" variant="outlined" label="Full Name"></v-text-field>
            <v-text-field type="email" prepend-inner-icon="mdi-email-outline" class="emailField" v-model="email" required variant="outlined" label="Email Address"></v-text-field>
            <v-text-field
            :type="showPassword ? 'text' : 'password'"  prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-outline'"
             @click:append-inner="viewPassword" class="passwordField"  v-model="password" label="Password" variant="outlined"></v-text-field>  
             <v-file-input label="Profile photo" class="emailField"></v-file-input>
              <button v-if="isLogActivated" class="buttonload">
                  <i class="fa fa-circle-o-notch fa-spin"></i> Signing up... 
              </button>
              <button :disabled="isBtnDisabled" v-else @click.prevent="handleSignUp"  v-on:keyup.enter="handleSignUp">Sign Up</button>
              <label class="forgotTitleLabel" @click.prevent="handleLogin">Have an account? <span>Log In</span></label>
      </div>
    </form>
</template>
<script>
import paystack from '../components/paystack.vue';
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { USER_CACHE_KEY, PAYSTACK_KEY, PRICING } from '@/config'
import APIService from '@/APIService';
import _ from 'lodash';

export default {
  props: {
    isInvite: false
  },
  inject: ["cryptojs"],
  components: {
     paystack
  },
  setup() {
    var email = ref("")
    var password = ref("")
    var isLogActivated = ref(false)
    var showPassword = ref(false)
    var googleUser = ref(null)
    var viewPassword = ref(false)
    var fullName = ref("")
    var subscriptionType = ref('basic')
    var paystackkey = ref(PAYSTACK_KEY)
    var amount = ref(12600)
    var isPay = ref(false)
    var receiptEmail = ref("receipt@ziinlo.com")
    var userId = ref('')
    return { email, password, isLogActivated, showPassword, googleUser, isPay, userId,
         viewPassword, fullName, subscriptionType, paystackkey, amount, receiptEmail
      }
  }, 
  computed: {
    reference(){
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( let i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }, 
    isBtnDisabled() {
      let isValidEmail = this.validateEmail(this.email)
      return this.fullName.length === 0 || !isValidEmail || this.password.length === 0
    }
  },
  mounted() {
    APIService.init()
    let routeParams = this.$route.query
    this.subscriptionType = _.get(routeParams, 'subscription', false) 
    if (this.subscriptionType !== false) {
      let selectedPrice = _.get(PRICING, this.subscriptionType.toLowerCase(), false)
    }
    // TODO: Compute the price from cedis to dollars
  },
  methods: {
    validateEmail(email) {
      var re = /\S+@\S+\.\S+/
     return re.test(email);
    },
    handleLogin() {
      if (this.isInvite) {
          this.$emit("didTapNavToLogin")
      } else {
          this.$router.push({path: "/login"})
      }
    },
    viewPassword() {
      this.showPassword = !this.showPassword
    },
    handleSignUp() {
      this.completedSignUp()
    },
    handleSignUpTapped() {
      this.$emit('navToRegister', true)
    }, 
    async completedSignUp() {
      this.isLogActivated = true 
      var params = {
        email : this.email, 
        fullName : this.fullName, 
        password: this.password, 
        isEmailVerified: false,
        isViaGoogle: false,
        subscriptionType: this.subscriptionType,
        id: Date.now()
      }
      this.receiptEmail = this.email
      let userInfo = await APIService.signUp(params)
      if (userInfo.token.length > 0) {
          let token = userInfo.token
            this.userId = userInfo.user._id
            let userDataStr = JSON.stringify(userInfo)
            let encyrptedUserData = CryptoJS.AES.encrypt(userDataStr, token).toString()
            let cacheData = {
              token: token, 
              user: encyrptedUserData
            }
            localStorage.removeItem(USER_CACHE_KEY)
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(cacheData))
            if (this.subscriptionType === 'standard' || this.subscriptionType === 'business') {
              this.isPay = true 
            } else if (this.isInvite) { 
              this.$emit("didSignUp", userInfo.user)
            } else {
              this.$router.push({path: "/"})
            }
         } else {
          alert(userInfo.msg)
         }
      },
      async updateSubscription() {
        let param = {
          userId: this.userId, 
          subscriptionType: this.subscriptionType
        }
        await APIService.updateSubscription(param)
        this.$router.push({path: "/"})
      },
      callback: function(response){
        this.isPay = false 
        if (response.status === "success" && response.message === "Approved") {
          // Update user subscription type before going home
           this.updateSubscription()
        } else {
          this.$router.push({path: "/"})
        }
      },
      close: function(){
        this.isPay = false 
        this.$router.push({path: "/"})
      }
   }
}
</script>
<style lang="scss" scoped>
.googleTitleLabel {
  font-weight: 500;
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
}
.googleIcon {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-top: auto;
  margin-bottom: auto;
}
.googleButtonContainer {
  display: flex;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
  width: 340px;
  height: 50px;
  border: 1px solid var(--color-light);
  border-radius: var(--border-radius-1);
}
.orLabel {
  width: 30px;
  height: 30px;
  font-weight: 600;
  margin-top: -12px;
  color: var(--color-dark);
  margin-left: 10px;
}
.leftLineView, .rightLineView {
  width: 140px;
  height: 1px;
  background-color: var(--color-light);
  margin-left: 30px;
}

.rightLineView {
  margin-left: 10px;
}

.lineContainer {
  display: flex;
  margin-top: 50px;
}
.brandLogo {
  width: 60px;
  height: 60px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.authContentView {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  width: 100vw;
  height: 100vh;
}
.signUpLabel {
  display: block;
  margin-top: 130px;
}

.signUpSpan {
  color: var(--color-blue);
  font-weight: 600;
}
.inputFieldContainer button { 
  margin-top: 70px;
  width: 340px;
  height: 50px;
  margin-right: auto;
  margin-left: auto;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background-color: var(--color-bar-dark);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
   &:disabled {
    background-color: var(--color-light);
   }
}

.inputFieldContainer {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 650px;
  margin-right: auto;
  margin-left: auto;
  border-radius: var(--border-radius-2);
  margin-top: 50px;
}

.passwordField, .emailField, .fullNameField {
  width: 340px;
  max-height: 44px;
  font-weight: 500;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 0px solid var(--color-light-primary) !important;
  border-color: var(--color-light-primary);
}
.fullNameField {
  margin-top: 54px;
}
.emailField {
  margin-top: 30px;
}
.passwordField {
  margin-top: 30px;
}

.forgotTitleLabel {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-dark);
  margin-top: 30px;
  float: left;
  text-align: left;
  margin-left: 34px;
}
.subTitleLabel {
  color: var(--color-light-primary);
  font-weight: 300;
  font-size: 14px;
}

.titleLabel {
  display: block;
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
  margin-top: 30px;
}

</style>

<style> 
.cardFormPaymentButton, .button {
    background-color: red;
}
</style>