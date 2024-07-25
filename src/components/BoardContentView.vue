<template>
    <div>
        <NavBar :isExpanded="this.isSideBarExpanded"/>
        <div class="boardBNavBar">

        </div>
        <div class="mainBoardConentView">
            <div class="boardListsContainer">
                 <div class="listContainer" v-for="(list, index) in this.board.lists" :key="list.id">
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
                     <div class="listHeaderView" :style="{display: list.headerType ==  `showListName` ? 'flex' : 'none'}">
                         <div class="badgeAndTitleContainer">
                            <div class="colorBadge"></div>
                            <label class="listNameLabel">{{ list.listName }}</label>
                         </div>
                         <label class="listNameLabel">•••</label>
                     </div>
                     <div class="cardAndFooterContainer">
                        <DraggableView v-model="list.cards" 
                             group="allCards" 
                             item-key="id"
                             drag-class="drag"
                             ghost-class="ghost"
                             @change="onCardMoved">
                           <template #item="{element}">
                            <CardView :card="element" @click="handleCardTapped(element, list)"></CardView>
                           </template>
                       </DraggableView>
                        <div v-if="list.isCreateCard == true" class="createListContainer">
                            <textarea name="text" v-model="newCardName" @input="autoGrow(index)" placeholder="Give your card a name" class="addListInputField" :id="`newCardField_` + index"></textarea>
                            <button v-if="isSavingCard" class="addListBtn buttonload">
                               <i class="fa fa-circle-o-notch fa-spin"></i> Adding... 
                            </button>
                           <button v-else class="addListBtn" @click="handleCreateCard(list, index)">Add Card</button>
                        </div>
                      <div v-else v-if="list.cards != null && list.cards.length > 0 || list.isAddCard == true" class="listFooterView" @click="handleAddCard(list, index)">
                        <span id="addIcon" class="material-symbols-outlined">add</span>
                        <div class="footerTitleContainer">
                            <button class="addCardLabel">New Card</button>
                        </div>
                       </div>
                      
                    </div>
                    
                 </div>

           </div>
        </div>
        <v-overlay  v-model="isCardTapped" class="align-center justify-center overLayContainer" contained>
            <CardDetailView :card="selectedCard" :list="selectedList" @overlayDismissed="handleOverlayDismissed"/>
        </v-overlay>
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import CardDetailView from '@/components/CardDetailView.vue'
import DraggableView from 'vuedraggable'
import CardView from '@/components/CardView.vue'
import { ref } from 'vue'

import { BASE_URL } from '@/config'
import axios from 'axios';

