<template>
    <div class="templates-container">
        <div class="top-content-view">
        <img src="../assets/lists.png" class="icon">
        <div class="center-info-container">
                <h1 class="main-title-label">Supercharge Your Productivity<br>with Ready-to-Use Templates</h1>
        </div>
        <img src="../assets/doc-icon.png" class="icon">
   </div>
   <div class="templates">
    <h1 class="template-title-label">Find Templates</h1>
    <div class="template-list">
        <div class="template-cell" v-for="template in templates" :key="template">
            <img src="../assets/doc-icon.png" alt="">
            <label class="template-title">Basic To-Do List</label>
            <label class="emplate-subtitle">Simple and straightforward task management template for daily to-do lists</label>
            <button>Use Template</button>
        </div>
    </div>
   </div>
    <div class="supercharge">
        <div class="supercharge-content">
            <img src="../assets/left-claw.png" class="left-claw">
            <div class="supercharge-container">
                <label for="">
                    Supercharge Your Projects and Products<br>
                    with the Unmatched #1 Software<br>
                    in Management!"
                </label>
                <button class="getstarted-btn" @click="handleGetStarted">Get Started</button>
            </div>
            <img src="../assets/right-claw.png" class="right-claw">
        </div>
    </div>
    <FooterView />
 </div>
</template>

<script>
import FooterView from '@/views/FooterView.vue';
export default {
    components: {
        FooterView
   },
   data() {
    return {
        templates: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        ]
    }
   },
    methods: {
        handleGetStarted() {
            this.$emit('didTapGetStarted')
        }
    }
}
</script>

<style lang="scss" scoped>
.template-title {
    font-weight: 600;
    font-size: 24px;
}
.template-cell button {
    height: 40px;
    width: 80%;
    border: 1px solid var(--color-bar-dark);
    border-radius: var(--border-radius-1);
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 20px;
}
.template-cell img {
    height: 50px;
    width: 50px;
    object-fit: contain;
    margin-top: 20px;
}
.template-cell {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    height: 300px;
    width: 340px;
    background-color: var(--color-light);
    border-radius: 16px;
    align-items: center;
}
.template-list {
    display: grid;
    grid-template-columns: repeat(3, 340px);
    grid-template-rows: repeat(auto, 300px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    width: 920px;
    height: 900px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
}
.templates {
    padding-top: 20px;
    height: 1400px;
    background-color: white;
}
.icon {
    object-fit: contain;
    width: 60px;
    height: 60px;
}
.getstarted-btn {
    width: 120px;
    height: 40px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    border-radius: var(--border-radius-1);
    background-color: var(--color-bar-dark);
}
.supercharge-container {
    display: flex;
    flex-direction: column;
    width: calc(90% - 120px - 180px);
    align-items: center;
    justify-content: center;
}
.supercharge-content {
    display: flex;
    justify-content: space-between;
}
.right-claw {
    object-fit: contain;
    margin-top: 10px;
    width: 180px;
}
.left-claw {
    margin-top: 220px;
    height: 80px;
    width: 120px;
}
.supercharge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    background-color: #f5f5f5;
    .supercharge-content {
        background-color: #fcca46;
        width: 80%;
        height: 300px;
        border-radius: var(--border-radius-3);
    }
}
.left-text {
    width: 80%;
    padding-right: 10%;
    padding-left: 10%;
}
.workflow-label, .supercharge-container label {
    font-weight: 700;
    font-size: 44px;
    text-align: center;
    margin-bottom: 20px;
}
.supercharge-container label {
    font-size: 34px;
}
.left-text span {
    font-weight: 500;
    margin-top: 100px;
}
.workflow-img {
    width: 70%;
    height: 70%;
    object-fit: contain;
}
.simplify-workflow {
    display: flex;
    height: 600px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
}
.efficient {
    height: 400px;
    background-color: white;
}
.bridge-team-gap {
    height: 400px;
    background-color: #a090f2;
}
.complex-work {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 700px;
    background-color: var(--color-light-pink);
}
.complex-work label {
    font-weight: 700;
    font-size: 34px;
    margin-top: 20px;
}
.img-showcase:first-child,.img-showcase:last-child {
    object-fit: contain;
    height: 500px;
    overflow: hidden;
    border-radius: var(--border-radius-2);
}

.img-showcase {
    display: flex;
    margin-top: 10px;
}

.snpshot {
    width: 100%;
    height: 700px;
    object-fit: contain;
}
.project-snapshot {
    margin-top: -150px;
    padding-top: 10px;
    height: 900px;
    width: 100%;
    background-color: #111111;
}
.get-started-btn, .see-how-btn {
    width: 100%;
    background-color: var(--color-bar-dark);
    color: white;
    border-radius: var(--border-radius-1);
    font-weight: 600;
}

.see-how-btn {
    background-color: transparent;
    color: var(--color-bar-dark);
    border: 1px solid var(--color-bar-dark);
}

.get-started-sales {
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    width: 400px;
    height: 44px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
}
.main-sub-title {
    font-weight: 500;
    font-size: 18px;
    color: var(--color-dark);
}
.center-info-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.main-title-label {
    font-weight: 700;
    font-size: 60px;
    padding-top: 10px;
    line-height: 80px;
    width: 100%;
}
.top-content-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 400px;
    width: 100vw;
    margin-top: 60px;
    padding-right: 100px;
    padding-left: 100px;
    background-color: var(--color-light-yellow);
}

</style>