<template>
  <el-container>
    <el-header class="admin-header">
      <div class="admin-header__logo">
        <img src="../../assets/logo.webp" alt="logo" />
      </div>
      <div class="admin-header__title"><span>图片管理系统后台</span></div>
      <router-link to="/"><span style="color: #fff">首页</span></router-link>
    </el-header>
    <el-main>
      <image-list />
    </el-main>
  </el-container>
</template>

<script>
import ImageList from "./components/ImageList.vue";
export default {
  components: { ImageList },
  name: "Admin",
};
</script>

<style lang="scss" scoped>
.admin-header {
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 24px;
  line-height: 60px;
  background-color: #1f2233;
  color: #fff;
  z-index: 999;
}

.el-main {
  margin-top: 60px;
}

.admin-header__logo {
  display: inline-block;
  height: 60px;
  vertical-align: top;
  margin-right: 10px;
}

.admin-header__logo img {
  width: 32px;
  vertical-align: middle;
}

.admin-header__title {
  vertical-align: top;
  display: inline-block;
  font-weight: 600;
  margin-right: 50px;
}
</style>
