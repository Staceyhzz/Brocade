/** 
 * 项目折扣 
 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.chargeDiscountManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'>
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="50" inline ref='formSearch' :model='formSearch' @submit.native.prevent>
        <Form-item :label="$t('labelPublic.mc')" prop='name'>
          <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter='getList(1, 10, formSearch)'></Input>
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
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('chargeDiscount.label1')" prop="chargeId" required>
            <Input v-model="chargeName" readonly icon="ios-search" :placeholder="$t('placeholderPublic.sfxm')" @on-focus='showCharge' v-if='key' style='width:300px'></Input>
						<span v-else>{{chargeName}}</span>
          </Form-item>
          <Form-item :label="$t('labelPublic.price')" v-if='!key'>
            <span>{{chargePrice}}</span>
          </Form-item>
          <Form-item :label="$t('chargeDiscount.label2')" prop="discount" required>
						<cmptInputNumber :max="100" :min="0" v-model="formValidate.discount" style='width:300px'></cmptInputNumber>
          </Form-item>
        </Form>
      </Modal>
			<cmptChargeChoose :placeHolder="$t('placeholderPublic.sfxm')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
	import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
		components: {cmptChargeChoose},
    data() {
      const validateCid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('placeholderPublic.sfxm')));
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
						title: this.$t('labelPublic.bh'),
						width: 60,
            key: 'chargeid'
          },
          {
						title: this.$t('labelPublic.mc'),
						width: 60,
            key: 'chargeNameLang'
          },
          {
						title: this.$t('labelPublic.lx'),
						width: 60,
            key: 'chargeCategoryNameLang'
          },
          {
						title: this.$t('labelPublic.price'),
						align: 'right',
            width: 60,
            key: 'chargePrice',
            render: (h, params) => {
              if(params.row.chargePrice || params.row.chargePrice === 0) {
                return h('span', params.row.chargePrice.toFixed(2));
              }
            }
          },
          {
						title: this.$t('chargeDiscount.label2'),
						align: 'right',
            width: 60,
            key: 'discount',
            render: (h, params) => {
              if(params.row.discount || params.row.discount === 0) {
                return h('span', (params.row.discount * 100).toFixed(2));
              }
            }
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
                }, this.$t('publicSet.del')),
              ])
            }
          }
        ],
				data: [],
				
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          name: ''
				},
				
        modalTit: '',
        modalEdit: false,
        loading: true,
        key: true,

        formValidate: {
					id: '',
          discount: 100,
          chargeId: ''
        },
        chargeName: '',
				chargePrice: '',
				chargeOpenKey: false,
				
        ruleForm: {
          chargeId: [{
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
        if(val === 'chargeDiscount') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created() {
      this.getList('1', '10', this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        var _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/chargeDiscount/page.jhtml',
          data: form,
          success: function (res) {
            const props = ['chargeName', 'chargeCategoryName'];
            const _data = res.data.content.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            const _col = _vm.tableCount(_data, ['chargePrice', 'discount']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'chargeDiscount') {
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
        });
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('chargeDiscount.msg1')}</p>
          <p>${_vm.$t('chargeDiscount.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.chargeNameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/chargeDiscount/del.jhtml',
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
                  if(_vm.langRouterKey !== 'chargeDiscount') {
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
        this.$refs[name].resetFields();
				this.getList('1', '10', this.formSearch)
      },
      add() {
        this.modalTit = this.$t('chargeDiscount.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.chargeName = '';
        this.key = true;
        this.modalEdit = true;
      },
      edit(data) {
        this.modalTit = this.$t('chargeDiscount.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.chargeName = data.chargeNameLang || '';
				this.chargePrice = data.chargePrice.toFixed(2) || '';
				this.formValidate = {
					id: data.id,
					discount: data.discount * 100,
					chargeId: data.chargeid
				};
        this.key = false;
        this.modalEdit = true;
      },
      showCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseCharge (data) {
        this.formValidate.chargeId = data.id;
        this.chargeName = data.name;
      },
      ok() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            var url = '';
            if (!_vm.key) {
              url = 'guard-webManager/chargeDiscount/update.jhtml'
            } else {
              url = 'guard-webManager/chargeDiscount/add.jhtml'
            }
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'chargeDiscount') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
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
            });
          }
        })
      },
    }
  }

</script>
