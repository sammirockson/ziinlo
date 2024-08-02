<template>
    <div class="mx-1 my-3 editContainer">
        <div class="commandContainer">
            <div v-for="(item, index) in commands" :key="index" class="btn-group" >
            <button type="button" class="btn btn-sm btn-outline-secondary border-0 rounded-0" data-toggle="tooltip" data-placement="bottom" :title="item.title" @click="exec(item.command)">
                <i :class="'fa ' + item.icon"></i>
            </button>           
        </div>
        </div>
        <div class="editor mt-2" id="editor" contenteditable="true" @change="handleEditingChanged" @mouseup="getCurrentTagName" :keyup.enter="getCurrentTagName"></div>
    </div>
</template>

<script>
export default {
    name: 'wysiwyg',
    props: { cardDescription: String },
    mounted () {

    },
    setup() {
        return {
            commands : [
                { name: 'Bold', title: 'Bold', command: 'bold', icon: 'fa-bold' },

                { name: 'Italic', title: 'Italic', command: 'italic', icon: 'fa-italic' },

                { name: 'StrikeThrough', title: 'Strike Through', command: 'strikeThrough', icon: 'fa-strikethrough' },

                { name: 'Underline', title: 'Underline', command: 'underline', icon: 'fa-underline' },

                { name: 'AlignLeft', title: 'Align Left', command: 'justifyLeft', icon: 'fa-align-left' },

                { name: 'AlignJustify', title: 'Align Justify', command: 'justifyFull', icon: 'fa-align-justify' },

                { name: 'AlignCenter', title: 'Align Center', command: 'justifyCenter', icon: 'fa-align-center' },

                { name: 'AlignRight', title: 'Align Right', command: 'justifyRight', icon: 'fa-align-right' },

                { name: 'Subscript', title: 'Subscript', command: 'subscript', icon: 'fa-subscript' },

                { name: 'Superscript', title: 'Superscript', command: 'superscript', icon: 'fa-superscript' },

                { name: 'OrderedList', title: 'Ordered List', command: 'insertOrderedList', icon: 'fa-list-ol' },

                { name: 'UnorderdList', title: 'Unorderd List', command: 'insertUnorderedList', icon: 'fa-list-ul' },

                { name: 'Link', title: 'Link', command: 'createLink', icon: 'fa-link' },

                // { name: 'Unlink', title: 'Unlink', command: 'unlink', icon: 'fa-unlink' },

                // { name: 'Video', title: 'Video', command: 'video', icon: 'fa-video-camera' },

                // { name: 'Image', title: 'Image', command: 'insertImage', icon: 'fa-image' },

                { name: 'RemoveFormat', title: 'Remove Format', command: 'removeFormat', icon: 'fa-times' },
            ],
            currentTagName: '',
        }

    },
    watch : {
        currentTagName() {
            this.getCurrentTagName()
        }, 
        cardDescription(newVal, oldVal) {
            // cardDescription
            document.getElementById("editor").innerHTML = newVal
        }
    },
    methods : {
        handleEditingChanged() {
            console.log("description editing changed")
        },
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
.editContainer {
    padding: 20px;
}
.commandContainer {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
}
.btn-group {
   display: flex;
   width: 80px;
}
.editor {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    min-height: 20em;
    height: 300px;
    font-size: 15px;
    font-weight: 500;
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
    overflow: hidden;
    overflow-y: scroll;
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
    font-size: 15px;
    font-weight: 500;
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
}

</style>
