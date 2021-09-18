<template>
  <div class="my-button">我的组件按钮我调整一下文字信息</div>
</template>

<script>
export default {
  name: "my-button",
  mounted() {
    console.log("我的自定义组件被,引入进来了！");
  },
};
</script>

<style>
.my-button {
  color: red;
}
</style>
