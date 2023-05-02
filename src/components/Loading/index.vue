<template>
  <div class="loading">
    <span class="loading__spinner">
      <i class="loading__icon icon-spinner2" />
    </span>
    <span class="loading__text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
$loading-spinner-color: #323233;
$loading-spinner-size: 20px;
$text-color: #646566;
$text-font-size: 14px;

.loading {
  display: block;
  position: relative;
  color: $loading-spinner-color;
  font-size: 0;
  width: 100%;
  height: 100%;

  &__spinner {
    position: relative;
    display: inline-block;
    height: $loading-spinner-size;
    width: $loading-spinner-size;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  &__icon {
    display: inline-block;
    font-size: $loading-spinner-size;
    animation: rotating 1s linear infinite;
  }

  &__text {
    display: inline-block;
    margin-left: 8px;
    color: $text-color;
    font-size: $text-font-size;
    vertical-align: middle;
  }
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
