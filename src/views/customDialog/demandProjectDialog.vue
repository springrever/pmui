
<template>
  <div class="app-container">
    <el-dialog :visible.sync="showNewPM" style="width: 80rem;margin-left: 12%;" top="5vh">
      <el-row>
        <el-col :span="8">
         <!-- <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" style="margin-left: 120%; display: block;width: 100px;height: 100px">-->
          <img v-if="ref6 === '10' || ref6 === '7'|| ref6 === '11' || ref6 === '9'" src="../../assets/img/oa.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '12'" src="../../assets/img/bi.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '2'" src="../../assets/img/plm.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '8'" src="../../assets/img/EBS.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '14'" src="../../assets/img/Jira.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '3'" src="../../assets/img/MES.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '4'" src="../../assets/img/nc.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '5'" src="../../assets/img/pm.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
          <img v-if="ref6 === '15'" src="../../assets/img/EDI.png" class="imgcss" style="margin-left: 120%; display: block;width: 100px;height: 100px">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <div style="text-align: center">
            <span style="font-size: large">{{$store.getters.onProject.project_name}}</span>
          </div>
        </el-col>
      </el-row>
      <el-form :rules="rules" size="mini" ref="dataForm" :model="temp" label-position="left" label-width="100px">
        <el-row style="margin-top: 0px">
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="成员管理" name="second" style="" >
                <el-row  type="flex" class="row-bg" style="margin-left: -50px">
                  <el-col :span="2" >
                    <div></div>
                  </el-col>
                  <el-col :span="1" >
                    <div style="height: 1px;background-color: gainsboro;margin-top: 10px"></div>
                  </el-col>
                  <el-col :span="3" >
                    <div style="margin-left: 10px">添加成员</div>
                  </el-col>
                  <el-col :span="18" >
                    <div style="height: 1px;background-color: gainsboro;margin-top: 10px"></div>
                  </el-col>
                </el-row>
                <el-row  type="flex" class="row-bg" style="margin-top: 10px;margin-left: -50px">
                  <el-col :span="12" >
                    <el-form-item  style="text-align: left;">
                      <el-select style="width: 280px" size="mini" v-model="inputUser" filterable placeholder="请选择">
                        <el-option
                          v-for="item in useroptions"
                          :key="item.userCode"
                          :label="item.userName2"
                          :value="item.userCode">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                    <el-form-item  style="text-align: left">
                      <el-button size="mini" type="primary" @click="addUserList">添加</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row  type="flex" class="row-bg" style="margin-left: -50px">
                  <el-col :span="2" >
                    <div></div>
                  </el-col>
                  <el-col :span="1" >
                    <div style="height: 1px;background-color: gainsboro;margin-top: 10px"></div>
                  </el-col>
                  <el-col :span="3" >
                    <div style="margin-left: 10px">成员列表</div>
                  </el-col>
                  <el-col :span="18" >
                    <div style="height: 1px;background-color: gainsboro;margin-top: 10px"></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-row v-for="(d,index) in demandUserList" :key="d">
                      <el-col :span="3">
                        <img class="userImage" height="50px" width="50px" src="https://pic.qqtn.com/up/2014-7/14065364718533842.gif"/>
                      </el-col>
                      <el-col :span="21" class="userInfo">
                        <div class="userDisInfo">
                          <a href="javascript:void(0);" @click="userBut1Click(index)" style="color: #47C3F2;">设为{{d.userType === '成员'?'项目经理':'成员'}}</a>
                          <a href="javascript:void(0);" @click="userBut2Click(d.userid)" style="color: red;">移除</a>
                        </div>
                        <el-row>
                          <el-col :span="20">{{d.userName}}</el-col>
                          <el-col :span="4">{{d.userType}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">{{d.deptname}}</el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <div style="margin-top: 20px;margin-left: 85%">
                <el-button v-if="demandUserList.length>0" size="mini" type="primary"  @click = "submitData" >提交</el-button>
                </div>
              </el-tab-pane>

            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { dictionaryQuery } from '@/api/dictionary'
  // import { demandInsert } from '@/api/demand'
  import { updateDeUsers, demand_usersQuery } from '@/api/demand_users'
  import waves from '@/directive/waves' // 水波纹指令
  import { userQuery } from '@/api/user'
  import user from '@/store/modules/user'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElForm from '../../../node_modules/element-ui/packages/form/src/form'
  export default {
    components: {
      ElForm,
      ElRow,
      ElCol,
      ElTransfer },
    props: ['showNewPM', 'projectId'],
    name: 'demandProjectDialog',
    filters: {
    },
    directives: {
      waves
    },
    data() {
      return {
        showNewPM: false,
        activeName: 'second',
        temp: {},
        useroptions: [],
        dictOptions: [],
        options: [],
        expected_time: '',
        inputUser: '',
        demandUserList: [],
        ref6: ''
      }
    },
    created() {
      this.getUserOptions()
    },
    methods: {
      closeDialog() {
        this.showNewPM = false
      },
      submitData() {
        var item = {}
        item.project_id = this.$props.projectId
        item.userList = this.demandUserList
        updateDeUsers(item).then(r => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.showNewPM = false
        })
      },
      userBut2Click(userid) {
        var that = this
        this.demandUserList.forEach(function(value, index) {
          if (value.userid === userid) {
            that.demandUserList.splice(index, 1)
          }
        })
      },
      addUserList() {
        var that = this
        var flag = false
        if (this.inputUser) {
          this.demandUserList.forEach(function(value, index) {
            if (value.userid === that.inputUser) {
              that.customAlert('警告', '添加人员重复', 'warning')
              flag = true
            }
          })
          if (flag) {
            return
          }
          var r = {}
          var seachItems = { page: {}, items: {}}
          seachItems.items.userCode_eq = this.inputUser
          userQuery(seachItems).then(res => {
            r.userid = this.inputUser
            r.create_by = user.state.usercode
            r.userType = '成员'
            r.userName = res.data.list[0].userName2
            r.deptname = res.data.list[0].deptName
            this.demandUserList.push(r)
          })
        }
      },
      customAlert(tittle, msg, type) {
        this.$notify({
          title: tittle,
          message: msg,
          type: type,
          duration: 2000
        })
      },
      getDictionaries() {
        var seachItems = { page: {}, items: { 'fd_type': '应用系统' }}
        headerDictionaryQuery(seachItems).then(r => {
          this.dictOptions = r.data.list
        })
      },
      getQueOptions() {
        var seachItems = { page: {}, items: { 'dictionnaryType_eq': '紧急程度' }}
        dictionaryQuery(seachItems).then(r => {
          this.options = r.data.list
        })
      },
      getUserOptions() {
        var seachItems = { page: {}, items: {}}
        userQuery(seachItems).then(r => {
          this.useroptions = r.data.list
        })
      },
      nextStep() {
        this.activeName = 'second'
      },
      userBut1Click(i) {
        var that = this
        that.demandUserList[i].userType = this.demandUserList[i].userType === '成员' ? '项目经理' : '成员'
        if (that.demandUserList[i].userType === '项目经理') {
          that.demandUserList.forEach(function(item, index) {
            if (i !== index) {
              that.demandUserList[index].userType = '成员'
            }
          })
        }
      },
      restData(id, ref6) {
        this.showNewPM = true
        this.ref6 = ref6
        this.inputUser = ''
        var serchItems = { page: {}, items: {}}
        serchItems.items.project_id_eq = id
        demand_usersQuery(serchItems).then(r => {
          this.demandUserList = r.data.list
        })
      }
    },
    watch: {
      showNewPM(val, oldVal) {
        this.$emit('childByValue', 'false')
      }
    }
  }
</script>
<style>
  .userImage{
    border-radius:50px
  }
  .userInfo{
    position: relative;
  }
  .userDisInfo{
    display: none;
    position:absolute;
    top: 0px;
    left: 300px;
    font-size: 12px;

  }
  .userInfo:hover .userDisInfo{
    display: block;
    z-index: 99;
  }
</style>
