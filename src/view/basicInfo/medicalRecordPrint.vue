/**
* 病历模板打印设置页面
*/

<template>
  <div class="container-box medPrint">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <table class="tableEdit">
        <tbody>
          <tr class="table-item">
            <td>{{$t('medicalRecordPrint.label1')}}</td>
            <td>{{formValidate.width}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="edit('1')">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('medicalRecordPrint.label2')}}</td>
            <td>{{size}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="edit('2')">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('medicalRecordPrint.label5')}}</td>
            <td v-html='content'>{{content}}</td>
            <td class="action">
              <i-button type="primary" size="small"  @click="toEdit">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal
      :title="modalTit"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('medicalRecordPrint.label1')" prop="width" required v-if="key == '1'">
          <cmptInputNumber :min="0" :max='3000' v-model="formValidate.width" style='width:386px'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('medicalRecordPrint.label3')" prop="fontSize" required v-if="key == '2'">
          <cmptInputNumber :min="0" :max='100' v-model="formValidate.fontSize" style='width:386px'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('medicalRecordPrint.label4')" prop="fontFamily" required v-if="key == '2'">
          <Select v-model="formValidate.fontFamily">
            <Option v-for="item in list" :value="item.val" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        modalTit: '',
        modal: false,
        loading: true,
        key: '',
        formValidate: {
          id: '',
          width: 0,
          fontSize: 0,
          fontFamily: '',
        },
        titMsg: '',
        size: '',
        content: '',
      }
    },
    computed: {
      list () {
        return this.$store.getters.getFontFamilyList
      },
    },
    created () {
      if(typeof this.$route.query.id == 'string') {
        this.formValidate.id = this.$route.query.id
      } else {
        let lg = window.sessionStorage
        this.formValidate.id = JSON.parse(lg.query34).id
      }
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/medicalRecord/getPrint.jhtml',
          data: {id: _vm.formValidate.id},
          success: function(res){
            console.log(res)    
            _vm.titMsg = res.data.content.name
            _vm.formValidate.width = res.data.content.width
            _vm.formValidate.fontSize = res.data.content.fontsize
            _vm.formValidate.fontFamily = res.data.content.fontfamily
            _vm.size = res.data.content.fontfamily.split(',')[0] + ' ' + res.data.content.fontsize + 'px'
            _vm.content = res.data.content.content
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      edit (type) {
        if(type == '1') {
          this.modalTit = this.$t('medicalRecordPrint.msg1');
        } else {
          this.modalTit = this.$t('medicalRecordPrint.msg2');
        }
        this.key = type
        this.modal = true
      },
      ok () {
        let _vm = this,
        _url = ''
        if(_vm.key == '1') {
          _url = 'guard-webManager/medicalRecord/updateWidth.jhtml'
        } else {
          _url = 'guard-webManager/medicalRecord/updateFont.jhtml'
        }
        _vm.$http.post({
          url: _url,
          data: _vm.formValidate,
          success: function(res){
            if(res.data.code === 0 ){
              _vm.getList()
              _vm.modal = false
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              })
              _vm.loading = false
              _vm.$nextTick(() => {
                _vm.loading = true
              })
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      toEdit () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/medicalRecord',
            text: 'layoutNav.medicalRecordManage'
          },
          {
            url: '/medicalRecordPrint',
            text: 'medicalRecord.msg3'
          },
          {
            url: '/medicalRecordUpdate',
            text: 'medicalRecordPrint.msg3'
          },
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/medicalRecordUpdate',
          query: {
            id: this.formValidate.id
          }
        })
      },
    }
  }
</script>

<style scoped>
  .medPrint .table-item td:first-child {
    background: rgba(73,133,243,0.05);
    width: 100px;
  }
  .medPrint .table-item .action {
    width: 100px;
    text-align: center;
  }
  .medPrint .tableEdit th {
    border-right: 1px solid rgba(65, 65, 65, 0.3); 
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
  }
</style>

<style>
  .medPrint .tableEdit td table {
    border-collapse:collapse;
    border-top: 1px solid rgba(65, 65, 65, 0.3);
    border-left: 1px solid rgba(65, 65, 65, 0.3);
  }
</style>