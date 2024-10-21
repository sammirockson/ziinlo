<template>
    <div>
        <BoardNavItemsView class="boardBNavBar" :boardId="this.board.id" :boardName="this.board.name" @handleSearchBoard="handleSearchBoard"></BoardNavItemsView>
        <div class="mainBoardConentView">
            <div class="boardListsContainer" id="boardListsContainer">
                 <div v-if="this.board != null" class="listContainer" id="listContainer"v-for="(list, index) in this.board.lists" :key="list.id">
                    <div class="list-option-view" v-if="optionIndex == index" @blur="handleListOptionBlur">
                        <ListDropdownView class="list-dropdown" @onListOptionTapped="onListOptionTapped" :list="list"></ListDropdownView>
                    </div>
                    <div class="createNewList" :style="{display: list.headerType ==  `creatingList` ? 'flex' : 'none'}">
                        <div class="create-new-list-view">
                            <div class="list-color-picker" :style="{backgroundColor: this.listHeaderColor}" @click="handleListColorPicker"></div>
                            <textarea name="text" v-model="newListName" @input="dynamicTextArea(index)" placeholder="Create New List" class="createNewListField" id="createNewListField_id"></textarea>
                        </div>
                            <button v-if="isSavingCard" class="addListBtn buttonload">
                               <i class="fa fa-circle-o-notch fa-spin"></i> Creating... 
                            </button>
                           <button v-else class="addListBtn" @click="createANewList(list, index)">Create List</button>
                    </div>
                    <div class="listFooterView" @click="handleAddList(list, index)" :style="{display: list.headerType ==  `addList` ? 'flex' : 'none'}">
                        <span id="addIcon" class="material-symbols-outlined">add</span>
                        <div class="footerTitleContainer">
                            <button class="addCardLabel">New List</button>
                        </div>
                     </div>
                     <div class="listHeaderView" :id="`headerMotherContainer_` + list.id" :style="{display: list.headerType ==  `showListName` ? 'flex' : 'none'}">
                         <div class="badgeAndTitleContainer">
                            <div class="colorBadge" :style="{backgroundColor: list.listBadgeColor}"></div>
                            <textarea type="text" v-on:blur="didEditListName(list.listName, list._id, list.id)"  @input="listNameTextAreaGrow(list.id)" class="cardNameField" :id="list.id" v-model="list.listName"></textarea>
                         </div>
                         <img src="@/assets/three_dots.png" class="listNameLabel" @click="handleListOptionTapped(index)"></img>
                     </div>
                     <div class="listBackgroundView" :id="'listBgView' + list._id" v-if="this.isBtmViewVisible(list)">
                     <div class="cardAndFooterContainer">
                        <DraggableView v-model="list.cards" 
                             group="allCards" 
                             item-key="id"
                             drag-class="drag"
                             ghost-class="ghost"
                             @change="onCardMoved">
                           <template #item="{element}">
                            <CardView :card="element" :boardId="this.board.id" :allMembers="this.allMembers" :tags="this.getCardTags(element)"></CardView>
                           </template>
                       </DraggableView>
                        <div v-if="list.isCreateCard == true" class="createListContainer">
                            <textarea name="text" v-model="newCardName" @input="autoGrow(index)" placeholder="Give your card a name" class="addListInputField" :id="`newCardField_` + index"></textarea>
                            <button v-if="isSavingCard" class="addListBtn buttonload">
                               <i class="fa fa-circle-o-notch fa-spin"></i> Adding... 
                            </button>
                           <button v-else class="addListBtn" @click="handleCreateCard(list, index)">Add Card</button>
                        </div>
                    </div>
                    
                 </div>
                   <div class="bottomView" :id="'bottomView_' + list._id" v-if="this.isBtmViewVisible(list)" :class="{'is-create-card': list.isCreateCard}">
                       <div v-if="list.isCreateCard == true" class="createListTipFooterView"></div>
                      <div v-else v-if="list.cards != null && list.cards.length > 0 || list.isAddCard == true || list.isCreateCard == true" class="listFooterView" @click="handleAddCard(list, index)">
                        <span id="addIcon" class="material-symbols-outlined">add</span>
                        <div class="footerTitleContainer">
                            <button class="addCardLabel">New Card</button>
                        </div>
                       </div>
                   </div>
                </div>
           </div>
        </div>
        <RouterView/>
        <v-overlay v-model="isBlur" @click="dismissCover" class="align-center justify-center" :persistent="true" activator="#commentEditor" contained opacity="0.05" style="z-index: 99;">
       </v-overlay>

       <v-overlay v-model="isListColorPicker" class="align-center justify-center" :persistent="true" contained opacity="0.5">
          <ListHeaderColorPickerView @didCloseListColorPicker="didCloseListColorPicker"/>
       </v-overlay>

       <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template>
      </template>

      <v-card
        :text="dialogMsg"
        :title="dialogTitle"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn @click="didConfirmDialog">
            Agree
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import DraggableView from 'vuedraggable'
import CardView from '@/views/CardView.vue'
import BoardNavItemsView from './BoardNavItemsView.vue'
import ListDropdownView from './ListDropdownView.vue'
import APIService from '@/APIService';
import ListHeaderColorPickerView from './ListHeaderColorPickerView.vue'
import _ from 'lodash'

