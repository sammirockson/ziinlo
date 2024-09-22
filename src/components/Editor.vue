
<template>
    <el-tiptap :extensions="extensions" @onUpdate="onEditorUpdate" :enableCharCount="false" :content="content" placeholder="Write something ..."/>
    <!-- <el-tiptap v-else :extensions="readOnlyExtension" @onUpdate="onEditorUpdate" :enableCharCount="false"  :content="content" readonly placeholder="Write something ..."/> -->
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
        isReadonly: {
            type: Boolean, 
            default: true 
        }, 
        content: {
            type: String, 
            default: ''
        }
    },
    watch: {
        isReadonly(newValue, oldValue) {
            // this.isEditable = newValue ? false : true
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
        // new Blockquote(),
        // new TextAlign(),
        // new BulletList({ bubble: true }),
        // new OrderedList({ bubble: true }),
        // new Indent(),
        // new HardBreak(),
        // new HorizontalRule({ bubble: true }),
        // new Fullscreen(),
        // new CodeView({
        //   codemirror,
        //   codemirrorOptions: {
        //     styleActiveLine: true,
        //     autoCloseTags: true
        //   }
        // }),
        // History
      ],
      readOnlyExtension: [
        Document,
        Text,
        Paragraph
      ],
      isEditable: false
    }), 
    methods: {
        onEditorUpdate(updatedContent) {
            console.warn('editor updated: ', updatedContent)
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