<template>
    <div class="mx-1 my-3 editContainer">
        <div class="commandContainer" v-if="isEditingDesc">
            <div v-for="(item, index) in commands" :key="index" class="btn-group" >
            <button type="button" class="btn btn-sm btn-outline-secondary border-0 rounded-0" data-toggle="tooltip" data-placement="bottom" :title="item.title" @click="exec(item.command)">
                <i :class="'fa ' + item.icon"></i>
            </button>           
        </div>
        </div>
        <div v-if="isEditingDesc" class="editor mt-2" id="editor" :style="{height: editorHeight + 'px'}" @input="this.onInput" @keyup.space="onSpaceBar"  contenteditable="true" v-html="cardDescription" @mouseup="getCurrentTagName" @keyup.enter="getCurrentTagName"></div>
        <div v-else class="editor mt-2" id="editor" :style="{height: editorHeight + 'px'}" @input="this.onInput" @keyup.space="onSpaceBar"  contenteditable="false" v-html="cardDescription" @mouseup="getCurrentTagName" @keyup.enter="getCurrentTagName"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'wysiwyg',
    props: { cardDescription: String, isEditingDesc: Boolean, editorHeight: Number, isComment: Boolean },
    mounted () {
        document.getElementById('editor').addEventListener('input', function(){
          let scrollHeight = this.scrollHeight
          if (scrollHeight > 340) {
             this.style.height = scrollHeight + "px";
          }
       })
       document.getElementById('editor').addEventListener('keyup', function(){
           console.log("event keyup: ", this)
       })       
       this.adjustHeight()
    },
    setup() {
        var currentContent = ref(null)
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

                { name: 'RemoveFormat', title: 'Remove Format', command: 'removeFormat', icon: 'fa-times' },
            ],
            currentTagName: '', currentContent
        }

    },
    mounted() {
    },
    watch : {
        currentTagName() {
            this.getCurrentTagName()
        }, 
        isComment() {
            this.commands.push({ name: 'Attachment', title: 'Attachment', command: 'addAttachment', icon: 'fa-image' })
        }
    },
    methods : {
        setEndOfContenteditable(el) {
          let elem = document.getElementById('editor')
          var range, selection;
          if (document.createRange){ // Firefox, Chrome, Opera, Safari, IE 9+
             range = document.createRange();//Create a range (a range is a like the selection but invisible)
             range.selectNodeContents(elem);//Select the entire contents of the element with the range
             range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
             selection = window.getSelection();//get the selection object (allows you to change selection)
             selection.removeAllRanges();//remove any selections already made
             selection.addRange(range);//make the range you have just created the visible selection
         } else if(document.selection) { // IE 8 and lower  
           range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
           range.moveToElementText(elem);//Select the entire contents of the element with the range
           range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
           range.select();//Select the range (make it the visible selection
         }
        //   if (el.target.innerHTML.length > 0) {
        //     let sel = window.getSelection();
        //     sel.selectAllChildren(el);
        //     sel.collapseToEnd();
        //   }
        },
        adjustHeight() {
            setTimeout(()=>{
             let editorElement = document.getElementById("editor")
             let scrollHeight = editorElement.scrollHeight
             editorElement.style.height = scrollHeight + "px";
            }, 0)
        },
        formatURL(el) {
          var text = el.target.innerHTML;
          var firstAt = text.indexOf('https');
          console.log("firstAt: ", firstAt)
           if(firstAt > -1) {
            var textToReplace = text.substring(firstAt, text.length);
            // onClick="window.open('http://www.google.com','_newtab')
            var newText = "<a href='#' contenteditable='false'>" + textToReplace.substring(0, textToReplace.length) + "</a>";
            newText += "<br>"
            var complete = text.replace(textToReplace, newText);
             el.target.innerHTML = complete
           }
           this.setEndOfContenteditable(el)
        },
        onSpaceBar(el) {
          console.log("keycode 32 tapped")
          this.formatURL(el)
        },
        onInput(el) {
          let isContainAt = el.target.innerHTML.includes("@")
          if (isContainAt == true) {
            this.$emit("isMemberCardVisible", true)
          }
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
        getCurrentTagName(el) {
            // this.formatURL(el)
            console.log("target: ", el.target.text)
            var text = el.target.innerHTML;
            var firstAt = text.indexOf('https');
            var url = text.substring(firstAt, text.length);
            let targetText =  el.target.text
            let isURL =  targetText != undefined && targetText.length > 5
            // url.indexOf("https://")
            console.log("url: ", targetText, "isURL: ", isURL)
            if (isURL) {
                // open
                window.open(targetText,'_newtab')
            } else {
                // edit
                this.$emit("isEditing")
            }
            this.adjustHeight()
            if (window.getSelection().baseNode) {
                this.currentTagName = window.getSelection().baseNode.parentNode.tagName                 
            }
            el.target.focus()
        }, 
        handleURLTapped(url) {
            console.log("url tapped: ", url)
        }
    }
}
</script>

<style scoped>

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
   color: var(--color-card-title);
}
.editor {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    font-size: 15px;
    font-weight: 500;
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
    overflow: hidden;
    overflow-y: scroll;
    color: var(--color-card-title);
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
    color: var(--color-card-title);
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
}

</style>
