<template>
  <div>
<el-dialog
  title='保存'
  :visible.sync="dialogVisible"
  width="30%"
>
  <el-form ref="child"  :rules="rules" :model="form" label-width="80px" size="mini">
    <el-form-item label="名称" prop="child_name">
      <el-input v-model="form.child_name"></el-input>
    </el-form-item>
    <el-form-item label="里程碑" prop="child_milestone">
      <el-select v-model="form.child_milestone">
        <el-option v-for="items in select"
                   :key="items.key"
                   :label="items.label"
                   :value="items.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="remarks" label="交付物">
      <el-input v-model="form.child_deliverables"
                :disabled="IFNEW"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item prop="remarks" label="备注">
      <el-input v-model="form.child_note"
                :disabled="IFNEW"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="submit()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import { saveChild } from '@/api/template'
export default {
  name: 'childVueDialog',
  props: ['restParentData'],
  data() {
    return {
      dialogVisible: false,
      model: { dataList: [] },
      form: {},
      select: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      rules: {
        child_name: [
          { required: true, message: '请输入名称' }
        ],
        child_milestone: [
          { required: true, message: '请输入里程碑' }
        ]
      }
    }
  },
  methods: {
    // 子级
    openDialog(type, data) {
      this.dialogVisible = true
      if (type === 'update') {
        this.form = Object.assign({}, data)
      } else {
        this.form = {}
        var subForm = Object.assign({}, this.form)
        subForm.template_id = data.template_id
        subForm.parent = data.child_id
        this.form = subForm
        this.$refs['child'].resetFields()
      }
    },
    // 父级
    openDialogParent(templateId) {
      this.dialogVisible = true
      this.form = {}
      var subForm = Object.assign({}, this.form)
      subForm.template_id = templateId
      subForm.parent = 0
      this.form = subForm
      this.$refs['child'].resetFields()
    },
    submit() {
      this.$refs['child'].validate((valid) => {
        if (valid) {
          saveChild({ model: this.form }).then(r => {
            this.$notify({
              type: r.data.status,
              title: '提示',
              message: r.data.info,
              duration: 1000
            })
            this.dialogVisible = false
            this.$props.restParentData(this.form.template_id)
          })
        }
      })
    }
  }
}
</script>

