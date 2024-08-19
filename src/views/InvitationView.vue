<template>
     <div class="navBar">
          <div class="logoNameContainer">
          <img src="@/assets/logo.png" class="logoIcon">
           <label for="">Zinlo</label>
          </div>
          <div class="loginSignUpContainer" v-if="!isAuth">
              <button class="loginBtn" @click="handleJoinBoard">Log In</button>
              <button class="signUp"  @click="handleJoinBoard">Sign Up For Free</button>
          </div>
        </div>
    <div v-if="isAuth" class="authContainer">
      <LoginView v-if="isLogin" class="inputFieldContainer" isInvite="true" @didTapNavToSignUp="handleNavToSignUp" @didLogIn="handleDidAuthenticateUser"/>
      <SignUpView v-else class="inputFieldContainer" isInvite="true" @didTapNavToLogin="handleBackToLogin" @didSignUp="handleDidAuthenticateUser"/>
    </div>
    <div v-else class="invitationContainer">
        <div class="mainInviteContainer" v-if="inviter != null && board != null">
           <label class="messageLabel"><span>{{ inviter.fullName }}</span> has invited you to join and <br>contribute to <span>{{ board.name }}</span> board.</label>
            <img src="@/assets/teamIllustrations.png" class="illustration">
            <button class="joinBtn" @click="handleJoinBoard">Join For Free</button>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import LoginView from './LoginView.vue';
import SignUpView from '@/views/SignUp.vue'
import APIService from '@/APIService';
import CryptoJS from 'crypto-js'
import { USER_CACHE_KEY } from '@/config'

export default {
    inject: ["cryptojs"],
    components: {
        LoginView, SignUpView
    },
    setup() {
        var inviter = ref(null)
        var board = ref(null)
        var isAuth = ref(false)
        var isLogin = ref(true)
        var currentUser = ref({})
        return { inviter, board, isAuth, isLogin, currentUser}
    }, 
    mounted() {
        APIService.init()
        let routeParams = this.$route.params
        console.log("invitation params: ", routeParams)
        let boardId = routeParams.boardId
        let inviterId = routeParams.inviter
        this.getInviteInfo(boardId, inviterId)
    }, 
   methods: {
    handleDidAuthenticateUser(user) {
      this.currentUser = user
      this.handleConfirmInvitation()
    },
    handleBackToLogin() {
        this.isLogin = true
    },
    handleNavToSignUp() {
        this.isLogin = false
    },
    async getInviteInfo(boardId, inviterId) {
        var params = {
         boardId: boardId,
         inviterId: inviterId
       }

       let resp = await APIService.getInvitationInfo(params)
       console.log("inviter resp: ", resp)
       this.inviter = resp.inviter
       this.board = resp.board
       let userCacheString = localStorage.getItem(USER_CACHE_KEY)
       if (userCacheString != null && userCacheString.length > 0) {
        let userCache = JSON.parse(userCacheString)
        let decryptionToken = userCache.token
        let encryptedUserData = userCache.user
        let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
        let cacheInfoObject = JSON.parse(decryptedData)
        this.currentUser = cacheInfoObject.user
        // Just let him join
        this.handleConfirmInvitation()
       }
    }, 
    handleJoinBoard() {
        this.isAuth = true 
    }, 
    async handleConfirmInvitation() {
      if (this.currentUser.id.length > 0) { 
        var params = {
          boardId: this.board.id,
          inviteeId: this.currentUser.id
       }
       console.log("confirm invitation params: ", params)
       let resp = await APIService.confirmInvitation(params)
       console.log("confirm invitation: ", resp)
       if (resp._id != null && resp._id.length > 0) {
         // go to the boards
         this.$router.push({path: "/boards"})
       }
      }
    }
  }
}
</script>
<style scoped>
.authContainer {
    width: 500px;
    height: 700px;
    background-color: white;
    border-radius: var(--border-radius-2);
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
}
.messageLabel {
    font-weight: 500;
    font-size: 24px;
    margin-top: 40px;
    color: var(--color-bar-dark);
}
.messageLabel span {
    font-weight: 700;
}

.mainInviteContainer {
    display: flex;
    flex-direction: column;
}
.illustration {
    margin-top: 50px;
    width: 400px;
    height: 400px;
    margin-right: auto;
    margin-left: auto;
    object-fit: contain;
}
.logoNameContainer label {
    font-size: 30px;
    font-weight: 700;
    margin-left: 4px;
    margin-top: auto;
    margin-bottom: auto;
}

.logoIcon {
    width: 34px;
    height: 34px;
    margin-top: auto;
    margin-bottom: auto;
}
.signUp, .loginBtn, .joinBtn {
    width: 100px;
    height: 40px;
    font-size: 15px;
    font-weight: 500;
    border-radius: var(--border-radius-1);
    margin-top: auto;
    margin-bottom: auto;
}

.joinBtn {
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
}

.signUp, .joinBtn {
    width: 180px;
    color: white;
    background-color: var(--color-bar-dark)
}
.loginBtn {
    color: var(--color-bar-dark);
    border: 1px solid var(--color-bar-dark);
}
.logoNameContainer {
    display: flex;
    width: calc(100% - 300px);
    height: 80%;
}
.loginSignUpContainer {
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 80%;
}
.navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: white;
    padding-right: 15px;
    padding-left: 15px;
}

.invitationContainer {
    height: 100vh;
    width: 100vw;
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
}


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
  margin-top: 30px;
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

/* .passwordField, .emailField {
  width: 340px;
  max-height: 44px;
  font-weight: 500;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 0px solid var(--color-light-primary) !important;
  border-color: var(--color-light-primary);
} */

.passwordField, .emailField, .fullNameField, .loginEmailField {
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

.loginEmailField {
    margin-top: 54px;
}

</style>