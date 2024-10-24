<template>
  <div class="move-card-container">
     <label for="">Move Card</label>
      <div class="field-container">
        <v-select
        label="From"
        :items="fromList"
        item-title="listName"
        item-value="id"
        :model-value="selectedFromList.listName"
    ></v-select>
    <v-select label="To"
        :items="toList"
        item-title="listName"
        item-value="_id"
        v-model="selectedToList"
    ></v-select>
      </div>
      <button v-if="isMovingCard" class="buttonload">
         <i class="fa fa-circle-o-notch fa-spin"></i> Moving... 
     </button>
     <button v-else :disabled="selectedToList == null" :class="{'is-disabled':selectedToList == null}" @click="handleMoveCard">Move</button>
  </div>
</template>

<script>
import _ from 'lodash';
import APIService from '@/APIService';
import { USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'

export default {
    inject: ["cryptojs"],
    props: {
        selectedFromList: {
            type: Object, 
            default: null
        },
        fromList: {
            type: [Object], 
            default: []
        }, 
        toList: {
            type: [Object], 
            default: []
        }, 
        cardId: {
            type: String, 
            default: ''
        }
    },
    data() {
        return {
            selectedToList: null, 
            currentUser: null, 
            isMovingCard: false
        }
    }, 
    mounted() {
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
            if (userCacheString == null) {
                // this.$router.push({path: "/home"})
            } else {
            let userCache = JSON.parse(userCacheString)
            let decryptionToken = userCache.token
            let encryptedUserData = userCache.user
            let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
            let cacheInfoObject = JSON.parse(decryptedData)
            this.currentUser = cacheInfoObject.user
        }
    },
    methods: {
        async handleMoveCard() {
            this.isMovingCard = true 
            let params = {
                cardId: this.cardId, 
                currentListId: this.selectedFromList._id, 
                newListLocationId: this.selectedToList, 
                userId: this.currentUser.id
            }
            await APIService.moveCard(params)
            this.$emit('didMoveCard')
            this.isMovingCard = false
        }
    }
}
</script>

<style lang="scss" scoped>
.move-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 340px;
    border-radius: 8px;
    padding-top: 20px;
    background-color: white;
    .field-container {
        padding-top: 20px;
        height: 280px;
        width: 300px;
    }
   button {
    width: 250px;
    height: 44px;
    color: white;
    background-color: var(--color-bar-dark);
    border-radius: 8px;
      &.is-disabled {
        background-color: var(--color-info-light);
      }
   }
}

</style>