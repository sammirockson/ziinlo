<template>
    <div class="card" @click.self="handleOverlayClosed">
        <div class="cardInfoContainer">

        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ["board"],
    setup() {
        return {}
    }, 
    // watch: { 
    //     list: function(newVal, oldVal) { 
    //       console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    //     }, 
    //     index: function(newVal, oldVal) {
    //         console.log('Prop changed isSideBarExpanwded: ', newVal)
    //     }
    // },
    methods: {
        handleOverlayClosed() {
            console.log("close overlay tapped")
            this.$emit('overlayDismissed')
        }
    }
    // :style="{height: isCreateList ? '70px' : '96vh'}"
}
</script>
<style scoped>
.cardInfoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 740px;
    min-height: 94vh;
    margin-right: auto;
    margin-left: auto;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background-color: bisque;
    border-radius: var(--border-radius-2);
    z-index: 999999999999;
    /* overflow-y: scroll; */
}
 .card {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow-y: scroll;
    /* display: flex;
    flex-direction: column;
    width: 800px;
    height: 96vh;
    background-color: white;
    margin-top: 3vh;
    margin-bottom: 1vh;
    border-radius: var(--border-radius-2); */
 }
</style>