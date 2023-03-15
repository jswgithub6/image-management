<template>
  <div class="loading-mask">
    <div class="loading">
      <i class="loading-icon icon-spinner2" />
      <div v-if="!!text" class="loading-text">
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["text"],
};
</script>

<style lang="scss" scoped>
.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  cursor: default;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}

.loading {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.loading-icon {
  display: inline-block;
  font-size: 20px;
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
