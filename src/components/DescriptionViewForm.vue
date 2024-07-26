<template>
      <div class="d-flex justify-space-between pa-4 pb-0">
        <v-btn-toggle
          v-model="formatting"
          variant="outlined"
          divided
          multiple
        >
          <v-btn><v-icon icon="mdi-format-italic"></v-icon></v-btn>
          <v-btn><v-icon icon="mdi-format-bold"></v-icon> </v-btn>
  
          <v-btn>
            <v-icon icon="mdi-format-underline"></v-icon>
          </v-btn>
  
          <v-btn>
            <div class="d-flex align-center flex-column justify-center">
              <v-icon icon="mdi-format-color-text"></v-icon>
  
              <v-sheet
                color="purple"
                height="4"
                width="26"
                tile
              ></v-sheet>
            </div>
          </v-btn>
        </v-btn-toggle>
  
        <v-btn-toggle
          v-model="alignment"
          variant="outlined"
          divided
        >
          <v-btn>
            <v-icon icon="mdi-format-align-center"></v-icon>
          </v-btn>
  
          <v-btn>
            <v-icon icon="mdi-format-align-left"></v-icon>
          </v-btn>
  
          <v-btn>
            <v-icon icon="mdi-format-align-right"></v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
  
      <textarea type="text"  @input="autoGrow()" class="cardNameField" id="cardNameId"></textarea>

      <!-- <v-sheet class="pa-4 text-center">
        <v-textarea
          v-model="value"
          auto-grow
          full-width
        ></v-textarea>
      </v-sheet> -->
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        var formatting = ref(null)
        var alignment = ref(null)
        return { formatting, alignment }
    },
    methods: {
        autoGrow() {
            let element = document.getElementById("cardNameId")
            element.style.height = "15px";
            element.style.height = (element.scrollHeight) + "px";
        },
        handleOverlayClosed() {
            console.log("close overlay tapped")
            this.$emit('overlayDismissed')
        }
    }
}
</script>
<style scoped>
.cardNameField {
    display: flex;
    font-size: 20px;
    font-weight: 500;
    padding: 20px;
    resize: none;
    min-height: 400px;
    margin-right: 15px;
    margin-left: 15px;
    color: var(--color-dark);
    background-color: var(--color-background);
}
    
</style>