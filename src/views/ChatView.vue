<template>
  <div class="chat-view">
    <div class="top-nav">
      <img src="../assets/menu_icon.png" class="menu-icon" @click="handleMenuTapped">
      <h1>Test Chat App</h1>
    </div>
    <div class="chat-content-view">
        <div class="left-chat-history">
          <div class="chat-file-fav">
            <div class="user-profile-container">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzBE_P3rPclK8gJnC-y1Mq7kNOvyL8yUHlg&s">
            </div>
            <div class="nav-cell" v-for="navType in navTypes" :key="navType.id" :class="{'is-active': navType.id === activeNavId}" @click="onNavTapped(navType.id)">
                <img :src="require(`@/assets/${navType.icon}`)">
                <label for="">{{ navType.title }}</label>
            </div>
          </div>
        </div>
        <ChatMessagesView v-if="activeNavId === 'chats'"/>
        <ChatFilesView v-else-if="activeNavId === 'files'"/>
        <ChatBookmarkView v-else-if="activeNavId === 'bookmark'"/>
        <div class="right-file-viewer"></div>
    </div>
    <v-layout>
        <v-navigation-drawer v-model="isMenuVisible" :width="isMenuVisible ? '100%' : '0'" class="pr-0 ma-0" border="0" temporary>
            <SideBarView selectedMenuId="chat"/>
        </v-navigation-drawer> 
      </v-layout>
  </div>
</template>
<script>
import SideBarView from '@/components/SideBarView.vue';
import ChatMessagesView from '@/views/ChatMessagesView.vue'
import ChatFilesView from './ChatFilesView.vue';
import ChatBookmarkView from './ChatBookmarkView.vue';
export default { 
  components: { SideBarView, ChatMessagesView, ChatFilesView, ChatBookmarkView },
  data() {
    return {
      isMenuVisible: false,
      activeNavId: 'chats',
      navTypes: [
        {title: 'Chats', id: 'chats', icon: 'conversation.svg'}, 
        {title: 'Files', id: 'files', icon: 'files.svg'}, 
        {title: 'Bookmarks', id: 'bookmark', icon: 'bookmark.svg'}
      ],
    }
  }, 
  methods: {
    onNavTapped(navTypeId) {
      this.activeNavId = navTypeId
    },
    handleMenuTapped() {
        this.isMenuVisible = true 
    }
  }
}
</script>
<style lang="scss" scoped>
.user-profile-container {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 34px;
    width: 34px;
    border-radius: 8px;
  }
}
.chat-content-view {
    display: flex;
    height: calc(100vh - 60px);
    width: 100vw;
    .left-chat-history {
        display: flex;
        width: 100px;
        height: 100%;
        background-color: white;
        border-right: 1px solid var(--color-info-light);
        .chat-file-fav {
          width: 100px;
          height: 100%;
          .nav-cell {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 70px;
            img {
              height: 24px;
              width: 24px;
            }
            label {
              font-weight: 400;
              font-size: 11px;
            }
            &.is-active {
             img {
              filter: invert(56%) sepia(40%) saturate(805%) hue-rotate(336deg) brightness(95%) contrast(92%);
             }
             label {
              color: var(--color-primary);
             }
            }
          }
        }
    }
    .center-messages-view {
        height: 100%;
        width: calc(100% - 350px);
        background-color: var(--color-background);
    }
    .right-file-viewer {
        width: 250px;
        height: 100%;
        background-color: white;
        border-left: 1px solid var(--color-info-light);
    }
}
.top-nav {
  display: flex;
  height: 60px;
  align-items: center;
  background-color: white;
  padding-left: 20px;
  gap: 15px;
  border-bottom: 1px solid var(--color-info-light);
  .menu-icon {
    width: 32px;
    height: 32px;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
  }
}
</style>