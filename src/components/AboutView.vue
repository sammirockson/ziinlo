<template>
  <div class="about-us">
    <NavBar :selectedIndex="3" @didSelectNavItem="didSelectNavItem"/>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        NavBar
    }, 
    methods: {
        didSelectNavItem(navItem) {
            if (navItem.id === 'templates') { // Template
                this.$router.push({path: '/templates'})
            } else if (navItem.id === 'pricing') { // Pricing
                this.$router.push({path: '/pricing'})
            } else if (navItem.id === 'features') { // About Page
                this.$router.push({path: '/'})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.about {
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: aquamarine;
}

</style>