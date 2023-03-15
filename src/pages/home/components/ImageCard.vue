<template>
  <div class="image-card">
    <div class="image-card__img" :style="imgStyle" @click="handleClick"></div>
  </div>
</template>

<script>
export default {
  name: "ImageCard",
  props: ["img-src", "thumbnail-src", "image-detail"],
  computed: {
    imgStyle() {
      return {
        background: `url(${this.thumbnailSrc}) no-repeat center/cover`,
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.imageDetail);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-card {
  display: inline-block;
  width: 240px;
  height: 165px;
  margin: 5px;
  vertical-align: middle;
  border-radius: 4px;
  overflow: hidden;
}

.image-card__img {
  width: 100%;
  height: 100%;
}
</style>
