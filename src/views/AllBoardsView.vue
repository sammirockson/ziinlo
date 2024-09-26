<template>
     <div class="allBoards">
      <div class="board-top">
        <label>My Projects</label>
        <img src="../assets/add.svg" @click="onPrepareToCreateBoard">
      </div>
        <div class="boardContentView">
            <v-row style="overflow: hidden;">
             <v-col v-for="board in boards" :key="board" cols="auto"> 
               <div class="productGridCellWithBorder"  @click="handleBoardTapped(board)">
                  <img src="@/assets/board_placeholder.png" class="productCellImage">
                  <label>{{ board.name }}</label>
            </div>
          </v-col>
        </v-row>
       </div>
      <v-overlay  v-model="isCreateBoard" class="align-center justify-center" contained>
        <CreateNewBoardView @closeOverlay="onCloseOverlay"/>
     </v-overlay>
    </div>
</template>
<script>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import axios from 'axios';
import CreateNewBoardView from '../components/CreateNewBoardView.vue'

export default {
  inject: ["cryptojs"],
    components: {
      CreateNewBoardView
    }, 
    setup() {
        var isSideBarExpanded = ref(false)
        var selectedTaskBoardType = ref("All Team")
        var boards = ref([])
        var currentUser = ref({})
        var isCreateBoard = ref(false)
        return { isSideBarExpanded, boards, selectedTaskBoardType, currentUser, isCreateBoard}
    },
    methods: {
      onCloseOverlay() {
        this.fetchBoards()
      },
      onPrepareToCreateBoard() {
        this.isCreateBoard = true
      },
      handleMount() {
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
        if (userCacheString == null || userCacheString.length == 0) {
              this.$router.push({path: "/home"})
            } else {
             let userCache = JSON.parse(userCacheString)
             let decryptionToken = userCache.token
             let encryptedUserData = userCache.user
             let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
             let cacheInfoObject = JSON.parse(decryptedData)
             this.currentUser = cacheInfoObject.user
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
      font-size: 14px;
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
    height: 80%;
    display: flex;
    margin: auto;
    padding: 50px 0 0 0;
}

.allBoards {
    width: 100vw;
    height: 100vh;
    background-color: white;
    .board-top {
      display: flex;
      width: 80%;
      margin-left: 10%;
      padding-top: 100px;
       padding-bottom: 8px;
       border-bottom: 1px solid var(--color-light);
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
      }
      label {
       text-align: left;
       font-weight: 700;
       font-size: 34px;
     }
    }
}
</style>