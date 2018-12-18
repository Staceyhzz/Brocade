/** 
 * 修改手术预约信息页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexAppointment.tit6')}}</h2>
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
        <Form-item :label="$t('surgeryAdd.label1')" prop="anesthesiaType">
          <Radio-group v-model="formValidate.anesthesiaType">
            <Radio :label="1">{{$t('surgeryAdd.label2')}}</Radio>
            <Radio :label="2">{{$t('surgeryAdd.label3')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('indexAppointment.colTit9')" required prop="userId">
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.id" :key="item.id" :label='item.name'>
              <span>{{item.name}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('treatAdd.label')" prop="detailListStr" required class='surgeryAddObj'>
          <Table stripe :columns="col" :data="data"></Table>
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
      const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('appointmentAdd.valid3')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.data.length === 0) {
          callback(new Error(this.$t('treatAdd.valid')));
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
      return {
        cusName: '',
        saveLoad: false,
        chargeOpenKey: false,
        pageNumber: 1,
        total: 0,
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
          userId: '',
          anesthesiaType: 1,
          remark: '',
          detailListStr: '',
        },
        nameList: [],
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        modalbuy: false,
        col: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
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
        data: [],
        colBuy: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.gg'),
            key: 'unitName'
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
          userId: [{
            validator: validateUser,
            trigger: 'change'
          }],
          detailListStr: [{
            validator: validateObj,
            trigger: 'change'
          }],
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
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/surgeryUpdate.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const surgeryObj = res.data.content.Surgery || {};
						_vm.hospitalName = surgeryObj.hospitalName || '';
						_vm.createUserDeptName = surgeryObj.createUserDeptName || '';
						_vm.createUserHospitalName = surgeryObj.createUserHospitalName || '';
            _vm.createUserName = surgeryObj.createUserName || '';
            _vm.createtime = surgeryObj.createtime || '';
            _vm.nameList = res.data.content.AppointmentUserList || [];
            _vm.formValidate = {
              id: res.data.content.ID,
              appointmentDate: surgeryObj.appointmentdate
                ? surgeryObj.appointmentdate.split(' ')[0]
                : '',
              startTime: surgeryObj.appointmenttimestart
                ? surgeryObj.appointmenttimestart.split(' ')[1]
                : '',
              endTime: surgeryObj.appointmenttimeend
                ? surgeryObj.appointmenttimeend.split(' ')[1]
                : '',
              userId: surgeryObj.userid || '',
              anesthesiaType: surgeryObj.anesthesiatype || 1,
              remark: surgeryObj.remark || ''
            };
            _vm.timeDay = _vm.formValidate.appointmentDate;
            _vm.timeBox = [_vm.formValidate.startTime, _vm.formValidate.endTime];
            _vm.data = surgeryObj.detailList.map(item => {
              return {
                name: item.chargeName,
                id: item.chargeid
              };
            }) || [];
            const _data = _vm.data.map(item => {
              return {
                chargeId: item.id
              };
            });
            _vm.formValidate.detailListStr = JSON.stringify(_data);
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
        this.formValidate.startTime = time[0];
        this.formValidate.endTime = time[1];
      },
      showBuy(data) {
        this.modalbuy = true;
      },
      showAll() {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseBuy(data) {
        this.chooseAll(data);
        this.modalbuy = false;
      },
      chooseAll(data) {
        const index = this.data.findIndex(item => item.id === data.id);
        if(index < 0) {
          this.data.push({
            id: data.id,
            name: data.name
          });
          this.$refs.formValidate.validateField('detailListStr');
        }
      },
      remove(index) {
        this.data.splice(index, 1);
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            const _data = _vm.data.map(item => {
              return {
                chargeId: item.id
              };
            });
            _vm.formValidate.detailListStr = JSON.stringify(_data);
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/surgeryUpdateEdit.jhtml',
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
                  _vm.saveLoad = false
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
  .surgeryAddObj button {
    margin: 10px 10px 0;
  }

</style>
