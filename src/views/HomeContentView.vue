<template>
    <div class="homeContent">
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
            this.isSideBarExpanded = newVal
        }
    },  
}
</script>
<style scoped>
.homeContent {
    background-color: aquamarine;
}
    
</style>