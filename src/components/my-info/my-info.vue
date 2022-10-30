<template>
  <aside id="my-info" ref="myInfo" >
    <div class="user">
      <div class="user-info">
        <div class="photo">
          <img :src="userStore.userInfo.portrait" alt="头像">
        </div>
        <div class="user-name">
          <span class="name">{{userStore.userInfo.userName}}</span>
          <span class="permission">{{userStore.userInfo.role}}</span>
        </div>
      </div>
      <div class="address" v-if="props.showAddress">
        <div>
          <span class="title">github地址:</span>
          <input 
            class="edit-box" 
            v-if="edit1" 
            @blur="edit1 = false"
            @change="changeAddress('github')"
            ref="editInput1" 
            type="text" 
            v-model="repositoryStore.github.address">
          <span v-else class="content" @click="editAddress1">{{repositoryStore.github.address}}</span>
        </div>
        <div>
          <span class="title">gitee地址:</span>
          <input 
            class="edit-box" 
            v-if="edit2"
            @blur="edit2 = false"
            @change="changeAddress('gitee')" 
            ref="editInput2" 
            type="text" 
            v-model="repositoryStore.gitee.address">
          <span v-else class="content" @click="editAddress2">{{repositoryStore.gitee.address}}</span>
        </div>
      </div>
      <button class="exit button" v-else @click="exit">
        <i class="iconfont icon-tuichu"></i>
      </button>
    </div>
    <MyInfoTimeline title="Github" :info="repositoryStore.github.data"/>
    <MyInfoTimeline title="Gtiee" :info="repositoryStore.gitee.data"/>
  </aside>
</template>

<script lang="ts">
export default {
    name:'MyInfo'
}
</script>
<script setup lang="ts">
import MyInfoTimeline from '@/components/my-info/my-info-tiemline.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
import { useRepositoryStore } from '@/store/repository';
import { nextTick } from 'process';

const props = defineProps(['showAddress'])
const repositoryStore = useRepositoryStore()
const edit1 = ref(false)
const edit2 = ref(false)
const editInput1 = ref(null)
const editInput2 = ref(null)
const router = useRouter()
const userStore = useUserStore()

function exit(){
  userStore.logout()
  router.push({name:'login'})
}
// github地址点击事件
function editAddress1(){
  edit1.value = true;
  nextTick(()=>{
    if(editInput1.value){
      (editInput1.value as HTMLInputElement).focus()
    }
  })
}
function editAddress2(){
  edit2.value = true;
  nextTick(()=>{
    if(editInput2.value){
      (editInput2.value as HTMLInputElement).focus()
    }
  })
}

function changeAddress(name:string){
  if(name == 'github'){
    repositoryStore.getGithubData()
  }else{
    repositoryStore.getGiteebData()
  }
}
</script>

<style scoped>
  /* 最外部盒子 */
  #my-info{
    height: 100%;
      display: flex;
      flex-flow: column;
      padding: 20px;
      box-sizing: border-box;
      flex: 1;
      background-color: var(--myinfo-bg);
  }
  /* 头部用户盒子 */
  .user{
    display: flex;
    justify-content: space-between;
  }
  /* 退出按钮 */
  .exit{
    background:none;
  }
  /* 头部左侧用户信息 */
  .user-info{
    margin-right: 40px;
    flex: 0 0 152px;
    display: flex;
  }
  /* 用户名 */
  .user-info>.user-name{
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .user-name>.name{
    margin-bottom: 10px;
    color: var(--myinfo-name);
    font-weight: bold;
  }
  /* 权限 */
  .user-name>.permission{
    font-size: 14px;
    color:var(--myinfo-subname)
  }
  /* 头像 */
  .user-info>.photo{
    height: 100px;
    width: 100px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
  }
  /* 头像图片 */
  .photo>img{
    width:100px;
    height: 100px;
  }
  /* 仓库地址 */
  .address{
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 20px;
    border-radius: 20px;
    border: 2px solid var(--myinfo-child-border);
    overflow: hidden;
  }
  .address>div{
    display: flex;
    width: 100%;
    flex-flow: nowrap;
    align-items: center;
  }
  /* 仓库名称 */
  .address .title{
    flex: 0 0 100px;
    font-weight: bold;
    color: var(--myinfo-address-title);
    white-space: nowrap;
  }
  .address .content,.edit-box{
    padding: 5px;
    flex: 1;
    width:0;
    border: 2px solid var(--myinfo-address-border);
    box-sizing: border-box;
    font-size: 16px;
    color: var(--myinfo-address-word);
    background-color: var(--myinfo-child-bg);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:text ;
  }
  /* 修改地址输入框 */
</style>