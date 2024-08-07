<template>
    <div class="cardContainer">
        <RouterLink :to="`/b/` + boardId + `/c/` +  card._id"  style="text-decoration: none; color: inherit;">
        <img v-if="card.attachments.length > 0 && (this.getImageFile(card.attachments) != null)" :src="this.getImageFile(card.attachments) == null ? '' : this.getImageFile(card.attachments).fileURL" class="cardImage">
        <div class="dueDateContainer" v-if="card.dueDate != null">
            <img src="@/assets/clock.png" class="clockIcon">
            <label class="dueDateLabel">{{ new Date(card.dueDate).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric'
            }) }}</label>
         </div>
        <div class="tagItemsView"> 
            <v-chip-group selected-class="text-primary" column>
              <v-chip v-for="tag in tags" :key="tag" style="border-radius: 8px; disable">
                <label class="tagLabel" :style="{'background-color': tag.colorHex}">{{ tag.name }}</label>
             </v-chip>
            </v-chip-group>
        </div>
            <label class="cardNameLabel">{{ card.cardName }}</label>
                <div v-if="card.progress != null" class="progressContainer">
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
                <div class="boardInfoView">
                    <img src="@/assets/eyeViews.png" class="boardIcon">
                    <label for="">4.7k</label>
                    <img src="@/assets/comments.png" class="boardIcon">
                    <label for="">20</label>
                    <img v-if="card.attachments.length > 0" src="@/assets/attachment.png" class="boardIcon">
                    <label v-if="card.attachments.length > 0" for="">{{ card.attachments.length }}</label>
                </div>
                <div class="membersContainer">
                    <span class="profileIcon"><img  src="https://picsum.photos/70"></span>
                    <span class="profileIcon"><img src="https://picsum.photos/80"></span>
                    <span class="profileIcon"> <img src="https://picsum.photos/90"></span>
                    <span class="profileIcon"> <img src="https://picsum.photos/100"></span>
                    <label for="">+99</label>
                </div>
            </div>
        </RouterLink>
    </div>
</template>
<script>
import { ref } from 'vue'
import moment from 'moment';

export default {
    props: ["card", "tags", "boardId"], 
    setup() {
        return { }
    }, 
    methods: {
        getImageFile(attachments) {
            let fileTypes = ["jpeg", "jpg", "png"]
            let imageAttachments = attachments.filter(x => fileTypes.includes(x.fileType));
            console.log("imageAttachments: ", imageAttachments.length)
            return imageAttachments.length > 0 ? imageAttachments[0] : null
        }
    },
}
</script>
<style scoped>
.tagLabel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    padding: 0;
    height: 40px;
    margin-right: -12px;
    margin-left: -12px;
    padding-right: 12px;
    padding-left: 12px;
    border-radius: var(--border-radius-1);
    color: white;
    font-weight: 600;
    background-color: #8B81F7;
}
.tagItemsView {
    padding-left: 10px;
    width: 100%;
}
.profileIcon img {
  border-radius: 50%;
  position: relative;
  margin-left: -12px;
  height: 18px;
  width: 18px;
  padding: 1px;
  background-color: white;
  margin-top: 4px;
}

.membersContainer {
    display: flex;
    width: 90px;
    height: 80px;
    float: right;
    padding-right: 10px;
    direction: ltr;  /* This is to get the stack with left on top */
    padding-left: 20px;
}

.membersContainer label {
    display: block;
    font-weight: 500;
    font-size: 10px;
    margin-left: 4px;
    margin-top: 6px;
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
    max-width: 120px;
    height: 50px;
    justify-content: space-evenly;
    margin-top: 5px;
}

.viewMemberContainerView {
    display: flex;
    height: 38px;
    width: 100%;
    margin-left: 8px;
    justify-content: space-between;
}
.progressContainer {
    width: 90%;
    height: 34px;
    margin-left: 10px;
    margin-top: 10px;
}
.cardNameLabel {
    display: flex;
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    white-space: pre-wrap;
    margin-bottom: 8px;
    color: var(--color-card-title);
}

.clockIcon {
    width: 14px;
    height: 14px;
}
.dueDateLabel {
    color: white;
    font-weight: 500;
    font-size: 13px;
    margin-left: 4px;
}
.dueDateContainer {
    /* width: 124px; */
    width: 140px;
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
    object-fit: contain;
    overflow: hidden;
}
.cardContainer {
    overflow: hidden;
    width: 220px;
    margin-right: auto;
    margin-left: auto;
    /* width: 220px; */
    min-height: 50px;
    margin-bottom: 10px;
    border: 1px solid var(--color-light);
    background-color: var(--color-card-background);
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-1);
}
    
</style>