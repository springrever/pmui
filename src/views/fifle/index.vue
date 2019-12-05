<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="后缀名"
                v-model="beans.searchForm.items.suffix_lk">
      </el-input>
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="备注"
                v-model="beans.searchForm.items.ref3_lk">
      </el-input>
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini"class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增模板</el-button>
      <el-table :data="beans.dataList" element-loading-text="读取中……" border highlight-current-row resizable="true">
        <el-table-column  align="center" label="文件名" >
          <template slot-scope="scope">
            <span>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="备注" >
          <template slot-scope="scope">
            <span>{{scope.row.ref3}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="后缀名" >
          <template slot-scope="scope">
            <span>{{scope.row.suffix}}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="关联文件类型" >
          <template slot-scope="scope">
            <span>{{scope.row.reftype}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="文件路径" >
          <template slot-scope="scope">
            <span>{{scope.row.route}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="带后缀名" >
          <template slot-scope="scope">
            <span>{{scope.row.fullName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建人" >
          <template slot-scope="scope">
            <span>{{scope.row.createby}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建时间" >
          <template slot-scope="scope">
            <span>{{scope.row.createDate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="uploading(scope.row)">上传</el-button>
            <el-button type="primary" size="mini" @click="download(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="beans.searchForm.page.nowPage" :page-sizes="[5,20,30, 50]" :page-size="beans.searchForm.page.nowcont"
                       layout="total, sizes, prev, pager, next, jumper" :total="beans.searchForm.page.count">
        </el-pagination>
      </div>

      <el-dialog v-dragDialog title="附件上传" :visible.sync="DisFileLoad" append-to-body width="60%">
        <!--:on-remove="handleRemove"-->
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="BaseUrl +  '/files/upLoad/moudel'"
          :on-preview="handlePreview"
          :headers="nowtoken"
          :onSuccess="uploadSuccess"
          :data="fileItems"
          name="fileList"
          :file-list="fileList"
          :auto-upload="true"
          accept=".xlsx,.excel,.xls">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </el-dialog>


      <el-dialog  v-dragDialog :title="titleName" :visible.sync="dialogFormVisible" >
          <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:60px;'>
            <el-form-item  label="文件名" prop="fileName">
              <el-input  v-model="temp.fileName"></el-input>
            </el-form-item>
            <el-form-item  label="备注">
              <el-input  v-model="temp.ref3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addFile()">确认</el-button>
          </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { filesQuery, addFiles } from '@/api/files'
  import { initPage } from '@/utils/index'
  import user from '@/store/modules/user'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      var checkFileName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'))
        } else if (value !== null) {
          var upFileName = value
          var index1 = upFileName.lastIndexOf('.')
          var index2 = upFileName.length
          var suffix = upFileName.substring(index1, index2)
          if (suffix !== '.xls' && suffix !== '.xlsx' && suffix !== '.exele') {
            callback(new Error('后缀名必须为.xls,.xlsx,.excle'))
          } else {
            callback()
          }
        }
      }
      return {
        beans: { dataList: [] },
        DisFileLoad: false,
        findImageId: '',
        imgVisible: false,
        BaseUrl: '',
        nowtoken: '',
        dialogFormVisible: false,
        temp: {
          fileName: '',
          suffix: '',
          reftype: '',
          route: '',
          fullName: '',
          createby: '',
          createDate: '',
          fileId: ''
        },
        titleName: '新增模板',
        fileItems: '',
        fileList: [],
        rules: {
          fileName: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkFileName, trigger: 'blur' }]
        }
      }
    },
    created() {
      this.BaseUrl = process.env.API_BASEURL
      initPage(this.beans, filesQuery)
      this.beans.searchForm.items.reftype_eq = 'template'
      this.getFifle(1)
      this.nowtoken = { authorization: 'LAP ' + getToken() }
    },
    methods: {
      getFifle(index) {
        this.userLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.userLoading = false
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getFifle(1)
      },
      handleCurrentChange(val) {
        this.getFifle(val)
      },
      handleFilter() {
        this.getFifle(1)
      },
      download(f) {
        console.log('f:', f)
        window.open(this.BaseUrl + '/files/n/getFile?id=' + f.fileId, '_blank')
        console.log('ffffffffffff', this.BaseUrl + '/files/upLoad/getFile?id=' + f.fileId, '_blank')
      },
      uploadSuccess() {
        // this.getFiles(this.model.fileId)
        console.log('coming in~~~~~~~~~~~', this.fileItems.items.reftype)
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
      },
      uploading(f) {
        // alert('111111111111111')
        this.DisFileLoad = true
        var items = {
          create_by: user.state.usercode,
          reftype: 'template',
          fileId: f.fileId,
          fullName: f.fullName
        }
        this.fileItems = {
          items: JSON.stringify(items)
        }
        console.log('yyyyyyyyyyyyyyy', JSON.stringify(items))
      },
      handleCreate() {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      addFile() {
        this.temp.createby = user.state.usercode
        // alert('111')
        // this.temp.createDate = new date()
        var upFileName = this.temp.fileName
        var index1 = upFileName.lastIndexOf('.')
        var index2 = upFileName.length
        var suffix = upFileName.substring(index1, index2)
        console.log('aaaaaaaa', suffix)

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var searchItems = { items: {}, page: {}}
            searchItems.items.fileName = this.temp.fileName
            filesQuery(searchItems).then((r) => {
              // alert(r.data.list.length)
              if (r.data.list.length === 0) {
                addFiles({ model: this.temp }).then((r) => {
                  this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.dialogFormVisible = false
                  this.getFifle(1)
                })
              } else {
                this.$notify({
                  title: '警告',
                  message: '用户编码不能重复',
                  type: 'warning',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }
</script>


