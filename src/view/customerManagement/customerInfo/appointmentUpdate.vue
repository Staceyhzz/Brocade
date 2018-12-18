/** 
 * 修改咨询预约页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexAppointment.tit4')}}</h2>
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
        <Form-item :label="$t('appointmentAdd.label4')" prop="userId">
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.userid" :key="item.userid" :label='item.userName'>
              <span>{{item.userName}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateDay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentAdd.valid2')));
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
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentAdd.valid4')));
        } else {
          callback()
        }
      };
      return {
        cusName: '',
        saveLoad: false,
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
          content: '',
          userId: '',
        },
        nameList: [],
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        ruleForm: {
          appointmentDate: [{
            validator: validateDay,
            trigger: 'change'
          }],
          startTime: [{
            validator: validateTime,
            trigger: 'change'
          }],
          userId: [{
            validator: validateUser,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.$route.query.id);
    },
    methods: {
      // 获取资料
      getId(id) {
        var _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/appointmentUpdate.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const appiontObj = res.data.content.Appointment || {};
            _vm.hospitalName = appiontObj.hospitalName || '';
						_vm.createUserDeptName = appiontObj.createUserDeptName || '';
						_vm.createUserHospitalName = appiontObj.createUserHospitalName || '';
						_vm.createUserName = appiontObj.createUserName || '';
						_vm.createtime = appiontObj.createtime || '';
            _vm.nameList = res.data.content.AppointmentUserList || [];
            _vm.formValidate = {
              id: res.data.content.ID || id,
              appointmentDate: appiontObj.appointmentdate
                ? appiontObj.appointmentdate.split(' ')[0]
                : '',
              startTime: appiontObj.appointmentstarttime || '',
              endTime: appiontObj.appointmentendtime || '',
              content: appiontObj.content || '',
              userId: appiontObj.userid || '',
            };
            _vm.timeDay = _vm.formValidate.appointmentDate;
            _vm.timeBox = [_vm.formValidate.startTime, _vm.formValidate.endTime];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
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
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/appointmentUpdateEdit.jhtml',
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
