<template>
  <div class="loading">
    <img src="../../../public/img/logo-mark.svg" alt="zarinPal" />
    <div class="proccessBar">
      <div class="indeterminate bar"></div>
    </div>
  </div>

  <div class="bottom-logo">
    <img src="../../../public/img/logo-type.svg" alt="zarinPal" />
  </div>
</template>
<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: '!bg-surface',
  },
});
onUnmounted(() => {
  document.body.classList.remove('!bg-surface');
});
</script>
<style lang="scss" scoped>
body {
  margin: 0;
  display: block;
  min-height: 100vh;
  background-color: #ffffff;
}

.parent {
  position: relative;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 40px;
  position: absolute;
  width: 160px;
  height: 124px;
  left: calc(50% - 160px / 2);
  top: calc(50% - 124px / 2);
}

.proccessBar {
  width: 160px;
  height: 4px;
  background: #f8f8f8;
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.bar {
  background-color: rgb(10 51 255);
  height: 100%;
  transition: all 0.5s linear;
  border-radius: 15px;
}

.indeterminate {
  position: relative;
  width: 50%;
  left: 50%;
  animation-timing-function: linear;
  animation: bluebar 1.5s infinite ease;
  animation-direction: alternate;
}

.bottom-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  position: absolute;
  width: 99px;
  height: 24px;
  left: calc(50% - 99px / 2 + 0.5px);
  bottom: 40px;
}

@keyframes bluebar {
  0%,
  10% {
    width: 15%;
    left: 0;
    background-color: #9dadff;
  }

  40%,
  60% {
    width: 100%;
    left: 0;
    background-color: #0a33ff;
  }

  90%,
  100% {
    width: 15%;
    left: 85%;
    background-color: #9dadff;
  }
}
</style>
