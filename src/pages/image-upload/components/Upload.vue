<template>
  <div class="upload">
    <ul class="upload-list">
      <li v-for="item in filesList" :key="item.uid" class="upload-list__item">
        <div
          class="upload-list__item-thumbnail"
          :style="{ background: `url(${item.url}) no-repeat center/cover` }"
        />
        <Loading v-if="item.status === 'uploading'" />
        <div class="upload-list__item-actions">
          <i class="delete-icon icon-bin" @click="handleDelete(item)" />
        </div>
      </li>
    </ul>
    <div class="upload-card" @click="handleClick">
      <div class="upload-card__content">
        <i class="icon-plus" />
        <span>点击添加图片</span>
        <span class="upload-card__tip">支持格式jpg、png、jpeg、gif</span>
        <input
          ref="input"
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          multiple="multiple"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from "./util";
import { uploadFile, deleteFileById } from "@/api/file";
import Loading from "@/components/Loading";
export default {
  name: "Upload",
  components: {
    Loading,
  },
  data() {
    return {
      filesList: [],
      uploadFiles: [],
    };
  },
  methods: {
    async handleDelete(rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;
      fileList.splice(fileList.indexOf(file), 1);
      const resp = rawFile.response && rawFile.response.file;
      if (resp) {
        const { id: fileId } = resp;
        try {
          await deleteFileById(fileId);
        } catch (error) {
          console.log(error);
        }
      }
    },
    handleClick() {
      this.$refs.input.click();
    },
    handleChange(e) {
      const files = e.target.files;
      if (!files || !files.length) return;
      const filesList = [].slice.call(files);
      filesList.forEach((rawFile) => {
        rawFile.uid = uid();
        const file = {
          status: "ready",
          name: rawFile.name,
          size: rawFile.size,
          percentage: 0,
          uid: rawFile.uid,
          raw: rawFile,
          url: URL.createObjectURL(rawFile),
        };
        this.uploadFiles.push(file);
        // http request
        this.upload(rawFile);
      });
      this.filesList = this.uploadFiles;
    },
    async upload(rawFile) {
      this.$refs.input.value = null;
      const formData = new FormData();
      formData.append("file", rawFile, rawFile.name);
      const onUploadProgress = (e) => {
        const file = this.getFile(rawFile);
        file.status = "uploading";
        file.percentage = e.percent || 0;
      };
      try {
        const res = await uploadFile(formData, onUploadProgress);
        this.handleSuccess(res, rawFile);
      } catch (error) {
        this.handleError(error, rawFile);
        console.log(error);
      }
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);
      if (file) {
        file.status = "success";
        file.response = res;
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;
      file.status = "fail";
      fileList.splice(fileList.indexOf(file), 1);
    },
    getFile(rawFile) {
      const fileList = this.uploadFiles;
      return fileList.find((item) => item.uid === rawFile.uid);
    },
    reset() {
      this.filesList = [];
      this.uploadFiles = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-list {
  display: inline;
}

.upload-list__item {
  display: inline-block;
}

.upload-list__item,
.upload-card {
  width: 300px;
  height: 207px;
  box-sizing: border-box;
  border: 1px dashed #c0ccda;
  vertical-align: top;
  border-radius: 6px;
  margin: 0 10px 10px 0;
}

.upload-card {
  display: inline-block;
  cursor: pointer;
  background-color: #fbfdff;
  text-align: center;
}

.upload-card__content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.upload-card__tip {
  font-size: 14px;
  color: #ccc;
  line-height: 18px;
}

i {
  font-size: 32px;
  color: skyblue;
}

.upload-card input {
  display: none;
}

.upload-list__item {
  position: relative;
}

.upload-list__item-thumbnail {
  height: 100%;
}

.upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.upload-list__item-actions:hover {
  opacity: 1;
}

.delete-icon {
  color: #fff;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .upload-list__item,
  .upload-card {
    display: block;
    margin-right: 0;
  }
}
</style>
