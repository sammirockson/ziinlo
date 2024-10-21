
<template>
    <el-tiptap :extensions="extensions" @onUpdate="onEditorUpdate" :enableCharCount="false" readonly :content="content"/>
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
    CodeView,
    BulletList
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
        BulletList,
        // Italic,
        // Underline,
        // Strike,
        TextAlign,
        Link,
        // Image,
        OrderedList     
      ]
    })
  };
  </script>
  

<style lang="scss">
.el-tiptap-editor__menu-bar:before {
    background-color: transparent !important;
}
</style>