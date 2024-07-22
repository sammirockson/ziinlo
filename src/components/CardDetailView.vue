<template>
    <div class="card" @click.self="handleOverlayClosed">
        <div class="cardInfoContainer">
             <div class="contentContainer"></div>
             <div class="controlsContainer">
             <label class="memberLabel">Members</label>
             <div class="membersContainer">
                <div class="memberCell" v-for="(index, member) in members" :key="member">
                   <img :src="require(index == 8 ? `@/assets/add.svg` : `@/assets/cardPhoto.png`)" class="memberPhoto">
                   <label class="memberNameLabel" v-if="index != 8">Name{{ member }}</label>
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
           
             </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import ButtonCard from '@/components/ButtonCard.vue'

export default {
    props: ["board", "card"],
    components: {
        ButtonCard
    },
    setup() {
        var members = ref([1, 2, 3, 4, 5, 6, 7, 8])
        return { members }
    }, 
    mounted() {
        
    },
    methods: {
        handleOverlayClosed() {
            console.log("close overlay tapped")
            this.$emit('overlayDismissed')
        }
    }
}
</script>
<style scoped>
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
    margin-left: -5px;
}
.memberPhoto {
    width: 30px;
    height: 30px;
    border-radius: var(--border-radius-1);
    object-fit: fill;
    overflow: hidden;
}
.memberLabel {
    display: flex;
    margin: 10px;
    margin-top: 20px;
    font-weight: 500;
    font-size: 14px;
}
.contentContainer {
    width: 550px;
    min-height: 94vh;
    background-color: white;
    border-top-left-radius: var(--border-radius-2);
    border-bottom-left-radius: var(--border-radius-2);
}
.controlsContainer {
    display: flex;
    flex-direction: column;
    width: 190px;
    min-height: 94vh;
    border-top-right-radius: var(--border-radius-2);
    border-bottom-right-radius: var(--border-radius-2);
    background-color: aliceblue;
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