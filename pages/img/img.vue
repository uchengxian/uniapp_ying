<template>
  <view class="container">
    <view class="uni-media-list">
      <image  v-for="(list,i) in imageList" :key="i" :src="list.src" class="uni-media-list-img"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        {
          src: "https://picsum.photos/id/267/200/300",
        },
        {
          src: "https://picsum.photos/id/34/200/300",
        },
        {
          src: "https://picsum.photos/id/13/200/300",
        },
        {
          src: "https://picsum.photos/id/267/200/300",
        },
        {
          src: "https://picsum.photos/id/34/200/300",
        },
        {
          src: "https://picsum.photos/id/13/200/300",
        }
      ]
    };
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.uni-media-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.uni-media-list-img {
  width: 48%; /* 更改为30% */
  margin-bottom: 10px;
}
</style>
