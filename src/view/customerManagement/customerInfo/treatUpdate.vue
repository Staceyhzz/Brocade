/** 
 * 修改治疗预约信息页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexAppointment.tit5')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('indexAppointment.colTit4')">
          <span>{{createtime}}</span>
        </Form-item>
        <Form-item :label="$t('indexAppointment.colTit5')">
          <span>【{{createUserHospitalName}}】 【{{createUserDeptName}}】 【{{createUserName}}】</span>
        </Form-item>
        <Form-item :label="$t('appointmentAdd.label1')">
          <span>{{hospitalName}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentAdd.label2')" required prop="appointmentDate">
          <Date-picker :transfer='true' :value='timeDay' type="date" placement="bottom-start" :placeholder="$t('appointmentAdd.valid2')" style="width: 300px" :options='options'
            @on-change='saveDate' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('appointmentAdd.label3')" required prop="startTime">
          <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" :placeholder="$t('appointmentAdd.valid3')" style="width: 300px"
            @on-change='saveTime' :clearable='false'></Time-picker>
        </Form-item>
        <Form-item :label="$t('indexAppointment.colTit9')" prop="userId" required>
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.id" :key="item.id" :label='item.name'>
              <span>{{item.name}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('treatAdd.label')" prop="chargeId" required class='treatAddObj'>
          <Input v-model="objName" :placeholder="$t('treatAdd.valid')" style='float:left;width:300px;margin-right:10px;' readonly></Input>
          <Button type="primary" icon="ios-search-strong" @click='showBuy'>{{$t('treatAdd.btn1')}}</Button>
          <Button type="primary" icon="ios-search-strong" @click='showAll'>{{$t('treatAdd.btn2')}}</Button>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('treatAdd.btn1')" width='700' v-model="modalbuy" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="colBuy" :data="dataBuy" @on-row-click='chooseBuy'></Table>
      </Modal>
      <cmptChargeChoose :placeHolder="$t('treatAdd.valid')" @on-change="chooseAll" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeChoose},
    data() {
      const validateDay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentAdd.valid2')));
        } else {
          callback();
        }
      };
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('surgeryAdd.valid')));
        } else {
          callback();
        }
      };
      const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentAdd.valid3')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.formValidate.chargeId == '') {
          callback(new Error(this.$t('treatAdd.valid')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        chargeOpenKey: false,

        createtime: '',
        createUserName: '',
        createUserHospitalName: '',
        createUserDeptName: '',
        hospitalName: '',
        timeBox: [],
        timeDay: '',
        formValidate: {
          id: '',
          appointmentDate: '',
          startTime: '',
          endTime: '',
          remark: '',
          userId: '',
          chargeId: '',
        },
        objName: '',
        nameList: [],
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        modalbuy: false,
        colBuy: [
          {
            title: this.$t('treatAdd.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _time = params.row.orderPaidTime.split(' ')[0];
                return h('span', _time);
              }
            }
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('treatAdd.colTit2'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('treatAdd.colTit3'),
            width: 60,
            key: 'orderCreateUserName'
          },
          {
            title: this.$t('treatAdd.colTit4'),
            width: 60,
            key: 'doctorUserName'
          }
        ],
        dataBuy: [],
        ruleForm: {
          appointmentDate: [{
            validator: validateDay,
            trigger: 'change'
          }],
          startTime: [{
            validator: validateTime,
            trigger: 'change'
          }],
          chargeId: [{
            validator: validateObj,
            trigger: 'change'
          }],
          userId: [{
            validator: validateUser,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.cusName = sessionStorage.getItem('cusId');
      this.getId(this.$route.query.id);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/treatUpdate.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const obj = res.data.content.Treat || {};
						_vm.hospitalName = obj.hospitalName || '';
						_vm.createUserDeptName = obj.createUserDeptName || '';
						_vm.createUserHospitalName = obj.createUserHospitalName || '';
						_vm.createUserName = obj.createUserName || '';
            _vm.createtime = obj.createTime || '';
            _vm.objName = obj.chargeName || '';
            _vm.formValidate = {
              id: res.data.content.ID || id,
              appointmentDate: obj.appointmentDate
                ? obj.appointmentDate.split(' ')[0]
                : '',
              startTime: obj.appointmentStartTime || '',
              endTime: obj.appointmentEndTime || '',
              remark: obj.remark || '',
              userId: obj.userID || '',
              chargeId: obj.chargeID || ''
            };
            _vm.dataBuy = res.data.content.DetailList || [];
            _vm.nameList = res.data.content.AppointmentUserList || [];
            _vm.timeDay = _vm.formValidate.appointmentDate;
            _vm.timeBox = [_vm.formValidate.startTime, _vm.formValidate.endTime];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      saveDate(date) {
        this.formValidate.appointmentDate = date;
      },
      saveTime(time) {
        this.formValidate.startTime = time[0] + ':00';
        this.formValidate.endTime = time[1] + ':00';
      },
      showBuy() {
        this.modalbuy = true;
      },
      showAll() {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseBuy(data) {
        this.formValidate.chargeId = data.chargeID;
        this.objName = data.chargeName;
        this.modalbuy = false;
      },
      chooseAll(data) {
        this.formValidate.chargeId = data.id;
        this.objName = data.name;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/treatUpdateEdit.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                console.log(res)
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
                      url: '/indexAppointment',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexAppointment');
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

<style>
  .treatAddObj button {
    margin: 0 10px;
  }

</style>
