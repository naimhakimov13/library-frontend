<template>
<div style="display: flex; justify-content: center">
  <div class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_form";

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 10px;
  height: 10px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid var(--primary);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 20px;
    left: 20px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 20px;
    left: 20px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 20px;
    left: 20px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    opacity: 0;
  }
}

</style>
