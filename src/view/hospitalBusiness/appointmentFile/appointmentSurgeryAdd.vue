/**
* 添加手术预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('treatSchedulerAdd.tit3')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('appointmentConsultAdd.label1')">
          <span>{{formValidate.appointmentDate}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label2')">
          <span>{{formValidate.userName}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label3')" prop="startTime">
          <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" style="width: 300px" @on-change='saveTime' :clearable='false'></Time-picker>
        </Form-item>
        <Form-item :label="$t('appointmentHover.label8')" prop="anesthesiaType">
          <Radio-group v-model="formValidate.anesthesiaType">
            <Radio :label="1">{{$t('appointmentHover.label9')}}</Radio>
            <Radio :label="2">{{$t('appointmentHover.label10')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label4')" prop="customerName" required>
          <Input v-model="formValidate.customerName" readonly icon="ios-search" :placeholder="$t('appointmentConsultAdd.valid')" style='width:300px;' @on-focus='addUser'></Input>
        </Form-item>
        <Form-item :label="$t('treatSchedulerAdd.label')" prop="detailListStr" required class='surgeryAddObj'>
          <Table stripe :columns="col" :data="data"></Table>
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
          callback()
        }
      }
      const validateObj = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error(this.$t('treatSchedulerAdd.valid')))
        } else {
          callback()
        }
      }
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
          customerId: '',
          customerName: '',
          hospitalId: sessionStorage.getItem('appointmentHospId'),
          appointmentDate: '',
          startTime: '',
          endTime: '',
          remark: '',
          userId: '',
          userName: '',
          anesthesiaType: 1,
          remark: '',
          detailListStr: '',
        },
        nameList: [],
        timeBox: [],
        colBuy: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 80,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'size'
          }
        ],
        col: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 80,
            key: 'name'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
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
                }, this.$t('publicSet.del'))
                ])
            }
          }
        ],
        dataBuy: [],
        data: [],
        ruleForm: {
          customerName: [
            { validator: validateUser, trigger: 'change' }
          ],
          detailListStr: [
            { validator: validateObj, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      toSave () {
        if(this.data.length) {
          return JSON.stringify(this.data.map(item => {
            return {
              chargeId: item.id
            }
          }))
        } else {
          return ''
        }
      } 
    },
    created () {
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
          url: 'guard-webManager/appointmentDesk/surgeryAdd.jhtml',
          data: _vm.formGet,
          success: function(res){
            _vm.formValidate.appointmentDate = res.data.content.AppointmentDate
            _vm.formValidate.startTime = res.data.content.StartTime
            _vm.formValidate.endTime = res.data.content.EndTime
            _vm.formValidate.userName = res.data.content.User.name
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
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/appointmentDesk/getSurgeryCharge.jhtml',
          data: {
            customerId: id
          },
          success: function(res){
            if(res.data.code == 0) {
              _vm.dataBuy = res.data.content || []
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      saveTime (time) {
        this.formValidate.startTime = time[0] + ':00'
        this.formValidate.endTime = time[1] + ':00'
      },
      showBuy () {
        this.modalbuy = true
      },
      showAll () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseBuy (data) {
        const _index = this.data.findIndex(item => item.id === data.id)
        if(_index < 0) {
          this.data.push(data)
          this.formValidate.detailListStr = this.toSave
          this.$refs.formValidate.validateField('detailListStr');
        }
        this.modalbuy = false
      },
      chooseCharge (data) {
        const _index = this.data.findIndex(item => item.id === data.id)
        if(_index < 0) {
          this.data.push(data)
          this.formValidate.detailListStr = this.toSave
          this.$refs.formValidate.validateField('detailListStr');
        }
      },
      addUser () {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser (data) {
        this.formValidate.customerId = data.id
        this.formValidate.customerName = data.name
        this.data.splice(0)
        this.formValidate.detailListStr = this.toSave
        this.getBuy(data.id)
      },
      remove (index) {
        this.data.splice(index, 1)
        this.formValidate.detailListStr = this.toSave
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/appointmentDesk/surgeryAddEdit.jhtml',
              data: _vm.formValidate,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  if(_vm.$route.query.type === '1') {
                    _vm.$router.push({
                      path: '/appointmentSurgery',
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
                console.log(res)
              }
            });
          }
        })
      },
      back () {
        if(this.$route.query.type === '1') {
          this.$router.push({
            path: '/appointmentSurgery',
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

<style scoped>
 .surgeryAddObj button {
  margin: 10px 10px 0;
} 
</style>

