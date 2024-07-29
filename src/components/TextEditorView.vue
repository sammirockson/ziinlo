<template>
    <div class="mx-5 my-3">
        <div class="commandContainer">
            <div v-for="(item, index) in commands" :key="index" class="btn-group" :class="{ 'border-right':borderRight(index)}">
            <button type="button" class="btn btn-sm btn-outline-secondary border-0 rounded-0" data-toggle="tooltip" data-placement="bottom" :title="item.title" @click="exec(item.command)">
                <i :class="'fa ' + item.icon"></i>
            </button>           
        </div>
        </div>
        <div class="editor border mt-2 pl-5" id="editor" contenteditable="true" @mouseup="getCurrentTagName"></div>
        <div class="mt-3">
            <button class="btn btn-outline-secondary rounded-0 border" @click="clear">Clear</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wysiwyg',
    mounted () {
        // $(function () {

        //     $('[data-toggle="tooltip"]').tooltip()

        // })

    },

    data () {
        return {
            commands : [
                { name: 'Bold', title: 'Bold', command: 'bold', icon: 'fa-bold' },

                { name: 'Italic', title: 'Italic', command: 'italic', icon: 'fa-italic' },

                { name: 'StrikeThrough', title: 'Strike Through', command: 'strikeThrough', icon: 'fa-strikethrough' },

                { name: 'Underline', title: 'Underline', command: 'underline', icon: 'fa-underline' },

                // { name: 'HorizontalLine', title: 'Horizontal Line', command: 'insertHorizontalRule', icon: 'fa-minus' },

                { name: 'AlignLeft', title: 'Align Left', command: 'justifyLeft', icon: 'fa-align-left' },

                { name: 'AlignJustify', title: 'Align Justify', command: 'justifyFull', icon: 'fa-align-justify' },

                { name: 'AlignCenter', title: 'Align Center', command: 'justifyCenter', icon: 'fa-align-center' },

                { name: 'AlignRight', title: 'Align Right', command: 'justifyRight', icon: 'fa-align-right' },

                // { name: 'FontSize', title: 'Font Size', command: 'fontSize', icon: 'fa-text-height' },

                // { name: 'Fonts', title: 'Fonts', command: 'fontName', icon: 'fa-font' },

                // { name: 'Heading', title: 'Heading', command: 'header', icon: 'fa-header' },

                { name: 'Paragraph', title: 'Paragraph', command: 'insertParagraph', icon: 'fa-paragraph' },

                { name: 'Undo', title: 'Undo', command: 'undo', icon: 'fa-undo' },

                { name: 'Redo', title: 'Redo', command: 'redo', icon: 'fa-repeat' },

                // { name: 'Copy', title: 'Copy', command: 'copy', icon: 'fa-copy' },

                // { name: 'Paste', title: 'Paste', command: 'paste', icon: 'fa-paste' },

                // { name: 'Cut', title: 'Cut', command: 'cut', icon: 'fa-cut' },

                { name: 'Subscript', title: 'Subscript', command: 'subscript', icon: 'fa-subscript' },

                { name: 'Superscript', title: 'Superscript', command: 'superscript', icon: 'fa-superscript' },

                { name: 'OrderedList', title: 'Ordered List', command: 'insertOrderedList', icon: 'fa-list-ol' },

                { name: 'UnorderdList', title: 'Unorderd List', command: 'insertUnorderedList', icon: 'fa-list-ul' },

                { name: 'Link', title: 'Link', command: 'createLink', icon: 'fa-link' },

                // { name: 'Unlink', title: 'Unlink', command: 'unlink', icon: 'fa-unlink' },

                { name: 'Video', title: 'Video', command: 'video', icon: 'fa-video-camera' },

                { name: 'Image', title: 'Image', command: 'insertImage', icon: 'fa-image' },

                // { name: 'RemoveFormat', title: 'Remove Format', command: 'removeFormat', icon: 'fa-times' },
            ],
            currentTagName: '',
        }

    },
    watch : {
        currentTagName () {
            this.getCurrentTagName()
        }
    },
    methods : {
        exec (command,arg) {
            document.execCommand(command , false , arg)
        },

        clear () {
            document.getElementById("editor").innerHTML = ''
        },

        borderRight (index) {
            var clubs = [
                5,9,13,15,18,20,22,24,26
            ]
            return !!clubs.includes(index + 1)
        },
        getCurrentTagName () {
            if (window.getSelection().baseNode) {
                this.currentTagName = window.getSelection().baseNode.parentNode.tagName                 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.commandContainer {
    display: flex;
    justify-content: space-evenly;
}
.btn-group {
   display: flex;
}
.editor {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    min-height: 20em;
    padding: 20px;
    height: 500px;
    border-radius: var(--border-radius-1);
 }

.btn:hover {
    background: lighten(black, 90%);
    color: lighten(black, 10%);
}

[contenteditable]:focus {
  outline: none;
}

[contenteditable] {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
}

</style>
