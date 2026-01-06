<template>
    <div class="list-color-picker d-flex justify-space-around">
      <v-color-picker
       class="ma-2"
       swatches-max-height="400px"
       show-swatches
       v-model="selectedColor"
    ></v-color-picker>
    <img src="../assets/close-icon.png" @click="didCloseListColorPicker">
  </div>
</template>

<script>
export default {
    data() {
        return { selectedColor: "#FFA500" }
    }, 
    methods: {
        didCloseListColorPicker() {
            this.$emit('didCloseListColorPicker', this.selectedColor)
        }
    }
}
</script>

<style lang="scss" scopped>
.list-color-picker {
    height: 90vh;
    width: 450px;
    padding-top: 30px;
    border-radius: 8px;
    img {
        width: 34px;
        height: 34px;
    }
}
</style>