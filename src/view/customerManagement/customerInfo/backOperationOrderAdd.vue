/** 
 * 项目赔款单
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerReparations')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        <p>{{$t('backOperationOrderAdd.label1')}}： {{showAmount}}</p>
      </Alert>
      <Form ref="formValidate" :model="formValidate" :label-width="70" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('backOperationOrderAdd.label2')" prop="detailListStr" required>
          <Table stripe :columns="col" :data="data"></Table>
        </Form-item>
        <Form-item :label="$t('backOperationOrderAdd.label3')" prop="point" required>
          <cmptInputNumber :min="0" v-model="formValidate.point" style='width:300px;'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click="save" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal
			:title="$t('backOrderAdd.tit3')"
			v-model="modal"
			:closable="false"
			@on-ok="ok"
			:loading="loading"
			width='700px'
			class-name="vertical-center-modal">
			<p>{{$t('backOperationOrderAdd.msg')}}</p>
			<Table stripe :columns="col2" :data="data2"></Table>
		</Modal>
  </div>
</template>

<script>
  import backOperationExpend from 'components/backOperationExpend.vue';
  export default {
    components: {
      backOperationExpend
    },
    data() {
      const validateData = (rule, value, callback) => {
        if (this.setData.length > 0) {
          callback()
        } else {
          callback(new Error(this.$t('backOperationOrderAdd.valid')))
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          point: 0,
          remark: '',
          detailListStr: '',
        },
        data: [],
        data2: [],
        col: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(backOperationExpend, {
                props: {
                  rowData: params.row.operationList,
                },
                on: {
                  'on-change': (index, obj) => {
                    console.log(obj, index)
                    this.data[params.index].operationList.splice(index, 1, obj);
                    this.data[params.index]._expanded = true;
                  }
                }
              })
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit1'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('backOperationOrderAdd.colTit2'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit3'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('backOperationOrderAdd.colTit4'),
            align: 'right',
            width: 60,
            key: 'finalPrice',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalPrice)) {
                return h('span', params.row.finalPrice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit5'),
            align: 'right',
            width: 60,
            key: 'allPrice',
            render: (h, params) => {
              if(Number.isFinite(params.row.allPrice)) {
                return h('span', params.row.allPrice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit6'),
            align: 'right',
            width: 60,
            key: 'depositAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.depositAmount)) {
                return h('span', params.row.depositAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit7'),
            align: 'right',
            width: 60,
            key: 'couponAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.couponAmount)) {
                return h('span', params.row.couponAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit8'),
            width: 60,
            key: 'restNum'
          }
        ],
        col2: [
          {
            title: this.$t('backOperationOrderAdd.colTit1'),
            width: 100,
            key: 'chargeName'
          },
          {
            title: this.$t('backOperationOrderAdd.colTit3'),
            width: 60,
            key: 'allNum'
          },
          {
            title: this.$t('backOperationOrderAdd.colTit14'),
            width: 60,
            key: 'realNum'
          },
          {
            title: this.$t('backOperationOrderAdd.colTit5'),
            align: 'right',
            width: 100,
            render: (h, params) => {
              const num = params.row.allPrice / params.row.allNum * params.row.realNum;
              return h('span', num.toFixed(2));
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit6'),
            align: 'right',
            width: 100,
            render: (h, params) => {
              const num = params.row.allCou / params.row.allNum * params.row.realNum;
              return h('span', num.toFixed(2));
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit13'),
            align: 'right',
            width: 100,
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          }
        ],
        modal: false,
        loading: true,
        ruleForm: {
          detailListStr: [{
            validator: validateData,
            trigger: 'change'
          }]
        }
      }
    },
    computed: {
      setData() {
        let _data = [];
        this.data.forEach(item => {
          item.operationList.forEach(item1 => {
            const _obj = {
              chargeID: item.chargeID,
              chargeName: item.chargeName,
              allPrice: item.allPrice,
              allCou: item.couponAmount,
              allNum: item.num,
              detailID: item.id,
              amount: item1.amount,
              realNum: item1.num,
              operationID: item1.id
            };
            _data.push(_obj);
          })
        });
        return _data.filter(item => item.amount);
      },
      showAmount() {
        const _sum = this.setData.reduce((pre, cur) => cur.amount + pre, 0);
        return _sum.toFixed(2)
      },
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/backOperationOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            const _data = res.data.content.List.map(item => {
              item.allPrice = item.finalPrice - item.couponAmount - item.depositAmount || 0;
              item._expanded = false,
              item.operationList.map(child => {
                child.amount = 0;
              });
              return {
                ...item
              };
            }) || [];
            const _col = _vm.tableCount(_data, ['allPrice', 'finalPrice', 'depositAmount', 'couponAmount']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            _vm.data = _data;
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      exceedMes() {
        const data = this.setData;
        let bool = true;
        let box = [];
        data.map(item => {
          if ((item.amount / item.realNum) > (item.allPrice + item.allCou) / item.allNum) {
            box.push(item)
            bool = false
          }
        });
        if(bool) {
					return true;
				} else {
					this.data2 = box;
					return false;
				}
      },
      save() {
        let _vm = this;
        const bool = _vm.exceedMes();
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.formValidate.detailListStr = JSON.stringify(_vm.setData);
            if (!bool) {
              _vm.modal = true;
            } else {
              _vm.saveLoad = true;
              _vm.$http.post({
                url: 'guard-webManager/customerRecord/AddBackOperationOrder.jhtml',
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
                        url: '/indexOrder',
                        text: _vm.cusName
                      }
                    ];
                    _vm.$store.dispatch('setBreadData', breadData);
                    _vm.$router.push('/indexOrder');
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
              })
            }

          }
        })
      },
      ok() {
        let _vm = this;
				_vm.$http.post({
					url: 'guard-webManager/customerRecord/AddBackOperationOrder.jhtml',
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
                  url: '/indexOrder',
                  text: _vm.cusName
                }
              ];
							_vm.$store.dispatch('setBreadData', breadData);
							_vm.$router.push('/indexOrder');
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
						console.log(res)
					}
				});
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
