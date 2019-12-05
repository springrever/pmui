<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <el-dropdown v-if="$store.getters.showProject" @command="handleCommand" class="class1" trigger="click">
      <span style="color: #4169E1;font-size: 16px">
        当前项目:
      </span>
      <span style="font-size: 16px">
        {{ $store.getters.onProject.project_name }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in DemandProjectList" :key="index" :command="item">{{ item.project_name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :title="loginName" class="user-avatar" :src="avatarImage">
        <i :title="loginName" class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            返回首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span  @click="changePdUI" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">用户注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog v-dragDialog :title="textMap" :visible.sync="dialogFormVisible" width = "600px">
      <el-form  :rules="rules" status-icon ref="changePassword" :model="changePassword" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="原密码" prop="originalPassword">
          <el-input type="password" v-model="changePassword.originalPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="changePassword.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" >
          <el-input type="password" v-model="changePassword.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changePd('changePassword')">确认</el-button>
      </div>
    </el-dialog>

  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { userUpdateBySelective } from '@/api/user'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Cookies from 'js-cookie'
  import dragDialog from '@/directive/el-dragDialog'
  import waves from '@/directive/waves'
  import user from '@/store/modules/user'
  import { demand_projectQuery } from '@/api/demand_project'
  // import user from '@/store/modules/user'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    directives: {
      waves,
      dragDialog
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.changePassword.confirmPassword !== '') {
            this.$refs.changePassword.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.changePassword.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        DemandProjectList: [],
        ifProject: false,
        projectName: '',
        loginName: '',
        textMap: '',
        avatarImage: '',
        dialogFormVisible: false,
        users: [],
        changePassword: {
          originalPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        UserCode: '',
        flag: false,
        rules: {
          originalPassword: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass, required: true, trigger: 'blur' },
            { min: 5, message: '密码不能小于5位数', trigger: 'blur' }
          ],
          confirmPassword: [
            { validator: validatePass2, required: true, trigger: 'blur' },
            { min: 5, message: '密码不能小于5位数', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.UserCode = Cookies.get('UserCode')
      this.initUsetInfo()
      this.initProject()
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      initProject() {
        var userRole = {}
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        var seachItems = {}
        // 判断当前登录人是不是属于系统管理员和项目经理
        if (!userRole['admin'] && !userRole['manager']) {
          seachItems = { page: {}, items: {}, userCode: user.state.usercode }
        } else {
          seachItems = { page: {}, items: {}}
        }
        demand_projectQuery(seachItems).then(r => {
          this.DemandProjectList = r.data.list
          if (this.DemandProjectList.length === 0) {
            this.ifProject = false
          } else {
            if (this.$store.getters.onProject === 'null') {
              this.ifProject = false
            } else {
              this.ifProject = true
            }
          }
        })
      },
      initUsetInfo() {
        console.log('user', user)
        this.loginName = user.state.deptname + '-' + user.state.fullName
        if (user.state.avatar && user.state.avatar != null) {
          this.avatarImage = user.state.avatar
        } else {
          this.avatarImage = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        }
      },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      changePdUI() {
        this.textMap = '修改密码'
        this.dialogFormVisible = true
      },
      changePd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var model1 = {}
            model1.userCode = this.UserCode
            model1.originalPassword = this.changePassword.originalPassword
            model1.userPassword = this.changePassword.newPassword
            userUpdateBySelective({ model: model1 }).then((r) => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.logout()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCommand(command) {
        this.$store.commit('SET_ONPROJECT', command)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .breadcrumb-container{
      float: left;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .class1 {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 100px;
    }
  }
</style>

