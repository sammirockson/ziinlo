<template>
    <div class="card" @click.self="handleOverlayClosed">
        <div class="cardInfoContainer">
             <div class="contentContainer">
                <textarea type="text" v-on:blur="handleContentInfoTapped()"  @input="autoGrow()" class="cardNameField" id="cardNameId" v-model="card.cardName"></textarea>
                <div class="profileTagInfoContainer">
                <img src="@/assets/cardPhoto.png" class="ownerProfile">
                <div class="profileInfoContainer">
                    <label class="onwerNameLabel">Samuel</label>
                    <label class="ownerRoleLabel">Admin</label>
                </div>
                <img src="@/assets/cardPhoto.png" class="assignedProfile">
                <div class="assignInfoContainer">
                    <label class="onwerNameLabel">Ricky Bob</label>
                    <label class="ownerRoleLabel">Assignee</label>
                </div>
                </div>
                <div class="tagItemsView"> 
                    <v-chip-group selected-class="text-primary" column>
                   <v-chip v-for="tag in cardTags" :key="tag" style="border-radius: 8px; disable">
                     <label class="tagLabel" :style="{'background-color': tag.colorHex}">{{ tag.name }}</label>
                   </v-chip>
                  </v-chip-group>
                </div>
                <div class="profileTagInfoContainer">
                    <label class="listTagContainer">{{ list.listName }}</label>
                    <ButtonCard v-if="card.dueDate != null" imageIcon="calendar.png" :title="formatDate(card)" class="dueDateField"/>
                    <ButtonCard imageIcon="eyeViews.png" title="Tracking" class="dueDateField" isTracked="true"/>
                </div>
                <!-- <DescriptionViewFrom class="descriptionContainer"/> -->
                <TextEditorView class="descriptionContainer"/>
                <!-- <Editor v-model="value" editorStyle="height: 320px" /> -->

             </div>

             <div class="controlsContainer">
             <label class="memberTitleLabel">Members</label>
             <div class="membersContainer">
                <div class="memberCell" v-for="(index, member) in members" :key="member">
                   <img :src="require(index == 8 ? `@/assets/add.svg` : `@/assets/cardPhoto.png`)" class="memberPhoto">
                   <label class="memberNameLabel" v-if="index != 8">Name</label>
                   <label class="memberNameLabel" v-else>Join</label>
                </div>
             </div>
             <label class="seeMoreMembersLabel">See more</label>


             <label class="memberLabel">Action</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Assign"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Move"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Track"/>

             <label class="memberLabel">Manage</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Tags" @click="handleTagTapped"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Due Date" @click="handleDateTapped"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Poll"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Checklist"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Attachments" @click="handleAttachmentTapped"/>
             <label class="memberLabel">Connect</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Share"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Copy URL"/>
             <label class="memberLabel">Archive</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Delete"/>
             </div>
        </div>
        <v-overlay v-model="isTagTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" activator="tagBtn" contained>
            <TagContainerView @handleSaveTag="handleSaveTag" @refreshTags="refreshTags" @handleTagChanged="handleTagChanged" :boardTags="this.boardTags" class="tagContainerView"/>
        </v-overlay>
        <v-overlay v-model="isDateTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" activator="tagBtn" contained>
          <div class="dueDateMainView">
           <div class="dateContainerView">
               <v-container>
                 <v-row justify="space-around">
                   <v-date-picker show-adjacent-months v-model="selectedDate"></v-date-picker>
                 </v-row>
                </v-container>
            </div>
            <div class="timePickerContainer">   
        <v-row justify="space-around">
      <v-time-picker
        v-model="time"
        format="12hr"
        scrollable
      ></v-time-picker>
    </v-row>
            </div>
            <button :class="selectedDate == null ? `dateBtnDisabled` : `saveDateBtn`" :disabled="selectedDate == null" @click="handleSaveDate">Save Date</button>
        </div>
        </v-overlay>
        <v-overlay v-model="isAttachmentTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" contained>
            <AttachmentView :card="this.selectedCard._id" class="attachmentContainerView"/>
        </v-overlay>
    </div>
