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

                <div class="statusContainer" v-if="card.dueDate != null">
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
                    <div class="assigneeContainerView" v-if="assignees.length > 0">
                        <v-chip-group selected-class="text-primary" column>
                        <v-chip  v-for="(assignee, index) in this.assignees" :key="index" style="border-radius: 19px;">
                            <AssigneeView :title="assignee.fullName" :imageIcon="assignee.picture" class="asigneeCellView"></AssigneeView>
                       </v-chip>
                      </v-chip-group>
                    </div>
                </div>

                <div class="statusContainer" v-if="cardTags.length > 0">
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
                <ReadOnlyEditor v-if="isDescReadonly" class="descriptionContainer" :content="card.description" @click="handleDidTapDescription"/>
                <DescriptionEditor v-else class="descriptionContainer" :content="card.description" @didUpdateEditor="didUpdateDescEditor"/>
                <div class="descriptionBtns" v-if="isDescReadonly === false">
                    <button class="saveDescriptionBtn" @click="handleSaveDescription">Save</button>
                    <button class="canelDescripBtn" @click="handleCancelDescEditing">Cancel</button>
                </div>
                <label class="attachmentsTitleLabel" v-if=" this.attachments.length > 0">Attachments</label>
                <div class="attachmentListView">
                    <div class="attachmentCell" v-for="(attachment, index) in this.attachments" :key="index" @click="handleFileBrowserTapped(attachment)">
                         <img v-if="['png', 'jpg', 'jpeg'].includes(attachment.fileType.toLowerCase())" :src="attachment.fileURL" class="attchmentPreview">
                         <img v-else :class="attachment.fileType.toLowerCase()" class="attchmentPreview">
                         <div class="attachmentInfoContainer">
                             <label class="attachmentFileNameLabel">{{ attachment.fileName }}</label>
                             <label class="attachmentDateLabel">{{ this.formatFileSize(attachment) }}MB</label>
                         </div>
                    </div>
                </div>


                <Label class="attachmentsTitleLabel">Comments</Label>
                <Editor class="commentContainer" v-if="isEditingComment" @didUpdateEditor="didUpdateCommentEditor"/>
                <div v-else class="addCommentPlaceholderView" @click="handleEnableWriteComment">
                    <img src="@/assets/writecomment.png" alt="">
                    <label for="">Write a comment</label>
                </div>
                <div class="descriptionBtns" v-if="isEditingComment">
                    <button class="saveDescriptionBtn" @click="handleSaveComment">Save</button>
                    <button class="canelDescripBtn" @click="handleCancelComment">Cancel</button>
                </div>
                 <CommentsView class="commentsContainerView" :allCardComments="allCardComments"/>
             </div>

            <div class="controlsContainer">
             <label class="memberTitleLabel">Members</label>
             <div class="membersContainer" v-if="members != null">
                <div class="memberCell" v-for="(member) in members" :key="member._id" @click="handleJoinRemove(member)">
                    <img v-if="member._id == 'joinRemove'" :class="member.fullName" class="memberPhoto">
                   <img v-else :src="member.picture != null ? member.picture : require(`@/assets/placeholder.png`)" class="memberPhoto">
                   <label class="memberNameLabel" v-if="member._id == 'joinRemove'">{{ member.fullName }}</label>
                   <label class="memberNameLabel" v-else>{{ member.fullName }}</label>
                </div>
             </div>
             <label class="seeMoreMembersLabel" v-if="members.length > 8">See more</label>


             <label class="memberLabel">Action</label>
             <ButtonCard imageIcon="priority.png" title="Priority level"/>
             <ButtonCard imageIcon="assignee.png" title="Assign" @click="handleAssign"/>
             <ButtonCard imageIcon="move.png" title="Move"/>

             <label class="memberLabel">Manage</label>
             <ButtonCard imageIcon="tags.png" title="Tags" @click="handleTagTapped"/>
             <date-picker v-model="selectedDate" @update:model-value="handleSaveDate"  time-picker-inline >
               <template #trigger>
                 <ButtonCard imageIcon="duedate.png" title="Due Date"/>
               </template>
             </date-picker>
             <ButtonCard imageIcon="poll.png" title="Poll"/>
             <ButtonCard imageIcon="checklist.png" title="Checklist" @click="handleCheckListTapped"/>
             <ButtonCard imageIcon="fileAttachment.png" title="Attachments" @click="handleAttachmentTapped"/>
             <label class="memberLabel">Connect</label>
             <ButtonCard imageIcon="share.png" title="Share"/>
             <ButtonCard imageIcon="copyTemplate.png" title="Copy URL"/>
             <label class="memberLabel">Archive</label>
             <ButtonCard imageIcon="archive.png" title="Delete"/>
             </div>
        </div>

        <v-overlay v-model="isAssign" class="align-center justify-center overLayContainer" style="padding-left: 500px" contained>
             <AssignOverlayView :boardId="this.boardId" :card_id="this.card._id" :assigned-user-ids="assigneeIds" @didAssignMembers="onAssignMembers"/>
        </v-overlay>

        <v-overlay v-model="isTagTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" activator="tagBtn" contained>
            <TagContainerView @handleSaveTag="handleSaveTag" @refreshTags="refreshTags" @handleTagChanged="handleTagChanged" :boardTags="this.boardTags" class="tagContainerView"/>
        </v-overlay>

        <v-overlay v-model="isAttachmentTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" contained>
            <AttachmentView :card="this.card._id" class="attachmentContainerView" @fileUploadComplete="handleDidUploadFile"/>
        </v-overlay>

        <v-overlay v-model="isCheckListTapped" class="align-center justify-center overLayContainer" style="padding-left: 500px" contained>
            <AddCheckListView :card="this.card._id" class="attachmentContainerView" @fileUploadComplete="handleDidUploadFile"/>
        </v-overlay>

        <v-overlay v-model="isShowFileView" class="align-center justify-center overLayContainer" contained>
            <FileViewer class="fileViewer" :attachment="this.selectedAttachment" @dismissFileViewer="dismissFileViewer" />
        </v-overlay>

        <v-overlay v-model="isMemberCardVisible" class="align-center justify-center" activator="#commentEditor" contained opacity="0">
           <div class="memberCarView">
           </div>
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
import CommentsView from '@/components/CommentsView.vue'
import AssignOverlayView from './AssignOverlayView.vue';

