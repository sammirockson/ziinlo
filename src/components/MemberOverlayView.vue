<template>
    <div class="memberOverlay">
        <input type="text">
        <label for="">Members</label>
        <div class="separatorLineView"/>
        <div class="membersList">
        </div>
    </div>
</template>
<script>
export default {
    setup() {

    }, 
    methods: {
        
    }
}
</script>
<style scoped>
.separatorLineView {
    height: 1px;
    width: 100%;
    margin-top: 150px;
    background-color: var(--color-light);
}
.memberOverlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: red;
}
</style>