export default {
    props: ["isExpanded"],
    components: {
        NavBar, CardView, CardDetailView, DraggableView
    }, 
    setup() {
        var isSideBarExpanded = ref(true)
        var board = ref([])
        // var isCreateCard = ref(false)
        var isCardTapped = ref(false)
        var newCardName = ref("")
        var newListName = ref("")
        var boardId = ref("")
        var selectedCard = ref(Object)
        var selectedList = ref(Object)
        var allCards = ref([])
        return { isSideBarExpanded, board, newCardName, newListName, isCardTapped , boardId, selectedCard, selectedList, allCards}
    },
    methods: {
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
       let item = e.added || e.removedmoved; 
    //    if (e.added != null) {
    //     let listId = e.added.element.listId
    //     console.log("added: ", e.added.element, "listId: ", listId)
    //     let listIndex = this.board.lists.findIndex(x => x.id === listId);
    //     let list = this.board.lists[listIndex]
    //     let cards = list.cards // find card index
    //     console.log("section listName: ", list.listName)
    //     console.log("cards: ", cards)
    //     for (var index in this.board.lists) {
    //         var newList = this.board.lists[index]
    //         if (newList.id == listId) {
    //             console.log("loop listName: ", newList.listName)
    //         }
    //     }
    //    }

    if (e.removed != null) {
        for (var listIndex in this.board.lists) {
          var list = this.board.lists[listIndex]
          let list_id = list._id
          let listId = list.id
          if (list.cards.length > 0) {
            var cards = []
            var cardIds = []
             for (var cardPosition in list.cards) {
                let card = list.cards[cardPosition]
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
    },
        handleOverlayDismissed() {
            this.isCardTapped = false 
        },
        handleCardTapped(card, list) {
            console.log("selectedCard: ", this.selectedCard, this.selectedList)
            this.selectedCard = card
            this.selectedList = list
            this.isCardTapped = true 
        },
      async createANewList(list, index) {
        // this.board.lists = this.board.lists.filter(listItem => listItem.id != 'listPlaceholder');
        // this.board.lists[index] = { id: "newList", listName: this.newListName, headerType: "showListName", isAddCard: true, isCreateList: false, cards: [] }
        // this.board.lists.push(
        //    { id: "listPlaceholder", listName: "New List", headerType: "addList", isAddCard: false, isCreateList: false, cards: []}
        // )
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
        autoGrow(index) {
            let element = document.getElementById(`newCardField_` + index)
            element.style.height = "15px";
            element.style.height = (element.scrollHeight) + "px";
        },
       async handleCreateCard(list, index) {
            // if (list.id == "listPlaceholder") {
            //     list.cards = [
            //       {id: "cardOne", cardName: this.newCardName, subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, isAddCard: false, isCreateList: false, attachments: [File]}, 
            //     ]
            //    this.board.lists.push(
            //     { id: "listPlaceholder", listName: "Add New List", isAddCard: false, isCreateList: false, cards: []}
            //    )
            // } else {
            //     list.cards.push(
            //     {id: "cardOne", cardName: this.newCardName, subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "",isAddCard: false, isCreateList: false, progress: 0, attachments: [File]}, 
            // )
            // }
           
            // list.isCreateCard = false 
            // this.board[index] = list
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
        }, 
     async getBoardBy(boardId) {
        var params = {
            boardId: boardId
        }
        var fullURL = BASE_URL + "board/byId"
        console.log("full url: ", fullURL, "params: ", params)
        await axios.post(fullURL, params).then((response) => {
          if (response.data != null) {
            let data = response.data
            console.log("resp data: ", data)
            if (data.statusCode == 200) {
                let apiBoard = data.resp
                console.log("board info: ", apiBoard, "list length: ", "lists: ", apiBoard.lists)
                apiBoard.lists.push({ id: "listPlaceholder", listName: "Add New List", headerType: "addList", footerType: "add", isAddCard: false, isCreateList: false, cards: []})
                apiBoard.lists.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))
                for (var listIndex in apiBoard.lists) {
                    let cards = apiBoard.lists[listIndex].cards
                    this.allCards.push(cards)
                }
                this.board = apiBoard
              }
             }
          })
        }
    },
    watch: { 
        isExpanded: function(newVal, oldVal) {
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    },  
    mounted() {
        let routeParams = this.$route.params
        let boardId = routeParams.id
        this.boardId = boardId
        console.log("params id: ", boardId)
        this.getBoardBy(boardId)

    //     this.board = { id: "board1", lists: [
    //         { id: "listTwo", listName: "TASK", headerType: "showListName", cards: [
    //             {id: "cardOne", cardName: "[FGE TEAM] Upcoming Tasks and Bugs (Week 28, July 8 - July 12, 2024)", description: "", imgURL: "google.com", isAddCard: false, isCreateList: false, progress: 0, attachments: [File]}, 
    //         ]
    //        },  
    //        { id: "listPlaceholder", listName: "Add New List", headerType: "addList", footerType: "add", isAddCard: false, isCreateList: false, cards: []}
    //      ] 
    //    }
    }
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
}

.addCardLabel {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 15px;
    margin-left: 4px;
}
.cardAndFooterContainer {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 50px;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    padding-top: 8px;
}
.listFooterView {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
    width: 100%;
    border-radius: var(--border-radius-1);
    border: 1px solid var(--color-light);
    z-index: 9999;
    overflow: hidden;
    background-color: white;
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
}

.createListContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 140px; */
    width: 98%;
    padding-top: 10px;
    z-index: 9999;
    overflow: hidden;
    background-color: white;
    align-items: center;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: var(--border-radius-1)
}

.createNewList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 140px; */
    width: 98%;
    padding-top: 10px;
    z-index: 9999;
    overflow: hidden;
    background-color: white;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    border-radius: var(--border-radius-1)
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

.listNameLabel {
    height: 24px;
    font-weight: 600;
    font-size: 15px;
    margin-top: auto;
    margin-bottom: auto;
}
.colorBadge {
    width: 28px;
    height: 28px;
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
    height: 50px;
    width: 100%;
    border-radius:  var(--border-radius-1);;
    /* border-top-right-radius: var(--border-radius-2);
    border-top-left-radius: var(--border-radius-2); */
    border: 1px solid var(--color-light);
    padding-right: 15px;
    background-color: white;
}


.boardListsContainer {
    width: 100%;
    height: calc(100vh - 160px);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding-right: 20px;
}

.listContainer {
    width: 220px;
    /* background-color: #eee; */
    float: none;
    height: 100%;
    margin: 0 0.50%;
    display: inline-block;
    zoom: 1;
    /* overflow: hidden; */
    /* overflow-y: scroll; */
    overflow: hidden;
}

.mainBoardConentView {
    width: calc(100% - 10px);
    height: calc(100% - 130px);
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
}

.boardBNavBar {
    width: calc(100% - 30px);
    height: 50px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border-radius: var(--border-radius-1);
}
    
</style>