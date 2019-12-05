<template>
  <div class="app-container">
    <el-date-picker
      size="mini"
      :change="pickerChange()"
      v-model="start_time"
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
    <el-select size="mini" v-model="groupName" placeholder="统计规则">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">统计</el-button>
    <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="importDate">导出清单</el-button>
    <el-card class="box-card" style="margin-bottom: 10px">
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </el-card>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="开发任务统计" name="first">
          <el-row :gutter="30" type="flex" class="row-bg" style="height: 30px;">
            <el-col>
              <el-form style="margin-left: 40%">
                <el-form-item label="按照模块维度统计情况">
                </el-form-item>
              </el-form>
            </el-col>
            <el-col>
              <el-form style="margin-left: 40%">
                <el-form-item label="按照需求部门维度（含客户）统计情况">
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex" class="row-bg" style="">
            <el-col :span="15">
              <el-table
                :data="tableData"
                border
                style="">
                <el-table-column
                  prop="module"
                  label="模块"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="new"
                  label="新增开发">
                </el-table-column>
                <el-table-column
                  prop="exist"
                  label="既有开发">
                </el-table-column>
                <el-table-column
                  prop="complete"
                  label="已完成">
                </el-table-column>
                <el-table-column
                  prop="developing"
                  label="开发中">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="15">
              <el-table
                :data="tableData2"
                border
                style="">
                <el-table-column
                  prop="module"
                  label="需求部门"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="new"
                  label="新增开发">
                </el-table-column>
                <el-table-column
                  prop="exist"
                  label="既有开发">
                </el-table-column>
                <el-table-column
                  prop="complete"
                  label="已完成">
                </el-table-column>
                <el-table-column
                  prop="developing"
                  label="开发中">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="日常维护统计" name="second">
          <el-row :gutter="30" type="flex" class="row-bg" style="">
            <el-col :span="9">
              <el-table
                :data="tableData3"
                border>
                <el-table-column
                  prop="daliySystemName"
                  label="维护系统">
                </el-table-column>
                <el-table-column
                  prop="counts"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="deal_time"
                  label="时间汇总（天）">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>



    </el-card>
  </div>
</template>
<style>
  .ss {
    background-color: #cf9236;
  }
