
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder=""
                v-model="beans.searchForm.items.description_lk">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>
      <el-table :key='tableKey' :data="beans.dataList" v-loading="scheduleTaskLoading" element-loading-text="读取中……" border
                highlight-current-row
                style="width: 100%" height="490" resizable="true">
        <el-table-column align="center" label="任务组名字" v-if="userRole['admin']">
          <template slot-scope="scope">
            <span>{{scope.row.jobGroupName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.create_date}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="任务类型" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.jobClass}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label=" 描述">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="启用时期">
          <template slot-scope="scope">
            <span>{{scope.row.startTime}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="失效时期">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column  align="center" label="触发器状态">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.triggerState}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button v-if="true" size="mini" type="danger"
                       @click="handleDelete(scope.row,'deleted')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="beans.searchForm.page.nowPage" :page-sizes="[5,20,30, 50]" :page-size="beans.searchForm.page.nowcont"
                       layout="total, sizes, prev, pager, next, jumper" :total="beans.searchForm.page.count">
        </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" style="margin-left: 50px">
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-form-item label="任务描述"></el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="description">
                  <el-input v-model="temp.description" style="width: 195px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="任务内容"></el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="jobClass">
                  <el-input v-model="temp.jobClass" style="width: 195px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item prop="firstRadio">
                  <el-radio label="按天" v-model="temp.firstRadio" @change="changeRadio"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="s_day">
                  <el-select v-model="temp.s_day" multiple placeholder="选择哪一天"
                             v-bind:disabled="disables.d1">
                    <el-option
                      v-for="item in options.dayOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item prop="firstRadio">
                  <el-radio label="按周" v-model="temp.firstRadio" @change="changeRadio"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="s_week">
                  <el-select v-model="temp.s_week" multiple placeholder="选择星期几"
                             v-bind:disabled="disables.d2">
                    <el-option
                      v-for="item in options.weekOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item prop="firstRadio">
                  <el-radio label="按月" v-model="temp.firstRadio" @change="changeRadio"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="s_month">
                  <el-select v-model="temp.s_month" multiple placeholder="选择几月份"
                             v-bind:disabled="disables.d3">
                    <el-option
                      v-for="item in options.monthOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="-------------------------------------------------------------------------"></el-form-item>

            <el-row>
              <el-col :span="5">
                <el-form-item prop="secondRadio">
                  <el-radio label="发生一次" v-model="temp.secondRadio" @change="changeRadio"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="timeOne">
                  <el-time-picker
                    v-model="temp.timeOne"
                    :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                  }"
                    placeholder="任意时间点"
                    v-bind:disabled="disables.d4"
                    value-format="H m s"
                    style="width: 195px"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item prop="secondRadio">
                  <el-radio label="周期发生" v-model="temp.secondRadio" @change="changeRadio"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="s_interval">
                  <el-select v-model="temp.s_interval" clearable="true" placeholder="间隔时长（小时）"
                             v-bind:disabled="disables.d5">
                    <el-option
                      v-for="item in options.frequencyHour"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item></el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item prop="timeTwo">
                  <el-time-select
                    v-model="temp.timeTwo"
                    :picker-options="{
                  start: '08:30',
                  step: '00:30',
                  end: '18:00'
                }"
                    placeholder="开始时间"
                    v-bind:disabled="disables.d6"
                    style="width: 195px"></el-time-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="timeThree">
                  <el-time-select
                    v-model="temp.timeThree"
                    :picker-options="{
                  start: '08:30',
                  step: '00:30',
                  end: '18:30'
                }"
                    placeholder="结束时间"
                    v-bind:disabled="disables.d7"
                    style="width: 195px"></el-time-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="有效时间"></el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item prop="timeRange">
                  <el-date-picker
                    v-model="temp.timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp"
                    style="width: 416px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
          <el-button v-else type="primary" @click="updateData">确认</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import { scheduleTaskQuery, scheduleTaskInsert, deleteBySelective, scheduleTaskUpdateBySelective } from '@/api/scheduleTask'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import user from '@/store/modules/user'
  // import Vue from 'vue'

  export default {
    components: { ElTransfer },
    name: 'scheduleTaskTable',
    filters: {
      fmtDateFil: function(value) {
        return fmtDate(value)
      }
    },
    directives: {
      waves
    },
    data() {
      var validateRadio1 = (rule, value, callback) => {
        if (value === undefined || value === '') {
          callback(new Error('请选择一种情况'))
        } else if (value === '按天') {
          this.$refs.dataForm.validateField('s_day')
          this.$refs.dataForm.validateField('s_week')
          this.$refs.dataForm.validateField('s_month')
          callback()
        } else if (value === '按周') {
          this.$refs.dataForm.validateField('s_day')
          this.$refs.dataForm.validateField('s_week')
          this.$refs.dataForm.validateField('s_month')
          callback()
        } else if (value === '按月') {
          this.$refs.dataForm.validateField('s_day')
          this.$refs.dataForm.validateField('s_week')
          this.$refs.dataForm.validateField('s_month')
          callback()
        }
      }
      var validateRadio2 = (rule, value, callback) => {
        if (value === undefined || value === '') {
          callback(new Error('请选择一种情况'))
        } else if (value === '发生一次') {
          this.$refs.dataForm.validateField('timeOne')
          this.$refs.dataForm.validateField('timeTwo')
          this.$refs.dataForm.validateField('timeThree')
          this.$refs.dataForm.validateField('s_interval')
          callback()
        } else if (value === '周期发生') {
          this.$refs.dataForm.validateField('timeOne')
          this.$refs.dataForm.validateField('timeTwo')
          this.$refs.dataForm.validateField('timeThree')
          this.$refs.dataForm.validateField('s_interval')
          callback()
        }
      }
      var validateDay = (rule, value, callback) => {
        if (this.temp.firstRadio === '按天' || this.temp.firstRadio === '按月') {
          if (value.length === 0) {
            callback(new Error('请选择天数'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateWeek = (rule, value, callback) => {
        if (this.temp.firstRadio === '按周') {
          if (value.length === 0) {
            callback(new Error('请选择星期'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateMonth = (rule, value, callback) => {
        if (this.temp.firstRadio === '按月') {
          if (value.length === 0) {
            callback(new Error('请选择月份'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateTimeOne = (rule, value, callback) => {
        if (this.temp.secondRadio === '发生一次') {
          if (value === undefined || value === '') {
            callback(new Error('请选择时间'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateTimeTwo = (rule, value, callback) => {
        if (this.temp.secondRadio === '周期发生') {
          if (value === undefined || value === '') {
            callback(new Error('请选择开始时间'))
          } else {
            if (this.temp.timeThree !== '') {
              this.$refs.dataForm.validateField('timeThree')
            }
            callback()
          }
        } else {
          callback()
        }
      }
      var validateTimeThree = (rule, value, callback) => {
        if (this.temp.secondRadio === '周期发生') {
          if (value === undefined || value === '') {
            callback(new Error('请选择结束时间'))
          } else if (this.temp.timeThree < this.temp.timeTwo) {
            callback(new Error('结束时间需要晚于开始时间'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var validateInterval = (rule, value, callback) => {
        if (this.temp.secondRadio === '周期发生') {
          if (value === undefined || value === '') {
            callback(new Error('请选择间隔时长'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        userRole: [],
        temp: {
          description: '',
          jobClass: '',
          firstRadio: '',
          secondRadio: '',
          s_day: [],
          s_week: [],
          s_month: [],
          timeOne: '',
          s_interval: '',
          timeTwo: '',
          timeThree: '',
          timeRange: []
        },
        options: {
          dayOptions: [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }, {
            value: '4',
            label: '4'
          }, {
            value: '5',
            label: '5'
          }, {
            value: '6',
            label: '6'
          }, {
            value: '7',
            label: '7'
          }, {
            value: '8',
            label: '8'
          }, {
            value: '9',
            label: '9'
          }, {
            value: '10',
            label: '10'
          }, {
            value: '11',
            label: '11'
          }, {
            value: '12',
            label: '12'
          }, {
            value: '13',
            label: '13'
          }, {
            value: '14',
            label: '14'
          }, {
            value: '15',
            label: '15'
          }, {
            value: '16',
            label: '16'
          }, {
            value: '17',
            label: '17'
          }, {
            value: '18',
            label: '18'
          }, {
            value: '19',
            label: '19'
          }, {
            value: '20',
            label: '20'
          }, {
            value: '21',
            label: '21'
          }, {
            value: '22',
            label: '22'
          }, {
            value: '23',
            label: '23'
          }, {
            value: '24',
            label: '24'
          }, {
            value: '25',
            label: '25'
          }, {
            value: '26',
            label: '26'
          }, {
            value: '27',
            label: '27'
          }, {
            value: '28',
            label: '28'
          }, {
            value: '29',
            label: '29'
          }, {
            value: '30',
            label: '最后一天'
          }, {
            value: '31',
            label: '每天'
          }],
          weekOptions: [{
            value: '1',
            label: '星期天'
          }, {
            value: '2',
            label: '星期一'
          }, {
            value: '3',
            label: '星期二'
          }, {
            value: '4',
            label: '星期三'
          }, {
            value: '5',
            label: '星期四'
          }, {
            value: '6',
            label: '星期五'
          }, {
            value: '7',
            label: '星期六'
          }, {
            value: '8',
            label: '工作日'
          }],
          monthOptions: [{
            value: '1',
            label: '一月'
          }, {
            value: '2',
            label: '二月'
          }, {
            value: '3',
            label: '三月'
          }, {
            value: '4',
            label: '四月'
          }, {
            value: '5',
            label: '五月'
          }, {
            value: '6',
            label: '六月'
          }, {
            value: '7',
            label: '七月'
          }, {
            value: '8',
            label: '八月'
          }, {
            value: '9',
            label: '九月'
          }, {
            value: '10',
            label: '十月'
          }, {
            value: '11',
            label: '十一月'
          }, {
            value: '12',
            label: '十二月'
          }, {
            value: '13',
            label: '每月'
          }],
          frequencyHour: [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }, {
            value: '4',
            label: '4'
          }, {
            value: '5',
            label: '5'
          }]
        },
        disables: {
          d1: true,
          d2: true,
          d3: true,
          d4: true,
          d5: true,
          d6: true,
          d7: true
        },
        isLocked: undefined,
        tableKey: 0,
        select: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
        scheduleTask: null,
        total: null,
        scheduleTaskLoading: true,
        beans: { dataList: [] },
        value: undefined,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新增'
        },
        rules: {
          description: [{ required: true, message: '描述必填', trigger: 'change' }],
          firstRadio: [{ validator: validateRadio1, trigger: 'change' }],
          secondRadio: [{ validator: validateRadio2, trigger: 'change' }],
          s_day: [{ validator: validateDay, trigger: 'change' }],
          s_week: [{ validator: validateWeek, trigger: 'change' }],
          s_month: [{ validator: validateMonth, trigger: 'change' }],
          timeOne: [{ validator: validateTimeOne, trigger: 'change' }],
          timeTwo: [{ validator: validateTimeTwo, trigger: 'change' }],
          timeThree: [{ validator: validateTimeThree, trigger: 'change' }],
          s_interval: [{ validator: validateInterval, trigger: 'change' }],
          jobClass: [{ required: true, message: '请输入定时任务', trigger: 'blur' }],
          timeRange: [{ required: true, message: '请选择时间范围', trigger: 'change' }]
        }
      }
    },
    created() {
      initPage(this.beans, scheduleTaskQuery)
      this.getScheduleTask(1)
      this.getUserInfo()
      if (!this.userRole['admin'] && !this.userRole['manager']) {
        this.beans.searchForm.items.jobGroupName_eq = user.state.usercode
      }
    },
    methods: {
      closeDialog() {
        this.temp.s_day = []
        this.temp.s_week = []
        this.temp.s_month = []
        this.temp.description = ''
        this.temp.s_interval = ''
        this.temp.timeOne = ''
        this.temp.timeRange = []
        this.temp.timeTwo = ''
        this.temp.timeThree = ''
        this.temp.firstRadio = ''
        this.temp.secondRadio = ''
        this.disables.d1 = true
        this.disables.d2 = true
        this.disables.d3 = true
        this.disables.d4 = true
        this.disables.d5 = true
        this.disables.d6 = true
        this.disables.d7 = true
        this.dialogFormVisible = false
      },
      changeRadio() {
        this.disables.d1 = true
        this.disables.d2 = true
        this.disables.d3 = true
        this.disables.d4 = true
        this.disables.d5 = true
        this.disables.d6 = true
        this.disables.d7 = true
        if (this.temp.firstRadio === '按天') {
          this.disables.d1 = false
        } else if (this.temp.firstRadio === '按周') {
          this.disables.d2 = false
        } else if (this.temp.firstRadio === '按月') {
          this.disables.d1 = false
          this.disables.d3 = false
        }
        if (this.temp.secondRadio === '发生一次') {
          this.disables.d4 = false
        } else if (this.temp.secondRadio === '周期发生') {
          this.disables.d5 = false
          this.disables.d6 = false
          this.disables.d7 = false
        }
      },
      getScheduleTask(index) {
        this.scheduleTaskLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.scheduleTaskLoading = false
      },
      handleChange(value) {
        console.log('value', value)
        this.temp.deptId = value[value.length - 1]
      },
      handleFilter() {
        this.getScheduleTask(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getScheduleTask(1)
      },
      handleCurrentChange(val) {
        this.getScheduleTask(val)
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$refs['dataForm'].resetFields()
        this.disables.d1 = true
        this.disables.d2 = true
        this.disables.d3 = true
        this.disables.d4 = true
        this.disables.d5 = true
        this.disables.d6 = true
        this.disables.d7 = true
        this.disables.d8 = true
      },
      createData() {
        console.log('temp->', this.temp)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp2->', this.temp)
            this.temp.create_date = new Date()
            this.temp.jobGroupName = user.state.usercode
            this.temp.startTime = this.temp.timeRange[0]
            this.temp.endTime = this.temp.timeRange[1]
            this.temp.jobName = new Date().getTime()
            this.temp.triggerName = this.temp.jobName
            this.temp.cron = {}
            this.temp.timeRange = this.temp.timeRange.join(',')
            var day_temp = []
            var week_temp = []
            var month_temp = []
            var two_temp = this.temp.timeTwo.split(':')[0]
            var three_temp = this.temp.timeThree.split(':')[0]
            if (this.temp.firstRadio === '按天' && this.temp.secondRadio === '发生一次') {
              day_temp = this.temp.s_day
              this.temp.triggerGroupName = 1
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.week = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
            }
            if (this.temp.firstRadio === '按周' && this.temp.secondRadio === '发生一次') {
              week_temp = this.temp.s_week
              this.temp.triggerGroupName = 2
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.day = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_week.indexOf('8') > -1) {
                this.temp.cron.week = '2-6'
              } else {
                this.temp.cron.week = this.temp.s_week.join(',')
              }
              this.temp.s_week = this.temp.s_week.join(',')
            }
            if (this.temp.firstRadio === '按月' && this.temp.secondRadio === '发生一次') {
              day_temp = this.temp.s_day
              month_temp = this.temp.s_month
              this.temp.triggerGroupName = 3
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.week = '?'
              if (this.temp.s_month.indexOf('13') > -1) {
                this.temp.cron.month = '1-12'
              } else {
                this.temp.cron.month = this.temp.s_month.join(',')
              }
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
              this.temp.s_month = this.temp.s_month.join(',')
            }
            if (this.temp.firstRadio === '按天' && this.temp.secondRadio === '周期发生') {
              day_temp = this.temp.s_day
              this.temp.triggerGroupName = 4
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.week = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
            }
            if (this.temp.firstRadio === '按周' && this.temp.secondRadio === '周期发生') {
              week_temp = this.temp.s_week
              this.temp.triggerGroupName = 5
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.day = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_week.indexOf('8') > -1) {
                this.temp.cron.week = '2-6'
              } else {
                this.temp.cron.week = this.temp.s_week.join(',')
              }
              this.temp.s_week = this.temp.s_week.join(',')
            }
            if (this.temp.firstRadio === '按月' && this.temp.secondRadio === '周期发生') {
              day_temp = this.temp.s_day
              month_temp = this.temp.s_month
              this.temp.triggerGroupName = 6
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.week = '?'
              if (this.temp.s_month.indexOf('13') > -1) {
                this.temp.cron.month = '1-12'
              } else {
                this.temp.cron.month = this.temp.s_month.join(',')
              }
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
              this.temp.s_month = this.temp.s_month.join(',')
            }
            scheduleTaskInsert({ model: this.temp }).then((r) => {
              this.dialogFormVisible = false
              this.getScheduleTask(1)
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }, r => {
              this.temp.s_day = day_temp
              this.temp.s_week = week_temp
              this.temp.s_month = month_temp
              this.temp.timeRange = this.temp.timeRange.split(',')
            })
          }
        })
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timeRange = this.temp.timeRange.split(',')
        if (this.temp.triggerGroupName === '1') {
          this.temp.firstRadio = '按天'
          this.temp.secondRadio = '发生一次'
          this.disables.d1 = false
          this.disables.d4 = false
          this.temp.s_day = this.temp.s_day.split(',')
          this.temp.s_week = []
          this.temp.s_month = []
        }
        if (this.temp.triggerGroupName === '2') {
          this.temp.firstRadio = '按周'
          this.temp.secondRadio = '发生一次'
          this.disables.d2 = false
          this.disables.d4 = false
          this.temp.s_week = this.temp.s_week.split(',')
          this.temp.s_day = []
          this.temp.s_month = []
        }
        if (this.temp.triggerGroupName === '3') {
          this.temp.firstRadio = '按月'
          this.temp.secondRadio = '发生一次'
          this.disables.d1 = false
          this.disables.d3 = false
          this.disables.d4 = false
          this.temp.s_day = this.temp.s_day.split(',')
          this.temp.s_month = this.temp.s_month.split(',')
          this.temp.s_week = []
        }
        if (this.temp.triggerGroupName === '4') {
          this.temp.firstRadio = '按天'
          this.temp.secondRadio = '周期发生'
          this.disables.d1 = false
          this.disables.d5 = false
          this.disables.d6 = false
          this.disables.d7 = false
          this.temp.s_day = this.temp.s_day.split(',')
          this.temp.s_week = []
          this.temp.s_month = []
        }
        if (this.temp.triggerGroupName === '5') {
          this.temp.firstRadio = '按周'
          this.temp.secondRadio = '周期发生'
          this.disables.d2 = false
          this.disables.d5 = false
          this.disables.d6 = false
          this.disables.d7 = false
          this.temp.s_week = this.temp.s_week.split(',')
          this.temp.s_day = []
          this.temp.s_month = []
        }
        if (this.temp.triggerGroupName === '6') {
          this.temp.firstRadio = '按月'
          this.temp.secondRadio = '周期发生'
          this.disables.d1 = false
          this.disables.d3 = false
          this.disables.d5 = false
          this.disables.d6 = false
          this.disables.d7 = false
          this.temp.s_day = this.temp.s_day.split(',')
          this.temp.s_month = this.temp.s_month.split(',')
          this.temp.s_week = []
        }
        console.log('qqqq::,', this.temp)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        // this.$refs['dataForm'].resetFields()
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.temp.startTime = this.temp.timeRange[0]
            this.temp.endTime = this.temp.timeRange[1]
            this.temp.cron = {}
            this.temp.timeRange = this.temp.timeRange.join(',')
            var day_temp = []
            var week_temp = []
            var month_temp = []
            var two_temp = this.temp.timeTwo.split(':')[0]
            var three_temp = this.temp.timeThree.split(':')[0]
            if (this.temp.firstRadio === '按天' && this.temp.secondRadio === '发生一次') {
              day_temp = this.temp.s_day
              this.temp.triggerGroupName = 1
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.week = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
            }
            if (this.temp.firstRadio === '按周' && this.temp.secondRadio === '发生一次') {
              week_temp = this.temp.s_week
              this.temp.triggerGroupName = 2
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.day = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_week.indexOf('8') > -1) {
                this.temp.cron.week = '2-6'
              } else {
                this.temp.cron.week = this.temp.s_week.join(',')
              }
              this.temp.s_week = this.temp.s_week.join(',')
            }
            if (this.temp.firstRadio === '按月' && this.temp.secondRadio === '发生一次') {
              day_temp = this.temp.s_day
              month_temp = this.temp.s_month
              this.temp.triggerGroupName = 3
              this.temp.cron.second = this.temp.timeOne.split(' ')[2]
              this.temp.cron.minute = this.temp.timeOne.split(' ')[1]
              this.temp.cron.hour = this.temp.timeOne.split(' ')[0]
              this.temp.cron.week = '?'
              if (this.temp.s_month.indexOf('13') > -1) {
                this.temp.cron.month = '1-12'
              } else {
                this.temp.cron.month = this.temp.s_month.join(',')
              }
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
              this.temp.s_month = this.temp.s_month.join(',')
            }
            if (this.temp.firstRadio === '按天' && this.temp.secondRadio === '周期发生') {
              day_temp = this.temp.s_day
              this.temp.triggerGroupName = 4
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.week = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
            }
            if (this.temp.firstRadio === '按周' && this.temp.secondRadio === '周期发生') {
              week_temp = this.temp.s_week
              this.temp.triggerGroupName = 5
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.day = '?'
              this.temp.cron.month = '*'
              if (this.temp.s_week.indexOf('8') > -1) {
                this.temp.cron.week = '2-6'
              } else {
                this.temp.cron.week = this.temp.s_week.join(',')
              }
              this.temp.s_week = this.temp.s_week.join(',')
            }
            if (this.temp.firstRadio === '按月' && this.temp.secondRadio === '周期发生') {
              day_temp = this.temp.s_day
              month_temp = this.temp.s_month
              this.temp.triggerGroupName = 6
              this.temp.cron.second = '0'
              if (this.temp.timeTwo.split(':')[1][0] === '0') {
                this.temp.cron.minute = '0'
              } else {
                this.temp.cron.minute = '30'
              }
              if (this.temp.timeTwo.split(':')[0][0] === '0') {
                two_temp = this.temp.timeTwo.split(':')[0][1]
              }
              if (this.temp.timeThree.split(':')[0][0] === '0') {
                three_temp = this.temp.timeThree.split(':')[0][1]
              }
              this.temp.cron.hour = two_temp + '-' + three_temp + '/' + this.temp.s_interval
              this.temp.cron.week = '?'
              if (this.temp.s_month.indexOf('13') > -1) {
                this.temp.cron.month = '1-12'
              } else {
                this.temp.cron.month = this.temp.s_month.join(',')
              }
              if (this.temp.s_day.indexOf('31') > -1) {
                this.temp.cron.day = '*'
              } else {
                if (this.temp.s_day.indexOf('30') > -1) {
                  this.temp.cron.day = this.temp.s_day.join(',').replace('30', 'L')
                } else {
                  this.temp.cron.day = this.temp.s_day.join(',')
                }
              }
              this.temp.s_day = this.temp.s_day.join(',')
              this.temp.s_month = this.temp.s_month.join(',')
            }
            scheduleTaskUpdateBySelective({ model: this.temp }).then((r) => {
              this.dialogFormVisible = false
              this.getScheduleTask(1)
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }, r => {
              this.temp.s_day = day_temp
              this.temp.s_week = week_temp
              this.temp.s_month = month_temp
              this.temp.timeRange = this.temp.timeRange.split(',')
            })
          }
        })
      },
      handleDelete(row) {
        deleteBySelective({ items: { 'jobId_eq': row.jobId, 'jobName': row.jobName, 'jobGroupName': row.jobGroupName, 'triggerGroupName': row.triggerGroupName }}).then(r => {
          this.getScheduleTask(1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getUserInfo() {
        var userRole = {}
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        this.userRole = userRole
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
