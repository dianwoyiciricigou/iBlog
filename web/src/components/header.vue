<template>
<div>
<el-menu 
 router 
:default-active="activeIndex" 
 class="d-flex jc-center" 
 mode="horizontal" 
@select="handleSelect">
  <div style="width:10rem"></div>
  <div class="flex-1 d-flex jc-center">
    <el-menu-item index="/home" class="left">Home</el-menu-item>
    <el-submenu index="/documents">
        <template slot="title">文档学习</template>
        <el-menu-item index="/documents/vue"><i class="iconfont iconvue"></i> Vue</el-menu-item>
        <el-menu-item index="/documents/node"><i class="iconfont iconnodejs1"></i> Node</el-menu-item>
        <el-menu-item index="/documents/ele"><i class="iconfont iconchemical_element"></i> Element</el-menu-item>
        <el-menu-item index="/documents/npm"><i class="iconfont iconnpm1"></i> npm</el-menu-item>
    </el-submenu>
    <el-menu-item index="/info">简介</el-menu-item>
    <el-submenu index="4">
        <template slot="title">文章分类</template>
        <el-menu-item index="4-1">HTML</el-menu-item>
        <el-menu-item index="4-2">CSS</el-menu-item>
        <el-menu-item index="4-3">JavaScript</el-menu-item>
    </el-submenu>
  </div>
  <el-button type="info" class="right">登录</el-button>
  <el-button type="info" class="right mr-4">注册</el-button>
</el-menu>
</div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/home'
      };
    },
    methods: {
      handleSelect(key) {
        this.activeIndex = key
      }
    }
  }
</script>

<style>
.el-submenu__title i {
    color: #909399;
    right: auto;
}
</style>