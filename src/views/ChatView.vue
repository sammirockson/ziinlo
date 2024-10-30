<template>
    <div class="chat">
        <div class="contact-view"></div>
        <div class="chat-view"></div>
        <div class="right-info-view"></div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBarView.vue'
import { ref } from 'vue'
export default {
    props: ["isExpanded"],
    components: {
        NavBar
    }, 
    setup() {
        var isSideBarExpanded = ref(true)
        return { isSideBarExpanded }
    },
    watch: { 
        isExpanded: function(newVal, oldVal) {
            this.isSideBarExpanded = newVal
        }
    },  
}
</script>
<style scoped>
.chat-view {
    width: calc(100% - 560px);
    height: 100%;
    background-color: orangered;
}
.right-info-view {
    width: 280px;
    height: 100%;
    background-color: aliceblue;
}
.contact-view {
    width: 280px;
    height: 100%;
    background-color: blue;
}
 .chat {
    display: flex;
 }
</style>