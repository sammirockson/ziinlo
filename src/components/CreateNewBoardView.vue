<template>
    <div class="createBoard">
        <div class="createNewList">
            <textarea name="text" v-model="boardName" placeholder="Project managment starts with a new board" class="createNewListField" id="createNewListField_id"></textarea>
                <button v-if="isCreatingBoard" class="addListBtn buttonload">
                   <i class="fa fa-circle-o-notch fa-spin"></i> Creating... 
                </button>
            <button v-else :class="boardName.length > 0 ? `addListBtn` : `addListBtnDisabled`" :disabled='boardName.length == 0' @click="createNewBoard()">Create Board</button>
         </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'
import axios from 'axios';

export default {
    inject: ["cryptojs"],
    setup() {
        var boardName = ref("")
        var isCreatingBoard = ref(false)
        var currentUser = ref({})
        return { boardName, isCreatingBoard, currentUser }
    }, 
    mounted() {
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
            if (userCacheString == null) {
                this.$router.push({path: "/login"})
            } else {
            let userCache = JSON.parse(userCacheString)
            let decryptionToken = userCache.token
            let encryptedUserData = userCache.user
            let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
            let cacheInfoObject = JSON.parse(decryptedData)
            this.currentUser = cacheInfoObject.user
            console.log("currentUser: ", this.currentUser)
        }
    },
    methods: {
        async createNewBoard() {
            this.isCreatingBoard = true 
            var params = {
                name : this.boardName, 
                owner: this.currentUser.id,
                list: [],
                id: Date.now()
            }
            var fullURL = BASE_URL + "board/new"
            console.log("full url: ", fullURL, "params: ", params)
            await axios.post(fullURL, params).then((response) => {
              this.isCreatingBoard = false
              console.log("board response: ", response)
              if (response.data != null) {
                let data = response.data
                if (data.statusCode == 200) {
                    let board = data.resp
                    console.log("board: ", board)
                    // Go to boards
                    this.$emit('closeOverlay', true)
                    this.$router.push({path: "/boards"})
                    // dismiss the overlay
                } else {
                    alert(data.msg)
                }
               }
            })
        }
    }
}
</script>
<style scoped>
.addListBtn, .addListBtnDisabled {
    display: block;
    width: 140px;
    height: 40px;
    background-color: var(--color-bar-dark);
    color: white;
    border-radius: var(--border-radius-2);
    margin-left: 8px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
}

.addListBtnDisabled {
    background-color: var(--color-light);
    color: var(--color-dark-variant);
}

.createNewList {
    display: flex;
    justify-content: center;
    width: 98%;
    padding-top: 20px;
    z-index: 9999;
    overflow: hidden;
    background-color: white;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    border-radius: var(--border-radius-1)
}

.createNewListField {
  padding: 8px;
  width: 80%;
  margin-left: 8px;
  margin-right: 8px;
  border: 1px solid var(--color-light);
  border-radius: var(--border-radius-1);
  text-align: left;
  resize: none;
  overflow: hidden;
  height: 44px;
  font-weight: 500;
  font-size: 14px;
}
.createBoard {
    display: block;
    height: 100px;
    width: 800px;
    background-color: white;
    border-radius: var(--border-radius-2);
    margin-top: -280px;
}
    
</style>