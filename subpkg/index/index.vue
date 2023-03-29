<template>
  <view>
   <view v-show="show1">
     <video class="video" id="demoVideo" controls v-for="(list,i) in gamew" :key="i"
     :play-btn-position="center"
      :src="list.src">
     	</video>
   </view>
   <view v-show="show2">
     <input type="text" v-model="title"  placeholder="要上传一张图片这里写他的标题" maxlength="10">
     <uni-file-picker 
     	v-model="imageValue" 
     	fileMediatype="image" 
      limit="1"
     	mode="grid" 
     	@select="select" 
     	@progress="progress" 
     	@success="success" 
     	@fail="fail" 
     />
     <button type="default" @click="add_images" :disabled="dis_btn" >点击发布</button>
     <view v-for="(list,i) in img_url" :key="i" class="images_box">
       <text class="images_title">{{list.title}}</text>
      <image :src="list.url" mode="aspectFill" class="image_style"></image>
     </view>
   </view>
   <view v-show="show3">

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
      title:"",
      dis_btn:true,
      imageValue:[],
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      show5:false ,
      gamew:[],
      data_image:{},
      img_url:[]
    }
  },
  onLoad(options) {
    //页面加载时的内容
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
   this.get_images()
    },
    methods: {
      get_images(){
        uniCloud.callFunction({
          name:"get_data_images",
          data:{}
        }).then(res=>{
          this.img_url = res.result.data
        })
      },
      add_images(){
        let titles = this.title
        let detail = this.data_image
        if(titles==="")
        {
          return "没输入东西"
        }
        else if(detail==="")
        {
          return "没输入"
        }
        console.log(detail)
        uniCloud.callFunction({
          name:"add_data_images",
          data:{detail,titles}
        }).then(res=>{
           uni.reLaunch({
                  url: '../../subpkg/index/index?id=2'
                });
        })
      },
      			select(e){
      				console.log('选择文件：',e)
      			},
      			// 获取上传进度
      			progress(e){
      				console.log('上传进度：',e)
      			},
      			// 上传成功
      			success(e){
      				console.log('上传成功',e.tempFilePaths[0])
              this.data_image = e.tempFilePaths
              this.dis_btn = false
      			},
      			// 上传失败
      			fail(e){
      				console.log('上传失败：',e)
      			}
    }
  }
</script>

<style>
video{
	width: 750rpx;
}
input[type="text"] {
  padding: 10px;
  border: 2px solid #ffaaff;
  border-radius: 5px;
  color: bisque;
  font-size: 16px;
  outline: none;
}

input[type="text"]:focus {
  border-color: #007bff;
}

.images_box{
  text-align: center;
  height: 40vh;
}
  .images_title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .image_style {
    width: 90%;
    margin-left: 2.5%;
    border-radius: 10px;
  }
</style>
