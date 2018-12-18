/**
* 批量添加角色页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('user.btn1')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('labelPublic.yy')">
          <Select v-model="hospitalId" style="width:300px" :disabled='!key'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.js')" prop="roleId" required>
          <Select v-model="formValidate.roleId" style="width:300px">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('userSetting.label')" prop="userIds" required>
          <Row>
            <Col span="20">
              <Table stripe :columns="col" :data="formValidate.userIds"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
              <Button type="primary"  icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
              <Button type="primary"  icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <cmptChooseUserCheckBox :_hospId='hospitalId' :_modal='modal' @ok='ok' :_placeHolder="$t('userSetting.valid2')" :defaultUser='false'></cmptChooseUserCheckBox>
  </div>
</template>

<script>
  import cmptChooseUserCheckBox from 'components/chooseUserCheckBox.vue';
  export default {
    components: {cmptChooseUserCheckBox},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('userSetting.valid1')));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        console.log(value.length)
        if (value.length === 0) {
          callback(new Error(this.$t('userSetting.valid2')));
        } else {
          callback();
        }
      };
      return {
        key: true,
        modal: false,
        saveLoad: false,
        hospitalId: '',
        formValidate: {
          roleId: '',
          userIds: [],
        },
        col: [
          {
            title: this.$t('labelPublic.zh'),
            key: 'account'
          },
          {
            title: this.$t('labelPublic.xm'),
            key: 'name',
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, this.$t('publicSet.del')),
                ])
            }
          }
        ],
        roleList: [],
        ruleForm: {
          roleId: [
            { validator: validateName, trigger: 'change' }
          ],
          userIds: [
            { validator: validateList, trigger: 'change' }
          ]
        },
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
    },
    created () {
      this.key = this.getHeadquarters();
      this.hospitalId = localStorage.getItem('hospId') * 1;
      this.$store.dispatch('setPageLoading', 1);
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.getRole();
    },
    methods: {
      //获取角色下拉
      getRole () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/roleInfo.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.roleList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add () {
        this.modal = !this.modal;
      },
      clean () {
        this.formValidate.userIds.splice(0)
      },
      remove (index) {
        this.formValidate.userIds.splice(index, 1)
      },
      ok (data) {
        data.map(item => {
          const index = this.formValidate.userIds.findIndex(user => item.id === user.id);
          if(index < 0) {
            this.formValidate.userIds.push(item);
          }
        });
        this.$refs.formValidate.validateField('userIds');
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            _vm.saveLoad = true
            let _box = _vm.formValidate.userIds.map(item => item.id);
            _vm.$http.post({
              url: 'guard-webManager/user/addRole.jhtml',
              data: {
                roleId: _vm.formValidate.roleId,
                userIds: _box.join(','),
              },
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$router.push('/user')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.saveLoad = false
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          }
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>
