<template>
  <div class="">
    <div class="video-box">
      <div class="video-wrap">
        <my-videoplay class="my-video" :options="videoOptions"></my-videoplay>
      </div>
      <div class="list-wrap">
        <div
          class="list-item"
          v-for="item in videoDataList"
          :key="item.src"
          @click="itemClick(item)"
        >
          {{ item.src }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoDataList: [
        {
          src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        },
        {
          src: "https://video.ehang.com/vt30/one_bg.mp4",
        },
      ],
      videoOptions: {
        sources: "",
        width: "100%",
        height: "100%",
      },
    };
  },
  methods: {
    itemClick(data) {
      this.videoOptions.sources = data.src;
    },
  },
};
</script>

<style>
.video-box {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.video-wrap,
.list-wrap {
  width: 500px;
  height: 500px;
}
.list-item {
  line-height: 40px;
  height: 40px;
  color: red;
  border: 1px solid #939393;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
