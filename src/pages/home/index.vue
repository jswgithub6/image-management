<template>
  <div>
    <page-header />
    <main>
      <div class="main-content">
        <PullToRefresh :onRefresh="refresh">
          <InfiniteScroll :onLoadMore="loadMoreData" :hasMore="hasMore">
            <image-card
              v-for="item in imageList"
              :img-src="item.url"
              :thumbnail-src="item.thumbnailUrl"
              :key="item.id"
              :image-detail="item"
              @click="handleClick"
            />
            <el-empty v-if="showEmpty" description="这里空空如也 /(ㄒoㄒ)/~~" />
          </InfiniteScroll>
        </PullToRefresh>
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
import PageHeader from "./components/PageHeader.vue";
import ImageCard from "./components/ImageCard.vue";
import PullToRefresh from "@/components/PullToRefresh";
import InfiniteScroll from "@/components/InfiniteScroll";
import ImageModal from "@/components/ImageModal";
import { fetchAllPassFiles } from "@/api/file";
import { findIndex } from "lodash";
export default {
  name: "Home",
  components: {
    PageHeader,
    ImageCard,
    ImageModal,
    PullToRefresh,
    InfiniteScroll,
  },
  computed: {
    showEmpty() {
      return this.pageInfo.pageNumber > 0 && this.total === 0;
    },
  },
  data() {
    return {
      imageList: [],
      currentIndex: 0,
      showModal: false,
      total: 0,
      pageInfo: {
        pageNumber: 0,
        pageSize: 5,
      },
      hasMore: true,
    };
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
    async refresh(done) {
      // 下拉刷新 获取最新的图片数据
      try {
        // reset pageNumber
        this.pageInfo.pageNumber = 1;
        const { files, count: total } = await this.getData();
        this.total = total;
        this.imageList = files;
        this.hasMore = this.imageList.length < this.total;
        done();
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
        this.hasMore = this.imageList.length < this.total;
        done();
      } catch (error) {
        // 加载失败
        this.pageInfo.pageNumber--;
        console.log(error);
      }
    },
    handleClick(image) {
      this.showModal = true;
      const index = findIndex(this.imageList, image);
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
