<template>
    <div class="board">
       <!-- <SideBarView class="sideBar" @handleMenuTapped="handleChangeContainer" :cachedMenuKey="this.containerType" :isExpanded="this.isExpanded" :style="{width: isExpanded ? '250px' : '90px'}"/> -->
       <BoardContentView v-if="containerType == 'board'" class="fullBoardContainer" :isExpanded="this.isExpanded"/>
       <ChatView v-else-if="containerType == 'chat'" class="productContainer" :isExpanded="this.isExpanded"/>
       <CalendarView v-else="containerType == 'calendar'" class="addCategoryContainer" :isExpanded="this.isExpanded"/>
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import SideBarView from '@/components/SideBarView.vue'
import BoardContentView from '@/components/BoardContentView.vue'
import ChatView from '@/views/ChatView.vue'
import CalendarView from '@/views/CalendarView.vue'

import { PICKMORE_MERCHANT_KEY, SIDE_BAR_MENU_ITEM_KEY } from '@/config'
import { ref } from 'vue'

export default {
    props: ["isExpanded"],
    components: {
        SideBarView, BoardContentView, ChatView, CalendarView, NavBar
    }, 
    methods: {
        handleChangeContainer(menuId) {
         this.containerType = menuId
       }, 
        handleBoardTypeTapped(item) {
            this.selectedTaskBoardType = item
        }
    },
    setup() {
        var isSideBarExpanded = ref(false)
        var selectedTaskBoardType = ref("All Team")
        const containerType = ref('board')
        var boards = ref(["All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team", "All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team", "All Team", "Accounting Team", "Finance Team", "Creative Team",  "Legal Team", "Management Team"])
        return { isSideBarExpanded, boards, selectedTaskBoardType, containerType}
    },
    watch: { 
        isExpanded: function(newVal, oldVal) {
            this.isSideBarExpanded = newVal
        }
    }, 
    mounted() {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
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
.boardViews {
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
   
}

.boardContentView {
    width: 99%;
    height: 96%;
    display: flex;
    /* flex-direction: column; */
    justify-content: left;
    align-items: start;
    background-color: white;
    margin: auto;
    margin-top: 10px;
    border-radius: var(--border-radius-1);
    padding: 30px;
}

.fullBoardContainer {
    background-color: var(--color-background);
    background: url("https://res.cloudinary.com/doorhob/image/upload/v1729072509/nctzphhcookd0dvplxal.jpg");
    background-position: center center;
    /* background-repeat: no-repeat; */
    object-fit: cover;
}


.fullBoardContainer, .overviewContainer, .productContainer, .settingsContainer, .addCategoryContainer {
  height: 100%;
  /* width: calc(100vw - 250px); */
  width: 100vw;
}

.board {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
}
    
</style>