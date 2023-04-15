<template>
  <div
    class="pull-to-refresh"
    :style="style"
    @touchstart.stop="onTouchStart"
    @touchmove.stop="onTouchMove"
    @touchend.stop="onTouchEnd"
  >
    <div class="refresh-indicator">
      {{ refreshText }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "PullToRefresh",
  props: {
    onRefresh: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      refreshText: "下拉刷新",
      startY: "", // 初始touch时的Y坐标
      currentY: 0,
      offset: 0,
    };
  },
  computed: {
    style() {
      return {
        transform: `translateY(${this.offset}px)`,
      };
    },
  },
  methods: {
    onTouchStart(e) {
      // 记录初始touch时的Y坐标
      this.startY = e.touches[0].pageY;
    },
    onTouchMove(e) {
      /**
       * TODO
       * 这里写的有问题 应该是判断target Element的scrollParent的scrollTop
       */
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 0) return;

      this.currentY = e.touches[0].pageY;
      const deltaY = this.currentY - this.startY;

      /**
       * TODO
       * 下拉时应该有橡皮筋效果
       * https://github.com/ant-design/ant-design-mobile/blob/master/src/components/pull-to-refresh/pull-to-refresh.tsx#L150
       */
      this.offset = deltaY * 0.6; // 先简单模拟一下

      if (deltaY > 50) {
        this.refreshText = "释放刷新";
      } else {
        this.refreshText = "下拉刷新";
      }
    },
    async onTouchEnd() {
      if (this.currentY - this.startY > 50) {
        this.offset = 50;
        this.refreshText = "加载中...";
        await this.onRefresh();
        setTimeout(() => {
          this.reset();
        }, 800);
      } else {
        this.reset();
      }
    },
    reset() {
      this.refreshText = "下拉刷新";
      this.offset = 0;
    },
  },
};
</script>

<style scoped lang="scss">
.pull-to-refresh {
  height: calc(100vh - 50px);
  margin-top: -50px;
  transition-duration: 0.35s;
  .refresh-indicator {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    color: #666;
    text-align: center;
  }
}
</style>
