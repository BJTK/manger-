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
                    clearable
                    @clear="seacrclear()"
                    class="input-with-select">
                    <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchData()"
                     ></el-button>
                </el-input>
                    <el-button type="success" plain  @click="Addusername()">添加用户</el-button>
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
                    @change="change1(asc.row)"
                    inactive-color="#ff4949">
               </el-switch>
            </el-table-column>
            <el-table-column 
                prop="address"
                label="操作">
    <template slot-scope="userList">
      
            <el-button type="primary" icon="el-icon-edit" 
                    circle size='mini' plain
                    @click="EditUser(userList.row)">
            </el-button>

            <el-button type="danger" icon="el-icon-delete"
                    circle size='mini' plain
                    @click="deleteUsers(userList.row.id)">
                    <!-- {{userList.row.id}} -->
            </el-button>

            <el-button type="success" icon="el-icon-check"
                        circle size='mini' plain
                         @click="addUserRole(userList.row)">
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
                 <!-- 添加对话框 -->
             <el-dialog title="添加用户" :visible.sync="dialogFormVisible"
              width="30%"
              top="280px"
           
              >
                <el-form :model="form" >
                    <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addyh()">确 定</el-button>
                </div>
    </el-dialog>
          
           <!-- 编辑对话框 -->
                <el-dialog title="编辑用户" :visible.sync="editFormVisible"
                    width="30%"
                    top="280px"
           
              >
                <el-form :model="form" >
                    <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="form.username"  disabled autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="用户邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div slot="footer" class="dialog-footer" >
                    <el-button @click="editFormVisible = false">取 消</el-button>
                     
                    <el-button type="primary"
                     @click="confirmEditUser"
                     >确 定</el-button>
                   
                </div>
                 
 
    </el-dialog>

          <!-- check角色视图 -->

             <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
                <el-form :model="form">
                    <el-form-item label="用户名" label-width="100px">
                        {{currentName}}
                    </el-form-item>
                    <el-form-item label="角色" label-width="100px">
                    <el-select v-model="currentid" placeholder="分配角色">
                         <el-option label="选择角色" :value="-1"></el-option>
                        <el-option :label="item.roleName"  :value="item.id" 
                        v-for='(item,i) in roleData'
                        :key="i"       
                        ></el-option> 
                    </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
                    <el-button type="primary" @click="confrimRole()">确 定</el-button>
                </div>
</el-dialog>















     
 </el-card>

</template>

<script>
export default {
  name: 'users',

  data() {
      return {
            value:"",
            currentid:"",
            currentuserid:"",
            currentName:"",
            roleData:[],
           queryInfo: {
            query: '',
            pagenum: 1,
            pagesize: 5
            },
            userList:[],
            total:2,
            dialogFormVisible:false,
            editFormVisible:false,
            dialogFormVisibleRole:false,
            form:{
                  username:"",
                  password:'',
                  email:"",
                  mobile:"",
                  
                  },
          
                  
            

      }
  },
     created()  {
            this.getUserData()
       },
  methods: {

       //确定修改角色
         async confrimRole(){
               const  res = await this.$http.put('users/'+this.currentuserid+'/role',{
                    rid:this.currentid

               }) 

                    this.dialogFormVisibleRole=false

            //    console.log(res)
             


          },




















      //删除用户
     deleteUsers(userId){

          this.$confirm('删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          const res = await this.$http.delete('users/'+userId);
            const {meta:{msg,status}} = res.data
            if(status === 200){
                    this.getUserData()
                    this.$message({
                    type: 'success',
                    message:msg
                 });
                
                }
           
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });


        },

      //添加用户
            async addyh(){
                const res = await this.$http.post('users/',this.form)
                console.log(res)
                const {meta:{msg,status},data}=res.data
                    if(status === 201){
                         this.dialogFormVisible=false;
                         this.form = data
                         this.getUserData()
                         this.form = {}
                               

                    }else{
                         this.$message({ message: msg, center: true, type: "error" });

                    }
                 


            },

            // 编辑用户
            async confirmEditUser(){
                const res = await this.$http.put('users/'+this.form.id,this.form)
                console.log(res)
                const {meta:{msg,status},data}=res.data
                    if(status === 200){
                         this.editFormVisible=false;
                         this.getUserData()
                         this.form = {}
                               

                    }else{
                         this.$message({ message: msg, center: true, type: "error" });

                    }
                 


            },









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
      change1(user){
             const res = this.$http.put('users/'+user.id+'/state/'+user.mg_state)
             console.log(res)
        //   if(!this.userList.mg_state){
        //      this.$message({ message: '用户离线状态', center: true, type: "warning" });
                   
        //   }    
      },
      //分页操作
        handleSizeChange(val) {
         this.queryInfo.pagesize = val;

         this.getUserData()
        //  console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.queryInfo.pagenum = val;
         this.getUserData()
              
        //  console.log(`每页 ${val} 条`);
      },
    //   搜索
    searchData(){
        this.getUserData()
        },
    seacrclear(){
        this.getUserData()
         
    },
     //添加用户
     Addusername(){
         this.form ={}
           this.dialogFormVisible=true
     },
     //编辑用户
     EditUser(user){
         this.form = user
         this.currentuserid = user.id
         console.log("user:"+user)
           this.editFormVisible=true
            

     },
      //点击添加角色
       async addUserRole(user){
           this.currentuserid = user.id
             const res1=  await this.$http.get('users/'+user.id)
             this.currentid = res1.data.data.rid
             const res =  await this.$http.get('roles')
              this.roleData = res.data.data
             console.log(res)
             
            //  const {data:rid} = res.data
           this.currentName = user.username
              this.dialogFormVisibleRole = true
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