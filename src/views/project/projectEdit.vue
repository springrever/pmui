<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" style="height: 20px">
            <span>项目详情</span>
            <el-dropdown @command="handleCommand" style="float: right;margin-top: 2px;padding-left: 3px">
            <span class="el-dropdown-link" style="color: #2299dd">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="projectUser">项目人员</el-dropdown-item>
                <!--<el-dropdown-item command="projectPlanList">项目计划</el-dropdown-item>-->
                <el-dropdown-item command="projectPlanList">项目计划列表</el-dropdown-item>
                <!--<el-dropdown-item command="projectBudget">项目预算</el-dropdown-item>-->
                <!--<el-dropdown-item command="demandProjectedit">项目看板</el-dropdown-item>-->
                <el-dropdown-item command="projectBoard">项目综合看板</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button @click="closePage()" style="float: right;color: red; padding: 3px 3px" type="text">返回</el-button>
            <el-button v-if="false" @click="toAproved" style="float: right;padding: 3px 3px" type="text">审批</el-button>
          </div>
          <el-form class="demo-form-inline" :inline="true" ref="form" size="mini" :model="form" label-width="120px">
            <el-form-item label="立项单编号:">
              <el-input disabled="true" class="elInput" v-model="form.project_code"></el-input>
            </el-form-item>
            <el-form-item label="立项单名称:">
                <el-input disabled="true" class="elInput" v-model="form.project_name"></el-input>
            </el-form-item>
            <el-form-item label="项目状态:">
                <el-input disabled="true" class="elInput" v-model="form.project_type"></el-input>
            </el-form-item>
            <el-form-item label="项目阶段:" v-if="false">
                <el-input disabled="true" class="elInput" v-model="form.project_type"></el-input>
            </el-form-item>
            <el-form-item label="项目预算:">
              <el-input disabled="true" class="elInput" v-model="form.ref2"></el-input>
            </el-form-item>
            <el-form-item label="项目时间:">
              <el-input disabled="true" class="elInput" v-model="form.ref3"></el-input>
            </el-form-item>
            <el-form-item label="制单人:">
                <el-input disabled="true" class="elInput" v-model="form.createName"></el-input>
            </el-form-item>
            <el-form-item label="项目经理:">
                <el-input disabled="true" class="elInput" v-model="form.ref5Name"></el-input>
            </el-form-item>
            <el-form-item label="项目组织:">
                <el-input disabled="true" class="elInput" v-model="ref4"></el-input>
            </el-form-item>
            <el-form-item label="主要承担部门:">
              <el-input disabled="true" class="elInput" v-model="form.main_deptName"></el-input>
              <!--<deptSelect ref="mainDeptSelect" v-model="form.mian_dept"></deptSelect>-->
            </el-form-item>
            <el-form-item label="计划日期:">
              <el-date-picker
                size="mini"
                :disabled="true"
                v-model="form.plan_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-row type="flex" class="row-bg" style="">
              <el-col :span="24">
                <el-form-item label="项目描述">
                  <el-input :disabled="true" :rows="3" :cols="80" type="textarea" v-model="form.project_desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <demand-project-dialog ref="projectUser" :projectId="projectId" :showNewPM="showNewPM"></demand-project-dialog>
  </div>
</template>
<script>
  import { demand_projectfindById, demand_projectToAproved } from '@/api/demand_project'
  import { demand_usersQuery } from '@/api/demand_users'
  import deptSelect from '@/components/SelectUtil/dept'
  import DemandProjectDialog from '../customDialog/demandProjectDialog'
  export default {
    components: {
      DemandProjectDialog,
      deptSelect },
    name: 'projectedit',
    mounted() {
    },
    directives: {
    },
    data() {
      return {
        form: { },
        XiangMujingli: '',
        downValue: '项目人员',
        showNewPM: false,
        plan_time: ''
      }
    },
    activated: function() {
      this.showNewPM = false
      this.getProInfo()
      this.getXiangMujingli(this.$store.getters.onProject.project_id)
    },
    methods: {
      toAproved() {
        var items = Object.assign({}, this.form)
        items.mian_dept = null
        items.plan_time = null
        demand_projectToAproved({ model: items }).then(r => {
          this.$notify({
            title: '消息',
            message: r.data.info,
            type: r.data.state,
            duration: 2000
          })
          this.closePage()
        })
      },
      getProInfo() {
        if (this.$store.getters.onProject === 'null') {
          this.$store.commit('SET_SHOWPROJECT', false)
          this.$router.replace({ name: 'demendProjectIndex', params: {
            type: 'projectPlan'
          }})
          return
        }
        if (this.$store.getters.onProject.project_id) {
          demand_projectfindById(this.$store.getters.onProject.project_id).then(r => {
            this.form = r.data.model
            this.form.plan_time = []
            this.form.plan_time[0] = r.data.model.plan_date_from
            this.form.plan_time[1] = r.data.model.plan_date_to
          })
        }
      },
      handleCommand(path) {
        if (path === 'projectUser') {
          this.openProUserDialog()
        } else {
          this.$router.push({ name: path, params: {
            id: this.$store.getters.onProject.project_id,
            type: '编辑'
          }})
        }
      },
      openProUserDialog() {
        this.showNewPM = true
        this.projectId = this.$store.getters.onProject.project_id
        this.$refs.projectUser.restData(this.$store.getters.onProject.project_id, this.$store.getters.onProject.ref6)
      },
      closePage() {
        this.$router.replace('/project/demendProjectIndex')
      },
      getXiangMujingli(project_id) {
        var seachItems = { items: {}, page: {}}
        seachItems.items.project_id_eq = project_id
        seachItems.items.userType_eq = '项目经理'
        demand_usersQuery(seachItems).then(r => {
          var str = ''
          r.data.list.forEach(function(r, index) {
            str = str + r.userName + ','
          })
          this.XiangMujingli = str
        })
      }
    },
    watch: {
      '$store.getters.onProject': function(newVal, oldVal) {
        this.showNewPM = false
        this.getProInfo()
        this.getXiangMujingli(this.$store.getters.onProject.project_id)
      }
    }
  }
</script>
<style scoped>
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
  .v-modal{
    width: 0px !important;
    opacity: 0;
  }
</style>
