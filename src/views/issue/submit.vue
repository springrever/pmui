<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input  size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题编码"-->
                <!--v-model="beans.searchForm.items.bugcode_lk">-->
      <!--</el-input>-->
      <!--<el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="问题名称"-->
                <!--v-model="beans.searchForm.items.questionDes_lk">-->
      <!--</el-input>-->
      <!--&lt;!&ndash;<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="issueQuery.sort">&ndash;&gt;-->
        <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" size="mini" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>

    </div>
    <div ref="contenmenu" v-show="$store.getters.contenxtmenuFlag" class="contenmenu">
     <div class="contenmenuBut" @click="submitEdit(model)">编辑</div>
     <div class="contenmenuBut" v-if="model.currentState === '' || model.currentState === 'wt_uncommit' && userPower.issue_submit" @click="ContextSubmit()"><a>提交</a></div>
     <div class="contenmenuBut display" v-if="model.currentState !== '' && model.currentState !== 'wt_uncommit' || !userPower.issue_submit" @click="ContextSubmit()"><a>提交</a></div>
     <div class="contenmenuBut display">删除</div>
    </div>
    <el-table  @row-contextmenu="tableContextmenu" @filter-change="filterChage" :key="tableKey"  :data="beans.dataList" v-loading="issueLoading" element-loading-text="读取中……" border fit=true highlight-current-row style="width: 100%;margin-top: 7px"  resizable="true">
      <el-table-column align="center" label="CQ 单号" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.bugcode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="问题概述" width="280" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.questionDes}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="问题状态"
        columnKey="currentState"
        prop="currentStateName"
        min-width="100"
        :filters="options19"
        filter-placement="bottom-end" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            style="color: white; opacity: 0.7"
            :color="cellcColor(scope.row.currentState)"
            disable-transitions>{{scope.row.currentStateName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :filters="options"
        prop="systemName"
        columnKey="systemcode"
        filter-placement="bottom-end"
        align="center" label="应用系统" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.systemName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="moudleName"
        :filters="options2"
        columnKey="moudlecode"
        filter-placement="bottom-end"
        align="center" label="所属模块" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.moudleName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.submitTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        columnKey="influenceLevel"
        prop="influenceLevelName"
        :filters="options12"
        filter-placement="bottom-end"
        label="影响程度" min-width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.influenceLevelName}}</span>
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
    <el-dialog v-dragDialog title="" :visible.sync="dialogFormVisible" width="90%">

      <el-dialog v-dragDialog append-to-body :title="DisTitle" :visible.sync="DisVisible" width="450px">
        <el-table
          :data="distriData"
          height="300"
          border
          style="width: 401px"
          @row-dblclick="distriClick">
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
            width="150"
            :filters="filerRoleList" :filter-method="filterRole">
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog v-dragDialog append-to-body title="流转纪录" :visible.sync="RoamVisible" width="800px">
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
      <el-dialog v-dragDialog append-to-body title="查看" :visible.sync="imgVisible" width="100%">
        <img :src="BaseUrl +  '/files/n/getImage?id='+findImageId"/>
      </el-dialog>
      <el-dialog v-dragDialog title="附件上传" :visible.sync="DisFileLoad" append-to-body width="60%">
        <!--:on-remove="handleRemove"-->
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="BaseUrl +  '/files/upLoad'"
          :on-preview="handlePreview"
          :headers="nowtoken"
          :onSuccess="uploadSuccess"
          :data="fileItems"
          name="fileList"
          :file-list="fileList"
          :auto-upload="true">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>

      </el-dialog>
      <el-dialog v-dragDialog :title="yijianTitle + yijianUser" append-to-body :visible.sync="Disyijian" width="60%">
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
            <el-button size="mini" v-if="model.currentState === '' || model.currentState === 'wt_uncommit' && userPower.issue_save" @click="qSave('未提交')" type="primary">保存<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === '' || model.currentState === 'wt_uncommit' && userPower.issue_submit" :loading="submitLoading" @click="qSubmit('未分配')" type="primary">提交<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_yconfirm' && userPower.issue_ysconfirm" type="primary" @click="yqueren">用户确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_record" type="primary" @click="openRoam">流转纪录<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_build' && userPower.PGR" type="primary" @click="finished">完成<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" type="primary" @click="uploadClick">文件上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-form ref="form" :inline-message="true" :rules="rules" :model="model" label-suffix="" label-width="170px" label-position="left">
      <el-card class="box-card" style="margin-top: -8px">
        <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="问题概述" prop="questionDes" label-width="100px">
                <el-input :disabled = "model.currentState !== 'wt_uncommit'" size="mini" style="width:55em" v-model="model.questionDes"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="CQ 单号" prop="bugcode" label-width="100px">
                <el-input size="mini" disabled="true" style="width:12em" v-model="model.bugcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="应用系统"   prop="systemcode" label-width="100px">
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'" @change="systemSelectChange" style="width: 144px" v-model="model.systemcode" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.fd_code"
                    :label="item.fd_name"
                    :value="item.fd_code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属模块" prop="moudlecode" label-width="100px">
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'" @change="selectChange" style="width: 144px" v-model="model.moudlecode" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.dictionaryCode"
                    :label="item.dictionaryName"
                    :value="item.dictionaryCode">
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
                <el-select :disabled = "model.currentState !== 'wt_uncommit'" size="mini" style="width: 144px" v-model="model.influenceLevel" placeholder="请选择">
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
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'" style="width: 144px" v-model="model.emergency" placeholder="请选择">
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
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'" style="width: 144px" v-model="model.priority" placeholder="请选择">
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
              <el-form-item label="项目" prop="projectTypeCode" label-width="100px">
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'" style="width: 144px" v-model="model.projectTypeCode" placeholder="请选择">
                  <el-option
                    v-for="item in options23"
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
              <el-form-item label="IT责任人" prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.itResponsibleName"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="10" v-if="userPower.Cons">-->
              <!--<el-form-item label="关联需求" prop="ep_name" label-width="100px">-->
                <!--<el-input size="mini" style="width:12em" v-model="model.def1"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
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
                <el-select size="mini" :disabled = "model.currentState !== 'wt_uncommit'"   style="width: 144px" v-model="model.bugtype" placeholder="请选择">
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
                <!--<el-input size="mini" :disabled="true" style="width:12em" v-model="model.deptName"></el-input>-->
                <el-cascader
                  style="width: 144px"
                  size="mini"
                  :disabled = "model.currentState !== 'wt_uncommit'"
                  :clearable = "true"
                  :options="depts"
                  :filterable="true"
                  v-model="model.deptId"
                  @change="deptChange"
                  :props="deptsprops"
                  :show-all-levels="false"
                  change-on-select="true">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="提交人"  prop="ep_name" label-width="100px">
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.submitter"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="处理意见" prop="ep_name" label-width="100px">
                <el-select size="mini" :disabled="!userPower.Cons" style="width: 144px" v-model="model.handSuggestion" placeholder="请选择">
                  <el-option
                    :disabled = "model.currentState !== 'wt_uncommit'"
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
                <el-date-picker :disabled = "true" style="width: 165px;" size="mini" v-model="model.planResolutionTime" type="date" placeholder="请选择">
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
                <el-date-picker :disabled="true" style="width: 163px;" size="mini" v-model="model.submitTime" type="datetime" placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px">
        <el-row :gutter="24">
          <el-col :span="24">
            <span style="margin-left: 49%">问题详细描述</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 10px">
          <el-col :span="24">
            <el-form-item  prop="qusetionDetailDes" label-width="0px">
            <el-input
              type="textarea"
              :disabled = "model.currentState !== 'wt_uncommit'"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.qusetionDetailDes">
            </el-input>
            </el-form-item>
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
        <div v-for="lis in QuestionDealList">
          <el-row :gutter="24" style="margin-top: 10px">
            <el-col :span="24">
              <el-input
                type="textarea"
                disabled="true"
                :rows="4"
                placeholder="请输入内容"
                v-model="lis.context">
              </el-input>
            </el-col>
          </el-row>
        </div>
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
      </el-form>
      <el-card class="box-card" style="margin-top: -8px">
        <el-row>
          <el-col :span="24">
            <span style="margin-left: 49%">相关附件</span>
          </el-col>
          <el-col :span="24" style="margin-top: 20px"></el-col>
          <el-col :span="4" v-for="f in fileLists" :key="f" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" style="height: 300px">
              <img height="200px" width="160" v-if="f.suffix === '.doc'" src="../../assets/filelogo/文档.png" class="image"/>
              <img height="200px" width="260" v-else-if="f.suffix === '.jpeg' || f.suffix === '.PNG' || f.suffix === '.jpg'" :src="BaseUrl +  '/files/n/getImage?id='+f.fileId" class="image"/>
              <img height="200px" width="260" v-else-if="1 === 1" src="../../assets/filelogo/文本.png" class="image"/>
              <div style="padding: 14px;bottom: 0px" >
                <span>{{ f.fullName }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ f.createDate }}</time>
                  <div style="margin-top: 10px">
                    <el-button type="text" class="button" @click="deleteFile(f)">删除</el-button>
                    <el-button type="text" class="button" @click="queryFile(f)">查看</el-button>
                  </div>
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
  import { getDictionary, dictionaryQuery } from '@/api/dictionary'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { getSequence } from '@/api/sequence'
  import { getToken } from '@/utils/auth'
  import { filesQuery, deleteById } from '@/api/files'
  import { roamQuery } from '@/api/roam'
  import { getRoleByUser } from '@/api/user'
  import { parseTime } from '@/utils/index'
  import { bugDetailQuery, bugDetailInsert, bugDetailUpdateBySelective } from '@/api/bugDetail'
  import { initPage, findDepts } from '@/utils/index'
  import user from '@/store/modules/user'
  import { troubleshootQuery } from '@/api/troubleshoot'
  import dragDialog from '@/directive/el-dragDialog'
  import { finddeptnode } from '@/api/dept'
  export default {
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
      }
    },
    data() {
      return {
        deptsprops: { label: 'deptName', value: 'deptId' },
        depts: [],
        contenxtmenuFlag: false,
        soptions2: [],
        BaseUrl: '',
        searchItems: {},
        dialogSearchItems: false,
        filerRoleList: [{ text: '用户', value: 'USR' }, { text: '开发人员', value: 'PGR' }, { text: '经理', value: 'manager' }, { text: '实施顾问', value: 'Cons' }],
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
        userRole: [],
        options: [],
        options2: [],
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
        total: null,
        issues: [],
        model: { def2: null, moudlecode: '', deptId: '7' },
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
    created() {
      this.BaseUrl = process.env.API_BASEURL
      // var userPower = {}
      this.nowtoken = { authorization: 'LAP ' + getToken() }
      initPage(this.beans, bugDetailQuery)
      this.beans.searchForm.items.createUserId_eq = user.state.usercode
      this.beans.searchForm.items.currentState_neq = 'wt_close'
      this.getIssues(1)
      this.getUserInfo()
      /* user.state.authoritys.forEach(function(value, index) {
        userPower[value] = true
      })
      this.userPower = userPower */
      this.getDictionarys()
      this.getDepts()
    },
    mounted() {
      this.globalClick(this.moreSetupMenuRemove)
    },
    methods: {
      deptChange() {
        this.model.def3 = JSON.stringify(this.model.deptId)
        this.model.deptid = this.model.deptId[this.model.deptId.length - 1]
        console.log('deptId', this.model.deptid)
      },
      getDepts() {
        finddeptnode().then(response => {
          this.depts = response.data.list
          console.log('dept:', response.data.list)
        })
      },
      ContextSubmit() {
        this.qSubmit('未提交')
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
      },
      systemSelectChange() {
        var systemcode = this.model.systemcode
        var seachItems = {
          items: { fd_code_eq: systemcode },
          page: {}
        }
        dictionaryQuery(seachItems).then(r => {
          this.options2 = r.data.list
          if (this.options2.length === 0) {
            this.model.moudlecode = ''
          }
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
      deleteFile(f) {
        console.log(this.userRole)
        if (!this.userRole['admin']) {
          this.$notify({
            title: '提示',
            message: '只有管理员权限可以删除当前文件',
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
        this.DisFileLoad = false
      },
      queryFile(f) {
        if (f.suffix === '.jpeg' || f.suffix === '.PNG' || f.suffix === '.jpg') {
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
          // console.log('--->1', this)
        })
        // console.log('--->2', this.fileLists)
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
        this.yijianUser = ''
        this.yijianTitle = '完成备注'
        this.Disyijian = true
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
      openRoam() {
        roamQuery({ page: { nowPage: -1, nowCont: 1 }, items: { bugcode: this.model.bugcode }}).then(r => {
          this.roamList = r.data.list
          this.RoamVisible = true
        })
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
      distriClick(row, event, column) {
        // console.log(row)
        this.model.currentPerson = row.user_code
        this.yijianUser = ' — ' + row.userName
        if (this.DisTitle === '流转') {
          this.yijianTitle = '流转意见'
        } else {
          this.yijianTitle = '分配意见'
        }
        this.Disyijian = true
      },
      submitEdit(row) {
        // this.editIndex = temp.$index

        this.model = row
        var jsons = {}
        jsons.items = {}
        jsons.page = { nowPage: -1, nowcont: 1 }
        jsons.items.bug_code_eq = this.model.bugcode
        troubleshootQuery(jsons).then(r => {
          this.QuestionDealList = r.data.list
        })
        // this.model.deptid = user.state.deptid
        // this.model.deptName = user.state.deptname
        // console.log('fileList:', this.fileList)
        this.fileList = [] // 清空文件上传组件数据
        this.getFiles(this.model.bugcode)
        this.dialogFormVisible = true
        this.deptChange()
        // 绑定部门
        this.model.deptId = JSON.parse(row.def3)
        if (this.loginUser === '用户1') {
          this.userFlag = true
        }
      },
      selectChange() {
        // this.model.corpid = '龙旗科技'
        // this.model.deptid = '应用开发部'
        // alert(this.model.moudlecode)
      },
      qSave(currentState) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.model.submitter = user.state.usercode
            this.submitLoading = true // 保存按钮提交Loading开关
            // this.model.currentState = currentState
            // console.log('--->', this.model)
            if (this.model.bugid !== undefined) {
              this.model.submitTime = new Date()
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
              }, r => {
                this.getIssues(1)
                this.dialogFormVisible = false
                this.submitLoading = false
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
              }, r => {
                this.getIssues(1)
                this.dialogFormVisible = false
                this.submitLoading = false
              })
            }
          }
        })
      },
      qSubmit(currentState) {
        this.$refs['form'].validate((valid) => {
          this.model.submitter = user.state.usercode
          if (valid) {
            var roam = {}
            roam.bugcode = this.model.bugcode
            roam.roam_from = user.state.usercode
            if (this.model.itResponsible && this.model.itResponsible !== '') {
              this.model.currentState = 'wt_examine'
              roam.ref1 = '用户重新提交'
              this.model.currentPerson = this.model.itResponsible
              roam.roam_to = this.model.itResponsible
              roam.currentState_from = 'wt_uncommit'
              roam.currentState_to = 'wt_examine'
            } else {
              roam.currentState_from = 'wt_uncommit'
              roam.currentState_to = 'wt_commit'
              this.model.currentState = 'wt_commit'
              roam.ref1 = '用户提交BUG'
            }
            this.model.submitTime = new Date()
            if (this.model.bugid !== undefined) {
              this.submitLoading = true // 保存按钮提交Loading开关
              bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
              }, r => {
                this.getIssues(1)
                this.dialogFormVisible = false
                this.submitLoading = false
              })
            } else {
              this.submitLoading = true // 保存按钮提交Loading开关
              bugDetailInsert({ model: this.model, roam: roam }).then(r => {
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
              }, r => {
                this.getIssues(1)
                this.dialogFormVisible = false
                this.submitLoading = false
              })
            }
          }
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
        /* this.model.deptid = user.state.deptid
        this.model.deptName = user.state.deptname */
        // 获取当前登录人部门节点数组
        this.model.deptId = findDepts(this.depts, user.state.deptid)
        this.deptChange()
        // 初始化文件数组
        this.fileLists = []
        getSequence('CQ').then(r => {
          this.model.bugcode = r.data.code
          this.dialogFormVisible = true
        })
      },
      handleFilter() {
        // this.getIssues(1)
        this.dialogSearchItems = true
      },
      tohandleFilter() {
        this.dialogSearchItems = false
        // this.beans.searchForm.items.push.apply(this.beans.searchForm.items, this.searchItems)
        this.beans.searchForm.items = Object.assign(this.beans.searchForm.items, this.searchItems)
        this.beans.searchForm.items.currentState_neq = ''
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
          styleStr = '#FAFAD2'
        } else if (row.row.currentState === 'wt_commit') {
          styleStr = '#F5DEB3'
        } else if (row.row.currentState === 'wt_end') {
          styleStr = '#7FFFAA'
        } else {
          styleStr = '#E6E6FA'
        }
        // console.log('class', row.row)
        return { 'background-color': styleStr }
      },
      cellStyle(code) {
        var r = ''
        if (code === 'wt_uncommit') {
          r = 'danger'
        } else if (code !== 'wt_commit') {
          r = ''
        }
        return r
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
    background-color: khaki;
  }
  .time {
    font-size: 13px;
    color: mediumvioletred;
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
