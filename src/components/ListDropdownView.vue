<template>
  <div class="list-dropdown">
    <label>List actions</label>
    <v-divider class="divider"></v-divider>
    <div class="list-options">
        <div class="list-cell" v-for="option, index in options" @click="handleOptionTapped(index)">
            {{ option }}
        </div>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        list: Object
    },
    data() {
        return {
            options: [
                "Add card", 
                "Move list",
                "Move cards",
                "Delete cards", 
                "Delete list"
            ]
        }
    }, 
    methods: {
        handleOptionTapped(index) {
            this.$emit('onListOptionTapped', index, this.list)
        }
    }
}
</script>

<style lang="scss" scoped>
.list-dropdown {
    padding: 10px 0 0 0;
    label {
     font-weight: 600;
     font-size: 14px;
     margin-top: 20px;
   }
   .list-options {
    padding-top: 8px;
   }
   .divider {
    margin-top: 10px;
   }
   .list-cell {
    cursor: pointer;
    text-align: left;
    margin-left: 15px;
     height: 20px;
     font-size: 13px;
     font-weight: 400;
     margin-top: 10px;
   }
   .list-cell:last-child {
    color: red;
   }
}

</style>