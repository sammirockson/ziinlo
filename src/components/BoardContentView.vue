<template>
    <div>
        <NavBar :isExpanded="this.isSideBarExpanded"/>
        <div class="viewTypes">

        </div>
        <div class="searchFilterContainer">
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
            { id: "listOne", listName: "Task", cards: [
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                {id: "cardOne", cardName: "Explore UI Design", subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}
            ]
           }, 
           { id: "listTwo", listName: "DEV", cards: [
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
           }
         ] 
       }
    }
}
</script>
<style scoped>

.searchFilterContainer {
    width: calc(100% - 30px);
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border-radius: var(--border-radius-1);
    border: 1px solid var(--color-light);
}
.viewTypes {
    width: calc(100% - 30px);
    height: 50px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border-radius: var(--border-radius-1);
}
    
</style>