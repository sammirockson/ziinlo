<template>
    <div class="buttonCard">
        <img v-if="imageIcon != null" :src="require(`@/assets/` + imageIcon)" class="iconImage">
        <label class="titelLabel">{{ title }}</label>
        <v-checkbox v-if="this.isTracked != null" v-model="this.isWatched" class="checkBox"></v-checkbox>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["title", "imageIcon", "isTracked"], 
    setup() {
        var isWatched = ref(false)
        return { isWatched }
    }
}
</script>
<style scoped>
.checkBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    padding-top: 20px;
    float: right;
    margin-left: 20px;
}
.iconImage, .titelLabel {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
}
.iconImage {
    width: 22px;
    height: 22px;
    object-fit: contain;
}
.titelLabel {
  margin-left: 8px;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-dark);
}
.buttonCard {
  display: flex;
  width: 85%;
  height: 38px;
  background-color: var(--color-background);
  border-radius: var(--border-radius-1);
  margin-left: 8px;
  margin-bottom: 10px;
}
</style>