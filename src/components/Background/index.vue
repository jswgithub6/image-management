<template>
  <div class="background"></div>
</template>

<script>
export default {
  name: "Background",
};
</script>

<style lang="scss" scoped>
$background-color: #eeeeee;

.background {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $background-color;
  z-index: -9999;
}
</style>
