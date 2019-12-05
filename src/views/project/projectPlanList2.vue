<template>
  <div class="app-container">
    <el-card>
    <tree-table :data="dataList" :columns="columns" border>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button-group>
          <el-button size="mini"  @click="handleCreate(scope.row)"   icon="el-icon-plus">新增</el-button>
          <el-button size="mini" @click="handleUpdate(scope.row)"   icon="el-icon-edit">修改</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </tree-table>
    </el-card>
    <ProjectPlanDialog :restData="getDataList" ref="upData"></ProjectPlanDialog>
  </div>
</template>

<script>
  import treeTable from '@/components/TreeTable'
  import { queryAndChildren } from '@/api/project_task'
  import dragDialog from '@/directive/el-dragDialog'
  import ProjectPlanDialog from '@/components/ProjectPlan/index'
  export default {
    name: 'projectplanlist',
    components: { treeTable, ProjectPlanDialog },
    props: ['getPlan'],
    directives: {
      dragDialog
    },
    data() {
      return {
        dataList: [{
          children: [{
            text: '开发新项目001'
          }],
          create_by: 'admin',
          create_date: '2019-07-19',
          duration: 2,
          id: '19071916244897600',
          parent: '19071916244896700',
          progress: '23%',
          project_id: '55389180-59c4-434a-8081-35db7addb4fd',
          ref1: '进行中',
          row: 0,
          start_date: '2019-09-22',
          text: '开发新项目001'
        }],
        columns: [{
          text: '任务名',
          value: 'text'
        }, {
          text: '开始时间',
          value: 'start_date'
        }, {
          text: '持续时间',
          value: 'duration'
        }, {
          text: '计划状态',
          value: 'ref1'
        }, {
          text: '开发进度',
          value: 'progress'
        }]
      }
    },
    beforeCreate() {
    },
    created() {
      // this.getMenus()console.log('created')
      this.getDataList()
    },
    beforeMount() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    mounted: function() {
      // this.getDataList()
    },
    activated: function() {
      this.getDataList()
    },
    methods: {
      getDataList() {
        if (this.$store.getters.onProject === 'null') {
          this.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              this.$router.replace({
                name: 'demendProjectIndex', params: {
                  type: 'projectPlanList',
                  from: 'projectPlanList'
                }
              })
            }
          })
        } else {
          var searchItems = { page: {}, items: {}}
          if (this.$store.getters.onProject.project_id) {
            searchItems.items.project_id_eq = this.$store.getters.onProject.project_id
            queryAndChildren(searchItems).then(r => {
              // this.dataList = r.data.list
            })
          }
        }
      },
      handleCreate(data) {
        this.$refs.upData.openDialog('create', data)
      },
      handleUpdate(data) {
        this.$refs.upData.openDialog('update', data)
      }
    }
  }
</script>