import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import axios from 'axios';

export default {
    inject: ["eventBus", "cryptojs"],
    props: ["isExpanded"],
    components: {
        NavBar, CardView, DraggableView, BoardNavItemsView, ListDropdownView, ListHeaderColorPickerView
    }, 
    setup() {
        var isSideBarExpanded = ref(true)
        var board = ref([])
        var isCardTapped = ref(false)
        var newCardName = ref("")
        var newListName = ref("")
        var boardId = ref("")
        var selectedCard = ref(Object)
        var selectedList = ref(Object)
        var allCards = ref([])
        var isSavingCard = ref(false)
        var allBoardTags = ref([])
        var isRefreshBoard = ref(true)
        var currentUser = ref(null)
        var dblists = ref([])
        var allLists = ref([])
        var allMembers = ref([])
        var optionIndex = ref(-1)
        var isBlur = ref(false)
        var dialog = ref(false)
        var dialogTitle = ref('Delete Action')
        var dialogMsg = ref('Are you sure you want to delete?')
        var listtoDelete = ref(Object)
        var listHeaderColor = ref("#FFA500")
        var isListColorPicker = ref(false)
        return { 
            isSideBarExpanded, board, dblists, allLists, newCardName, newListName, 
            isCardTapped, currentUser, optionIndex, dialogTitle, dialogMsg, isListColorPicker,
            boardId, selectedCard, selectedList, allCards, isSavingCard, allBoardTags, isRefreshBoard,
            allMembers, isBlur, dialog, listtoDelete, listHeaderColor
        }
    },
    methods: {
        didCloseListColorPicker(selectedColor) {
            this.isListColorPicker = false 
            this.listHeaderColor = selectedColor
            console.log('selected color: ', selectedColor)
        },
        handleListColorPicker() {
            this.isListColorPicker = true 
        },
        async didConfirmDialog() {
            this.dialog = false
            let params = {
              listId: this.listtoDelete._id
            }
            await APIService.deleteList(params)
            this.getBoardBy(this.boardId)
        },
        onListOptionTapped(index, list) {
            this.dismissCover()
            let listIndex = list.cards.length
            if (index == 0) { // Add card
                this.handleAddCard(list, listIndex)
            } else if (index == 1) { // Move list

            } else if (index == 2) { // Move cards

            } else if (index == 3) { // Delete cards

            } else if (index == 4) { // Delete list
                this.listtoDelete = list
                this.dialogMsg = `Are you sure you want to delete ${list.listName} list?`
                this.dialog = true 
            }
        },
        dismissCover() {
            this.isBlur = false 
            this.optionIndex = -1
        },
        handleListOptionBlur() {
            console.log('handleListOptionBlur')
        },
        handleListOptionTapped(listIndex) {
            this.optionIndex = listIndex
            this.isBlur = true 
        },
        async getAllMembers() {
          let routeParams = this.$route.params
          let params = {
            boardId: routeParams.boardId
          }
          let allMembers = await APIService.getBoardMembers(params)
          if (allMembers != null) {
            this.allMembers = allMembers;
          }
        },
        handleSearchBoard(searchText) {
            if (searchText.length > 0) {
               var searchLists = []
               let searchKey = searchText.toLowerCase()
               searchLists = this.allLists
               for (var index in searchLists) {
                  let list = searchLists[index]
                  if (list != undefined) {
                  let cards = list.cards
                  let cardFilter = cards.filter(card => card.cardName.toLowerCase().includes(searchKey))
                  if (cardFilter.length > 0) {
                    searchLists[index].cards = cardFilter
                  } else {
                    searchLists = searchLists.filter(x => x._id !== list._id)
                  }
                  }
               }
               this.board.lists = searchLists
            } else {
                this.getBoardBy(this.boardId) 
            }
        },
        isBtmViewVisible(list) {
            return list.headerType ==  'addList'  || list.headerType == 'creatingList' ? false : true
        },
        getCardTags(card) {
            let tagIds = card.selectedTags
            return this.allBoardTags.filter( tag => tagIds.includes(tag.id));
        },
        listNameTextAreaGrow(listId) {
            let element = document.getElementById(listId) // cardNameId
            if (element != null) {
                element.style.height = (element.scrollHeight) + "px";
            }

            let contId = "headerMotherContainer_" + listId
            let badgeAndTitleContainer = document.getElementById(contId) 
            if (badgeAndTitleContainer != null ) {
                badgeAndTitleContainer.style.height = (element.scrollHeight + 30) + "px";
            }
        },
     async didEditListName(listName, list_id, listId) {
        console.log("didEditListName: ", listName)
        var params = {
            list_id: list_id, 
            listName: listName, 
         }
         var fullURL = BASE_URL + "board/updateListName"
         await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
             let data = response.data
             console.log("list update resp data: ", data)
             let contId = "headerMotherContainer_" + listId
            let badgeAndTitleContainer = document.getElementById(contId) 
            console.log("lstid: ", contId, "element: ", badgeAndTitleContainer == null)
            if (badgeAndTitleContainer != null ) {
                badgeAndTitleContainer.style.height = "60px";
            }
            }
          })
        },
        sortedCards(cards) {
            return cards.sort((a,b)=> a.position - b.position)
        },
        async setListEmpty(listId) {
         var params = {
            listId: listId
        }
        var fullURL = BASE_URL + "board/setEmptyList"
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            console.log("resp data: ", data)
            if (data.statusCode == 200) {
                console.log("list and card info updated: ", data.resp)
              }
             }
          })
        },
       async updateBoardInfo(cards, cardIds, list_id, listId) {
        var params = {
            cards: cards, 
            cardIds: cardIds, 
            listId: listId, 
            list_id: list_id
        }
        var fullURL = BASE_URL + "board/updateList"
        await axios.post(fullURL, params).then((response) => {
        })
      },
      onCardMoved(e) {
       console.log("onCardMoved: ", e) 
       let item = e.added || e.removed || e.moved; 
       if (e.removed != null) { // Removed: removed from one list to another
        for (var listIndex in this.board.lists) {
          var list = this.board.lists[listIndex]
          let list_id = list._id
          let listId = list.id
          if (list.cards.length > 0) {
            var cards = []
            var cardIds = []
             for (var cardPosition in list.cards) {
                let card = list.cards[cardPosition]
                card.position = cardPosition
                cardIds.push(card.id)
                cards.push({id: card.id, position: cardPosition})
             }
             this.updateBoardInfo(cards, cardIds, list_id, listId)
          } else {
            // set list empty
            this.setListEmpty(list_id)
          }
        }
      }

      if (e.moved != null) { // moved: moved within the same list
        let listId = e.moved.element.listId
        let listIndex = this.board.lists.findIndex(x => x.id === listId);
        let list = this.board.lists[listIndex]
        let list_id = list._id
        var cards = []
        var cardIds = []
        for (var cardPosition in list.cards) {
            let card = list.cards[cardPosition]
            card.position = cardPosition
            cardIds.push(card.id)
            cards.push({id: card.id, position: cardPosition})
        }
        this.updateBoardInfo(cards, cardIds, list_id, listId)
      }

      if (e.added != null) {
        let card_id = _.get(e.added.element, '_id')
        let cardName = _.get(e.added.element, 'cardName')
        _.forEach(this.board.lists, function(list) {
            let addedCard = _.find(list.cards, { '_id': card_id})
            if (addedCard !== undefined) {
                console.log(`${cardName} has been moved to: `, list.listName, 'list')
                // Send notification to members of the card
            //     this.$gtag.event('Moved card', {
            //        'event_category': 'Card',
            //        'event_label': `${cardName} has been moved to: ${list.listName} list`,
            //        'value': 1
            //    })
            }
        }) 
      }
    },
        handleOverlayDismissed() {
            this.isRefreshBoard = true
            this.$router.go(-1)
            // this.getBoardBy(this.boardId)
        },
        handleCardTapped(card, list) {
            this.optionIndex = -1
            let path = "/b/" + this.boardId
            this.$router.push(
                {
                    path: path, 
                    query: {
                        card: card._id
                    }
                })
        },
      async createANewList(list, index) {
        // Create List
        var params = {
          listName: this.newListName,
          boardId: this.boardId,
          isAddCard: true, 
          isCreateList: false,
          headerType: "showListName",
          id: Date.now(), 
          owner: this.currentUser.id, 
          listBadgeColor: this.listHeaderColor 
        }
        var fullURL = BASE_URL + "board/newList"
        console.log("full url: ", fullURL, "params: ", params)
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            console.log("resp data: ", data)
            if (data.statusCode == 200) {
                console.log("created new list: ", data.resp)
                this.getBoardBy(this.boardId)
              }
             }
          })
          this.newListName = ""
    },
        handleAddList(list, index) {
            list.isCreateList = true 
            list.headerType = "creatingList"
            this.board.lists[index] = list
        },
        dynamicTextArea(index) {
            let element = document.getElementById("createNewListField_id")
            element.style.height = "15px";
            element.style.height = (element.scrollHeight) + "px";
        },
        autoGrow(index, list) {
            let element = document.getElementById(`newCardField_` + index)
            element.style.height = "15px";
            let scrollheight = element.scrollHeight >= 58 ?  58 : element.scrollHeight 
            element.style.height = scrollheight + "px";
        },
       async handleCreateCard(list, index) {
          var params = {
             cardName: this.newCardName,
             boardId: this.boardId,
             listId: list.id,
             id: Date.now(), 
             owner: this.currentUser.id  // Change ASAP
         }
         var fullURL = BASE_URL + "board/newCard"
         console.log("full url: ", fullURL, "params: ", params)
         await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            console.log("card resp data: ", data)
            if (data.statusCode == 200) {
                console.log("created new card: ", data.resp)
                this.getBoardBy(this.boardId)
              }
             }
          })
          this.newCardName = ""
        },
        handleAddCard(list, index) {
            list.isCreateCard = true 
            this.board[index] = list

            // let bottomViewId = 'bottomView_' + list._id
            // let bottomView = document.getElementById(bottomViewId)
            // let bottomViewHeight = element.scrollHeight + 100
            // bottomView.style.height = (300) + "px";

            setTimeout(()=>{
                let listBgViewId = "listBgView" + list._id
                var myDiv = document.getElementById(listBgViewId);
                myDiv.scrollTop = myDiv.scrollHeight + 200;
            }, 500)
        }, 
     async getBoardBy(boardId) {
        if (this.currentUser == null) {
            this.$router.push({path: '/home'}) 
        } else {
        let userId = this.currentUser.id
        this.isCardTapped = false
        var params = {
            boardId: boardId
        }
        let boardResp = await APIService.getBoardById(params)
        let apiBoard = boardResp.board
        this.allBoardTags = boardResp.tags
        if (apiBoard === undefined) {
            console.log('go home because undefined', apiBoard)
            this.$router.push({path: '/boards'}) 
        } else {
            let members = apiBoard.members.filter(member => member == userId)
            console.log("members: ", members, "userId: ", userId)
            if (members.length > 0 ) {
                apiBoard.lists.push({ id: "listPlaceholder", listName: "Add New List", headerType: "addList", footerType: "add", isAddCard: false, isCreateList: false, cards: []})
                apiBoard.lists.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
               for (var listIndex in apiBoard.lists) {
                 let cards = this.sortedCards(apiBoard.lists[listIndex].cards)
                 apiBoard.lists[listIndex].cards = cards
                 this.allCards.push(cards)
                }
               this.allLists = apiBoard.lists
               this.dblists = apiBoard.lists
               this.board = apiBoard
               this.$gtag.event('Board opened', {
                   'event_category': 'board',
                   'event_label': `Opened ${apiBoard.name} board with ${apiBoard.lists.length} lists`,
                   'value': 1
               })
            } else {
                console.log("You're not part of this board, request invitation from the owner")
                this.$router.push({path: '/boards'}) 
            }
        }
      }
    }, 
     async getCardBy(card_id) {
        var params = {
            card_id: card_id
        }
        var fullURL = BASE_URL + "board/getCardDetail"
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            console.log("card data: ", data)
            if (data.statusCode == 200) {
                let resp = data.resp
                if (resp != null) {
                   this.selectedCard = resp.card
                   this.selectedList = resp.list
                   this.cardTags = resp.tags
                   this.isCardTapped = true 
                   this.$emit('cardDetailInfo', resp)
                }
              }
             }
          })
        }
    },
    watch: { 
        '$route' () {
          console.log("routed called")
          this.getBoardBy(this.boardId)
          this.getAllMembers()
        }
    },  
    mounted() {
        APIService.init()
        let routeParams = this.$route.params
       let userCacheString = localStorage.getItem(USER_CACHE_KEY)
       if (userCacheString != null && userCacheString.length > 0) {
        let userCache = JSON.parse(userCacheString)
        let decryptionToken = userCache.token
        let encryptedUserData = userCache.user
        let decryptedData = CryptoJS.AES.decrypt(encryptedUserData, decryptionToken).toString(CryptoJS.enc.Utf8)
        let cacheInfoObject = JSON.parse(decryptedData)
        this.currentUser = cacheInfoObject.user
       }
       
        this.boardId = routeParams.boardId
        this.getBoardBy(this.boardId)
        this.getAllMembers()
    },
}
</script>
<style lang="scss" scoped>
.create-new-list-view {
    display: flex;
    width: 100%;
    height: 100%;
    .list-color-picker {
        width: 8px;
        height: 30px;
        border-radius: 8px;
        margin-left: 5px;
        margin-top: auto;
        margin-bottom: auto
    }
}
.list-option-view {
    height: 220px;
    width: 94.5%;
    background-color: transparent;
    z-index: 99999999999;
    position: absolute;
    border-radius: 12px;
    margin-top: 54px;
    .list-dropdown {
        width: 70%;
        margin-left: 25%;
        height: 220px;
        background-color: white;
        // margin-top: 54px;
        border-radius: 8px;
        box-shadow: var(--box-shadow);
    }
}
.drag {
  transform: rotate(5deg);
}
 
