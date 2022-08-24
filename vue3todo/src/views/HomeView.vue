<script setup>
  import {
    ref,
    computed
  } from "vue";
  const list = ref([])
  let name = ref("")
  const add = () => {
    if (name.value == "") {
      return
    }
    let data = {
      flag: false,
      name: name.value
    }
    list.value.push(data)
    name.value = ""

  }
  const change = (i) => {
    // console.log(i);
    list.value[i].flag = !list.value[i].flag
  }
  const del = (i) => {
    list.value.splice(i, 1)
  }
  const aa = computed(() => {
    var num = 0
    let num2 = 0
    list.value.forEach(item => {

      if (item.flag == false) {
        num += 1
      } else {
        num2 += 1
      }
      // return num
    })
    // console.log(num);
    return {
      num: num,
      num2: num2
    }

  })
</script>

<template>
  <main>
    <div class="body">
      <div class="top">
        <input class="input" type="text" v-model="name" @keyup.enter="add">
        <button class="add" @click="add">添加</button>
      </div>
      <div class="box">
        <div class="title">
          <h3>正在进行</h3>
          <h3>{{aa.num}}</h3>
        </div>
        <ul>
          <li v-for="(item,index) in list" :key="index" v-show="item.flag==false">
            <div class="left">
              <input type="checkbox" @change="change(index)" :checked="item.flag">
              <div class="content">
                {{item.name}}
              </div>
            </div>
            <div class="right">
              <button @click="del(index)">删除</button>
            </div>
          </li>
        </ul>
        <!-- 已经完成 -->
        <div class="title">
          <h3>已经完成</h3>
          <h3>{{aa.num2}}</h3>
        </div>
        <ul>
          <li v-for="(item,index) in list" :key="index" v-show="item.flag==true">
            <div class="left">
              <input type="checkbox" @change="change(index)" :checked="item.flag">
              <div class="content">
                {{item.name}}
              </div>
            </div>
            <div class="right">
              <button @click="del(index)">删除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .body {
    margin: auto;
  }

  li {
    display: flex;
    justify-content: space-between;
    height: 30px;
    background-color: #fff;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 10px;
  }

  .left {
    display: flex;
  }

  .title {
    display: flex;
    justify-content: space-between;
  }

  .box {
    width: 400px;
    background-color: #eee;
    /* min-height: 300px; */
    box-sizing: border-box;
    padding: 20px 10px;
  }

  .input {
    width: 250px;
    height: 30px;
  }

  .add {
    width: 80px;
    height: 34px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    align-items: center;
    width: 400px;
    height: 50px;
    background-color: #9999;
    color: white;
  }
</style>