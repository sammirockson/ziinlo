<template>
     <div class="allBoards">
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
import { BASE_URL } from '@/config'
import axios from 'axios';

export default {
    components: {
        
    }, 
    setup() {
        var isSideBarExpanded = ref(false)
        var selectedTaskBoardType = ref("All Team")
        var boards = ref([Object])
        return { isSideBarExpanded, boards, selectedTaskBoardType}
    },
    methods: {
      handleBoardTapped(board) {
        console.log("board: ", board)
        let path = "/board/" + board.id // this.currentUser._id + "/product/" + product._id
        this.$router.push({path: path})
      },
      handleBoardTypeTapped(item) {
        this.selectedTaskBoardType = item
      },
    watch: { 
        // isExpanded: function(newVal, oldVal) {
        //     console.log('Prop changed isSideBarExpanwded: ', newVal)
        //     this.isSideBarExpanded = newVal
        // }
    }, 
    async fetchBoards() {
        var params = {
            owner: "1721545684258"
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
        this.fetchBoards()
    } 
}
</script>
<style scoped>
    .productCellImage {
    height: 200px;
    width: 232px;
    margin-right: auto;
    margin-left: auto;
    background-color: var(--color-light);
    object-fit: cover;
}

.productGridCellWithBorder {
    border: 2px solid var(--color-light);
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
    width: 99%;
    height: 96%;
    display: flex;
    justify-content: left;
    align-items: start;
    margin: auto;
    padding: 30px;
}

.allBoards {
    width: 100vw;
    height: 100vh;
    background-color: white;
}
</style>