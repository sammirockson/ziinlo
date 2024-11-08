
<template>
    <el-tiptap :extensions="extensions" @onUpdate="onEditorUpdate" :v-model="editableContent" :enableCharCount="false" :content="editableContent" placeholder="Write something ..."/>
  </template>
  
  <script>
  import {
    Document,
    Text,
    Paragraph,
    Bold,
    Italic,
    Strike,
    Underline,
    Link,
    BulletList,
    OrderedList,
    TextAlign,
  } from "element-tiptap";

  export default {
    name: "ChatInput",
    props: {
      readonly: {
        type: Boolean, 
        default: true
      }
    },
    data: () => ({
      extensions: [
         Document,
         Text,
         Paragraph,
         Bold,
         Italic,
         Underline,
         Strike,
         TextAlign,
         Link,
         BulletList,
         Text,
         OrderedList, 
      ],
      editableContent: null
    }), 
    watch: { 
      editableContent(newVal, oldVal) { 
        console.log('watch newVal: ', newVal, 'oldVal: ', oldVal, 'editableContent: ', this.editableContent)
      }
    },
    methods: {
      clear(value) {
        console.log('calling child component')
        this.editableContent = value
        this.$forceUpdate()
      },
      onEditorUpdate(updatedContent) {
        this.$emit('didUpdateEditor', updatedContent)
      }
    }
  };
  </script>
  

<style lang="scss">
// .el-tiptap-editor__menu-bar:before {
//     background-color: red !important;
// }

</style>