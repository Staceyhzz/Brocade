/**
* 病例类型设计
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>病例类型设计</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required>
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item label="状态" prop="status" v-show="!key">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="1">启用</Radio>
            <Radio :label="0">禁用</Radio>
          </RadioGroup>
        </Form-item>
        <Form-item>
          <Button type="primary"  icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
          <Button type="primary"  icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
        </Form-item>
        <Form-item :label="$t('tagGroupEdit.label')" prop="detailList" required>
          <ul class="case-list">
            <draggable v-model="list" :options="{animation: 150}">
              <li v-for="(item, index) in list" :key='index'>{{item.name}}
                <span @click="remove(index)"><Icon type="close-round"></Icon></span>
              </li>
            </draggable>
          </ul>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal
      title="选择表单模板"
      v-model="modal"
      @on-ok="ok"
      class-name="vertical-center-modal">
      <Table height="350" stripe :columns="columns" :data="data" @on-selection-change='change' ref="selection"></Table>
    </Modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    components: {draggable},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        if (this.list.length === 0) {
          callback(new Error('请选择表单模板'));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        key: true,
        list: [],
        formValidate: {
          caseId: '',
          hospitalId: '',
          name: '',
          status: 1,
          createUserId: '',
          detailList: '',
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          detailList: [
            { validator: validateList, trigger: 'change' }
          ]
        },

        modal: false,
        selectList: [],
        data: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '表单名称',
            key: 'name'
          }
        ],
      }
    },
    computed: {

    },
    watch: {

    },
    created () {
      this.formValidate.hospitalId = localStorage.getItem('hospId');
      this.formValidate.createUserId = localStorage.getItem('userId');
      if(this.$route.query.id === 'add') {
        this.key = true;
        this.$store.dispatch('setPageLoading', 1);
      } else {
        this.key = false;
        this.formValidate.caseId = this.$route.query.id;
      }
      this.getFromList();
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByCaseIdSmartCaseMap.jhtml',
          data: {
            hospitalId: _vm.formValidate.hospitalId,
            caseId: _vm.formValidate.caseId
          },
          success: function(res){
            _vm.formValidate.status = res.data.content.status * 1;
            _vm.formValidate.name = res.data.content.name;
            _vm.list = res.data.content.detailList.map(item => {
              const index = _vm.data.findIndex(i => i.Id === item.templateId);
              return {
                Id: item.templateId,
                number: item.number * 1,
                name: index >= 0 ? _vm.data[index].name : ''
              };
            }).sort((x, y) => x.number - y.number) || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getFromList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/case/findByHospitalIdSmartCaseTempalte.jhtml',
          data: {
            hospitalId: _vm.formValidate.hospitalId
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.data = res.data.content.filter(item => item.status === '1') || [];
              if(!_vm.key) {
                _vm.getList();
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add() {
        this.$refs.selection.selectAll(false);
        this.modal = true;
      },
      clean() {
        this.list.splice(0);
      },
      remove(index) {
        this.list.splice(index, 1);
      },
      change(data) {
        this.selectList = data;
      },
      ok() {
        this.selectList.map(item => {
          const index = this.list.findIndex(l => l.Id === item.Id);
          if(index < 0) {
            this.list.push(item);
          }
        });
        this.$refs.formValidate.validateField('detailList');
      },
      save() {
        let _vm = this;
        let url = _vm.key ? 'guard-webManager/case/addCase.jhtml' : 'guard-webManager/case/updateByCaseIdSmartCase.jhtml';
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            const list = _vm.list.map((item, index) => {
              return {
                Id: item.Id,
                number: index + 1,
                caseId: _vm.key ? 0 : _vm.formValidate.caseId
              };
            });
            _vm.formValidate.detailList = JSON.stringify(list);
            _vm.saveLoad = true;
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$router.push('/caseManagementGroup');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1);
      },
    }
  }
</script>

<style lang="less" scoped>
  .case-list {
    li {
      position: relative;
      padding: 10px 50px;
      font-size: 12px;
      line-height: 1;
      span {
        position: absolute;
        right: 10px;
        top: 50%;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>




