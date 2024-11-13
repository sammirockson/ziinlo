<template>
    <div class="nav-bar">
        <div class="logo-container">
            <img src="../assets/logo.png" class="logo-icon">
            <h1 class="brand-name-label">Ziinlo</h1>
        </div>
        <div class="nav-items">
            <div class="nav-item-cell" v-for="(item, index) in navItems" :key="item.id" @click="handleNavTapped(item)">
                <a href="#" :class="{ active: index === selectedIndex}">{{ item.title }}</a>
            </div>
        </div>
        <button class="contact-us" @click.prevent="handleLogin" :class="{'is-visible': isContactVisible}">Log In</button>
    </div> 
</template>

<script>
export default {
    props: {
        selectedIndex: {
            type: Number, 
            default: 0
        }, 
        isContactVisible: {
            type: Boolean, 
            default: true
        }
    },
    data() {
       return {
         navItems: [
           { title: 'Features', id: 'features' }, 
           { title: 'Templates', id: 'templates' }, 
           { title: 'Pricing', id: 'pricing' }, 
           { title: 'About US', id: 'about' }
         ]
       }
    },
    methods: {
        handleNavTapped(navItem) {
            this.$emit('didSelectNavItem', navItem)
        }, 
        handleLogin() {
            this.$router.push({path: '/login'})
        }
    }
}
</script>

<style lang="scss" scoped>
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
    button {
        opacity: 0;
        &.is-visible {
            opacity: 1;
        }
    }
}
</style>