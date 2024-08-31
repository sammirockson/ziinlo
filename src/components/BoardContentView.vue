<template>
    <div>
        <!-- <NavBar :isExpanded="this.isSideBarExpanded"/> -->
        <BoardNavItemsView class="boardBNavBar" :boardId="this.board.id" :boardName="this.board.name" @handleSearchBoard="handleSearchBoard"></BoardNavItemsView>
        <div class="mainBoardConentView">
            <div class="boardListsContainer" id="boardListsContainer">
                 <div v-if="this.board != null" class="listContainer" id="listContainer"v-for="(list, index) in this.board.lists" :key="list.id">
                    <div class="createNewList" :style="{display: list.headerType ==  `creatingList` ? 'flex' : 'none'}">
                            <textarea name="text" v-model="newListName" @input="dynamicTextArea(index)" placeholder="Create New List" class="createNewListField" id="createNewListField_id"></textarea>
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
                            <div class="colorBadge"></div>
                            <textarea type="text" v-on:blur="didEditListName(list.listName, list._id, list.id)"  @input="listNameTextAreaGrow(list.id)" class="cardNameField" :id="list.id" v-model="list.listName"></textarea>
                         </div>
                         <img src="@/assets/three_dots.png" class="listNameLabel"></img>
                     </div>
                     <div class="listBackgroundView" :id="'listBgView' + list._id" v-if="this.isBtmViewVisible(list)">
                     <div class="cardAndFooterContainer">
                        <!-- <RouterLink :to="`/b` + this.board._id + `/c` +  card._id"  style="text-decoration: none; color: inherit;"> -->
                        <DraggableView v-model="list.cards" 
                             group="allCards" 
                             item-key="id"
                             drag-class="drag"
                             ghost-class="ghost"
                             @change="onCardMoved">
                           <template #item="{element}">
                            <CardView :card="element" :boardId="this.board.id" :tags="this.getCardTags(element)"></CardView>
                           </template>
                       </DraggableView>
                      <!-- </RouterLink> -->
                        <div v-if="list.isCreateCard == true" class="createListContainer">
                            <textarea name="text" v-model="newCardName" @input="autoGrow(index)" placeholder="Give your card a name" class="addListInputField" :id="`newCardField_` + index"></textarea>
                            <button v-if="isSavingCard" class="addListBtn buttonload">
                               <i class="fa fa-circle-o-notch fa-spin"></i> Adding... 
                            </button>
                           <button v-else class="addListBtn" @click="handleCreateCard(list, index)">Add Card</button>
                        </div>
                      <!-- <div v-else v-if="list.cards != null && list.cards.length > 0 || list.isAddCard == true" class="listFooterView" @click="handleAddCard(list, index)">
                        <span id="addIcon" class="material-symbols-outlined">add</span>
                        <div class="footerTitleContainer">
                            <button class="addCardLabel">New Card</button>
                        </div>
                       </div> -->
                        
                      
                    </div>
                    
                 </div>
                   <div class="bottomView" :id="'bottomView_' + list._id" v-if="this.isBtmViewVisible(list)">
                       <div v-if="list.isCreateCard == true" class="createListTipFooterView">
                            <!-- <textarea name="text" v-model="newCardName" @input="autoGrow(index, list)" placeholder="Give your card a name" class="addListInputField" :id="`newCardField_` + index"></textarea>
                            <button v-if="isSavingCard" class="addListBtn buttonload">
                               <i class="fa fa-circle-o-notch fa-spin"></i> Adding... 
                            </button>
                           <button v-else class="addListBtn" @click="handleCreateCard(list, index)">Add Card</button> -->
                        </div>
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
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import DraggableView from 'vuedraggable'
import CardView from '@/views/CardView.vue'
import BoardNavItemsView from './BoardNavItemsView.vue'
import APIService from '@/APIService';

import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { BASE_URL, USER_CACHE_KEY } from '@/config'
import axios from 'axios';

export default {
    inject: ["eventBus", "cryptojs"],
    props: ["isExpanded"],
    components: {
        NavBar, CardView, DraggableView, BoardNavItemsView
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
        return { 
            isSideBarExpanded, board, dblists, allLists, newCardName, newListName, isCardTapped, currentUser,
            boardId, selectedCard, selectedList, allCards, isSavingCard, allBoardTags, isRefreshBoard
        }
    },
    methods: {
        handleSearchBoard(searchText) {
            if (searchText.length > 0) {
               var searchLists = []
               let searchKey = searchText.toLowerCase()
               searchLists = this.allLists
               for (var index in searchLists) {
                  let list = searchLists[index]
                  if (list != undefined) {
                    console.log('list: ', list)
                  let cards = list.cards
                  let cardFilter = cards.filter(card => card.cardName.toLowerCase().includes(searchKey))
                  if (cardFilter.length > 0) {
                    searchLists[index].cards = cardFilter
                  } else {
                    searchLists = searchLists.filter(x => x._id !== list._id)
                  }
                  }
               }
               console.log("handle search: ", searchText.length, 'searchLists card count: ')
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
          if (response.data != null) {
            let data = response.data
            if (data.statusCode == 200) {
                console.log("list and card info updated: ", data.resp)
              }
             }
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
        // this.getBoardBy(this.boardId)
      }

      if (e.moved != null) { // moved: moved within the same list
        let listId = e.moved.element.listId
        console.log("moved: ", e.moved.element, "listId: ", listId)
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
    },
        handleOverlayDismissed() {
            this.isRefreshBoard = true
            this.$router.go(-1)
            // this.getBoardBy(this.boardId)
        },
        handleCardTapped(card, list) {
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
          owner: "1721545684258"
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
            element.style.height = (element.scrollHeight) + "px";
        },
       async handleCreateCard(list, index) {
          var params = {
             cardName: this.newCardName,
             boardId: this.boardId,
             listId: list.id,
             id: Date.now(), 
             owner: "1721545684258"
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
        console.log("current user: ", this.currentUser)
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
        console.log("board: ", boardResp)
        if (apiBoard != null) {
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
               console.log('dblists card count: ', this.dblists.map(x => x.cards.length))
            } else {
                console.log("You're not part of this board, request invitation from the owner")
                this.$router.push({path: '/home'}) 
            }
        } else {
            this.$router.push({path: '/home'}) 
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
        }
    },  
    mounted() {
        APIService.init()
        let routeParams = this.$route.params
        console.log("main routeParams: ", routeParams)
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
    },
}
</script>
<style scoped>
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
    background-color: #FC6363;
    color: white;
    border-radius: var(--border-radius-1);
    margin-left: 8px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
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
    background-color: orange;
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
    height: calc(100vh - 70px);
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
    max-height: calc(100vh - 230px);
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
}

.mainBoardConentView {
    width: calc(100% - 10px);
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