<template>
    <div class="features">
        <div class="top-content-view">
        <img src="../assets/right-shape.png" alt="">
        <div class="center-info-container">
                <label class="main-title-label">The Ultimate Project <br>Management Solution</label>
                <label class="main-sub-title">Stay in complete control of your workflow with the ability to define each stage of work, providing you with a clear overview of what's important and identifying any bottlenecks or hurdles that may arise.</label>
                <div class="get-started-sales">
                    <button class="get-started-btn">Get started now</button>
                    <button class="see-how-btn">See how it works</button>
                </div>
        </div>
        <img src="../assets/left-shape.png" alt="">
   </div>
   <div class="project-snapshot">
         <div class="snap-bg">
            <img src="../assets/macbook-mockup.png" class="snpshot">
         </div>
    </div>
 </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.snpshot {
    height: 700px;
    object-fit: contain;
    border-radius: var(--border-radius-1);
}
.project-snapshot {
    margin-top: -150px;
    padding-top: 50px;
    height: 800px;
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