import ButtonCard from '@/components/ButtonCard.vue'
import DescriptionViewFrom from '@/components/DescriptionViewForm.vue'

import TagContainerView from '@/components/TagContainerView.vue';
import TextEditorView from '@/components/TextEditorView.vue'
import CommentEditorView from '@/components/TextEditorView.vue'

import AttachmentView from '@/components/AttachmentView.vue';
import AddCheckListView from '@/components/AddCheckListView.vue'
import MemberOverlayView from './MemberOverlayView.vue';
import Editor from "../components/Editor.vue";
import DescriptionEditor from "../components/Editor.vue";
import ReadOnlyEditor from './ReadOnlyEditor.vue';

import _ from 'lodash'
import axios from 'axios';
import { ref } from 'vue'

import CryptoJS from 'crypto-js'
// import Editor from 'primevue/editor'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VueEditor } from 'vue2-editor'
import APIService from '@/APIService'
  
export default {
  inject: ["cryptojs"],
  components: {
    PopupOverlay, TextEditorView, AttachmentView, VTimePicker, VueEditor, AssigneeView, CommentEditorView, MemberOverlayView, AssignOverlayView,
    PopupRouterView, FileViewer, ButtonCard, DescriptionViewFrom, TagContainerView, CommentsView, AddCheckListView, Editor, DescriptionEditor, ReadOnlyEditor
  },
  setup() {
    var members = ref([])
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
    var selectedAttachment = ref(null)
    var names = ref(["Samuel", "Samuel Rockson"])
    var isEditingComment = ref(false)
    var commentEditorHeight = ref(50)
    var descEditorHeight = ref(340)
    var isMemberCardVisible = ref(false)
    var isCheckListTapped = ref(false)
    var isDescReadonly = ref(true)
    var comment = ref(null)
    var isAssign = ref(false)
    var allCardComments = ref([])
    var assignees = ref([])
    var assigneeIds = ref([])
    return { 
          members, isTracked, card, cardDesc, list, isAttachmentTapped, isLoading, boardId, attachments, isShowFileView, names, commentEditorHeight, descEditorHeight, selectedAttachment,
          currentUser, isTagTapped, boardTags, cardTags, isDateTapped, selectedDate, value, time, timeStep, isEditingDesc, isEditingComment, isMemberCardVisible, isCheckListTapped, 
          isDescReadonly, comment, allCardComments, isAssign, assignees, assigneeIds
        }
    },
    async mounted() {
        APIService.init()
    },
    created() {
      // fetch from api
      let routeParams = this.$route.params
      console.log("pop up params: ", routeParams)
      this.getUserInfo()
      this.boardId = routeParams.boardId
      let card_id = routeParams.cardId
      this.getCardBy(card_id)
    },
    methods: {
        onAssignMembers(assignees, assigneeIds) {
            this.assignees = assignees
            this.assigneeIds = assigneeIds
        },
    handleAssign() {
        this.isAssign = true 
    },
    handleDidTapDescription() {
        this.isDescReadonly = false
        this.$forceUpdate()
    },
    async handleSaveComment() {
        let userid = this.currentUser.id
        let params = {
            cardId: this.card.id, 
            listId: this.card.listId, 
            boardId: this.boardId, 
            commenter: userid, 
            content: this.comment, 
            date: Date.now()
        }
        this.isEditingComment = false
        await APIService.addComment(params)
        this.getCardComments()

    },
    didUpdateCommentEditor(comment) {
        this.comment = comment
    },
    async handleJoinRemove(tappedMember) {
        if (tappedMember._id == 'joinRemove') {
               // If user is a member, remove from card else add to card
        var cardMembers = this.card.members
        let userid = this.currentUser.id
        let memberFilter = cardMembers.filter(member => member === userid)
        if (memberFilter.length > 0) {
                // remove
                cardMembers = cardMembers.filter(member => member != userid)
         } else {
                cardMembers.push(userid)
         }                              
            // call api to save
         let params = {
            card_id: this.card._id, 
            members: cardMembers
         }
          await APIService.updateCardMembership(params)
          this.getCardBy(this.card._id)
         }
        },
        didUpdateDescEditor(cardDesc) {
            this.card.description = cardDesc
        },
        handleCheckListTapped() {
            this.isCheckListTapped = true
        },
        handleShowMemberCard(isVisible) {
            this.isMemberCardVisible = isVisible 
        },
        handleCancelComment() {
            this.isEditingComment = false
        },
        handleEnableWriteComment() {
            this.isEditingComment = true 
        },
        formatFileSize(attachment) {
          let size =  (attachment.size / 1024) / 1000
          return size.toFixed(2)
        },
        dismissFileViewer() {
            this.isShowFileView = false
        },
        handleFileBrowserTapped(attachment) {
            this.selectedAttachment = attachment
            this.isShowFileView = true 
        },
        handleDidUploadFile(updatedCard) {
            this.card = updatedCard
            this.attachments = updatedCard.attachments
        },
        async handleSaveTag(tag) {
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
            this.isDescReadonly = true 
        },
        handleDescEdit() {
            this.isEditingDesc = true 
        },
        async handleSaveDate() {
          let dueDateMilliSec = this.selectedDate.getTime()
          var params = {
            card_id: this.card._id, 
            dueDate: dueDateMilliSec
         }
        await APIService.updateDueDate(params)
        this.card.dueDate = dueDateMilliSec
        this.selectedDate = null
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
      async handleSaveDescription() {
         let html = this.card.description
          this.isEditingDesc = false 
          this.isDescReadonly = true
          await APIService.saveDesc(html, this.card._id)
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
                if (resp != null) {
                   this.card = resp.card
                   this.list = resp.list
                   this.cardTags = resp.tags
                   this.attachments = resp.attachments
                   this.members = resp.members
                   if (this.currentUser != null) {
                    let memberFilter = this.members.filter(member => member.id === this.currentUser.id)
                    this.members.push({'fullName': memberFilter.length > 0 ? 'Leave' : 'Join', '_id': 'joinRemove'})
                   }
                  
                   this.fetchTags()
                   this.updateViewCount()
                   this.getCardComments()
                   this.getCardAssignees()
                }
              }
             }
          })
        },
        async getCardAssignees() {
            let params = {
                assigneeIds: this.card.assignees
            }
           let cardAssignees = await APIService.getCardAssignees(params)
           this.assigneeIds = _.map(cardAssignees, 'id');
           this.assignees = cardAssignees
           // get the assignee ids
        },
        async getCardComments() {
         let cardParam = {
           cardId: this.card.id
         }
         this.allCardComments = await APIService.getComments(cardParam)
        },
        async updateViewCount() {
            let params = {
                card_id: this.card._id
            }
            await APIService.updateViewCount(params)
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
                this.$router.push({path: "/home"})
            } else {
                let userCache = JSON.parse(userCacheString)
                let decryptionToken = userCache.token
                let encryptedUserData = userCache.user
                let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
                let cacheInfoObject = JSON.parse(decryptedData)
                this.currentUser = cacheInfoObject.user
            }
        }, 
        async handleContentInfoTapped() {
          var params = {
            card_id: this.card._id, 
            cardName: this.card.cardName, 
            cardDesc: this.cardDesc
         }
         var fullURL = BASE_URL + "board/updateCard"
         await axios.post(fullURL, params).then((response) => {})
        }
    }, 
    watch: { 
        list(newVal, oldVal) { 
           this.selectedList = newVal
        }, 
        tags(newVal, oldVal) { 
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
        }
    }
}
</script>


