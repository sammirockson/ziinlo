<template>
    <div class="PopupOverlay" @click="handleOverlayTapped"/>
  </template>
  
  <script>
  export default {
    name: 'PopupOverlay', 
    methods: {
        handleOverlayTapped() {
            this.$router.go(-1)
        }
    }
  }
  </script>
  
  <style>
  .PopupOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  