/**
* 编辑咨询预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('appointmentConsultUpdate.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('appointmentConsultUpdate.label1')">
          <span>{{formShow.time}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label2')">
          <span>【{{formShow.createHospName}}】【{{formShow.deptName}}】【{{formShow.userName}}】</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label3')">
          <span>{{formShow.hospName}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label4')">
          <span>{{formShow.cusName}} ({{formShow.cusId}})</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label1')" prop="appointmentDate">
          <Date-picker :transfer='true' :value='timeDay' type="date" placement="bottom-start" style="width: 300px" :options='options' @on-change='saveDate' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label3')" prop="startTime">
          <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-start" style="width: 300px" @on-change='saveTime' :clearable='false'></Time-picker>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label2')" prop="userId">
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.userid" :key="item.userid" :label='item.userName'>
              <span>{{item.userName}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        saveLoad: false,
        formShow: {
          time: '',
          hospName: '',
          createHospName: '',
          deptName: '',
          userName: '',
          cusName: '',
          cusId: ''
        },
        formValidate: {
          id: '',
          appointmentDate: '',
          startTime: '',
          endTime: '',
          content: '',
          userId: '',
        },
        nameList: [],
        timeBox: [],
        timeDay: '',
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
      }
    },
    created () {
      this.getId()
    },
    methods: {
      // 获取资料
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/appointmentDesk/appointmentUpdate.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            _vm.formShow = {
              time: res.data.content.Appointment.createtime || '',
              createHospName: res.data.content.Appointment.createUserHospitalName || '',
              hospName: res.data.content.Appointment.hospitalName || '',
              deptName: res.data.content.Appointment.createUserDeptName || '',
              userName: res.data.content.Appointment.createUserName || '',
              cusName: res.data.content.Appointment.customerName || '',
              cusId: res.data.content.Appointment.customerid || ''
            }
            _vm.timeDay = res.data.content.Appointment.appointmentdate.split(' ')[0] || ''
            _vm.timeBox = [res.data.content.Appointment.appointmentstarttime, res.data.content.Appointment.appointmentendtime]
            _vm.nameList = res.data.content.AppointmentUserList || []
            _vm.formValidate = {
              id: res.data.content.Appointment.id || '',
              appointmentDate: res.data.content.Appointment.appointmentdate.split(' ')[0] || '',
              startTime: res.data.content.Appointment.appointmentstarttime || '',
              endTime: res.data.content.Appointment.appointmentendtime || '',
              content: res.data.content.Appointment.content || '',
              userId: res.data.content.Appointment.userid || ''
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      saveTime (time) {
        this.formValidate.startTime = time[0] + ':00'
        this.formValidate.endTime = time[1] + ':00'
      },
      saveDate (date) {
        this.formValidate.appointmentDate = date
      },
      save () {
        let _vm = this
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/appointmentDesk/appointmentUpdateEdit.jhtml',
          data: _vm.formValidate,
          success: function(res){
            console.log(res)
            if(res.data.code == 0) {
              if(_vm.$route.query.type === '1') {
                _vm.$router.push({
                  path: '/appointmentConsult',
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
              })
              _vm.saveLoad = false
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      back () {
        if(this.$route.query.type === '1') {
          this.$router.push({
            path: '/appointmentConsult',
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

