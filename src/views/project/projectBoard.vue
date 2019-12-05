/**
* Created by yaoyuan on 2019/8/27.
*/
<template>
  <div class="app-container" style="background-color: #F5F5F5;padding: 10px">
    <el-card style="padding: 0px">
      <el-row :gutter="30">
        <el-col :span="4">
          <div style="text-align: center"><span>等待启动</span>
          </div>
          <div style="margin-top: 10px" v-for="(item, index) in WaitingListData" :key="index">
            <el-card shadow="hover" @click.native="change(item)">
              <el-row :gutter="20">
                <el-col :span="0">
                  <div style="margin-top: -20px;margin-left: -20px;">
                    <img src="../../assets/img/pointBlue.png" class="img-yy"/>
                    <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png"/>
                    <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png"/>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div style="margin-top: -16px;margin-left: 0px;">
                    <span style="font-size: small;font-weight: bold;">{{item.projectCode}}</span>
                  </div>
                  <img src="../../assets/img/pointBlue.png" class="img-yy"/>
                  <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png" class="img-yy"/>
                  <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png" class="img-yy"/>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div style="text-align: center">
                    <span style="font-size: small;font-weight: bold">{{item.projectName}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <!--<el-row :gutter="20">
                <el-col :span="3">
                  <div style="text-align: center">
                    <span style="font-size: small">{{item.progress}}</span>
                  </div>
                </el-col>
                <el-col :span="15">
                  <div style="height: 1px">
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="text-align: center">
                    <span style="font-size: small">Delay{{item.day}}</span>
                  </div>
                </el-col>
              </el-row>-->
              <el-row :gutter="20">
                <el-col :span="8">
                  <div style="text-align: left">
                    <span style="font-size: x-small">{{item.managerName}}</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div style="text-align: right;float: right">
                    <span style="font-size: x-small">{{item.templateName}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="text-align: center"><span>项目准备</span>
          </div>
          <div style="margin-top: 10px" v-for="(item, index) in startListData" :key="index">
            <el-card shadow="hover" @click.native="change(item)">
              <el-row :gutter="20">
                <el-col :span="0">
                  <div style="margin-top: -20px;margin-left: -20px;">
                    <img src="../../assets/img/pointBlue.png"/>
                    <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png"/>
                    <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png"/>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div style="margin-top: -16px;margin-left: 0px;">
                    <span style="font-size: small;font-weight: bold">{{item.projectCode}}</span>
                  </div>
                  <img src="../../assets/img/pointBlue.png" class="img-yy"/>
                  <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png" class="img-yy"/>
                  <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png" class="img-yy"/>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div style="text-align: center">
                    <span style="font-size: small;font-weight: bold">{{item.projectName}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="3">
                  <div style="text-align: center">
                    <span style="font-size: small">{{item.progress}}</span>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div style="height: 1px">
                  </div>
                </el-col>
                <el-col :span="10">
                  <div style="text-align: center">
                    <span style="font-size: small">Delay{{item.day}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="7">
                  <div style="text-align: left">
                    <span style="font-size: x-small">{{item.managerName}}</span>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div style="text-align: right;float: right">
                    <span style="font-size: x-small">{{item.templateName}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="text-align: center"><span>项目蓝图</span>
          </div>
          <div style="margin-top: 10px" v-for="(item, index) in blueprintListData" :key="index">
            <el-card shadow="hover" @click.native="change(item)">
              <el-row :gutter="20">
                <el-col :span="0">
                  <div style="margin-top: -20px;margin-left: -20px;">
                    <img src="../../assets/img/pointBlue.png"/>
                    <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png"/>
                    <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png"/>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div style="margin-top: -16px;margin-left: 0px;">
                    <span style="font-size: small;font-weight: bold">{{item.projectCode}}</span>
                  </div>
                  <img v-if="item.status === '正常' || item.status === '提前'" src="../../assets/img/pointBlue.png" class="img-yy"/>
                  <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png" class="img-yy"/>
                  <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png" class="img-yy"/>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div style="text-align: center">
                    <span style="font-size: small;font-weight: bold">{{item.projectName}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="3">
                  <div style="text-align: center">
                    <span style="font-size: small">{{item.progress}}</span>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div style="height: 1px">
                  </div>
                </el-col>
                <el-col :span="10">
                  <div style="text-align: center">
                    <span style="font-size: small">Delay{{item.day}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="7">
                  <div style="text-align: left">
                    <span style="font-size: x-small">{{item.managerName}}</span>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div style="text-align: right;float: right">
                    <span style="font-size: x-small">{{item.templateName}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="text-align: center"><span>系统搭建</span>
          </div>
          <div style="margin-top: 10px" v-for="(item, index) in structuresListData" :key="index">
            <el-card shadow="hover" @click.native="change(item)">
              <el-row :gutter="20">
                <el-col :span="0">
                  <div style="margin-top: -20px;margin-left: -20px;">
                    <img v-if="item.status === '正常' || item.status === '提前'"src="../../assets/img/pointBlue.png"/>
                    <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png"/>
                    <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png"/>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div style="margin-top: -16px;margin-left: 0px;">
                    <span style="font-size: small;font-weight: bold">{{item.projectCode}}</span>
                  </div>
                  <img v-if="item.status === '正常' || item.status === '提前'" src="../../assets/img/pointBlue.png" class="img-yy"/>
                  <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png" class="img-yy"/>
                  <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png" class="img-yy"/>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div style="text-align: center">
                    <span style="font-size: small;font-weight: bold">{{item.projectName}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="3">
                  <div style="text-align: center">
                    <span style="font-size: small">{{item.progress}}</span>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div style="height: 1px">
                  </div>
                </el-col>
                <el-col :span="10">
                  <div style="text-align: center">
                    <span style="font-size: small">Delay{{item.day}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div style="text-align: left">
                    <span style="font-size: x-small">{{item.managerName}}</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div style="text-align: right;float: right">
                    <span style="font-size: x-small">{{item.templateName}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="text-align: center"><span>系统上线</span>
          </div>
          <div style="margin-top: 10px" v-for="(item, index) in onlineListData" :key="index">
            <el-card shadow="hover" @click.native="change(item)">
              <el-row :gutter="20">
                <el-col :span="0">
                  <div style="margin-top: -20px;margin-left: -20px;">
                    <img v-if="item.status === '正常' || item.status === '提前'"src="../../assets/img/pointBlue.png"/>
                    <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png"/>
                    <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png"/>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div style="margin-top: -16px;margin-left: 0px;">
                    <span style="font-size: small;font-weight: bold">{{item.projectCode}}</span>
                  </div>
                  <img v-if="item.status === '正常' || item.status === '提前'" src="../../assets/img/pointBlue.png" class="img-yy"/>
                  <img v-if="item.status === '延迟'" src="../../assets/img/pointRed.png" class="img-yy"/>
                  <img v-if="item.status === '风险'" src="../../assets/img/pointYellow.png" class="img-yy"/>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div style="text-align: center">
                    <span style="font-size: small;font-weight: bold">{{item.projectName}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="3">
                  <div style="text-align: center">
                    <span style="font-size: small">{{item.progress}}</span>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div style="height: 1px">
                  </div>
                </el-col>
                <el-col :span="10">
                  <div style="text-align: center">
                    <span style="font-size: small">Delay{{item.day}}</span>
                  </div>
                </el-col>
              </el-row>
              <div style="height: 3px">
              </div>
              <el-row :gutter="20">
                <el-col :span="7">
                  <div style="text-align: left">
                    <span style="font-size: x-small">{{item.managerName}}</span>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div style="text-align: right;float: right">
                    <span style="font-size: x-small;">{{item.templateName}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import { WaitingList, onlineList, structuresList, blueprintList, startList } from '@/api/projectBoard'
  import { demand_projectfindById } from '@/api/demand_project'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol
    },
    name: 'projectBoard',
    mounted() {
      /* */
    },
    data() {
      return {
        submitLoading: false,
        currenLandmark: '上线确认',
        projectPlanStatus: '未开始',
        remainTime: '0',
        projectEndtime: '2018-09-24',
        landmarkEndtime: '2018-09-24',
        WaitingListData: [],
        onlineListData: [],
        structuresListData: [],
        blueprintListData: [],
        startListData: []
      }
    },
    activated: function() {
      this.$store.commit('SET_SHOWPROJECT', false)
      this.getWaitingList()
      this.getonlineList()
      this.getstructuresList()
      this.getblueprintList()
      this.getstartList()
    },
    methods: {
      getWaitingList() {
        var that = this
        WaitingList().then(function(r) {
          console.log('WaitingList', r)
          that.WaitingListData = r.data.model
        })
      },
      getonlineList() {
        var that = this
        onlineList().then(function(r) {
          console.log('onlineList', r)
          that.onlineListData = r.data.model
        })
      },
      getstructuresList() {
        var that = this
        structuresList().then(function(r) {
          console.log('structuresList', r)
          that.structuresListData = r.data.model
        })
      },
      getblueprintList() {
        var that = this
        blueprintList().then(function(r) {
          console.log('blueprintList', r)
          that.blueprintListData = r.data.model
        })
      },
      getstartList() {
        var that = this
        startList().then(function(r) {
          console.log('startList', r)
          that.startListData = r.data.model
        })
      },
      change(items) {
        var that = this
        demand_projectfindById(items.projectId).then(r => {
          console.log('demand_projectfindById', r)
          that.$store.commit('SET_ONPROJECT', r.data.model)
          that.$router.push({ name: 'projectEdit', params: {
            id: r.data.model.project_id,
            type: '编辑'
          }})
        })
      },
      getProjectInfo() {
      },
      changeEmergencyColor() {
        return '#FF4500'
      },
      submitData() {
        this.submitLoading = true
      },
      editData() {
        this.submitLoading = true
      }
    },
    watch: {
      '$store.getters.onProject': function(newVal, oldVal) {
        this.getProjectInfo()
      }
    }
  }
</script>
<style scoped="true">
  .img-yy {
    position: absolute;
    margin-top: -22px;
    margin-left: -22px
  }
</style>
