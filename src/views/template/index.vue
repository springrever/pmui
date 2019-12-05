<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;height: 5px" class="filter-item" placeholder="模板编号"
                v-model="model.searchForm.items.template_code_eq">
      </el-input>
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;height: 5px" class="filter-item" placeholder="模板名称"
                v-model="model.searchForm.items.template_name_lk">
      </el-input>
      <el-button class="filter-item" size="mini" type="primary"  v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button type="primary" size="mini" @click="uploading()">导入模板</el-button>
      <el-table :row-style="changeStyle"
                :key='id'
                @row-dblclick="demandDblClick"
                :data="model.dataList"
                v-loading="demandLoading"
                element-loading-text="读取中……"
                border
                highlight-current-row
                style="width: 100%"  resizable="true">
        <el-table-column align="center"  label="模板编号">
          <template slot-scope="scope">
            {{scope.row.template_code}}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="模板名称">
          <template slot-scope="scope">
            {{scope.row.template_name}}
          </template>
        </el-table-column>
        <el-table-column  align="center"  label="创建人">
          <template slot-scope="scope">
            {{scope.row.createName}}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="创建时间">
          <template slot-scope="scope">
            {{scope.row.create_date}}
          </template>
        </el-table-column>
        <el-table-column width="100px" label="是否锁定" align="center" v-model="value">
          <template slot-scope="scope">
            <el-button v-if="scope.row.ref2 == 1" size="mini" type="success" @click="handleLock(scope.row,false)"><svg-icon v-if="scope.row.ref2 == 1" icon-class="lock"/>
            </el-button>
            <el-button v-if="scope.row.ref2 == 0" size="mini" @click="handleLock(scope.row,true)"><svg-icon v-if="scope.row.ref2 == 0" icon-class="unlock" />
            </el-button>
          </template>
        </el-table-column>
       <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="primary" size="mini" @click="selectChild(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
     <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="model.searchForm.page.nowPage" :page-sizes="[5,20,30, 50]" :page-size="model.searchForm.page.nowcont"
                       layout="total, sizes, prev, pager, next, jumper" :total="model.searchForm.page.count">
        </el-pagination>
      </div>
      <el-dialog v-dragDialog title="模板上传" :visible.sync="DisFileLoad" append-to-body width="60%">
        <!--:on-remove="handleRemove"-->
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="BaseUrl +  '/files/n/project_task/importProjectTask'"
          :on-preview="handlePreview"
          :headers="nowtoken"
          :onSuccess="uploadSuccess"
          :data="fileItems"
          name="fileList"
          :file-list="fileList"
          :auto-upload="true"
          accept=".xlsx,.excel,.xls">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </el-dialog>
    </div>
    <projectVueDialog ref="templatedialog" :restData="templateList">
    </projectVueDialog>
    </div>
</template>
<script>
import { templateList, updateLockTemplate } from '@/api/template'
import { initPage } from '@/utils/index'
import user from '@/store/modules/user'
import projectVueDialog from '@/components/template/indexEdit'
export default {
  name: 'index',
  components: {
    projectVueDialog
  },
  data() {
    return {
      model: { dataList: [] },
      DisFileLoad: false,
      BaseUrl: '',
      fileItems: '',
      temp: {}
    }
  },
  activated: function() {
    this.$store.commit('SET_SHOWPROJECT', false)
  },
  created() {
    this.BaseUrl = process.env.API_BASEURL
    initPage(this.model, templateList)
    this.templateList(1)
  },
  methods: {
    handleLock(row, ref2) {
      this.ref2 = ref2
      var model1 = {}
      model1.template_id = row.template_id
      model1.ref2 = row.ref2
      model1.update_by = user.state.usercode
      if (ref2) {
        model1.ref2 = 1
      } else {
        model1.ref2 = 2
      }
      updateLockTemplate({ model: model1 }).then((r) => {
        this.$notify({
          title: '成功',
          message: r.data.info,
          type: r.data.status,
          duration: 2000
        })
      })
      row.ref2 = ref2
    },
    templateList(count) {
      this.model.searchCurrent(count)
    },
    handleFilter() {
      this.templateList(1)
    },
    handleCreate() {
      this.$refs.templatedialog.openDialog()
    },
    handleUpdate(d) {
      this.$refs.templatedialog.openDialog(d)
    },
    selectChild(row) {
      this.$router.push({ name: 'child', params: { template_id: row.template_id, type: '查看' }})
    },
    handleSizeChange(val) {
      this.model.setPagecount(val)
      this.templateList(1)
    },
    handleCurrentChange(val) {
      this.templateList(val)
    },
    uploadSuccess(res) {
      this.$notify({
        title: '提示',
        message: res.info,
        type: res.status,
        duration: 2000
      })
      this.DisFileLoad = false
      this.templateList(1)
    },
    uploading() {
      this.DisFileLoad = true
      this.fileItems = {
        createBy: user.state.usercode
      }
    }
  }
}
</script>

