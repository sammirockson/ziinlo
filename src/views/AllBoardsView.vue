<template>
     <div class="allBoards">
     <label class="title-label">My Projects</label>
        <div class="boardContentView">
            <v-row style="overflow: hidden;">
             <v-col v-for="board in boards" :key="board" cols="auto"> 
               <div class="productGridCellWithBorder"  @click="handleBoardTapped(board)">
                  <img src="@/assets/board_placeholder.png" class="productCellImage">
                  <label class="productNameLabel">{{ board.name }}</label>
               </div>
              </v-col>
            </v-row>
           </div>
        </div>
</template>
<script>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import axios from 'axios';

export default {
  inject: ["cryptojs"],
    components: {
        
    }, 
    setup() {
        var isSideBarExpanded = ref(false)
        var selectedTaskBoardType = ref("All Team")
        var boards = ref([])
        var currentUser = ref({})
        return { isSideBarExpanded, boards, selectedTaskBoardType, currentUser}
    },
    methods: {
      handleMount() {
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
        console.log("userCacheString: ", userCacheString)
        if (userCacheString == null || userCacheString.length == 0) {
              this.$router.push({path: "/home"})
            } else {
             let userCache = JSON.parse(userCacheString)
             let decryptionToken = userCache.token
             let encryptedUserData = userCache.user
             let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
             let cacheInfoObject = JSON.parse(decryptedData)
             this.currentUser = cacheInfoObject.user
             console.log("parsed credentials: ", userCache)
             this.fetchBoards()
       }
      },
      handleBoardTapped(board) {
        console.log("board: ", board)
        let path = "/b/" + board.id
        this.$router.push({path: path})
      },
      handleBoardTypeTapped(item) {
        this.selectedTaskBoardType = item
      },
    async fetchBoards() {
        var params = {
            owner: this.currentUser.id
        }
        var fullURL = BASE_URL + "board/my"
        console.log("full url: ", fullURL, "params: ", params)
        await axios.post(fullURL, params).then((response) => {
          console.log("board response: ", response)
          if (response.data != null) {
            let data = response.data
            console.log("resp data: ", data)
            if (data.statusCode == 200) {
                let allBoard = data.resp
                console.log("boards: ", allBoard)
                this.boards = allBoard
              }
             }
          })
        }
    },
    mounted() {
      this.handleMount()
    } 
}
</script>
<style lang="scss" scoped>
    .productCellImage {
    height: 200px;
    width: 232px;
    margin-right: auto;
    margin-left: auto;
    background-color: var(--color-light);
    object-fit: cover;
    margin-bottom: 10px;
}

.productGridCellWithBorder {
    border: 2px solid var(--color-light);
    label {
      font-weight: 600;
      font-size: 20px;
    }
}
.productGridCell, .productGridCellWithBorder {
    display: block;
    height: 280px;
    overflow: hidden;
    width: 232px;
    background-color: white;
    border-radius: var(--border-radius-2);
}

.boardContentView {
    width: 80%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 30px;
}

.allBoards {
    width: 100vw;
    height: 100vh;
    background-color: white;
    .title-label {
      display: flex;
      width: 80%;
      text-align: left;
      font-weight: 700;
      font-size: 34px;
      margin-left: 10%;
      padding-top: 100px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-light);
    }
}
</style>