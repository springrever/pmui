/**
* Created by yaoyuan on 2019/8/8.
*/
<template>
  <div class="app-container">
    <div style="margin-top: -15px">
      <el-row>
        <el-col :span="6">
          <el-button-group style="margin-bottom: 5px;">
            <el-button size="mini" :loading = "submitLoading" @click="saveData" type="primary" plain :disabled="STATUS === '提交'">保存 <i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="submitData" type="success"  plain :disabled="STATUS === '提交'">提交 <i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="review" type="primary"  plain :disabled="STATUS !== '提交' || reviewStatus === '通过'" v-if="ISREVIEW">审核 <i class="el-icon-share el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="deleteData" type="danger"  plain :disabled="reviewStatus !== '未审核'">删除 <i class="el-icon-delete el-icon--right"></i></el-button>
          </el-button-group>
        </el-col>
        <el-col :span="1">
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            :content="why">
            <el-button size="mini" slot="reference" plain >{{reviewStatus}}<i class="el-icon-more el-icon--right"></i></el-button>
          </el-popover>
        </el-col>
        <el-col :span="17">
          <div style="height: 1px"></div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="boxtext">
            <el-form :rules="rules" size="mini" ref="dataForm" :model="temp" label-position="right" label-width="100px"
                     style=' margin-left:0px;'>
              <el-row :gutter="100" type="flex" class="row-bg" style="height: 40px;">
                <el-col :span="8">
                  <el-form-item prop="materialCode" label="项目单编号">
                    <el-input disabled="true" style="width: 300px" v-model="this.$store.getters.onProject.project_code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="materialCode" label="项目单名称">
                    <el-input disabled="true" style="width: 300px" v-model="this.$store.getters.onProject.project_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="taskStageStatus" label="项目状态">
                    <el-input disabled="true" v-model="taskStageStatus" style="width: 300px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100" type="flex" class="row-bg" style="height: 40px;">
                <el-col :span="8">
                  <el-form-item prop="materialCode" label="项目阶段">
                    <el-select v-model="taskStageId"
                               :disabled="$route.params.type === '编辑'"
                               style="width: 300px"
                               size="mini"
                               @change="changeTaskId"
                               filterable
                               placeholder="请选择">
                      <el-option
                        v-for="item in stageOptions"
                        :key="item.task_id"
                        :label="item.text"
                        :value="item.task_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="materialName" label="当前进度">
                    <el-select v-model="taskStageProgress"
                               :disabled="IFNEW"
                               style="width: 300px"
                               size="mini"
                               filterable
                               placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100" type="flex" class="row-bg" style="height: 40px;">
                <el-col :span="8">
                  <el-form-item prop="planDateValue" label="计划日期:">
                    <el-date-picker
                      style="width: 300px"
                      size="mini"
                      disabled="true"
                      v-model="planDateValue"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="actualDateValue" label="实际日期:">
                    <el-date-picker
                      :disabled="IFNEW"
                      style="width: 300px"
                      size="mini"
                      v-model="temp.actualDateValue"
                      @change="changeActualDateValue"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100" type="flex" class="row-bg" style="height: 80px;">
                <el-col :span="16">
                  <el-form-item prop="remarks" label="备注:">
                    <el-input v-model="temp.remarks"
                              :disabled="IFNEW"
                              type="textarea"
                              :rows="3"
                              placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
        <el-button @click="reviewTask('1')">驳 回</el-button>
        <el-button type="primary" @click="reviewTask('2')">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { taskLevelList, upTaskLevelList, selectPlanData, selectCalculate, addProjectProgress, updateProjectProgress, auditProjectProgress, deleteProjectProgress } from '@/api/projectSchedule'
  import { demand_projectQuery } from '@/api/demand_project'
  import user from '@/store/modules/user'
  export default {
    components: {},
    name: 'projectScheduleEdit',
    directives: {
    },
    data() {
      return {
        planDateValue: '',
        actualDateValue: '',
        temp: {},
        stageOptions: [],
        taskStageId: '',
        options: [
          // { key: '未开始', label: '未开始' },
          // { key: '进行中', label: '进行中' },
          { key: '已完成', label: '已完成' }
        ],
        projectOptions: [],
        userRole: {},
        projectCode: '',
        taskStageStatus: '',
        taskStageProgress: '',
        remarks: '',
        reviewDialogVisible: false,
        reviewTextarea: '',
        reviewStatus: '',
        why: '',
        IFNEW: false,
        STATUS: '',
        nowTags: {},
        rules: {
          taskStageId: [{ required: true, message: '不能为空', trigger: 'blur' }],
          taskStageProgress: [{ required: true, message: '不能为空', trigger: 'blur' }],
          actualDateValue: [{ required: true, message: '不能为空', trigger: 'change' }],
          remarks: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        ISREVIEW: false
      }
    },
    mounted: function() {
      this.getUserInfo()
    },
    activated: function() {
      var that = this
      that.$store.commit('SET_SHOWPROJECT', false)
      if (that.$store.getters.onProject === 'null') {
        that.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning',
          callback: action => {
            that.$router.replace({ name: 'demendProjectIndex', params: {
              type: 'projectScheduleEdit',
              from: 'projectScheduleEdit'
            }})
          }
        })
      } else {
        if (that.$route.params.type === '新增') {
          that.STATUS = ''
          that.getStageOptions(1)
          that.taskStageStatus = ''
          that.taskStageId = ''
          that.planDateValue = ''
          that.projectOptions = []
          that.taskStageProgress = ''
          that.reviewDialogVisible = false
          that.reviewTextarea = ''
          that.reviewStatus = '未审核'
          that.why = '无审核意见'
          that.temp = { actualDateValue: [], remarks: '' }
          that.IFNEW = false
        } else if (that.$route.params.type === '编辑') {
          console.log('row', that.$route.params.row)
          that.STATUS = that.$route.params.row.ref3
          that.getStageOptions(2)
          if (that.$route.params.row.ref3 === '保存') {
            that.IFNEW = false
          } else if (that.$route.params.row.ref3 === '提交') {
            that.IFNEW = true
          }
          that.taskStageStatus = that.$route.params.row.progress_status
          that.taskStageId = that.$route.params.row.progress_phase
          that.planDateValue = []
          that.planDateValue[0] = that.$route.params.row.create_date ? that.$route.params.row.create_date : ''
          that.planDateValue[1] = that.$route.params.row.end_date ? that.$route.params.row.end_date : ''
          that.taskStageStatus = that.$route.params.row.progress_status
          that.taskStageProgress = that.$route.params.row.progress_current
          that.reviewDialogVisible = false
          that.reviewTextarea = ''
          that.reviewStatus = that.$route.params.row.status
          that.why = that.$route.params.row.ref2 ? that.$route.params.row.ref2 : '无审核意见'
          that.temp = { actualDateValue: [that.$route.params.row.actual_data_start ? that.$route.params.row.actual_data_start : '', that.$route.params.row.actual_data_end ? that.$route.params.row.actual_data_end : ''], remarks: that.$route.params.row.progress_note }
        } else {
          that.STATUS = ''
          that.getStageOptions(1)
          that.taskStageStatus = ''
          that.taskStageId = ''
          that.planDateValue = ''
          that.projectOptions = []
          that.taskStageProgress = ''
          that.reviewDialogVisible = false
          that.reviewTextarea = ''
          that.reviewStatus = '未审核'
          that.why = '无审核意见'
          that.temp = { actualDateValue: [], remarks: '' }
          that.IFNEW = false
        }
        this.getProjectScheduleInfo()
        var tagsView = this.$store.state.tagsView.visitedViews
        this.nowTags = tagsView[tagsView.length - 1]
        this.getUserInfo()
        this.ISREVIEW = false
        if (this.userRole['admin'] || this.userRole['manager']) {
          this.ISREVIEW = true
        }
      }
    },
    methods: {
      getProjectScheduleInfo() {},
      getStageOptions(type) {
        var items = {}
        var that = this
        items.projectId = this.$store.getters.onProject.project_id
        if (type === 1) {
          taskLevelList(items).then(function(r) {
            console.log('taskChildList', r)
            that.stageOptions = r.data.model
          })
        } else if (type === 2) {
          upTaskLevelList(items).then(function(r) {
            console.log('upTaskLevelList', r)
            that.stageOptions = r.data.model
          })
        }
      },
      changeTaskId() {
        var that = this
        var items = {}
        items.taskId = that.taskStageId
        items.projectId = that.$store.getters.onProject.project_id
        selectPlanData(items).then(function(r) {
          console.log('selectCalculate', r.data.model)
          that.planDateValue = []
          if (r.data.model) {
            that.planDateValue[0] = r.data.model.start_date
            that.planDateValue[1] = r.data.model.end_date
          }
        })
      },
      changeActualDateValue() {
        var that = this
        var items = {}
        items.taskId = that.taskStageId
        items.endDate = that.planDateValue[1]
        items.actualDataEnd = that.temp.actualDateValue[1]
        selectCalculate(items).then(function(r) {
          that.taskStageStatus = r.data.model
        })
      },
      saveData() {
        var that = this
        var Items = { model: {}}
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            Items.model.project_id = that.$store.getters.onProject.project_id
            Items.model.task_id = that.taskStageId
            Items.model.progress_code = that.$store.getters.onProject.project_code
            Items.model.progress_name = that.$store.getters.onProject.project_name
            Items.model.progress_status = that.taskStageStatus
            Items.model.progress_phase = that.taskStageId
            Items.model.progress_current = that.taskStageProgress
            Items.model.start_date = that.planDateValue[0]
            Items.model.end_date = that.planDateValue[1]
            Items.model.actual_data_start = that.temp.actualDateValue[0]
            Items.model.actual_data_end = that.temp.actualDateValue[1]
            Items.model.progress_note = that.temp.remarks
            Items.model.create_by = user.state.usercode
            Items.model.ref3 = '保存'
            if (that.$route.params.type === '新增') {
              addProjectProgress(Items).then(function(r) {
                that.submitLoading = false
                that.$notify({
                  type: r.data.status,
                  title: '提示',
                  message: r.data.info,
                  duration: 1000
                })
              })
            } else if (that.$route.params.type === '编辑') {
              console.log('id', that.$route.params.row.id)
              Items.model.update_by = user.state.usercode
              Items.model.id = that.$route.params.row.id
              updateProjectProgress(Items).then(function(r) {
                that.submitLoading = false
                that.$notify({
                  type: r.data.status,
                  title: '提示',
                  message: r.data.info,
                  duration: 1000
                })
              })
            }
            that.closePage()
          }
        })
      },
      submitData() {
        var that = this
        var Items = { model: {}}
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            Items.model.project_id = that.$store.getters.onProject.project_id
            Items.model.task_id = that.taskStageId
            Items.model.progress_code = that.$store.getters.onProject.project_code
            Items.model.progress_name = that.$store.getters.onProject.project_name
            Items.model.progress_status = that.taskStageStatus
            Items.model.progress_phase = that.taskStageId
            Items.model.progress_current = that.taskStageProgress
            Items.model.start_date = that.planDateValue[0]
            Items.model.end_date = that.planDateValue[1]
            Items.model.actual_data_start = that.temp.actualDateValue[0]
            Items.model.actual_data_end = that.temp.actualDateValue[1]
            Items.model.progress_note = that.temp.remarks
            Items.model.create_by = user.state.usercode
            if (that.$route.params.type === '新增') {
              Items.model.ref3 = '提交'
              addProjectProgress(Items).then(function(r) {
                that.submitLoading = false
                that.$notify({
                  type: r.data.status,
                  title: '提示',
                  message: r.data.info,
                  duration: 1000
                })
              })
            } else if (that.$route.params.type === '编辑') {
              Items.model.ref3 = '提交'
              Items.model.update_by = user.state.usercode
              Items.model.id = that.$route.params.row.id
              updateProjectProgress(Items).then(function(r) {
                that.submitLoading = false
                that.$notify({
                  type: r.data.status,
                  title: '提示',
                  message: r.data.info,
                  duration: 1000
                })
              })
            }
            that.closePage()
          }
        })
      },
      review() {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.reviewDialogVisible = true
          }
        })
      },
      // 拒绝
      reviewTask(type) {
        var that = this
        var Items = { model: {}}
        this.submitLoading = true
        Items.model.update_by = user.state.usercode
        Items.model.ref2 = that.reviewTextarea
        Items.model.id = that.$route.params.row.id
        Items.model.project_id = that.$store.getters.onProject.project_id
        Items.model.task_id = that.taskStageId
        Items.model.progress_code = that.$store.getters.onProject.project_code
        Items.model.progress_name = that.$store.getters.onProject.project_name
        Items.model.progress_status = that.taskStageStatus
        Items.model.progress_phase = that.taskStageId
        Items.model.progress_current = that.taskStageProgress
        Items.model.start_date = that.planDateValue[0]
        Items.model.end_date = that.planDateValue[1]
        Items.model.actual_data_start = that.temp.actualDateValue[0]
        Items.model.actual_data_end = that.temp.actualDateValue[1]
        Items.model.progress_note = that.temp.remarks
        if (type === '1') {
          Items.model.status = '驳回'
          Items.model.ref3 = '保存'
        } else {
          Items.model.status = '通过'
          Items.model.ref3 = '提交'
        }
        auditProjectProgress(Items).then(function(r) {
          that.submitLoading = false
          that.reviewDialogVisible = false
          that.$notify({
            type: r.data.status,
            title: '提示',
            message: r.data.info,
            duration: 1000
          })
          that.closePage()
        })
      },
      deleteData() {
        var that = this
        that.submitLoading = true
        if (that.$route.params.type === '编辑') {
          var Items = {}
          Items.updateBy = user.state.usercode
          Items.id = that.$route.params.row.id
          deleteProjectProgress(Items).then(function(r) {
            that.$notify({
              type: r.data.status,
              title: '提示',
              message: r.data.info,
              duration: 1000
            })
          })
        }
        that.submitLoading = false
        that.closePage()
      },
      getProjectOptions() {
        var that = this
        var seachItems = {}
        // 判断当前登录人是不是属于系统管理员和项目经理
        if (!this.userRole['admin'] && !this.userRole['manager']) {
          seachItems = { page: {}, items: {}, userCode: user.state.usercode }
        } else {
          seachItems = { page: {}, items: {}}
        }
        demand_projectQuery(seachItems).then(r => {
          that.projectOptions = r.data.list
        })
      },
      getUserInfo() {
        var userRole = {}
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        this.userRole = userRole
      },
      closePage() {
        this.$router.replace('/project/projectSchedule')
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
      }
    }
  }
</script>
<style scoped="true">
  .elInput {
    width: 200px;
  }
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
