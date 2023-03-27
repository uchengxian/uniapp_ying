<template>
  <view class="container">
    <!-- 轮播图标签 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#bbc0cc" indicator-active-color="#ff21da">
    <swiper-item v-for="(item,i) in _image_" :key="i">
      <navigator class="swiper-item" :url="'../../subpkg/index/index?id='+item.id">
        <image :src="item.url" mode="aspectFill" class="image"></image>
      </navigator>
    </swiper-item>
      </swiper>
      <!-- 添加列表清单 -->
      <view class="header">
        <input class="input" placeholder="请输入待办事项" v-model="inputValue" @confirm="addTodo" />
        <button class="add-btn" @click="addTodo">添加</button>
      </view>
      <view class="todo-list">
        <view class="todo-item" v-for="(item, index) in todos" :key="index">
          <!-- 左边的勾勾 -->
          <view class="todo-item-left" >
            <checkbox/>
            <text>{{ item.content }}</text>
          </view>
          <!-- 右边的删除 -->
          <view class="todo-item-right">
            <button class="delete-btn" @click="deleteTodo(index)">删除</button>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
  //定义id来获取点击的哪个元素
  let id;
export default {
  data() {
    return {
      inputValue: '',
      //获取索引
      index:0,
      //图片地址
      _image_:[
        {url:"../../static/tabbar/swiper_dog.png",id:1},
         {url:"../../static/tabbar/swiper_dog2.png",id:2},
          {url:"../../static/tabbar/swiper_klm.png",id:3},
            {url:"../../static/tabbar/swiper_dog.png",id:4},
            {url:"../../static/tabbar/swiper_dog2.png",id:5}
      ],
      todos: [
        {
    "time": 1679879424217,
    "content": "我想你了"
} 
      ], 
      id:0
    }
  },
  onLoad() {
    this.getlist()
  },
  onReachBottom() {
    this.get_data()
  },
  methods: {
    //下拉时刷新数据
    get_data(){
      uniCloud.callFunction({
        name:"get_list",
        data:{
          //刷新几个数据 一开始刷新几条数据
          skip:this.todos.length
        }
      }).then(res=>{
        console.log(res);
        //把新数据和久数据拼接起来 触底就刷新五条记录
        let oldlist = this.todos
        let newlist = [...oldlist,...res.result.data ]
        this.todos = newlist
      })
    },
    //一开始获取的数据
getlist(){
  uniCloud.callFunction({
    name:"get_list",
    data:{}
  }).then(res=>{
    this.todos = res.result.data
  })
},
  goToPage(id) {
     uni.navigateTo({
       url: '../../subpkg/index/index?id='+ id
     })
   },
    showModal(index) {
      uni.showModal({
        title: '提示',
        content: '真的要删除嘛-,-',
        success: (res) => {
          if (res.confirm) {
            this.deleteTodo(index);
          }
        }
      });
    },
    addTodo(e) {
      if (this.inputValue.trim() === '') {
        return
      }
      let content = this.inputValue
      console.log(this.inputValue);
     uniCloud.callFunction({  
       name:"add_list",
       data:{
         content
       }
     }).then(res=>{
     uni.showToast({
       title:"发布成功!"
     })
     setTimeout(()=>{
       uni.reLaunch({
         url:"/pages/home/home"
       })
     },500)
     })
    },
deleteTodo(i){
  id = this.todos[i]._id
  console.log(id);
  uni.showModal({
    content:"确定删除吗",
    success: (res) => {
      //删除确认confirm为真  调用函数
      if(res.confirm)
      {
        this.art_remove1()
      }
    }
  })
}
,
    art_remove1(){
      uniCloud.callFunction({
        //调用删除数据库云函数
        name:"remove_list",
        data:{id}
      }).then(res=>{
       uni.showToast({
         //图标删除
         title:"删除成功"
       })
       //删除完毕跳转
       setTimeout(()=>{
         uni.reLaunch({
           url:"/pages/home/home"
         },500)
       })
      })
    }
  }
}
</script>

<style>
  .container {
    padding: 2px;
  }
  .header {
     display: flex;
      align-items: center;

    margin-bottom: 12px;
    margin-top: 12px;
  }
  .input {
    flex: 1;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #55ff00;
    border-radius: 4px;
    font-size: 16px;
  }
  .add-btn {
    margin-left: 12px;
    height: 40px;
    padding: 0 12px;
    border: none;
    border-radius: 4px;
    background-color: #ffaaff;
    color: #55ffff;
    font-size: 16px;
  }

  .todo-list {
    margin-top: 20px;
  }
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid #aaffff;
  border-radius: 4px;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  color: #ffffff;
}
.delete-btn {
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 4px;
  background-color: #55ffff;
  color: #fff;
  font-size: 16px;
}
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
  swiper{
    height: 250px;
  }
.image{
  width: 100%;
}
</style>