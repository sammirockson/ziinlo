<template>
    <div class="boardNavItems">
    <div class="leftContentView">
       <label class="boardNameLabel">{{ boardName }}</label>
    </div>
    <div class="membersContainer">
         <div class="profile-cell" v-for="(member, index) in members" :key="index">
            <span class="profileIcon"> <img :src="member.picture.length > 0 ? member.picture : require('@/assets/orange_default.png')"></span>
         </div>
        <label for="">+99</label>
    </div>
    <div class="inviteContentView" @click="handleShowMembers">
        <img src="@/assets/membersDark.png" class="memberIcon">
        <label for="">Members</label>
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
export default {
    props: {
        boardId: {
            type: String
        }, 
        boardName: {
            type: String, 
            default: ''
        }
    },
    components: {
        MemberOverlayView
    },
    setup() {
        var isMemberVisible = ref(false)
        var members = ref([])
        return { isMemberVisible, members }
    }, 
    async mounted() {
        let params = {
            boardId: this.boardId
        }
        let allMembers = await APIService.getBoardMembers(params)
        this.members = allMembers
    },
    methods: {
        handleShowMembers() {
            this.isMemberVisible = true    
        }
    }
    // Invitation link will be baseURL + invitation + b + inviter
    // https://trello.com/invite/b/5a168f578b36137f5cc81d7d/ATTI4c914267f82abd2db86a9a3da1405d3f5C34B7BA/ford-dst-tech-tasks
    // https://wwww.zinlo.com/invitation/b/1722579902069/i/66a6f66276e1d70286f59bec
    // b = boardId permissionType m for member, a for admin
}
</script>
<style scoped>

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
    width: 140px;
    height: 100%;
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
    width: 200px;
    height: 40px;
    font-weight: 600;
    font-size: 20px;
    text-align: left;
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
    color: var(--color-dark-blue)
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
}
.leftContentView {
    display: flex;
    align-items: center;
    width: 80%;
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