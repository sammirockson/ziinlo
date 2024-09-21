
<template>
    <el-tiptap :extensions="extensions" :content="content" placeholder="Write something ..."/>
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
  
      content: ''
    })
  };
  </script>
  