</template>
<script>
import { ref } from 'vue'
import ButtonCard from '@/components/ButtonCard.vue'
import DescriptionViewFrom from '@/components/DescriptionViewForm.vue'
import TagContainerView from '@/components/TagContainerView.vue';
import TextEditorView from '@/components/TextEditorView.vue'
import AttachmentView from '@/components/AttachmentView.vue';

import axios from 'axios';
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import CryptoJS from 'crypto-js'
import Editor from 'primevue/editor'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default {
    inject: ["cryptojs"],
    components: {
        ButtonCard, DescriptionViewFrom, TagContainerView, TextEditorView, Editor, AttachmentView, VTimePicker
    },
    props: { card: Object, list: Object, tags: [] },
    setup() {
        var members = ref([1, 2, 3, 4, 5, 6, 7, 8])
        var isTracked = ref(true)
        var cardo = ref(null)
        var cardDesc = ref("Test description")
        var selectedCard = ref(null)
        var selectedList = ref(null)
        var currentUser = ref(null)
        var isTagTapped = ref(false)
        var boardTags = ref([])
        var cardTags = ref([])
        var isDateTapped = ref(false)
        var isAttachmentTapped = ref(false)
        var selectedDate = ref(null)
        var value = ref(null)
        var time = ref("11:15")
        var timeStep = ref("10:10")
        return { 
             members, isTracked, cardo, cardDesc, selectedCard, selectedList, isAttachmentTapped,
             currentUser, isTagTapped, boardTags, cardTags, isDateTapped, selectedDate, value, time, timeStep
            }
    }, 
    methods: {
        allowedHours: v => v % 2,
        allowedMinutes: v => v >= 10 && v <= 50,
        allowedStep: m => m % 10 === 0,
        handleAttachmentTapped() {
            this.isAttachmentTapped = true 
        },
        formatDate(card) {
            let date =  new Date(card.dueDate).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric'
            })
            return date
        },
        async handleSaveDate() {
            let timeArray = this.time.split(':')
            this.selectedDate.setHours(timeArray[0])
            this.selectedDate.setMinutes(timeArray[1])
            let dueDateMilliSec = this.selectedDate.getTime()
            var params = {
                card_id: this.selectedCard._id, 
                dueDate: dueDateMilliSec
        }
        var fullURL = BASE_URL + "board/addDueDateToCard"
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            if (data.statusCode == 200) {
                this.selectedCard.dueDate = dueDateMilliSec
                this.selectedDate = null
                this.isDateTapped = false 
                console.log("list and card info updated: ", data.resp)
              }
             }
          })
        },
        handleDateTapped() {
            this.isDateTapped = true 
        },
        refreshTags() {
            this.fetchTags()
        },
       async handleTagChanged(tag) {
            if (tag.isChecked) {
                this.cardTags.push(tag)
            } else {
                this.cardTags = this.cardTags.filter(item => item.id != tag.id);
            }
          var tags = []
          for (var index in this.cardTags) {
             let cardTag = this.cardTags[index]
             tags.push(cardTag.id)
           }
          var params = {
            card_id: this.selectedCard._id, 
            tags: tags
          }
          var fullURL = BASE_URL + "board/addTagsToCard"
          await axios.post(fullURL, params).then((response) => {
            if (response.data != null) {
             let data = response.data
             console.log("tags updated: ", data)
            }
          })
        },
        isTagChecked(tag) {
            let tagFiler = this.cardTags.filter(item => item.id == tag.id)
            return tagFiler.length > 0
        },
        async fetchTags() {
          var params = {
            boardId: this.selectedList.boardId
          }
          var fullURL = BASE_URL + "board/getTags"
          await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("fetch tag resps: ", data)
             if (data.resp != null) {
                var tags = []
                for (var index in data.resp) {
                    let item = data.resp[index]
                    tags.push({isChecked: this.isTagChecked(item), name: item.name, colorHex: item.colorHex, id: item.id, _id: item._id})
                }
                this.boardTags = tags
             }
            }
          })
        },
       async handleSaveTag(tag) {
        console.log("prepare to save tag")
        var params = {
            boardId: this.selectedList.boardId, 
            cardId: this.selectedCard.id,
            name: tag.name, 
            colorHex: tag.color, 
            id: Date.now()
         }
         var fullURL = BASE_URL + "board/createTag"
         await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("tag resp data: ", data)
            }
          })
        },
        handleTagTapped() {
            console.log("Tags tapped")
            this.isTagTapped = true 
        },
        expandAll() {
            console.log("finally updated...")
        },
        async handleContentInfoTapped() {
          console.log("selectedCard: ", this.selectedCard)
          var params = {
            card_id: this.selectedCard._id, 
            cardName: this.selectedCard.cardName, 
            cardDesc: this.cardDesc
         }
         var fullURL = BASE_URL + "board/updateCard"
         await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("card detail resp data: ", data)
            }
          })
        },
        autoGrow() {
            let element = document.getElementById("cardNameId")
            if (element != null) {
                element.style.height = "15px";
                element.style.height = (element.scrollHeight) + "px";
            }
        },
        handleOverlayClosed() {
           console.log("close overlay tapped")
           this.$emit('overlayDismissed')
        }, 
        getUserInfo() {
            let userCacheString = localStorage.getItem(USER_CACHE_KEY)
            if (userCacheString == null) {
                this.$router.push({path: "/login"})
            } else {
                let userCache = JSON.parse(userCacheString)
                let decryptionToken = userCache.token
                let encryptedUserData = userCache.user
                let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
                let cacheInfoObject = JSON.parse(decryptedData)
                this.currentUser = cacheInfoObject.user
               console.log("currentUser: ", this.currentUser)
            }
         
        }
    }, 
    watch: { 
        card(newVal, oldVal) { 
           this.selectedCard = newVal
           this.getUserInfo()
        }, 
        list(newVal, oldVal) { 
           this.selectedList = newVal
        }, 
        tags(newVal, oldVal) { 
           console.log('tags popover prop changed: ', newVal, ' | was: ', oldVal)
           var tags = []
            for (var index in newVal) {
                let item = newVal[index]
                tags.push({isChecked: false, name: item.name, colorHex: item.colorHex, id: item.id, _id: item._id})
            }
           this.cardTags = tags
           this.fetchTags()
           let curentDate = new Date()
           let hour = curentDate.getHours()
           let minute = curentDate.getMinutes()
           this.time = hour.toString() + ":" + minute.toString()
        }, 
        selectedDate(newVal, oldVal) {
            console.log('date changed: ', newVal, ' | was: ', oldVal)
        }
    },
    destroyed() {
        this.boardTags = []
    },
    mounted() {
        console.log("mounting cardDetail...")
        this.autoGrow()
    }, 
    updated() {
        this.autoGrow()
    }
}
</script>
<style scoped>
.v-time-picker {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-top: -70px;
    margin-left: 30px;
}
.timePickerContainer {
    height: 280px;
    width: 300px;
    display: flex;
    flex-direction: column;
}
.attachmentContainerView {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    width: 300px;
    height: 550px;
    border-radius: var(--border-radius-2);
}
.saveDateBtn, .dateBtnDisabled { 
  margin-top: 10px;
  margin-bottom: 10px;
  width: 260px;
  height: 44px;
  margin-right: auto;
  margin-left: auto;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background-color: var(--color-primary);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
}
.dateBtnDisabled {
    background-color: var(--color-light);
    color: var(--color-dark-variant);
}