</style>
<script>
  import { findDarw, daliyDarw } from '@/api/weeklyLine'
  import { dateFtt } from '@/utils/index'
  // import { excleOutPut } from '@/api/excle'
  import waves from '@/directive/waves'
  export default {
    components: {},
    directives: {
      waves
    },
    name: 'statistics',
    mounted: function() {
      // this.darw('bar')
      /**
       * 设置默认查询时间
       */
      // this.getExcle()
      this.seachItems.start_time = new Date(new Date().getTime() - 3600 * 1000 * 24 * 14)
      this.seachItems.end_time = new Date()
      this.start_time.push(this.seachItems.start_time)
      this.start_time.push(this.seachItems.end_time)
      this.seachItems.group = this.groupName
      this.getDarw()
      this.getData1()
      this.getData2()
      this.getData3()
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
        groupName: 'dictionaryName',
        itemsStyle: {
          normal: {
            label: {
              show: true, // 开启显示
              position: 'top', // 在上方显示
              textStyle: { // 数值样式 #cf9236 #e6a23c
                color: '#cf9236',
                fontSize: 12,
                textShadowBlur: 1,
                textShadowColor: 'khaki',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1
              }
            }
          }},
        start_time: [],
        options2: [{
          value: 'dictionaryName',
          label: '按系统'
        }, {
          value: 'deptName',
          label: '按部门',
          disabled: true
        }],
        seachItems: {},
        activeName: 'first',
        tableData: [],
        tableData2: [],
        tableData3: [],
        startDate1Before: '',
        endDate1Before: '',
        startDate2Before: '',
        endDate2Before: '',
        startDate3Before: '',
        endDate3Before: ''
      }
    },
    methods: {
      importDate() {
        var start_time = this.start_time ? this.start_time[0] : null
        var end_time = this.start_time ? this.start_time[1] : null
        if (typeof (start_time) !== 'string') {
          start_time = dateFtt(start_time, 'yyyy-MM-dd')
          end_time = dateFtt(end_time, 'yyyy-MM-dd')
        }
        window.open(process.env.API_BASEURL + '/files/n/weeklyLine/getStatisExcel?start_time=' + start_time + '&end_time=' + end_time, '_blank')
      },
      getData1() {
        var seachItems = {}
        seachItems.start_time = this.start_time ? this.start_time[0] : null
        seachItems.end_time = this.start_time ? this.start_time[1] : null
        seachItems.group = 'dictionaryName'
        if (this.start_time === null) {
          this.tableData = []
        } else {
          if (this.startDate1Before !== this.start_time[0] || this.endDate1Before !== this.start_time[1]) {
            this.tableData = []
            findDarw(seachItems).then(r => {
              for (const i in r.data.list) {
                var model = {}
                model.module = r.data.list[i].product
                model.total = r.data.list[i].总计
                model.new = r.data.list[i].新增开发
                model.exist = r.data.list[i].既有开发
                model.complete = r.data.list[i].已完成
                model.developing = r.data.list[i].开发中
                this.tableData.push(model)
              }
              this.startDate1Before = this.start_time[0]
              this.endDate1Before = this.start_time[1]
            })
          }
        }
      },
      getData2() {
        var seachItems = {}
        seachItems.start_time = this.start_time ? this.start_time[0] : null
        seachItems.end_time = this.start_time ? this.start_time[1] : null
        seachItems.group = 'deptName'
        if (this.start_time === null) {
          this.tableData2 = []
        } else {
          if (this.startDate2Before !== this.start_time[0] || this.endDate2Before !== this.start_time[1]) {
            this.tableData2 = []
            findDarw(seachItems).then(r => {
              for (const i in r.data.list) {
                var model2 = {}
                model2.module = r.data.list[i].product
                model2.total = r.data.list[i].总计
                model2.new = r.data.list[i].新增开发
                model2.exist = r.data.list[i].既有开发
                model2.complete = r.data.list[i].已完成
                model2.developing = r.data.list[i].开发中
                this.tableData2.push(model2)
              }
              this.startDate2Before = this.start_time[0]
              this.endDate2Before = this.start_time[1]
            })
          }
        }
      },
      getData3() {
        var seachItems = {}
        seachItems.start_time = this.start_time ? this.start_time[0] : null
        seachItems.end_time = this.start_time ? this.start_time[1] : null
        if (this.start_time === null) {
          this.tableData3 = []
        } else {
          if (this.startDate3Before !== this.start_time[0] || this.endDate3Before !== this.start_time[1]) {
            this.tableData3 = []
            daliyDarw(seachItems).then(r => {
              this.tableData3 = r.data.list
              /* for (const i in r.data.list) {
                var model = {}
                model.module = r.data.list[i].product
                model.total = r.data.list[i].总计
                model.new = r.data.list[i].新增开发
                model.exist = r.data.list[i].既有开发
                model.complete = r.data.list[i].已完成
                model.developing = r.data.list[i].开发中
                this.tableData3.push(model)
              } */
              this.startDate3Before = this.start_time[0]
              this.endDate3Before = this.start_time[1]
            })
          }
        }
      },
      handleFilter() {
        this.getData1()
        this.getData2()
        this.getData3()
        this.seachItems.start_time = this.start_time ? this.start_time[0] : null
        this.seachItems.end_time = this.start_time ? this.start_time[1] : null
        this.seachItems.group = this.groupName
        this.getDarw()
      },
      getDarw() {
        findDarw(this.seachItems).then(r => {
          console.log('Darw', r)
          // var that = this
          var series = []
          /* r.data.list.forEach(function(value, index) {
            series.push({ type: 'bar', itemStyle: that.itemsStyle })
          }) */
          var sz = []
          for (const i in r.data.list) {
            var model2 = {}
            model2.product = r.data.list[i].product
            model2.总计 = r.data.list[i].总计
            model2.新增开发 = r.data.list[i].新增开发
            model2.既有开发 = r.data.list[i].既有开发
            model2.已完成 = r.data.list[i].已完成
            model2.开发中 = r.data.list[i].开发中
            sz.push(model2)
          }
          this.darw(sz, series)
        })
      },
      pickerChange() {
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      darw(sourceData, seriesData) {
        // 基于准备好的dom，初始化echarts实例
        // myChart.showLoading(); myChart.hideLoading();
        var echarts = require('echarts')
        // var myChart = this.$echarts.init(document.getElementById('myChart'))
        var myChart = echarts.init(document.getElementById('myChart'))
        console.log('myChart:', myChart)
        // 绘制图表
        myChart.setOption({
          title: { text: '' },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: { type: 'category' },
          dataset: {
            source: sourceData
          },
          legend: {
            data: ['总计', '新增开发', '既有开发', '已完成', '开发中']
          },
          toolbox: {
            right: '5%',
            feature: {
              saveAsImage: {
                show: true,
                title: '保存为图片'
              },
              magicType: {
                type: ['line', 'bar', 'stack', 'tiled']
              }
            }
          },
          yAxis: {},
          // series: seriesData
          series: [{ type: 'bar', itemStyle: this.itemsStyle },
            { type: 'bar', itemStyle: this.itemsStyle },
            { type: 'bar', itemStyle: this.itemsStyle },
            { type: 'bar', itemStyle: this.itemsStyle },
            { type: 'bar', itemStyle: this.itemsStyle }]
        })
      }
    }
  }
</script>
