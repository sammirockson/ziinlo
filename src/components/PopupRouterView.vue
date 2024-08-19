<template>
    <Portal to="popup">
      <PopupBase  @close="$router.back()">
        <slot name="backdrop" slot="backdrop"/>
        <slot/>
      </PopupBase>
    </Portal>
  </template>
  
  <script>
  import PopupBase from './PopupBase.vue';
  
  export default {
    name: 'PopupRouterView',
    components: {
      PopupBase,
    }
  }
  </script>
  