<template>
  <div class="assign-card-view">
    <label class="assign-title-label">Assignees</label>
    <div class="memberCell" v-for="(member, index) in members" :key="index">
        <div class="member-row" @click="handleRowTapped(member)">
          <img :class="{'is-checked': assigneeIds.includes(member.id)}" class="checkbox">
          <img v-if="member.picture.length > 0" :src="member.picture" class="defaultImage">
            <div v-else class="defaultImage">
              <label>{{ member.fullName.substring(0,1) }}</label>
              </div>
          <div class="nameAndRoleView">
            <label class="fullNameLabel">{{ member.fullName }}</label>
          </div>
        </div> 
     </div>
  </div>
</template>

<script>
import APIService from '@/APIService';
import { USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'

export default {
  inject: ["cryptojs"],
  props: {
    boardId: {
      type: String
    }, 
    assignedUserIds: {
      type: []
    }, 
    card_id: {
      type: String
    }
  },
  mounted() {
    this.assigneeIds = this.assignedUserIds
    this.fetchMembers()
    let userCacheString = localStorage.getItem(USER_CACHE_KEY)
       if (userCacheString != null && userCacheString.length > 0) {
          let userCache = JSON.parse(userCacheString)
          let decryptionToken = userCache.token
          let encryptedUserData = userCache.user
          let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
          let cacheInfoObject = JSON.parse(decryptedData)
         this.currentUser = cacheInfoObject.user
      }
  },
  data() {
    return {
      members: [], 
      assigneeIds: [], 
      assignees: [], 
      currentUser: null
    }
  }, 
  methods: {
    async handleRowTapped(member) {
      if (this.currentUser === null) {
        return 
      }
      if (this.assigneeIds.includes(member.id)) {
        _.remove(this.assigneeIds, function(id) {
          return id === member.id
        })
        _.remove(this.assignees, function(assignee) {
          return assignee.id === member.id
        })
      } else {
        this.assigneeIds.push(member.id)
        this.assignees.push(member)
      }
      // Update API
      this.$emit('didAssignMembers', this.assignees, this.assigneeIds)
      let params = {
        card_id: this.card_id, 
        assigneeIds: this.assigneeIds, 
        assigner: this.currentUser.id // current user id
      }
      console.log('params for update assignees: ', params)
      await APIService.updateAssignees(params)
    },
    async fetchMembers() {
      let params = {
        boardId: this.boardId
      }
      let allMembers = await APIService.getBoardMembers(params)
      this.members = allMembers
    }
  }
}
</script>

<style lang="scss" scoped>
 .assign-card-view {
    padding-top: 10px;
    height: 500px;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    margin-top: -10%;
    .defaultImage label {
      color: white;
      font-weight: 500;
      font-size: 12px;
    }   
  .defaultImage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background-color: brown;
    color: white;
 }
  .member-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .memberCell {
    display: flex;
    padding-left: 20px;
    height: 50px;
    justify-content: space-between;
    align-items: center
  }
  .assign-title-label {
    display: block;
    font-weight: 500;
  }
  .nameAndRoleView {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
  .fullNameLabel {
    font-weight: 500;
    font-size: 14px;
    text-align: left;
  }
}

.checkbox {
  width: 24px;
  height: 24px;
  content: url('../assets/checkbox_default.png');
  &.is-checked {
    content: url('../assets/checkbox_active.png');
  }
}

</style>