
<template>
  <div class="app-container">
    <el-row>
      <el-col style="margin-bottom: 10px;">
        <el-button type="primary" size="mini" @click="handleParent(model.dataList[0].template_id)">新增父级</el-button>
      </el-col>
    </el-row>
    <div class="filter-container">
      <el-card class="box-card" >
      <el-table :row-style="changeStyle"
                :key='id'
                :data="model.dataList"
                v-loading="demandLoading"
                element-loading-text="读取中……"
                border
                highlight-current-row
                style="width: 98%;margin-top: -5px;align: center"  resizable="true">
        <el-table-column header-align="center" prop="text" label="名称" width="350">
          <template slot-scope="scope">
            <span v-if="scope.row.child_code.length > 1" style="margin-left: 25px"></span>
            <span v-if="scope.row.child_code.length > 4" style="margin-left: 25px"></span>
            <span icon="el-icon-s-flag">{{scope.row.child_code + '、' + scope.row.child_name}}</span>
            <img v-if="scope.row.child_milestone === 1" src="../../assets/img/flag.png" style="margin-left: 10px;" >
          </template>
        </el-table-column>
        <el-table-column  align="center"  label="级次" width="250">
          <template slot-scope="scope">
            {{scope.row.child_level}}
          </template>
        </el-table-column>
        <el-table-column  :show-overflow-tooltip="true" align="center"  label="交付物">
          <template slot-scope="scope">
            {{scope.row.child_deliverables}}
          </template>
        </el-table-column>
       <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleCreate('add',scope.row)">添加子级</el-button>
            <el-button type="primary" size="mini" @click="handleUpdate('update',scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
    </div>
    <childVueDialog ref="childdialog" :restParentData="getChildList">
    </childVueDialog>
    </div>
</template>
<script>
import { childList } from '@/api/template'
import childVueDialog from '@/components/template/childEdit'
export default {
  name: 'child',
  components: {
    childVueDialog
  },
  data() {
    return {
      model: { dataList: [] },
      template_id: '',
      ISREVISE: 'NO'
    }
  },
  activated: function() {
    this.$store.commit('SET_SHOWPROJECT', false)
    var template = this.$route.params.template_id
    if (template === undefined || template === null) {
      this.$router.push({
        path: 'index'
      })
    } else {
      this.template_id = template
      this.getChildList(template)
    }
  },
  methods: {
    getChildList(id) {
      childList({ templateId: id }).then(r => {
        this.model.dataList = r.data.model
      })
    },
    changeStyle(row) {
      if (row.row.child_code.length === 1) {
        return { 'background-color': '#E0FFFF', 'height': '28px' }
      } else if (row.row.child_code.length > 1 && row.row.child_code.length <= 3) {
        return { 'height': '28px' }
      } else if (row.row.child_code.length > 4) {
        return { 'height': '28px' }
      }
    },
    handleUpdate(type, d) {
      this.$refs.childdialog.openDialog(type, d)
    },
    // 新增子级
    handleCreate(type, d) {
      if (d.child_code.length === 5) {
        this.$alert('当前只支持添加3级目录', '警告', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
          }
        })
      } else {
        this.$refs.childdialog.openDialog(type, d)
      }
    },
    // 新增父级
    handleParent(d) {
      this.$refs.childdialog.openDialogParent(d)
    }
  }
}
</script>

