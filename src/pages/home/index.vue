<template>
  <div>
    <page-header />
    <main>
      <div class="main-content">
        <PullToRefresh :onRefresh="refresh">
          <image-card
            v-for="item in imageList"
            :img-src="item.url"
            :thumbnail-src="item.thumbnailUrl"
            :key="item.id"
            :image-detail="item"
            @click="handleClick"
          />
          <button
            v-if="hasMore"
            class="main-content__button"
            @click="loadMoreData"
          >
            加载更多
          </button>
          <el-empty
            v-if="!loading && !imageList.length"
            description="这里空空如也 /(ㄒoㄒ)/~~"
          />
          <InfiniteScroll :loadMore="loadMoreData" :hasMore="hasMore" />
        </PullToRefresh>
        <Loading v-if="loading" text="数据加载中..." />
      </div>
      <image-modal
        :showModal.sync="showModal"
        :images="imageList"
        :currentIndex.sync="currentIndex"
      />
    </main>
  </div>
</template>

<script>
import _ from "lodash";
import PageHeader from "./components/PageHeader.vue";
import ImageCard from "./components/ImageCard.vue";
import PullToRefresh from "@/components/PullToRefresh";
import InfiniteScroll from "@/components/InfiniteScroll";
import ImageModal from "@/components/ImageModal";
import Loading from "@/components/Loading";
import { fetchAllPassFiles } from "@/api/file";
export default {
  name: "Home",
  components: {
    PageHeader,
    ImageCard,
    ImageModal,
    Loading,
    PullToRefresh,
    InfiniteScroll,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      imageList: [],
      currentIndex: 0,
      showModal: false,
      loading: true,
      total: 0,
      pageInfo: {
        pageNumber: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    hasMore() {
      return this.imageList.length < this.total;
    },
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        fetchAllPassFiles(this.pageInfo)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(reject);
      });
    },
    async fetchData() {
      try {
        this.loading = true;
        const { files, count: total } = await this.getData();
        this.total = total;
        this.imageList = files;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async refresh() {
      // 下拉刷新 获取最新的图片数据
      try {
        // reset pageNumber
        this.pageInfo.pageNumber = 1;
        const { files, count: total } = await this.getData();
        this.total = total;
        this.imageList = files;
      } catch (error) {
        console.log(error);
      }
    },
    async loadMoreData(done) {
      if (!this.hasMore) return;
      try {
        this.pageInfo.pageNumber++;
        const { files, count: total } = await this.getData();
        this.total = total;
        // 新加载的图片添加到imageList
        this.imageList.push(...files);
        _.isFunction(done) && done();
      } catch (error) {
        // 简单处理加载失败的情况
        this.pageInfo.pageNumber--;
        console.log(error);
      }
    },
    handleClick(image) {
      this.showModal = true;
      const index = _.findIndex(this.imageList, image);
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 60px;
  box-sizing: border-box;
  background-color: #eeeeee;
  box-sizing: border-box;
  .main-content {
    padding-top: 10px;
    margin: 0 auto;
    width: 1000px;
    position: relative;
  }
  .main-content__button {
    display: block;
    width: 100px;
    height: 40px;
    padding: 0;
    color: #fff;
    background-color: #00c3ff;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 767px) {
  main {
    padding-top: 50px;
    .main-content {
      box-sizing: border-box;
      margin: 0 auto;
      width: 100%;
      padding: 0 30px;
    }
    & .main-content__button {
      display: none;
    }
  }
}
</style>
