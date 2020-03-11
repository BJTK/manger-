<template>
         <el-card class="box-card">
             <!-- 面包屑 -->
             <el-breadcrumb >
  
            <el-breadcrumb-item>主页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
           <!-- 搜索 -->
           <el-row class="row-input">
             
              <el-col>
                <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                    <el-button type="success" plain>添加用户</el-button>
              </el-col>

           </el-row>
           <!-- 表格 -->
            <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column
                type="index"
                width="60"
                label="#"
               >
            </el-table-column>
            <el-table-column
                prop="username"
                width="80"

                label="姓名"
               >
            </el-table-column>
            <el-table-column
                 
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                 
                prop="mobile"
                label="电话">
            </el-table-column>
            <el-table-column
                label="创建时间">
             <!-- template内部要用数据，设置slot-scope属性
             该属性的是要用create_time的数据源useList
             slot-scope的值userList其实就是el-table绑定的数据userList
             userList.row =>可以拿到数组中的每一个对象
             slo-scope会自动的去寻找上一级的数据
             所以userlist可以写成任何名 -->
    
              <!-- <template slot-scope="ABC">
                    {{ABC.row.create_time|fmtdate}}
              </template> -->
              <template slot-scope="userList">
                    {{userList.row.create_time|fmtdate}}
              </template>

            </el-table-column>
                 
            <el-table-column
                prop="mg_state"
                label="用户状态">

                <el-switch slot-scope="asc"
                    v-model='asc.row.mg_state'
                    active-color="#13ce66"
                    @change="change1()"
                    inactive-color="#ff4949">
               </el-switch>
            </el-table-column>
            <el-table-column 
                prop="address"
                label="操作">
    <template slot-scope="scope">
      
            <el-button type="primary" icon="el-icon-edit" 
                    circle size='mini' plain>
            </el-button>
            <el-button type="danger" icon="el-icon-delete"
                    circle size='mini' plain>
            </el-button>
            <el-button type="success" icon="el-icon-check"
                        circle size='mini' plain>
            </el-button>
    </template>
            
                
 </el-table-column>
    </el-table>
           <!-- 分页 -->
         <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             class="page-fen"
            :page-sizes="[2, 4, 6, 8]"
             :current-page="queryInfo.pagesize"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>



       </el-card>
</template>

<script>
export default {
  name: 'users',

  data() {
      return {
            value:"",
           queryInfo: {
            query: '',
            pagenum: 1,
            pagesize: 5
        },
            userList:[],
            total:2
      }
  },
     created()  {
            this.getUserData()
       },
  methods: {
        //  获取数据   
      async getUserData(){
        this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const res = await this.$http.get('users', {params: this.queryInfo}) 
              console.log(res)
         const {meta:{status,msg},data:{users,total}} = res.data
         if(status === 200){
             this.userList = users
             this.total = total
             this.$message({ message: msg, center: true, type: "success" });
         }else{
             this.$message({ message: msg, center: true, type: "error" });

         }

       },
    //  开关状态
      change1(){
         
          if(!this.userList.mg_state){
             this.$message({ message: '用户离线状态', center: true, type: "warning" });
                   
          }    
      },
      //分页操作
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
 
  },
















}
</script>

<style scoped>
.box-card{
    margin:0;
    padding: 0;
    height:100%;
}
.input-with-select{
    width:300px;
}
.row-input{
    margin-top:20px;
}
.page-fen{
    margin-top:30px;

}

</style>