.ghost {
  background: lightgray;
  border-radius: 6px;
}
.ghost {
  visibility: hidden;
}

.boardInfoView label {
    font-weight: 500;
    font-size: 10px;
    margin-right: 8px;
    margin-left: 1px;
}
.boardIcon {
    width: 15px;
    height: 15px;
}
.boardInfoView {
    display: flex;
    width: 120px;
    height: 50px;
    justify-content: space-evenly;
    margin-top: 5px;
}

.cardNameLabel {
    width: 200px;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 700;
    font-size: 13px;
    text-align: left;
    white-space: pre-wrap;
}

.footerTitleContainer {
    width: auto;
    height: 24px;
    margin-top: 12px;
    overflow: hidden;
}
#addIcon {
    padding: 0;
    margin: 0;
    margin-top: 12px;
    font-weight: 700;
    color: var(--color-card-title);
}

.addCardLabel {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 15px;
    margin-left: 4px;
    color: var(--color-card-title);
}
.cardAndFooterContainer {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /* padding-bottom: 50px; */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    padding-top: 8px;
}
.listFooterView {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
    width: 240px;
    border-radius: var(--border-radius-2);
    border: 1px solid var(--color-light);
    z-index: 9999;
    overflow: hidden;
    background-color: var(--color-card-background);
    /* margin-top: -8px; */
}

