<template>
  <div>
    <page-header />
    <main>
      <div class="main-content">
        <image-card
          v-for="item in imageList"
          :img-src="item.url"
          :thumbnail-src="item.thumbnailUrl"
          :key="item.id"
          :image-detail="item"
          @click="handleClick"
        />
        <el-empty
          v-if="!imageList.length"
          description="这里空空如也 /(ㄒoㄒ)/~~"
        />
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
import ImageModal from "@/components/ImageModal";
import { fetchAllPassFiles } from "@/api/file";
export default {
  name: "Home",
  components: { PageHeader, ImageCard, ImageModal },
  created() {
    this.fetchData();
  },
  data() {
    return {
      imageList: [],
      currentIndex: 0,
      showModal: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await fetchAllPassFiles();
        const { files } = data;
        this.imageList = files;
      } catch (error) {
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
img {
  width: 240px;
  height: 165px;
}

main {
  margin-top: 60px;
  padding-top: 20px;
  background-color: #eeeeee;
  box-sizing: border-box;
  .main-content {
    margin: 0 auto;
    width: 1000px;
  }
}
</style>
