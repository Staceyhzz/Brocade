/** 
 * 添加投诉页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerComplain')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('groupComplainAdd.label1')" prop="hospitalId" required>
          <Select v-model="formValidate.hospitalId" style="width:300px" :disabled='!key' @on-change='changeHosp'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('groupComplainAdd.label2')" prop="categoryId" required>
          <Select v-model="formValidate.categoryId" style="width:300px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('groupComplainAdd.label3')" prop="userId" required>
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.userid" :key="item.userid" :label='item.userName'>
              <span>{{item.userName}}</span>
              <span style="float:right;color:#ccc">{{item.userDeptName}}</span>
            </Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('groupComplainAdd.label4')" prop="chargeName" required class='treatAddObj'>
          <Input v-model="formValidate.chargeName" readonly icon="ios-search" :placeholder="$t('groupComplainAdd.input')" @on-focus="showObj" style="width:300px"></Input>
        </Form-item>
        <Form-item :label="$t('groupComplainAdd.label5')" prop="content" required>
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('groupComplainAdd.valid2')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('groupComplainAdd.input')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('groupComplainAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('groupComplainAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        key: true,
        modal: false,
        saveLoad: false,
        formValidate: {
          hospitalId: '',
          customerId: '',
          categoryId: '',
          userId: '',
          chargeId: '',
          chargeName: '',
          content: '',
        },
        hospList: [],
        typeList: [],
        nameList: [],
        col: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.lx'),
            key: 'chargeCategoryName'
          }
        ],
        data: [],
        ruleForm: {
          hospitalId: [{
            validator: validateList,
            trigger: 'change'
          }],
          categoryId: [{
            validator: validateList,
            trigger: 'change'
          }],
          userId: [{
            validator: validateList,
            trigger: 'change'
          }],
          chargeName: [{
            validator: validateList,
            trigger: 'change'
          }],
          content: [{
            validator: validateText,
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/complainAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            _vm.hospList = res.data.content.Hospital || [];
            _vm.key = res.data.content.IsGroupHospital || false;
            _vm.formValidate.hospitalId = localStorage.getItem('hospId') * 1;
            _vm.getType();
            _vm.getMes();
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取投诉类型
      getType() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/complainCategoryInfo.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.typeList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取对应信息
      getMes() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/complainAddList.jhtml',
          data: {
            customerId: _vm.formValidate.customerId,
            hospitalId: _vm.formValidate.hospitalId,
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data = res.data.content.ChargeList || [];
              _vm.nameList = res.data.content.UserList || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      showObj() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.chargeName = data.chargeName;
        this.formValidate.chargeId = data.chargeID;
        this.modal = false;
      },
      changeHosp(id) {
        this.formValidate.hospitalId = id;
        this.formValidate.chargeName = '';
        this.formValidate.chargeId = '';
        this.formValidate.userId = '';
        this.getMes();
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addComplain.jhtml',
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
                      url: '/indexComplain',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexComplain')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  })
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

<style>
  .treatAddObj button {
    margin: 0 10px;
  }

</style>
