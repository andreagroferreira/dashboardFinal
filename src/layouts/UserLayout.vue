<template>
  <div id="root">
    <div class="fixed-background" style="background-image: url('/assets/img/login/bg-test.jpg')"></div>
    <main>
      <div class="container">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  mounted() {
    document.body.classList.add("background");
  },
  beforeDestroy() {
    document.body.classList.remove("background");
  }
};
</script>