.dueDateMainView {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    /* height: 550px; */
    height: 970px;
    border-radius: var(--border-radius-2);
}



.tagCell {
    background-color: #8B81F7;
    height: 100%;
    width: 100%;
}
.tagItemsView {
    width: 480px;
}
.tagLabel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    padding: 0;
    height: 40px;
    margin-right: -12px;
    margin-left: -12px;
    padding-right: 12px;
    padding-left: 12px;
    border-radius: var(--border-radius-1);
    color: white;
    font-weight: 600;
    background-color: #8B81F7;
}
.tagContainerView {
    z-index: 9999999;
    width: 300px;
    height: 600px;
    margin-right: auto;
    margin-left: auto;
    /* margin-right: calc((100vw / 4)); */
    background-color: white;
    border-radius: var(--border-radius-1);
}
.descriptionContainer {
    border: 1px solid var(--color-light);
    border-radius: var(--border-radius-1);
    margin-right: 500px;
}
.listTagContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    width: 140px;
    padding-right: 10px;
    padding-left: 10px;
    color: var(--color-dark);
    font-weight: 600;
    background-color: var(--color-background);
    border-radius: var(--border-radius-1);
    text-transform: uppercase;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: clip;
}
.dueDateField {
    width: 165px;
    margin-left: 10px;
}
.ownerRoleLabel {
    display: flex;
    font-weight: 700;
    font-size: 10px;
    overflow: hidden;
    text-align: center;
    color: var(--color-dark);
}
.onwerNameLabel {
    display: flex;
    font-weight: 700;
    font-size: 13px;
    overflow: hidden;
    text-align: center;
}
.ownerProfile, .assignedProfile {
    width: 32px;
    height: 32px;
    object-fit: fill;
    overflow: hidden;
    border-radius: var(--border-radius-1);
}

