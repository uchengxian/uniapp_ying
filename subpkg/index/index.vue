<template>
  <view>
   <view v-if="show1">
     <input type="text" v-model="title"  placeholder="上传一些视频" maxlength="10">
     <uni-file-picker 
     	v-model="imageValue" 
     	fileMediatype="video" 
      limit="1"
     	mode="grid" 
     	@select="select" 
     	@progress="progress" 
     	@success="success" 
     	@fail="fail" 
     />
     <button type="default" @click="add_videos" :disabled="dis_btn" >点击发布</button>
     <view v-for="(list,i) in video_url" :key="i" class="images_box">
       <view class="remove_class">
         <uni-icons type="closeempty" size="40" class="show_remove" @click="remove1(index,i)"></uni-icons>
       </view>
       <text class="images_title">{{list.title}}</text>
      <video :src="list.url" class="image_style" controls></video>
     </view>
   </view>
   <view v-else-if="show2">
     <input type="text" v-model="title"  placeholder="上传一些图片" maxlength="10">
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
       <view class="remove_class">
         <uni-icons type="closeempty" size="30" class="show_remove" @click="remove2(index,i)"></uni-icons>
       </view>
       <text class="images_title">{{list.title}}</text>
      <image :src="list.url" mode="aspectFill" class="image_style" @click="clickImg2(index,i)"></image>
     </view>
   </view>
   <view v-else-if="show3">
     <input type="text" v-model="title"  placeholder="可以上传一些蛋仔" maxlength="10" >
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
     <button type="default" @click="add_gamed" :disabled="dis_btn" >点击发布</button>
     <view v-for="(list,i) in gamed_url" :key="i" class="images_box">
       <view class="remove_class">
         <uni-icons type="closeempty" size="30" class="show_remove" @click="remove3(index,i)"></uni-icons>
       </view>
       <text class="images_title">{{list.title}}</text>
      <image :src="list.url" mode="aspectFill" class="image_style" @click="clickImg3(index,i)"></image>
     </view>
   </view>
   <view v-else-if="show4">
     <input type="text" v-model="title"  placeholder="可以上传一些王者" maxlength="10">
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
     <button type="default" @click="add_gamew" :disabled="dis_btn" >点击发布</button>
     <view v-for="(list,i) in gamew_url" :key="i" class="images_box">
       <view class="remove_class">
         <uni-icons type="closeempty" size="30" class="show_remove" @click="remove4(index,i)"></uni-icons>
       </view>
       <text class="images_title">{{list.title}}</text>
      <image :src="list.url" mode="aspectFill" class="image_style" @click="clickImg4(index,i)"></image>
     </view>
   </view>
 <view v-else>
     这是没有内容的页面
   </view>
  </view>
</template>

