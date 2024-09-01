<template>
    <div class="features">
        <div class="top-content-view">
        <img src="../assets/right-shape.png" alt="">
        <div class="center-info-container">
                <label class="main-title-label">The Ultimate Project <br>Management Solution</label>
                <label class="main-sub-title">Stay in complete control of your workflow with the ability to define each stage of work, providing you with a clear overview of what's important and identifying any bottlenecks or hurdles that may arise.</label>
                <div class="get-started-sales">
                    <button class="get-started-btn" @click="handleGetStarted">Get started now</button>
                    <button class="see-how-btn">See how it works</button>
                </div>
        </div>
        <img src="../assets/left-shape.png" alt="">
   </div>
   <div class="project-snapshot">
         <div class="snap-bg">
            <img src="../assets/mockshot.png" class="snpshot">
         </div>
    </div>
    <div class="complex-work">

    </div>
    <div class="bridge-team-gap">

    </div>
    <div class="efficient">

    </div>
    <div class="supercharge">

    </div>
 </div>
</template>

<script>
export default {

    methods: {
        handleGetStarted() {
            this.$emit('didTapGetStarted')
        }
    }
}
</script>

<style lang="scss" scoped>
.efficient {
    height: 400px;
    background-color: white;
}
.bridge-team-gap {
    height: 400px;
    background-color: #a090f2;
}
.complex-work {
    height: 400px;
    background-color: var(--color-light-pink);
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