<template>
    <div v-if="isCreateTag" class="createTagView">
        <div class="createTagHeaderView">
            <img src="@/assets/back.png" class="backIcon" @click="handleGoBack">
            <label class="tagTitleLabel">Create Tags</label>
        </div>
        <v-text-field dense type="name" class="tagTitleField" v-model="tagTitleName" variant="outlined" label="Tag Name"></v-text-field>
        <label class="tagSampleLabel" :style="{'background-color': this.color}">{{ tagTitleName }}</label>
        <div class="colorPickerView">
            <div class="d-flex justify-center">
           <v-color-picker
              v-model="color"
              hide-inputs
              show-swatches
             ></v-color-picker>
            </div>
        </div>
        <button class="createTagBtn" @click="handleSaveTag" >Save Tag</button>
    </div>
    <div v-else class="allTagsView">
        <label class="tagTitleLabel">Board Tags</label>
        <div class="tagHistoryView">
            <div class="tagCell" v-for="(tag, index) in boardTags" :key="index">
                <v-checkbox v-model="tag.isChecked"    @change="valueChanged(tag)" class="checkBox"></v-checkbox>
                <label class="tagLabel" :style="{'background-color': tag.colorHex}">{{ tag.name }}</label>
                <img src="@/assets/edit.png" class="editIcon">
            </div>
        </div>
        <button class="newTagBtn" @click="handleAddNewTag" >Add New Tag</button>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: { boardTags: [Object]},
    setup() {
        var tags = ref([])
        var tagTitleName = ref("")
        var color = ref('#00BCD4')
        var isCreateTag = ref(false)
        var boardId = ref("")
        return { tags, tagTitleName, color, isCreateTag, boardId}
    }, 
    methods: {
      valueChanged(tag) {
        this.$emit('handleTagChanged', tag)
      },
       async handleSaveTag() {
         let tag = {
            name: this.tagTitleName, 
            color: this.color
         }
         this.$emit('handleSaveTag', tag)
         this.tagTitleName = ""
        },
        handleGoBack() {
            this.isCreateTag = false
            // update the tags
            // fetch and update tags
            this.$emit('refreshTags')
        },
        handleAddNewTag() {
            this.isCreateTag = true 
        }
    },
    watch: { 
        boardTags(newVal, oldVal) { 
        //    this.boardId = newVal
        }
    },
    mounted() {
        this.tags = [1, 2, 3, 4, 5, 6]
    }
}
</script>
<style scoped>
.createTagHeaderView {
    display: flex;
}
.backIcon {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-top: 12px;
}
.editIcon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.tagHistoryView {
    margin-top: 20px;
    height: 480px;
    overflow-y: scroll;
}
.checkBox {
    margin-top: 20px;
    margin-left: 8px;
}
.tagCell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.tagTitleLabel {
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
}
.createTagBtn, .newTagBtn { 
  margin-top: 10px;
  margin-bottom: 10px;
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
.newTagBtn {
    bottom: 0;
}

.tagSampleLabel, .tagLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 270px;
    color: white;
    text-align: center;
    font-weight: 600;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 20px;
    border-radius: var(--border-radius-1);
}
.tagLabel {
    width: 190px;
    margin-bottom: 8px;
    margin-top: 5px;
    margin-left: 8px;
}
.tagTitleField {
  padding: 0;
  margin: 0;
  width: 270px;
  max-height: 34px;
  object-fit: contain;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  border: 0px solid var(--color-light-primary) !important;
  border-color: var(--color-light-primary);
}
.colorPickerView {
    width: 100%;
    height: 400px;
    margin-right: auto;
    margin-left: auto;
    overflow-y: hidden;
}
.createTagView, .allTagsView {
    display: flex;
    flex-direction: column;
}

.allTagsView {
    background-color: aqua;
    height: 300px;
}
    
</style>