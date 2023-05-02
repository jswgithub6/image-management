<template>
  <div
    class="pull-to-refresh"
    :style="{
      transform: distance ? `translateY(${distance}px)` : '',
      webkitTransform: distance ? `translateY(${distance}px)` : '',
      transitionDuration: `${duration}ms`,
    }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="pull-to-refresh__head">
      <div v-if="status === 'refresh'">
        <Loading>{{ currentStatus }}</Loading>
      </div>
      <div v-else>{{ currentStatus }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Loading from "../Loading";

export default {
  name: "PullToRefresh",
  components: { Loading },
  props: {
    onRefresh: {
      type: Function,
      required: true,
    },
    pullingText: {
      type: String,
      default: "下拉刷新",
    },
    loosingText: {
      type: String,
      default: "释放刷新",
    },
    refreshText: {
      type: String,
      default: "正在刷新",
    },
    successText: {
      type: String,
      default: "刷新完成",
    },
    threshold: {
      type: Number,
      default: 50,
    },
    animationDuration: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      status: "normal",
      duration: 0,
      startY: 0,
      deltaY: 0,
      distance: 0,
      isCeiling: true,
    };
  },
  computed: {
    touchable() {
      return this.status !== "refresh" && this.status !== "success";
    },
    currentStatus() {
      const { status } = this;
      const text = this[`${status}Text`];
      return text;
    },
  },

  methods: {
    onTouchStart(e) {
      if (!this.touchable) {
        return;
      }
      this.checkPullStart(e);
    },
    onTouchMove(e) {
      if (!this.touchable) {
        return;
      }

      // 判断touchmove过程中滚动条是否到顶
      if (!this.isCeiling) {
        this.checkPullStart(e);
      }

      this.touchMove(e);

      if (this.isCeiling && this.deltaY >= 0) {
        // 阻止浏览器默认的下拉刷新行为
        e.cancelable && e.preventDefault();

        this.status = this.deltaY < this.threshold ? "pulling" : "loosing";
        this.distance = this.simulateRubberBandEffect(this.deltaY);
      }
    },
    onTouchEnd() {
      if (this.deltaY && this.touchable) {
        // 设置过渡动画时间
        this.duration = this.animationDuration;
        if (this.status === "loosing") {
          // 正在刷新
          this.status = "refresh";
          this.distance = this.threshold;
          this.$nextTick(() => {
            this.onRefresh(this.refreshDone);
          });
        } else {
          // 重置状态
          this.resetStatus();
        }
      }
    },
    checkPullStart(e) {
      // 判断滚动条是否位于顶部
      const scrollTop = Math.max(document.documentElement.scrollTop, 0);
      this.isCeiling = scrollTop === 0;
      if (this.isCeiling) {
        this.touchStart(e);
        // 下拉过程不出现过渡动画
        this.duration = 0;
      }
    },
    touchStart(e) {
      this.startY = e.touches[0].clientY;
      this.deltaY = 0;
    },
    touchMove(e) {
      const currentY = e.touches[0].clientY;
      this.deltaY = currentY - this.startY;
    },
    simulateRubberBandEffect(distance) {
      const maxDistance = 50; // 最大下拉距离
      const rubberBandRate = 0.2; // 橡皮筋系数
      if (distance <= maxDistance) {
        // 下拉距离小于等于最大下拉距离，线性计算下拉距离
        return distance;
      } else {
        // 下拉距离大于最大下拉距离，应用橡皮筋效果
        const extraDistance = distance - maxDistance;
        const rubberBandDistance = maxDistance + extraDistance * rubberBandRate;
        return rubberBandDistance;
      }
    },
    refreshDone() {
      setTimeout(() => {
        this.showSuccessTip();
      }, 500);
    },
    showSuccessTip() {
      this.status = "success";
      setTimeout(() => {
        this.resetStatus();
      }, 500);
    },
    resetStatus() {
      this.status = "normal";
      this.distance = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: #666666;
$refresh-head-font-size: 14px;
.pull-to-refresh {
  position: relative;
  height: 100%;
  transition-property: transform;

  &__head {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50px;
    overflow: hidden;
    color: $text-color;
    font-size: $refresh-head-font-size;
    text-align: center;
    transform: translateY(-100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
