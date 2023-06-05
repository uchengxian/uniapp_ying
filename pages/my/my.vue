<template>
  <view class="container">
      <view id="developerView" >
        <view class="column">
          <view class="developerItemView" v-for="(list,i) in obj" :key="i">
            <h4>{{list.title}}</h4>
            <view  @click="copyBtn">{{ list.name }}</view>
          </view> 
        </view>
        <view class="column">
          <view class="developerItemView" v-for="(list,i) in obj2" :key="i">
            <h4>{{list.title}}</h4>
            <view  @click="copyBtn">{{ list.name }}</view>
          </view> 
        </view>
      </view>
    </view> 
</template>

<script>
export default {
  data() {
    return {
      obj:[
        {name:"tao",title:"name"},
            {name:"13203645330",title:"phone"},
            {name:"2677661670@qq.com",title:"email"},
      ],
      obj2:[
        {name:"yyy",title:"name"},
            {name:"123",title:"phone"},
            {name:"123@gmail.com",title:"email"}
      ]
    }
  },
  methods: {
       copyBtn(e) {
                      uni.setClipboardData({
                      //去找上面的数据
                          success: function (res) {
                              uni.showToast({
                                  title: '复制失败',
                              });
                          },
                          fail:function (res) {
                              uni.showToast({
                                  title: '复制成功',
                              });
                          }
                      });
                  }
  },
}
</script>

<style>
 #developerView {
   padding: 0 40rpx;
   display: flex;
   justify-content: space-between;
 }
 
 .column {
   display: flex;
   flex-direction: column;
   margin-right: 20rpx;
 }
 
 .developerItemView {
   padding-bottom: 30rpx;
 }
 
 .developerItemView>view:nth-child(1) {
   font-size: 30rpx;
   color: #87cefa;
   padding-bottom: 20rpx;
 }
 
 .developerItemView>view:nth-child(2) {
   font-size: 26rpx;
   color: #00007f;
 }
 
 .copy-btn {
   display: inline-block;
   margin-left: 10px;
   font-size: 14px;
   font-weight: bold;
   color: #fff;
   background-color: #ff557f;
   border: none;
   border-radius: 5px;
   cursor: pointer;
 }

</style>
