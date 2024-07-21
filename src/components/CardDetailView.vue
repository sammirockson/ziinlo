<template>
    <div class="card">
        <div v-if="isCreateList" class="createListContainer">
            <input type="text" placeholder="Give your card a name" v-model="newCardName" class="addListInputField">
            <button v-if="isSavingCard" class="addListBtn buttonload">
                  <i class="fa fa-circle-o-notch fa-spin"></i> Adding... 
            </button>
            <button v-else class="addListBtn" @click="handleCreateList(list, index)">Add Card</button>
        </div>
        <div v-else class="cardInfoContainer">

        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["list", "board", "index"],
    setup() {
        var isCreateList = ref(true)
        var isSavingCard = ref(false)
        // var boardList = ref(Object)
        return { isCreateList, isSavingCard}
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
.addListBtn {
    width: 100px;
    height: 40px;
    background-color: #FC6363;
    color: white;
    border-radius: var(--border-radius-1);
    margin-left: 8px;
    font-size: 14px;
    font-weight: 600;
}
.addListInputField {
    padding-left: 10px;
    padding-right: 10px;
    height: 44px;
    width: 80%;
    margin-left: 8px;
    border: 1px solid var(--color-light);
    border-radius: var(--border-radius-1);
    font-weight: 500;
}
 .card {
    display: flex;
    flex-direction: column;
    width: 800px;
    min-height: 80px;
    max-height: 96vh;
    background-color: white;
    margin-top: 3vh;
    margin-bottom: 1vh;
    border-radius: var(--border-radius-2);
 }
 .createListContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 60px;
    width: 98%;
    z-index: 9999;
    overflow: hidden;
    background-color: white;
    align-items: center;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
}
</style>