
<template>
    <el-tiptap v-if="extensions.length > 0" :extensions="extensions" @onUpdate="onEditorUpdate" :enableCharCount="false" :content="content" readonly />
  </template>
  
  <script>
  import {
    Document,
    Text,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Link,
    Image,
    OrderedList, // use with ListItem
    TextAlign,
  } from "element-tiptap";

  export default {
    name: "Editor",
    props: { 
        content: {
            type: String, 
            default: ''
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
        Image,
        Text,
        OrderedList        
      ],
      isEditable: false
    }), 
    methods: {
        onEditorUpdate(updatedContent) {
            this.$emit('didUpdateEditor', updatedContent)
        }
    }
  };
  </script>
  

<style lang="scss" scoped>
.el-tiptap-editor__menu-bar:before {
    background-color: red !important;
}
</style>