/** 
 * 医院审核规则设置 
 */

<template>
  <div class="container-box medPrint" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.printManage')}}</h2>
    </div>
    <div class="container-body">
      <div class="customer-item" v-for='item in data' :key='item.id'>
        <div class="customer-item-title">
          <h3>
            <Icon type="pricetag"></Icon>{{$t('print.' + item.title)}}</h3>
        </div>
        <table class="tableEdit">
          <tbody>
            <tr class="table-item">
              <td>{{$t('print.label1')}}</td>
              <td>{{item.width}}</td>
              <td class="action">
                <i-button type="primary" size="small" @click="edit(item, true)">
                  <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
                </i-button>
              </td>
            </tr>
            <tr class="table-item">
              <td>{{$t('print.label2')}}</td>
              <td>{{item.fontfamily.split(',')[0] + ' ' + item.fontsize + 'px'}}</td>
              <td class="action">
                <i-button type="primary" size="small" @click="edit(item, false)">
                  <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
                </i-button>
              </td>
            </tr>
            <tr class="table-item">
              <td>{{$t('print.label3')}}</td>
              <td v-html='item.content' class="font-print">{{item.content}}</td>
              <td class="action">
                <i-button type="primary" size="small" @click="toEdit(item)">
                  <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
                </i-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal :title="modalTit" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('print.label1')" prop="width" required v-if="key">
          <cmptInputNumber :min="0" :max='10000' v-model="formValidate.width" style='width:386px'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('print.label4')" prop="fontSize" required v-if="!key">
          <cmptInputNumber :min="0" :max='10000' v-model="formValidate.fontSize" style='width:386px'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.lx')" prop="fontFamily" required v-if="!key">
          <Select v-model="formValidate.fontFamily">
            <Option v-for="item in list" :value="item.val" :key="item.name">{{ item.name }}</Option>
          </Select>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hospId: '',
        hospName: '',
        modalTit: '',
        loading: true,
        modal: false,
        key: true,
        formValidate: {
          id: '',
          fontSize: 0,
          fontFamily: '',
          width: 0,
        },
        data: []
      }
    },
    computed: {
      list() {
        return this.$store.getters.getFontFamilyList;
      },
      typeList() {
        return this.$store.getters.getPrintTypeSet;
      },
    },
    created() {
      if (typeof this.$route.query.id == 'string') {
        this.hospId = this.$route.query.id
        this.hospName = this.$route.query.name
      } else {
        var lg = window.sessionStorage;
        this.hospId = JSON.parse(lg.query34).id
        this.hospName = JSON.parse(lg.query34).name
      }
      this.getList(this.hospId)
    },
    methods: {
      getList(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/printSet/list.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            let _data = res.data.content || [];
            _vm.data = _data.map(item => {
              const index = _vm.typeList.findIndex(t => t.id === item.type);
              return {
                ...item,
                title: index >= 0 ? _vm.typeList[index].nameLang : ''
              };
            });
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      edit(data, type) {
        if (type) {
          this.modalTit = this.$t('print.modalTit2');
          this.formValidate.width = data.width;
        } else {
          this.modalTit = this.$t('print.modalTit1');
          this.formValidate.fontSize = data.fontsize;
          this.formValidate.fontFamily = data.fontfamily;
        }
        this.key = type;
        this.formValidate.id = data.id;
        this.modal = true;
      },
      ok() {
        let _vm = this,
          _url = '';
        if (_vm.key) {
          _url = 'guard-webManager/printSet/updateWidth.jhtml'
        } else {
          _url = 'guard-webManager/printSet/updateFont.jhtml'
        }
        _vm.$http.post({
          url: _url,
          data: _vm.formValidate,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.getList(_vm.hospId)
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
          error: function (res) {
            console.log(res)
          }
        })
      },
      toEdit(data, type) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/print',
            text: 'layoutNav.printManage'
          },
          {
            url: '/printHospital',
            text: this.hospName
          },
          {
            url: '/printHospitalUpdate',
            text: 'print.modalTit3'
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/printHospitalUpdate',
          query: {
            id: data.id,
            type: data.type
          }
        })
      }
    }
  }

</script>

<style scoped>
  .medPrint .table-item td:first-child {
    background: rgba(73, 133, 243, 0.05);
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

  .medPrint .font-print {
    font: initial;
  }

</style>
