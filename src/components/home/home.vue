<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="../../../static/image/logo.jpg" style="width:300px;height:60px;" alt />
        </el-col>
        <el-col :span="18" style="font-size:30px;color:black; font-weight: bolder;">电商后台管理系统</el-col>
        <el-col :span="2">
          <a href="#" class="login-out">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px" class="aside" >
        <el-menu
        style="padding:30px 0"
        :unique-opened="true"
         >
          <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template> 
               
                    <el-menu-item index="1-1">

                      <i class="el-icon-menu"></i>
                       <span>用户列表</span>
                    </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template> 
               
                    <el-menu-item index="2-2">

                      <i class="el-icon-menu"></i>
                       <span>角色列表</span>
                      
                    </el-menu-item>
                    <el-menu-item index="2-2">

                       <i class="el-icon-menu"></i>
                       <span>权限列表</span>
                      
                    </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                </template> 
               
                    <el-menu-item index="3-3">

                      <i class="el-icon-menu"></i>
                       <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-3">

                      <i class="el-icon-menu"></i>
                       <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="3-3">

                      <i class="el-icon-menu"></i>
                       <span>商品分类</span>
                    </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                </template> 
               
                    <el-menu-item index="4-4">

                      <i class="el-icon-menu"></i>
                       <span>导航一</span>
                    </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                </template> 
               
                    <el-menu-item index="5-5">

                      <i class="el-icon-location"></i>
                       <span>导航一</span>
                    </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
      return {
          
      }
  },

  beforeCreate() {
        const token = localStorage.getItem('token');
        if(!token){
            this.$router.push({name:"login"})
        }
  },


};
</script>

<style scoped>
.header {
  background-color: #b3c0d2;
  text-align: center;
  line-height: 60px;
  box-sizing: content-box;
  
  padding:10px 0 ;
}
.header img {
    display: block;
  border-radius: 60px;
  opacity: 0.8;
}
.header .login-out {
  text-decoration: none;
}
.aside {
  background-color: #d3dcd3;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.el-container.is-vertical {
  height: 100%;
}
</style>