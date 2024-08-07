<template>
    <div class="addCheckListView">
        <label for="">Add CheckList</label>
        <button v-if="isAdding" class="addBtn buttonload">
            <i class="fa fa-circle-o-notch fa-spin"></i>Adding... 
        </button>
      <button v-else class="addBtn" @click="handleUploadFile">Add Checklist</button>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        var isAdding = ref(false)
        return { isAdding }
    }
}
</script>
<style scoped>
.addCheckListView {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.addBtn { 
  margin-top: 40px;
  margin-bottom: 20px;
  width: 260px;
  height: 44px;
  margin-right: auto;
  margin-left: auto;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background-color: var(--color-bar-dark);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
}
    
</style>