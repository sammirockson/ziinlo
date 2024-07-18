<template>
    <div class="chat">
        <NavBar :isExpanded="this.isSideBarExpanded"/>

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
            console.log('Prop changed isSideBarExpanwded: ', newVal)
            this.isSideBarExpanded = newVal
        }
    },  
}
</script>
<style scoped>
 .chat {
   background-color: orangered;
 }
</style>