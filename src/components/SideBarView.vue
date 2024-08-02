<template>
    <div class="sideContentView">
        <div class="topNav">
        <img src="@/assets/logo.png" class="logo">
        <label class="titleLabel" :style="{display: isSideBarExpanded ? 'block' : 'none'}">Dashboard</label>
        </div>
        <div class="containerView" :style="{width: isSideBarExpanded ? '210px' : '80px'}">
        <table>
           <tbody>
              <tr v-for="item in menuItems" :key="item.id" @click="handleRowClicked(item)">
                 <div v-if="item.id == selectedMenuItem" class="tableRowActive"  :style="{width: isSideBarExpanded ? '210px' : '50px'}">
                    <img :src="require(`../../src/assets/${item.activeIcon}`)" class="menuIconActive">
                    <label class="menutTitleLabelActive" :style="{display: isSideBarExpanded ? 'block' : 'none'}">{{ item.name }}</label>
                 </div>
                 <div v-else class="tableRow">
                    <img :src="require(`../../src/assets/${item.icon}`)" class="menuIcon">
                    <label class="menutTitleLabel" :style="{display: isSideBarExpanded ? 'block' : 'none'}">{{ item.name }}</label>
                 </div>
              </tr>
           </tbody>
        </table>
        </div>

        <div class="logoutContainer" @click="handleLogoutTapped" :style="{width: isSideBarExpanded ? '200px' : '52px'}">
            <img src="@/assets/totalCustomers.png" class="profileImage">
            <div class="nameRoleContainer" :style="{display: isSideBarExpanded ? 'flex' : 'none'}">
                <label class="nameLabel">User Name</label>
                <label class="roleLabel">Admin/Member</label>
            </div>
            <img src="@/assets/arrow-down.png" class="dropDownArrow" :style="{display: isSideBarExpanded ? 'block' : 'none'}">
        </div>

        <div class="subscriptionPlanContainer" :style="{display: isSideBarExpanded ? 'flex' : 'none'}">
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
import { SIDE_BAR_MENU_ITEM_KEY, PICKMORE_MERCHANT_KEY, USER_CACHE_KEY } from '@/config'

export default {
    props: ["cachedMenuKey", "isExpanded"],
    setup() {
        var menuItems = ref([])
        var selectedMenuItem = ref("board")
        var isLogginOut = ref(false)
        var isSideBarExpanded = ref(false)
        return { menuItems, selectedMenuItem, isLogginOut, isSideBarExpanded}
    }, 
    methods: {
        handleLogOut() {
            this.isLogginOut = false 
            // this.$router.push({path: "/auth"})
              // log out user and go to login page
            localStorage.removeItem(USER_CACHE_KEY)
            this.$router.push({path: "/login"})
             // call log out API
        },
        handleCancelLogOut() {
            this.isLogginOut = false 
        },
        handleLogoutTapped() {
            this.isLogginOut = true
        },
        handleRowClicked(item) {
            this.selectedMenuItem = item.id
            this.$emit('handleMenuTapped', item.id)
            localStorage.setItem(SIDE_BAR_MENU_ITEM_KEY, item.id)
        }
    },
    watch: { 
        cachedMenuKey: function(newVal, oldVal) { 
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          this.selectedMenuItem = newVal
        }, 
        isExpanded: function(newVal, oldVal) {
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    },
    mounted() {
        // {name: "Home", id: "home", icon: "home.png", activeIcon: "homeActive.png"}, 
        // {name: "Settings", id: "setting", icon: "setting.svg", activeIcon: "setting_active.svg"}
        this.menuItems = [
            {name: "Board", id: "board", icon: "board.png", activeIcon: "boardActive.png"}, 
            {name: "Chat", id: "chat", icon: "chat.png", activeIcon: "chatActive.png"}, {name: "Calendar", id: "calendar", icon: "calendar.png", activeIcon: "calendarActive.png"},
        ]
    }
}
</script>
<style scoped>
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
    bottom: 8rem;
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
    border-radius: var(--border-radius-2);
    padding-top: 14px; 
}

.tableRowActive {
    background-color: var(--color-bar-dark);
    border-radius: var(--border-radius-2);
    padding-top: 12px; 
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

.sideContentView {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 10px;
    background-color: white;
}

.topNav {
    display: flex;
    flex-direction: row;
    padding-top: 15px;
    padding-left: 2px;
}

.logo {
  display: block;
  width: 30px;
  height: 30px;
}

.titleLabel {
  font-weight: 600;
  font-size: 20px;
  margin-left: 8px;
}

/* 
@media screen and (max-width: 1600px) {
    .titleLabel {
        display: none;
    }
    .menutTitleLabel, .menutTitleLabelActive, .dropDownArrow, .nameRoleContainer {
        display: none;
    }
    .tableRowActive {
        background-color: transparent;
    }

    .logoutContainer {
        width: 52px;
        margin-left: -8px;
    }
} */

</style>