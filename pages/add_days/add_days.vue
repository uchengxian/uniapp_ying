<template>
  <view>
    <form class="form" @submit="subform">
      <view class="form-item">
        <label class="form-label">标题</label>
        <input type="text" name="title" v-model="form.title" placeholder="请输入标题" required class="form-input"/>
      </view>
      <view class="form-item">
        <label class="form-label">内容</label>
        <textarea name="subtitle" v-model="form.content" placeholder="请输入内容" required class="form-textarea" maxlength="-1"></textarea>
      </view>
      <view class="form-item">
        <button form-type="submit" class="form-button" :disabled="!validateForm">修改</button>
      </view>
    </form>
  </view>
</template>
<script>
  let id;
  let detail;
  export default {
    data() {
      return {
        form: {}
      }
    },
    onLoad(e) {
      id = e.id;
      console.log(e);
      uniCloud.callFunction({
        name: "add_get_row",
        data: {id} 
      }).then(res => {
        console.log(res);
        this.form = res.result.data[0];
      })
    },
    computed: {
      validateForm() {
        return this.form.title && this.form.content;
      }
    },
    methods: {
      subform() {
        uniCloud.callFunction({
          name: "add_updata",
          data: {
            detail: this.form
          } 
        }).then(res => {
          uni.showToast({
            title: "修改成功!"
          });
          setTimeout(() => {
          uni.reLaunch({
            url: "/pages/days/days"
          })
          }, 500);
        })
      }
    }
  }
</script>
<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    margin-top: 40rpx;
  }
  
  .form-item {
    width: 90%;
    margin-bottom: 30rpx;
  }
  
  .form-label {
    display: block;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .form-input,
  .form-textarea {
    display: block;
    width: 100%;
    padding: 20rpx;
    font-size: 28rpx;
    border: 1px solid #ffaaff;
    border-radius: 8rpx;
    outline: none;
  }
  
  .form-textarea {
    resize: none;
    height: 450rpx;
  }
  
  .form-button {
    padding: 20rpx;
    font-size: 30rpx;
    color: #fff;
    background-color: #007aff;
    border: none;
    border-radius: 8rpx;
    outline: none;
    cursor: pointer;
  }
  
  .form-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>