.addListBtn {
    display: block;
    width: 100px;
    height: 34px;
    background-color: var(--color-dark-theme);
    color: white;
    border-radius: var(--border-radius-1);
    margin-left: 8px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    z-index: 2;
}
.addListInputField, .createNewListField {
  padding: 8px;
  width: 200px;
  margin-left: 8px;
  margin-right: 8px;
  border: 1px solid var(--color-light);
  border-radius: var(--border-radius-1);
  text-align: left;
  resize: none;
  overflow: hidden;
  height: 40px;
  max-height: 500px;
  max-lines: 200;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-dark-blue);
  max-lines: 2;
  outline: none;
}
.createNewListField {
    width: 180px;
}
.addListInputField:focus, .cardNameField:focus {
    outline: none;
    border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.createListContainer  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 140px; */
    width: 98%;
    padding-top: 10px;
    z-index: 9999;
    overflow: hidden;
    background-color: var(--color-card-background);
    align-items: center;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: var(--border-radius-2)
}

.createNewList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 140px; */
    width: 98%;
    padding-top: 10px;
    z-index: 999999;
    overflow: hidden;
    background-color: white;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    border-radius: var(--border-radius-2)
}


.cardCell {
    overflow: hidden;
    width: 220px;
    min-height: 50px;
    margin-bottom: 10px;
    border: 1px solid var(--color-light);
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-1);
    /* border-bottom-right-radius: var(--border-radius-2);
    border-bottom-left-radius: var(--border-radius-2); */
}

