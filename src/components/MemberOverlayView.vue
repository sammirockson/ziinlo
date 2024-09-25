<template>
    <div class="memberOverlay">
        <div class="search-input-container">
             <input type="email" class="invite-email-field" placeholder="Email address">
            <button>Send Invite</button>
        </div>
        <div class="invitation-link-container">
            <img src="../assets/link.png">
            <label>Anyone with the link can join the board <br><span @click="handleCopyURL">Copy link</span></label>
        </div>
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
        handleCopyURL() {
            let url = `https://wwww.ziinlo.io/invitation/b/${this.boardId}/i/66a6f66276e1d70286f59bec`
            this.copyToClipboard(url)
        },
        async fetchMembers() {
            let params = {
                boardId: this.boardId
            }
          let allMembers = await APIService.getBoardMembers(params)
          console.log("allMembers: ", allMembers, "params: ", params)
          this.members = allMembers
          this.searchResults = allMembers
        }, 
     copyToClipboard(text) {
       if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            alert('Copied')
            return document.execCommand("copy"); 
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
      }
    }
}
    }, 
    mounted() {
        APIService.init()
        this.fetchMembers()
    }
}
</script>
<style lang="scss" scoped>
.invitation-link-container {
    display: flex;
    margin-top: 15px;
    gap: 8px;
    align-items: center;
}
.invitation-link-container img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-left: 20px;
}
.invitation-link-container label {
    text-align: left;
    font-size: 13px;
    span {
        color: blue
    }
}
.invite-email-field {
    height: 44px;
    width: 270px;
    border: 1px solid var(--color-light);
    border-radius: var(--border-radius-1);
    padding: 10px;
    font-weight: 500;
    font-size: 14px;
}
.search-input-container {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-right: 20px;
    padding-left: 20px;
}

.memberTitleLabel {
    margin-top: 20px;
    display: flex;
    margin-left: 20px;
    font-weight: 500;
    font-size: 14px;
}
.searchField {
  width: 240px;
  max-height: 34px !important;
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
    text-align: left;
}
.adminBtn, .search-input-container button {
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

.search-input-container button  {
    height: 40px;
    width: 100px;
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
    padding-left: 20px;
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
}
</style>