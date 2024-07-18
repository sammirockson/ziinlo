<template>
     <div class="allBoards">
            <div class="boardContentView">
                <v-row style="overflow: hidden;">
             <v-col v-for="board in boards" :key="board" cols="auto"> 
               <div class="productGridCellWithBorder"  @click="handleBoardTapped(board)">
                  <img src="@/assets/board_placeholder.png" class="productCellImage">
                  <label class="productNameLabel">{{ board }}</label>
               </div>
              </v-col>
            </v-row>
           </div>
        </div>
</template>
<script>
import { ref } from 'vue'
export default {
    components: {
        
    }, 
    methods: {
        handleBoardTapped(board) {
            console.log("board: ", board)
            let path = "/board/" + board // this.currentUser._id + "/product/" + product._id
            this.$router.push({path: path})
        },
        handleBoardTypeTapped(item) {
            this.selectedTaskBoardType = item
        }
    },
    setup() {
        var isSideBarExpanded = ref(false)
        var selectedTaskBoardType = ref("All Team")
        var boards = ref(["All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team", "All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team", "All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team"])
        return { isSideBarExpanded, boards, selectedTaskBoardType}
    },
    watch: { 
        // isExpanded: function(newVal, oldVal) {
        //     console.log('Prop changed isSideBarExpanwded: ', newVal)
        //     this.isSideBarExpanded = newVal
        // }
    }, 
    mounted() {

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