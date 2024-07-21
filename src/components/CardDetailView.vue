<template>
    <div class="card">
        <div class="cardInfoContainer">

        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["board"],
    setup() {
        return {}
    }, 
    // watch: { 
    //     list: function(newVal, oldVal) { 
    //       console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    //     }, 
    //     index: function(newVal, oldVal) {
    //         console.log('Prop changed isSideBarExpanwded: ', newVal)
    //     }
    // },
    methods: {
        handleCreateList() {
            if (this.list.id == "listPlaceholder") {
                this.list.id = "newList"
                this.list.cards = [
                  {id: "cardOne", cardName: this.newCardName, subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "google.com", progress: 0, attachments: [File]}, 
                ]
               this.board.lists.push(
                { id: "listPlaceholder", listName: "Add New List", cards: []
                }
               )
            } else {
                this.list.cards.push(
                {id: "cardOne", cardName: this.newCardName, subTitle: "Meet up to discuss early stage of the design", description: String, imgURL: "", progress: 0, attachments: [File]}, 
            )
            }
            this.$emit('newCardCreated', this.list)
            this.isCreateList = false
        }
    }
    // :style="{height: isCreateList ? '70px' : '96vh'}"
}
</script>
<style scoped>
.cardInfoContainer {
    width: 740px;
    height: 94vh;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 3vh;
    background-color: bisque;
    overflow-y: scroll;
}
 .card {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 96vh;
    background-color: white;
    margin-top: 3vh;
    margin-bottom: 1vh;
    border-radius: var(--border-radius-2);
 }
</style>