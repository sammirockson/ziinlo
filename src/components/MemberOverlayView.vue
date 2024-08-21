<template>
    <div class="memberOverlay">
        <input type="text">
        <label for="">Members</label>
        <div class="separatorLineView"/>
        <div class="membersList">
           <div class="memberCell" v-for="(member, index) in members" :key="index">
                <div class="member-row">
                <img v-if="member.picture.length > 0" :src="member.picture" class="defaultImage">
                <div v-else class="defaultImage">
                    <label for="">{{ member.fullName.substring(0,1) }}</label>
                </div>
                <label class="fullNameLabel">{{ member.fullName }}</label>
              </div> 
             <button class="adminBtn">Admin</button>
           </div>
        </div>
    </div>
</template>
<script>
import APIService from '@/APIService';
import { ref } from 'vue'
export default {
    props: {
        boardId: {
            type: String
        }
    },
    setup() {
        var members = ref([])
        return {
            members
        }
    }, 
    methods: {
        async fetchMembers() {
            let params = {
                boardId: this.boardId
            }
          let allMembers = await APIService.getBoardMembers(params)
          console.log("allMembers: ", allMembers, "params: ", params)
          this.members = allMembers
        }
    }, 
    mounted() {
        APIService.init()
        this.fetchMembers()
    }
}
</script>
<style scoped>
.fullNameLabel {
    font-weight: 500;
}
.adminBtn {
    background-color: rgb(181, 87, 56);
    border-radius: 8px;
    color: white;
    height: 30px;
    width: 60px;
    font-weight: 600px;
    font-size: 12px;
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
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background-color: brown;
    color: white;
}
.member-row {
    display: flex;
    align-items: center;
    gap: 8px;
}
.memberCell {
    display: flex;
    padding-left: 15px;
    height: 50px;
    justify-content: space-between;
    align-items: center
}
.membersList {
    margin-top: 20px;
    height: 580px;
    overflow-y: scroll;
    padding-right: 15px;
}
.separatorLineView {
    height: 1px;
    width: 100%;
    margin-top: 50px;
    background-color: var(--color-light);
}
.memberOverlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: red;
}
</style>