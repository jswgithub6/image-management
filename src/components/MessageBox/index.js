import Vue from "vue";
import MessageBoxComponent from "./index.vue";

const MessageBoxConstructor = Vue.extend(MessageBoxComponent);

let instance = null;

const defaultCallback = () => {};

const MessageBox = function (options) {
  if (!instance) {
    instance = new MessageBoxConstructor({
      el: document.createElement("div"),
    });
  }

  for (let prop in options) {
    if (Object.hasOwnProperty.call(options, prop)) {
      instance[prop] = options[prop];
    }
  }

  instance.callback = options?.callback ?? defaultCallback;

  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export { MessageBox };
