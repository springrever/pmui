
<template>
  <div class="app-container">
    <el-dialog :visible.sync="showNewPM" style="width: 80rem;margin-left: 12%;" top="2vh">
      <el-row>
        <el-col :span="8">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" style="margin-left: 120%; display: block;width: 100px;height: 100px">
        </el-col>
      </el-row>
      <el-form :rules="rules" size="mini" ref="dataForm" :model="temp" label-position="left" label-width="100px">
        <el-row style="margin-top: 0px">
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="需求信息" name="first" style="margin-left: 50px">
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="需求编号" >
                      <el-input style="width: 100%" disabled="true" v-model="temp.demand_code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="需求名称" >
                      <el-input style="width: 100%" v-model="temp.demand_name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="需求责任人" >
                      <el-select  size="mini" v-model="temp.ref1" filterable placeholder="请选择">
                        <el-option
                          v-for="item in useroptions"
                          :key="item.userCode"
                          :label="item.userName2"
                          :value="item.userCode">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="需求描述" >
                      <el-input
                        type="textarea"
                        :row = '2'
                        v-model="temp.demand_desc"
                        placeholder = '请输入内容'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="所属系统" >
                      <el-select v-model="temp.subordinate_system" size="mini"  filterable placeholder="请选择">
                        <el-option
                          v-for="item in dictOptions"
                          :key="item.fd_id"
                          :label="item.fd_name"
                          :value="item.fd_id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="紧急程度" >
                      <el-select  size="mini" v-model="temp.emergency" filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.dictionaryCode"
                          :label="item.dictionaryName"
                          :value="item.dictionaryCode">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="需求背景" >
                      <el-input
                        type="textarea"
                        :row = '2'
                        v-model="temp.demand_context"
                        placeholder = '请输入内容'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="期望日期" >
                      <el-date-picker
                        v-model="expected_time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="20">
                    <el-form-item label="备注" >
                      <el-input
                        type="textarea"
                        :row = '2'
                        v-model="temp.remark"
                        placeholder = '请输入内容'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-button size="mini" type="primary" style="margin-left: 80%;margin-top: 10px" @click = "nextStep()" >下一步</el-button>
              </el-tab-pane>
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
                    <el-row v-for="d in demandUserList" :key="d">
                      <el-col :span="3">
                        <img class="userImage" height="50px" width="50px" src="https://pic.qqtn.com/up/2014-7/14065364718533842.gif"/>
                      </el-col>
                      <el-col :span="21" class="userInfo">
                        <div class="userDisInfo">
                          <!--<a href="javascript:void(0);" @click="userBut1Click" style="color: #47C3F2;">设置权限</a>-->
                          <a href="javascript:void(0);" @click="userBut2Click(d.userid)" style="color: red;">移除</a>
                        </div>
                        <el-row>
                          <el-col :span="20">{{d.userName}}</el-col>
                          <el-col :span="4">{{d.userType}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">{{d.userDeptName}}</el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-button size="mini" type="primary" style="margin-left: 80%;margin-top: 20px" @click = "submitData" >提交</el-button>
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
  import { demandInsert } from '@/api/demand'
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
    props: ['showNewPM'],
    name: 'demandIndexDialog',
    filters: {
    },
    directives: {
      waves
    },
    data() {
      return {
        showNewPM: false,
        activeName: 'first',
        temp: {},
        useroptions: [],
        dictOptions: [],
        options: [],
        expected_time: '',
        inputUser: '',
        demandUserList: []
      }
    },
    created() {
      this.getUserOptions()
      this.getDictionaries()
      this.getQueOptions()
    },
    methods: {
      submitData() {
        var item = {}
        item.model = this.temp
        item.userList = this.demandUserList
        demandInsert(item).then(r => {
          console.log(r)
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
            r.userDeptName = res.data.list[0].deptName
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
      userBut1Click() {
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
