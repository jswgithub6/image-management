<template>
  <div class="infinite-scroll">
    <div v-if="!hasMore">没有更多了</div>
    <div v-if="hasMore && loading" class="infinite-scroll__loader"></div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "InfiniteScroll",
  props: {
    loadMore: {
      type: Function,
      required: true,
    },
    threshold: {
      type: Number,
      default: 30,
    },
    hasMore: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      handleScrollThrottle: null,
    };
  },
  mounted() {
    this.handleScrollThrottle = _.throttle(this.handleScroll, 200);
    window.addEventListener("scroll", this.handleScrollThrottle);
    /**
     * TODO
     * 实现类似ElementUI中的infinite-scroll-immediate功能
     * 以防初始状态下内容无法撑满容器
     */
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollThrottle);
  },
  methods: {
    handleScroll() {
      if (!this.hasMore) return;
      /**
       *  这里只简单实现了功能
       *  用InfiniteScroll组件自身到视口顶部的距离 减去 浏览器窗口的视口高度
       *  得到组件距离视口底部的距离
       *  ┌───────────┐
       *  │  scoll    │
       *  ├───────────┤
       *  │           │
       *  │  viewport │
       *  │           │
       *  ├───────────┤
       *  |           |
       *  │  IS Comp  │
       *  ├───────────┤
       */
      const distanceToBottom =
        this.$el.getBoundingClientRect().top - window.innerHeight;
      if (distanceToBottom < this.threshold && !this.loading) {
        this.loading = true;
        this.loadMore(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.infinite-scroll {
  position: relative;
  display: flex;
  padding: 5px;
  justify-content: center;
  color: #999999;
  font-size: 14px;
  &__loader {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top: 2px solid #000;
    animation: infinite-scroll-spinner 0.8s linear infinite;
  }
}

@keyframes infinite-scroll-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
