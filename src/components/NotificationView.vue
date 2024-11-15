<template>
  <div class="notication-container">
    <div class="notif-content">
        <div class="notification-cell" v-for="notification in notifications" :key="notification.id" @click="handleNotificationTapped(notification)">
            <div class="user-info">
                <img :src="notification.notifier.picture">
                <label>{{ notification.notifier.fullName }}</label>
            </div>
            <label class="content-label">{{ notification.content }}</label>
            <span class="timeStampLabel"> {{ new Date(notification.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric'
            })
        }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'
import APIService from '@/APIService';
export default {
    inject: ["cryptojs"],
    props: {
        boardId: {
            type: String, 
            required: true
        }, 
        boardMembers: {
            type: [String], 
            default: []
        }
    },
    data() {
        return { 
            currentUser: null, 
            notifications: []
        }
    }, 
    mounted() {
      let userCacheString = localStorage.getItem(USER_CACHE_KEY)
       if (userCacheString != null && userCacheString.length > 0) {
          let userCache = JSON.parse(userCacheString)
          let decryptionToken = userCache.token
          let encryptedUserData = userCache.user
          let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
          let cacheInfoObject = JSON.parse(decryptedData)
         this.currentUser = cacheInfoObject.user
       }
        this.getBoardNotifications()
    }, 
    methods: {
        handleNotificationTapped(notification) {
            this.$emit('dismissNotification')
            const card = _.get(notification, 'card')
            const boardId = _.get(card, 'boardId')
            const cardPath = `/b/${boardId}/c/${card._id}`
            this.$router.push({path: cardPath})
        },
       async getBoardNotifications() {
            const currentUserId = _.get(this.currentUser, 'id')
            const membersExcludeCurrent = _.filter(this.boardMembers, function(o) { return o !== currentUserId});
            console.warn('membersExcludeCurrent: ', membersExcludeCurrent, 'current user: ', currentUserId)
            const params = {
                receivers: membersExcludeCurrent,
                boardId: this.boardId, 
                notifierId: currentUserId
            }
           this.notifications = await APIService.boardNotifications(params)
        },
    }
}
</script>

<style lang="scss" scoped>
.notification-cell {
    background-color: white;
    padding: 12px 0px 12px 12px;
    margin-bottom: 10px;
    border-radius: 12px;
   .user-info {
    display: flex;
    gap: 8px;
    img {
      height: 34px;
      width: 34px;
      border-radius: 8px;
      object-fit: cover;
      overflow: hidden;
    }
    label {
      display: flex;
      text-align: left;
      width: 70%;
      font-weight: 700;
      font-size: 15px;
      max-height: 20px;
      overflow: hidden;
      margin-top: -2px;
    }
   }
   .content-label {
     display: flex;
     width: 80%;
     font-weight: 500;
     font-size: 14px;
     margin-left: 44px;
     margin-top: -12px;
     text-align: left;
    }
    span {
        display: flex;
        font-weight: 400;
        color: var(--color-info-dark);
        margin-left: 44px;
        font-size: 13px;
        margin-top: 4px;
    }
}
  .notication-container {
    max-height: 80vh;
    width: 340px;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
    margin: 50px 10px 0 0;
    padding: 10px 0 0 0;
    overflow-y: scroll;
  }

</style>