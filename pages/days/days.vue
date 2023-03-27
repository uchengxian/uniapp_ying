<template>
  <view class="love-diary">
    <!-- 发布区块 -->
    <view class="add-diary">
      <input type="text" placeholder="标题不能为空" v-model="newDiary.title" /> 
      <textarea placeholder="内容不能为空" v-model="newDiary.content" width="50px" maxlength="-1"></textarea>
      <button @click="addDiary" class="btnsfabu">发布</button>
    </view>
    <!-- 照片展示区块 -->
    <view class="photo-list">
      <view class="photo-item" v-for="(item, index) in photoList" :key="index">
        <image :src="item.src" mode="heightFix" />
      </view>
    </view>
    <!-- 日记展示区块 -->
    <view class="diary-list">
      <view class="diary-item" v-for="(item, index) in list" :key="index">
        <view class="diary-item-title">{{item.title}}</view>
        <view class="diary-item-content">内容：{{item.content}}</view>
        <view class="diary-item-action">
          <button @click="editDiary(index)">编辑</button>
          <button @click="deleteDiary(index)">删除</button>
          <view class="diary-item-time">发布时间：{{formatDate(item.time)}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  let id;
export default {
  data() {
    return {
      list:[{
    "title": "就是计算机三级",
    "content": "和叫我姐姐",
    "time": 1679888291400
},
{
    "title": "这种东西就可以",
    "content": "这么齐",
    "time": 1679888237865
}],
      index:0,
      newDiary: {}, // 新日记
      photoList: [
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
     
     {
       src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
     },
     {
       src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
     },
     {
       src:"https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QWxwZXMlMjBQZW5pbmVzJTJDJTIwU3dpdHplcmxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
     } ], // 照片列表
    };
  },
  onLoad() {
    uniCloud.callFunction({
      name:"get_days",
      data:{}
    }).then(res=>{
      this.list = res.result.data
    })
  },
  onReachBottom() {
    this.get_data()
  },
  methods: {
    //拼接数据
    get_data(){
      uniCloud.callFunction({
        name:"get_days",
        data:{
          //刷新几个数据 一开始刷新几条数据
          skip:this.list.length
        }
      }).then(res=>{
        //把新数据和久数据拼接起来 触底就刷新五条记录
        let oldlist = this.list
        let newlist = [...oldlist,...res.result.data ]
        this.list = newlist
      })
    },
    // 新增日记
    addDiary(e) {
      //点击添加的时候显示添加成功跳转到刷新当前页面
      if (this.newDiary.title && this.newDiary.content) {
        let detail = this.newDiary 
        uniCloud.callFunction({
          name:"add_days",
          data:{detail}
        }).then(res=>{
          uni.showToast({
            title:"添加成功！"
          })
          setTimeout(()=>{
            uni.reLaunch({
              url:"/pages/days/days"
            })
          },500)
        })
      }
    },
    //日期格式化
    formatDate(res) {
          const date = new Date(res);
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const hours = ("0" + date.getHours()).slice(-2);
          const minutes = ("0" + date.getMinutes()).slice(-2);
          const seconds = ("0" + date.getSeconds()).slice(-2);
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    // 编辑日记
    editDiary(index) {
      // TODO: 实现编辑日记的功能
    },
    // 删除日记
    deleteDiary(i) {
      id = this.list[i]._id
      uni.showModal({
        content:"确定删除吗",
        success: (res) => {
          //删除确认confirm为真  调用函数
          if(res.confirm)
          {
            //确认调用
            this.deledays()
          }
        }
      })
    },
    deledays(){
      uniCloud.callFunction({
        //删除函数
        name:"remove_days",
        data:{id}
      }).then(res=>{
        uni.showToast({
          title:"删除成功了"
        })
        //0.5刷新当前页面
      setTimeout(()=>{
        uni.reLaunch({
          url:"/pages/days/days"
        })
      },500)
      })
    }
  },
};
</script>

<style>
  .btnsfabu{
    background-color: #FFC0CB;
    color: #010101;
  }
.love-diary {
  background-color: #ffc0cb ;
  padding: 20rpx;
}
.diary-list {
  margin-bottom: 40rpx;
}
.diary-item {
  background-color: #ffb3b3;
  border-radius: 10rpx;
  box-shadow: 20rpx 20rpx 6rpx rgba(240, 128, 128, 0.5);
  margin-bottom: 20rpx;
  padding: 20rpx;
}
.diary-item:nth-child(even) {
  background-color: #ffe6e6;
  box-shadow: 20rpx 20rpx 6rpx rgba(230, 230, 250,0.5);
}

.diary-item-title {
  color: #999;
  text-align: center;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.diary-item-content {
  color: #333;
font-size: 24rpx;
line-height: 1.5;
margin-bottom: 10rpx;
}
.diary-item-time {
margin-top: 10rpx;
color: #aa00ff;
font-size: 22rpx;
margin-bottom: 10rpx;
}
.diary-item-action {
display: flex;
justify-content: flex-end;
margin-top: 10rpx;
}
.diary-item-action button {
background-color: #FFD1DC;
border: 1rpx solid #999;
border-radius: 20rpx;
color: #000000;
font-size: 24rpx;
margin-left: 10rpx;
padding: 10rpx 20rpx;
}
.diary-item-action button:first-child {
background-color:#F08080;
border-color: #F08080;
color: #fff;
}
.add-diary {
background-color: #ffe4e1 ;
border-radius: 10rpx;
box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
margin-bottom: 20rpx;
padding: 20rpx;
}
.add-diary input,
.add-diary textarea {
border: none;
border-radius: 10rpx;
background-color: #E6C5C8;
box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
font-size: 24rpx;
margin-bottom: 10rpx;
padding: 20rpx;
width: 100%;
}
.add-diary button.add-btn {
background-color: #FFE4E1;
border: none;
border-radius: 20rpx;
color: #fff;
font-size: 24rpx;
padding: 10rpx 20rpx;
}
.photo-list {
  margin: 20rpx 0;
display: flex;
flex-wrap: wrap;
}
.photo-item {
width: 10.33%;
padding: 10rpx;
}
.photo-item image {
width: 100%;
height: 200rpx;
border-radius: 10rpx;
overflow: hidden;
}
.no-data {
color: #999;
font-size: 24rpx;
text-align: center;
}
</style>
