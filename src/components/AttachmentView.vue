<template>
     <div class="dropFileMainView">
      <div
        class="dropzone-container"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
       >
        <input
          type="file"
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="onChange"
          ref="file"
          accept=".docx ,.pptx ,.xlsx ,.pdf ,.jpg ,.jpeg ,.png, .mp4, .mov, .zip"
        />
  
        <label for="fileInput" class="file-label">
          <img src="@/assets/uploadCloudDark.png" class="cloud">
          <div v-if="isDragging">Release to drop a file.</div>
          <div class="uploader" v-else> 
            <b>Tap</b> to upload or <b>Drop</b> a file.<br>png jpg jpeg pptx pdf <br> docx xlsx mov mp4
          </div>
        </label>
      </div>
      <img v-if="isPreviewable" class="preview-img"  :src="localeFileURL == null ? remoteFileURL : localeFileURL"/>
      <label v-else-if="selectedFile != null">{{ selectedFile.name }}</label>
      <button v-if="isUploading" class="uploadBtn buttonload">
            <i class="fa fa-circle-o-notch fa-spin"></i> Uploading... 
        </button>
      <button v-else class="uploadBtn" @click="handleUploadFile" :disabled="selectedFile == null" :class="{'is-disabled': selectedFile == null}">Upload File</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { BASE_URL } from '@/config'; 
import axios from 'axios';

export default {
    props: { card: String },
    setup() {
        var isDragging = ref(false)
        var localeFileURL = ref(null)
        var remoteFileURL = ref(null)
        var selectedFile = ref(null)
        var card_id = ref("")
        var isUploading = ref(false)
        var isPreviewable = ref(false)
        return {isDragging, localeFileURL, selectedFile, remoteFileURL, card_id, isUploading, isPreviewable}
    }, 
    methods: {
        async handleUploadFile() {
          let fileTypes = this.selectedFile.name.split(".")
           if (this.selectedFile != null && this.localeFileURL != null && fileTypes.length > 0) {
            let fileType = fileTypes.pop()
               var postJson = {
                 card_id: this.card_id,
                 fileType: fileType.toLowerCase()
               }
              var formsData = new FormData()
              formsData.append('attachment', this.selectedFile, this.selectedFile.name)
              formsData.append("postJson", JSON.stringify(postJson))
              let fullURL = BASE_URL + "files/upload"
              this.isUploading = true 
              await axios.post(fullURL, formsData).then((response) => {
                this.isUploading = false 
                this.selectedFile = null
                this.localeFileURL = null
                 if (response.data != null) {
                   let data = response.data
                  if (data.statusCode == 200) {
                     this.$emit("fileUploadComplete", data.resp)
                  }
                }
              })
            }
        },
      onChange() {
        let file = this.$refs.file.files[0]
        this.selectedFile = file
        this.localeFileURL = this.generateURL(file)
        this.remoteFileURL = null
        let fileTypes = this.selectedFile.name.split(".")
        let fileType = fileTypes.pop().toLowerCase()
        this.isPreviewable = ['jpg', 'jpeg', 'png'].includes(fileType)
      },
      dragover(e) {
        e.preventDefault();
        this.isDragging = true;
      },
      dragleave() {
        this.isDragging = false;
      },
      drop(e) {
        e.preventDefault();
        this.$refs.file.files = e.dataTransfer.files;
        this.onChange();
        this.isDragging = false;
      },
      generateURL(file) {
       let fileSrc = URL.createObjectURL(file);
       setTimeout(() => {
         URL.revokeObjectURL(fileSrc);
       }, 1000);
       return fileSrc;
      },
    }, 
    watch: { 
      remoteFileURL(newVal, oldVal) { 
         if (newVal != null) {
             this.fileURL = null
             this.selectedFile = null
          }
        }, 
    }, 
    updated() {
        this.card_id = this.card
    },
}
</script>
<style  lang="scss" scoped>
.cloud {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}
.fileLinkField {
  width: 280px;
  max-height: 44px;
  font-weight: 500;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 0px solid var(--color-light-primary) !important;
  border-color: var(--color-light-primary);
  margin-top: 5px;
}

.uploadBtn { 
  margin-top: 40px;
  margin-bottom: 20px;
  width: 260px;
  height: 44px;
  margin-right: auto;
  margin-left: auto;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background-color: var(--color-bar-dark);
  border: 0px solid transparent;
  border-radius: var(--border-radius-1);
  &.is-disabled {
    background-color: var(--color-info-light);
  }
}

  .dropFileMainView {
    display: flex;
    flex-direction: column;
    height: 800px;
    width: 300px;
    overflow: hidden;
  }

.dropzone-container {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    height: 250px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: var(--border-radius-2);
    border-top-right-radius: var(--border-radius-2);
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    font-weight: 400;
}

.preview-img {
  width: 80px;
  height: 80px;
  margin-top: 15px;
  margin-bottom: 8px;
  object-fit: contain;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
}
</style>