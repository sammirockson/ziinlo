<template>
    <div class="fileViewContainer" @click.self="dismissFileViewer">
        <PDF v-if="attachment != null && attachment.fileType.toLowerCase() == 'pdf'" class="previewer" :src="attachment.fileURL" />
        <img v-if="attachment != null && (attachment.fileType.toLowerCase() == 'png' || attachment.fileType.toLowerCase() == 'jpg' || attachment.fileType.toLowerCase() == 'jpeg')" :src="attachment.fileURL" class="previewer">
        <videoplayer v-if="attachment != null && (attachment.fileType.toLowerCase() == 'mp4' ||  attachment.fileType.toLowerCase() == 'mov')" :src="attachment.fileURL" controls="true" height="800" width="1200"></videoplayer>
        <vue-office-docx v-if="attachment != null && (attachment.fileType.toLowerCase() == 'docx' || attachment.fileType.toLowerCase() == 'doc')" :src="attachment.fileURL" @rendered="rendered"  class="previewer"/>
        <vue-office-excel v-if="attachment != null && (attachment.fileType.toLowerCase() == 'xlsx' || attachment.fileType.toLowerCase() == 'xls')"  :src="attachment.fileURL" class="previewer"/>
        <img v-if="attachment != null && attachment.fileType.toLowerCase() == 'zip'" src="../assets/other_files.png" class="download-zip" @click="handleDownloadZip">
        <img src="../assets/close-icon.png" class="close-icon" @click="dismissFileViewer">
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Videoplayer from "@/components/Videoplayer.vue"
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import '@vue-office/docx/lib/index.css'

import { ref } from 'vue'
import PDF from "pdf-vue3";

export default {
    props: { attachment: null }, 
    components: {
        VueHorizontal, PDF, Videoplayer, VueOfficeDocx, VueOfficeExcel
    }, 
    setup() {
        var config = ref(Object)
        return { config }
    },
    methods: {
        handleDownloadZip() {
            window.open(this.attachment.fileURL, '_blank');
        },
        dismissFileViewer() {
            this.$emit("dismissFileViewer")
        }
    },
    mounted() {
      
    }
}
</script>
<style scoped>
.close-icon {
    float: right;
    margin-right: 20px;
    width: 40px;
    height: 40px;
}
.previewer {
    object-fit: contain;
}
.fileViewCell, .previewer, .fileViewContainer {
    height: 80vh;
    width: 80vw;
    margin-top: 3vh;
    margin-right: auto;
    margin-left: auto;
}
    
</style>