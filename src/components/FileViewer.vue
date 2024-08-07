<template>
    <div class="fileViewContainer" @click="dismissFileViewer">
        <PDF v-if="attachment != null && attachment.fileType.toLowerCase() == 'pdf'" class="previewer" :src="attachment.fileURL" />
        <img v-if="attachment != null && (attachment.fileType.toLowerCase() == 'png' || attachment.fileType.toLowerCase() == 'jpg' || attachment.fileType.toLowerCase() == 'jpeg')" :src="attachment.fileURL" class="previewer">
        <videoplayer v-if="attachment != null && (attachment.fileType.toLowerCase() == 'mp4' ||  attachment.fileType.toLowerCase() == 'mov')" :src="attachment.fileURL" controls="true" height="800" width="1200"></videoplayer>

        <!-- <vue-horizontal snap="center" responsive ref="horizontal">
            <section v-for="attachment in attachments" :key="attachment._id">
               <img :src="attachment.fileURL" class="previewer">
            </section>
        </vue-horizontal> -->
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Videoplayer from "@/components/Videoplayer.vue"
import { ref } from 'vue'
import PDF from "pdf-vue3";
import axios from "axios";

export default {
    props: { attachment: null }, 
    components: {
        VueHorizontal, PDF, Videoplayer
    }, 
    methods: {
        async downloadFile() {
            await axios.get("")
        },
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
.fileViewCell, .previewer, .fileViewContainer {
    height: 92vh;
    width: 90vw;
    margin-top: 3vh;
    margin-right: auto;
    margin-left: auto;
}
/* .fileViewContainer {
    display: flex;
    height: 100%;
    width: 100vw;
    overflow-x: scroll;
} */
    
</style>