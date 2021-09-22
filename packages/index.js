import button from "./button";
import videoPlay from "./videoPlay";

const components = [button, videoPlay];

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
  videoPlay,
};
