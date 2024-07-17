<template>
    <div class="navBar">
       <div class="searchContainer">
        <v-autocomplete
              :items="searchHistory"
              density="comfortable"
              menu-icon=""
              placeholder="Search..."
              prepend-inner-icon="mdi-magnify"
              style="background-color: white; max-height: 48px; border-radius: 16px;"
              theme="light"
              variant="solo-filled"
              auto-select-first
              item-props
          ></v-autocomplete>
       </div>
       <div class="taskNotificationContainer">
            <button>Create Board</button>
            <img src="@/assets/totalCustomers.png" class="profileImage">
       </div>      
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        var searchHistory = ref(["Groceries", "Fruits", "Meat", "Meatlo", "Something nice here"])
        return { searchHistory } 
    }
    
}
</script>
<style scoped>
.taskNotificationContainer button {
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-2);
    height: 50px;
    width: 160px;
    color: white;
}
/* .profileImage {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 5px;
    margin-top: auto;
    margin-bottom: auto;
} */
.searchContainer {
    width: calc(100% - 240px);
    height: 50px;
    padding-right: 400px;
    padding-left: 20px;
}
.taskNotificationContainer {
    width: 240px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 30px;
}

.searchContainer, .taskNotificationContainer {
    margin-top: auto;
    margin-bottom: auto;
}

.navBar {
  height: 60px;
  width: calc(100vw - 270px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15px;
}
</style>