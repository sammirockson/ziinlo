<template>
      <div class="sideContentView">
        <div class="topNav">
          <img src="@/assets/logo.png" class="logo">
          <label class="titleLabel">Ziinlo</label>
        </div>
        <div class="containerView">
         <table>
           <tbody>
              <tr>
                 <div class="tableRow" v-for="item in menuItems" :key="item.id" @click="handleRowClicked(item)" :class="{'is-active': item.id === selectedMenuId}">
                     <img :src="require(`../../src/assets/${item.icon}`)" class="menuIcon" :class="item.id">
                     <label class="menutTitleLabel">{{ item.name }}</label>
                 </div>
              </tr>
           </tbody>
         </table>
        </div>

        <div class="subscriptionPlanContainer">
            <label class="nameLabel">Upgrade Your Plan</label>
            <label class="roleLabel">Upgrade your plan today to unlock a world of enhanced features</label>
            <button> <img src="@/assets/seePlansActive.png" alt=""> See plans</button>
        </div>

        <v-dialog v-model="isLogginOut" max-width="400">
      <v-card
        text="Make sure all changes are saved else you will lose them"
        title="Are you sure you want to log out?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleCancelLogOut">No</v-btn>
          <v-btn @click="handleLogOut">Yes</v-btn>
        </template>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import { ref } from 'vue'
import { USER_CACHE_KEY } from '@/config'

export default {
    props: {
        selectedMenuId: {
            type: String, 
            default: ''
        }
    },
    setup() {
        var menuItems = ref([])
        var isLogginOut = ref(false)
        return { menuItems, isLogginOut}
    }, 
    mounted() {
        this.isCoverViewVisible = true 
    },
    methods: {
        handleLogOut() {
            this.isLogginOut = false 
            // this.$router.push({path: "/auth"})
              // log out user and go to login page
            localStorage.removeItem(USER_CACHE_KEY)
            this.$router.push({path: "/login"})
        },
        handleCancelLogOut() {
            this.isLogginOut = false 
        },
        handleLogoutTapped() {
            this.isLogginOut = true
        },
        handleRowClicked(item) {
            this.$emit('handleMenuTapped')
            this.selectedMenuItem = item.id
            var path = ''
            if (item.id === 'board') {
                path = '/boards'
            } else if (item.id === 'chat') {
                path = '/chat'
            } else if (item.id === 'attendance') {
                path = '/attendance'
            } else if (item.id === 'whiteboard') {
                path = '/whiteboard'
            }
            this.$router.push({path: path})
            // localStorage.setItem(SIDE_BAR_MENU_ITEM_KEY, item.id)
        }
    },
    mounted() {
        // whiteboard
        this.menuItems = [
            {name: "All Boards", id: "board", icon: "board.png"},
            {name: "White Board", id: "whiteboard", icon: "blackboard.png"},
            // {name: "Team Chat", id: "chat", icon: "chat.png"}, 
            // {name: "Attendance", id: "attendance", icon: "calendar.png"},
        ]
    }
}
</script>
<style lang="scss" scoped>
.dropDownArrow {
    width: 28px;
    height: 28px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 5px;
}
.nameLabel {
    font-weight: 600;
    font-size: 15px;
    margin-top: 2px;
    height: 34px;
}

.roleLabel {
    font-weight: 400;
    font-size: 12px;
    color: var(--color-info-dark);
    margin-bottom: 8px;
    height: 28px;
}

.nameRoleContainer label {
    text-align: left;
    margin-left: 8px;
    overflow: hidden;
}
.nameRoleContainer {
    height: 44px;
    width: 160px;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    column-gap: 8px;
    gap: 0;
}
.profileImage {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 5px;
    margin-top: auto;
    margin-bottom: auto;
}
.logoutContainer {
    display: flex;
    flex-direction: row;
    width: 200px;
    height: 50px;
    border: 1px solid var(--color-light);
    border-radius: 25px;
    position: absolute;
    bottom: 2rem;
}

.subscriptionPlanContainer {
    display: flex;
    flex-direction: column;
    width: 210px;
    height: 150px;
    position: absolute;
    bottom: 2rem;
}

.subscriptionPlanContainer button {
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-2);
    height: 48px;
    color: white;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 42px;
    padding-left: 42px;
    padding-top: 12px;
}

.subscriptionPlanContainer button img {
    width: 22px;
    height: 22px;
    object-fit: contain;
}

.menuIcon {
    width: 24px;
    height: 24px;
    color: null;
    object-fit: contain;
}

.menuIconActive {
    width: 24px;
    height: 24px;
}

.menuIconActive svg {
    color: var(--color-bar-dark);
}


.menutTitleLabelActive {
    font-weight: 700;
    padding-left: 8px;
    color: white;
}


.menutTitleLabel {
    font-weight: 500;
    color: var(--color-dark);
}

.menutTitleLabel, .menutTitleLabelActive {
    text-align: left;
    font-size: 16px;
    padding-left: 8px;
}

.tableRow {
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-2);
    &.is-active {
      background-color: var(--color-bar-dark);
      border-radius: var(--border-radius-2);
      label {
        color: white;
      }
     img {
        &.chat {
            content: url("../../src/assets/chatActive.png");
        }
        &.board {
            content: url("../../src/assets/boardActive.png");
        }
        &.attendance {
            content: url("../../src/assets/calendarActive.png");
        }
        &.whiteboard {
            content: url("../../src/assets/blackboardActive.png");
        }
     }
   }
}

.tableRowActive, .tableRow:hover {
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-2);
}

.tableRow:hover {
    label {
        color: white;
    }
    img {
        &.chat {
            content: url("../../src/assets/chatActive.png");
        }
        &.board {
            content: url("../../src/assets/boardActive.png");
        }
        &.attendance {
            content: url("../../src/assets/calendarActive.png");
        }
        &.whiteboard {
            content: url("../../src/assets/blackboardActive.png");
        }
    }
}

.tableRow, .tableRowActive {
    display: flex;
    flex-direction: row;
    height: 48px;
    width: 200px;
    margin-bottom: 10px;
    padding-left: 12px;
}

.containerView {
    padding-top: 50px;
    width: 210px;
    overflow: hidden;
}
.containerView table {
    width: 210px;
    overflow: hidden;
}

.coverView {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
}

.sideContentView {
    width: 240px;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
}

.topNav {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 15px;
    padding-left: 2px;
}

.logo {
  display: block;
  width: 34px;
  height: 34px;
  margin-left: 5px;
  object-fit: contain;
}

.titleLabel {
  font-weight: 700;
  font-size: 24px;
  margin-left: 8px;
}

</style>