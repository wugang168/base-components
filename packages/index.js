import button from "./button";

const components = [button];

const install = function (Vue) {
  components.map((component) => {
    Vue.use(component);
  });
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  button,
};
