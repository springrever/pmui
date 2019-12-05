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
    <el-card class="box-card" style="margin-bottom: 10px">
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="30" type="flex" class="row-bg" style="height: 30px;">
        <el-col>
          <el-form style="margin-left: 0%">
            <el-form-item label="按照模块维度统计情况">
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" class="row-bg" style="">
        <el-col :span="20">
          <el-table
            :data="tableData"
            border
            style="">
            <el-table-column
              prop="product"
              label="所属系统"
              width="120">
            </el-table-column>
            <el-table-column
              prop="totar"
              label="总计">
            </el-table-column>
            <el-table-column
              prop="wt_end"
              label="完成">
            </el-table-column>
            <el-table-column
              prop="wt_vc"
              label="审核完成">
            </el-table-column>
            <el-table-column
              prop="wt_close"
              label="已关闭">
            </el-table-column>
            <el-table-column
              prop="wt_build"
              label="开发中">
            </el-table-column>
            <el-table-column
              prop="wt_commit"
              label="待分派">
            </el-table-column>
            <el-table-column
              prop="wt_sconfirm"
              label="待实施确认">
            </el-table-column>
            <el-table-column
              prop="wt_examine"
              label="待审核">
            </el-table-column>
            <el-table-column
              prop="wt_kconfirm"
              label="待开发确认">
            </el-table-column>
            <el-table-column
              prop="wt_yconfirm"
              label="带用户确认">
            </el-table-column>
            <el-table-column
              prop="wt_uncommit"
              label="未提交">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>
<style>
  .ss {
    background-color: #cf9236;
  }
</style>
<script>
  import { getEchars, findtoMap } from '@/api/bugDetail'
  // import { excleOutPut } from '@/api/excle'
  import waves from '@/directive/waves'
  export default {
    components: {},
    directives: {
      waves
    },
    name: 'statistics',
    created() {
    },
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
      this.getData()
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
        groupName: 'systemName',
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
          value: 'systemName',
          label: '应用系统'
        }, {
          value: 'moudleName',
          label: '所属模块',
          disabled: true
        }, {
          value: 'currentStateName',
          label: '问题状态',
          disabled: true
        }, {
          value: 'deptName ',
          label: '所属部门',
          disabled: true
        }, {
          value: 'influenceLevelName',
          label: '影响程度',
          disabled: true
        }, {
          value: 'emergencyName',
          label: '紧急程度',
          disabled: true
        }, {
          value: 'priorityName',
          label: '优先级',
          disabled: true
        }, {
          value: 'projectTypeName',
          label: '项目',
          disabled: true
        }, {
          value: 'bugtypeName',
          label: '类型',
          disabled: true
        }],
        seachItems: {
        },
        tableData: [],
        startDate1Before: '',
        endDate1Before: '',
        queStatus: ''
      }
    },
    methods: {
      getDictionarys() {
      },
      getData() {
        var seachItems = {}
        seachItems.start_time = this.start_time ? this.start_time[0] : null
        seachItems.end_time = this.start_time ? this.start_time[1] : null
        seachItems.group = this.groupName
        if (this.start_time === null) {
          this.tableData = []
        } else {
          if ((this.startDate1Before !== this.start_time[0] || this.endDate1Before !== this.start_time[1]) || this.queStatus !== this.groupName) {
            this.tableData = []
            findtoMap(seachItems).then(r => {
              this.tableData = r.data.list
              this.startDate1Before = this.start_time[0]
              this.endDate1Before = this.start_time[1]
              this.queStatus = this.groupName
            })
          }
        }
      },
      handleFilter() {
        if (this.groupName !== 'currentStateName') {
          this.getData()
        }
        this.seachItems.start_time = this.start_time ? this.start_time[0] : null
        this.seachItems.end_time = this.start_time ? this.start_time[1] : null
        this.seachItems.group = this.groupName
        this.getDarw()
      },
      getDarw() {
        getEchars(this.seachItems).then(r => {
          console.log('Darw', r)
          var data = []
          for (const i in r.data.list) {
            var d = {}
            d.product = r.data.list[i].product
            d.总计 = r.data.list[i].quantity
            data.push(d)
          }
          // var that = this
          var series = []
          /* r.data.list.forEach(function(value, index) {
            series.push({ type: 'bar', itemStyle: that.itemsStyle })
          }) */
          this.darw(data, series)
        })
      },
      pickerChange() {
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
            data: ['总计']
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
          series: [{ type: 'bar', itemStyle: this.itemsStyle }]
        })
      }
    }
  }
</script>
