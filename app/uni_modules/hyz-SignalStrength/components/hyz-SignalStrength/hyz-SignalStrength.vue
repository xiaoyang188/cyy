<template>
  <view class="signal-container">
    <view class="signal-bar" :style="signalBarStyle"></view>
    <text class="signal-text">{{ signalStrength }}</text>
  </view>
</template>

<script>
  export default {
    props: {
      signalStrength: {
        type: Number,
        required: true,
      },
    },
    computed: {
      signalBarStyle() {
        return {
          width: `${this.signalStrength}%`,
        };
      },
    },
  };
</script>

<style>
  .signal-container {
    display: flex;
    align-items: center;
    height: 30px;
    width: 150px;
    background-color: #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .signal-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s;
  }

  .signal-text {
    margin-left: 10px;
    color: #000;
    font-weight: bold;
  }
</style>