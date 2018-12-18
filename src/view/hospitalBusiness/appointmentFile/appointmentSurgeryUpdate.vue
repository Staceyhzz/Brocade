/**
* 编辑手术预约信息页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('treatSchedulerAdd.tit4')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('appointmentConsultUpdate.label1')">
          <span>{{formShow.time}}</span>
        </Form-item>
        <Form-item :label="$t('appointmentConsultUpdate.label2')">
          <span>【{{formShow.createUserHospitalName}}】【{{formShow.deptName}}】【{{formShow.userName}}】</span>
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
        <Form-item :label="$t('appointmentHover.label8')" prop="anesthesiaType">
          <Radio-group v-model="formValidate.anesthesiaType">
            <Radio :label="1">{{$t('appointmentHover.label9')}}</Radio>
            <Radio :label="2">{{$t('appointmentHover.label10')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('appointmentConsultAdd.label2')" prop="userId">
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in nameList" :value="item.id" :key="item.id" :label='item.name'>
              <span>{{item.name}}</span>
              <span style="float:right;color:#ccc">{{item.deptName}}</span>
            </Option>
          </Select>
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
      <cmptChargeChoose :placeHolder="$t('treatSchedulerAdd.valid')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeChoose},
    data () {
      const validateObj = (rule, value, callback) => {
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
        formShow: {
          time: '',
          createUserHospitalName: '',
          hospName: '',
          deptName: '',
          userName: '',
          cusName: '',
          cusId: ''
        },
        timeDay: '',
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        formValidate: {
          id: '',
          appointmentDate: '',
          startTime: '',
          endTime: '',
          remark: '',
          userId: '',
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
      this.getId()
    },
    methods: {
      // 获取资料
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/appointmentDesk/surgeryUpdate.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            _vm.formShow = {
              time: res.data.content.Surgery.createtime || '',
              createUserHospitalName: res.data.content.Surgery.createUserHospitalName || '',
              hospName: res.data.content.Surgery.hospitalName || '',
              deptName: res.data.content.Surgery.createUserDeptName || '',
              userName: res.data.content.Surgery.createUserName || '',
              cusName: res.data.content.Surgery.customerName || '',
              cusId: res.data.content.Surgery.customerid || ''
            }
            _vm.nameList = res.data.content.AppointmentUserList || []
            _vm.timeDay = res.data.content.Surgery.appointmentdate.split(' ')[0] || ''
            _vm.timeBox = [res.data.content.Surgery.appointmenttimestart.split(' ')[1], res.data.content.Surgery.appointmenttimeend.split(' ')[1]]
            _vm.formValidate = {
              id: res.data.content.Surgery.id || '',
              appointmentDate: res.data.content.Surgery.appointmentdate.split(' ')[0] || '',
              startTime: res.data.content.Surgery.appointmenttimestart.split(' ')[1],
              endTime: res.data.content.Surgery.appointmenttimeend.split(' ')[1],
              remark: res.data.content.Surgery.remark || '',
              anesthesiaType: res.data.content.Surgery.anesthesiatype || 1,
              userId: res.data.content.Surgery.userid || '',
              detailListStr: ''
            }
            _vm.data = res.data.content.Surgery.detailList.map(item => {
              item.name = item.chargeName
              item.id = item.chargeid
              return item
            })
            _vm.formValidate.detailListStr = _vm.toSave
            _vm.getBuy(_vm.formShow.cusId)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
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
      saveDate (date) {
        this.formValidate.appointmentDate = date
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
        this.modalall = false
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
              url: 'guard-webManager/appointmentDesk/surgeryUpdateEdit.jhtml',
              data: _vm.formValidate,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  if(_vm.$route.query.type === '1') {
                    _vm.$router.push({
                      path: '/appointmentSurgery',
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
            });
          }
        })
      },
      back () {
        if(this.$route.query.type === '1') {
          this.$router.push({
            path: '/appointmentSurgery',
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

<style scoped>
 .surgeryAddObj button {
  margin: 10px 10px 0;
} 
</style>

