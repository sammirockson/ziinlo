<template>
    <div class="addCheckListView">
        <label for="">Add CheckList</label>
        <v-text-field type="text" class="textField" v-model="checklistTitle" required variant="outlined" label="Name your checklist"></v-text-field>
        <button v-if="isAdding" class="addBtn buttonload">
            <i class="fa fa-circle-o-notch fa-spin"></i>Adding... 
        </button>
      <button v-else class="addBtn" :disabled="checklistTitle.length == 0" :class="{'is-disabled': checklistTitle.length == 0}"@click="handleSaveCheckList">Add Checklist</button>
    </div>
</template>
<script>
import { ref } from 'vue'
import APIService from '@/APIService';
export default {
    props: {
        cardId: {
            type: String, 
            default: ''
        }
    },
    setup() {
        var isAdding = ref(false)
        var checklistTitle = ref('')
        return { isAdding, checklistTitle }
    }, 
    methods: {
        async handleSaveCheckList() {
            let params = {
                id: Date.now(), 
                name: this.checklistTitle, 
                cardId: this.cardId
            }
            await APIService.createNewChecklist(params)
            this.checklistTitle = ''
            this.$emit('didCreateCheckList')
        }
    }
}
</script>
<style lang="scss" scoped>
.addCheckListView {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 20px;


    .textField {
     width: 260px;
     max-height: 44px;
     font-weight: 500;
     font-size: 20px;
     border: 0px solid var(--color-light-primary) !important;
     border-color: var(--color-light-primary);
     margin: -100px 20px 10px 20px;
   }
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
  &.is-disabled {
    background-color: var(--color-light);
  }
}
    
</style>