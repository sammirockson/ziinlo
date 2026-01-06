<template>
    <div class="features">
        <div class="top-content-view">
        <img src="../assets/right-shape.png" alt="">
        <div class="center-info-container">
                <h1 class="main-title-label">The Ultimate Project <br>Management Solution</h1>
                <h2 class="main-sub-title">Stay in complete control of your workflow with the ability to define each stage of work, providing you with a clear overview of what's important and identifying any bottlenecks or hurdles that may arise.</h2>
                <div class="get-started-sales">
                    <button class="get-started-btn" @click="handleGetStarted">Get started now</button>
                    <button class="see-how-btn">See how it works</button>
                </div>
        </div>
        <img src="../assets/left-shape.png" alt="">
   </div>
   <div class="project-snapshot">
         <div class="snap-bg">
            <img src="../assets/mockshot.svg" class="snpshot">
         </div>
    </div>
    <div class="complex-work">
        <label for="">Manage Teams and Complex <br> Projects With Ease</label>
        <div class="img-showcase">
            <img src="../assets/board-showcase.svg" class="board-showcase">
            <img src="../assets/file-detail.svg" class="card-detail-showcase">
        </div>
    </div>
    <div class="simplify-workflow">
        <div class="left-text">
            <label class="workflow-label">Simplify Workflows,<br> Supercharge Results! <br></label>
            <span><br>We remove bottlenecks that hinder productivity,<br>allowing you to focus on what truly matters: achieving remarkable results.</span>
        </div>
     <img src="../assets/work-flow.png" class="workflow-img">
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
    methods: {
        handleGetStarted() {
            this.$emit('didTapGetStarted')
        }
    }
}
</script>

<style lang="scss" scoped>
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
.img-showcase:first-child,
.img-showcase:last-child {
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
    font-weight: 800;
    font-size: 70px;
    padding-top: 10px;
    line-height: 80px;
}
.top-content-view {
    display: flex;
    justify-content: space-between;
    height: 600px;
    width: 100vw;
    margin-top: 60px;
    padding-top: 50px;
    background-color: var(--color-light-yellow);
}

</style>