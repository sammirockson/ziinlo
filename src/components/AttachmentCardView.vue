<template>
    <div class="attachmentCell" @click="handleFileBrowserTapped(attachment)">
        <img :class="attachment.fileType.toLowerCase()" class="attchmentPreview">
        <div class="attachmentInfoContainer">
            <label class="attachmentFileNameLabel">{{ attachment.fileName }}</label>
            <label class="attachmentDateLabel">{{ this.formatFileSize(attachment) }}MB</label>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        attachment: {
            type: Object, 
            required: true
        }
    },
    data() {
        return {}
    }, 
    methods: {
      handleFileBrowserTapped() {
        // TODO: Add support for these file types .zip, .rar, .7zip
        // Implemtn file size limit to like 200MB
      }, 
     formatFileSize(attachment) {
        let size =  (attachment.size / 1024) / 1000
        return size.toFixed(2)
     },
    }
}
</script>

<style lang="scss" scoped>
.attachmentFileNameLabel {
    font-weight: 500;
    font-size: 15px;
    display: flex;
    align-items: left;
    justify-content: left;
    max-height: 24px;
    margin-top: 8px;
    text-align: left;
    overflow: hidden;
}
.attachmentsTitleLabel {
    margin-top: 20px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    float: left;
    display: flex;
}

.attachmentDateLabel {
    font-weight: 300;
    font-size: 12px;
    display: flex;
    margin-top: 4px; 
    align-items: left;
    justify-content: left;
    text-align: left;
}
.attachmentInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    margin-left: 10px;
    width: calc(100% - 110px);
    height: 80px;
    padding-bottom: 8px;
}
.attchmentPreview {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    object-fit: contain;
    overflow: hidden;
    &.pdf {
        content: url('../assets/pdfIcon.png');
    }
    &.docx {
        content: url('../assets/docxIcon.png');
    }
    &.doc {
        content: url('../assets/docxIcon.png');
    }
    &.xlsx {
        content: url('../assets/xlsxICon.png');
    }
    &.pptx {
        content: url('../assets/pptxIcon.png');
    }
    &.mp4 {
        content: url('../assets/mp4Icon.png');
    }
    &.mov {
        content: url('../assets/movIcon.png');
    }
    &.zip {
        content: url('../assets/other_files.png');
    }
    &.rar {
        content: url('../assets/other_files.png');
    }
}
.attachmentsTitleLabel {
    margin-top: 20px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    float: left;
    display: flex;
}
.attachmentCell {
    display: flex;
    height: 90px;
    width: 320px;
}
</style>