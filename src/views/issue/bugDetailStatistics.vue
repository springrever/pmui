<template>
  <el-row >
    <el-col :span="24">
      <el-card style="margin: 20px;">
        <el-table
          @filter-change="filterChage"
          v-loading="issueLoading"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            align="center"
            prop="bugcode"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            :show-overflow-tooltip="true"
            prop="questionDes"
            label="摘要">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bugtypeName"
            columnKey="bugtype"
            min-width="100"
            :filters="options3"
            label="类型"
            filter-placement="bottom-end"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            align="center"
            prop="systemName"
            columnKey="systemcode"
            min-width="100"
            :filters="options"
            label="平台"
            filter-placement="bottom-end"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            align="center"
            prop="moudleName"
            columnKey="moudlecode"
            min-width="100"
            :filters="options2"
            label="模块"
            filter-placement="bottom-end"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            align="center"
            prop="currentStateName"
            columnKey="currentState"
            min-width="100"
            :filters="options19"
            label="问题状态"
            filter-placement="bottom-end"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag
                style="color: white;opacity: 0.7"
                :color="cellcColor(scope.row.currentState)"
                disable-transitions>{{scope.row.currentStateName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="currentPersonName"
            label="处理人">
          </el-table-column>
          <el-table-column
            align="center"
            prop="lastDay"
            label="持续天数">
          </el-table-column>
          <el-table-column
            align="center"
            prop="planResolutionTime"
            label="计划日期">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import { bugDetailQuery } from '@/api/bugDetail'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { getDictionary } from '@/api/dictionary'
  export default {
    components: {},
    data() {
      return {
        searchItems: { page: {}, items: {}},
        options: [],
        options3: [],
        options2: [],
        options19: [],
        tableData: []
      }
    },
    created() {
      this.getDataList()
      this.getDictionarys()
    },
    methods: {
      // 初始化数据
      getDataList() {
        bugDetailQuery(this.searchItems).then(r => {
          for (const i in r.data.list) {
            r.data.list[i].lastDay = formateDate(r.data.list[i].submitTime)
          }
          this.tableData = r.data.list
        })
      },
      getDictionarys() {
        getDictionary().then(r => {
          var seachItems = {
            items: {
              fd_type_eq: '应用系统'
            },
            page: {}
          }
          headerDictionaryQuery(seachItems).then(r => {
            this.options = r.data.list
          })
          this.options2 = r.data.所属模块
          this.options3 = r.data.类型
          this.options14 = r.data.业务改善
          this.options13 = r.data.优先级
          this.options12 = r.data.影响程度
          this.options11 = r.data.紧急程度
          this.options19 = r.data.问题状态
          this.options23 = r.data.项目
        })
      },
      filterChage(filters) {
        for (var key in filters) {
          this.searchItems.items[key + '_in'] = filters[key]
        }
        this.getDataList()
      },
      // 调整按钮颜色
      cellcColor(code) {
        var r = ''
        if (code === 'wt_build') { // 开发中
          r = 'darkturquoise'
        } else if (code === 'wt_yconfirm') { // 待用户确认
          r = 'darkturquoise'
        } else if (code === 'wt_close') { // 已关闭
          r = 'gray'
        } else if (code === 'wt_sconfirm') { // 待实施确认
          r = 'darkturquoise'
        } else if (code === 'wt_uncommit') { // 未提交
          r = 'LightBlue'
        } else if (code === 'wt_vc') { // 审核完成
          r = 'deepskyblue'
        } else if (code === 'wt_end') { // 完成
          r = 'dodgerblue'
        } else if (code === 'wt_kconfirm') { // 待开发确认
          r = 'darkturquoise'
        } else if (code === 'wt_examine') { // 待审核
          r = 'red'
        } else if (code === 'wt_commit') { // 待分配
          r = 'red'
        } else if (code === 'wt_demand') { // 已转需求
          r = 'gray'
        }
        return r
      }
    }
  }
  function formateDate(value) {
    var r
    if (value !== undefined && value.length > 0) {
      var now = new Date().getTime()
      var end = new Date(value).getTime()
      console.log(now)
      console.log(end)
      console.log(now - end)
      r = (now - end) / 86400000
      r = r.toFixed(1)
    } else {
      r = '0'
    }
    return r
  }
</script>
