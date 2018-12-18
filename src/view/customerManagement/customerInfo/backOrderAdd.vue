/** 
 * 退项目订单页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerBack')}}</h2>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated="false">
        <TabPane :label="$t('backOrderAdd.tit1')" name="name1">
          <Alert type="success" class='backOrderMes'>
            <p>{{$t('backOrderAdd.label1')}} {{showNum}}</p>
            <p>{{$t('backOrderAdd.label2')}} {{showAmount}}</p>
          </Alert>
          <Form ref="formValidate" :model="formValidate" :label-width="70" label-position="right" :rules="ruleForm">
            <Form-item :label="$t('backOrderAdd.label3')" prop="detailListStr" required>
              <Table stripe :columns="col" :data="data"></Table>
            </Form-item>
            <Form-item :label="$t('backOrderAdd.label4')" prop="point" required>
              <cmptInputNumber :min="0" v-model="formValidate.point" style='width:300px;'></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('labelPublic.ms')" prop="remark">
              <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
          </Form>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click="save(1)" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </TabPane>
        <TabPane :label="$t('backOrderAdd.tit2')" name="name2">
          <Alert type="success" class='backOrderMes'>
            <p>{{$t('backOrderAdd.label1')}} {{showNum1}}</p>
            <p>{{$t('backOrderAdd.label2')}} {{showAmount1}}</p>
          </Alert>
          <Form ref="formAdd" :model="formAdd" :label-width="70" label-position="right" :rules="ruleForm1">
            <Form-item :label="$t('backOrderAdd.label3')" prop="detailListStr" required>
              <Table stripe :columns="col1" :data="data1"></Table>
            </Form-item>
            <Form-item :label="$t('backOrderAdd.label4')" prop="point" required>
              <cmptInputNumber :min="0" v-model="formAdd.point" style='width:300px;'></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('labelPublic.ms')" prop="remark">
              <Input v-model="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
          </Form>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click="save(2)" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
		<Modal
			:title="$t('backOrderAdd.tit3')"
			v-model="modal"
			:closable="false"
			@on-ok="ok"
			:loading="loading"
			width='700px'
			class-name="vertical-center-modal">
			<p>{{$t('backOrderAdd.msg')}}</p>
			<Table stripe :columns="col2" :data="data2"></Table>
		</Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateData = (rule, value, callback) => {
				const list = this.data.filter(item => item.backNum);
				if(!list.length) {
					callback(new Error(this.$t('backOrderAdd.valid1')));
				}
				callback();
      }
      const validateData1 = (rule, value, callback) => {
				const list = this.data1.filter(item => item.backNum);
				if(!list.length) {
					callback(new Error(this.$t('backOrderAdd.valid2')));
				}
				callback();
      }
      return {
        cusName: '',
				saveLoad: false,
				
				modal: false,
				loading: true,
				okUrl: '',
				okData: {},
				col2: [
					{
						title: this.$t('backOrderAdd.colTit1'),
						width: 80,
            key: 'chargeName'
					},
					{
						title: this.$t('backOrderAdd.colTit3'),
						width: 60,
            key: 'num'
					},
					{
						title: this.$t('backOrderAdd.colTit9'),
						width: 60,
            key: 'backNum'
					},
					{
						title: this.$t('backOrderAdd.colTit10'),
						width: 100,
						align: 'right',
						render: (h, params) => {
							return h('span', params.row.backAmount.toFixed(2));
						}
					},
					{
						title: this.$t('backOrderAdd.colTit5'),
						width: 100,
            align: 'right',
						render: (h, params) => {
							const num = (params.row.realPrice / params.row.num).toFixed(2) * params.row.backNum;
							return h('span', num.toFixed(2));
						}
					},
					{
						title: this.$t('backOrderAdd.colTit6'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							const num = (params.row.depositAmount / params.row.num).toFixed(2) * params.row.backNum;
							return h('span', num.toFixed(2));
						}
          }
				],
				data2: [],

        formValidate: {
          customerId: '',
          point: 0,
          remark: '',
          detailListStr: '',
        },
        col: [
					{
						title: this.$t('backOrderAdd.colTit1'),
						width: 60,
            key: 'chargeName'
          },
          {
						title: this.$t('backOrderAdd.colTit2'),
						width: 80,
            render: (h, params) => {
							if(params.row.orderPaidTime) {
								const _text = params.row.orderPaidTime.split(' ')[0];
								return h('span', _text);
							}
            }
          },
          {
            title: this.$t('backOrderAdd.colTit3'),
						width: 60,
            key: 'num'
          },
          {
            title: this.$t('backOrderAdd.colTit4'),
						width: 60,
						key: 'finalPrice',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.finalPrice)) {
              	return h('span', params.row.finalPrice.toFixed(2));
							}
            }
          },
          {
						title: this.$t('backOrderAdd.colTit5'),
						width: 60,
						key: 'realPrice',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.realPrice)) {
              	return h('span', params.row.realPrice.toFixed(2));
							}
            }
          },
          {
						title: this.$t('backOrderAdd.colTit6'),
						width: 60,
						key: 'depositAmount',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.depositAmount)) {
              	return h('span', params.row.depositAmount.toFixed(2));
							}
            }
          },
          {
						title: this.$t('backOrderAdd.colTit7'),
						width: 60,
						key: 'couponAmount',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.couponAmount)) {
              	return h('span', params.row.couponAmount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('backOrderAdd.colTit8'),
						width: 60,
            key: 'restNum'
          },
          {
            title: this.$t('backOrderAdd.colTit9'),
						width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  max: params.row.restNum,
                  value: params.row.backNum
                },
                on: {
                  'on-change': (val) => {
                    params.row.backNum = parseInt(val);
                    this.data[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data[params.index].backAmount = parseFloat(((params.row.finalPrice - params.row.couponAmount) /
                      params.row.num * params.row.backNum).toFixed(2));
                    this.data.splice(params.index, 1, this.data[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('backOrderAdd.colTit10'),
						width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.backAmount,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.backAmount = parseFloat((val).toFixed(2));
                    this.data[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data.splice(params.index, 1, this.data[params.index]);
                  }
                }
              })
            }
          }
        ],
        data: [],
        ruleForm: {
          detailListStr: [{
            validator: validateData,
            trigger: 'change'
          }]
        },


        formAdd: {
          customerId: '',
          point: 0,
          remark: '',
          detailListStr: '',
        },
        data1: [],
        col1: [
					{
						title: this.$t('backOrderAdd.colTit1'),
						width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('backOrderAdd.colTit2'),
						width: 60,
            render: (h, params) => {
							if(params.row.orderPaidTime) {
								const _text = params.row.orderPaidTime.split(' ')[0];
								return h('span', _text);
							}
            }
          },
          {
            title: this.$t('backOrderAdd.colTit11'),
						width: 60,
            key: 'num'
          },
          {
            title: this.$t('backOrderAdd.colTit12'),
						width: 60,
            key: 'restNum'
          },
          {
            title: this.$t('backOrderAdd.colTit4'),
						width: 60,
						key: 'finalPrice',
						align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalPrice)) {
              	return h('span', params.row.finalPrice.toFixed(2));
							}
            }
          },
          {
            title: this.$t('backOrderAdd.colTit5'),
						width: 60,
						key: 'realPrice',
						align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.realPrice)) {
              	return h('span', params.row.realPrice.toFixed(2));
							}
            }
          },
          {
						title: this.$t('backOrderAdd.colTit6'),
						width: 60,
						key: 'depositAmount',
						align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.depositAmount)) {
              	return h('span', params.row.depositAmount.toFixed(2));
							}
            }
          },
          {
						title: this.$t('backOrderAdd.colTit7'),
						width: 60,
						key: 'couponAmount',
						align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.couponAmount)) {
              	return h('span', params.row.couponAmount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('backOrderAdd.colTit13'),
						width: 60,
            key: 'isBack'
          },
          {
            title: this.$t('backOrderAdd.colTit9'),
						width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  max: params.row.num - params.row.isBack,
                  value: params.row.backNum
                },
                on: {
                  'on-change': (val) => {
                    params.row.backNum = parseInt(val);
                    this.data1[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data1[params.index].backAmount = parseFloat(((params.row.finalPrice - params.row.couponAmount) /
                      params.row.num * params.row.backNum).toFixed(2));
                    this.data1.splice(params.index, 1, this.data1[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('backOrderAdd.colTit10'),
						width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.backAmount,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.backAmount = parseFloat((val).toFixed(2));
                    this.data1[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data1.splice(params.index, 1, this.data1[params.index]);
                  }
                }
              })
            }
          }
				],
				


        ruleForm1: {
          detailListStr: [{
            validator: validateData1,
            trigger: 'change'
          }]
        },
      }
    },
    computed: {
      showAmount() {
				const num = this.data.reduce((pre, cur) => cur.backAmount + pre, 0);
				return num.toFixed(2);
      },
      showAmount1() {
        const num = this.data1.reduce((pre, cur) => cur.backAmount + pre, 0);
				return num.toFixed(2);
      },
      showNum() {
				return this.data.reduce((pre, cur) => cur.backNum + pre, 0);
      },
      showNum1() {
        return this.data1.reduce((pre, cur) => cur.backNum + pre, 0);
      },
    },
    created() {
			this.formValidate.customerId = sessionStorage.getItem('cusId');
			this.formAdd.customerId = sessionStorage.getItem('cusId');
			this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    mounted() {
      this.getList(this.formAdd.customerId)
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/backOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            const _data = res.data.content.List.map(item => {
							item.backAmount = 0;
							item.backNum = 0;
							item.realPrice = Number.isFinite(item.finalPrice) && Number.isFinite(item.couponAmount) && Number.isFinite(item.depositAmount)
								? item.finalPrice - item.couponAmount - item.depositAmount
								: 0;
              return item
						}) || [];
						const _col = _vm.tableCount(_data, ['depositAmount', 'couponAmount', 'finalPrice', 'realPrice']);
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
      // 获取资料
      getList(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/backSailAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
							const _data = res.data.content.List.map(item => {
								item.isBack = item.backNum;
								item.backAmount = 0;
								item.backNum = 0;
								item.realPrice = Number.isFinite(item.finalPrice) && Number.isFinite(item.couponAmount) && Number.isFinite(item.depositAmount)
									? item.finalPrice - item.couponAmount - item.depositAmount
									: 0;
								return item;
							}) || [];
							const _col = _vm.tableCount(_data, ['depositAmount', 'couponAmount', 'finalPrice', 'realPrice']);
							_col.map(item => {
								const index = _vm.col1.findIndex(col => col.key === item.key);
								console.log(item)
								if(index >= 0) {
									_vm.col1[index].width = item.width;
								}
							});
							_vm.data1 = _data;
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
			},
			//弹窗提示信息
			exceedMes(type) {
				const list = type
					? this.data.filter(item => item.backNum)
					: this.data1.filter(item => item.backNum);
				let bool = true;
				let box = [];
				list.map(item => {
					const result = item.backAmount / item.backNum;
					const first = (item.finalPrice - item.couponAmount) / item.num;
					if(result > first) {
						box.push(item);
						bool = false;
					}
				});
				if(bool) {
					return true;
				} else {
					this.data2 = box;
					return false;
				}
			},
			//保存信息
			setSave(type) {
				const list = type
					? this.data.filter(item => item.backNum)
					: this.data1.filter(item => item.backNum);
				const box = list.map(item => {
					return {
						detailId: item.id,
						chargeId: item.chargeID,
						num: item.backNum,
						amount: item.backAmount
					};
				});
				return JSON.stringify(box);
			},
      save(type) {
				let _vm = this;
				let bool = '';
				let name = '';
				let url = '';
				let data = {};
				if(type === 1) {
					url = 'guard-webManager/customerRecord/AddBackOrder.jhtml';
					name = 'formValidate';
					_vm.formValidate.detailListStr = _vm.setSave(true);
					data = _vm.formValidate;
					bool = _vm.exceedMes(true);
				} else {
					url = 'guard-webManager/customerRecord/AddBackSailOrder.jhtml';
					name = 'formAdd';
					_vm.formAdd.detailListStr = _vm.setSave(false);
					data = _vm.formAdd;
					bool = _vm.exceedMes(false);
				}
        _vm.$refs[name].validate((valid) => {
          if (valid) {
            if (!bool) {
							_vm.okUrl = url;
							_vm.okData = data;
							_vm.modal = true;
            } else {
              _vm.saveLoad = true
              _vm.$http.post({
                url: url,
                data: data,
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
              })
            }

          }
        })
			},
			ok() {
				let _vm = this;
				_vm.$http.post({
					url: _vm.okUrl,
					data: _vm.okData,
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
        this.$router.back(-1);
      }
    }
  }

</script>

<style>
  .backOrderMes {
    margin-top: 20px;
  }

</style>
