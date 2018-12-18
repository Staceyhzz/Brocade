/** 
 * 分诊 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('frontDesk.btn2')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        {{$t('triage.msg4')}}
        <div slot="desc">
          <p>{{$t('onlineDesk.colTit1')}}：{{cusName}} —— {{formValidate.customerId}}</p>
          <p>{{$t('triage.msg1')}}</p>
          <p>{{$t('triage.msg2')}}</p>
          <p>{{$t('triage.msg3')}}</p>
        </div>
      </Alert>
      <Tabs value="name1" :animated='false'>
        <Tab-pane :label="$t('triage.menu1')" name="name1">
          <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
            <Form-item :label="$t('triage.label1')">
              <span>{{ConsultItems}}</span>
            </Form-item>
            <Form-item :label="$t('triage.label2')">
              <span>{{CurrentManagerUserName}}</span>
            </Form-item>
            <Form-item :label="$t('triage.label3')" prop="assignUserId" required>
              <Select v-model="formValidate.assignUserId" style="width:300px">
                <Option v-for="item in nameList" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </Form-item>
            <Form-item :label="$t('triage.label4')" prop="remark">
              <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('triage.label5')" prop="register" v-if='key'>
              <Checkbox v-model="formValidate.register" :true-value='1' :false-value='0'>{{$t('triage.label6')}}</Checkbox>
            </Form-item>
          </Form>
          <div class="footer-btnGroup" style='marginTop: 60px;'>
            <Button type="primary" icon="checkmark" @click="save('formValidate')" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('triage.menu2')" name="name2">
          <Form ref="formDept" :model="formDept" :rules="ruleForm" :label-width="100" label-position="right">
            <Form-item :label="$t('labelPublic.bm')" prop="deptId" required>
              <Select v-model="formDept.deptId" style="width:300px">
                <Option v-for="item in deptList" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </Form-item>
          </Form>
          <div class="footer-btnGroup" style='paddingBottom:130px'>
            <Button type="primary" icon="checkmark" @click="save('formDept')" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('triage.valid')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        cusName: '',
        ConsultItems: '',
        CurrentManagerUserName: '',
        key: true,
        formValidate: {
          customerId: '',
          assignUserId: '',
          remark: '',
          register: 0,
        },
        formDept: {
          customerId: '',
          deptId: ''
        },
        nameList: [],
        deptList: [],
        ruleForm: {
          assignUserId: [{
            validator: validateList,
            trigger: 'change'
          }],
          deptId: [{
            validator: validateList,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.getId(this.$route.query.id);
      this.formValidate.customerId = this.$route.query.id;
			this.formDept.customerId = this.$route.query.id;
			this.getList(localStorage.getItem('hospId'));
    },
    methods: {
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/frontDesk/triage.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            if (res.data.content.Register === '1') {
              _vm.key = true;
            } else {
              _vm.key = false;
            }
            _vm.cusName = res.data.content.Customer.name || '';
            _vm.ConsultItems = res.data.content.ConsultItems || '';
            _vm.CurrentManagerUserName = res.data.content.CurrentManagerUserName || '';
            _vm.nameList = res.data.content.UserList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取部门
      getList(id) {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalOpenDeptInfo.jhtml',
          data: {
            hospitalId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.deptList = res.data.content || []
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      save(name) {
				let _vm = this;
				let _url = name === 'formValidate'
					? 'guard-webManager/frontDesk/addTriage.jhtml'
					: 'guard-webManager/frontDesk/addDeptVisit.jhtml';
        _vm.$refs[name].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _vm[name],
              success: function (res) {
                if (res.data.code === 0) {
                  let breadData = [{
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/frontDesk',
                      text: 'layoutNav.receptionFront'
                    }
                  ]
									_vm.$store.dispatch('setBreadData', breadData);
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/frontDesk')
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false
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
        this.$router.back(-1)
      }
    }
  }

</script>
