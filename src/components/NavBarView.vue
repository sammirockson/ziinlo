<template>
    <div class="navBar">
       <div class="searchContainer">
        <!-- <v-autocomplete
              :items="searchHistory"
              density="comfortable"
              menu-icon=""
              placeholder="Search..."
              prepend-inner-icon="mdi-magnify"
              :style="{height: '34px'}"
              theme="light"
              variant="solo-filled"
              auto-select-first
              item-props
          ></v-autocomplete> -->
       </div>
       <div class="taskNotificationContainer">
            <button @click="handleCreateBoard">       
            <span class="material-symbols-outlined">add</span>
            New Board</button>
       </div>      
       <img src="@/assets/notification.png" class="notificationIcon">
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["isExpanded"],
    setup() {
        var searchHistory = ref(["Groceries", "Fruits", "Meat", "Meatlo", "Something nice here"])
        var isSideBarExpanded = ref(false)
        return { searchHistory, isSideBarExpanded } 
    }, 
    watch: { 
        isExpanded: function(newVal, oldVal) {
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    }, 
}
</script>
<style scoped>
.taskNotificationContainer button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    padding-left: 15px;
    margin-top: auto;
    margin-bottom: auto;
}
.notificationIcon {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 15px;
}
.searchContainer {
    width: calc(100% - 240px);
    height: 50px;
    padding-right: 400px;
    padding-left: 20px;

}
.taskNotificationContainer {
    width: 150px;
    height: 44px;
    display: flex;
    flex-direction: row;
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-2);
    margin-right: 30px;
}

.searchContainer, .taskNotificationContainer {
    margin-top: auto;
    margin-bottom: auto;
}

.navBar {
  height: 58px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
}
</style>