<template>
  <div class="move-card-container">
     <label for="">Move Card</label>
      <div class="field-container">
        <v-select label="From"
        :items="fromList"
        item-title="listName"
        item-value="id"
        v-model="selectedFromList"
    ></v-select>
    <v-select label="To"
        :items="toList"
        item-title="listName"
        item-value="id"
        v-model="selectedToList"
    ></v-select>
      </div>
      <button>Move</button>
  </div>
</template>

<script>
export default {
    props: {
        fromList: {
            type: [Object], 
            default: []
        }, 
        toList: {
            type: [Object], 
            default: []
        }
    },
    data() {
        return {
            selectedFromList: null, 
            selectedToList: null
        }
    }
}
</script>

<style lang="scss" scoped>
.move-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 340px;
    border-radius: 8px;
    padding-top: 20px;
    background-color: white;
    .field-container {
        padding-top: 20px;
        height: 280px;
        width: 300px;
    }
   button {
    width: 250px;
    height: 44px;
    color: white;
    background-color: var(--color-bar-dark);
    border-radius: 8px;
   }
}

</style>