<template>
  <div class="top-tag" v-if="isTop">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "TopTag",
  props: {
    isTop: Boolean,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.top-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f56c6c;
  color: #fff;
  font-size: 12px;
  border-radius: 6px;
}
</style>
