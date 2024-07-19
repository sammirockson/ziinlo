<template>
    <div>
        <NavBar :isExpanded="this.isSideBarExpanded"/>
        <div class="boardBNavBar">

        </div>
        <div class="mainBoardConentView">
            <div class="boardListsContainer">
                 <div class="listContainer" v-for="(list, index) in this.board.lists" :key="list.id">
                     <div class="listHeaderView" :style="{display: list.id ==  `listPlaceholder` ? 'none' : 'flex'}">
                         <div class="badgeAndTitleContainer">
                            <div class="colorBadge"></div>
                            <label class="listNameLabel">{{ list.listName }}</label>
                         </div>
                         <label class="listNameLabel">•••</label>
                     </div>
                     <div class="cardAndFooterContainer">
                        <div class="cardContainer"  v-for="card in list.cards" :key="card.id">
                          <div class="cardCell">
                             <img src="@/assets/cardPhoto.png" class="cardImage">
                             <div class="dueDateContainer">
                             <img src="@/assets/clock.png" class="clockIcon">
                                 <label class="dueDateLabel">25 Feb 2024</label>
                             </div>
                             <label class="cardNameLabel">{{ card.cardName }}</label>
                             <div class="progressContainer">
                                <v-progress-linear
                                :location="false"
                                bg-color="#92aed9"
                                buffer-color="#92aed9"
                                color="#05C597"
                                height="10"
                                max="9"
                                min="0"
                                model-value="2"
                                rounded>
                             </v-progress-linear>
                             </div> 
                             <div class="viewMemberContainerView">
                             </div>
                          </div>
                        </div>
                      <div class="listFooterView" @click="handleAddCard(list, index)">
                        <span id="addIcon" class="material-symbols-outlined">add</span>
                        <div class="footerTitleContainer">
                            <button class="addCardLabel">New Card</button>
                        </div>
                       </div>
                    </div>
                    
                 </div>
           </div>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import { ref } from 'vue'
export default {
    props: ["isExpanded"],
    components: {
        NavBar
    }, 
    setup() {
        var isSideBarExpanded = ref(true)
        var board = ref([])
        return { isSideBarExpanded, board }
    },
    methods: {
        handleAddCard(list, index) {
            if (list.id == "listPlaceholder") {
                list.cards.push(
                 {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
               )
            } else {
                list.cards.push(
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
            )
            }
           
            this.board[index] = list
        }
    },
    watch: { 
        isExpanded: function(newVal, oldVal) {
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    },  
    mounted() {
        this.board = { id: "board1", lists: [
            { id: "listTwo", listName: "TASK", cards: [
                {id: "cardOne", cardName: "[Download portal] Upgrade to node18 & node-cms with vuetify", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "cardPhoto.png", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "[FGE TEAM] Upcoming Tasks and Bugs (Week 28, July 8 - July 12, 2024)", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
            ]
           }, 
           { id: "listTwo", listName: "DOING", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
            ]
           }, 
           { id: "listTwo", listName: "QA", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "RELEASE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "FEEDBACK", cards: [
            ]
           }, 
           { id: "listTwo", listName: "UPDATES", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
            ]
           }, 
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listPlaceholder", listName: "Add New List", cards: []
           }
         ] 
       }
    }
}
</script>
<style scoped>
.viewMemberContainerView {
    height: 50px;
    width: 100%;
    background-color: white;
    border-bottom-right-radius: var(--border-radius-1);
    border-bottom-left-radius: var(--border-radius-1);
}
.progressContainer {
    width: 90%;
    height: 34px;
    margin-left: 10px;
    margin-top: 10px;
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

.clockIcon {
    width: 14px;
    height: 14px;
}
.dueDateLabel {
    color: white;
    font-weight: 400;
    font-size: 14px;
    margin-left: 4px;
}
.dueDateContainer {
    width: 124px;
    height: 30px;
    margin-top: 8px;
    margin-left: 8px;
    border-radius: var(--border-radius-1);
    background-color: #FC6363;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cardImage {
    width: 100%;
    height: 150px;
    object-fit: fill;
}
.footerTitleContainer {
    width: auto;
    height: 24px;
    margin-top: 15px;
    overflow: hidden;
}
#addIcon {
    padding: 0;
    margin: 0;
    margin-top: 15px;
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
    /* margin-top: -10px; */
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
    border-bottom-right-radius: var(--border-radius-2);
    border-bottom-left-radius: var(--border-radius-2);
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
    border-top-right-radius: var(--border-radius-2);
    border-top-left-radius: var(--border-radius-2);
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