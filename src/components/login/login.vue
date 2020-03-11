<template>
  <div class="login-warp">
    <el-form label-position="top" class="login-form" label-width="80px" :model="formData">
      <h1>用户登录</h1>
      <el-form-item label="账号">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="haddleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    haddleLogin() {
      this.$http.post("login", this.formData).then(res => {
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.$message({ message: msg, center: true, type: "success" });
          this.$router.push({name:'home'})

          console.log(res);
        } else {
          this.$message({
            message: msg,
            center: true,
            type: "error",
            offset: 100,
            showClose: true
          });
        }
      });
    }
  }
};
</script>
<style>
.login-warp {
  height: 100%;
  background: url("../../../static/image/01.jpg") no-repeat 100%;
  background-size: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.el-input__inner {
  background-color: rgba(0, 0, 0, 0.1);
}
.login-warp .login-form {
  width: 500px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: solid 1px #e3e3ee;
  box-sizing: border-box;
  padding: 30px 20px;
  color: white;
}
.login-warp .login-form .login-btn {
  width: 100%;
}

.login-btn {
  border: none;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
}

h1,
.el-form--label-top .el-form-item__label {
  color: white;
}
</style>