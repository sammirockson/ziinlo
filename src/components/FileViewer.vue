<template>
    <div class="fileViewContainer" @click="dismissFileViewer">
        <vue-horizontal snap="center" responsive ref="horizontal">
            <section v-for="attachment in attachments" :key="attachment._id">
               <img :src="attachment.fileURL" class="previewer">
               <!-- <VueDocPreview :value="attachment.fileURL" type="xlsx" class="previewer"/> -->
            </section>
        </vue-horizontal>
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import { ref } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
const page = ref(1)
const { pdf, pages } = usePDF('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')

export default {
    props: { attachments: [] }, 
    components: {
        VueHorizontal
    }, 
    methods: {
        dismissFileViewer() {
            // this.$refs.horizontal.scrollToIndex(1)
            // .ppt, .pptx, .doc, .docx, .xls and .xlsx
            console.log("Attempting to scroll to index: ", this.$refs.horizontal == null)
            this.$emit("dismissFileViewer")
        }
    },
}
</script>
<style scoped>

.previewer {
    object-fit: contain;
}
.fileViewCell, .previewer {
    height: 100vh;
    width: 100vw;
}
.fileViewContainer {
    display: flex;
    height: 100%;
    width: 100vw;
    overflow-x: scroll;
}
    
</style>