.assignedProfile {
    margin-left: 20px;
}
.profileInfoContainer, .assignInfoContainer {
    display: flex;
    flex-direction: column;
    height: 40px;
    margin-left: 5px;
}

.profileTagInfoContainer {
    display: flex;
    width: 100%;
    height: 50px;
    margin-top: 5px;
}
.cardNameField {
    display: flex;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    resize: none;
    color: var(--color-dark);
    margin-bottom: 8px;
}

.memberCell {
    display: flex;
    flex-direction: column;
}
.memberNameLabel {
    display: flex;
    font-weight: 500;
    font-size: 10px;
    overflow: hidden;
    text-align: center;
    width: 100%;
    margin-left: 1px;
}
.memberPhoto {
    width: 30px;
    height: 30px;
    border-radius: var(--border-radius-1);
    object-fit: fill;
    overflow: hidden;
}
.memberTitleLabel {
    display: flex;
    margin: 10px;
    margin-top: 24px;
    font-weight: 600;
    font-size: 14px;
}

.seeMoreMembersLabel {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    margin-top: 8px;
}

.memberLabel {
    display: flex;
    margin: 10px;
    margin-top: 20px;
    font-weight: 600;
    font-size: 14px;
}
.contentContainer {
    display: flex;
    flex-direction: column;
    width: 550px;
    min-height: 94vh;
    border-top-left-radius: var(--border-radius-2);
    border-bottom-left-radius: var(--border-radius-2);
    padding-left: 20px;
    padding-right: 15px;
}
.controlsContainer {
    display: flex;
    flex-direction: column;
    width: 190px;
    min-height: 94vh;
    border-top-right-radius: var(--border-radius-2);
    border-bottom-right-radius: var(--border-radius-2);
    /* background-color: aliceblue; */
}
.membersContainer {
    display: grid;
    grid-template-columns: repeat(4, 40px);
    grid-template-rows: repeat(4, 56px);
    width: 160px;
    height: 100px;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    margin-top: 4px;
}

.cardInfoContainer {
    display: flex;
    width: 740px;
    min-height: 94vh;
    margin-right: auto;
    margin-left: auto;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background-color: white;
    z-index: 999999999999;
    border-radius: var(--border-radius-2);
    padding-bottom: 30px;
    /* overflow-y: scroll; */
}
 .card {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow-y: scroll;
 }
</style>