<template>
    <PopupRouterView>
      <PopupOverlay/>
    <v-container v-if="card == null">
    <v-row>
      <v-col cols="12" md="12">
        <v-skeleton-loader
          class="mx-auto border"
          width="300"
          height="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
      <div class="card" v-if="card != null" @click.self="handleGoBack">
        <div class="cardInfoContainer">
             <div class="contentContainer">
                <textarea type="text" v-on:blur="handleContentInfoTapped()"  @input="autoGrow()" class="cardNameField" id="cardNameId" v-model="card.cardName"></textarea>
                <div class="statusContainer">
                    <div class="statusIconTitleView">
                    <img src="@/assets/statusInfo.png" alt="">
                        <label for="">Status</label>
                    </div>
                    <label class="listTagContainer">{{ list.listName }}</label>
                </div>

                <div class="statusContainer">
                    <div class="statusIconTitleView">
                        <img src="@/assets/duedate.png" alt="">
                        <label for="">Due Date</label>
                    </div>
                    <label class="dueDateTitelLabel">{{ formatDate(card) }}</label>
                </div>

                <div class="statusContainer">
                    <div class="statusIconTitleView">
                        <img src="@/assets/assignee.png" alt="">
                        <label for="">Assignee</label>
                    </div>
                    <div class="assigneeContainerView">
                        <v-chip-group selected-class="text-primary" column>
                        <v-chip  v-for="(item, index) in names" :key="index" style="border-radius: 19px;">
                            <AssigneeView :title="item" imageIcon="https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2022/12/shutterstock_781327003-1.jpg" class="asigneeCellView"></AssigneeView>
                       </v-chip>
                      </v-chip-group>
                    </div>
                </div>

                <div class="statusContainer">
                    <div class="statusIconTitleView">
                        <img src="@/assets/tags.png" alt="">
                        <label for="">Tags</label>
                    </div>
                    <div class="tagItemsView"> 
                      <v-chip-group selected-class="text-primary" column>
                      <v-chip v-for="tag in cardTags" :key="tag" style="border-radius: 8px; disable">
                        <label class="tagLabel" :style="{'background-color': tag.colorHex}">{{ tag.name }}</label>
                       </v-chip>
                      </v-chip-group>
                    </div>
                </div>

                <Label class="attachmentsTitleLabel">Description</Label>
                <TextEditorView class="descriptionContainer" :cardDescription="card.description" :isEditingDesc="this.isEditingDesc" @isEditing="handleDescEdit"/>
                <div class="descriptionBtns" v-if="isEditingDesc">
                    <button class="saveDescriptionBtn" @click="handleSaveDescription">Save</button>
                    <button class="canelDescripBtn" @click="handleCancelDescEditing">Cancel</button>
                </div>
                <label class="attachmentsTitleLabel" v-if=" this.attachments.length > 0">Attachments</label>
                <div class="attachmentListView">
                    <div class="attachmentCell" v-for="(attachment, index) in this.attachments" :key="index" @click="handleFileBrowserTapped">
                         <img :src="attachment.fileURL" class="attchmentPreview">
                         <div class="attachmentInfoContainer">
                             <label class="attachmentFileNameLabel">{{ attachment.fileName }}</label>
                             <label class="attachmentDateLabel">{{ this.formatFileSize(attachment) }}MB</label>
                         </div>
                    </div>
                </div>
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
             <ButtonCard imageIcon="eyeViews.png" title="Tracking" class="dueDateField" isTracked="true"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Priority level"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Assign"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Move"/>

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
        <!-- <v-overlay v-model="isShowFileView" class="align-center justify-center overLayContainer" contained>
             <div class="fileViewer">
             </div>
        </v-overlay> -->

        <v-overlay v-model="isTagTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px;" activator="tagBtn" contained>
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
            <AttachmentView :card="this.card._id" class="attachmentContainerView" @fileUploadComplete="handleDidUploadFile"/>
        </v-overlay>

        <v-overlay v-model="isShowFileView" class="align-center justify-center overLayContainer" contained>
            <FileViewer class="fileViewer" :attachments="this.attachments" @dismissFileViewer="dismissFileViewer"/>
        </v-overlay>
    
    </div>
    </PopupRouterView>
  </template>

