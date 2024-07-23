<template>
    <div class="card" @click.self="handleOverlayClosed">
        <div class="cardInfoContainer">
             <div class="contentContainer">
                <textarea type="text"  @input="autoGrow()" class="cardNameField" id="cardNameId" v-model="card.cardName"></textarea>
                <div class="profileTagInfoContainer">
                <img src="@/assets/cardPhoto.png" class="ownerProfile">
                <div class="profileInfoContainer">
                    <label class="onwerNameLabel">Samuel</label>
                    <label class="ownerRoleLabel">Admin</label>
                </div>
                <img src="@/assets/cardPhoto.png" class="assignedProfile">
                <div class="assignInfoContainer">
                    <label class="onwerNameLabel">Ricky Bob</label>
                    <label class="ownerRoleLabel">Assignee</label>
                </div>
                </div>

                <div class="profileTagInfoContainer">
                    <label class="listTagContainer">{{ list.listName }}</label>
                    <ButtonCard imageIcon="calendar.png" title="July 25 12:45PM" class="dueDateField"/>
                    <ButtonCard imageIcon="eyeViews.png" title="Tracking" class="dueDateField" isTracked="true">
                    </ButtonCard>
                    <!-- <img src="@/assets/calendar.png" class="ownerProfile"> -->
                    <!-- <div class="profileInfoContainer">
                    <label class="onwerNameLabel">July 25 12:45PM</label>
                    <label class="ownerRoleLabel">Due Date</label>
                </div> -->
                </div>
                <DescriptionViewFrom class="descriptionContainer"/>
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
             <ButtonCard imageIcon="invoice_icon.png" title="Track"/>

             <label class="memberLabel">Manage</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Tags"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Due Date"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Poll"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Checklist"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Attachments"/>
             <label class="memberLabel">Connect</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Share"/>
             <ButtonCard imageIcon="invoice_icon.png" title="Copy URL"/>
             <label class="memberLabel">Archive</label>
             <ButtonCard imageIcon="invoice_icon.png" title="Delete"/>
             </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import ButtonCard from '@/components/ButtonCard.vue'
import DescriptionViewFrom from '@/components/DescriptionViewForm.vue'

export default {
    props: ["board", "card", "list"],
    components: {
        ButtonCard, DescriptionViewFrom
    },
    setup() {
        var members = ref([1, 2, 3, 4, 5, 6, 7, 8])
        var isTracked = ref(true)
        return { members, isTracked }
    }, 
    mounted() {
        this.autoGrow()
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
.descriptionContainer {
    width: 98%;
    margin-left: auto;
    margin-right: auto;
}
.listTagContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    width: 140px;
    padding-right: 10px;
    padding-left: 10px;
    color: white;
    font-weight: 600;
    background-color: #8B81F7;
    border-radius: var(--border-radius-1);
    text-transform: uppercase;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: clip;
}
.dueDateField {
    width: 165px;
    margin-left: 10px;
}
.ownerRoleLabel {
    display: flex;
    font-weight: 700;
    font-size: 10px;
    overflow: hidden;
    text-align: center;
    color: var(--color-dark);
}
.onwerNameLabel {
    display: flex;
    font-weight: 700;
    font-size: 13px;
    overflow: hidden;
    text-align: center;
}
.ownerProfile, .assignedProfile {
    width: 32px;
    height: 32px;
    object-fit: fill;
    overflow: hidden;
    border-radius: var(--border-radius-1);
}

.assignedProfile {
    margin-left: 20px;
}
.profileInfoContainer, .assignInfoContainer {
    display: flex;
    flex-direction: column;
    height: 40px;
    margin-left: 5px;
}

.profileTagInfoContainer {
    display: flex;
    width: 100%;
    height: 50px;
    margin-top: 5px;
}
.cardNameField {
    display: flex;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    resize: none;
    color: var(--color-dark);
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
    margin-top: 24px;
    font-weight: 600;
    font-size: 14px;
}
.memberLabel {
    display: flex;
    margin: 10px;
    margin-top: 20px;
    font-weight: 600;
    font-size: 14px;
}
.contentContainer {
    display: flex;
    flex-direction: column;
    width: 550px;
    min-height: 94vh;
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
    padding-bottom: 30px;
    /* overflow-y: scroll; */
}
 .card {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow-y: scroll;
 }
</style>