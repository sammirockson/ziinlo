
<template>
    <el-tiptap v-if="extensions.length > 0" :extensions="extensions" @onUpdate="onEditorUpdate" :enableCharCount="false" :content="content" placeholder="Write something ..."/>
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
    Blockquote,
    ListItem,
    BulletList, // use with ListItem
    OrderedList, // use with ListItem
    TodoItem,
    TodoList, // use with TodoItem
    TextAlign,
    Indent,
    HorizontalRule,
    HardBreak,
    History,
    Fullscreen,
    CodeView
    // SelectAll,
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
          BulletList,
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
  

<style lang="scss">
// .el-tiptap-editor__menu-bar:before {
//     background-color: red !important;
// }

</style>