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
       <div class="conversation-list">
         <div class="convo-cell" v-for="(msg, index) in messages" :key="msg.id">
           <div class="bubble-container" v-if="isOdd(index)">
             <img class="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzBE_P3rPclK8gJnC-y1Mq7kNOvyL8yUHlg&s">
             <label v-if="msg.type === 'text'" v-html="msg.content" class="incoming-bubble"></label>
             <img class="image-file" v-else-if="msg.type === 'image'" :src="msg.imageURL">
             <videoplayer class="videoContainer" v-else-if="msg.type === 'video'" :src="msg.videoURL" controls="true" height="380" width="300" :autoplay="false" :isBorderCropped="false" ref="chatVideoPlayer"></videoplayer>
             <AttachmentCardView class="fileViewer" :class="{'is-outgoing': false}" v-else-if="msg.type === 'doc'" :attachment="msg.docAttachment"/>
            
           </div>
           <div class="outgoing-bubble-container" v-else>
             <img class="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzBE_P3rPclK8gJnC-y1Mq7kNOvyL8yUHlg&s">
             <label v-if="msg.type === 'text'" v-html="msg.content"></label>
             <img class="image-file" :class="{'is-outgoing': true}" v-else-if="msg.type === 'image'" :src="msg.imageURL">
             <videoplayer class="videoContainer" :class="{'is-outgoing': true}" v-else-if="msg.type === 'video'" :src="msg.videoURL" controls="true" height="380" width="300" :autoplay="false"  :isBorderCropped="false" ref="chatVideoPlayer"></videoplayer>
             <AttachmentCardView class="fileViewer" :class="{'is-outgoing': true}" v-else-if="msg.type === 'doc'" :attachment="msg.docAttachment"/>
           </div>
         </div>
       </div>

       <div class="bottom-input">
        <div class="attachment-sendbtn">
          <div class="add-attchment">
            <img src="../assets/add_image.svg" @click="handleAddImageFile">
            <img src="../assets/video_icon.svg" @click="handleAddVideoFile">
            <img src="../assets/doc_icon.svg" @click="handleAddDocs">
          </div>
          <img src="../assets/send.svg" @click="handleSendMsg">
        </div>
        <ChatInputField :readonly="readonly" @didUpdateEditor="didUpdateCommentEditor" v-on:keyup.enter="handleSendMsg" ref="msgeditor"/>
       </div>

       <input
          type="file"
          name="file"
          id="imageFileInput"
          class="hidden-input"
          @change="onImageChange"
          ref="imageFfile"
          accept=".jpg ,.jpeg ,.png"
        />
        <input type="file"
          name="file"
          id="videoFileInput"
          class="hidden-input"
          @change="onVideoChange"
          ref="videoFile"
          accept=".mp4, .mov"
        />
        <input
          type="file"
          name="file"
          id="docFileInput"
          class="hidden-input"
          @change="onDocChange"
          ref="docFile"
          accept=".docx, .pptx, .xlsx, .pdf, .zip, .rar"
        />
    </div>
  </div>
</template>

<script>
import ChatInputField from '@/components/ChatInputField.vue';
import Videoplayer from "@/components/Videoplayer.vue"
import FileViewer from '@/components/FileViewer.vue';
import AttachmentCardView from '@/components/AttachmentCardView.vue';
import _ from 'lodash';

