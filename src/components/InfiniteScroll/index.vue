<template>
  <div class="infinite-scroll">
    <div class="infinite-scroll__content" ref="content">
      <slot></slot>
    </div>
    <div class="infinite-scroll__placeholder" ref="placeholder">
      <div class="infinite-scroll__loading" v-if="loading && hasMore">
        <Loading>{{ loadingText }}</Loading>
      </div>
      <div class="infinite-scroll__finished" v-if="!hasMore">
        {{ finishedText }}
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Loading";
import { throttle } from "lodash";
export default {
  name: "InfiniteScroll",
  props: {
    immediate: {
      type: Boolean,
      default: true,
    },
    onLoadMore: {
      type: Function,
      required: true,
    },
    threshold: {
      type: Number,
      default: 50,
    },
    hasMore: {
      type: Boolean,
      required: true,
    },
    loadingText: {
      type: String,
      required: false,
      default: "正在加载",
    },
    finishedText: {
      type: String,
      required: false,
      default: "没有更多了",
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      onScroll: null,
      observer: null,
    };
  },
  mounted() {
    const onScroll = throttle(this.handleScroll, 200);
    window.addEventListener("scroll", onScroll);
    this.onScroll = onScroll;

    // 立即加载数据 以防初始状态下内容无法撑满容器
    if (this.immediate) {
      const observer = new MutationObserver(onScroll);
      observer.observe(this.$refs.content, {
        childList: true,
        subtree: true,
      });
      onScroll();
      this.observer = observer;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    if (this.observer) this.observer.disconnect();
    this.observer = null;
  },
  methods: {
    handleScroll() {
      this.$nextTick(() => {
        if (this.loading || !this.hasMore) return;

        const scrollerHeight = window.innerHeight;
        const placeholder = this.$refs.placeholder;
        if (!scrollerHeight || !placeholder) return false;

        const placeholderBottom = placeholder.getBoundingClientRect().bottom;
        /**
         *  计算placeholder到页面底部的距离
         *  ┌───────────┐
         *  │  scroll   │
         *  ├───────────┤
         *  │  viewport │
         *  ├───────────┤
         *  │placeholder│
         *  ├───────────┤
         */
        const shouldTrigger =
          // 滚动到了页面底部
          Math.abs(placeholderBottom - scrollerHeight) <= this.threshold ||
          // 初始状态下内容无法撑满容器
          placeholderBottom <= scrollerHeight;

        if (shouldTrigger) {
          this.loading = true;
          setTimeout(() => {
            this.onLoadMore(() => {
              this.loading = false;
            });
          }, 500);
        } else if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$text-color: #646566;
$font-size: 14px;
$height: 36px;

.infinite-scroll {
  height: $height;
  &__loading,
  &__finished {
    color: $text-color;
    font-size: $font-size;
    line-height: $height;
    text-align: center;
  }
}
</style>
