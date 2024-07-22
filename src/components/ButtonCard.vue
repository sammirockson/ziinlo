<template>
    <div class="buttonCard">
        <img :src="require(`@/assets/` + imageIcon)" class="iconImage">
        <label class="titelLabel">{{ title }}</label>
    </div>
</template>
<script>
export default {
    props: ["title", "imageIcon"], 
    setup() {
        
    }
}
</script>
<style scoped>
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