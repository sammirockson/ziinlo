<template>
    <div>
        <BoardContentView class="posContainer" :isExpanded="this.isExpanded" :style="{width: isExpanded ? 'calc(100vw - 250px)' : 'calc(100vw - 80px)'}"/>
    </div>
</template>
<script>
import { ref } from 'vue'
import BoardContentView from '@/components/BoardContentView.vue'
export default {
    name: "cardDetail",
    components: {
        BoardContentView
    }, 
    setup() {
        var isExpanded = ref(false)
        return { isExpanded }
    }
}
</script>
<style scoped>
.posContainer {
  height: 100%;
  width: calc(100vw - 250px);
  background-color: var(--color-background);
}
    
</style>