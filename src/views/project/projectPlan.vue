
<template>
  <div class="app-container">
    <!--<el-row style="padding-bottom: 10px;margin-left: 20px;margin-top: -10px">-->
      <!--<el-col :span="21">-->
        <!--<el-upload-->
          <!--ref="upload"-->
          <!--:action="action"-->
          <!--:headers="heard"-->
          <!--:before-upload="handleFormatError"-->
          <!--:data="datas"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleSuccess"-->
          <!--:on-error="handleError"-->
          <!--enctype="multipart/form-data"-->
          <!--:format ="['xlsx','xls']">-->
          <!--<el-button type="primary" size="mini" icon="ios-cloud-upload-outline">项目计划导入</el-button>-->
        <!--</el-upload>-->
      <!--</el-col>-->
      <!--<el-col :span="3">-->
        <!--<div style="height: 1px"></div>-->
        <!--<el-switch-->
          <!--style="margin-top: 5px"-->
          <!--v-model="value1"-->
          <!--:change="change()"-->
          <!--active-text="甘特图"-->
          <!--inactive-text="计划列表">-->
        <!--</el-switch>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <projectplanlist v-if="value1" style="margin: -20px" ref="myPlanList" :getPlan="getPlan"></projectplanlist>
    <gantt ref="myGantte" class="left-container"
           :readonly="gantteReadonly"
           :projectId="$route.params.id"
           :ganttType="ganttType"
           :fetchData="fetchData"
           :tasks="tasks"></gantt>
  </div>
</template>
<script>
  /* eslint-disable */
  import Gantt from '../utils/gantte.vue'
  import { project_taskQuery } from '@/api/project_task'
  import Projectplanlist from './projectPlanList2'
  import Cookies from 'js-cookie'
  export default {
    components: {
      Projectplanlist,
      Gantt
    },
    name: 'projectPlan',
    filters: {
    },
    data() {
      return {
        tasks: {
          data:[],
          links:[]
        },
        ganttType: 3,
        seachItems: {page: {}, items: {}},
        gantteReadonly: false,
        value1: false,
        heard: '',
        datas: {},
        action: ''
      }
    },
    mounted() {
      //this.getPlan()
    },
    created() {
      this.initHualuen()
    },
    activated: function() {
      this.value1 = false
      var token = Cookies.get('User-Token')
      this.heard = { 'authorization': 'LAP ' + token }
      this.action = process.env.API_BASEURL + '/project_task/importProjectTask'
      this.datas = {
        'projectId': this.$store.getters.onProject.project_id,
        'createBy': this.$store.getters.onProject.create_by
      }
      if (this.$store.getters.onProject === 'null') {
        this.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
            this.$router.replace({ name: 'demendProjectIndex', params: {
                type: 'projectPlan',
                from: 'projectPlan'
              }})
          }
        })
      } else {
        this.fetchData()
      }
    },
    methods: {
      change(){
//          if (!this.value1) {
//            console.log('xoxo', this.$refs.myPlanList)
//          }
      },
      initHualuen() {
//        if (window.addEventListener){
//          window.addEventListener('DOMMouseScroll', this.wheel, false);
//        }
//        window.onmousewheel = document.onmousewheel = this.wheel; // W3C
      },
      fetchData() {
        this.getPlan()
      },
      wheel(event){
        var delta = 0;
        if (!event) event = window.event
        if (event.wheelDelta) { // IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
          delta = event.wheelDelta/120
          if (window.opera) delta = -delta // 因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        } else if (event.detail) { // FF浏览器使用的是detail,其值为“正负3”
          delta = -event.detail/3;
        }
        if (delta)
          this.handle(delta);
      },
      handle(delta) {
        if (delta <0){ // 向下滚动
          if(this.ganttType>1)
          this.ganttType -= 0.5
          console.log('x', this.ganttType)
        }else{ // 向上滚动
          if(this.ganttType<4)
          this.ganttType += 0.5
          console.log('s', this.ganttType)
        }
      },
      getPlan() {
        if(this.$store.getters.onProject === 'null'){
          this.$store.commit('SET_SHOWPROJECT', false)
          this.$router.replace({ name: 'demendProjectIndex', params: {
            type: 'projectPlan',
            from: 'projectPlan'
          }})
        } else if (this.$store.getters.onProject.project_id) {
          this.seachItems.items.project_id = this.$store.getters.onProject.project_id
          project_taskQuery(this.seachItems).then(r => {
            this.tasks.data = r.data.list
            this.$refs.myGantte.loadingData()
          })
        }
      },
      //  项目计划模板导入
      handleFormatError(file) {
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$notify.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
          })
          return false
        }
      },
      handleSuccess(res, file) {
        this.getPlan()
        this.$notify({
          tittle: '提示',
          desc: res.data.info,
          type: res.data.state
        })
      },
      handleError(file, flist) {
        this.$notify.warning({
          tittle: '提示',
          desc: '导入失败',
        })
      }
    }
  }
</script>
<style type="text/css" media="screen">

  html, body{
    margin:0px;
    padding:0px;
    height:100%;
    overflow:hidden;
  }
</style>