<script>
import PopupOverlay from './PopupOverlay.vue';
import FileViewer from '@/components/FileViewer.vue'
import PopupRouterView from './PopupRouterView.vue';
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import AssigneeView from '@/components/AssigneeView.vue'
import VueHorizontal from "vue-horizontal";

import ButtonCard from '@/components/ButtonCard.vue'
import DescriptionViewFrom from '@/components/DescriptionViewForm.vue'
import TagContainerView from '@/components/TagContainerView.vue';
import TextEditorView from '@/components/TextEditorView.vue'
import AttachmentView from '@/components/AttachmentView.vue';

import axios from 'axios';
import { ref } from 'vue'

import CryptoJS from 'crypto-js'
import Editor from 'primevue/editor'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VueEditor } from 'vue2-editor'
import { saveDesc } from '@/APIService'
  
export default {
  inject: ["cryptojs"],
  components: {
    PopupOverlay, TextEditorView, Editor, AttachmentView, VTimePicker, VueEditor, AssigneeView,
    PopupRouterView, FileViewer, ButtonCard, DescriptionViewFrom, TagContainerView, VueHorizontal
  },
  setup() {
    var members = ref([1, 2, 3, 4, 5, 6, 7, 8])
    var isTracked = ref(true)
    var card = ref(null)
    var list = ref(null)
    var cardDesc = ref("Test description")
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
    var isLoading = ref(true)
    var boardId = ref("")
    var isEditingDesc = ref(false)
    var attachments = ref([])
    var isShowFileView = ref(false) 
    var names = ref(["Samuel", "Samuel Rockson"])
    return { 
          members, isTracked, card, cardDesc, list, isAttachmentTapped, isLoading, boardId, attachments, isShowFileView, names,
          currentUser, isTagTapped, boardTags, cardTags, isDateTapped, selectedDate, value, time, timeStep, isEditingDesc
        }
    },
    async mounted() {
    },
    created() {
      // fetch from api
      let routeParams = this.$route.params
      console.log("pop up params: ", routeParams)
      this.boardId = routeParams.boardId
      let card_id = routeParams.cardId
      this.getCardBy(card_id)
    },
    methods: {
        formatFileSize(attachment) {
          let size =  (attachment.size / 1024) / 1000
          return size.toFixed(2)
        },
        dismissFileViewer() {
            this.isShowFileView = false
        },
        handleFileBrowserTapped() {
            console.log("file browser tapped")
            this.isShowFileView = true 
        },
        handleDidUploadFile(updatedCard) {
            this.card = updatedCard
            this.attachments = updatedCard.attachments
        },
        async handleSaveTag(tag) {
         console.log("prepare to save tag")
         var params = {
            boardId: this.boardId, 
            cardId: this.card.id,
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
        handleCancelDescEditing() {
            this.isEditingDesc = false 
        },
        handleDescEdit() {
            this.isEditingDesc = true 
        },
        async handleSaveDate() {
            let timeArray = this.time.split(':')
            this.selectedDate.setHours(timeArray[0])
            this.selectedDate.setMinutes(timeArray[1])
            let dueDateMilliSec = this.selectedDate.getTime()
            var params = {
                card_id: this.card._id, 
                dueDate: dueDateMilliSec
        }
        var fullURL = BASE_URL + "board/addDueDateToCard"
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            if (data.statusCode == 200) {
                this.card.dueDate = dueDateMilliSec
                this.selectedDate = null
                this.isDateTapped = false 
                console.log("list and card info updated: ", data.resp)
              }
             }
          })
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
            card_id: this.card._id, 
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
            boardId: this.boardId
          }
          var fullURL = BASE_URL + "board/getTags"
          await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("fetch tag resps: ", data)
             this.autoGrow()
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
      handleGoBack() {
        let path = "/b/" + this.boardId
        this.$router.push({path: path})
      },
      handleSaveDescription() {
          console.log("save description tapped")
          let html = document.getElementById("editor").innerHTML
          console.log("editor html: ", html)
          this.isEditingDesc = false 
          saveDesc(html, this.card._id)
      },
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
      async getCardBy(card_id) {
        var params = {
            card_id: card_id
        }
        var fullURL = BASE_URL + "board/getCardDetail"
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            if (data.statusCode == 200) {
                let resp = data.resp
                console.log("card detail data: ", resp)
                if (resp != null) {
                   this.card = resp.card
                   this.list = resp.list
                   this.cardTags = resp.tags
                   this.attachments = resp.attachments
                   this.fetchTags()
                }
              }
             }
          })
        },
        autoGrow() {
            let element = document.getElementById("cardNameId")
            if (element != null) {
                element.style.height = "20px";
                element.style.height = (element.scrollHeight) + "px";
            }
        }, 
        handleDateTapped() {
            this.isDateTapped = true 
        },
        refreshTags() {
            this.fetchTags()
        },
        handleTagTapped() {
            console.log("Tags tapped")
            this.isTagTapped = true 
        },
        expandAll() {
            console.log("finally updated...")
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
        }, 
        async handleContentInfoTapped() {
          console.log("selectedCard: ", this.card)
          var params = {
            card_id: this.card._id, 
            cardName: this.card.cardName, 
            cardDesc: this.cardDesc
         }
         var fullURL = BASE_URL + "board/updateCard"
         await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("card detail resp data: ", data)
            }
          })
        }
    }, 
    watch: { 
        card() { 
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
    }
}
</script>


