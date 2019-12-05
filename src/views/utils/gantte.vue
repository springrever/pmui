<template>
   <div ref="gantt" style='height: 82vh;width:100%;'></div>
</template>

<script>
  /* eslint-disable */
  import 'dhtmlx-gantt'
  import user from '@/store/modules/user'
  import { project_taskInsert, project_taskUpdateBySelective, deleteBySelective, project_taskQuery, listProjectTask } from '@/api/project_task'
  import { selectTaskVersion } from '@/api/project_plan_list'
  import '../../../node_modules/dhtmlx-gantt/codebase/sources/locale/locale_cn.js'
  import '../../../node_modules/dhtmlx-gantt/codebase/sources/ext/dhtmlxgantt_marker.js'
  export default {
    name: 'gantt',
    data() {
      return {
        opts: [
          { key: '未开始', label: '未开始' },
          { key: '开发中', label: '开发中' },
          { key: '已完成', label: '已完成' }
        ],
        planData: {
          data:[],
          links:[]
        }
      }
    },
    props: {
      tasks: {
        type: Object,
        default() {
          return { data: [], links: [] }
        }
      },
      ganttType: {
        type: Number,
        default() {
          return 1
        }
      },
      projectId: {
        type: String,
        default() {
          return ''
        }
      },
      readonly: {
        type: Boolean,
        default() {
          return true
        }
      },
      fetchData:  Function,
      version: {
        type: Number,
        default() {
          return 1
        }
      }
    },
    // props: ['ganttType', 'tasks', 'projectId', 'readonly', 'test' ],
    watch: {
      ganttType(newValue, oldValue) {
        this.initDateType()
        // this.loadingData()
      }
    },
    activated: function(){
      // this.loadingData()
    },
    methods:{
      mixinSave(t, e, i) {
        console.log(e)
        return t;
      },
      updateDate(items, callback) {
        project_taskUpdateBySelective(items).then(callback)
      },
      insertDate(items, callback) {
        project_taskInsert(items).then(callback)
      },
      deleteDate(items, callback) {
        deleteBySelective(items).then(callback)
      },
      initDateType() {
        if(1==this.$props.ganttType){
          //年
          gantt.config.scale_unit = "year"; // 设置时间坐标轴单位 “minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
          gantt.config.step = 1; // 时间轴的X坐标值之间的间隔
          gantt.config.date_scale = "%Y";
        }else if(2==this.$props.ganttType){
          //月
          gantt.config.scale_unit = "year";
          gantt.config.date_scale = "%Y";

          gantt.config.scale_height = 50;

          gantt.config.subscales = [
            {unit:"month", step:1, date:"%F" }
          ];
        }else if(3==this.$props.ganttType){
          //日
          gantt.config.scale_unit = "month";
          gantt.config.date_scale = "%F, %Y";

          gantt.config.scale_height = 50;
          gantt.config.subscales = [
            {unit:"day", step:1, date:"%j" }
          ];
          gantt.config.min_column_width = 20;
        }else if(4==this.$props.ganttType){
          //周
          var weekScaleTemplate = function(date){
            var dateToStr = gantt.date.date_to_str("%d %M");
            var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
          };

          gantt.config.scale_unit = "week";
          gantt.config.step = 1;
          gantt.templates.date_scale = weekScaleTemplate;
          gantt.config.subscales = [
            {unit:"day", step:1, date:"%D" }
          ];
          gantt.config.min_column_width = 20;
          gantt.config.scale_height = 50;
        }
      },
      initConfigs(){
        // 添加保存事件
        var that = this
        gantt.config.drag_move = false
        gantt.config.drag_resize = false;
        gantt.config.readonly = that.$props.readonly

        // 添加删除事件
        gantt.attachEvent("onBeforeTaskDelete", function (id,e) {
          console.log('e:', e)
          that.deleteDate({items:{id_eq: e.id}}, function (r) {
            if (r.data.status === 'success') {
              that.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              gantt.hideLightbox()
            } else {
              that.$notify({
                title: '失败',
                message: '删除失败',
                type: 'error',
                duration: 2000
              })
            }

          })
        })

        gantt.attachEvent("onLightboxSave", function(id, e) {
          if (e.progress.length === 0) {
            that.$notify({
              title: '警告',
              message: '请填写项目完成进度',
              type: 'warning',
              duration: 2000
            })
          } else {
            var model = {}
            model.id = e.id
            model.text = e.text
            model.start_date = e.start_date
            model.duration = e.duration
            model.ref1 = e.ref1
            model.parent = e.parent
            if (e.progress.indexOf('%') === -1) {
              model.progress = e.progress + '%'
            } else {
              model.progress = e.progress
            }
            model.project_id = that.$store.getters.onProject.project_id

            // 判断是否为新增的数据
            if(!e.$new) {
              model.update_by = user.state.usercode
              that.updateDate({model: model}, function (r) {
                if(r.data.status === 'success'){
                  that.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                  var task = gantt.addTask({
                    id: e.id,
                    text: e.text,
                    start_date: e.start_date,
                    duration: e.duration,
                    ref1: e.ref1,
                    progress: e.progress,
                    parent: e.parent
                  });
//                  gantt.refreshTask(e.id)
                  gantt.hideLightbox()
                } else {
                  that.$notify({
                    title: '失败',
                    message: '修改失败',
                    type: 'error',
                    duration: 2000
                  })
                }
              })
              gantt.hideLightbox()
            } else {
              model.create_by = user.state.usercode
              that.insertDate({model: model}, function (r) {
                if (r.data.status === 'success'){
                  that.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 2000
                  })
                  var task = gantt.addTask({
                    id: e.id,
                    text: e.text,
                    start_date: e.start_date,
                    duration: e.duration,
                    ref1: e.ref1,
                    progress: e.progress,
                    parent: e.parent
                  });
//                  gantt.refreshTask(e.id)
                  gantt.hideLightbox()
                } else {
                  that.$notify({
                    title: '失败',
                    message: '保存失败',
                    type: 'error',
                    duration: 2000
                  })
                }
              })
            }
          }
        });
        // 设置弹窗框属性
        gantt.config.lightbox.sections = [
          {name:"description", height:58, map_to:"text", type:"textarea", focus:true},
          {name:"ref1",    height:32, map_to:"ref1", type:"select", options:this.opts, focus:true},
          {name:"progress",    height:28, map_to:"progress", type:"textarea", focus:true},
          {name:"time",        height:72, map_to:"auto", type:"duration"}
        ];
        gantt.locale.labels.section_ref1 = "计划状态";
        gantt.locale.labels.section_progress = "完成进度";
        console.log('.ganttType', this.$props)

        // 设置日期格式
        gantt.config.xml_date = "%Y-%m-%d %H:%i";

        // 标记当天
        var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
        var today = new Date();
        gantt.addMarker({
          start_date: today,
          css: "today",
          text: "今天",
          title:"Today: "+ date_to_str(today)
        });

        gantt.config.work_time = true;
        gantt.config.skip_off_time = true;
        gantt.config.correct_work_time = true;

        gantt.config.columns = [
          {name: "text", label: "任务名", tree: true, width: '*'},
          {name: "start_date", label: "开始时间",align: 'center', width: '80'},
          {name: "duration", label: "持续时间",align: 'center', width: '80', template: function (item) {
              if (item.text === '项目看板界面'){
                return item.duration;
              }
            return item.duration + 1;
          }}
        ];

        gantt.init(this.$refs.gantt)
      },
      loadingData() {
        gantt.clearAll()
        gantt.parse(this.$props.tasks)
      }
    },
    mounted: function() {
      this.initConfigs()
      this.initDateType()
      // this.loadingData()
    },
    beforeCreate() {
    },
    created() {
      var that = this
      if (that.version === 1) {
        var searchItems = { page: {}, items: {}}
        if (that.$store.getters.onProject.project_id) {
          searchItems.items.project_id_eq = that.$store.getters.onProject.project_id
          listProjectTask(searchItems).then(r => {
            that.planData.data = r.data.list
            gantt.clearAll()
            gantt.parse(that.planData)
          })
        }
      } else {
        var temp = {}
        temp.project_id = that.$store.getters.onProject.project_id
        temp.version = that.version
        selectTaskVersion(temp).then(r => {
          if (r.status === 200) {
            that.planData.data = r.data.model
            gantt.clearAll()
            gantt.parse(that.planData)
          }
        })
      }
    },
    beforeMount() {
    }
  }
</script>
<style>
  /* eslint-disable */
  @import '../../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css';
</style>


