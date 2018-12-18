/** 
 * 客户添加订单 
 */

<template>
  <div class="order-view order-add">
    <div class="container-box">
      <div class="container-header">
        <h2>{{$t('cusNavList.customerOrder')}}</h2>
      </div>
      <div class="container-body">
        <Alert type="success">
          <p v-if='key'>{{$t('orderAdd.msg1')}}</p>
          <ul v-else>
            <li v-for='(item, index) in discountEquityList' :key='index'>
              {{item.name}} {{$t('orderAdd.label1')}}{{item.discount.toFixed(2)}}% {{item.content}}
            </li>
          </ul>
          <p>{{$t('orderAdd.label2')}} {{allPrice}} {{$t('orderAdd.label3')}}{{allDeal}} {{$t('orderAdd.label4')}}{{allSell}}</p>
        </Alert>
        <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;' :rules="ruleForm">
          <Form-item prop="editData" required>
            <Table stripe :columns="editCol" :data="formEdit.editData"></Table>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model.trim="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
        <div class="footer-btnGroup">
          <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
          <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
        </div>
      </div>
    </div>
    <div class="order-search">
      <div class="search-box">
        <input-remote
          :list='searchList' 
          :asyncKey='asyncKey' 
          @on-change-word='changeWord' 
          @on-select='changeLabel' 
          idProp='id' 
          nameProp='name' 
          size='large'
          placement='top'
          :placeholder="$t('orderAdd.input')">
          <template slot="title">
            <p style="width: 10%">{{$t('labelPublic.bh')}}</p>
            <p style="width: 35%">{{$t('labelPublic.mc')}}</p>
            <p style="width: 15%">{{$t('labelPublic.gg')}}</p>
            <p style="width: 20%">{{$t('labelPublic.lx')}}</p>
            <p style="width: 10%; textAlign: right;">{{$t('orderAdd.label6')}}</p>
            <p style="width: 10%; textAlign: right;">{{$t('orderAdd.label7')}}</p>
          </template>
          <template scope="label">
            <p style="width: 10%">{{label.data.id}}</p>
            <p style="width: 35%">{{label.data.name}}</p>
            <p style="width: 15%">{{label.data.size}}</p>
            <p style="width: 20%">{{label.data.categoryName}}</p>
            <p style="width: 10%; textAlign: right;">{{label.data.price}}</p>
            <p style="width: 10%; textAlign: right;">{{label.data.stockNum}}</p>
          </template>
        </input-remote>
      </div>
      <div class="search-edit">
        <Form ref="formAdd" :model="formAdd" :label-width="80" label-position="right">
          <Row>
            <Col span="3">
            <Form-item :label="$t('orderAdd.label10')">
              <span>{{formAdd.stockNum}}</span>
            </Form-item>
            </Col>
            <Col span="3">
            <Form-item :label="$t('orderAdd.label11')">
              <span>{{formAdd.realPrice}}</span>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item :label="$t('orderAdd.label12')">
              <cmptInputNumber :max="1000000" :min="1" v-model="formAdd.num" style="width:100%" @on-change='setNum' :disabled='selectAllKey'></cmptInputNumber>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item :label="$t('orderAdd.label13')">
              <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.finalPrice" style="width:100%" @on-change='setPrice' :disabled='selectAllKey'></cmptInputNumber>
            </Form-item>
            </Col>
            <Col span="5">
            <Form-item :label="$t('orderAdd.label14')">
              <Select v-model="formAdd.doctorUserId" style="width:100%" :disabled='selectKey || selectAllKey'>
                <Option v-for="item in doctorList" :value="item.value" :key="item.value">{{ item.text }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="3" offset="1">
            <Button type="primary" icon="plus-round" long @click='searchAdd'>{{$t('publicSet.add')}}</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote},
    data() {
      const validateData = (rule, value, callback) => {
        if(this.formEdit.editData.length === 0) {
          callback(new Error(this.$t('orderAdd.valid1')));
        }
        const list = this.formEdit.editData.filter(item => item.assignDoctor === 1 && item.doctorUserId === '');
        if(list.length) {
          callback(new Error(this.$t('orderAdd.valid2')));
        }
        callback();
      };
      return {
        formAdd: {},
        formBox: [],

        //是否可以选择医生
        selectAllKey: false,
        selectKey: false,

        //是否套餐
        searchType: true,

        //快捷搜索
        searchList: [],
        asyncKey: true,
        searchIndex: 0,

        cusId: '',
        cusName: '',
        saveLoad: false,

        // 会员权益
        discountEquityList: [],
        key: true,

        // 编辑表格
        doctorList: [],
        editCol: [
          {
            title: this.$t('orderAdd.colTit1'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('orderAdd.colTit2'),
            width: 60,
            key: 'setName',
          },
          {
            title: this.$t('orderAdd.label11'),
            width: 60,
            render: (h, params) => {
              if (params.row.setid === 0) {
                return h('span', params.row.realPrice);
              } else {
                return h('span', '—');
              }
            }
          },
          {
            title: this.$t('orderAdd.label12'),
            width: 85,
            key: 'num',
            render: (h, params) => {
              if (params.row.setid === 0) {
                return h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 1,
                    value: params.row.num,
                    max: 1000000,
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.num = parseInt(val);
                      this.formEdit.editData[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.formEdit.editData[params.index].price = this.formEdit.editData[params.index].realPrice *
                        params.row.num;
                      this.formEdit.editData[params.index].finalPrice = this.formEdit.editData[params.index].realPrice *
                        params.row.num;
                      this.formEdit.editData[params.index].sell = 100;
                      this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index]);
                    }
                  }
                })
              } else {
                return h('span', params.row.num);
              }
            }
          },
          {
            title: this.$t('orderAdd.colTit3'),
            width: 60,
            key: 'price',
            render: (h, params) => {
              return h('span', params.row.price);
            }
          },
          {
            title: this.$t('orderAdd.colTit4'),
            width: 80,
            key: 'sell',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '80px'
                }
              }, [
                h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    value: params.row.sell,
                    max: 1000000,
                  },
                  style: {
                    width: '65px'
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.sell = parseFloat((val).toFixed(2));
                      this.formEdit.editData[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.formEdit.editData[params.index].finalPrice = parseFloat((this.formEdit.editData[
                        params.index].price * params.row.sell / 100).toFixed(2));
                      this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index]);
                    }
                  }
                }),
                h('span', '%')
              ])
            }
          },
          {
            title: this.$t('orderAdd.label13'),
            width: 85,
            key: 'finalPrice',
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.finalPrice,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.finalPrice = parseFloat((val).toFixed(2));
                    this.formEdit.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    if (this.formEdit.editData[params.index].price === 0) {
                      this.formEdit.editData[params.index].sell = 100;
                    } else {
                      this.formEdit.editData[params.index].sell = parseFloat((params.row.finalPrice * 100 / this.formEdit.editData[params.index].price).toFixed(2));
                    }
                    this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('orderAdd.label14'),
            width: 80,
            key: 'doctorUserId',
            render: (h, params) => {
              if (params.row.assignDoctor === 1) {
                return h('i-select', {
                  props: {
                    value: params.row.doctorUserId,
                    size: 'small',
                  },
                  on: {
                    'on-change': (val) => {
                      this.formEdit.editData[params.index].doctorUserId = val;
                    }
                  }
                }, this.doctorList.map(item => {
                  return h('i-option', {
                    props: {
                      value: item.value
                    }
                  }, item.text)
                }))
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 70,
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
                      this.remove(params.row, params.index);
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        formEdit: {
          editData: [],
          remark: ''
        },
        ruleForm: {
          editData: [{
            validator: validateData,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      allPrice() {
        const num = this.formEdit.editData.reduce((pre, cur) => cur.price + pre, 0);
        return num.toFixed(2);
      },
      allDeal() {
        const num = this.formEdit.editData.reduce((pre, cur) => cur.finalPrice + pre, 0);
        return num.toFixed(2);
      },
      allSell() {
        let _real = this.$t('orderAdd.msg2');
        if (this.formEdit.editData.length > 0) {
          if (parseFloat(this.allDeal) < parseFloat(this.allPrice)) {
            _real = (parseFloat(this.allDeal) / parseFloat(this.allPrice) * 100).toFixed(2) + '%';
          }
        }
        return _real;
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      //远程搜索
      changeWord(val) {
        let _vm = this;
        _vm.asyncKey = true;
        _vm.searchIndex++;
        const _index = _vm.searchIndex;
        _vm.$http.get({
          url: 'guard-webManager/select/chargeSearch.jhtml',
          data: {
            name: val
          },
          success: function (res) {
            if (res.data.code === 0) {
              if(_index === _vm.searchIndex) {
                _vm.searchList = res.data.content.map(item => {
                  if(item.status === '1') {
                    item.name = `${item.name}【${_vm.$t('orderAdd.label8')}】`;
                  }
                  if(item.status === '2') {
                    item.name = `${item.name}【${_vm.$t('orderAdd.label9')}】`;
                  }
                  if(item.status === '3') {
                    item.name = item.name + '【OTC】';
                  }
                  if(item.status === '4') {
                    item.name = item.name + '【RX】';
                  }
                  return item;
                }) || [];
                _vm.asyncKey = false;
              }
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //点击选项
      changeLabel(data) {
        let _vm = this;
        let url = '';
        let _stockNum = null;
        _vm.formAdd.stockNum = null;
        if(data.status === '1') {
          url = 'guard-webManager/select/chargeSetDetail.jhtml';
          _vm.searchType = false;
        } else {
          url = 'guard-webManager/select/chargeDetailList.jhtml';
          _vm.searchType = true;
          _stockNum = data.stockNum;
        }
        _vm.$http.get({
          url: url,
          data: {
            id: data.id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$refs['formAdd'].resetFields();
              if (_vm.searchType) {
                _vm.selectAllKey = false;
                let _data = res.data.content || {};
                _data.num = 1;
                _data.sell = 100;
                _data.setid = 0;
                _data.doctorUserId = '';
                _data.realPrice = _data.price;
                _data.finalPrice = _data.price;
                _data.stockNum = _stockNum;
                if (_data.assignDoctor !== 1) {
                  _vm.selectKey = true;
                } else {
                  _vm.selectKey = false;
                }
                _vm.formAdd = Object.assign({}, _data);
              } else {
                const _box = res.data.content.detailList.map(item => {
                  item.name = item.chargeName;
                  item.finalPrice = item.amount;
                  item.price = item.amount;
                  item.doctorUserId = '';
                  item.sell = 100;
                  item.assignDoctor = item.chargeAssignDoctor;
                  item.setName = res.data.content.name;
                  item.id = item.chargeid;
                  return item;
                }) || [];
                _vm.formAdd.realPrice = null;
                _vm.formAdd.id = 0;
                _vm.formBox = _box;
                _vm.selectAllKey = true;
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      //设置添加应收金额
      setPrice(val) {
        this.$nextTick(() => {
          this.formAdd.finalPrice = parseFloat((val).toFixed(2));
          //单单价为0
          if (this.formAdd.realPrice === 0) {
            this.formAdd.sell = 100;
          } else {
            this.formAdd.sell = parseFloat((val * 100 / this.formAdd.num / this.formAdd.realPrice).toFixed(2));
          }
        });
      },
      //设置添加数量
      setNum(val) {
        this.$nextTick(() => {
          this.formAdd.num = parseInt(val);
          this.formAdd.finalPrice = parseFloat((parseInt(val) * this.formAdd.realPrice).toFixed(2));
          this.formAdd.sell = 100;
        })
      },
      searchAdd() {
        if (Number.isFinite(this.formAdd.id)) {
          if (this.searchType) {
            this.formAdd.price = parseFloat((this.formAdd.num * this.formAdd.realPrice).toFixed(2));
            const _index = this.formEdit.editData.findIndex(item => item.setid === 0 && item.id === this.formAdd.id);
            if (_index < 0) {
              this.formEdit.editData.push(JSON.parse(JSON.stringify(this.formAdd)));
              this.$refs.formEdit.validateField('editData');
            } else {
              this.$Notice.error({
                title: this.$t('publicSet.noticeTit'),
                desc: this.$t('orderAdd.msg3')
              });
            }
          } else {
            const _box = JSON.parse(JSON.stringify(this.formBox))
            _box.map(item => {
              this.formEdit.editData.push(item)
            });
            this.$Notice.success({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('orderAdd.msg4')
            });
            this.$refs.formEdit.validateField('editData');
          }
        }
      },
      remove(data, index) {
        if (data.setid === 0) {
          this.formEdit.editData.splice(index, 1);
        } else {
          for (let i = 0; i < this.formEdit.editData.length; i++) {
            if (data.setid === this.formEdit.editData[i].setid) {
              this.formEdit.editData.splice(i, 1);
              i--;
            }
          }
        }
      },
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/orderAdd.jhtml',
          data: {
            customerId: id,
          },
          success: function (res) {
            //显示会员权益
            _vm.discountEquityList = res.data.content.DiscountEquityList.map(item => {
              item.discount = Number.isFinite(item.discount)
                ? item.discount * 100
                : 0;
              return item;
            }) || [];
            _vm.key = _vm.discountEquityList.length
              ? false
              : true;
						_vm.doctorList = eval(res.data.content.Arr) || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      save() {
        let _vm = this;
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            const _box = _vm.formEdit.editData.map(item => {
              return {
                chargeId: item.id,
                chargeName: item.name,
                num: item.num,
                price: item.price,
                finalPrice: item.finalPrice,
                setId: item.setid
                  ? item.setid
                  : null,
                doctorUserId: item.doctorUserId
              };
            });
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addOrder.jhtml',
              data: {
                customerId: _vm.cusId,
                remark: _vm.formEdit.remark,
                detailListStr: JSON.stringify(_box)
              },
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

<style scoped lang='less'>
  .order-add {
    position: relative;
    width: 100%;
    height: ~'calc(100% - 42px)';
    .container-box {
      height: 100%;
      padding-bottom: 150px;
      overflow: auto;
    }
    .order-search {
      box-shadow: 0 7px 14px 0 rgba(42, 42, 68, 0.1);
      border-radius: 4px;
    }
  }

</style>
