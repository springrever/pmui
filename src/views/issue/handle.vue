<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题编码"-->
                <!--v-model="beans.searchForm.items.bugcode_lk">-->
      <!--</el-input>-->
      <!--<el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题名称"-->
                <!--v-model="beans.searchForm.items.questionDes_lk">-->
      <!--</el-input>-->
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="issueQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"-->
                 <!--icon="el-icon-edit">新增-->
      <!--</el-button>-->

    </div>
    <div ref="contenmenu" v-show="$store.getters.contenxtmenuFlag" class="contenmenu">
      <div class="contenmenuBut" @click="submitEdit(model)">编辑</div>
      <div class="contenmenuBut display">删除</div>
    </div>
    <el-table @row-contextmenu="tableContextmenu" @filter-change="filterChage" :key="tableKey"  :data="beans.dataList" v-loading="issueLoading" element-loading-text="读取中……" border fit=true highlight-current-row style="width: 100%;margin-top: 7px"  resizable="true">
      <el-table-column align="center" label="CQ 单号" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.bugcode}}</span>
        </template>
      </el-table-column>

      <el-table-column
        columnKey="influenceLevel"
        prop="influenceLevel"
        :filters="options12"
        filter-placement="bottom-end"
        label="影响程度" min-width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.influenceLevelName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        columnKey="systemcode"
        :filters="options"
        prop="systemName"
        filter-placement="bottom-end"
        align="center" label="应用系统" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.systemName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="moudleName"
        columnKey="moudlecode"
        :filters="options2"
        filter-placement="bottom-end"
        align="center" label="所属模块" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.moudleName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="问题概述" width="280" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.questionDes}}</span>
        </template>
      </el-table-column>
      <el-table-column
        columnKey="currentState"
        label="问题状态"
        prop="currentStateName"
        min-width="100"
        :filters="options19"
        filter-placement="bottom-end" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            style="color: white;opacity: 0.7"
            :color="cellcColor(scope.row.currentState)"
            disable-transitions>{{scope.row.currentStateName}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提交时间" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.submitTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交人" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.submitterName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini" @click="submitEdit(scope.row)">编辑
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
    <!--  -->
    <!--  -->
    <el-dialog title="查询" :visible.sync="dialogSearchItems" width="60%">
      <!--this.options = r.data.应用系统-->
      <!--this.options2 = r.data.所属模块-->
      <!--this.options3 = r.data.类型-->
      <!--this.options14 = r.data.业务改善-->
      <!--this.options13 = r.data.优先级-->
      <!--this.options12 = r.data.影响程度-->
      <!--this.options11 = r.data.紧急程度-->
      <!--this.options19 = r.data.问题状态-->
      <div style="margin-top: 12px">
        <el-row :gutter="24">
          <el-col :span="8">
            <input style="width: 82%" class="el-input__inner" placeholder="CQ单号" v-model="searchItems.bugcode_lk"/>
          </el-col>
          <el-col :span="8">
            <input style="width: 82%" class="el-input__inner" placeholder="问题概述" v-model="searchItems.questionDes_lk"/>
          </el-col>
          <el-col :span="8">
            <input style="width: 82%" size="mini" class="el-input__inner" placeholder="问题详细描述" v-model="searchItems.qusetionDetailDes_lk"/>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 12px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-select
              v-model="searchItems.systemcode_in"
              multiple
              collapse-tags
              placeholder="应用系统">
              <el-option
                v-for="item in options"
                :key="item.fd_code"
                :label="item.fd_name"
                :value="item.fd_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="searchItems.bugtype_in"
              multiple
              collapse-tags
              placeholder="类型">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="searchItems.moudlecode_in"
              multiple
              collapse-tags
              placeholder="所属模块">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 12px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-select
              v-model="searchItems.handSuggestion_in"
              multiple
              collapse-tags
              placeholder="处理意见">
              <el-option
                v-for="item in options14"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="searchItems.priority_in"
              multiple
              collapse-tags
              placeholder="优先级">
              <el-option
                v-for="item in options13"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="searchItems.influenceLevel_in"
              multiple
              collapse-tags
              placeholder="影响程度">
              <el-option
                v-for="item in options12"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 12px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-select
              v-model="searchItems.emergency_in"
              multiple
              collapse-tags
              placeholder="紧急程度">
              <el-option
                v-for="item in options11"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="searchItems.currentState_in"
              multiple
              collapse-tags
              placeholder="问题状态">
              <el-option
                v-for="item in options19"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
      </div>
      <div class="filter-container" style="padding: 20px">
        <el-button class="filter-item" style="float: right" size="mini" type="primary" v-waves icon="el-icon-search" @click="tohandleFilter">查询</el-button>
      </div>
    </el-dialog>
    <customdialog ref="myChild"
                  :fileList = 'fileList'
                  :QuestionDealList = 'QuestionDealList'
                  :getIssues = 'getIssues'
                  v-on:childByValue="childByValue"></customdialog>

  </div>
</template>

<script>
  import { getDictionary } from '@/api/dictionary'
  import { getSequence } from '@/api/sequence'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { getToken } from '@/utils/auth'
  import { filesQuery, deleteById } from '@/api/files'
  import { getRoleByUser } from '@/api/user'
  import { parseTime } from '@/utils/index'
  import { bugDetailQuery, bugDetailUpdateBySelective } from '@/api/bugDetail'
  import { initPage } from '@/utils/index'
  import user from '@/store/modules/user'
  import { troubleshootQuery } from '@/api/troubleshoot'
  import dragDialog from '@/directive/el-dragDialog'
  import ElDialog from '../../../node_modules/element-ui/packages/dialog/src/component'
  import Customdialog from '../customDialog/CustomDialog'
  export default {
    components: {
      Customdialog,
      ElDialog },
    name: 'submit',
    directives: {
      dragDialog
    },
    filters: {
      gsfiters: function(value) {
        if (value !== undefined && value.length > 10) {
          value = value.slice(0, 10) + '...'
        }
        return value
      },
      moudlefilter: function(value) {
        console.log('value:', value)
        return value
      }
    },
    data() {
      return {
        isShow: false,
        itemData: [],
        fileList: [],
        nowUserCode: '',
        userRole: [],
        BaseUrl: '',
        searchItems: {},
        dialogSearchItems: false,
        distriClickRole: '',
        currentPersonCode: '',
        filerRoleList: [{ text: '用户', value: 'USR' }, { text: '开发人员', value: 'PGR' }, { text: '经理', value: 'manager' }, { text: '实施顾问', value: 'SAP' }],
        QuestionDealList: [],
        yijianUser: '',
        findImageId: '',
        imgVisible: false,
        fileItems: {},
        fileLists: [],
        nowtoken: {},
        beans: {
          dataList: []
        },
        userPower: {},
        Disyijian: false,
        RoamVisible: false,
        roamList: [],
        yijianTitle: '',
        editIndex: 0,
        DesText: null,
        DisTitle: '',
        distriData: [{
          id: '1',
          name: '实施1',
          deptName: '实施部'
        }, {
          id: '2',
          name: '胡木松',
          deptName: '实施部'
        }],
        DisVisible: false,
        userFlag: false,
        loginUser: '用户1',
        options: [],
        options2: [],
        soptions2: [],
        options3: [],
        options11: [],
        options12: [],
        options13: [],
        options14: [],
        options19: [],
        options23: [],
        submitLoading: false,
        dialogFormVisible: false,
        DisFileLoad: false,
        tableKey: 0,
        LastRoam: {},
        total: null,
        issues: [],
        model: { def2: null, bugcode: '' },
        issueLoading: true,
        issueQuery: {
          page: 1,
          limit: 20,
          issue_code: undefined,
          issue_name: undefined,
          sort: '+issue_code'
        },
        sortOptions: [{ label: '编码正序', key: '+issue_code' }, { label: '编码倒叙', key: '-issue_code' }],
        temp: {
          issueid: undefined,
          issue_code: '',
          issue_name: '',
          issue_desc: '',
          issue_memo: '',
          issue_details: ''
        },
        rules: {
          questionDes: [
            { required: true, message: '请输入问题概述', trigger: 'blur' }
          ],
          bugcode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          systemcode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          moudlecode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          qusetionDetailDes: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    activated() {
      this.getIssues()
    },
    created() {
      initPage(this.beans, bugDetailQuery) // 封装分页方法
      // 获取当前登录人code 在页面使用
      this.nowUserCode = user.state.usercode
      // 获取系统Host
      this.BaseUrl = process.env.API_BASEURL
      this.nowtoken = { authorization: 'LAP ' + getToken() }
      // 获取用户角色和权限
      this.getUserInfo()
      // 查询条件
      if (!this.userRole['admin']) {
        this.beans.searchForm.menu = 'handle'
        this.beans.searchForm.userCode = user.state.usercode
      } else {
        this.beans.searchForm.items = {}
      }
      // 当前处理人是登录人
      /* if (!this.userRole['admin']) {
        this.beans.searchForm.items.a_open = '1'
        this.beans.searchForm.items.currentPerson_eq = user.state.usercode
        // 封装查询条件 当有实施顾问角色或者经理角色时
        if (this.userRole['SAP'] || this.userRole['manager']) {
          this.beans.searchForm.items.a_or = '1'
          this.beans.searchForm.items.currentState_eqor = 'wt_commit'
          this.beans.searchForm.items.itResponsible_eqor = user.state.usercode
          this.beans.searchForm.items.b_or = '1'
          this.beans.searchForm.items.itResponsible_null = '1'
          this.beans.searchForm.items.A_closerOr = '1'
          this.beans.searchForm.items.B_closerOr = '1'
        }
        this.beans.searchForm.items.S_closerOr = '1'
      } */
      this.getIssues(1) // 查询第一页
      this.getDictionarys() // 获取数据字典
    },
    mounted() {
      this.globalClick(this.moreSetupMenuRemove)
    },
    methods: {
      childByValue: function(childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue
      },
      moreSetupMenuRemove() {
        this.$store.commit('SET_CONTENXTMENUFLAG', false)
      },
      tableContextmenu(row, event) {
        event.preventDefault()
        this.model = row
        this.$refs['contenmenu'].style.left = event.pageX + 'px'
        this.$refs['contenmenu'].style.top = event.pageY + 'px'
        this.$refs['contenmenu'].style.width = '120px'
        this.$store.commit('SET_CONTENXTMENUFLAG', true)
        this.isShow = false
      },
      systemSelectChange() {
        var systemcode = this.model.systemcode
        this.soptions2 = this.options2.filter(function(item, index, arr) {
          console.log('item', item)
          if (item.fd_code === systemcode) {
            return true
          } else {
            return false
          }
        })
        // this.model.moudlecode = ''
        if (this.soptions2.length === 0) {
          this.model.moudlecode = ''
        }
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
      handleFilter() {
        this.dialogSearchItems = true
      },
      tohandleFilter() {
        this.dialogSearchItems = false
        // this.beans.searchForm.items.push.apply(this.beans.searchForm.items, this.searchItems)
        this.beans.searchForm.items = Object.assign(this.beans.searchForm.items, this.searchItems)
        this.getIssues(1)
      },
      onrevoke() {
        this.DesText = ''
        this.yijianTitle = '撤销意见'
        this.yijianUser = ''
        this.Disyijian = true
      },
      revoke() {
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.submitter
        roam.suggestion = this.DesText
        roam.ref1 = '问题撤销'
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_uncommit'
        this.model.currentPerson = 'null'
        this.model.currentState = 'wt_uncommit'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.dialogFormVisible = false // 问题弹出窗开关
          this.DesText = ''
          this.$notify({
            title: '成功',
            message: '撤销成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.Disyijian = false
          this.submitLoading = false
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      filterRole(value, row) {
        return row.role_code === value
      },
      filterChage(filters) {
        console.log(filters)
        for (var key in filters) {
          console.log('key--->', key)
          this.beans.searchForm.items[key + '_in'] = filters[key]
          /* if (key === 'influenceLevel') {
            this.beans.searchForm.items.influenceLevelName_in = filters[key]
          } */
        }
        // console.log('--------->', this.beans.searchForm.items)
        this.getIssues(1)
      },
      deleteFile(f) {
        console.log(f)
        if (f.createby !== user.state.usercode && !this.userRole['admin']) {
          this.$notify({
            title: '提示',
            message: '只有当前文件上传人 或者 管理员权限可以删除当前文件',
            type: 'error',
            duration: 4000
          })
        } else {
          deleteById(f.fileId).then(r => {
            this.$notify({
              title: r.data.type,
              message: r.data.info,
              type: r.data.type,
              duration: 2000
            })
            if (r.data.type === 'success') {
              this.getFiles(this.model.bugcode)
            }
          }, r => {
            this.getIssues(1)
            this.dialogFormVisible = false
            this.submitLoading = false
          })
        }
      },
      uploadSuccess() {
        this.getFiles(this.model.bugcode)
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
      },
      queryFile(f) {
        if (f.suffix === '.jpeg' || f.suffix === '.png' || f.suffix === '.PNG' || f.suffix === '.jpg') {
          this.findImageId = f.fileId
          this.imgVisible = true
        } else {
          window.open(this.BaseUrl + '/files/n/getFile?id=' + f.fileId, '_blank')
        }
      },
      getDictionarys() {
        getDictionary().then(r => {
          // console.log('getDictionary-->', r.data)
          // this.options = r.data.应用系统
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
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      getFiles(code) {
        filesQuery({ page: {}, items: { refId: code }}).then(r => {
          this.fileLists = r.data.list
        })
      },
      uploadClick() {
        this.DisFileLoad = true
        var items = {
          create_by: user.state.usercode,
          refId: this.model.bugcode,
          reftype: 'BugDetail'
        }
        this.fileItems = {
          items: JSON.stringify(items)
        }
      },
      roam() {
        var seachItems = {}
        seachItems.items = {}
        if (this.model.currentState === 'wt_vc') {
          seachItems.items.role_code_in = ['PGR', 'Cons']
        } else if (this.model.currentState === 'wt_sconfirm') {
          seachItems.items.role_code_eq = 'PGR'
        }
        getRoleByUser(seachItems).then(r => {
          // console.log(r.data.list)
          this.distriData = r.data.list
        })
        this.DesText = ''
        this.DisTitle = '流转'
        this.DisVisible = true
      },
      submitEdit(row) {
        var that = this
        that.fileList = []
        var seachItem = {
          page: {},
          items: { 'bugcode_eq': row.bugcode }
        }
        bugDetailQuery(seachItem).then(r => {
          that.itemData = r.data.list[0]
          /* that.$refs.myChild.getFiles(that.itemData.bugcode)
          that.$refs.myChild.propsModel(that.itemData)
          that.$refs.myChild.findLastRoam() */
          that.$refs.myChild.doubleclick(that.itemData)
          that.isShow = true
          that.$refs.myChild.propsDialogFormVisible(that.isShow)
          // 查询追后一次流转纪录
          var jsons = {}
          jsons.items = {}
          jsons.page = { nowPage: -1, nowcont: 1 }
          jsons.items.bug_code_eq = that.itemData.bugcode
          troubleshootQuery(jsons).then(r => {
            that.QuestionDealList = r.data.list
          })
        })
      },
      selectChange() {
        // this.model.corpid = '龙旗科技'
        // this.model.deptid = '应用开发部'
      },
      add() {
        this.dialogFormVisible = true
      },
      beforeRemove(file, fileList) {
        return this.$confirm('确定移除 ${ file.name }？')
      },
      getIssues(index) {
        this.issueLoading = true
        this.beans.searchCurrent(index)
        this.issueLoading = false
      },
      handleCreate() {
        // this.model = {}
        this.model.currentState = 'wt_uncommit'
        this.model.deptid = user.state.deptid
        this.model.deptName = user.state.deptname
        this.model.submitter = this.loginUser
        if (this.loginUser === '用户1') {
          this.userFlag = true
        }
        getSequence('CQ').then(r => {
          this.model.bugcode = r.data.code
          this.dialogFormVisible = true
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
      cellStyle(code) {
        var r = ''
        if (code === 'wt_commit') {
          r = 'danger'
        } else if (code !== 'wt_commit') {
          r = ''
        }
        return r
      },
      rowStyle(row, index) {
        var styleStr = '#66B1FF'
        if (row.row.currentState === 'wt_commit') {
          styleStr = '#99CBFF'
        }
        // console.log('class', row.row)
        return { 'background': styleStr }
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList)
      },
      handlePreview(file) {
        // console.log(file)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getIssues(1)
      },
      handleCurrentChange(val) {
        this.getIssues(val)
      },
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
</script>

<style>
  .a{
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: gold;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
