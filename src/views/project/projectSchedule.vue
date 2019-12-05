/**
* Created by yaoyuan on 2019/8/8.
*/

<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="所属系统"></el-input>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>-->
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" @click="add" type="primary"
                 icon="el-icon-edit" :disabled="IFREVIEW">新增
      </el-button>
      <el-table :row-style="changeStyle"
                :key='id'
                @row-dblclick="demandDblClick"
                :data="beans.dataList"
                v-loading="demandLoading"
                element-loading-text="读取中……"
                border
                highlight-current-row
                style="width: 100%" height="490" resizable="true">
        <el-table-column  align="center" label="项目单编号" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.progress_code}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="项目单名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.progress_name}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="项目阶段" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.text}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="项目状态" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.progress_status}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="当前项目进度" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.progress_current}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="计划开始日期" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.start_date}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="计划结束日期" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.end_date}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="实际开始日期" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.actual_data_start}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="实际结束日期" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.actual_data_end}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="审核状态" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :show-overflow-tooltip="true" label="备注" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.progress_note}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="beans.searchForm.page.nowPage" :page-sizes="[5,20,30, 50]" :page-size="beans.searchForm.page.nowcont"
                       layout="total, sizes, prev, pager, next, jumper" :total="beans.searchForm.page.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { ProjectProgressList } from '@/api/projectSchedule'
  import { taskStatusInfo } from '@/api/project_plan_list'
  import user from '@/store/modules/user'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import DemandIndexDialog from '../customDialog/demandIndexDialog'
  export default {
    components: {
      DemandIndexDialog,
      ElTransfer },
    name: 'projectSchedule',
    filters: {
    },
    directives: {
      waves
    },
    data() {
      return {
        temp: {},
        tableKey: 0,
        total: null,
        demandLoading: false,
        beans: { dataList: [], searchForm: { page: {}, items: {}}},
        userPower: {},
        userRole: {},
        IFREVIEW: false
      }
    },
    created() {
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
              type: 'projectSchedule',
              from: 'projectSchedule'
            }})
          }
        })
      } else {
        taskStatusInfo(that.$store.getters.onProject.project_id).then(r => {
          console.log('taskStatusInfo', r)
          if (r.data.hasOwnProperty('model')) {
            if (r.data.model.audit_status !== '通过') {
              that.IFREVIEW = true
              that.$alert('当前所选项目：' + that.$store.getters.onProject.project_name + '   项目计划列表未审核/驳回，不能操作项目进度单。请选择其他项目！', '警告', {
                confirmButtonText: '确定',
                showClose: false,
                type: 'warning',
                callback: action => {
                  that.$router.replace({ name: 'demendProjectIndex', params: {
                    type: 'projectSchedule',
                    from: 'projectSchedule'
                  }})
                }
              })
            } else {
              that.IFREVIEW = false
              that.getSchdule()
            }
          } else {
            that.$alert('当前所选项目：' + that.$store.getters.onProject.project_name + '   无项目计划列表，不能操作项目进度单。请选择其他项目！', '警告', {
              confirmButtonText: '确定',
              showClose: false,
              type: 'warning',
              callback: action => {
                that.$router.replace({ name: 'demendProjectIndex', params: {
                  type: 'projectSchedule',
                  from: 'projectSchedule'
                }})
              }
            })
          }
        })
      }
    },
    methods: {
      getSchdule() {
        initPage(this.beans, ProjectProgressList)
        this.beans.searchForm.page.nowcont = 10
        this.beans.searchForm.orderBy = 'create_time desc'
        this.beans.searchForm.items.project_id = this.$store.getters.onProject.project_id
        this.getProjectSchedule(1)
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
      demandDblClick(row, event) {
        this.$router.push({ name: 'projectScheduleEdit', params: {
          row: row,
          type: '编辑'
        }})
      },
      getProjectSchedule(index) {
        this.demandLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.demandLoading = false
      },
      handleFilter() {
        this.getProjectSchedule(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getProjectSchedule(1)
      },
      handleCurrentChange(val) {
        this.getProjectSchedule(val)
      },
      add() {
        this.$router.push({ name: 'projectScheduleEdit', params: {
          id: '',
          type: '新增'
        }})
        /* this.temp = {}
         this.$nextTick(() => {
         this.$refs['dataForm'].clearValidate()
         }) */
      },
      handleUpdate(row) {
        // console.log(this.options_test)
        this.$router.push({ name: 'projectScheduleEdit', params: {
          row: row,
          type: '编辑'
        }})
        this.temp = Object.assign({}, row) // copy obj
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      changeStyle(row, rowIndex) {
        if (row.row.ref3 === '保存') {
          return { 'background-color': '#E0FFFF' }
        } else {
          return {}
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    },
    watch: {
      '$store.getters.onProject': function(newVal, oldVal) {
        this.getSchdule()
      }
    }
  }
</script>
<style>
  .demandInfo{
    position: relative;
  }
  .demandDisInfo{
    width: 200px;
    height: 200px;
    display: none;
  }

  .demandInfo:hover .demandDisInfo{
    background-color: black;
    opacity: 0.3;
    position:absolute;
    display: block;
    left: 0px;
    top: 0px;
    z-index: 99;
  }
</style>
