<template>
  <el-card class="image-card">
    <div class="image-card__body">
      <div
        @click="$emit('click', imageDetail)"
        class="image-card__img"
        :style="imgStyle"
      />
      <top-tag :isTop="imageDetail.isTop" text="置顶" />
    </div>
    <div class="image-card__footer">
      <div>
        <el-button type="text" style="color: #67c23a" @click="$emit('pass')">
          通过
        </el-button>
        <el-button type="text" style="color: #f56c6c" @click="$emit('reject')">
          拒绝
        </el-button>
        <el-button type="text" style="color: red" @click="$emit('delete')">
          删除
        </el-button>
        <el-button type="text" @click="$emit('setTop')"> 置顶 </el-button>
      </div>
      <status class="image-card__status" :status="reviewStatus" />
    </div>
  </el-card>
</template>

<script>
import Status from "./Status.vue";
import TopTag from "./TopTag.vue";

export default {
  name: "ImageCard",
  props: ["img-src", "thumbnail-src", "review-status", "image-detail"],
  computed: {
    imgStyle() {
      return {
        background: `url(${this.thumbnailSrc}) no-repeat center/cover`,
      };
    },
  },
  components: {
    Status,
    TopTag,
  },
};
</script>

<style lang="scss" scoped>
.image-card {
  width: 270px;
}
.image-card__body {
  position: relative;
  .top-tag {
    position: absolute;
    top: -8px;
    right: -8px;
  }
}

.image-card ::v-deep .el-card__body {
  padding: 15px 15px 6px;
}

.image-card__img {
  width: 240px;
  height: 165px;
  margin-bottom: 5px;
}

.image-card__footer {
  position: relative;
}

.image-card__status {
  position: absolute;
  top: 3px;
  right: 0px;
}
</style>
