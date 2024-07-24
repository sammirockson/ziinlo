<template>
    <div class="card" @click.self="handleOverlayClosed">
        <div class="cardInfoContainer">
             <div class="contentContainer">
                <label class="listNameContainer" id="listNameLabel">{{ list.listName }}</label>
                <textarea type="text"  @input="autoGrow()" class="cardNameField" id="cardNameId" v-model="card.cardName"></textarea>
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

             <label class="memberLabel">Action</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Assign"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Move"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Copy"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Delete"/>

             <label class="memberLabel">Manage</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Tags"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Due Date"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Poll"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Checklist"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Attachments"/>
             <label class="memberLabel">Connect</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Share"/>
             </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import ButtonCard from '@/components/ButtonCard.vue'

export default {
    props: ["board", "card", "list"],
    components: {
        ButtonCard
    },
    setup() {
        var members = ref([1, 2, 3, 4, 5, 6, 7, 8])
        return { members }
    }, 
    mounted() {
        // let listNameLabel = document.getElementById("listNameLabel")
        // let width = (listNameLabel.clientWidth + 20)  + "px"
        // console.log("width: ", width)
        // listNameLabel.style.width = width
        // element.style.width = (element.scrollHeight) + "px";
    },
    methods: {
        autoGrow() {
            let element = document.getElementById("cardNameId")
            element.style.height = "15px";
            element.style.height = (element.scrollHeight) + "px";
        },
        handleOverlayClosed() {
            console.log("close overlay tapped")
            this.$emit('overlayDismissed')
        }
    }
}
</script>
<style scoped>
.listNameContainer {
    display: block;
    height: 30px;
    min-width: 100px;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: var(--border-radius-1);
    background-color: red;
}
.cardNameField {
    display: flex;
    font-size: 24px;
    font-weight: 700;
    resize: none;
    color: var(--color-dark);
    margin-top: 10px;
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
    margin-top: 34px;
    font-weight: 500;
    font-size: 14px;
}
.memberLabel {
    display: flex;
    margin: 10px;
    margin-top: 20px;
    font-weight: 500;
    font-size: 14px;
}
.contentContainer {
    display: flex;
    flex-direction: column;
    width: 550px;
    min-height: 100vh;
    /* min-height: 94vh; */
    background-color: white;
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
    /* background-color: aliceblue; */
}
.membersContainer {
    display: grid;
    grid-template-columns: repeat(4, 40px);
    grid-template-rows: repeat(4, 66px);
    width: 160px;
    min-height: 120px;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    padding-right: 20px;
    margin-top: 4px;
}

.cardInfoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 740px;
    min-height: 94vh;
    margin-right: auto;
    margin-left: auto;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background-color: white;
    z-index: 999999999999;
    border-radius: var(--border-radius-2);
    /* overflow-y: scroll; */
}
 .card {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow-y: scroll;
 }
</style>