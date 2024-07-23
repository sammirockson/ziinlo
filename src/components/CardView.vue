<template>
    <div class="cardContainer">
        <img v-if="card.attachments.count > 0" src="@/assets/cardPhoto.png" class="cardImage">
        <div class="dueDateContainer">
            <img src="@/assets/clock.png" class="clockIcon">
            <label class="dueDateLabel">25 Feb 2024</label>
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
                    <img src="@/assets/attachment.png" class="boardIcon">
                    <label for="">99</label>
                </div>
                <div class="membersContainer">
                    <span class="avatar"><img  src="https://picsum.photos/70"></span>
                    <span class="avatar"><img src="https://picsum.photos/80"></span>
                    <span class="avatar"> <img src="https://picsum.photos/90"></span>
                    <span class="avatar"> <img src="https://picsum.photos/100"></span>
                    <label for="">+99</label>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props: ["card"], 
    setup() {
        {}
    }
}
</script>
<style>
.avatar img {
  border-radius: 50%;
  position: relative;
  margin-left: -12px;
  z-index: 1;
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
    width: 120px;
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
    width: 200px;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    white-space: pre-wrap;
    margin-bottom: 8px;
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
.cardContainer {
    overflow: hidden;
    width: 220px;
    min-height: 50px;
    margin-bottom: 10px;
    border: 1px solid var(--color-light);
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-1);
}
    
</style>