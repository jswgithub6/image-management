<template>
  <div class="message-box-mask" v-show="visible">
    <div class="message-box-container">
      <div class="message-box__title">{{ title }}</div>
      <div class="message-box__message">{{ message }}</div>
      <div class="message-box__buttons">
        <button class="message-box__button--confirm" @click="confirm">
          {{ confirmButtonText }}
        </button>
        <button class="message-box__button--cancel" @click="cancel">
          {{ cancelButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    message: {
      type: String,
    },
    confirmButtonText: {
      type: String,
      default: "确定",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    cancel() {
      this.visible = false;
      this.callback(false);
    },
    confirm() {
      this.visible = false;
      this.callback(true);
    },
  },
};
</script>

<style lang="scss">
.message-box-mask {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-box-container {
  width: 400px;
  min-height: 160px;
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.message-box__title {
  font-weight: 600;
  margin-bottom: 16px;
}

.message-box__message {
  font-size: 14px;
  margin-bottom: 24px;
  text-align: center;
  text-align: left;
}

.message-box__buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.message-box__button--cancel,
.message-box__button--confirm {
  margin-left: 16px;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}

.message-box__button--confirm {
  color: #fff;
  background-color: #409eff;
}

.message-box__button--cancel {
  color: #606266;
  background-color: #fff;
}
</style>