<style scoped>
.attachmentListView {
    display: grid;
    grid-template-columns: repeat(2, 320px);
    grid-template-rows: repeat(auto, 100px);
    width: 600px;
}

.assigneeContainerView {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(100, auto);
    width: 600px;
    margin-left: 50px;
}


.statusIconTitleView label, .dueDateTitelLabel {
  margin-left: 8px;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-dark);
}

.statusContainer img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}
.statusIconTitleView span {
    width: 15px;
    height: 15px;
    margin-right: 14px;
    margin-top: -8px;
}
.statusIconTitleView label {
    font-weight: 600;
}
.statusIconTitleView {
    display: flex;
    align-items: center;
    width: 140px;
}
.statusContainer {
    display: flex;
    max-width: 90%;
    margin-top: 20px;
}
.fileViewer {
    height: 100vh;
    width: 100vw;
}
.attachmentDateLabel {
    font-weight: 300;
    font-size: 12px;
    display: flex;
    margin-top: 4px; 
    align-items: left;
    justify-content: left;
    text-align: left;
}
.attachmentFileNameLabel {
    font-weight: 500;
    font-size: 15px;
    display: flex;
    align-items: left;
    justify-content: left;
    max-height: 50px;
    margin-top: 8px;
    text-align: left;
}
.attachmentInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    width: calc(100% - 110px);
    height: 80px;
    padding-bottom: 8px;
}
.attchmentPreview {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    object-fit: contain;
    overflow: hidden;
}

.attachmentsTitleLabel {
    margin-top: 20px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    float: left;
    display: flex;
}
.attachmentCell {
    display: flex;
    height: 90px;
    width: 98%;
    margin-bottom: 10px;
    background-color: var(--color-background);
    border-radius: 8px;
}
.descriptionBtns {
    display: flex;
    justify-content: space-between;
    width: 160px;
    height: 40px;
}
.canelDescripBtn {
    font-weight: 600;
    font-size: 16px;
    width: 80px;
    height: 40px;
    color: var(--color-dark);
}

.saveDescriptionBtn, .saveDescriptionDisabledBtn { 
  width: 70px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background-color: var(--color-bar-dark);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
}

.saveDescriptionDisabledBtn {
    background-color: var(--color-light);
    color: var(--color-dark-variant);
}

.attachmentScrollContainer {
    height: 350px;
    width: 100%;
    background-color: orangered;
}
.dateContainerView {
    width: 300px;
    height: 480px;
}
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
    height: 400px;
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
  background-color: var(--color-bar-dark);
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
    /* min-height: 970px; */
    min-height: 970px;
    border-radius: var(--border-radius-2);
    overflow-y: scroll;
}



.tagCell {
    background-color: #8B81F7;
    height: 100%;
    width: 100%;
}
.tagItemsView {
    width: 480px;
    margin-left: 50px;
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
    min-height: 20px;
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
}
 .card {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow-y: scroll;
    z-index: 999999999999999;
 }
</style>
  