<template>
  <div class="attendance-view">
    <div class="top-nav">
      <img src="../assets/menu_icon.png" class="menu-icon" @click="handleMenuTapped">
      <label>Employee Time & Attendance</label>
    </div>
    <div class="pages">
      <div class="page-selector-cell" v-for="(page, index) in pageTypes" :key="page" :class="{'is-selected': page.id === activePageId}" @click="handlePageTapped(page)">
        <img src="../assets/calendar.png">
        <label for="">{{ page.title }}</label>
    </div>
    </div>
    <v-layout>
        <v-navigation-drawer v-model="isMenuVisible" :width="isMenuVisible ? '100%' : '0'" class="pr-0 ma-0" border="0" temporary>
            <SideBarView selectedMenuId="attendance"/>
        </v-navigation-drawer> 
      </v-layout>
  </div>
</template>

<script>
import SideBarView from '../components/SideBarView.vue';
export default {
  components: {
    SideBarView
  },
  data() {
    return {
      isMenuVisible: false,
      activePageId: 'timesheet', 
      pageTypes: [
        {title: "Timesheet", id: "timesheet"}, 
        {title: "Request Time-off", id: "request"}, 
        {title: "Time-off policy", id: "policy"}
      ]
    }
  }, 
  methods: {
    handlePageTapped(page) {
      this.activePageId = page.id
    },
    handleMenuTapped() {
        this.isMenuVisible = true 
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  background-color: white;
  box-shadow: var(--box-shadow);
  height: 70px;
  padding-left: 24px;
  display: flex;
  gap: 30px;
  align-items: center;
  .page-selector-cell {
    height: 36px;
    gap: 8px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
    label {
      font-size: 14px;
      font-weight: 500;
    }
    img {
      height: 18px;
      width: 18px;
    }
    &.is-selected {
      border-bottom: 2px solid var(--color-dark-variant);
      border-bottom-right-radius: 1px;
      border-bottom-left-radius: 1px;
    }
  }
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