<template>
  <view>
   <view v-show="show1">
     <video class="video" id="demoVideo" controls v-for="(list,i) in gamew" :key="i"
     :play-btn-position="center"
      :src="list.src">
     	</video>
   </view>
   <view v-show="show2">
     玉桂狗2
   </view>
   <view v-show="show3">
     库洛米3
   </view>
   <view v-show="show4">
     第四个内容
   </view>
   <view v-show="show5">
     第5个内容
   </view>
  </view>
</template>

<script>
  export default {
  data() {
    return {
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      show5:false ,
      gamew:[{src:'cloud://miximg-9gpgytum8b40fcfb.6d69-miximg-9gpgytum8b40fcfb-1317430923/gamew/gamew1mp4.mp4',title:'wangzhe'},
      {src:'cloud://miximg-9gpgytum8b40fcfb.6d69-miximg-9gpgytum8b40fcfb-1317430923/gamew/gamew2.mp4',title:'wangzhe'},
      {src:'cloud://miximg-9gpgytum8b40fcfb.6d69-miximg-9gpgytum8b40fcfb-1317430923/gamew/gamew3.mp4',title:'wangzhe'},
      {src:'cloud://miximg-9gpgytum8b40fcfb.6d69-miximg-9gpgytum8b40fcfb-1317430923/gamew/gamew4.mp4',title:'wangzhe'}
      ],
      girls:[{}],
      yuanshe :[{}]
    }
  },
  onLoad(options) {
          switch(options.id) {
            case '1':
              this.show1 = true;
              break;
            case '2':
              this.show2 = true;
              break;
            case '3':
              this.show3 = true;
              break;
            case '4':
              this.show4 = true;
              break;
            case '5':
              this.show5 = true;
              break;
            default:
          }
    },
    methods: {
      
    }
  }
</script>

<style>
video{
	width: 750rpx;
}
</style>
