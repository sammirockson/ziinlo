<template>
    <div class="attachmentContainerView">
        <img src="@/assets/placeholder.png" class="imgPlaceholder">
    </div>
</template>
<script>
export default {
    setup() {
        return {}
    }
}
</script>
<style scoped>
.imgPlaceholder {
    width: 100%;
    height: 200px;
    object-fit: fill;
    overflow: hidden;
    border-top-right-radius: var(--border-radius-2);
    border-top-left-radius: var(--border-radius-2);
}
.attachmentContainerView {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>