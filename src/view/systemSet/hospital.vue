/**
* 医院管理页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.hospitalManage')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal
        :title="$t('hospital.modalTit')"
        v-model="modalEdit"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="80" label-position="right">
          <Form-item :label="$t('labelPublic.mc')" prop="name" required>
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('hospital.colTit1')" prop="fullName" required>
            <Input v-model.trim="formValidate.fullName" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.pxh')" prop="sortNo" required>
            <cmptInputNumber :max="10000" :min="1" v-model="formValidate.sortNo"></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('hospital.colTit2')" prop="cityId" required>
            <Select v-model="provinceId" style="width:200px" @on-change='getCity'>
              <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="formValidate.cityId" style="width:200px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('hospital.colTit3')" prop="address">
            <Input v-model.trim="formValidate.address" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      const validatefullname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('hospital.valid1')));
        } else {
          callback();
        }
      };
      const validateCity = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('hospital.valid2')));
        } else {
          callback();
        }
      };
      return {
        columns: [
          {   
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('hospital.colTit1'),
            width: 100,
            key: 'fullname'
          },
          {
            title: this.$t('labelPublic.pxh'),
            width: 60,
            key: 'sortno'
          },
          {
            title: this.$t('hospital.colTit2'),
            width: 60,
            key: 'cityNameLang'
          },
          {
            title: this.$t('hospital.colTit3'),
            width: 60,
            key: 'addressLang'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remarkLang'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
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
                      this.edit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit'))
                ])
            }
          }
        ],
        data: [],
        modalEdit: false,
        loading: true,
        formValidate: {
          hospitalId: '',
          name: '',
          fullName: '',
          sortNo: 1,
          cityId: '',
          address: '',
          remark: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          fullName: [
            { validator: validatefullname, trigger: 'blur' }
          ],
          cityId: [
            { validator: validateCity, trigger: 'blur' }
          ]
        },
        provinceList: [],
        provinceId: '',
        cityList: [],
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'hospital') {
          this.getList();
        }
      },
    },
    created () {
      this.getList()
    },
    mounted () {
      this.getProvince()
    },
    methods: {
      //获取列表
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/hospital/list.jhtml',
          success: function(res){
            const props = ['cityName', 'address', 'remark'];
            const _data = res.data.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'hospital') {
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取省份
      getProvince () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/provinceInfo.jhtml',
          data: {name: null},
          success: function(res){
            if(res.data.code === 0 ){
              _vm.provinceList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取城市
      getCity (id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/cityList.jhtml',
          data: {id: id},
          success: function(res){
            if(res.data.code === 0 ){
              _vm.cityList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //修改信息
      edit (data) {
        this.$refs['formValidate'].resetFields();
        this.formValidate.hospitalId = data.id
        this.formValidate.name = data.name
        this.formValidate.fullName = data.fullname
        this.formValidate.sortNo = data.sortno
        this.formValidate.cityId = data.cityid
        this.formValidate.address = data.address
        this.formValidate.remark = data.remark
        this.provinceId = data.provinceID
        this.modalEdit = true
      },
      //提交数据
      ok () {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/hospital/update.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'hospital') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      }
    }
  }
</script>