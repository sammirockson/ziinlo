<template>
  <div class="landing-page">
    <div class="nav-bar">
        <div class="logo-container">
            <img src="../assets/logo.png" class="logo-icon">
            <label class="brand-name-label">Zinlo</label>
        </div>
        <div class="nav-items">
            <div class="nav-item-cell" v-for="item in navItems" :key="item.id" @click="handleNavTapped(item)">
                <a href="#" :class="{ active: item.id === selectedNavItem.id}">{{ item.title }}</a>
            </div>
        </div>
        <button class="contact-us">Contact Us</button>
    </div>
    <div class="main-container">
        <PricingView v-if="selectedNavItem.id == 'pricing'"/>
        <LandingFeaturesView v-else @didTapGetStarted="handleGetStarted"/>
    </div>
  </div>
</template>

<script>
import LandingFeaturesView from '@/components/LandingFeaturesView.vue';
import PricingView from './PricingView.vue';
export default {
    components: {
        LandingFeaturesView, PricingView
    },
    data() {
        return {
            navItems: [
            { title: 'Features', id: 'features' }, 
            { title: 'Templates', id: 'templates' }, 
            { title: 'Pricing', id: 'pricing' }, 
            { title: 'About US', id: 'about' }
          ], 
          selectedNavItem: {}
        }
    },
    mounted() {
        this.selectedNavItem = this.navItems[2]
    }, 
    methods: {
        handleNavTapped(navItem) {
            this.selectedNavItem = navItem
        }, 
        handleGetStarted() {
            this.selectedNavItem = this.navItems[2]
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100vw;
    overflow-y: scroll;
}
.nav-items a {
    text-decoration: none;
    color: var(--color-bar-dark);
    font-weight: 500;
    font-size: 16px;
    &.active {
        font-weight: 700;
    }
}
.nav-items {
    display: flex;
    gap: 50px;
}
.brand-name-label {
    font-weight: 700;
    font-size: 24px;
}
.logo-icon {
    width: 38px;
    height: 38px;
    object-fit: contain
}
.contact-us {
    width: 120px;
    height: 40px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    border-radius: var(--border-radius-1);
    background-color: var(--color-bar-dark);
}
.logo-container {
    display: flex;
    width: 180px;
    height: 50px;
    align-items: center;
    gap: 8px;
}
.nav-bar {
    position: fixed;
    z-index: 9999999;
    display: flex;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    background-color: var(--color-light-yellow);
    padding-left: 50px;
    padding-right: 50px;
    align-items: center;
}
.landing-page {
    height: 100vh;
    width: 100vw;
    background-color: white;
}

</style>