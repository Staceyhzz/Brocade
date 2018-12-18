/**
* 添加咨询预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('appointmentConsultAdd.tit')}}</h2>
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
        <Form-item :label="$t('appointmentConsultAdd.label4')" prop="customerName" required>
          <Input v-model="formValidate.customerName" readonly icon="ios-search" :placeholder="$t('appointmentConsultAdd.valid')" style='width:300px;' @on-focus='addUser'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="content">
          <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <cmptAppointmentUser :placeHolder="$t('appointmentConsultAdd.valid')" :openKey='userOpenKey' @on-change='chooseUser'></cmptAppointmentUser>
  </div>
</template>

<script>
  import cmptAppointmentUser from 'components/appointmentUser.vue';
  export default {
    components: {cmptAppointmentUser},
    data () {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentConsultAdd.valid')))
        } else {
          callback()
        }
      }
      return {
        userOpenKey: false,

        saveLoad: false,
        key: true,
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
          startTime: '',
          endTime: '',
          content: '',
          userId: '',
          userName: '',
        },
        nameList: [],
        timeBox: [],
        ruleForm: {
          customerName: [
            { validator: validateUser, trigger: 'change' }
          ]
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
          url: 'guard-webManager/appointmentDesk/consultAdd.jhtml',
          data: _vm.formGet,
          success: function(res){
            _vm.formValidate = {
              customerId: '',
              customerName: '',
              hospitalId: sessionStorage.getItem('appointmentHospId'),
              appointmentDate: res.data.content.AppointmentDate || '',
              startTime: res.data.content.StartTime || '',
              endTime: res.data.content.EndTime || '',
              content: '',
              userId: res.data.content.User.id || '',
              userName: res.data.content.User.name || ''
            }
            _vm.timeBox = [res.data.content.StartTime, res.data.content.EndTime]
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      addUser () {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser (data) {
        this.formValidate.customerId = data.id
        this.formValidate.customerName = data.name
      },
      saveTime (time) {
        this.formValidate.startTime = time[0] + ':00'
        this.formValidate.endTime = time[1] + ':00'
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/appointmentDesk/addGroupAppointment.jhtml',
              data: _vm.formValidate,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  if(_vm.$route.query.type === '1') {
                    _vm.$router.push({
                      path: '/appointmentConsult',
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
            })
          }
        })
      },
      back () {
        if(this.$route.query.type === '1') {
          this.$router.push({
            path: '/appointmentConsult',
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

