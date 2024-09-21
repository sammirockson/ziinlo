<template>
    <div class="boardNavItems">
    <div class="leftContentView">
       <label class="boardNameLabel">{{ boardName }}</label>
       <div class="taskNotificationContainer">
            <button @click="handleCreateBoard()">       
            <span class="material-symbols-outlined">add</span>
            New Board</button>
       </div>      
       <v-overlay  v-model="isCreateBoard" class="align-center justify-center" contained>
           <CreateNewBoardView @closeOverlay="handleCloseOverlay"/>
        </v-overlay>
    </div>
    <div class="right-container">
        <div class="search-container">
        <img src="../assets/search.png" alt="">
        <input type="text" v-model="searchText" placeholder="Search board" @input="handleSearch">
    </div>
    <!-- <div class="filter-container">
        <img src="../assets/filter.svg" alt="">
        <label for="">Filter</label>
        <img src="../assets/arrow-down.png" alt="">
    </div> -->
    <div class="membersContainer">
         <div class="profile-cell" v-for="(member, index) in members" :key="index">
            <span class="profileIcon" v-if="member != null"> <img :src="member.picture.length > 0 ? member.picture : require('@/assets/orange_default.png')"></span>
         </div>
        <label v-if="remainingCount > 0">+{{ remainingCount }}</label>
    </div>
    <div class="inviteContentView" @click="handleShowMembers">
        <img src="@/assets/membersDark.png" class="memberIcon">
        <label for="">Members</label>
    </div>
    <div class="themeToggler" @click="handleThemeToggle">
        <span class="material-symbols-sharp active" id="lightMode">light_mode</span>
        <span class="material-symbols-sharp" id="darmMode">dark_mode</span>
    </div>
    <img src="@/assets/notification-white.svg" class="notificationIcon">
    </div>
    <v-overlay v-model="isMemberVisible" class="align-top justify-end overLayContainer"  contained>
        <MemberOverlayView class="membersOverlayContainer" :boardId="boardId"></MemberOverlayView>
    </v-overlay>
   </div>
</template>
<script>
import { ref } from 'vue'
import APIService from '@/APIService';
import MemberOverlayView from './MemberOverlayView.vue';
import CreateNewBoardView from './CreateNewBoardView.vue'
export default {
    props: {
        boardName: {
            type: String, 
            default: ''
        }
    },
    components: {
        MemberOverlayView, CreateNewBoardView
    },
    setup() {
        var isMemberVisible = ref(false)
        var members = ref([])
        var isCreateBoard = ref(false)
        var searchText = ref('')
        var remainingCount = ref(0)
        return { isMemberVisible, members, isCreateBoard, searchText, remainingCount }
    }, 
    async mounted() {
        this.fetchMembers()
    },
    methods: {
        handleSearch() {
            this.$emit('handleSearchBoard', this.searchText)
        },
        handleCloseOverlay() {
            console.log("is overlay closed")
            this.isCreateBoard = false 
        },
        handleCreateBoard() {
            // create a new board
            this.isCreateBoard = true 
        }, 
        handleThemeToggle() {
         this.handleToggle(true)
        }, 
        handleToggle(isInvertable) {
            document.body.classList.toggle("dark-theme-variables")
            let lightMode = document.getElementById("lightMode")
            let darkMode = document.getElementById("darmMode")

            if (this.isDarkMode) {
                lightMode.classList.add("active")
                darkMode.classList.remove("active")
            } else {
                lightMode.classList.remove("active")
                darkMode.classList.add("active")
            }
            if (isInvertable === true) {
                this.isDarkMode = !this.isDarkMode
                let cacheValue = this.isDarkMode ? "1" : "0"
                localStorage.setItem("isDarkMode", cacheValue)
            }
        },
        async fetchMembers() {
        let routeParams = this.$route.params
        let params = {
            boardId: routeParams.boardId
         }
         console.log('fetchMembers params: ', params)
         let allMembers = await APIService.getBoardMembers(params)
         if (allMembers != null) {
            this.remainingCount = allMembers.length - 5
            this.members = allMembers.slice(0, 5);
           console.log("allMembers: ", allMembers)
         }
        },
        handleShowMembers() {
            this.isMemberVisible = true    
        }
    }
    // Invitation link will be baseURL + invitation + b + inviter
    // https://trello.com/invite/b/5a168f578b36137f5cc81d7d/ATTI4c914267f82abd2db86a9a3da1405d3f5C34B7BA/ford-dst-tech-tasks
    // https://wwww.zinlo.com/invitation/b/1722579902069/i/66a6f66276e1d70286f59bec
}
</script>
<style scoped>
.profileImage {    
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 15px;
}
.themeToggler span.active {
    background-color: var(--color-light-variant);
    color: white;
    border-radius: var(--border-radius-1);
}

