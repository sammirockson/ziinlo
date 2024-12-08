<template>
    <div class="memberOverlay">
        <div class="search-input-container">
             <input type="email" placeholder="example@mail.com" required v-model="emailAddress" class="invite-email-field">
             <button v-if="isSendingInvite" :class="{'is-active': isValidEmail}" class="buttonload">
                  <i class="fa fa-circle-o-notch fa-spin"></i> Sending... 
              </button>
              <button v-else :disabled="!isValidEmail" :class="{'is-active': isValidEmail}" @click="handleSendInvite">Send Invite</button>
        </div>
        <div class="invitation-link-container">
            <img src="../assets/link.png">
            <label>Anyone with the link can join the board <br><span @click="handleCopyURL">Copy link</span></label>
        </div>
        <div class="email-content" id="emailContent" :style="{backgroundColor: '#848bc82e', padding: '30px'}">
            <div class="header" :style="{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}">
                <img src="https://res.cloudinary.com/doorhob/image/upload/v1731568127/jtymxrrstj6vme9nw1g2.png" :style="{maxWidth: '34px', maxHeight: '34px', objectFit: 'contain', display: 'flex'}">
                <label :style="{height: '34px', display: 'flex', gap: '8px', alignItems: 'center', fontWeight: '700', fontSize: '30px'}">Ziinlo</label>
            </div>
            <div class="invitation-content" >
                <h1 :style="{fontSize: '24px', marginTop: '10px'}">{{ getFullName }} invited you to the {{ boardName }} board.</h1>
                <label :style="{marginTop: '20px'}">Join the <b>{{ boardName }}</b> board to collaborate, manage project and reach new productivity levels.</label>
                 <div class="join-btn-container" :style="{marginTop: '20px', marginBottom: '20px'}">
                    <a :href="getInvitationURL"><button :style="{padding: '10px 20px 10px 20px', backgroundColor: '#1C2634', color: 'white', borderRadius: '8px', fontWeight: '600', borderColor: 'transparent'}">Join Board</button></a>
                 </div>
                 <label><b>What is Ziinlo?</b> It is more than work, its a way of managing projects and teams. Track tasks using Ziinlo cards, talk to your colleagues on Ziinlo chat and track your annual leaves.</label>
            </div>
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
        <v-snackbar
      v-model="isAlertVisible"
      :timeout="snackbarTimeout"
      rounded
      >
      Invitation link has been copied successfully
    </v-snackbar>
    </div>
</template>
<script>
import { USER_CACHE_KEY } from '@/config'
import APIService from '@/APIService';
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { lab } from 'd3';

export default {
    inject: ["cryptojs"],
    props: {
        boardId: {
            type: String
        }, 
        boardName: {
            type: String
        }
    },
    setup() {
        var members = ref([])
        var searchResults = ref([])
        var searchText = ref("")
        var currentUser = ref(null)
        var emailAddress = ref(null)
        var isAlertVisible = ref(false)
        var snackbarTimeout = ref(8000)
        var isSendingInvite = ref(false)
        return {
            members, searchText, searchResults, currentUser, emailAddress, isAlertVisible, snackbarTimeout, isSendingInvite
        }
    }, 
    watch: {
        searchText() {
            this.searchResults = this.members.filter(object => object.fullName.includes(this.searchText))
        }
    },
    computed: {
        getInvitationURL() {
           let currentUserId = _.get(this.currentUser, '_id') 
           let invitationURL = `https://ziinlo.com/invitation/b/${this.boardId}/i/${currentUserId}`
           return invitationURL
        },
        isValidEmail() {
            const email = this.emailAddress
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            return regex.test(email)
        }, 
        getFullName() {
            return _.get(this.currentUser, 'fullName')
        }
    },
    methods: {
        async handleSendInvite() {
            this.isSendingInvite = true
            // let currentUserId = this.currentUser._id
            // let invitationURL = `https://ziinlo.com/invitation/b/${this.boardId}/i/${currentUserId}`
            const emailContent = document.getElementById('emailContent')
            // `You have been invited to join and contribute to ${this.boardName} board. Click this link ${invitationURL} to join the board`
            const params = {
                recipientsEmail: this.emailAddress, 
                boardName: this.boardName, 
                emailContentHtml: emailContent.innerHTML
            }
            console.log('email params: ', params)
            await APIService.sendInvitation(params)
            this.isSendingInvite = false
            setTimeout(() => {
                this.emailAddress = null
             }, 500);
        },
        handleCopyURL() {
            if (this.currentUser !== null) {
                let currentUserId = this.currentUser._id
               let url = `https://ziinlo.com/invitation/b/${this.boardId}/i/${currentUserId}`
               this.copyToClipboard(url)
            }
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
            this.isAlertVisible = true 
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
        let userCacheString = localStorage.getItem(USER_CACHE_KEY)
       if (userCacheString != null && userCacheString.length > 0) {
          let userCache = JSON.parse(userCacheString)
          let decryptionToken = userCache.token
          let encryptedUserData = userCache.user
          let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
          let cacheInfoObject = JSON.parse(decryptedData)
         this.currentUser = cacheInfoObject.user
       }
        APIService.init()
        this.fetchMembers()
    }
}
</script>
<style lang="scss" scoped>
.email-content {
    display: none;
}
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
    background-color: var(--color-light);
    &.is-active {
        background-color: var(--color-dark-theme);
    }
}

.search-input-container button:disabled {
    cursor: not-allowed;
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