<template>
    <div class="authContentView">
      <div class="inputFieldContainer">
        <img src="@/assets/brand_logo.svg" class="brandLogo">
        <v-text-field type="name" prepend-inner-icon="mdi-account-circle-outline" class="fullNameField" v-model="fullName" variant="outlined" label="Full Name"></v-text-field>
            <v-text-field type="email" prepend-inner-icon="mdi-email-outline" class="emailField" v-model="email" variant="outlined" label="Email Address"></v-text-field>
            <v-text-field
            :type="showPassword ? 'text' : 'password'"  prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-outline'"
             @click:append-inner="viewPassword" class="passwordField"  v-model="password" label="Password" variant="outlined"></v-text-field>  
             <v-file-input label="Profile photo" class="emailField"></v-file-input>
              <button v-if="isLogActivated" class="login buttonload">
                  <i class="fa fa-circle-o-notch fa-spin"></i> Signing up... 
              </button>
              <button v-else @click="handleSignUp"  v-on:keyup.enter="handleSignUp">Sign Up</button>
              <label class="forgotTitleLabel">Have an account? <span>Log In</span></label>
              <!-- <div class="lineContainer">
                <div class="leftLineView"></div>
                <label class="orLabel">OR</label>
                <div class="rightLineView"></div>
              </div> -->
      </div>
      <!-- <label class="signUpLabel" @click="handleSignUpTapped">Don't have an account? <span class="signUpSpan"> Register here</span></label> -->
    </div>
</template>
<script>
import { BASE_URL, PICKMORE_MERCHANT_KEY, SIDE_BAR_MENU_ITEM_KEY } from '@/config';
import { ref } from 'vue'
import axios from 'axios';
import { googleSdkLoaded } from "vue3-google-login";
import config from '@/config';
import CryptoJS from 'crypto-js'
import { USER_CACHE_KEY } from '@/config'

export default {
    inject: ["cryptojs"],
    setup() {
      var email = ref("")
      var password = ref("")
      var isLogActivated = ref(false)
      var showPassword = ref(false)
      var googleUser = ref(null)
      var viewPassword = ref(false)
      var fullName = ref("")
      return { email, password, isLogActivated, showPassword, googleUser, viewPassword, fullName }
    }, 
    methods: {
      viewPassword() {
        this.showPassword = !this.showPassword
      },
      async handleSignUp() {
           this.isLogActivated = true 
           var params = {
               email : this.email, 
               fullName : this.fullName, 
               password: this.password, 
               isEmailVerified: false,
               isViaGoogle: false,
               id: Date.now()
            }
            var path = "auth/signUp"
            var fullURL = BASE_URL + path
            console.log("full url: ", fullURL, "params: ", params)
            await axios.post(fullURL, params).then((response) => {
              this.isLogActivated = false
              if (response.data != null) {
                let data = response.data
                if (data.statusCode == 200) {
                  let gUserInfo = data.resp 
            console.log("signed up info: ", gUserInfo)
            gUserInfo.password = ""
            let token = gUserInfo.token
            let userDataStr = JSON.stringify(gUserInfo)
            let encyrptedUserData = CryptoJS.AES.encrypt(userDataStr, token).toString()
            let cacheData = {
              token: token, 
              user: encyrptedUserData
            }
            console.log("encrypted data: ", cacheData)
            localStorage.removeItem(USER_CACHE_KEY)
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(cacheData))
            this.$router.push({path: "/"})
                
                } else {
                    alert(data.msg)
                }
               }
            })
      },
      handleSignUpTapped() {
        this.$emit('navToRegister', true)
      }
   }
}
</script>
<style scoped>
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
  background-color: var(--color-primary);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
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