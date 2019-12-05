<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题编码"
                v-model="beans.searchForm.items.bugcode_lk">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题名称"
                v-model="beans.searchForm.items.questionDes_lk">
      </el-input>
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="issueQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>

    </div>
    <el-table :key="tableKey" :row-style="setRowClass" :data="beans.dataList" v-loading="issueLoading" element-loading-text="读取中……" border fit=true highlight-current-row style="width: 100%" height="600" resizable="true">
      <!--<el-table-column type="expand">-->
      <!--<template slot-scope="props">-->
      <!--<el-form label-position="left" inline>-->
      <!--<el-form-item label="问题详情">-->
      <!--<span>{{props.row.issue_details}}</span>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<el-tag style="margin-bottom:20px;">-->
      <!--<span>处理历史</span>-->
      <!--</el-tag>-->
      <!--<el-progress type="line" text-inside="true" :percentage="props.row.issue_rate"-->
      <!--stroke-width="20"></el-progress>-->
      <!--<el-table :data="props.row.history">-->
      <!--<el-table-column align="center" label="处理时间" width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span><i class="el-icon-time"></i>{{scope.row.handle_date | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
      <!--</template>-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="处理人" width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.handler}}</span>-->
      <!--</template>-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="处理说明" min-width="100">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.handle_desc}}</span>-->
      <!--</template>-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <!--</el-table>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="CQ 单号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.bugcode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="问题概述" width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.questionDes" placement="top">
            <span>{{scope.row.questionDes | gsfiters}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应用系统" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.systemName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属模块" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.moudleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题状态" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.currentStateName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="影响程度" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.influenceLevelName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini" @click="submitEdit(scope)">编辑
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
    <el-dialog title="" :visible.sync="dialogFormVisible" width="90%">
      <el-dialog append-to-body :title="DisTitle" :visible.sync="DisVisible" width="450px">
        <el-table
          :data="distriData"
          height="300"
          border
          style="width: 401px"
          @row-click="distriClick">
          <el-table-column
            prop="user_code"
            label="用户编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            width="150">
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog append-to-body title="流转纪录" :visible.sync="RoamVisible" width="800px">
        <el-table
          :data="roamList"
          height="300"
          border
          style="width: 740px">
          <el-table-column align="center" label="概述" width="181">
            <template slot-scope="scope">
              <span>{{scope.row.ref1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="流转从" width="99">
            <template slot-scope="scope">
              <span>{{scope.row.userNameForm}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="流转至" width="99">
            <template slot-scope="scope">
              <span>{{scope.row.userNameTO}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="意见" width="180">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" :content="scope.row.suggestion" placement="top">
                <span>{{scope.row.suggestion | gsfiters}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column align="center" label="流转时间" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.roamTime}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog append-to-body title="查看" :visible.sync="imgVisible" width="100%">
        <img :src="'http://172.24.8.39:8090/files/n/getImage?id='+findImageId"/>
      </el-dialog>
      <el-dialog title="附件上传" :visible.sync="DisFileLoad" append-to-body width="60%">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://172.24.8.39:8090/files/upLoad"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :headers="nowtoken"
          :onSuccess="uploadSuccess"
          :data="fileItems"
          name="fileList"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>

      </el-dialog>
      <el-dialog :title="yijianTitle" append-to-body :visible.sync="Disyijian" width="60%">
        <el-button size="mini" type="primary" @click="onswitch">确定<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-input
          style="margin-top: 5px"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="DesText">
        </el-input>
      </el-dialog>
      <el-row type="flex" class="row-bg" style="height: 40px">
        <el-col>
          <el-button-group>
            <el-button size="mini" v-if="model.currentState === '' || model.currentState === 'wt_uncommit' && userRoles.issue_save" @click="qSave('未提交')" type="primary">保存<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === '' || model.currentState === 'wt_uncommit' && userRoles.issue_submit" :loading="submitLoading" @click="qSubmit('未分配')" type="primary">提交<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userRoles.wt_assign && model.currentState === 'wt_commit'" type="primary" @click="assignment">分派<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userRoles.issue_claim && model.currentState === 'wt_commit'" type="primary" @click="claim">认领<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_sconfirm' && userRoles.SAP" type="primary" @click="squeren">实施确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_yconfirm' && userRoles.USR" type="primary" @click="yqueren">用户确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userRoles.issue_goBack && model.currentState === 'wt_examine'" type="primary" @click="onback">退回<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userRoles.issue_examine && model.currentState === 'wt_examine'" type="primary" @click="shenhe">审核<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_vc' || model.currentState === 'wt_sconfirm'" type="primary" @click="roam">流转<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userRoles.issue_record && model.currentState !== '' && model.currentState !== 'wt_uncommit'" type="primary" @click="openRoam">流转纪录<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_build' && userRoles.PGR" type="primary" @click="finished">完成<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" type="primary" @click="uploadClick">文件上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-card class="box-card" style="margin-top: -8px">
        <el-form ref="form" :model="model" label-suffix="" label-width="170px" label-position="left">
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="问题概述" prop="ep_name" label-width="100px">
                <el-input size="mini" style="width:55em" v-model="model.questionDes"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="CQ 单号" prop="ep_name" label-width="100px">
                <el-input size="mini" disabled="true" style="width:12em" v-model="model.bugcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="应用系统" prop="ep_name" label-width="100px">
                <el-select size="mini" style="width: 144px" v-model="model.systemcode" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属模块" prop="ep_name" label-width="100px">
                <el-select size="mini" @change="selectChange" style="width: 144px" v-model="model.moudlecode" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">

            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="影响程度" prop="ep_name" label-width="100px">
                <el-select size="mini" style="width: 144px" v-model="model.influenceLevel" placeholder="请选择">
                  <el-option
                    v-for="item in options12"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="紧急程度" prop="ep_name" label-width="100px">
                <el-select size="mini" style="width: 144px" v-model="model.emergency" placeholder="请选择">
                  <el-option
                    v-for="item in options11"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select></el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="优先级" prop="ep_name" label-width="100px">
                <el-select size="mini" style="width: 144px" v-model="model.priority" placeholder="请选择">
                  <el-option
                    v-for="item in options13"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="IT责任人" prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.itResponsibleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-if="userRoles.SAP">
              <el-form-item label="关联需求" prop="ep_name" label-width="100px">
                <el-input size="mini" style="width:12em" v-model="model.def1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="当前状态" prop="ep_name" label-width="100px">
                <el-select  :disabled="true" size="mini" style="width: 144px" v-model="model.currentState" placeholder="请选择">
                  <el-option
                    v-for="item in options19"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="当前处理人" prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.currentPersonName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="类型"  prop="ep_name" label-width="100px">
                <el-select size="mini" :disabled="!userRoles.SAP"   style="width: 144px" v-model="model.bugtype" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="所属公司"  prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.corpid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属部门"  prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.deptName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="提交人"  prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.submitter"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="处理意见" prop="ep_name" label-width="100px">
                <el-select size="mini" :disabled="!userRoles.SAP" style="width: 144px" v-model="model.handSuggestion" placeholder="请选择">
                  <el-option
                    v-for="item in options14"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item  label="计划解决时间" prop="ep_name" label-width="100px">
                <el-date-picker :disabled="!userRoles.SAP" style="width: 165px;" size="mini" v-model="model.planResolutionTime" type="datetime" placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="实际解决时间" prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.actualSettingTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="提交时间" prop="ep_name" label-width="100px">
                <el-date-picker style="width: 163px;" size="mini" v-model="model.submitTime" type="datetime" placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>

        </el-form>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px">
        <el-row :gutter="24">
          <el-col :span="24">
            <span style="margin-left: 49%">问题详细描述</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 10px">
          <el-col :span="24">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.qusetionDetailDes">
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 20px">
          <el-col :span="24">
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">

          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <span style="margin-left: 49%">问题处理说明</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 10px">
          <el-col :span="24">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.questionDeal">
            </el-input>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: -8px">
        <el-row>
          <el-col :span="24">
            <span style="margin-left: 49%">相关附件</span>
          </el-col>
          <el-col :span="24" style="margin-top: 20px"></el-col>
          <el-col :span="4" v-for="f in fileLists" :key="f" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" style="height: 300px">
              <img height="200px" width="160" v-if="f.suffix === '.txt'" src="../../assets/filelogo/文本.png" class="image"/>
              <img height="200px" width="260" v-else-if="f.suffix === '.jpeg' || f.suffix === '.png' || f.suffix === '.jpg'" :src="'http://172.24.8.39:8090/files/n/getImage?id='+f.fileId" class="image"/>
              <img height="200px" width="260" v-else-if="f.suffix === 'txt'" src="../../assets/filelogo/文档.png" class="image"/>
              <div style="padding: 14px;bottom: 0px" >
                <span>{{ f.fullName }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ f.createDate }}</time>
                  <el-button type="text" class="button" @click="queryFile(f)">查看</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 20px;margin-left: 60%">
          <el-col :span="12" style="text-align: right">
            <span>满意度:</span>
          </el-col>
          <el-col :span="12">

            <el-rate
              v-model="model.def2"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>


  </div>
</template>

<script>
  import { getDictionary } from '@/api/dictionary'
  import { getToken } from '@/utils/auth'
  import { filesQuery } from '@/api/files'
  import { roamQuery } from '@/api/roam'
  import { getRoleByUser } from '@/api/user'
  import { parseTime } from '@/utils/index'
  import { bugDetailQuery, bugDetailInsert, bugDetailUpdateBySelective } from '@/api/bugDetail'
  import { initPage } from '@/utils/index'
  import user from '@/store/modules/user'
  export default {
    name: 'submit',
    filters: {
      gsfiters: function(value) {
        if (value !== undefined && value.length > 10) {
          value = value.slice(0, 10) + '...'
        }
        return value
      }
    },
    data() {
      return {
        findImageId: '',
        imgVisible: false,
        fileItems: {},
        fileLists: [],
        nowtoken: {},
        beans: {
          dataList: []
        },
        userRoles: {},
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
        options3: [],
        options11: [],
        options12: [],
        options13: [],
        options14: [],
        options19: [],
        submitLoading: false,
        dialogFormVisible: false,
        DisFileLoad: false,
        tableKey: 0,
        total: null,
        issues: [],
        model: { def2: null },
        fileList: [],
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
        }
      }
    },
    created() {
      var userRoles = {}
      this.nowtoken = { authorization: 'LAP ' + getToken() }
      initPage(this.beans, bugDetailQuery)
      this.beans.searchForm.items.createUserId_eq = user.state.usercode
      this.getIssues(1)
      user.state.roles.forEach(function(value, index) {
        userRoles[value] = true
      })
      this.userRoles = userRoles
      this.getDictionarys()
    },
    methods: {
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
        if (f.suffix === '.jpeg' || f.suffix === '.png' || f.suffix === '.jpg') {
          this.findImageId = f.fileId
          this.imgVisible = true
        } else {
          window.open('http://172.24.8.39:8090/files/n/getFile?id=' + f.fileId, '_blank')
        }
      },
      getDictionarys() {
        getDictionary().then(r => {
          console.log('getDictionary-->', r.data)
          this.options = r.data.应用系统
          this.options2 = r.data.所属模块
          this.options3 = r.data.类型
          this.options14 = r.data.业务改善
          this.options13 = r.data.优先级
          this.options12 = r.data.影响程度
          this.options11 = r.data.紧急程度
          this.options19 = r.data.问题状态
        })
      },
      shenhe() {
        this.DesText = ''
        this.yijianTitle = '审核意见'
        this.Disyijian = true
      },
      getFiles(code) {
        filesQuery({ page: {}, items: { refId: code }}).then(r => {
          this.fileLists = r.data.list
          console.log('--->1', this)
        })
        console.log('--->2', this.fileLists)
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
      finished() {
        this.DesText = ''
        this.yijianTitle = '完成备注'
        this.Disyijian = true
      },
      roam() {
        getRoleByUser({ items: { role_code_eq: 'PGR' }}).then(r => {
          console.log(r.data.list)
          this.distriData = r.data.list
        })
        this.DesText = ''
        this.DisTitle = '流转'
        this.DisVisible = true
      },
      openRoam() {
        roamQuery({ page: { nowPage: -1, nowCont: 1 }, items: { bugcode: this.model.bugcode }}).then(r => {
          this.roamList = r.data.list
          this.RoamVisible = true
        })
      },
      onback() {
        this.DesText = ''
        this.yijianTitle = '退回'
        this.Disyijian = true
      },
      squeren() {
        this.DesText = ''
        this.yijianTitle = '确认备注'
        this.Disyijian = true
      },
      yqueren() {
        this.model.currentState = 'wt_end'
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        // roam.suggestion = this.DesText
        roam.ref1 = '用户确认完成'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '确认成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      onswitch() {
        if (this.yijianTitle === '退回') {
          this.toback()
        } else if (this.yijianTitle === '分配意见') {
          this.tofenpei()
        } else if (this.yijianTitle === '审核意见') {
          this.toshenhe()
        } else if (this.yijianTitle === '流转意见') {
          this.tolz()
        } else if (this.yijianTitle === '完成备注') {
          this.tofinishde()
        } else if (this.yijianTitle === '确认备注') {
          this.tosqueren()
        }
      },
      tosqueren() {
        this.model.currentState = 'wt_yconfirm'
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.submitter
        roam.suggestion = this.DesText
        roam.ref1 = '实施确认完成'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '确认成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      tofinishde() {
        this.model.currentState = 'wt_sconfirm'
        this.model.currentPerson = this.model.itResponsible
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.itResponsible
        roam.suggestion = this.DesText
        roam.ref1 = '问题流转'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '完成成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      tolz() {
        this.model.currentState = 'wt_build'
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.currentPerson
        roam.suggestion = this.DesText
        roam.ref1 = '问题流转'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '流转成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      toshenhe() {
        this.model.currentState = 'wt_vc'
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.suggestion = this.DesText
        roam.ref1 = '问题审核'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      tofenpei() {
        this.model.currentState = 'wt_examine'
        this.model.itResponsible = this.model.currentPerson
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.currentPerson
        roam.suggestion = this.DesText
        roam.ref1 = '问题分配'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '分配成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      toback() {
        this.model.currentState = 'wt_commit'
        this.model.itResponsible = ''
        this.model.currentPerson = ''
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.submitter
        roam.suggestion = this.DesText
        roam.ref1 = '实施退回问题'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.dialogFormVisible = false // 问题弹出窗开关
          this.DesText = ''
          this.$notify({
            title: '成功',
            message: '退回成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.Disyijian = false
          this.submitLoading = false
          this.model = {}
        })
      },
      issueUpdate() {
        this.$set(this.issues, this.editIndex, this.model)
        // this.issues[this.editIndex] = this.model vue无法响应数组修改的动态绑定,用上一句代替
        this.dialogFormVisible = false
        this.DisVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      },
      claim() {
        this.model.currentState = 'wt_examine'
        this.model.itResponsible = user.state.usercode
        this.model.currentPerson = user.state.usercode
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = this.model.submitter
        roam.roam_to = user.state.usercode
        roam.ref1 = '实施认领'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '认领成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
      },
      distriClick(row, event, column) {
        console.log(row)
        this.model.currentPerson = row.user_code
        if (this.DisTitle === '流转') {
          this.yijianTitle = '流转意见'
        } else {
          this.yijianTitle = '分配意见'
        }
        this.Disyijian = true
      },
      assignment() {
        getRoleByUser({ items: { role_code_eq: 'SAP' }}).then(r => {
          console.log(r.data.list)
          this.distriData = r.data.list
        })
        this.DisTitle = '分派'
        this.DisVisible = true
      },
      submitEdit(temp) {
        this.editIndex = temp.$index
        this.model = temp.row
        // this.model.deptid = user.state.deptid
        // this.model.deptName = user.state.deptname
        this.getFiles(this.model.bugcode)
        this.dialogFormVisible = true
        if (this.loginUser === '用户1') {
          this.userFlag = true
        }
      },
      selectChange() {
        // this.model.corpid = '龙旗科技'
        // this.model.deptid = '应用开发部'
      },
      qSave(currentState) {
        this.submitLoading = true // 保存按钮提交Loading开关
        // this.model.currentState = currentState
        console.log('--->', this.model)
        if (this.model.bugid !== undefined) {
          bugDetailUpdateBySelective({ model: this.model, roam: {}}).then(r => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.model = {}
            this.getIssues(1)
            this.submitLoading = false
            this.dialogFormVisible = false // 问题弹出窗开关
          })
        } else {
          bugDetailInsert({ model: this.model }).then(r => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getIssues(1)
            this.model = {}
            this.submitLoading = false
            this.dialogFormVisible = false // 问题弹出窗开关
          })
        }
      },
      qSubmit(currentState) {
        this.model.currentState = 'wt_commit'
        var roam = {}
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.ref1 = '用户提交BUG'
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.submitLoading = true // 保存按钮提交Loading开关
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          this.model = {}
        })
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
        this.model = {}
        this.model.currentState = 'wt_uncommit'
        this.model.deptid = user.state.deptid
        this.model.deptName = user.state.deptname
        this.model.submitter = this.loginUser
        if (this.loginUser === '用户1') {
          this.userFlag = true
        }
        this.model.submitTime = new Date()
        this.dialogFormVisible = true
      },
      handleFilter() {
        this.getIssues(1)
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
      setRowClass(row, index) {
        var styleStr = 'blanchedalmond'
        if (row.row.currentState === 'wt_uncommit') {
          styleStr = 'khaki'
        } else if (row.row.currentState === 'wt_commit') {
          styleStr = 'lightsalmon'
        }
        console.log('class', row.row)
        return { 'background-color': styleStr }
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      }
    }
  }
</script>

<style>
  .a{
    background-color: khaki;
  }
  .time {
    font-size: 13px;
    color: #999;
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
