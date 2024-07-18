<template>
    <div>
        <NavBar :isExpanded="this.isSideBarExpanded"/>
        <div class="boardBNavBar">

        </div>
        <div class="mainBoardConentView">
            <div class="boardListsContainer">
                 <div class="listContainer" v-for="list in this.board.lists" :key="list.id">
                     <div class="listHeaderView">
                         <div class="badgeAndTitleContainer">
                            <div class="colorBadge"></div>
                            <label class="listNameLabel">{{ list.listName }}</label>
                         </div>
                         <label class="listNameLabel">•••</label>
                     </div>
                     <div class="cardContainer"  v-for="card in list.cards" :key="card.id">
                          <div class="cardCell">
                          </div>
                     </div>
                     <div class="listFooterView">
                        <label class="listNameLabel">Add New Card</label>
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
    watch: { 
        isExpanded: function(newVal, oldVal) {
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    },  
    mounted() {
        this.board = { id: "board1", lists: [
            { id: "listTwo", listName: "TASK", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DOING", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "QA", cards: [
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
           { id: "listTwo", listName: "DONE", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }
         ] 
       }
    }
}
</script>
<style scoped>
.listFooterView {
    height: 50px;
    width: 100%;
    border-bottom-right-radius: var(--border-radius-1);
    border-bottom-left-radius: var(--border-radius-1);
    border: 1px solid var(--color-light);
    margin-top: -10px;
}
.cardCell {
    width: 100%;
    height: 200px;
    background-color: #eee;;
    margin-bottom: 10px;
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
    border-top-right-radius: var(--border-radius-1);
    border-top-left-radius: var(--border-radius-1);
    border: 1px solid var(--color-light);
    padding-right: 15px;
}


.boardListsContainer {
    width: 100%;
    height: calc(100vh - 160px);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}

.listContainer {
    width: 220px;
    /* background-color: #eee; */
    float: none;
    height: 100%;
    margin: 0 0.50%;
    display: inline-block;
    zoom: 1;
    overflow-y: scroll;
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