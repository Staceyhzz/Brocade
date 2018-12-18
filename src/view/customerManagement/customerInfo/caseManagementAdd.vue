/** 
 * 添加电子病例 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>添加用户病例</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('medicalRecordAdd.label2')" prop="caseNumber" required>
          <Input v-model.trim="formValidate.caseNumber" :placeholder="$t('placeholderPublic.input')" style='width: 300px' :maxlength='20' @on-blur="valid"></Input>
          <span class='mes'>{{$t('medicalRecordAdd.label3')}}</span>
        </Form-item>
        <Form-item label="病例类型" prop="caseId" required>
          <Select v-model="formValidate.caseId" style="width:300px">
            <Option v-for="(item, index) in groupList" :value="item.Id" :key="index">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="备注" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" placeholder="请输入备注"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>下一步</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateNo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写病历号'));
        }
        if(!this.noKey) {
          callback(new Error('病历号已存在'));
        }
        callback();
      };
      const validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择病例类型'));
        } else {
          callback();
        }
      };
      return {
        formValidate: {
          customerName: '',
          customerId: '',
          caseNumber: '',
          remark: '',
          caseId: '',
          hospitalId: '',
        },
        saveLoad: false,
        noKey: true,
        groupList: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.zt'),
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toChoose(params.row)
                    }
                  }
                }, this.$t('selectMedicalRecord.btn'))
              ])
            }
          }
        ],
        data: [],
        ruleForm: {
          caseNumber: [{
            validator: validateNo,
            trigger: 'blur'
          }],
          caseId: [{
            validator: validateId,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.formValidate.customerName = sessionStorage.getItem('cusName');
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.formValidate.hospitalId = localStorage.getItem('hospId');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByCaseAuthAndCaseNumber.jhtml',
          data: {
            customerId: _vm.formValidate.customerId,
            hospitalId: _vm.formValidate.hospitalId
          },
          success: function (res) {
            _vm.formValidate.caseNumber = res.data.content.no || '';
            _vm.getList();
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/case/findByAllSmartCaseList.jhtml',
          data: {
            hospitalId: localStorage.getItem('hospId')
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.groupList = res.data.content.filter(item => item.status === '1') || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      valid() {
        let _vm = this;
        if(_vm.formValidate.caseNumber) {
          _vm.$http.get({
            url: 'guard-webManager/case/findByCaseNumberSmartCaseNumberMap.jhtml',
            data: {
              hospitalId: _vm.formValidate.hospitalId,
              caseNumber: _vm.formValidate.caseNumber
            },
            success: function(res){
              if(res.data.code === 0) {
                _vm.noKey = true;
              } else {
                _vm.noKey = false;
              }
            },
            error: function(res){
              console.log(res);
            }
          });
        }
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/case/addSmartCaseNumber.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  const breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/customerMsg',
                      text: _vm.formValidate.customerName
                    },
                    {
                      url: '/caseManagementCusAdd',
                      text: '添加用户病例'
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push({
                    path: '/caseManagementCusAdd',
                    query: {
                      no: _vm.formValidate.caseNumber
                    }
                  });
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
      }
    }
  }

</script>
