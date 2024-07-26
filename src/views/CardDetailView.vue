<template>
    <div class="card">
        <SideBarView class="sideBar" @handleMenuTapped="handleChangeContainer" :cachedMenuKey="this.containerType" :isExpanded="this.isExpanded" :style="{width: isExpanded ? '250px' : '90px'}"/>
        <BoardContentView class="posContainer" @cardDetailInfo="fetchedCardInfo"  :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    </div>
</template>
<script>
import { ref } from 'vue'
import BoardContentView from '@/components/BoardContentView.vue'
import SideBarView from '@/components/SideBarView.vue'
export default {
    name: "cardDetail",
    components: {
        BoardContentView, SideBarView
    }, 
    setup() {
        var isExpanded = ref(false)
        return { isExpanded }
    }, 
    methods: {
        fetchedCardInfo(cardData) {
            console.log("card final info data: ", cardData)
        }
    },
    mounted() {
        console.log("card loaded")
    }
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
}
.posContainer {
  height: 100%;
  width: calc(100vw - 250px);
  background-color: var(--color-background);
}
    
</style>