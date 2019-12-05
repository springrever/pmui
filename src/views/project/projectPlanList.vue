/**
* Created by yaoyuan on 2019/7/19.
*/
<template>
  <div class="app-container">
    <div style="margin-top: -15px">
      <el-row>
        <el-col :span="12">
          <el-button-group style="margin-bottom: 5px;margin-top: -0px" >
            <el-button size="mini" :loading = "submitLoading" @click="reviseData()" type="danger" plain :disabled="reviewStatus !== '通过' || switchValue">变更计划<i class="el-icon-edit el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="changeData()" type="danger" plain :disabled="reviewStatus !== '通过' || switchValue">更新进度<i class="el-icon-edit el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="saveData()" type="primary" plain :disabled="switchValue">保存<i class="el-icon-check el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="submitData()" type="success" plain :disabled="planStatus === '提交' || switchValue">提交<i class="el-icon-success el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="review()" type="warning" plain :disabled="!(reviewStatus === '未审核'&& planStatus === '提交')" v-if="ISREVIEW">审核<i class="el-icon-warning el-icon--right"></i></el-button>
            <el-button size="mini" :loading = "submitLoading" @click="versionCheck()" type="info" plain :disabled="switchValue">{{vsersions}}<i class="el-icon-more el-icon--right"></i></el-button>
            <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getExcle()">导出</el-button>
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
        <el-col :span="7">
          <div style="height: 1px"></div>
        </el-col>
        <el-col :span="4">
          <el-switch
            :disabled="!IFSWITCH"
            style="margin-top: 5px"
            :change="change()"
            v-model="switchValue"
            active-text="甘特图"
            inactive-text="计划列表">
          </el-switch>
        </el-col>
      </el-row>
    </div>
    <!--<el-button-group style="float: right; margin-bottom: 3px">-->
      <!--<el-button :loading="submitLoading" @click="versionCheck()" style="float: right; padding: 3px 3px;color: #FF4500" type="text">{{vsersion}}</el-button>-->
      <!--<el-button :loading="submitLoading" @click="deleteData" style="float: right; padding: 3px 3px" type="text">删除</el-button>-->
      <!--<el-button :loading="submitLoading" @click="submitData" style="float: right; padding: 3px 3px" type="text">提交审批</el-button>-->
      <!--<el-button :loading="submitLoading" @click="editData" style="float: right; padding: 3px 3px" type="text">编辑信息</el-button>-->
      <!--<el-button :loading="submitLoading" @click="saveData()" style="float: right; padding: 3px 3px" type="text">保存</el-button>-->
      <!--<el-button :loading="submitLoading" @click="closePage()" style="float: right; padding: 3px 3px;color: #FF4500" type="text" >返回</el-button>-->
    <!--</el-button-group>-->
    <el-card class="box-card" >
      <el-table
        v-if="!switchValue"
        :data="tableData"
        border
        :highlight-current-row="true"
        :row-style="changeStyle"
        :header-row-style="headerClass"
        @row-dblclick="rowdblclick"
        style="width: 100%;margin-top: -5px">
        <el-table-column align="" header-align="center" prop="text" label="任务名称"  width="245">
          <template slot-scope="scope">
            <span v-if="scope.row.number.length > 1" style="margin-left: 15px"></span>
            <span v-if="scope.row.number.length > 4" style="margin-left: 15px"></span>
            <span icon="el-icon-s-flag">{{scope.row.number + '、' + scope.row.text}}</span>
            <img v-if="scope.row.ref2 === 1" src="../../assets/img/flag.png" style="margin-left: 10px;" >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="start_date" label="计划开始日期">
          <template slot-scope="scope">
            <span>{{scope.row.start_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="end_date" label="计划结束日期">
          <template slot-scope="scope">
            <span>{{scope.row.end_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="actual_data_start" label="实际开始日期">
          <template slot-scope="scope">
            <span>{{scope.row.actual_data_start}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="actual_data_end" label="实际结束日期">
          <template slot-scope="scope">
            <span>{{scope.row.actual_data_end}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="duration" label="持续(天)" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.duration}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ref1" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.ref1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="progress" label="进度" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.progress}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="false" align="center" prop="" label="资源" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="false" align="center" prop="" label="输出文档" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" prop="" label="操作" width="150" v-if="planStatus === '保存' && ISREVISE !== 'CHANGE'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleAdd(scope.$index, scope.row)" ><i class="el-icon-plus"></i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-minus"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <gantt ref="myGantte"
             v-if="switchValue"
             class="left-container"
             :readonly="gantteReadonly"
             :projectId="$store.getters.onProject.project_id"
             :ganttType="ganttType"
             :version="version"></gantt>
    </el-card>
    <project-plan-dialog
      ref="projectplandialog"
      :restData="getProjectInfo"
      :returnByChild="returnByChild"></project-plan-dialog>
    <el-dialog
      title="选择计划模板类型"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogTableVisible">
      <span v-if="radio === '1'" style="margin-top: -100px;color: #D33237">* 请选择模板</span>
      <div style="margin-top: 20px; padding-top: 0px">
        <div v-for="(item, index) in templateData" :key="index" style="margin-top: 10px">
          <el-radio v-model="radio" :label=item.template_id @change="changeTemplate()" >{{ item.template_name }}</el-radio>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--<el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="版本信息"
      :visible.sync="versionDialogVisible"
      width="40%">
      <el-table  @row-click="versionChose"
                 :key='tableKey'
                 :data="versionData"
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
            <span>{{scope.row.createByName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建时间" >
          <template slot-scope="scope">
            <span>{{scope.row.create_date}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="版本号" >
          <template slot-scope="scope">
            <span>{{scope.row.version}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="审批状态" >
          <template slot-scope="scope">
            <span>{{scope.row.audit_status}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--审核意见-->
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
        <el-button @click="reject()">驳 回</el-button>
        <el-button type="primary" @click="agree()">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { listProjectTask, deleteBySelective, projectTemplateList, revisionProjectTask, insertProjectTaskChild, project_taskQuery } from '@/api/project_task'
  import { taskStatusInfo, updateTaskStatus, taskVersionList, selectTaskVersion, selectVerify } from '@/api/project_plan_list'
  import ProjectPlanDialog from '../../components/ProjectPlan/index'
  import user from '@/store/modules/user'
  import Gantt from '../utils/gantte'
  export default {
    components: {
      Gantt,
      ProjectPlanDialog },
    name: 'projectPlanList',
    data() {
      return {
        tableData: [],
        templateData: [],
        tableRowClassName: '.warning-row',
        ifIndentation: false,
        ifIndentation2: false,
        radio: '1',
        dialogTableVisible: false,
        ISREVISE: 'NO',
        ISCHANGE: 'NO',
        ISSAVE: 'NO',
        deleteDatas: [],
        addDatas: [],
        updateDatas: [],
        reviewStatus: '未审核',
        planStatus: '保存',
        version: 1,
        vsersions: '当前版本',
        versionData: [],
        versionDialogVisible: false,
        reviewDialogVisible: false,
        reviewTextarea: '',
        why: '',
        switchValue: false,
        tasks: {
          data: [],
          links: []
        },
        ganttType: 3,
        gantteReadonly: true,
        IFSWITCH: false,
        submitLoading: false,
        userPower: {},
        userRole: {},
        ISREVIEW: false
      }
    },
    activated: function() {
      var that = this
      if (that.$store.getters.onProject === 'null') {
        that.$store.commit('SET_SHOWPROJECT', false)
        that.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning',
          callback: action => {
            that.$router.replace({ name: 'demendProjectIndex', params: {
              type: 'projectPlanList',
              from: 'projectPlanList'
            }})
          }
        })
      } else {
        this.getUserInfo()
        this.ISREVIEW = false
        if (this.userRole['admin'] || this.userRole['manager']) {
          this.ISREVIEW = true
        }
        this.ISREVISE = 'NO'
        this.getProjectInfo()
      }
    },
    methods: {
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
      getExcle() {
        var that = this
        var searchItems = { page: {}, items: {}}
        searchItems.items.project_id = that.$store.getters.onProject.project_id
        var url = process.env.API_BASEURL + '/files/n/project_task/export?projectId=' + that.$store.getters.onProject.project_id
        window.open(url, '_blank')
      },
      getProjectInfo() {
        var that = this
        that.getListShowOrNot(function(l) {
          if (l > 0) {
            var searchItems = { page: {}, items: {}}
            searchItems.items.project_id_eq = that.$store.getters.onProject.project_id
            listProjectTask(searchItems).then(r => {
              that.tableData = r.data.list
              that.getTaskStatusInfo()
            })
          } else {
            that.dialogTableVisible = true
            projectTemplateList().then(r => {
              that.templateData = r.data.list
            })
          }
        })
        /* var project_task_status = 3
        if (this.$store.getters.onProject.project_id) {
          demand_projectfindById(this.$store.getters.onProject.project_id).then(r => {
            project_task_status = r.data.model.project_task_status
            if (project_task_status === 0) {
              this.dialogTableVisible = true
              projectTemplateList().then(r => {
                this.templateData = r.data.list
              })
            } else {
              var searchItems = { page: {}, items: {}}
              if (this.$store.getters.onProject.project_id) {
                searchItems.items.project_id_eq = this.$store.getters.onProject.project_id
                listProjectTask(searchItems).then(r => {
                  this.tableData = r.data.list
                  this.getTaskStatusInfo()
                })
              }
            }
          })
        }*/
      },
      getListShowOrNot(callbacks) {
        var searchItems = { page: {}, items: {}}
        searchItems.items.project_id_eq = this.$store.getters.onProject.project_id
        listProjectTask(searchItems).then(r => {
          var l = r.data.list.length
          callbacks(l)
        })
      },
      getTaskStatusInfo() {
        taskStatusInfo(this.$store.getters.onProject.project_id).then(r => {
          this.reviewStatus = r.data.model.audit_status
          this.planStatus = r.data.model.operation_status
          this.version = r.data.model.version
          this.vsersions = '当前版本:' + this.version
          this.why = r.data.model.why ? r.data.model.why : '无审核意见'
        })
      },
      getGanttInfo(version) {
        var seachItems = { page: {}, items: {}}
        seachItems.items.project_id = this.$store.getters.onProject.project_id
        seachItems.items.version = version
        project_taskQuery(seachItems).then(r => {
          this.tasks.data = r.data.list
        })
      },
      // 修订
      reviseData() {
        var that = this
        var items = {}
        items.projectId = this.$store.getters.onProject.project_id
        items.version = this.version
        selectVerify(items).then(r => {
          if (r.data.status === 'success') {
            that.ISREVISE = 'YES'
            that.planStatus = '保存'
            that.deleteDatas = []
            that.addDatas = []
            that.updateDatas = []
          } else {
            that.$notify.warning({
              title: '提示',
              message: '当前版本不是最新版本，请先获取最新版本',
              duration: 1000
            })
          }
        })
      },
      changeData() {
        var that = this
        var items = {}
        items.projectId = that.$store.getters.onProject.project_id
        items.version = that.version
        selectVerify(items).then(r => {
          if (r.data.status === 'success') {
            that.getTaskStatusInfo()
            setTimeout(function() {
              that.ISREVISE = 'CHANGE'
              that.planStatus = '保存'
            }, 500)
          } else {
            that.$notify.warning({
              title: '提示',
              message: '当前版本不是最新版本，请先获取最新版本',
              duration: 1000
            })
          }
        })
      },
      // 弹出框提交
      submit() {
        if (this.radio !== '1') {
          this.dialogTableVisible = false
          insertProjectTaskChild(this.radio, this.$store.getters.onProject.project_id, user.state.usercode).then(r => {
            if (r.data.status === 'success') {
              this.getProjectInfo()
            }
            this.$notify({
              title: '提示',
              message: r.data.info,
              type: r.data.status,
              duration: 1000
            })
          })
        }
      },
      // 添加子计划
      handleAdd(index, item) {
        var that = this
        if (item.number.length === 5) {
          that.$alert('当前只支持添加3级目录', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
            }
          })
        } else {
          that.$refs.projectplandialog.openDialog('create', item, this.ISREVISE, index)
        }
      },
      // 删除
      handleDelete(index, item) {
        var that = this
        if (item.ref1 === '已完成' && that.reviewStatus === '通过') {
          that.$alert('已完成计划不允许修改', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
            }
          })
        } else {
          if (item.number.length === 1 || item.ref2 === 1) {
            that.$alert('1级目录及里程碑目录不允许删除', '警告', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
              }
            })
          } else {
            if (that.ISREVISE === 'YES') {
              var items = {}
              items.task_id = item.task_id
              items.id = item.id
              items.project_id = item.project_id
              items.update_by = user.state.usercode
              items.parent = item.parent
              items.number = item.number
              if (items.task_id) {
                that.deleteDatas.push(items)
              } else {
                that.addDatas.forEach(function(item, index) {
                  if (item.number.indexOf(item.number) !== -1) {
                    that.addDatas.splice(index, 1)
                  }
                })
              }
              that.tableData.splice(index, 1)
            } else {
              items = {}
              items = { items: { task_id: item.task_id, id: item.id, project_id: item.project_id, update_by: user.state.usercode, number: item.number, parent: item.parent }}
              deleteBySelective(items).then(r => {
                that.$notify({
                  title: '提示',
                  message: r.data.info,
                  type: r.data.status,
                  duration: 2000
                })
                that.getProjectInfo()
              })
            }
          }
        }
      },
      // 双击修改
      rowdblclick(row, column, index) {
        var that = this
        if (row.ref1 === '已完成' && that.reviewStatus === '通过') {
          that.$alert('已完成计划不允许修改', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
            }
          })
        } else {
          if (that.planStatus === '保存') {
            that.$refs.projectplandialog.openDialog('update', row, that.ISREVISE, '')
          }
        }
      },
      // 保存
      saveData() {
        var that = this
        that.ISSAVE = 'YES'
        that.submitLoading = true
        if (that.ISREVISE === 'YES') {
          var temp = {}
          temp.add = that.addDatas
          temp.delete = that.deleteDatas
          temp.update = that.updateDatas
          temp.projectId = that.$store.getters.onProject.project_id
          temp.createBy = user.state.usercode
          temp.version = that.version
          if (temp.add.length === 0 && temp.delete.length === 0 && temp.update.length === 0) {
            setTimeout(r => {
              that.$notify({
                title: '提示',
                message: '当前无计划内容修改',
                type: 'warning',
                duration: 1000
              })
            }, 500)
            that.getProjectInfo()
            that.ISREVISE = 'NO'
            that.planStatus = '提交'
            that.ISSAVE = 'NO'
          } else {
            revisionProjectTask(temp).then(r => {
              console.log('revisionProjectTask', r)
              this.$notify({
                title: '提示',
                message: r.data.info,
                type: r.data.status,
                duration: 1000
              })
              if (r.data.status === 'success') {
                that.getProjectInfo()
                setTimeout(function() {
                  var temp = {}
                  temp.operation_status = '保存'
                  temp.audit_status = '未审核'
                  temp.project_id = that.$store.getters.onProject.project_id
                  temp.why = ''
                  temp.version = that.version
                  temp.update_by = user.state.usercode
                  that.updateTaskStatus(temp, function(status) {
                    if (status === 'success') {
                      that.ISREVISE = 'NO'
                    }
                  })
                }, 1000)
              }
            })
          }
        }
        that.submitLoading = false
      },
      // 提交
      submitData() {
        var that = this
        var flag = false
        for (const i in that.tableData) {
          if (!that.tableData[i].end_date || !that.tableData[i].end_date) {
            flag = true
            break
          }
        }
        if (flag) {
          that.$notify({
            title: '提示',
            message: '请填写计划时间',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (that.ISSAVE === 'YES') {
            // 更新计划状态表数据
            var temp = {}
            temp.operation_status = '提交'
            temp.audit_status = '未审核'
            temp.project_id = that.$store.getters.onProject.project_id
            temp.why = ''
            temp.version = that.version
            temp.update_by = user.state.usercode
            that.updateTaskStatus(temp, function(status) {
              if (status === 'success') {
                that.ISSAVE = 'NO'
                that.planStatus = '保存'
                that.getProjectInfo()
              }
            })
          } else {
            that.$notify({
              title: '提示',
              message: '请先保存',
              type: 'info',
              duration: 2000
            })
          }
        }
      },
      // 审核
      review() {
        this.reviewDialogVisible = true
      },
      // 拒绝
      reject() {
        var that = this
        var temp = {}
        temp.operation_status = '保存'
        temp.audit_status = '驳回'
        temp.project_id = that.$store.getters.onProject.project_id
        temp.why = this.reviewTextarea
        temp.version = that.version
        temp.update_by = user.state.usercode
        that.updateTaskStatus(temp, function(status) {
          if (status === 'success') {
            that.reviewDialogVisible = false
            that.getProjectInfo()
          }
        })
      },
      // 同意
      agree() {
        var that = this
        var temp = {}
        temp.operation_status = '提交'
        temp.audit_status = '通过'
        temp.project_id = that.$store.getters.onProject.project_id
        temp.why = this.reviewTextarea
        temp.version = that.version
        temp.update_by = user.state.usercode
        that.updateTaskStatus(temp, function(status) {
          if (status === 'success') {
            that.reviewDialogVisible = false
            that.getProjectInfo()
          }
        })
      },
      // 更新计划状态表数据
      updateTaskStatus(temp, callback) {
        updateTaskStatus(temp).then(r => {
          callback(r.data.status)
          this.$notify({
            title: '提示',
            message: r.data.info,
            type: r.data.status,
            duration: 2000
          })
        })
      },
      // 版本追溯
      versionCheck() {
        this.versionDialogVisible = true
        taskVersionList(this.$store.getters.onProject.project_id).then(r => {
          console.log('taskVersionList', r)
          this.versionData = r.data.model
        })
      },
      // 选择器
      change() {
      },
      versionChose(row) {
        setTimeout(r => {
          this.versionDialogVisible = false
        }, 500)
        if (this.version === 1) {
          this.getProjectInfo()
        } else {
          this.why = row.why ? row.why : '无审核意见'
          this.reviewStatus = row.audit_status
          this.planStatus = row.operation_status
          this.version = row.version
          this.vsersions = '当前版本:' + this.version
          var temp = {}
          temp.project_id = this.$store.getters.onProject.project_id
          temp.version = this.version
          selectTaskVersion(temp).then(r => {
            console.log('selectTaskVersion', r)
            if (r.status === 200) {
              this.tableData = r.data.model
            } else {
              this.getProjectInfo()
            }
          })
        }
      },
      // 接受子组件传值
      returnByChild(data, type, index, callback) {
        var that = this
        if (type === 'update') {
          if (data.task_id) {
            that.tableData.forEach(function(item, index) {
              if (item.task_id === data.task_id) {
                that.tableData.splice(index, 1, data)
              }
            })
            that.updateDatas.push(data)
            that.updateDatas.forEach(function(item, index) {
              if (item.task_id === data.task_id) {
                that.updateDatas.splice(index, 1, data)
              }
            })
          } else {
            that.tableData.forEach(function(item, index) {
              if (item.number.indexOf(data.number) !== -1) {
                that.tableData.splice(index, 1, data)
              }
            })
            that.addDatas.forEach(function(item, index) {
              if (item.number.indexOf(data.number) !== -1) {
                that.addDatas.splice(index, 1, data)
              }
            })
          }
        } else if (type === 'create') {
          var num = 0
          that.tableData.forEach(function(item, index) {
            if (item.parent.indexOf(data.parent) !== -1) {
              num += 1
            }
          })
          var number = data.number
          data.number = data.number + (num + 1)
          if (that.tableData[index + num].number === data.number) {
            data.number = number + (num + 2)
          }
          that.addDatas.push(data)
          that.tableData.splice(index + num + 1, 0, data)
        }
        setTimeout(() => {
          callback()
        }, 500)
      },
      // 行表样式
      changeStyle(row) {
        if (row.row.number.length === 1) {
          return { 'background-color': '#E0FFFF', 'height': '28px' }
        } else if (row.row.number.length > 1 && row.row.number.length <= 3) {
          return { 'height': '28px' }
        } else if (row.row.number.length > 4) {
          return { 'height': '28px' }
        }
      },
      // 头表样式
      headerClass(row, rowIndex) {
        return { 'height': '38px' }
      },
      headerStyle() {
        return { 'background-color': '#E0FFFF', 'color': '#545454' }
      }
    },
    watch: {
      '$store.getters.onProject': function(newVal, oldVal) {
        this.tableData = []
        this.getProjectInfo()
      },
      'tableData': function(newVal, oldVal) {
        var that = this
        var flag = false
        for (const i in that.tableData) {
          if (!that.tableData[i].end_date || !that.tableData[i].end_date) {
            flag = true
            break
          }
        }
        if (flag) {
          that.IFSWITCH = false
        } else {
          that.IFSWITCH = true
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
  .el-table .warning-row {
    background: #E0FFFF;
    height: 28px;
  }

  .el-table .success-row {
    height: 28px;
  }
</style>
