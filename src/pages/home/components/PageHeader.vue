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
            上传图片
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
  height: 60px;
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
  height: 60px;
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
</style>
