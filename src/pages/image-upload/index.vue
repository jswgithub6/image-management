<template>
  <div class="upload-page">
    <div class="upload-page__container">
      <div class="image-upload">
        <div class="image-upload__header">
          <h1>发布图片</h1>
          <router-link to="/"><span>返回首页</span></router-link>
        </div>
        <div class="image-upload__content">
          <div class="image-upload__label">上传图片:</div>
          <upload ref="upload" />
        </div>
        <div class="image-upload__footer">
          <div @click="handleSave" class="image-upload__submit">
            <button>保 存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "./components/Upload.vue";
export default {
  components: { Upload },
  methods: {
    handleSave() {
      this.$msg({
        message: "图片保存成功，是否继续上传？",
        confirmButtonText: "继续上传",
        cancelButtonText: "返回列表页",
        callback: (action) => {
          if (!action) {
            this.$router.replace("/");
          } else {
            this.$refs.upload.reset();
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-page {
  width: 100vw;
  padding: 40px;
  box-sizing: border-box;

  // & .upload-page__container 可以简写成 &__container
  & .upload-page__container {
    box-sizing: border-box;
    padding: 0 70px;
  }
}

.image-upload {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  height: 100%;
  overflow: hidden;
}

.image-upload__header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
}

.image-upload__header h1 {
  font-size: 16px;
  font-weight: 600;
}

.image-upload__content {
  display: flex;
  padding: 40px 30px;
}
.image-upload__label {
  flex-shrink: 0;
  margin-right: 40px;
}

.image-upload__submit {
  cursor: pointer;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
}

.image-upload__submit button {
  background-color: #00c3ff;
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 0;
  vertical-align: top;
  outline: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 16px;
}

.image-upload__submit {
  margin: 0 auto;
}

.image-upload__footer {
  margin-bottom: 35px;
}

@media screen and (max-width: 767px) {
  .upload-page {
    padding: 0;
    & .upload-page__container {
      padding: 0;
    }
  }

  .image-upload__content {
    flex-direction: column;
    align-items: center;
    padding: 20px 25px;
  }

  .image-upload__label {
    align-self: start;
    margin-bottom: 10px;
  }

  .image-upload__submit {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
}
</style>
