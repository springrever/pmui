
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="所属系统"
                v-model="beans.searchForm.items.subordinate_systemName_lk">
      </el-input>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>
      <el-table :row-style="changeStyle"
                :key='tableKey'
                @row-dblclick="demandDblClick"
                :data="beans.dataList"
                v-loading="demandLoading"
                element-loading-text="读取中……"
                border
                highlight-current-row
                style="width: 100%;" height="490" resizable="true">
        <el-table-column  align="center" label="需求编号" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.demand_code}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="需求名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.demand_name}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="所属系统" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.subordinate_systemName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="紧急程度" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.emergencyName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="需求类型" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.demand_type}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="期望时间从" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.expected_time_from}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="期望时间至" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.expected_time_to}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :show-overflow-tooltip="true" label="需求背景" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.demand_context}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :show-overflow-tooltip="true" label="需求描述" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.demand_desc}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :show-overflow-tooltip="true" label="实现效果" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.realization_effect}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :show-overflow-tooltip="true" label="备注" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="审核状态" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.audit_status}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建人" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.createUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.create_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
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
  import { demandQuery } from '@/api/demand'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import DemandIndexDialog from '../customDialog/demandIndexDialog'
  export default {
    components: {
      DemandIndexDialog,
      ElTransfer },
    name: 'demandTable',
    filters: {
    },
    directives: {
      waves
    },
    data() {
      return {
        demandType: '',
        showNewPM: false,
        temp: {},
        tableKey: 0,
        total: null,
        demandLoading: true,
        beans: { dataList: [] }
      }
    },
    created() {
      initPage(this.beans, demandQuery)
      this.getDemand(1)
    },
    activated: function() {
      this.getDemand(1)
    },
    methods: {
      demandDblClick(row, event) {
        this.$store.commit('SET_ONDEMAND', row)
        this.$router.push({ name: 'demandedit', params: {
          id: row.demand_id,
          type: '编辑'
        }})
      },
      getDemand(index) {
        this.demandLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.demandLoading = false
      },
      handleFilter() {
        this.getDemand(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getDemand(1)
      },
      handleCurrentChange(val) {
        this.getDemand(val)
      },
      handleCreate() {
        this.$store.commit('SET_ONDEMAND', 'null')
        this.$router.push({ name: 'demandedit', params: {
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
        this.$store.commit('SET_ONDEMAND', row)
        this.$router.push({ name: 'demandedit', params: {
          id: row.demand_id,
          type: '编辑'
        }})
        this.temp = Object.assign({}, row) // copy obj
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      changeStyle(row, rowIndex) {
        if (row.row.ref2 === 'save') {
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