<style lang="scss" scoped>
.memberCarView {
    height: 500px;
    width: 300px;
    background-color: wheat;
    border-radius: var(--border-radius-1);
}
.addCommentPlaceholderView label {
    font-weight: 500;
    font-size: 14px;
    color: var(--color-dark);
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 8px;
}

.addCommentPlaceholderView img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
}
.addCommentPlaceholderView {
    display: flex;
    height: 44px;
    width: 100%;
    background-color: var(--color-background);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-top: 4px;
    margin-bottom: 10px;
    border: 1px solid var(--color-light);
}
.attachmentListView {
    display: grid;
    grid-template-columns: repeat(2, 260px);
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
    overflow: hidden;
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
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    object-fit: contain;
    overflow: hidden;
    &.pdf {
        content: url('../assets/pdfIcon.png');
    }
    &.docx {
        content: url('../assets/docxIcon.png');
    }
    &.doc {
        content: url('../assets/docxIcon.png');
    }
    &.xlsx {
        content: url('../assets/xlsxICon.png');
    }
    &.pptx {
        content: url('../assets/pptxIcon.png');
    }
    &.mp4 {
        content: url('../assets/mp4Icon.png');
    }
    &.mov {
        content: url('../assets/movIcon.png');
    }
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
    margin-bottom: 5px;
    background-color: var(--color-background);
    border-radius: 8px;
}
.descriptionBtns {
    display: flex;
    justify-content: space-between;
    width: 160px;
    height: 40px;
    margin-bottom: 10px;
    margin-top: 20px;
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
    width: 300px;
    min-height: 600px;
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
.descriptionContainer, .commentContainer {
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.memberNameLabel img {
    margin-left: 10px;
}
.memberNameLabel {
    max-lines: 1;
    max-height: 20px;
    font-weight: 500;
    overflow: hidden;
    font-size: 12px;
    margin-top: 4px;
    width: 96%;
}
.memberPhoto {
    width: 30px;
    height: 30px;
    border-radius: var(--border-radius-1);
    object-fit: fill;
    overflow: hidden;
    &.Join {
        content: url('@/assets/add.svg');
    }
    &.Leave {
        content: url('@/assets/remove.svg');
    }
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
    z-index: 99;
}

.cardInfoContainer {
    display: flex;
    width: 740px;
    min-height: 94vh;
    margin-right: auto;
    margin-left: auto;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background-color: var(--color-card-background);
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
  