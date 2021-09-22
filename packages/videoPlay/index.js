import videoPlay from "./src/videoPlay.vue";
videoPlay.install = function (Vue) {
  Vue.component(videoPlay.name, videoPlay);
};
export default videoPlay;
