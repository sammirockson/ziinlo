<template>
    <div class="commentsView">
        <div class="commentsCell" v-for="(item, index) in comments" :key="index">
            <img src="https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2022/12/shutterstock_781327003-1.jpg" class="profileImage">
            <div class="commentContainer">
              <div class="profileNameAndDateView">
              <label class="commenterLabel">Samuel Rockson</label>
              <label class="commentDateLabel">Thur 11:44PM</label>
              </div>
              <div class="commentContentView">
                <label for="">{{ item }}</label>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        var comments = ref(["The list of nameplates form LVDB for a market should reflect for mapping under “Ford Protect”.", "two", "three", "four", "five"])
        return { comments }
    }
}
</script>
<style scoped>
.commentDateLabel {
    font-weight: 500;
    font-size: 13px;
    color: var(--color-dark);
}
.commenterLabel {
    font-weight: 600;
    font-size: 16px;
    color: var(--color-card-title);
}

.commentContentView label {
    font-weight: 500;
    font-size: 15px;
    display: flex;
    text-align: left;
    padding: 8px;
    background-color: var(--color-background);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-top: 4px;
    margin-bottom: 10px;
}
.profileNameAndDateView {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.commentContainer {
    display: flex;
    flex-direction: column;
    width: calc(100% - 34px);
    padding-left: 10px;
}
.profileImage {
    height: 34px;
    width: 34px;
    border-radius: 17px;
}
.commentsCell {
    display: flex;
    margin-bottom: 10px;
}

.commentsView {
    padding-top: 10px;
}
    
</style>