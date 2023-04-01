<template>
  <header class="header-container">
    <div class="header-container__logo">
      <img src="../../../assets/logo.webp" />
    </div>
    <div class="header-container__title"><span>图片展示</span></div>
    <div class="header-container__menu">
      <div class="header-container__menu-button upload-button">
        <router-link to="/image-upload">
          <button>
            <i class="upload-button__icon icon-upload3" />
            <span class="upload-button__text">上传图片</span>
          </button>
        </router-link>
      </div>
      <div class="header-container__menu-button nav-button">
        <router-link to="/admin"><button>后台管理</button></router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  line-height: 60px;
  background-color: #1f2233;
  color: #fff;
  z-index: 999;
}

.header-container__logo {
  height: 100%;
  margin-right: 10px;
}

.header-container__logo img {
  width: 32px;
  vertical-align: middle;
}

.header-container__title {
  font-weight: 600;
}

.header-container__menu {
  margin-left: 35px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.header-container__menu-button {
  height: 36px;
  border-radius: 4px;
}

.header-container__menu-button button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  border-radius: 0;
  font-size: 18px;
  color: #fff;
}

.upload-button__icon {
  margin-right: 6px;
  font-size: 18px;
}

@media screen and (max-width: 767px) {
  // 后台管理暂时不需要移动端适配
  // 先暂时隐藏掉
  .nav-button {
    display: none;
  }

  .header-container {
    line-height: 50px;
    height: 50px;
    font-size: 20px;
  }

  .header-container__menu {
    margin-left: 15px;
  }

  .header-container__menu-button button {
    font-size: 14px;
  }
}
</style>
