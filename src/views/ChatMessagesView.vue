<template>
  <div class="chat-messages">
    <div class="all-chats">
      <div class="search-container">
        <div class="search">
          <img src="../assets/search.svg">
          <input placeholder="Search chats">
        </div>
        <img src="../assets/add.svg">
      </div>
      <div class="chat-list">
        <div class="chat-cell" v-for="chat in chats" :key="chat.id">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzBE_P3rPclK8gJnC-y1Mq7kNOvyL8yUHlg&s">
          <div class="name-last-message">
            <label>{{ chat.isGroup ? chat.groupName : chat.user }}</label>
            <span>Last message that was written</span>
        </div>
      </div>
      </div>
    </div>
    <div class="messages-container">
      <div class="chat-header-container">
        <label for="">Username here</label>
        <img src="../assets/vertical_dot.svg">
      </div>
       <div class="conversation-list"> </div>

       <div class="bottom-input">
        <div class="attachment-sendbtn">
          <div class="add-attchment">
            <img src="../assets/add_image.svg" alt="">
            <img src="../assets/video_icon.svg" alt="">
            <img src="../assets/doc_icon.svg" alt="">
          </div>
          <img src="../assets/send.svg" alt="">
        </div>
        <Editor />
       </div>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor.vue";
export default {
  components: {
    Editor
  },
  data() {
    return {
      chats: [
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
        {user: 'Jane Doe', id: 'chatOne', isGroup: false},
        {user: 'John Doe', id: 'chatTwo', isGroup: false},
        {user: 'Test', id: 'chatThree', isGroup: false},
        {user: 'Sam', id: 'chatFour', isGroup: true, groupName: 'Sunday Vibes'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-input {
  position: relative;
  .attachment-sendbtn {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    z-index: 999;
    height: 40px;
    width: 280px;
    right: 0;
    top: 8px;
    background-color: white;
   img {
    height: 30px;
    width: 30px;
   }
 }
 .add-attchment {
    display: flex;
    align-items: center;
    gap: 14px;
    img {
     height: 24px;
     width: 24px;
    }
  }
}
.conversation-list {
  height: calc(100% - 100px);
}
.chat-list {
  height: calc(100vh - 100px);
  overflow: scroll;
  padding-bottom: 40px;
}
.search-container {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 38px;
    background-color: var(--color-background);
    border-radius: 8px;
    padding-left: 10px;
    margin-top: 5px;
    img {
      height: 20px;
      width: 20px;
    }
    input {
      font-weight: 500;
      font-size: 14px;
    }
    input:focus {
      outline: none;
    }
  }
  img {
    height: 34px;
    width: 34px;
    margin-left: 10px;
    margin-top: 5px;
  }
}
.chat-messages {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: var(--color-background);
    .messages-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background-color: var(--color-background);
      .chat-header-container {
        display: flex;
        justify-content: space-between;
        height: 50px;
        width: 100%;
        padding: 0 15px 0 15px;
        align-items: center;
        font-weight: 600;
        background-color: white;
      }
    }
    .all-chats {
      width: 300px;
      height: 100%;
      background-color: white;
      border-right: 1px solid var(--color-info-light);
      .chat-cell {
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid var(--color-info-light);
        height: 64px;
        padding-left: 15px;
        padding: 0 10px 0 8px;
        img {
          height: 38px;
          width: 38px;
          object-fit: cover;
          border-radius: 4px;
        }
        .name-last-message {
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: start;
          gap: 5px;
          label {
            font-weight: 600;
            font-size: 15px;
          }
          span {
            font-weight: 400;
            font-size: 12px;
          }
          span, label {
            text-align: left;
            display: flex;
            max-height: 20px;
            overflow: hidden;
          }
        }
      }
    }
}

</style>