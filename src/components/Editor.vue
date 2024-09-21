
<template>
    <el-tiptap :extensions="isReadonly ? readOnlyExtension : extensions" @onUpdate="onEditorUpdate" :enableCharCount="false" :content="content" placeholder="Write something ..."/>
    <!-- readonly -->
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
import { isReadonly } from "vue";
  
  export default {
    name: "Editor",
    props: {
        isReadonly: {
            type: Boolean, 
            default: true 
        }, 
        description: {
            type: String, 
            default: ''
        }, 
        content: {
            type: String, 
            default: ''
        }
    },
    watch: {
        isReadonly(newValue, oldValue) {
            console.log('isReadonly updated newValue: ', newValue, 'oldValue: ', oldValue)
            // this.isEditable = !this.isReadonly
        }
    },
    data: () => ({
      extensions: [
        Document,
        Text,
        Paragraph,
        // new Heading({ level: 5 }),
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
    //   content: '',
      isEditable: true
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
//     background-color: transparent !important;
// }

</style>