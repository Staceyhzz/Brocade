/** 
 * 预约项目 
 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.appointmentChargeManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'>
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="70" inline ref='formSearch' :model='formSearch'>
        <Form-item :label="$t('appointmentCharge.label4')" prop='name'>
          <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter='getList(1, 10, formSearch)'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.pym')" prop='pinyin'>
          <Input v-model.trim="formSearch.pinyin" :placeholder="$t('placeholderPublic.input')" @on-enter='getList(1, 10, formSearch)'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch)">
            <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="110" label-position="right">
          <Form-item :label="$t('appointmentCharge.label1')" prop="chargeName" required>
            <Input v-model="formValidate.chargeName" readonly icon="ios-search" :placeholder="$t('appointmentCharge.valid')" @on-focus='showCharge' v-if='!key'></Input>
						<span v-else>{{formValidate.name}}</span>
          </Form-item>
          <Form-item :label="$t('appointmentCharge.label2')" prop="defaultTime" required>
            <cmptInputNumber :min="0" v-model="formValidate.defaultTime" style='width:378px'></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('appointmentCharge.label3')" prop="instrumentId">
            <Select v-model="formValidate.instrumentId">
              <Option v-for="item in instrumentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Form>
      </Modal>
			<cmptChargeChoose :placeHolder="$t('appointmentCharge.valid')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
	import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
		components: {cmptChargeChoose},
    data() {
      const validateCid = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error(this.$t('appointmentCharge.valid')));
        } else {
          callback();
        }
      };
      return {
        columns: [
					{
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('appointmentCharge.colTit'),
            width: 60,
            key: 'chargeid'
          },
          {
						title: this.$t('appointmentCharge.label4'),
						width: 80,
            key: 'chargeNameLang'
          },
          {
            title: this.$t('labelPublic.pym'),
            width: 60,
            key: 'chargePinYin'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'chargeSizeLang',
          },
          {
            title: this.$t('appointmentCharge.label2'),
						width: 60,
            key: 'defaulttime',
          },
          {
            title: this.$t('appointmentCharge.label3'),
						width: 60,
            key: 'instrumentNameLang',
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
       
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          name: '',
          pinyin: '',
        },
        modalTit: '',
        modalEdit: false,
        loading: true,
        key: true,
				instrumentList: [],
				chargeOpenKey: false,
        formValidate: {
          id: '',
          chargeId: '',
          chargeName: '',
          defaultTime: 0,
          instrumentId: '',
        },
        
       
        ruleForm: {
          chargeName: [{
            validator: validateCid,
            trigger: 'change'
          }]
        }
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'appointmentCharge') {
          this.getList('1', '10', this.formSearch);
        }
      },
    },
    created() {
      this.getList('1', '10', this.formSearch)
    },
    mounted() {
      this.getInstrumentList(localStorage.getItem('hospId'))
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/appointmentCharge/page.jhtml',
          data: form,
          success: function (res) {
            const props = ['chargeName', 'chargeSize', 'instrumentName'];
            const _data = res.data.content.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'appointmentCharge') {
              console.log(_data)
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total
            _vm.pageNumber = res.data.content.pageNumber
            _vm.totalPages = res.data.content.totalPages
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      //获取设备下拉
      getInstrumentList(id) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/instrumentInfo.jhtml',
          data: {
            hospitalId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.instrumentList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('appointmentCharge.msg1')}</p>
          <p>${_vm.$t('appointmentCharge.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.chargeNameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/appointmentCharge/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'appointmentCharge') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
				this.getList('1', '10', this.formSearch)
      },
      add() {
        this.modalTit = this.$t('appointmentCharge.modalTit1');
        this.formValidate.chargeName = ''
        this.$refs['formValidate'].resetFields()
        this.key = false
        this.modalEdit = true
      },
      edit(data) {
        this.modalTit = this.$t('appointmentCharge.modalTit2');
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = data.id
        this.formValidate.chargeName = data.chargeName
        this.formValidate.defaultTime = data.defaulttime
        this.formValidate.instrumentId = data.instrumentid
        this.key = true
        this.modalEdit = true
      },
      showCharge() {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseCharge(data) {
        this.formValidate.chargeId = data.id;
        this.formValidate.chargeName = data.name;
      },
      ok() {
        let _vm = this
        let _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.key) {
              _url = 'guard-webManager/appointmentCharge/update.jhtml'
            } else {
              _url = 'guard-webManager/appointmentCharge/add.jhtml'
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.modalEdit = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'appointmentCharge') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  })
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            })
          }
        })
      },
    }
  }

</script>
