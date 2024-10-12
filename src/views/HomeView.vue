<template>
  <LandingPageView v-if="currentUser == null"/>
  <div class="home" v-else>
    <SideBarView class="sideBar" @handleMenuTapped="handleChangeContainer" :cachedMenuKey="this.containerType" :isExpanded="this.isExpanded" :style="{width: isExpanded ? '250px' : '90px'}" @click="handleSideBarTapped"/>
    <!-- <HomeContentView v-if="containerType == 'home'" class="overviewContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/> -->
    <BoardView v-if="containerType == 'board'" class="posContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    <ChatView v-else-if="containerType == 'chat'" class="productContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    <CalendarView v-else="containerType == 'calendar'" class="addCategoryContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    <!-- <div v-else class="settingsContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/> -->
  </div>
</template>

<script>

import { ref } from 'vue'
import SideBarView from '@/components/SideBarView.vue'
import BoardView from '@/views/BoardView.vue'
import HomeContentView from '@/views/HomeContentView.vue'
import ChatView from '@/views/ChatView.vue'
import CalendarView from '@/views/CalendarView.vue'
import LandingPageView from '@/views/LandingPageView.vue'

import { PICKMORE_MERCHANT_KEY, SIDE_BAR_MENU_ITEM_KEY, USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'

export default {
  inject: ["cryptojs"],
  name: 'home',
  components: {
    SideBarView, BoardView, HomeContentView, ChatView, CalendarView, LandingPageView
  },
  setup() {
    const containerType = ref('home')
    var merchant = ref(Object)
    var isExpanded = ref(false)
    var currentUser = ref(null)
    return { containerType, merchant, isExpanded, currentUser }
  }, 
  methods: {
    handleSideBarTapped() {
      this.isExpanded = false // !this.isExpanded
    },
    // checkAuthentication() {
    //   let jsonString = localStorage.getItem(PICKMORE_MERCHANT_KEY)
    //    if (jsonString == null) {
    //      this.$router.push({path: "/auth"})
    //    } else {
    //     this.merchant = JSON.parse(jsonString)
    //    }
    // }, 
    handleChangeContainer(menuId) {
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
    var cachedKey = localStorage.getItem(SIDE_BAR_MENU_ITEM_KEY)
    if (cachedKey != null) {
      this.containerType = cachedKey
    }
    var userCacheString = localStorage.getItem(USER_CACHE_KEY)
    this.currentUser = userCacheString
    if (userCacheString != null) {
      this.$router.push({path: "/boards"})
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
