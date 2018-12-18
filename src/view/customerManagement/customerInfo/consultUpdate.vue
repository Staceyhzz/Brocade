/** 
 * 修改咨询页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexConsult.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('indexConsult.colTit1')">
          <span>{{createtime}}</span>
        </Form-item>
        <Form-item :label="$t('indexConsult.colTit3')">
          <span>【{{hospitalName}}】</span>
          <span>【{{createUserDeptName}}】</span>
          <span>【{{createUserName}}】</span>
        </Form-item>
        <Form-item :label="$t('consultAdd.label1')" prop="tool" required>
          <Select v-model="formValidate.tool" style="width:300px">
            <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('consultAdd.label2')" prop="symptomId" required>
          <Select v-model="objName" style="width:300px" @on-change='changeObj' :clearable='true' ref='select' :placeholder="$t('consultAdd.placeholder')">
            <Option v-for="(item, index) in objList" :value="index" :key="index">{{ item.name }}</Option>
          </Select>
          <div class="tagbox">
            <div class="tagItem" v-for='(item, index) in tagBox' :key='index' @click.capture='tagClose(index)'>
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Form-item>
        <Form-item :label="$t('consultAdd.label3')" prop="content" required>
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('consultAdd.valid3')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateTool = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('consultAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('consultAdd.valid2')));
        } else {
          callback();
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('consultAdd.valid3')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        createtime: '',
        hospitalName: '',
        createUserDeptName: '',
        createUserName: '',
        customerName: '',
        objName: '',
        formValidate: {
          id: '',
          customerId: '',
          tool: '',
          content: '',
          symptomId: '',
          symptom2Id: '',
          symptom3Id: '',
          symptom4Id: '',
          symptom5Id: '',
        },
        tagBox: [],
        ruleForm: {
          tool: [{
            validator: validateTool,
            trigger: 'change'
          }],
          symptomId: [{
            validator: validateObj,
            trigger: 'change'
          }],
          content: [{
            validator: validateCon,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      toolList() {
        return this.$store.getters.getSelectToolList;
      },
      objList() {
        return this.$store.getters.getSelectSymptomInfoList;
      },
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.customerName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    mounted() {
      this.$store.dispatch('setSelectToolList');
      this.$store.dispatch('setSelectSymptomInfoList');
    },
    methods: {
      // 判断权限
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/consultUpdate.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const _obj = res.data.content || {};
						_vm.createtime = _obj.createtime || '';
						_vm.createUserDeptName = _obj.createUserDeptName || '';
						_vm.createUserName = _obj.createUserName || '';
						_vm.hospitalName = _obj.hospitalName || '';
            _vm.formValidate = {
              id: _obj.id || '',
              customerId: sessionStorage.getItem('cusId'),
              tool: _obj.tool || '',
              content: _obj.content || '',
              symptomId: _obj.symptomid || '',
              symptom2Id: _obj.symptom2id || '',
              symptom3Id: _obj.symptom3id || '',
              symptom4Id: _obj.symptom4id || '',
              symptom5Id: _obj.symptom5id || '',
            };
            let idBox = [_obj.symptomid];
            for(let i = 2; i < 6; i++) {
              if(Number.isFinite(_obj['symptom' + i + 'id'])) {
                idBox.push(_obj['symptom' + i + 'id']);
              }
            }
            idBox.forEach(item => {
              const index = _vm.objList.findIndex(i => i.id === item);
              if(index >= 0) {
                _vm.tagBox.push(_vm.objList[index]);
              }
            });
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changeObj(index) {
        if(this.tagBox.length < 5 && Number.isFinite(index)) {
          const i = this.tagBox.findIndex(item => item.id === this.objList[index].id);
          if(i < 0) {
            this.tagBox.push(this.objList[index]);
            this.setId();
          }
        }
      },
      tagClose(index) {
        this.tagBox.splice(index, 1);
        this.$refs['select'].clearSingleSelect();
        this.setId();
      },
      setId() {
        const idBox = this.tagBox.map(item => item.id);
        this.formValidate.symptomId = typeof idBox[0] === 'number' 
         ? idBox[0] 
         : '';
        this.formValidate.symptom2Id = typeof idBox[1] === 'number' 
         ? idBox[1] 
         : '';
        this.formValidate.symptom3Id = typeof idBox[2] === 'number' 
         ? idBox[2] 
         : '';
        this.formValidate.symptom4Id = typeof idBox[3] === 'number' 
         ? idBox[3] 
         : '';
        this.formValidate.symptom5Id = typeof idBox[4] === 'number' 
         ? idBox[4] 
         : '';
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/updateConsult.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  const breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/customer',
                      text: 'layoutNav.customerManage'
                    },
                    {
                      url: '/indexConsult',
                      text: _vm.customerName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexConsult');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
                }
              },
              error: function (res) {
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
