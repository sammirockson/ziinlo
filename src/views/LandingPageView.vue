<template>
  <div class="landing-page">
    <NavBar :selectedIndex="0" @didSelectNavItem="didSelectNavItem"/>
    <div class="main-container">
        <LandingFeaturesView @didTapGetStarted="handleGetStarted"/>
    </div>
  </div>
</template>

<script>
import LandingFeaturesView from '@/components/FeaturesView.vue';
import PricingView from './PricingView.vue';
import TemplatesView from '../components/TemplatesView.vue';
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        LandingFeaturesView, PricingView, TemplatesView, NavBar
    },
    data() {
        return {
          
        }
    },
    mounted() {
        this.$gtag.event('Landing page mounted', {
        'event_category': 'landing',
        'event_label': 'User arrived on the landing page',
        'value': 1
       })
    }, 
    methods: {
        handleGetStarted() {
            this.$router.push({path: '/pricing'})
        }, 
        didSelectNavItem(navItem) {
            if (navItem.id === 'templates') { // Template
                this.$router.push({path: '/templates'})
            } else if (navItem.id === 'pricing') { // Pricing
                this.$router.push({path: '/pricing'})
            } else if (navItem.id === 'about') { // About Page
                this.$router.push({path: '/about'})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
footer {
    height: 500px;
    background-color: #111111;
}

.main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100vw;
    overflow-y: scroll;
}

.landing-page {
    height: 100vh;
    width: 100vw;
    background-color: white;
}

</style>