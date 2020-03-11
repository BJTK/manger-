<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="../../../static/image/logo.jpg" style="width:240px;height:60px;" alt />
        </el-col>
        <el-col :span="18" style="font-size:30px;color:white; font-weight: bolder;">电商后台管理系统</el-col>
        <el-col :span="2">
          <a href="#" class="login-out"
           @click.prevent="loginSignout"
           style="font-size:20px;color:white; font-weight: bolder;"
           >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px" class="aside">
        <el-menu style="padding:30px 0" 
        :unique-opened="true" 
        :router="true"
        background-color="#e34488"
        >
          <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                    </template>

                    <el-menu-item index="users">
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
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },

  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    loginSignout() {
      localStorage.clear();
      this.$message({ message: "成功@~@退出", center: true, type: "success" });
      this.$router.push({ name: "login", center: true });
    }
  }
};
</script>

<style scoped>
.header {
  background-color: black;
  text-align: center;
  line-height: 60px;
  box-sizing: content-box;
  color: beige;

  padding: 20px 0;
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
  background-color: #d3dc6d;
}
.main {
  background-color: #ee94ee;
  height: 100%;
}
.el-container.is-vertical {
  height: 100%;
}
</style>