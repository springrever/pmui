
<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card" v-loading="demandEditLoading">
            <div slot="header">
              <span>{{boxHeaderValue}}</span>
              <el-button-group style="float: right; margin-bottom: 3px" v-if="temp.audit_status !== 'OA审核中'">
                <el-button :loading="submitLoading" @click="versionCheck()" style="float: right; padding: 3px 3px;color: #FF4500" type="text">{{vsersion}}</el-button>
                <el-button v-if="temp.ref2 !== 'submit'" :loading="submitLoading" @click="deleteData" style="float: right; padding: 3px 3px" type="text">删除</el-button>
                <el-button :disabled="!(temp.audit_status === '未审核'&& temp.ref2 === 'submit')" v-if="ISREVIEW" :loading="submitLoading" @click="reviewData" style="float: right; padding: 3px 3px" type="text">审批</el-button>
                <el-button v-if="temp.ref2 === 'save'&& temp.audit_status === '未审核'" :loading="submitLoading" @click="submitData" style="float: right; padding: 3px 3px" type="text">提交</el-button>
                <el-button :disabled=" temp.ref2 === 'submit'&& IFRevision === 'NO'" :loading="submitLoading" @click="saveData()" style="float: right; padding: 3px 3px" type="text">保存</el-button>
                <el-button :loading="submitLoading" @click="revisionData" v-if="temp.audit_status === '通过'" style="float: right; padding: 3px 3px" type="text">修订</el-button>
                <el-button :loading="submitLoading" @click="closePage()" style="float: right; padding: 3px 3px;color: #FF4500" type="text" >返回</el-button>
              </el-button-group>
            </div>
            <div  class="boxtext" >
              <el-form size="mini" :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px"
                       style='margin-left:50px;'>
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                  <el-form-item prop="demand_name"  label="需求名称">
                    <el-input :disabled="disFlag" style="width: 350px" v-model="temp.demand_name"></el-input>
                  </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="demand_code" label="需求编号">
                      <el-input :disabled="true" style="width: 350px" v-model="temp.demand_code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                    <el-form-item prop="demand_type" label="需求类型">
                      <el-select :disabled="disFlag" style="width: 350px" size="mini" v-model="temp.demand_type" filterable placeholder="请选择">
                        <el-option
                          v-for="item in typeoptions"
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="audit_status" label="审核状态">
                      <el-input :disabled="true" style="width: 350px" v-model="temp.audit_status"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                    <el-form-item prop="ref1" label="责任人">
                    <el-select :disabled="disFlag" @change="changeRef1(temp.ref1)"  size="mini" style="width: 350px" v-model="temp.ref1" filterable placeholder="请选择">
                      <el-option
                        v-for="item in useroptions"
                        :key="item.userCode"
                        :label="item.userName2"
                        :value="item.userCode">
                      </el-option>
                    </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="subordinate_system" label="所属系统">
                      <el-select :disabled="disFlag" v-model="temp.subordinate_system"
                                 style="width: 350px"
                                 size="mini"
                                 @change="changeSystem(temp.subordinate_system)"
                                 filterable
                                 placeholder="请选择">
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
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                    <el-form-item prop="emergency" label="紧急程度">
                      <el-select :disabled="disFlag"  size="mini" v-model="temp.emergency" style="width: 350px" filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.dictionaryId"
                          :label="item.dictionaryName"
                          :value="item.dictionaryId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="expected_time"  label="期望日期" >
                      <el-date-picker
                        @change="dateChage"
                        size="mini"
                        :disabled="expected_timedisFlag"
                        v-model="temp.expected_time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                    <el-form-item prop="deptsvalue" label="主要承担部门">
                      <!--<deptSelect ref="mainDeptSelect" v-model="temp.mian_dept"></deptSelect>-->
                      <el-cascader
                        style="width: 350px"
                        :disabled="disFlag"
                        :show-all-levels="false"
                        v-model="temp.deptsvalue"
                        :options="deptsOptions"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="assessmentCount" label="评估人天">
                      <el-input  disabled="true" v-model="temp.assessmentCount" style="width: 350px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
                  <el-col :span="12">
                    <el-form-item prop="actual_time"  label="实际日期" >
                      <el-date-picker
                        size="mini"
                        :disabled="disFlag"
                        v-model="temp.actual_time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="realization_effect" label="实现效果">
                      <el-input  :disabled="disFlag" v-model="temp.realization_effect" style="width: 350px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="22">
                    <el-form-item label="需求背景">
                      <el-input  :disabled="disFlag"  type="textarea" v-model="temp.demand_context"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="22">
                    <el-form-item label="需求描述">
                        <el-input :disabled="disFlag" type="textarea" v-model="temp.demand_desc"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="22">
                    <el-form-item label="备注">
                      <el-input :disabled="disFlag" type="textarea" v-model="temp.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" style="">
                  <el-col :span="22">
                    <el-form-item label="实施处理意见">
                      <el-input disabled="true" type="textarea" v-model="temp.processing_opinion"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-dialog
              title="版本信息"
              :visible.sync="dialogVisible"
              width="50%">
              <el-table  @row-click="versionChose"
                         :key='tableKey'
                         :data="versionDta"
                         :highlight-current-row="true"
                         :header-cell-style="headerStyle"
                         element-loading-text="读取中……"
                         border
                         highlight-current-row
                         style="width: 100%;margin-top: -20px"
                         fit="true"
                         resizable="true">
                <el-table-column   align="center" label="创建人">
                  <template
                    slot-scope="scope">
                    <span>{{scope.row.updateUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="创建时间" >
                  <template slot-scope="scope">
                    <span>{{scope.row.update_date}}</span>
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="版本号" >
                  <template slot-scope="scope">
                    <span>{{scope.row.version}}</span>
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="审核状态" >
                  <template slot-scope="scope">
                    <span>{{scope.row.audit_status}}</span>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true"  align="center" label="审核意见" >
                  <template slot-scope="scope">
                    <span>{{scope.row.ref5}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-dialog
              title="审批意见"
              :visible.sync="reviewDialogVisible"
              width="40%">
              <el-row>
                <el-col :span="24">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="reviewTextarea">
                  </el-input>
                </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button @click="agree(1)">驳 回</el-button>
                <el-button type="primary" @click="agree(2)">同 意</el-button>
                <el-button type="primary" @click="agree(3)">OA审核</el-button>
              </span>
            </el-dialog>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { dictionaryQuery } from '@/api/dictionary'
  import { toApproval, demandInsert, demandfindById, demandUpdateBySelective, deleteBySelective, findByVersion, auditDemand } from '@/api/demand'
  import { selectDuration } from '@/api/project_task'
  import user from '@/store/modules/user'
  import waves from '@/directive/waves' // 水波纹指令
  import { userQuery } from '@/api/user'
  import { getSequence } from '@/api/sequence'
  import deptSelect from '@/components/SelectUtil/dept'
  import { finddeptnode } from '@/api/dept'
  import { getITYYYWStart } from '@/api/oaInitiation'
  export default {
    components: {
      deptSelect },
    name: 'demandedit',
    directives: {
      waves
    },
    data() {
      return {
        disFlag: false,
        boxHeaderValue: '需求详情',
        submitLoading: false,
        temp: { demand_type: '', demand_code: '', audit_status: '', mian_dept: '', assessmentCount: 0 },
        nowTags: {},
        dictOptions: [],
        options: [],
        cr1: '',
        expected_time: '',
        actual_time: '',
        useroptions: [],
        demand_type: '',
        typeoptions: [{ lable: '功能需求或应用改进', value: '功能需求或应用改进' },
          { lable: '开发新功能', value: '开发新功能' },
          { lable: '取消新功能', value: '取消新功能' }],
        rules: {
          demand_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
          // ref1: [{ required: true, message: '不能为空', trigger: 'blur' }],
          demand_type: [{ required: true, message: '不能为空', trigger: 'blur' }],
          audit_status: [{ required: true, message: '不能为空', trigger: 'blur' }],
          subordinate_system: [{ required: true, message: '不能为空', trigger: 'blur' }],
          remarks: [{ required: true, message: '不能为空', trigger: 'blur' }],
          demand_code: [{ required: true, message: '不能为空', trigger: 'blur' }],
          emergency: [{ required: true, message: '不能为空', trigger: 'blur' }],
          deptsvalue: [{ required: true, message: '不能为空', trigger: 'blur' }],
          demand_context: [{ required: true, message: '不能为空', trigger: 'blur' }],
          demand_desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          expected_time: [{ required: true, message: '不能为空', trigger: 'blur' }],
          realization_effect: [{ required: true, message: '不能为空', trigger: 'blur' }],
          assessmentCount: [{ type: 'number', message: '必须为数字值' }]
        },
        deptsvalue: [],
        deptsOptions: [],
        expected_timedisFlag: false,
        dialogVisible: false,
        versionDta: [],
        vsersion: '版本追溯',
        editType: '',
        id: '',
        userPower: {},
        userRole: {},
        IFRevision: 'NO',
        reviewDialogVisible: false,
        reviewTextarea: '',
        ISREVIEW: true,
        ISSAVE: 'NO',
        approvalSubmitter: '',
        approvalSystem: '',
        demandEditLoading: false
      }
    },
    activated: function() {
      this.getUserOptions()
      this.getQueOptions()
      this.getDictionaries()
      this.getUserInfo()
      this.initData()
      this.fetchData()
      this.ISREVIEW = true
      if (this.userRole.hasOwnProperty('USR')) {
        this.ISREVIEW = false
      }
    },
    mounted() {
      this.getQueOptions()
      this.getUserOptions()
      var tagsView = this.$store.state.tagsView.visitedViews
      this.nowTags = tagsView[tagsView.length - 1]
      this.fetchData()
      this.getDepts()
      this.temp.deptsvalue = []
      this.deptsOptions = []
    },
    methods: {
      dateChage() {
        var that = this
        if (that.temp.expected_time) {
          var searchItems = {}
          searchItems.start_date = that.temp.expected_time[0]
          searchItems.end_date = that.temp.expected_time[1]
          selectDuration(searchItems).then(function(r) {
            that.temp.assessmentCount = r.data.model
          })
        }
      },
      getUserInfo() {
        var userPower = {}
        var userRole = {}
        user.state.authoritys.forEach(function(value, index) {
          userPower[value] = true
        })
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        this.userPower = userPower
        this.userRole = userRole
      },
      initData() {
        this.expected_timedisFlag = false
        this.vsersion = '版本追溯'
      },
      fetchData() {
        // this.temp = null
        var that = this
        that.IFRevision = 'NO'
        that.ISSAVE = 'NO'
        that.temp = that.$store.getters.onDemand
        console.log('temp', that.temp)
        that.useroptions.forEach(function(item, index) {
          if (item.userCode === that.temp.ref1) {
            that.approvalSubmitter = item.number
          }
        })
        that.approvalSystem = that.temp.subordinate_systemName
        that.$refs.dataForm.clearValidate()
        if (that.temp !== 'null') {
          that.boxHeaderValue = '编辑需求详情'
          if (that.temp.mian_dept) {
            that.temp.deptsvalue = that.temp.mian_dept.split(';')
          }
          if (that.temp.ref2 === 'save') {
            that.disFlag = false
          } else if (that.temp.ref2 === 'submit') {
            that.disFlag = true
          }
          that.temp.expected_time = []
          that.temp.expected_time[0] = that.temp.expected_time_from
          that.temp.expected_time[1] = that.temp.expected_time_to
          that.expected_timedisFlag = true
          if (that.temp.expected_time) {
            var searchItems = {}
            searchItems.start_date = that.temp.expected_time[0]
            searchItems.end_date = that.temp.expected_time[1]
            selectDuration(searchItems).then(function(r) {
              that.temp.assessmentCount = r.data.model
            })
          }
          that.temp.actual_time = []
          that.temp.actual_time[0] = that.temp.plan_start_time
          that.temp.actual_time[1] = that.temp.plan_end_time
        } else {
          that.temp = { demand_type: '', demand_code: '', audit_status: '', mian_dept: '', ref2: '', assessmentCount: 0, deptsvalue: [] }
          that.temp.audit_status = '未审核'
          that.temp.ref2 = ''
          that.deptsvalue = []
          that.getDmNum()
          that.boxHeaderValue = '新增需求详情'
          that.disFlag = false
          that.expected_time = []
          that.actual_time = []
        }
      },
      getDmNum() {
        getSequence('DM').then(r => {
          this.temp.demand_code = r.data.code
        })
      },
      getDepts() {
        var that = this
        finddeptnode().then(response => {
          var results = []
          results = response.data.list
          for (let i = 0; i < results.length; i++) {
            var temp = {}
            if (!results[i].hasOwnProperty('children')) {
              temp.label = results[i].deptName
              temp.value = results[i].deptId
            } else {
              temp.label = results[i].deptName
              temp.value = results[i].deptId
              temp.children = []
              for (var j in results[i].children) {
                var ump = {}
                if (!results[i].children[j].hasOwnProperty('children')) {
                  ump.label = results[i].children[j].deptName
                  ump.value = results[i].children[j].deptId
                } else {
                  ump.label = results[i].children[j].deptName
                  ump.value = results[i].children[j].deptId
                  ump.children = []
                  var opt = results[i].children[j].children
                  for (var k in opt) {
                    var opm = {}
                    if (!opt[k].hasOwnProperty('children')) {
                      opm.label = opt[k].deptName
                      opm.value = opt[k].deptId
                    } else {
                      opm.label = opt[k].deptName
                      opm.value = opt[k].deptId
                      opm.children = []
                      var ops = opt[k].children
                      for (var n in ops) {
                        var ope = {}
                        if (!ops[n].hasOwnProperty('children')) {
                          ope.label = ops[n].deptName
                          ope.value = ops[n].deptId
                          opm.children.push(ope)
                        }
                      }
                    }
                    ump.children.push(opm)
                  }
                }
                temp.children.push(ump)
              }
            }
            that.deptsOptions.push(temp)
          }
        })
      },
      closePage() {
        this.$router.replace('/requirements/demandindex')
        this.closeSelectedTag(this.nowTags)
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      getUserOptions() {
        var seachItems = { page: {}, items: {}}
        userQuery(seachItems).then(r => {
          console.log('userQuery', r)
          this.useroptions = r.data.list
        })
      },
      getDictionaries() {
        var that = this
        var seachItems = { page: {}, items: { 'fd_type': '应用系统' }}
        headerDictionaryQuery(seachItems).then(r => {
          that.dictOptions = r.data.list
          that.dictOptions.forEach(function(item, index) {
            if (item.fd_id === '11') {
              that.dictOptions.splice(index, 1)
            }
          })
        })
      },
      getQueOptions() {
        var seachItems = { page: {}, items: { 'dictionnaryType_eq': '紧急程度' }}
        dictionaryQuery(seachItems).then(r => {
          this.options = r.data.list
        })
      },
      changeRef1(e) {
        var that = this
        that.useroptions.forEach(function(item, index) {
          if (item.userCode === e) {
            that.approvalSubmitter = item.number
          }
        })
      },
      changeSystem(e) {
        var that = this
        if (e === 12) {
          that.approvalSystem = 'BI系统'
        } else if (e === 8) {
          that.approvalSystem = 'EBS系统'
        } else if (e === 15) {
          that.approvalSystem = 'EDI系统'
        } else if (e === 14) {
          that.approvalSystem = 'JIRA系统'
        } else if (e === 3) {
          that.approvalSystem = 'MES系统'
        } else if (e === 4) {
          that.approvalSystem = 'NC系统'
        } else if (e === 2) {
          that.approvalSystem = 'PLM系统'
        } else if (e === 5) {
          that.approvalSystem = 'PM系统'
        } else if (e === 16) {
          that.approvalSystem = '数据中心'
        } else if (e === 7) {
          that.approvalSystem = 'OA_SEC系统'
        } else if (e === 9) {
          that.approvalSystem = 'OA_文档管理'
        } else {
          that.approvalSystem = 'OA_移动端'
        }
      },
      revisionData() {
        var that = this
        that.IFRevision = 'YES'
        that.disFlag = false
      },
      saveData() {
        var that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.ISSAVE = 'YES'
            var item = {}
            that.temp.expected_time_from = that.temp.expected_time[0] ? that.temp.expected_time[0] : null
            that.temp.expected_time_to = that.temp.expected_time[1] ? that.temp.expected_time[1] : null
            if (that.temp.actual_time) {
              that.temp.plan_start_time = that.temp.actual_time[0] ? that.temp.actual_time[0] : null
              that.temp.plan_end_time = that.temp.actual_time[1] ? that.temp.actual_time[1] : null
            }
            that.temp.ref2 = 'save'
            that.temp.audit_status = '未审核'
            item.model = that.temp
            item.model.create_by = user.state.usercode
            item.model.update_by = user.state.usercode
            item.model.createUserName = user.state.fullName
            item.model.updateUserName = user.state.fullName
            item.model.ref5 = ''
            if (that.IFRevision === 'YES') {
              demandUpdateBySelective(item).then(r => {
                that.$notify({
                  title: '成功',
                  message: r.data.info,
                  type: r.data.status,
                  duration: 2000
                })
                if (r.data.status === 'success') {
                  that.closePage()
                }
              })
            } else {
              demandInsert(item).then(r => {
                this.$notify({
                  title: '消息',
                  message: r.data.info,
                  type: r.data.status,
                  duration: 2000
                })
                if (r.data.status === 'success') {
                  that.closePage()
                }
              })
            }
          }
        })
      },
      submitData() {
        var that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var item = {}
            that.temp.ref2 = 'submit'
            that.temp.audit_status = '未审核'
            that.temp.expected_time_from = that.temp.expected_time[0] ? that.temp.expected_time[0] : null
            that.temp.expected_time_to = that.temp.expected_time[1] ? that.temp.expected_time[1] : null
            if (that.temp.actual_time) {
              that.temp.plan_start_time = that.temp.actual_time[0] ? that.temp.actual_time[0] : null
              that.temp.plan_end_time = that.temp.actual_time[1] ? that.temp.actual_time[1] : null
            }
            item.model = that.temp
            item.model.update_by = user.state.usercode
            item.model.ref5 = ''
            auditDemand(item).then(r => {
              that.$notify({
                title: '消息',
                message: r.data.info,
                type: r.data.status,
                duration: 2000
              })
              if (r.data.status === 'success') {
                that.ISSAVE = 'NO'
                that.closePage()
              }
            })
          }
        })
      },
      reviewData() {
        this.reviewDialogVisible = true
      },
      agree(type) {
        var that = this
        var item = {}
        that.reviewDialogVisible = false
        that.demandEditLoading = true
        that.temp.expected_time_from = that.temp.expected_time[0] ? that.temp.expected_time[0] : null
        that.temp.expected_time_to = that.temp.expected_time[1] ? that.temp.expected_time[1] : null
        if (that.temp.actual_time) {
          that.temp.plan_start_time = that.temp.actual_time[0] ? that.temp.actual_time[0] : null
          that.temp.plan_end_time = that.temp.actual_time[1] ? that.temp.actual_time[1] : null
        }
        if (type === 1) {
          that.temp.ref2 = 'save'
          that.temp.audit_status = '驳回'
          item.model = that.temp
          item.model.update_by = user.state.usercode
          item.model.ref5 = that.reviewTextarea
          item.model.managerName = ''
          auditDemand(item).then(r => {
            that.$notify({
              title: '消息',
              message: r.data.info,
              type: r.data.status,
              duration: 2000
            })
            that.demandEditLoading = false
            that.closePage()
          })
        }
        if (type === 2) {
          that.temp.ref2 = 'submit'
          that.temp.audit_status = '通过'
          item.model = that.temp
          item.model.update_by = user.state.usercode
          item.model.ref5 = that.reviewTextarea
          item.model.managerName = user.state.usercode
          toApproval(item).then(r => {
            this.$notify({
              title: '消息',
              message: r.data.info,
              type: r.data.status,
              duration: 2000
            })
            if (r.data.status === 'success') {
              auditDemand(item).then(r => {
                that.$notify({
                  title: '消息',
                  message: r.data.info,
                  type: r.data.status,
                  duration: 2000
                })
                that.demandEditLoading = false
                that.closePage()
              })
            }
          })
        }
        if (type === 3) {
          that.temp.ref2 = 'submit'
          that.temp.audit_status = 'OA审核中'
          item.model = that.temp
          item.model.update_by = user.state.usercode
          item.model.ref5 = that.reviewTextarea
          item.model.managerName = user.state.usercode
          setTimeout(function() {
            that.submittoOA(item)
          }, 1000)
        }
      },
      submittoOA(item) {
        var that = this
        var items = {}
        if (that.approvalSubmitter === '') {
          that.useroptions.forEach(function(i, index) {
            if (i.userCode === that.temp.ref1) {
              that.approvalSubmitter = i.number
              items.ApplicantLoginName = that.approvalSubmitter
            }
          })
        } else {
          items.ApplicantLoginName = that.approvalSubmitter
        }
        items.XQname = that.temp.demand_name
        items.SSXT = that.approvalSystem
        if (that.temp.emergency === '6346a2f1-cbd5-418e-a30c-00788ebef3ea') {
          items.JJCD = '普通'
        } else if (that.temp.emergency === '020d2003-bb6e-4a09-b4e6-1420bc54555c') {
          items.JJCD = '紧急'
        } else if (that.temp.emergency === 'aa95d96c-9cdc-4f3f-ae0e-adcd0106849e') {
          items.JJCD = '重要'
        }
        items.XQtype = that.temp.demand_type
        items.QWdatetime = that.temp.expected_time[0] ? that.temp.expected_time[0] : null
        items.XQBJ = that.temp.demand_context
        items.XQMS = that.temp.demand_desc
        items.SXXG = that.temp.realization_effect
        items.Reson = that.temp.remarks
        items.PMXQCode = that.temp.demand_code
        items.QWdatetime2 = that.temp.expected_time[1] ? that.temp.expected_time[1] : null
        items.PMITSuggest = that.temp.processing_opinion
        items.PMCDBM = that.temp.ref7
        getITYYYWStart(JSON.stringify(items), function(r) {
          console.log('getITYYYWStart', r.responseText)
          var obj = JSON.parse(r.responseText)
          that.$notify({
            title: obj.ResultMessage,
            message: obj.ResultMessage,
            type: 'success',
            duration: 2000
          })
          if (obj.ResultCode === 1) {
            auditDemand(item).then(r => {
              that.$notify({
                title: '消息',
                message: r.data.info,
                type: r.data.status,
                duration: 2000
              })
              that.demandEditLoading = false
              that.closePage()
            })
          } else {
            that.demandEditLoading = false
          }
        })
      },
      deleteData() {
        if (this.boxHeaderValue === '新增需求详情') {
          if (this.temp.demand_id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var seachItems = { items: { demand_id_eq: this.temp.demand_id }}
              deleteBySelective(seachItems).then(r => {
                this.$notify({
                  title: '成功',
                  message: '已删除',
                  type: 'success',
                  duration: 2000
                })
                this.closePage()
              })
            })
          }
          this.closePage()
        } else {
          this.$notify({
            title: '警告',
            message: '该需求不能删除！',
            type: 'warning',
            duration: 2000
          })
        }
      },
      changeEmergencyColor() {
        return '#FF4500'
      },
      editData() {
        this.disFlag = false
        this.expected_timedisFlag = false
      },
      handleChange() {
        this.temp.mian_dept = this.temp.deptsvalue.join(';')
        // this.temp.mian_dept = this.deptsvalue[this.deptsvalue.length - 1]
      },
      versionCheck() {
        var searchItem = { page: {}, items: {}}
        searchItem.items.demandCode = this.temp.demand_code
        findByVersion(this.temp.demand_code).then(r => {
          if (r.data.model.length > 0) {
            this.dialogVisible = true
            this.versionDta = r.data.model
          } else {
            this.$notify({
              title: '提示',
              message: '没有版本信息',
              duration: 2000
            })
          }
        })
      },
      versionChose(row) {
        demandfindById(row.demand_id).then(r => {
          if (r.data.model) {
            this.dialogVisible = false
            this.vsersion = '版本号:' + row.version
            this.temp = r.data.model
            if (this.temp.mian_dept) {
              this.temp.deptsvalue = this.temp.mian_dept.split(';')
            }
            if (this.temp.ref2 === 'save') {
              this.disFlag = false
            } else if (this.temp.ref2 === 'submit') {
              this.disFlag = true
            }
            this.temp.expected_time = []
            this.temp.expected_time[0] = r.data.model.expected_time_from
            this.temp.expected_time[1] = r.data.model.expected_time_to
            this.expected_timedisFlag = true
            this.temp.actual_time = []
            this.temp.actual_time[0] = r.data.model.plan_start_time
            this.temp.actual_time[1] = r.data.model.plan_end_time
          } else {
            this.$notify({
              title: '提示',
              message: '未知错误，请联系系统管理员',
              duration: 2000
            })
          }
        })
      },
      headerStyle() {
        return { 'background-color': '#E0FFFF', 'color': '#545454' }
      }
    }
  }
</script>
<style>
  .el-card__header {
    color: #909399;
    font-size: 15px;
    padding: 11px 11px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: bold;
  }
  .boxtext {

    font-size: 15px;
  }
  .text-row-span{
    text-align: left;
    font-weight: bold;
  }
  .text-row{
    height: 6vh;
  }
</style>