.badgeAndTitleContainer {
    display: flex;
    flex-direction: row;
}

.badgeAndTitleContainer label {
    margin-left: 10px;
}

.cardNameField {
    display: flex;
    width: 165px;
    min-height: 30px;
    margin-top: 17px;
    font-size: 15px;
    font-weight: 600;
    resize: none;
    color: var(--color-dark);
    margin-bottom: 20px;
    margin-left: 8px;
}

.listNameLabel {
    height: 24px;
    font-weight: 600;
    font-size: 15px;
    margin-top: auto;
    margin-bottom: auto;
}
.colorBadge {
    width: 4px;
    height: 20px;
    border-radius: var(--border-radius-1);
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 15px;
}

.listHeaderView {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    border-radius:  var(--border-radius-2);;
    /* border-top-right-radius: var(--border-radius-2);
    border-top-left-radius: var(--border-radius-2); */
    border: 1px solid var(--color-light);
    padding-right: 15px;
    background-color: var(--color-card-background);
}


.boardListsContainer {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding-right: 20px;
}

.listContainer {
    width: 220px;
    float: none;
    max-height: 100%;
    position: relative;
    margin: 0 0.50%;
    display: inline-block;
    zoom: 1;
    overflow: hidden;
    display: table-cell;
    vertical-align: top;
    padding-left: 15px;
}

.listBackgroundView {
    width: 100%;
    background-color: var(--color-background);
    max-height: calc(100vh - 180px);
    /* max-height: calc(100vh - 230px); */
    overflow-y: scroll;
    margin-top: -10px;
    /* border-bottom-left-radius: var(--border-radius-2);
    border-bottom-right-radius: var(--border-radius-2); */
}

.bottomView {
    min-height: 50px;
    width: 100%;
    background-color: var(--color-background);
    border-bottom-left-radius: var(--border-radius-2);
    border-bottom-right-radius: var(--border-radius-2);
    &.is-create-card {
        background-color: white;
    }
}

.mainBoardConentView {
    /* width: calc(100% - 10px); */
    width: 100%;
    height: calc(100% - 50px);
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
}

.boardBNavBar {
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.2);
}
    
</style>