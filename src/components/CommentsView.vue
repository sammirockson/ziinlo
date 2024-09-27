<template>
    <div class="commentsView">
        <div class="commentsCell" v-for="(comment, index) in allCardComments" :key="index">
            <img :src="comment.commenter.picture" class="profileImage">
            <div class="commentContainer">
              <div class="profileNameAndDateView">
              <label class="commenterLabel">{{ comment.commenter.fullName }}</label>
              <label class="commentDateLabel">{{ getDateFormat(comment.createdAt) }}</label>
              </div>
              <div class="commentContentView">
                <p v-html="comment.content"></p>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import Dayjs from 'dayjs';
export default {
    props: {
        allCardComments: {
            type: [Object], 
            default: []
        }
    }, 
    methods: {
        getDateFormat(createdAt) {
            let date = Dayjs(createdAt)
            let today = new Date()
            let isAfterToday = date.isAfter(today, 'day')
           return isAfterToday ? Dayjs(createdAt).format('DD-MM-YYYY ddd HH:mm A') : Dayjs(createdAt).format('ddd HH:mm A') 
        }
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

.commentContentView p {
    display: flex;
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
    overflow: hidden;
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