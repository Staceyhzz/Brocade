/**
* 修改治疗预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('treatSchedulerAdd.tit2')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('appointmentConsultAdd.label4')">
          <span>{{formShow.customerName}} ({{formShow.customerID}})</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label1')">
          <span>{{formShow.createTime}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label2')">
          <span>【{{formShow.createUserHospitalName}}】 【{{formShow.createUserDeptName}}】 【{{formShow.createUserName}}】</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label3')">
          <span>{{formShow.hospitalName}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label1')" required prop="appointmentDate">
          <Date-picker :transfer='true' :value='timeDay' type="date" placement="bottom-start" style="width: 300px" :options='options' @on-change='saveDate' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label3')" required prop="startTime">
          <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" style="width: 300px" @on-change='saveTime' :clearable='false'></Time-picker>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label2')" prop="userId">
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.id" :key="item.id" :label='item.name'>
              <span>{{item.name}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
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
      <cmptChargeChoose :placeHolder="$t('treatSchedulerAdd.valid')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeChoose},
    data () {
      const validateDay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择预约日期'));
        } else {
          callback();
        }
      };
      const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择预约时间'));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择预约项目'));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        formShow: {},
        timeBox: [],
        timeDay: '',
        formValidate: {
          id: '',
          appointmentDate: '',
          start: '',
          end: '',
          remark: '',
          userId: '',
          chargeId: '',
          chargeName: '',
        },
        nameList: [],
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        modalbuy: false,
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
        chargeOpenKey: false,
        ruleForm: {
          appointmentDate: [
            { validator: validateDay, trigger: 'change' }
          ],
          startTime: [
            { validator: validateTime, trigger: 'change' }
          ],
          chargeName: [
            { validator: validateObj, trigger: 'change' }
          ],
        }
      }
    },
    created () {
      this.formValidate.id = this.$route.query.id
      this.getId(this.$route.query.id)
    },
    methods: {
      // 获取资料
      getId (id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/treatScheduler/treatUpdate.jhtml',
          data: {id: id},
          success: function(res){
            _vm.formShow = res.data.content.Treat
            _vm.timeDay = res.data.content.Treat.appointmentDate.split(' ')[0]
            _vm.timeBox.push(res.data.content.Treat.appointmentStartTime)
            _vm.timeBox.push(res.data.content.Treat.appointmentEndTime)
            _vm.formValidate.appointmentDate = res.data.content.Treat.appointmentDate.split(' ')[0]
            _vm.formValidate.start = res.data.content.Treat.appointmentStartTime
            _vm.formValidate.end = res.data.content.Treat.appointmentEndTime
            _vm.nameList = res.data.content.AppointmentUserList
            _vm.formValidate.userId = res.data.content.Treat.userID
            _vm.formValidate.chargeId = res.data.content.Treat.chargeID
            _vm.formValidate.chargeName = res.data.content.Treat.chargeName
            _vm.formValidate.remark = res.data.content.Treat.remark
            _vm.dataBuy = res.data.content.DetailList
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      saveDate (date) {
        this.formValidate.appointmentDate = date
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
        this.formValidate.chargeId = data.id
        this.formValidate.chargeName = data.name
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/treatScheduler/treatUpdateEdit.jhtml',
              data: _vm.formValidate,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  if(_vm.$route.query.type === '1') {
                    _vm.$router.push({
                      path: '/appointmentTreat',
                      query: {
                        date: _vm.formValidate.appointmentDate
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
                  });
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
              date: this.formValidate.appointmentDate
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

