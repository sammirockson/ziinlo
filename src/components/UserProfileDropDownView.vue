<template>
    <div class="user-profile-dropdown">
        <div class="account-container" v-if="currentUser">
            <label>{{ currentUser.email }}<br><span>Subscription Type: {{ currentUser.subscriptionType }}</span></label>
            <img :src="currentUser.picture"><span>{{ currentUser.fullName }}</span></img>
            <button>Edit Profile</button>
        </div>
      <!-- <label>Profile Settings</label> -->
      <v-divider class="divider"></v-divider>
      <div class="list-options">
          <div class="list-cell" v-for="option, index in options" @click="handleOptionTapped(index)">
              <label for="">{{ option }}</label>
              <img src="../assets/arrow_right.svg">
          </div>
      </div>

      <div class="update-signout-container">
          <button><img src="@/assets/account_balance_wallet.svg">Upgrade</button>
          <button @click="handleSignOut"><img src="@/assets/logout.svg"> Sign Out</button>
      </div>
    </div>
  </template>
  
  <script>
  import { USER_CACHE_KEY } from '@/config'
  import CryptoJS from 'crypto-js'
  export default {
     inject: ["cryptojs"],
      props: {
          list: Object
      },
      data() {
          return {
            currentUser: null,
            options: [
               "Background",
               "Activities", 
               "My Cards",
               "Help"
            ]
          }
      }, 
      mounted() {
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
            if (userCacheString != null) { 
              let userCache = JSON.parse(userCacheString)
              let decryptionToken = userCache.token
              let encryptedUserData = userCache.user
              let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
              let cacheInfoObject = JSON.parse(decryptedData)
              this.currentUser = cacheInfoObject.user
        }
      },
      methods: {
        handleSignOut() {
            localStorage.removeItem(USER_CACHE_KEY)
            this.$router.push({path: "/boards"})
        },
        handleOptionTapped(index) {
            this.$emit('onListOptionTapped', index, this.list)
        }
      }
  }
  </script>
  
  <style lang="scss" scoped>
  .update-signout-container {
    display: flex;
    height: 60px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    gap: 10px;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 6px;
        font-weight: 500;
        font-size: 14px;
        background-color: var(--color-background);
    }
    button:first-child {
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
    }
    button:last-child {
        border-bottom-right-radius: 30px;
        border-top-right-radius: 30px;
    }
  }
  .account-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-right: auto;
    margin-left: auto;
    // height: 200px;
    margin-bottom: 30px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        span {
            font-weight: 500;
            font-size: 11px;
        }
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 180px;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        span {
            font-weight: 500;
            font-size: 11px;
        }
    }
    button {
      padding: 8px 15px 8px 15px;
      border: 1px solid var(--color-background);
      border-radius: 8px;
      color: var(--color-blue);
    }
  }
  .user-profile-dropdown {
    background-color: white;
      padding: 10px 0 0 0;
      label {
       font-weight: 600;
       font-size: 14px;
       margin-top: 20px;
     }
     .list-options {
      height: 200px;
      padding-top: 8px;
     }
     .divider {
      margin-top: 10px;
     }
     .list-cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        text-align: left;
        margin: 10px 15px 0 20px;
        height: 30px;
        label {
            cursor: pointer;
            font-size: 13px;
            font-weight: 400;
        }
     }
  }
  
  </style>