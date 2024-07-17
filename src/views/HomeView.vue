<template>
  <div class="home">
    <SideBarView class="sideBar" @handleMenuTapped="handleChangeContainer" :cachedMenuKey="this.containerType" :style="{width: isExpanded ? '250px' : '80px'}"/>
    <HomeContentView v-if="containerType == 'home'" class="overviewContainer"/>
    <BoardView v-else-if="containerType == 'board'" class="posContainer" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    <ChatView v-else-if="containerType == 'chat'" class="productContainer"/>
    <CalendarView v-else-if="containerType == 'calendar'" class="addCategoryContainer"/>
    <div v-else class="settingsContainer"/>
  </div>
</template>

<script>

import { ref } from 'vue'
import SideBarView from '@/components/SideBarView.vue'
import BoardView from '@/views/BoardView.vue'
import HomeContentView from '@/views/HomeContentView.vue'
import ChatView from '@/views/ChatView.vue'
import CalendarView from '@/views/CalendarView.vue'
import { PICKMORE_MERCHANT_KEY, SIDE_BAR_MENU_ITEM_KEY } from '@/config'

export default {
  name: 'home',
  components: {
    SideBarView, BoardView, HomeContentView, ChatView, CalendarView
  },
  setup() {
    const containerType = ref('home')
    var merchant = ref(Object)
    var isExpanded = ref(true)
    return { containerType, merchant, isExpanded }
  }, 
  methods: {
    // checkAuthentication() {
    //   let jsonString = localStorage.getItem(PICKMORE_MERCHANT_KEY)
    //    if (jsonString == null) {
    //      this.$router.push({path: "/auth"})
    //    } else {
    //     this.merchant = JSON.parse(jsonString)
    //    }
    // }, 
    handleChangeContainer(menuId) {
      console.log("menuId: ", menuId)
      this.containerType = menuId
      // this.isExpanded = menuId != "board" 
    //     .sideBar {
    //   width: 80px;
    // }
    // .posContainer, .overviewContainer, .productContainer, .settingsContainer, .addCategoryContainer {
    //   width: calc(100vw - 80px);
    //   /* width: calc(100vw - 10px); */
    // }
    }
  }, 
  mounted() {
    // this.checkAuthentication()
    var cachedKey = localStorage.getItem(SIDE_BAR_MENU_ITEM_KEY)
    if (cachedKey != null) {
      console.log("arrived at home: ", cachedKey)
      this.containerType = cachedKey
    }
  }
}
</script>

<style scoped>
.posContainer, .overviewContainer, .productContainer, .settingsContainer, .addCategoryContainer {
  height: 100%;
  width: calc(100vw - 250px);
}

.sideBar {
  display: block;
  width: 250px;
  height: 100vh;
  background-color: white;
  box-shadow: var(--box-shadow);
}

.home {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
}


</style>
