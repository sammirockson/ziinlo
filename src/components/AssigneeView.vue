<template>
    <div class="boxCard">
        <img :src="imageIcon" class="iconImage">
        <label class="titelLabel">{{ title }}</label>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["title", "imageIcon"], 
    setup() {
        var isWatched = ref(false)
        return { isWatched }
    }
}
</script>
<style scoped>
.iconImage, .titelLabel {
    margin-top: auto;
    margin-bottom: auto;
}
.iconImage {
    width: 22px;
    height: 22px;
    object-fit: fill;
    border-radius: 11px;
}
.titelLabel {
  display: flex;
  margin-left: 8px;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-dark);
}
.boxCard {
  display: flex;
  height: 38px;
  background-color: var(--color-background);
  border-radius: 19px;
  margin-right: -12px;
  padding-right: 20px;
  margin-left: -12px;
  padding-left: 5px;
}
</style>