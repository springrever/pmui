
<template>
  <div class="app-container">
    <el-row style="padding-left: 10px">
      <!--{{$store.getters.onProject}}-->
      <!--<el-button type="primary" @click = "plusNewPM()">过滤</el-button>-->
    </el-row>
    <el-row >
      <el-col :span="8"  v-for="o in DemandProjectList" :key="o" style="padding: 10px;max-width: 400px">
        <el-card  shadow="hover"  :body-style="{ padding: '0px'}">
          <el-row >
            <el-col :span="5" >
              <img v-if="o.ref6 === '10' || o.ref6 === '7'|| o.ref6 === '11' || o.ref6 === '9'" src="../../assets/img/oa.png" class="imgcss">
              <img v-if="o.ref6 === '12'" src="../../assets/img/bi.png" class="imgcss">
              <img v-if="o.ref6 === '2'" src="../../assets/img/plm.png" class="imgcss">
              <img v-if="o.ref6 === '8'" src="../../assets/img/EBS.png" class="imgcss">
              <img v-if="o.ref6 === '14'" src="../../assets/img/Jira.png" class="imgcss">
              <img v-if="o.ref6 === '3'" src="../../assets/img/MES.png" class="imgcss">
              <img v-if="o.ref6 === '4'" src="../../assets/img/nc.png" class="imgcss">
              <img v-if="o.ref6 === '5'" src="../../assets/img/pm.png" class="imgcss">
              <img v-if="o.ref6 === '15'" src="../../assets/img/EDI.png" class="imgcss">
              <img v-if="o.ref6 === '17'" src="../../assets/img/qita.png" class="imgcss">
            </el-col>
            <el-col :span="19" >
              <div id="div1" style=" padding: 8px;height: 100px;width: 100%" >
                <el-row style="padding-left: 24px">
                  <el-col :span="24"><a @click="cardClick(o)" style="font-size: 18px">{{o.project_name}}</a></el-col>
                </el-row>
                <el-row class="projectInfo">
                  <div class="projectDisInfo">
                    <el-row>
                      <el-col :span="16">
                        {{o.project_desc}}
                      </el-col>
                      <el-col :span="4">
                        <el-row class="DisIcon">
                          <el-col :span="24">
                            <i @click="openMan(o,o.project_id,o.ref6)" style="font-size: 28px" class="el-icon-phone"></i>
                          </el-col>
                          <el-col :span="24">
                            成员
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="0">
                        <el-row class="DisIcon">
                          <el-col :span="24">
                            <i style="font-size: 28px" class="el-icon-circle-close" @click="handleDelete(o.project_id)"></i>
                          </el-col>
                          <el-col :span="24">
                            删除
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>

                  </div>
                  <el-row style="padding: 10px 0px 0px 24px;">
                    <el-col :span="24">
                      <span>主要承担部门: {{o.main_deptName}}</span>
                    </el-col>
                  </el-row>
                  <el-row style="padding: 10px 0px 0px 24px;">
                    <el-col :span="24">
                      <span>计划日期: {{o.plan_date_from}} 至 {{o.plan_date_to}}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </el-col>
            <el-col :span="0">
              <!--<img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" style="padding: 8px; display: block;width: 100%;height: 120px">-->
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--<demandProjectDialog ref="myChild" :projectId="projectId" :showNewPM="showNewPM"></demandProjectDialog>-->
    <demand-project-dialog ref="myChild" :projectId="projectId" :showNewPM="showNewPM"></demand-project-dialog>
  </div>
</template>


<script>
  import { demand_projectQuery, deleteBySelective } from '@/api/demand_project'
  import waves from '@/directive/waves' // 水波纹指令
  import DemandProjectDialog from '../customDialog/demandProjectDialog'
  import user from '@/store/modules/user'
  export default {
    components: {
      DemandProjectDialog
    },
    name: 'projectIndex',
    filters: {
    },
    directives: {
      // 来自新世界
      waves
    },
    data() {
      return {
        DemandProjectList: [],
        showNewPM: false,
        activeName: 'first',
        projectId: '',
        from: '',
        userRole: {}
      }
    },
    activated() {
      this.getUserInfo()
      this.getDemand_project()
      this.from = this.$route.params.from
      this.showNewPM = false
    },
    created() {
    },
    methods: {
      openMan(items, project_id, ref6) {
        this.showNewPM = true
        this.projectId = project_id
        this.$store.commit('SET_ONPROJECT', items)
        this.$store.commit('SET_SHOWPROJECT', true)
        this.$refs.myChild.restData(project_id, ref6)
      },
      getUserInfo() {
        var userRole = {}
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        this.userRole = userRole
      },
      getDemand_project() {
        var seachItems = {}
        // 判断当前登录人是不是属于系统管理员和项目经理
        if (!this.userRole['admin'] && !this.userRole['manager']) {
          seachItems = { page: {}, items: {}, userCode: user.state.usercode }
        } else {
          seachItems = { page: {}, items: {}}
        }
        demand_projectQuery(seachItems).then(r => {
          this.DemandProjectList = r.data.list
          if (this.DemandProjectList.length === 0) {
            this.$store.commit('SET_SHOWPROJECT', false)
            this.$alert('当前无可操作项目，请移至需求管理提交需求', '警告', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                this.$router.replace({ name: 'requirements' })
              }
            })
          }
        })
      },
      cardClick(items) {
        console.log('items', items)
        var that = this
        that.$store.commit('SET_ONPROJECT', items)
        that.$store.commit('SET_SHOWPROJECT', true)
        if (that.from && that.from === 'projectBudget') {
          that.$router.push({ name: 'projectBudget', params: {
            id: items.project_id,
            type: '编辑'
          }})
        } else if (that.from && that.from === 'projectPlan') {
          that.$router.push({ name: 'projectPlan', params: {
            id: items.project_id,
            type: '编辑'
          }})
        } else if (that.from && that.from === 'projectPlanList') {
          that.$router.push({ name: 'projectPlanList', params: {
            id: items.project_id,
            type: '编辑'
          }})
        } else if (that.from && that.from === 'projectSchedule') {
          that.$router.push({ name: 'projectSchedule', params: {
            id: items.project_id,
            type: '编辑'
          }})
        } else if (that.from && that.from === 'demandProjectedit') {
          that.$router.push({ name: 'demandProjectedit', params: {
            id: items.project_id,
            type: '新增'
          }})
        } else if (that.from && that.from === 'demandProjectEdit') {
          that.$router.push({ name: 'demandProjectEdit', params: {
            id: items.project_id,
            type: '新增'
          }})
        } else {
          that.$router.push({ name: 'projectEdit', params: {
            id: items.project_id,
            type: '编辑'
          }})
        }
      },
      handleDelete(id) {
        deleteBySelective({ items: { 'project_id_eq': id }}).then(r => {
          this.getDemand_project()
          this.$notify({
            title: '消息',
            message: r.data.info,
            type: r.data.state,
            duration: 2000
          })
        })
      }
    }
  }
</script>
<style >
  .imgcss{
    height: 80px;
    width: 80px;
    margin: 15px;
    margin-left: 8px;
  }
  .projectInfo{
    position: relative;
    color: #909399;
    font-size: 14px;
  }
  .projectDisInfo{
    padding: 10px 0px 0px 24px;
    width: 100%;
    height: 200px;
    display: none;
  }
  .DisIcon{
  }
  .DisIcon:hover{
    color: #00AEEF;
  }
  .projectInfo:hover .projectDisInfo{
    background-color: white;
    position:absolute;
    display: block;
    left: 0px;
    top: 0px;
    z-index: 99;
  }
</style>
