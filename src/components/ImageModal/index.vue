<template>
  <div v-if="showModal" class="image-modal">
    <div class="image-modal__content" v-clickoutside="closeModal">
      <div class="image-modal__header">
        <slot :image="currentImage" name="header"></slot>
        <i style="cursor: pointer" class="icon-cross" @click="closeModal" />
      </div>
      <div class="image-modal__body">
        <div class="image-container">
          <img :src="currentImageURL" />
        </div>
      </div>
      <div class="image-modal__footer">
        <i v-if="hasPrev" class="prev icon-arrow-left" @click.stop="showPrev" />
        <i
          v-if="hasNext"
          class="next icon-arrow-right"
          @click.stop="showNext"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "ImageModal",
  directives: { Clickoutside },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    currentImage() {
      const image = this.images[this.currentIndex];
      return image;
    },
    currentImageURL() {
      return this.currentImage.url;
    },
    reviewStatus() {
      return this.currentImage.reviewStatus;
    },
    hasPrev() {
      return this.currentIndex > 0;
    },
    hasNext() {
      return this.currentIndex < this.images.length - 1;
    },
  },
  methods: {
    showPrev() {
      this.$emit("update:currentIndex", this.currentIndex - 1);
    },
    showNext() {
      this.$emit("update:currentIndex", this.currentIndex + 1);
    },
    closeModal() {
      this.$emit("update:showModal", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-modal {
  position: fixed;
  /* 这里z-index要大于header的z-index */
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-modal__content {
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}

.image-modal__content::-webkit-scrollbar {
  display: none;
}

.image-modal__header {
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.image-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.prev,
.next {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  font-size: 16px;
}

.prev {
  top: calc(50% - 18px);
  left: 20px;
}

.next {
  top: calc(50% - 18px);
  right: 20px;
}

.prev:hover,
.next:hover {
  color: skyblue;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>
