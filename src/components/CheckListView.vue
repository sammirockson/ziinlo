<template>
  <div class="check-list-container">
     <div class="header">
        <div class="header-left">
            <img src="../assets/checklisticon.png" alt="">
          <label for="">{{ checklist.name }}</label>
        </div>
        <button @click="handleDeleteCheckList(checklist)">Delete</button>
     </div>
     <v-progress-linear :model-value="progress" rounded="lg"></v-progress-linear>
     <div class="list-view">
        <div class="list-cell" v-for="(list, index) in checklist.lists">
            <v-checkbox v-model="checklist.lists[index].isChecked" @click="onCheckboxClicked(index)"></v-checkbox>
            <label for="">{{ list.name }}</label>
        </div>
     </div>
     <div class="add-list" v-if="isAddItem">
        <v-text-field type="text" class="textField" v-model="list" required variant="outlined" label="Add a list"></v-text-field>
        <div class="add-cancel">
            <button class="add-btn" @click="handleSaveItem" :disabled="list.length === 0" :class="{'is-disabled': list.length === 0}">Add</button>
            <button @click="handleCancel">Cancel</button>
        </div>
     </div>
     <button v-else @click="handleAddItem" class="add-list-btn">Add List</button>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
    props: {
        checklist: {
            type: Object
        }
    }, 
    data() {
        return {
            isAddItem: false, 
            list: ''
        }
    }, 
    computed: {
        progress() {
            let lists = this.checklist.lists
            let checkedLists = _.filter(lists, function(o) { return o.isChecked == true });
            let percentage = (checkedLists.length / lists.length) * 100
            return percentage
        }
    },
    methods: {
        handleDeleteCheckList() {
            this.$emit('onDeleteCheckList', this.checklist)
        },
        onCheckboxClicked(index) {
            let isChecked = this.checklist.lists[index].isChecked
            console.log('isChecked: ', isChecked)
            this.checklist.lists[index].isChecked = !isChecked
            this.$emit('onListChecked', this.checklist)
        },
        handleSaveItem() {
            let listItem = {
                isChecked: false,
                name: this.list,
                id: Date.now(), 
            }
            this.$emit('onAddListItem', listItem, this.checklist._id)
            this.list = ''
        }, 
        handleAddItem() {
            this.isAddItem = true 
        }, 
        handleCancel() {
            this.isAddItem = false
        }
    }
}
</script>

<style lang="scss" scoped>
.check-list-container {
    margin-bottom: 100px;
    min-height: 150px;
    // background-color: var(--color-light);
    margin-top: 20px;
    .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
            width: 24px;
            height: 24px;
        }
        label {
            font-weight: 700;
        }
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        margin-bottom: 10px;
        button {
            width: 70px;
            height: 32px;
            border-radius: 4px;
            background-color: var(--color-light);
        }
    }
    .add-list {
        padding-top: 20px;
        width: 500px;
    }
    .add-cancel {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .add-btn, .add-list-btn  {
        width: 70px;
        height: 32px;
        border-radius: 4px;
        color: white;
        background-color: var(--color-bar-dark);
        &.is-disabled {
            background-color: var(--color-light);
        }
    }
    .add-list-btn {
        width: 90px;
        height: 34px;
        float: left;
        margin-top: 20px;
    }
    .list-cell {
        display: flex;
        height: 40px;
        margin-bottom: 8px;
        
        label {
            margin-top: 15px;
            text-align: left
        }
    }
}

</style>