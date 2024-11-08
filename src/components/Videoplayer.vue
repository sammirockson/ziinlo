<template>
 <video
   class="videoContainer"
   :src="src"
   :muted="muted"
   :autoplay="autoplay"
   :controls="controls"
   :loop="loop"
   :width="width"
   :height="height"
   :poster="poster"
   :preload="preload"
   :playsinline="true"
   ref="player"
   :class="{'is-border-cropped': isBorderCropped}"
/>
</template>
<script>
import { ref } from 'vue'
export default {
    name: "Videoplayer",
    props: {
       src: { type: String, required: true },
       controls: { type: Boolean, required: false, default: false },
       loop: { type: Boolean, required: false, default: false },
       width: { type: Number, required: false, default: 500 },
       height: { type: Number, required: false, default: 281 },
       autoplay: { type: Boolean, required: false, default: false },
       muted: { type: Boolean, required: false, default: false },
       poster: { type: String, required: false },
       preload: { type: String, required: false, default: "auto" },
       isBorderCropped: { type: Boolean, default: true}
    }, 
    setup() {
        var isPlaying = ref(false)
        var isMuted = ref(false)
        return { isPlaying, isMuted }
    }, 
    mounted() {
      console.log('autoplay: ', this.autoplay)
      if (this.autoplay === false) {
        this.pause()
      }
    },
    methods: {
     play() {
      this.$refs.player.play();
      this.setPlaying(true);
    },
    pause() {
      this.$refs.player.pause();
      this.setPlaying(false);
    },
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    setPlaying(state) {
      this.playing = state;
    },	
	mute() {
      this.$refs.player.muted = true;
      this.setMuted(true);
    },
    }, 
    mounted() {
        this.play()
    }
}
</script>
<style lang="scss" scoped>
    .videoContainer {
        object-fit: cover;
        &.is-border-cropped {
          border-radius: var(--border-radius-2);
        }
    }
</style>