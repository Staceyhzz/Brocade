/** 
 * 分诊 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('deptDesk.btn2')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        {{$t('deptDeskTriage.msg1')}}
        <div slot="desc">
          <p>{{$t('deptDesk.colTit2')}}: {{cusName}} —— {{formDept.customerId}}</p>
          <p>{{$t('deptDeskTriage.msg2')}}</p>
        </div>
      </Alert>
      <Form ref="formDept" :model="formDept" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.bm')" prop="deptId" required>
          <Select v-model="formDept.deptId" style="width:300px">
            <Option v-for="item in deptList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click="save" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('deptDeskTriage.valid')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        cusName: '',
        formDept: {
          customerId: '',
          deptId: ''
        },
        deptList: [],
        ruleForm: {
          deptId: [{
            validator: validateList,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.getId(this.$route.query.id);
      this.formDept.customerId = this.$route.query.id;
    },
    mounted() {
			this.getList(localStorage.getItem('hospId'));
    },
    methods: {
      getId(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptDesk/triage.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            _vm.cusName = res.data.content.CustomerName || '';
            _vm.formDept.deptId = res.data.content.DeptID * 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取部门
      getList(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalOpenDeptInfo.jhtml',
          data: {
            hospitalId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.deptList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      save() {
        let _vm = this;
        _vm.$refs['formDept'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/deptDesk/addDeptVisit.jhtml',
              data: _vm.formDept,
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
									_vm.$router.push('/deptDesk');
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
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
