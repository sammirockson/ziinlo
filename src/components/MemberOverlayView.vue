<template>
    <div class="memberOverlay">
        <input type="text">
        <v-text-field type="email" prepend-inner-icon="mdi-magnify" class="searchField" rounded="lg" v-model="searchText" variant="outlined" label="Search members"></v-text-field>
        <label class="memberTitleLabel">Members</label>
        <div class="separatorLineView"/>
        <div class="membersList">
           <div class="memberCell" v-for="(member, index) in searchResults" :key="index">
                <div class="member-row">
                <img v-if="member.picture.length > 0" :src="member.picture" class="defaultImage">
                <div v-else class="defaultImage">
                    <label for="">{{ member.fullName.substring(0,1) }}</label>
                </div>
                <div class="nameAndRoleView">
                    <label class="fullNameLabel">{{ member.fullName }}</label>
                </div>
              </div> 
             <button class="adminBtn">
                 Member 
                <img src="@/assets/arrow-down.png">
             </button>
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
        var searchResults = ref([])
        var searchText = ref("")
        return {
            members, searchText, searchResults
        }
    }, 
    watch: {
        searchText() {
            this.searchResults = this.members.filter(object => object.fullName.includes(this.searchText))
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
          this.searchResults = allMembers
        }
    }, 
    mounted() {
        APIService.init()
        this.fetchMembers()
    }
}
</script>
<style scoped>
.memberTitleLabel {
    margin-top: 40px;
    display: flex;
    margin-left: 30px;
    font-weight: 500;
    font-size: 14px;
}
.searchField {
  width: 340px;
  max-height: 44px;
  font-weight: 500;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 0px solid var(--color-light-primary) !important;
  border-color: var(--color-light-primary);
}
.role {
    font-weight: 400;
    font-size: 12px;
}
.nameAndRoleView {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
}
.fullNameLabel {
    font-weight: 500;
    font-size: 14px;
}
.adminBtn {
    display: flex;
    background-color: var(--color-dark-theme);
    border-radius: var(--border-radius-1);
    color: white;
    height: 30px;
    width: 90px;
    font-weight: 600px;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-weight: 500;
}

.adminBtn img {
    width: 16px;
    height: 16px;
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
    margin-top: 10px;
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