export default {
  components: {
    ChatInputField, Videoplayer, FileViewer, AttachmentCardView
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
      ], 
      messages: [
        {content: "Some random text from my friend", type: 'text', id: 'msgOne'}, 
        {content: "New text from my friend", type: 'text', id: 'msgTwo'}, 
        {content: "Let us all send some cool messages", type: 'text', id: 'msgThree'}
      ], 
      currentMsg: null, 
      readonly: true, 
    }
  }, 
  methods: {
    onDocChange() {
      let file = this.$refs.docFile.files[0]
      if (file === null || file === undefined) {
         return 
      }
      const fileName = _.get(file, 'name')
      const fileSize = _.get(file, 'size')
      const fileType = fileName.split(".").pop()
      console.log('fileType: ', fileType, 'fileName: ', fileName)
      const docURLFile = this.generateURL(file)
      const docAttachment = {
        fileType: fileType.toLowerCase(), 
        fileURL: docURLFile, 
        fileName: fileName, 
        size: fileSize
      }
      let msgObj = { docAttachment: docAttachment, type: 'doc', id: 'msgDoc'}
      this.messages.push(msgObj)
      this.scrollToBottom()
    },
    onVideoChange() {
      let file = this.$refs.videoFile.files[0]
      if (file === null || file === undefined) {
         return 
      }
      const videoFileURL = this.generateURL(file)
      let msgObj = {videoURL: videoFileURL, type: 'video', id: 'msgVideo'}
      this.messages.push(msgObj)
      this.scrollToBottom()
      setTimeout(async ()=> {
        const videoPlayers = this.$refs.chatVideoPlayer
        for (var index in videoPlayers) {
          const vidPlayer = videoPlayers[index]
          vidPlayer.pause()
        }
      }, 300)
      // TODO: Upload to server and update local url
    },
    onImageChange() {
      let file = this.$refs.imageFfile.files[0]
      if (file === null || file === undefined) {
         return 
      }
      const imageFileURL = this.generateURL(file)
      console.log('file url: ', imageFileURL)
      let msgObj = { imageURL: imageFileURL, type: 'image', id: 'msgImage'}
      this.messages.push(msgObj)
      this.scrollToBottom()
      // TODO: Upload to server and update local url
    },
    handleAddDocs() {
      const docFileInput = document.getElementById("docFileInput")
      docFileInput.click()
    },
    handleAddVideoFile() {
      const videoFileInput = document.getElementById("videoFileInput")
      videoFileInput.click()
    },
    handleAddImageFile() {
      const imageFileInput = document.getElementById("imageFileInput")
      imageFileInput.click()
    },
    handleSendMsg() {
      this.readonly = true
      let msgObj = { content: this.currentMsg, type: 'text', id: 'msgAny'}
      this.messages.push(msgObj)
      this.currentMsg = 'none'
      this.scrollToBottom()
    },
    scrollToBottom() {
      setTimeout(async ()=> {
        this.$refs.msgeditor.clear('none');
        var convoList = document.getElementsByClassName('conversation-list')[0]
        convoList.scrollTop = convoList.scrollHeight;
        this.readonly = false
      }, 100)
    },
    didUpdateCommentEditor(msg) {
      this.currentMsg = msg
    },
    isOdd(index) {
      let results = index % 2
      return results === 1
    }, 
    generateURL(file) {
       let fileSrc = URL.createObjectURL(file);
      //  setTimeout(() => {
      //    URL.revokeObjectURL(fileSrc);
      //  }, 1000);
       return fileSrc;
    },
  }
}
</script>
<style lang="scss">
 .bubble-container {
   label, p {
     color: white;
   }
 }
</style>
<style lang="scss" scoped>
.conversation-list {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  max-height: calc(100% - 200px);
  overflow-y: scroll;
  .convo-cell {
    .bubble-container, .outgoing-bubble-container {
      padding: 0 15px 0 15px;
      display: flex;
      min-height: 30px;
      max-width: 90%;
      margin-bottom: 4px;
      gap: 10px;
      label {
        font-weight: 500;
        font-size: 14px;
        text-align: left;
        background-color: var(--color-dark-primary);
        padding: 10px 12px 10px 12px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        color: white;
      }
      .profile-image {
        height: 30px;
        width: 30px;
        border-radius: 4px;
      }
    }
    .outgoing-bubble-container {
       float: right;
       flex-direction: row-reverse;
      label {
        color: var(--dark-primary);
        background-color: orange;
        border-top-right-radius: 0;
        border-top-left-radius: 8px;
      }
    }
  }
  .image-file {
    height: 250px;
    width: 180px;
    object-fit: cover;
  }
  .fileViewer {
    height: 90px;
    width: 320px;
    background-color: var(--color-dark-primary);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    &.is-outgoing {
        background-color: orange;
        border-top-right-radius: 0;
        border-top-left-radius: 8px;
    }
  }
  .videoContainer {
    height: 380px;
    width: 300px;
  }
  .image-file, .videoContainer {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    &.is-outgoing {
      border-top-right-radius: 0;
      border-top-left-radius: 8px;
    }
  }
}

.bottom-input {
  position: relative;
  max-height: 300px;
  .attachment-sendbtn {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    z-index: 999;
    height: 40px;
    width: 540px;
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
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.chat-list::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
.search-container {
  display: flex;
  align-items: center;
  height: 60px;
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
        height: 60px;
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
 .hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
}

</style>