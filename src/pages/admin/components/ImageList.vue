<template>
  <div class="image-list">
    <div class="image-list__content">
      <draggable
        v-model="imageList"
        class="draggable"
        :move="onMove"
        :disabled="isSorting"
        @change="handleSort"
      >
        <image-card
          v-for="item in imageList"
          :key="item.id"
          :image-detail="item"
          :img-src="item.url"
          :thumbnail-src="item.thumbnailUrl"
          :review-status="item.reviewStatus"
          @click="handleClick"
          @delete="deleteFile(item.id)"
          @pass="updateStatus(item.id, 'pass')"
          @reject="updateStatus(item.id, 'reject')"
          @setTop="setTopImage(item.id)"
        />
      </draggable>
      <el-empty
        v-if="!imageList.length"
        description="这里空空如也 /(ㄒoㄒ)/~~"
      />
    </div>
    <div class="image-list__footer">
      <el-pagination
        @current-change="fetchData"
        :current-page.sync="queryInfo.pageNumber"
        :page-size="queryInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      />
    </div>
    <image-modal
      :showModal.sync="showModal"
      :images="imageList"
      :currentIndex.sync="currentIndex"
      @pass="updateStatus"
      @reject="updateStatus"
    >
      <template #header="{ image }">
        <div style="flex: 1">
          <el-button
            round
            type="success"
            size="mini"
            @click="updateStatus(image.id, 'pass')"
          >
            通过
          </el-button>
          <el-button
            round
            type="danger"
            size="mini"
            @click="updateStatus(image.id, 'reject')"
          >
            拒绝
          </el-button>
          <status style="margin-left: 10px" :status="image.reviewStatus" />
        </div>
      </template>
    </image-modal>
  </div>
</template>

<script>
import _ from "lodash";
import ImageCard from "./ImageCard.vue";
import Status from "./Status.vue";
import ImageModal from "@/components/ImageModal";
import draggable from "vuedraggable";
import {
  fetchFileList,
  deleteFileById,
  updateReviewStatus,
  pinImageToTop,
  sortImage,
} from "@/api/file";
export default {
  name: "ImageList",
  components: {
    ImageModal,
    ImageCard,
    Status,
    draggable,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      imageList: [],
      total: 0,
      queryInfo: {
        pageNumber: 1,
        pageSize: 20,
      },
      showModal: false, // 是否展示大图
      currentIndex: 0, // 当前点击的图片的Index
      isSorting: false,
    };
  },
  methods: {
    onMove({ draggedContext, relatedContext }) {
      const draggedElementIsTop = !!draggedContext.element.isTop;
      const relatedElementIsTop = !!relatedContext.element.isTop;
      /**
       * 如果被拖拽的元素是置顶元素，则停靠的元素不能是非置顶元素
       * 如果被拖拽的元素是非置顶元素，则停靠的元素不能是置顶元素
       */
      const canDrop = draggedElementIsTop
        ? relatedElementIsTop
        : !relatedElementIsTop;
      return canDrop;
    },
    async handleSort({ moved }) {
      try {
        const { element, newIndex, oldIndex } = moved;
        const { id, order } = element;
        this.isSorting = true;
        if (oldIndex < newIndex) {
          // 位置向后移动
          // 因为图片是按照order降序，所以这里相当于order向前移动
          const { order: insertBefore } = this.imageList[newIndex - 1];
          await sortImage({ id, order, insertBefore });
        } else {
          // 位置向前移动
          // 同理 order向后移动
          const { order: insertAfter } = this.imageList[newIndex + 1];
          await sortImage({ id, order, insertAfter });
        }
        await this.fetchData();
      } catch (error) {
        console.log(error);
      } finally {
        this.isSorting = false;
      }
    },
    async fetchData() {
      try {
        const { data } = await fetchFileList(this.queryInfo);
        const { files, count } = data;
        this.imageList = files;
        this.total = count;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFile(fileId) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await deleteFileById(fileId);
        this.$message.success({ message: "文件删除成功", duration: 1500 });
        this.fetchData();
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatus(fileId, reviewStatus) {
      try {
        await updateReviewStatus(fileId, reviewStatus);
        this.$message.success({ message: "操作成功", duration: 1500 });
        this.updateData(fileId, reviewStatus);
      } catch (error) {
        this.$message.error("操作失败，请重试");
        console.log(error);
      }
    },
    async setTopImage(fileId) {
      try {
        await pinImageToTop(fileId);
        this.$message.success({ message: "置顶成功", duration: 1500 });
        this.fetchData();
      } catch (error) {
        this.$message.error("操作失败，请重试");
        console.log(error);
      }
    },
    updateData(fileId, reviewStatus) {
      const files = this.imageList;
      let idx;
      const file = files.find((item, index) => {
        idx = index;
        return item.id === fileId;
      });
      const cloneData = _.cloneDeep(file);
      cloneData.reviewStatus = reviewStatus;
      files.splice(idx, 1, cloneData);
    },
    handleClick(image) {
      // open dialog
      this.showModal = true;
      const index = _.findIndex(this.imageList, image);
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.draggable {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.image-list__footer {
  margin-top: 10px;
}
</style>
