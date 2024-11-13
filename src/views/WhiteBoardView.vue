<template>
<div class="white-board-view">
    <div class="top-nav">
      <img src="../assets/menu_icon.png" class="menu-icon" @click="handleMenuTapped">
      <label>White Board</label>
    </div>
    <DrawComponent class="drawable-container"/>
    <v-layout>
        <v-navigation-drawer v-model="isMenuVisible" :width="isMenuVisible ? '100%' : '0'" class="pr-0 ma-0" border="0" temporary>
            <SideBarView selectedMenuId="whiteboard"/>
        </v-navigation-drawer> 
    </v-layout>
</div>
</template>

<script>
import DrawComponent from '@/views/DrawingBoardView.vue'
import SideBarView from '@/components/SideBarView.vue';
export default {
    name: 'whiteboard',
    components: {
        DrawComponent, SideBarView
    }, 
    data() {
    return {
        isMenuVisible: false,
    }
  }, 
  methods: {
    handleMenuTapped() {
        this.isMenuVisible = true 
    }
  }
}
</script>

<style lang="scss" scoped>
.white-board-view {
    height: 100vh;
    width: 100vw;
    background-color: white;
}
.drawable-container {
    height: calc(100vh - 60px);
    width: 100vw;
    background-color: white;
}
.top-nav {
  display: flex;
  height: 60px;
  align-items: center;
  background-color: white;
  padding-left: 20px;
  gap: 15px;
  .menu-icon {
    width: 32px;
    height: 32px;
  }
  label {
    font-weight: 600;
    font-size: 20px;
  }
}

</style>