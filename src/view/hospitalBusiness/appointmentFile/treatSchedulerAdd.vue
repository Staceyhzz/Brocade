/**
* 添加治疗预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('treatSchedulerAdd.tit1')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('appointmentConsultAdd.label1')">
          <span>{{formValidate.appointmentDate}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label2')">
          <span>{{formValidate.name}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label3')" required prop="startTime">
          <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" style="width: 300px" @on-change='saveTime' :clearable='false'></Time-picker>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label4')" prop="customerName" required>
          <Input v-model="formValidate.customerName" readonly icon="ios-search" :placeholder="$t('appointmentConsultAdd.valid')" style='width:300px;' @on-focus='addUser'></Input>
        </Form-item>
        <Form-item :label="$t('treatSchedulerAdd.label')" prop="chargeName" required class='treatAddObj'>
          <Input v-model="formValidate.chargeName" :placeholder="$t('treatSchedulerAdd.valid')" style='float:left;width:300px;margin-right:10px;' :readonly='true'></Input>
          <Button type="primary"  icon="ios-search-strong" @click='showBuy'>{{$t('treatSchedulerAdd.btn1')}}</Button>
          <Button type="primary"  icon="ios-search-strong" @click='showAll'>{{$t('treatSchedulerAdd.btn2')}}</Button>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('treatSchedulerAdd.btn1')"
        width='700'
        v-model="modalbuy"
        :closable="false"
        class-name="vertical-center-modal">
        <Table height="350" stripe :columns="colBuy" :data="dataBuy" @on-row-click='chooseBuy'></Table>
      </Modal>
      <cmptAppointmentUser :placeHolder="$t('appointmentConsultAdd.valid')" :openKey='userOpenKey' @on-change='chooseUser'></cmptAppointmentUser>
      <cmptChargeChoose :placeHolder="$t('treatSchedulerAdd.valid')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
  import cmptAppointmentUser from 'components/appointmentUser.vue';
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptAppointmentUser, cmptChargeChoose},
    data () {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentConsultAdd.valid')))
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('treatSchedulerAdd.valid')))
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        modalbuy: false,
        chargeOpenKey: false,
        userOpenKey: false,
        formGet: {
          userId: '',
          appointmentDate: '',
          start: '',
          end: '',
        },
        formValidate: {
          hospitalId: '',
          customerId: '',
          customerName: '',
          appointmentDate: '',
          start: '',
          end: '',
          remark: '',
          userId: '',
          name: '',
          chargeId: '',
          chargeName: '',
        },
        nameList: [],
        timeBox: [],
        colBuy: [
          {
            title: this.$t('treatSchedulerAdd.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _time = params.row.orderPaidTime.split(' ')[0]
                return h('span', _time)
              }
            }
          },
          {
            title: this.$t('treatSchedulerAdd.colTit2'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('treatSchedulerAdd.colTit3'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('treatSchedulerAdd.colTit4'),
            width: 60,
            key: 'orderCreateUserName'
          },
          {
            title: this.$t('treatSchedulerAdd.colTit5'),
            width: 60,
            key: 'doctorUserName'
          }
        ],
        dataBuy: [],
        ruleForm: {
          customerName: [
            { validator: validateUser, trigger: 'change' }
          ],
          chargeName: [
            { validator: validateObj, trigger: 'change' }
          ],
        }
      }
    },
    created () {
      this.formValidate.hospitalId = sessionStorage.getItem('appointmentHospId');
      this.formGet.userId = this.$route.query.id
      this.formGet.appointmentDate = this.$route.query.date
      this.formGet.start = this.$route.query.start + ':00'
      this.formGet.end = this.$route.query.end + ':00'
      this.getId()
    },
    methods: {
      // 获取资料
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/treatScheduler/treatAdd.jhtml',
          data: _vm.formGet,
          success: function(res){
            _vm.formValidate.appointmentDate = res.data.content.AppointmentDate
            _vm.formValidate.start = res.data.content.StartTime
            _vm.formValidate.end = res.data.content.EndTime
            _vm.formValidate.name = res.data.content.User.name
            _vm.formValidate.userId = res.data.content.User.id
            _vm.timeBox.push(res.data.content.StartTime)
            _vm.timeBox.push(res.data.content.EndTime)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取已购项目
      getBuy (id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/treatScheduler/getCustomerDetailList.jhtml',
          data: {
            customerId: id
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.dataBuy = res.data.content
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      saveTime (time) {
        this.formValidate.start = time[0] + ':00'
        this.formValidate.end = time[1] + ':00'
      },
      showBuy () {
        this.modalbuy = true
      },
      showAll () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseBuy (data) {
        this.formValidate.chargeId = data.chargeID
        this.formValidate.chargeName = data.chargeName
        this.modalbuy = false
      },
      chooseCharge (data) {
        this.formValidate.chargeId = data.id;
        this.formValidate.chargeName = data.name;
      },
      addUser () {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser (data) {
        this.formValidate.customerId = data.id
        this.formValidate.customerName = data.name
        this.formValidate.chargeName = ''
        this.formValidate.chargeId = ''
        this.getBuy(data.id)
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/treatScheduler/treatAddEdit.jhtml',
              data: _vm.formValidate,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  if(_vm.$route.query.type === '1') {
                    _vm.$router.push({
                      path: '/appointmentTreat',
                      query: {
                        date: _vm.formGet.appointmentDate
                      }
                    })
                  } else if(_vm.$route.query.type === '2') {
                    _vm.$router.back(-1)
                  }
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                  _vm.saveLoad = false
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
        if(this.$route.query.type === '1') {
          this.$router.push({
            path: '/appointmentTreat',
            query: {
              date: this.formGet.appointmentDate
            }
          })
        } else if(this.$route.query.type === '2') {
          this.$router.back(-1)
        }
      }
    }
  }
</script>

<style>
 .treatAddObj button {
  margin: 0 10px;
} 
</style>

