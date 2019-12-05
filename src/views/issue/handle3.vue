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
    <div ref="contenmenu" v-show="contenxtmenuFlag" class="contenmenu">
      <div class="contenmenuBut" @click="submitEdit(model)">编辑</div>
    </div>
    <el-table @row-contextmenu="tableContextmenu" @filter-change="filterChage" :key="tableKey"  :data="beans.dataList" v-loading="issueLoading" element-loading-text="读取中……" border fit=true highlight-current-row style="width: 100%;margin-top: 7px"  resizable="true">
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
      <el-table-column
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
        :filters="options2"
        filter-placement="bottom-end"
        align="center" label="所属模块" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.moudleName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="问题状态"
        prop="currentStateName"
        min-width="100"
        :filters="options19"
        filter-placement="bottom-end" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            :type="cellStyle(scope.row.currentState)"
            disable-transitions>{{scope.row.currentStateName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
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
            width="150">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            width="150"
            :filters="filerRoleList" :filter-method="filterRole"
          >
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
          :action="BaseUrl +'/files/upLoad'"
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
            <!--model.currentState: 问题当前状态 -->
            <!--userPower: 角色权限-->
            <!--LastRoam: 最后一次流转纪录对象-->
            <el-button size="mini" v-if="(model.currentState === '' || model.currentState === 'wt_uncommit') && userPower.issue_save" :loading="submitLoading" @click="qSave('未提交')" type="primary">保存<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="(model.currentState === '' || model.currentState === 'wt_uncommit') && userPower.issue_submit" :loading="submitLoading" @click="qSubmit('未分配')" type="primary">提交<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_assign && model.currentState === 'wt_commit'" type="primary" @click="assignment" :loading="submitLoading">分派<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_claim && model.currentState === 'wt_commit'" type="primary" @click="claim" :loading="submitLoading">认领<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_kconfirm' && userPower.issue_kconfirm && nowUserCode === model.currentPerson" type="primary" @click="kqueren" :loading="submitLoading">开发确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="(model.currentState === 'wt_sconfirm' || model.currentState === 'wt_vc') && userPower.issue_sconfirm && nowUserCode === model.currentPerson" type="primary" @click="squeren" :loading="submitLoading">实施确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_yconfirm' && userPower.USR && nowUserCode === model.currentPerson" type="primary" @click="yqueren" :loading="submitLoading">用户确认<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="(model.currentState === 'wt_examine' || model.currentState === 'wt_kconfirm' || LastRoam.currentState_from === 'wt_build') && userPower.issue_goBack && nowUserCode === model.currentPerson" type="primary" @click="onback" :loading="submitLoading">退回<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_examine && model.currentState === 'wt_examine' && nowUserCode === model.currentPerson" type="primary" @click="shenhe" :loading="submitLoading">审核<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="(model.currentState === 'wt_vc' || model.currentState === 'wt_sconfirm') && nowUserCode === model.currentPerson && userPower.issue_wtroam && LastRoam.currentState_from !== 'wt_build'" type="primary" @click="roam" :loading="submitLoading">流转<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_record" type="primary" @click="openRoam" :loading="submitLoading">流转纪录<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="model.currentState === 'wt_build' && nowUserCode === model.currentPerson && userPower.issue_wtfinsh" type="primary" @click="finished">完成<i class="el-icon-upload el-icon--right" :loading="submitLoading"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_fileupload && nowUserCode === model.currentPerson" type="primary" @click="uploadClick">文件上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_goBackToUser && nowUserCode === model.currentPerson && model.currentState === 'wt_examine'" type="primary" @click="onrevoke">撤销<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" v-if="userPower.issue_closed && nowUserCode === model.currentPerson && model.currentState === 'wt_end'" type="primary" @click="toClosed">关闭<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-form ref="form" :rules="rules" :inline-message="true" :model="model" label-suffix="" label-width="170px" label-position="left">
        <el-card class="box-card" style="margin-top: -8px">
          <el-row type="flex" class="row-bg" style="height: 40px">
            <el-col :span="10">
              <el-form-item label="问题概述" prop="questionDes" label-width="100px">
                <el-input size="mini" style="width:55em" v-model="model.questionDes"></el-input>
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
              <el-form-item label="应用系统" prop="systemcode" label-width="100px">
                <el-select size="mini" @change="systemSelectChange" style="width: 144px" v-model="model.systemcode" placeholder="请选择">
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
                <el-select size="mini" @change="selectChange" style="width: 144px" v-model="model.moudlecode" placeholder="请选择">
                  <el-option
                    v-for="item in soptions2"
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
              <el-form-item label="项目" prop="projectTypeCode" label-width="100px">
                <el-select size="mini" style="width: 144px" v-model="model.projectTypeCode" placeholder="请选择">
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
                <el-select size="mini" :disabled="!userPower.Cons"   style="width: 144px" v-model="model.bugtype" placeholder="请选择">
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
                <el-input size="mini" :disabled="true" style="width:12em" v-model="model.submitterName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="处理意见" prop="ep_name" label-width="100px">
                <el-select size="mini" :disabled="!userPower.Cons" style="width: 144px" v-model="model.handSuggestion" placeholder="请选择">
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
                <el-date-picker :disabled="!userPower.Cons" style="width: 165px;" size="mini" v-model="model.planResolutionTime" type="datetime" placeholder="请选择">
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
          <div v-for="list in QuestionDealList">
            <el-row :gutter="24" style="margin-top: 10px">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  disabled="true"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="list.context">
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
              <img height="200px" width="160" v-if="f.suffix === '.txt'" src="../../assets/filelogo/文本.png" class="image"/>
              <img height="200px" width="260" v-else-if="f.suffix === '.jpeg' || f.suffix === '.png' || f.suffix === '.PNG' || f.suffix === '.jpg'" :src="BaseUrl + '/files/n/getImage?id='+f.fileId" class="image"/>
              <img height="200px" width="260" v-else-if="1 === 1" src="../../assets/filelogo/文档.png" class="image"/>
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
  import { getDictionary } from '@/api/dictionary'
  import { getSequence } from '@/api/sequence'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import { getToken } from '@/utils/auth'
  import { filesQuery, deleteById } from '@/api/files'
  import { roamQuery } from '@/api/roam'
  import { getRoleByUser } from '@/api/user'
  import { parseTime } from '@/utils/index'
  import { bugDetailQuery, bugDetailInsert, bugDetailUpdateBySelective } from '@/api/bugDetail'
  import { initPage } from '@/utils/index'
  import user from '@/store/modules/user'
  import { troubleshootQuery } from '@/api/troubleshoot'
  import dragDialog from '@/directive/el-dragDialog'
  import ElDialog from '../../../node_modules/element-ui/packages/dialog/src/component'
  export default {
    components: { ElDialog },
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
        contenxtmenuFlag: false,
        nowUserCode: '',
        userRole: [],
        BaseUrl: '',
        searchItems: {},
        dialogSearchItems: false,
        distriClickRole: '',
        currentPersonCode: '',
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
       if (this.userRole['Cons'] || this.userRole['manager']) {
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
      moreSetupMenuRemove() {
        this.contenxtmenuFlag = false
      },
      tableContextmenu(row, event) {
        event.preventDefault()
        this.model = row
        console.log(event)
        this.$refs['contenmenu'].style.left = event.pageX + 'px'
        this.$refs['contenmenu'].style.top = event.pageY + 'px'
        this.$refs['contenmenu'].style.width = '120px'
        this.contenxtmenuFlag = true
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
      filterChage(filters, ss) {
        for (var key in filters) {
          if (key === 'el-table_1_column_6') {
            this.beans.searchForm.items.currentState_in = filters[key]
          } else if (key === 'el-table_1_column_4') {
            this.beans.searchForm.items.systemcode_in = filters[key]
          } else if (key === 'el-table_1_column_5') {
            this.beans.searchForm.items.moudlecode_in = filters[key]
          } else if (key === 'el-table_1_column_7') {
            this.beans.searchForm.items.influenceLevel_in = filters[key]
          }
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
      shenhe() {
        this.DesText = ''
        this.yijianTitle = '审核意见'
        this.yijianUser = ''
        this.Disyijian = true
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
      toClosed() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_close'
        this.model.currentState = 'wt_close'
        roam.bugcode = this.model.bugcode
        roam.roam_from = ''
        roam.roam_to = ''
        roam.ref1 = '实施关闭'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '关闭成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      finished() {
        this.DesText = ''
        this.yijianTitle = '完成备注'
        this.yijianUser = ''
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
      findLastRoam() {
        roamQuery({ page: {}, items: { bugcode: this.model.bugcode }, OrderBy: 'roamTime desc' }).then(r => {
          this.LastRoam = r.data.list[0]
          // console.log('this.LastRoam', this.LastRoam)
        })
      },
      onback() {
        this.DesText = ''
        this.yijianTitle = '退回'
        this.yijianUser = ''
        this.Disyijian = true
      },
      kqueren() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_build'
        this.model.currentState = 'wt_build'
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = user.state.usercode
        roam.ref1 = '开发确认完成'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          // this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '确认成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      squeren() {
        this.DesText = ''
        this.yijianTitle = '确认备注'
        this.yijianUser = ''
        this.Disyijian = true
      },
      yqueren() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_end'
        this.model.currentState = 'wt_end'
        this.model.actualSettingTime = new Date()
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        // roam.suggestion = this.DesText
        roam.ref1 = '用户确认完成'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
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
        } else if (this.yijianTitle === '撤销意见') {
          this.revoke()
        }
      },
      tosqueren() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_yconfirm'
        this.model.currentState = 'wt_yconfirm'
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.submitter
        roam.suggestion = this.DesText
        roam.ref1 = '实施确认完成'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      tofinishde() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_sconfirm'
        this.model.currentState = 'wt_sconfirm'
        this.model.currentPerson = this.model.itResponsible
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.model.itResponsible
        roam.suggestion = this.DesText
        roam.ref1 = '问题流转'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      tolz() {
        // this.distriClickRole
        var roam = {}
        roam.currentState_from = this.model.currentState
        if (this.distriClickRole === 'Cons') {
          roam.currentState_to = 'wt_examine'
          this.model.currentState = 'wt_examine'
        } else {
          roam.currentState_to = 'wt_kconfirm'
          this.model.currentState = 'wt_kconfirm'
        }
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.currentPersonCode
        roam.suggestion = this.DesText
        roam.ref1 = '问题流转'
        this.submitLoading = true // 保存按钮提交Loading开关
        this.model.currentPerson = this.currentPersonCode
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      toshenhe() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_vc'
        this.model.currentState = 'wt_vc'
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.suggestion = this.DesText
        roam.ref1 = '问题审核'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          this.DisVisible = false
          this.Disyijian = false
          this.DesText = ''
          // this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      tofenpei() {
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_examine'
        this.model.currentState = 'wt_examine'
        this.model.currentPerson = this.currentPersonCode
        this.model.itResponsible = this.currentPersonCode
        roam.bugcode = this.model.bugcode
        roam.roam_from = user.state.usercode
        roam.roam_to = this.currentPersonCode
        roam.suggestion = this.DesText
        roam.ref1 = '问题分配'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
          // this.model = {}
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      toback() {
        var LastRoam = []
        roamQuery({ page: {}, items: { bugcode: this.model.bugcode }, OrderBy: 'roamTime desc' }).then(r => {
          LastRoam = r.data.list[0]
          var roam = {}
          // console.log('LastRoam', LastRoam)
          roam.bugcode = this.model.bugcode
          roam.roam_from = user.state.usercode
          roam.roam_to = LastRoam.roam_from
          roam.suggestion = this.DesText
          roam.ref1 = '退回问题'
          roam.currentState_from = this.model.currentState
          roam.currentState_to = LastRoam.currentState_from
          // if (this.model.currentState !== 'wt_kconfirm' && (LastRoam.currentState_from !== 'wt_vc' && LastRoam.currentState_to !== 'wt_examine')) {
          if (LastRoam.currentState_to === 'wt_examine' && LastRoam.currentState_from === 'wt_commit') {
            this.model.currentPerson = 'null'
            this.model.itResponsible = 'null'
          } else {
            this.model.currentPerson = LastRoam.roam_from
          }
          this.model.currentState = LastRoam.currentState_from
          this.submitLoading = true // 保存按钮提交Loading开关
          bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
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
            // this.model = {}
          }, r => {
            this.getIssues(1)
            this.dialogFormVisible = false
            this.submitLoading = false
          })
        })
        // console.log(LastRoam)
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
        var roam = {}
        roam.currentState_from = this.model.currentState
        roam.currentState_to = 'wt_examine'
        this.model.currentState = 'wt_examine'
        this.model.itResponsible = user.state.usercode
        this.model.currentPerson = user.state.usercode
        roam.bugcode = this.model.bugcode
        roam.roam_from = this.model.submitter
        roam.roam_to = user.state.usercode
        roam.ref1 = '实施认领'
        this.submitLoading = true // 保存按钮提交Loading开关
        bugDetailUpdateBySelective({ model: this.model, roam: roam }).then(r => {
          // this.dialogFormVisible = false // 问题弹出窗开关
          this.$notify({
            title: '成功',
            message: '认领成功',
            type: 'success',
            duration: 2000
          })
          this.getIssues(1)
          this.submitLoading = false
        }, r => {
          this.getIssues(1)
          this.dialogFormVisible = false
          this.submitLoading = false
        })
      },
      distriClick(row, event, column) {
        // console.log(row)
        this.currentPersonCode = row.user_code
        this.distriClickRole = row.role_code
        this.yijianUser = ' — ' + row.userName
        if (this.DisTitle === '流转') {
          this.yijianTitle = '流转意见'
        } else {
          this.yijianTitle = '分配意见'
        }
        this.Disyijian = true
      },
      assignment() {
        getRoleByUser({ items: { role_code_eq: 'Cons' }}).then(r => {
          // console.log(r.data.list)
          this.distriData = r.data.list
        })
        this.DisTitle = '分派'
        this.DisVisible = true
      },
      submitEdit(row) {
        // this.editIndex = temp.$index
        this.model = {}
        this.model = row
        // this.model.deptid = user.state.deptid
        // this.model.deptName = user.state.deptname
        // console.log('fileList:', this.fileList)
        this.fileList = [] // 清空文件上传组件数据
        var jsons = {}
        jsons.items = {}
        jsons.page = { nowPage: -1, nowcont: 1 }
        jsons.items.bug_code_eq = this.model.bugcode
        troubleshootQuery(jsons).then(r => {
          this.QuestionDealList = r.data.list
        })
        this.getFiles(this.model.bugcode)
        // 查询追后一次流转纪录
        this.findLastRoam()
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
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.submitLoading = true // 保存按钮提交Loading开关
            // this.model.currentState = currentState
            // console.log('--->', this.model)
            if (this.model.bugid !== undefined) {
              bugDetailUpdateBySelective({ model: this.model, roam: {}}).then(r => {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 2000
                })
                // this.model = {}
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
                // this.model = {}
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
          if (valid) {
            var roam = {}
            roam.bugcode = this.model.bugcode
            roam.roam_from = user.state.usercode
            // 判断是否含有IT负责人 有的话代表实施驳回的数据
            if (this.model.itResponsible && this.model.itResponsible !== '') {
              this.model.currentState = 'wt_examine'
              this.model.currentPerson = this.model.itResponsible
              roam.ref1 = '用户重新提交'
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
                // this.model = {}
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
                // this.model = {}
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
