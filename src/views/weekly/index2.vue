
<template>
  <div class="app-container">
    <div ref="contenmenu" v-show="$store.getters.contenxtmenuFlag" class="contenmenu">
      <div class="contenmenuBut" @click="handleUpdate(temp)">编辑</div>
      <div class="contenmenuBut display">删除</div>
    </div>
  	<div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="需求部门"
                v-model="beans.searchForm.items.deptName_lk">
      </el-input>
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="维护系统"
                  v-model="beans.searchForm.items.daliySystemName_lk">
      </el-input>
      <el-date-picker
        size="mini"
        v-model="queryDate"
        value-format="yyyy-MM-dd"
        type="daterange"
        align="right"
        :default-value="new Date()"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getExcle()">导出</el-button>

      <el-table @row-contextmenu="tableContextmenu" :key='tableKey' :data="beans.dataList" v-loading="weeklyLineLoading" element-loading-text="读取中……" border
              highlight-current-row
                style="width: 100%" fit="true" resizable="true">
	      <el-table-column  align="center" label="行表编号" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.line_code}}</span>
	        </template>
	      </el-table-column>
        <el-table-column  align="center" label="维护系统" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.daliySystemName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="责任人" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.resUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="责任部门" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.resdeptname}}</span>
          </template>
        </el-table-column>
	      <el-table-column  align="center" label="需求部门" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.deptName}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column  align="center" label="需求提交人" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.userName}}</span>
	        </template>
	      </el-table-column>

	      <el-table-column :show-overflow-tooltip="true"  align="center" label="日常处理简述" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.deal_desc}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column :show-overflow-tooltip="true"  align="center" label="日常处理详细描述" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.deal_detail_desc}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column :show-overflow-tooltip="true" align="center" label="原因分析" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.reason}}</span>
	        </template>
	      </el-table-column>
        <el-table-column  align="center" label="处理日期" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.deal_date}}</span>
          </template>
        </el-table-column>
	      <el-table-column  align="center" label="处理时间（小时）" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.deal_time}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column :show-overflow-tooltip="true" align="center" label="长期对策" width="180">
	        <template slot-scope="scope">
	          <span>{{scope.row.longterm_action}}</span>
	        </template>
	      </el-table-column>

        <el-table-column :show-overflow-tooltip="true" align="center" label="备注" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      <el-table-column align="center" label="操作" widthhandleUpdate="230" class-name="small-padding fixed-width">
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
  import { weeklyLineQuery, deleteBySelective, weeklyLineUpdateBySelective } from '@/api/weeklyLine'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import user from '@/store/modules/user'
  export default {
    components: { ElTransfer },
    name: 'weeklyLineTable',
    filters: {
      fmtDateFil: function(value) { // 时间转换过滤器
        return fmtDate(value)
      }
    },
    directives: {
      waves
    },
    activated: function() {
      this.beans.searchCurrent(1)
    },
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近两周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        queryDate: '',
        temp: {},
        userPower: [],
        userRole: [],
        isLocked: undefined,
        tableKey: 0,
        select: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
        weeklyLine: null,
        total: null,
        weeklyLineLoading: true,
        beans: { dataList: [] },
        value: undefined,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新增'
        },
        openweeklyLineID: '',
        rules: {
          line_id: [{ required: true, message: '编码必填', trigger: 'change' }]
        }
      }
    },
    created() {
      initPage(this.beans, weeklyLineQuery)
      this.getUserInfo()
      this.beans.searchForm.items.weekly_type_eq = 'daliy'
      this.beans.searchForm.orderBy = 'create_time'
      if (!this.userRole['admin'] && !this.userRole['manager']) {
        this.beans.searchForm.items.create_by_eq = user.state.usercode
      }

      this.getWeeklyLine(1)
    },
    mounted() {
      this.globalClick(this.moreSetupMenuRemove)
    },
    methods: {
      getExcle() {
        if (!this.queryDate) {
          this.$notify({
            title: '提醒',
            message: '请选择时间',
            type: 'info',
            duration: 2000
          })
          return null
        }
        var startDate = this.queryDate ? this.queryDate[0] : null
        var endDate = this.queryDate ? this.queryDate[1] : null
        var userCode = null
        if (!this.userRole['admin'] && !this.userRole['manager']) {
          userCode = user.state.usercode
        }
        var url = process.env.API_BASEURL + '/files/n/weeklyLine/getDaliyExcel?startDate=' + startDate + '&endDate=' + endDate + '&deptName=' + this.beans.searchForm.items.deptName_lk + '&daliySystemName=' + this.beans.searchForm.items.daliySystemName_lk + '&userCode=' + userCode
        window.open(url, '_blank')
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
      moreSetupMenuRemove() {
        this.$store.commit('SET_CONTENXTMENUFLAG', false)
      },
      tableContextmenu(row, event) {
        event.preventDefault()
        this.temp = row
        this.$refs['contenmenu'].style.left = event.pageX + 'px'
        this.$refs['contenmenu'].style.top = event.pageY + 'px'
        this.$refs['contenmenu'].style.width = '120px'
        this.$store.commit('SET_CONTENXTMENUFLAG', true)
      },
      getWeeklyLine(index) {
        this.weeklyLineLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.weeklyLineLoading = false
      },
      handleChange(value) {
        console.log('value', value)
        this.temp.deptId = value[value.length - 1]
      },
      handleFilter() {
        if (this.queryDate) {
          this.beans.searchForm.items.deal_date_dgt = this.queryDate[0]
          this.beans.searchForm.items.deal_date_dlt = this.queryDate[1]
        } else {
          this.beans.searchForm.items.deal_date_dgt = null
          this.beans.searchForm.items.deal_date_dlt = null
        }
        this.getWeeklyLine(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getWeeklyLine(1)
      },
      handleCurrentChange(val) {
        this.getWeeklyLine(val)
      },
      handleLock(row, isLocked) {
        console.log(isLocked, row)
        this.isLocked = isLocked
        var model1 = {}
        model1.line_id = row.line_id
        model1.isLocked = row.isLocked
        if (isLocked) {
          model1.isLocked = 1
        } else {
          model1.isLocked = 0
        }
        weeklyLineUpdateBySelective({ model: model1 }).then((r) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
        row.isLocked = isLocked
      },
      handleCreate() {
        this.$router.push({ path: '/weekly/maintainUpdate' })
        /* this.temp = {}
        this.roleSelectFlag = false
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        }) */
      },
      handleUpdate(row) {
        // console.log(this.options_test)
        this.temp = Object.assign({}, row) // copy obj
        this.$router.replace({ name: 'maintainUpdate', params: {
          id: row.line_id,
          type: '修改'
        }})
      },
      handleDelete(row) {
        if (this.isLocked) {
          this.$alert('已锁定，不能删除', '提示')
        } else {
          deleteBySelective({ items: { 'line_id_eq': row.line_id }})
          this.getWeeklyLine(1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
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
    }
  }
  function fmtDate(obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
  }
</script>