.themeToggler span {
    height: 100%;
    width: 50%;
    padding-top: 4px;
}

.themeToggler {
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    width: 100px;
    height: 34px;
    border-radius: var(--border-radius-1);
    background-color: var(--color-light-variant);
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
.taskNotificationContainer button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    padding-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: 500;
}
.notificationIcon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    margin-top: auto;
    margin-bottom: auto;
    object-fit: contain;
    margin-right: 10px;
}
.searchContainer {
    width: calc(100% - 340px);
    height: 50px;
    padding-right: 400px;
    padding-left: 20px;

}
.taskNotificationContainer {
    width: 140px;
    height: 40px;
    display: flex;
    flex-direction: row;
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-1);
    margin-top: auto;
    margin-bottom: auto;
}

.search-container input {
    font-weight: 400;
    font-size: 14px;
    width: 90%;
    color: var(--color-dark-blue);
}
.search-container:focus, input:focus{
    outline: none;
}
.filter-container, .search-container {
    display: flex;
    align-items: center;
    height: 34px;
    border-radius: var(--border-radius-1);
    background-color: white;
    gap: 8px;
    padding-right: 8px;
    padding-left: 8px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 20px;
}
.search-container {
    width: 280px;
    background-color: white;
}
.filter-container img, .search-container img {
    object-fit: contain;
    height: 20px;
    width: 20px;
}
.filter-container {
    justify-content: center;
    width: 110px;
}
.defaultImage label {
    color: white;
    font-weight: 500;
    font-size: 12px;
}
.defaultImage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    border-radius: 15px;
    background-color: brown;
    color: white;
    margin-left: -12px;
}
.profileIcon img {
  border-radius: 50%;
  position: relative;
  margin-left: -12px;
  height: 28px;
  width: 28px;
  padding: 1px;
  background-color: white;
  margin-top: 4px;
}
.membersContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100px;
    float: right;
    padding-right: 10px;
    direction: ltr;  /* This is to get the stack with left on top */
    padding-left: 20px;
}

.membersContainer label {
    display: block;
    font-weight: 500;
    font-size: 13px;
    margin-left: 4px;
    color: white;
}
.boardNameLabel {
    display: flex;
    align-items: center;
    color: white;
    height: 40px;
    font-weight: 600;
    font-size: 20px;
    text-align: left;
    margin-left: 10px;
    margin-right: 20px;
}
.membersOverlayContainer {
    display: flex;
    flex-direction: column;
    height: 700px;
    width: 400px;
    background-color: white;
    border-radius: var(--border-radius-1);
    margin-top: 110px;
    margin-right: 8px;
}
.memberIcon {
    width: 20px;
    height: 20px;
}
.inviteContentView label {
    font-weight: 500;
    font-size: 14px;
    color: var(--color-dark-blue);
}
.inviteContentView {
    display: flex;
    border-radius: 4px;
    height: 34px;
    width: 120px;
    background-color: var(--color-card-background);
    justify-content: center;
    align-items: center;
    gap: 8px;
    row-gap: 8px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 20px;
}
.right-container {
    display: flex;
    width: 650px;
}
.leftContentView {
    display: flex;
    align-items: center;
    width: calc(100% - 850px);
}
.boardNavItems {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    padding-right: 15px;
    padding-left: 15px;
}
    
</style>