<script>
    let id ;
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
      data_image:{},
      img_url:[],
      video_url:[],
      data_video:{},
      gamed_url:[],
      data_gamed:{},
      gamew_url:[],
      data_gamew:{}
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
   this.get_media("images")
   this.get_media("video")
   this.get_media("gamed")
   this.get_media("gamew")
    },
    onReachBottom() {
   this.get_datas("list_video")
   this.get_datas("list_images")
    },
    methods: {
      //预览
   clickImg2(index,i) {
   				wx.previewImage({
   					urls: [this.img_url[i].url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
   					current: '', // 当前显示图片的http链接，默认是第一个
   					success: function(res) {},
   					fail: function(res) {},
   					complete: function(res) {},
   				})
   			},
   clickImg3(index,i) {
   				wx.previewImage({
   					urls: [this.gamed_url[i].url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
   					current: '', // 当前显示图片的http链接，默认是第一个
   					success: function(res) {},
   					fail: function(res) {},
   					complete: function(res) {},
   				})
   			},
   clickImg4(index,i) {
   				wx.previewImage({
   					urls: [this.gamew_url[i].url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
   					current: '', // 当前显示图片的http链接，默认是第一个
   					success: function(res) {},
   					fail: function(res) {},
   					complete: function(res) {},
   				})
   			},
        
        //获取数据 传递名字响应对应的数据
        get_media(type){
          uniCloud.callFunction({
            name:"get_list",
            data:{
              collectionName:`list_${type}`
            }
          }).then(res=>{
            if(type === 'images'){
              this.img_url = res.result.data
            }else if(type === 'video'){
              this.video_url = res.result.data
            }
            else if(type === 'gamed')
            {
              this.gamed_url = res.result.data 
            }    else if(type === 'gamew')
            {
              this.gamew_url = res.result.data 
            }
          })
        },


  //按点击删除事件
remove1(index,i){
  const id = this.video_url[i]._id;
  uni.showModal({
    content:"确定删除吗",
    success: (res) => {
      if(res.confirm)
      {
        this.deleteItem('list_video', id, '../../subpkg/index/index?id=1');
      }
    }
  })
},
remove2(index,i){
  const id = this.img_url[i]._id;
  uni.showModal({
    content:"确定删除吗",
    success: (res) => {
      if(res.confirm)
      {
        this.deleteItem('list_images', id, '../../subpkg/index/index?id=2');
      }
    }
  })
},
remove3(index,i){
  const id = this.gamed_url[i]._id;
  uni.showModal({
    content:"确定删除吗",
    success: (res) => {
      if(res.confirm)
      {
        console.log(id);
        this.deleteItem('list_gamed', id, '../../subpkg/index/index?id=3');
      }
    }
  })
},
remove4(index,i){
  const id = this.gamew_url[i]._id;
  uni.showModal({
    content:"确定删除吗",
    success: (res) => {
      if(res.confirm)
      {
        console.log(id);
        this.deleteItem('list_gamew', id, '../../subpkg/index/index?id=4');
      }
    }
  })
},
//删除函数给函数参数和id和地址删除
      deleteItem(table, id, url) {
        uniCloud.callFunction({
          //调用删除数据库云函数
          name:"remove_list",
          data:{id,table}
        }).then(res=>{
          uni.showToast({
            //图标删除
            title:"删除成功"
          })
          //删除完毕跳转
          setTimeout(()=>{
            uni.reLaunch({
              url: url
            },500)
          })
        })
      },
      get_videos(){
        uniCloud.callFunction({
          name:"get_list",
          data:{
            //传递要读取的数据表
            collectionName:"list_video",
            //刷新几个数据 一开始刷新几条数据
            skip:this.video_url.length
          }
        }).then(res=>{
          //把新数据和久数据拼接起来 触底就刷新五条记录
          let oldlist = this.video_url
          this.video_url = [...oldlist,...res.result.data ]
        })
      },
      add_videos(){
        let titles = this.title
        let detail = this.data_video
        if(titles==="")
        {
          return "没输入东西"
        }
        else if(detail==="")
        {
          return "没输入"
        }
        uniCloud.callFunction({
          name:"add_data_images",
          data:{
            table:"list_video",
            detail,
            titles
            }
        }).then(res=>{
           uni.reLaunch({
                  url: '../../subpkg/index/index?id=1'
                });
        })
      },
      //照片加载刷新
      get_data(){
        uniCloud.callFunction({
          name:"get_list",
          data:{
            //传递要读取的数据表
            collectionName:"list_images",
            //刷新几个数据 一开始刷新几条数据
            skip:this.img_url.length
          }
        }).then(res=>{
          //把新数据和久数据拼接起来 触底就刷新五条记录
          let oldlist = this.img_url
          let newlist = [...oldlist,...res.result.data ]
          this.img_url = newlist
        })
      },
     get_datas(type) {
       let collectionName = type === 'video' ? 'list_video' : 'list_images'
       let data = type === 'video' ? this.video_url : this.img_url
       let skip = data.length
       uniCloud.callFunction({
         name: 'get_list',
         data: {
           collectionName: collectionName,
           skip: skip
         }
       }).then(res => {
         let oldlist = data
         let newlist = [...oldlist, ...res.result.data]
         if (type === 'video') {
           this.video_url = newlist
         } else {
           this.img_url = newlist
         }
       })
     },
      ///添加图片和文字
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
        uniCloud.callFunction({
          name:"add_data_images",
          data:{
            detail,
            table:"list_images",
            titles}
        }).then(res=>{
           uni.reLaunch({
                  url: '../../subpkg/index/index?id=2'
                });
        })
      },
      add_gamed(){
        let titles = this.title
        let detail = this.data_gamed
        if(titles==="")
        {
          return "没输入东西"
        }
        else if(detail==="")
        {
          return "没输入"
        }
        uniCloud.callFunction({
          name:"add_data_images",
          data:{
            detail,
            table:"list_gamed",
            titles
            }
        }).then(res=>{
           uni.reLaunch({
                  url: '../../subpkg/index/index?id=3'
                });
        })
      
      },
      add_gamew(){
        let titles = this.title
        let detail = this.data_gamew
        if(titles==="")
        {
          return "没输入东西"
        }
        else if(detail==="")
        {
          return "没输入"
        }
        uniCloud.callFunction({
          name:"add_data_images",
          data:{
            detail,
            table:"list_gamew",
            titles
            }
        }).then(res=>{
           uni.reLaunch({
                  url: '../../subpkg/index/index?id=4'
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
              this.data_video = e.tempFilePaths
              this.data_image = e.tempFilePaths
              this.data_gamed = e.tempFilePaths
              this.data_gamew = e.tempFilePaths
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
  .remove_class{
    background-color: #ffffff;
    width: 100px;
    height: 20px; 
    margin-left: 75%;
  }
  input::placeholder {
    color: red;
  }
  
video{
	width: 750rpx;
}
input[type="text"] {
  padding: 10px;
  border: 2px solid #ffaaff;
  border-radius: 5px;
  color: blueviolet;
  font-size: 16px;
  outline: none;
}
.images_box{
  margin-top: 20px;
  text-align: center;
  border: 2px solid #ffaaff;
}
  .images_title {
    font-size: 18px;
    color: aquamarine;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .image_style {
    width: 95%;
    margin-left: 2.5%;
    border-radius: 10px;
  }
</style>
