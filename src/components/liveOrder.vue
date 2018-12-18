/** 
 * 订单弹窗组件 
 */
<template>
  <Modal :title="$t('liveDeskOrderDetail.btn')" v-model="modal" :mask-closable='false' width='90%' @on-cancel='resetModal' class-name="live-order-center">
    <transition name="fade" mode="out-in">
      <div id="liveOrder" class="order-view" v-if='orderKey' key='order'>
        <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;' :rules="ruleForm">
          <Form-item prop="editData" required>
            <Table stripe :columns="editCol" :data="formEdit.editData" :height='330'></Table>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
        <div class="order-search">
          <div class="search-box">
            <!-- <infinite-list :list='searchList' :asyncKey='asyncKey' @on-change-word='changeWord' @on-select='changeLabel' :hasMore='false' idProp='id' nameProp='name' :placeholder="$t('orderAdd.input')" ref='scroll'>
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
            </infinite-list> -->
            <input-remote
              :list='searchList' 
              :asyncKey='asyncKey' 
              @on-change-word='changeWord' 
              @on-select='changeLabel' 
              idProp='id' 
              nameProp='name' 
              size='large'
              placement='top'
              ref='scroll'
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
                <Form-item :label="$t('liveDeskOrderDetail.label1_2')">
                  <span>{{formAdd.stockNum}}</span>
                </Form-item>
                </Col>
                <Col span="3">
                <Form-item :label="$t('liveDeskOrderDetail.colTit1_2')">
                  <span>{{formAdd.realPrice}}</span>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item :label="$t('liveDeskOperation.colTit6')">
                  <cmptInputNumber :max="1000000" :min="1" v-model="formAdd.num" style="width:100%" @on-change='setNum' :disabled='selectAllKey'></cmptInputNumber>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item :label="$t('liveDeskOrderDetail.colTit1_5')">
                  <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.finalPrice" style="width:100%" @on-change='setPrice' :disabled='selectAllKey'></cmptInputNumber>
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item :label="$t('liveDeskOrderDetail.label1_1')">
                  <Select v-model="formAdd.doctorUserId" style="width:100%" :disabled='selectKey || selectAllKey'>
                    <Option v-for="item in _orderDocList" :value="item.value" :key="item.value">{{ item.text }}</Option>
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
      <div v-else key='price'>
        <Row>
          <Col span="3">
						<div class="tree-box">
          		<Tree :data="treeData" @on-select-change='chooseTree' ref='treeList'></Tree>
						</div>
          </Col>
          <Col span="20" offset="1">
						<Row :gutter="24" style='marginBottom:16px;'>
							<Col span="4">
								<Select v-model="formPrice.type">
									<Option :value="1">{{$t('chargePriceList.type1')}}</Option>
									<Option :value="2">{{$t('chargePriceList.type2')}}</Option>
									<Option :value="3">{{$t('chargePriceList.type3')}}</Option>
								</Select>
							</Col>
							<Col span="14">
								<Input type="text" :maxlength='20' v-model.trim="formPrice.name" :placeholder="$t('chargePriceList.placeholder')" @on-enter="getList(formPrice, 1, 6)"></Input>
							</Col>
							<Col span="3">
								<Button type="primary" long @click='getList(formPrice, 1, 6)'>{{$t('publicSet.search')}}</Button>
							</Col>
							<Col span="3">
								<Button type="primary" long @click="handleReset">{{$t('publicSet.reset')}}</Button>
							</Col>
						</Row>
						<Table stripe :columns="priceCol" :data="priceData" @on-selection-change='changeAddPrice'></Table>
						<div class="table-page">
							<div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
							<Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' :page-size='6'></Page>
						</div>
          </Col>
        </Row>
      </div>
    </transition>
    <div slot="footer">
      <Row>
        <Col span="19">
					<Button type="primary" size="large" long @click='save' :loading='saveLoad' v-if='orderKey'>{{$t('liveDeskOrderDetail.btn1_1')}}</Button>
					<Button type="primary" size="large" long @click='addPrice' v-else>{{$t('liveDeskOrderDetail.btn1_3')}}</Button>
        </Col>
        <Col span="4" offset="1">
        	<Button type="info" icon="ios-shuffle-strong" size="large" long @click='change'>{{$t('liveDeskOrderDetail.btn1_2')}}</Button>
        </Col>
      </Row>
    </div>
  </Modal>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote},
    name: 'liveOrder',
    props: {
      _modalKey: Boolean,
      _orderDocList: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data() {
      const validateData = (rule, value, callback) => {
        let _bool = true
        this.formEdit.editData.map(item => {
          if (item.assignDoctor === 1 && item.doctorUserId === '') {
            _bool = false
          }
        })
        if (this.formEdit.editData.length == 0) {
          callback(new Error(this.$t('liveDeskOrderDetail.valid1')));
        } else if (!_bool) {
          callback(new Error(this.$t('liveDeskOrderDetail.valid2')));
        } else {
          callback()
        }
      };
      return {
        modal: false,
        formAdd: {},
        searchKey: 0,
        selectAllKey: false,
        selectKey: false,
        // searchBox: '',
        //快捷搜索
        searchList: [],
        asyncKey: true,
        searchIndex: 0,

        cusId: '',
        cusName: '',
        saveLoad: false,

        typeKey: true,
        orderKey: true,
        priceWidth: '',
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        formPrice: {
          name: '',
          type: 1,
          categoryId: '',
        },
        treeData: [],
        priceCol: [
					{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('labelPublic.lx'),
            key: 'categoryName'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('chargePriceList.colTit'),
            render: (h, params) => {
              if (params.row.detailList) {
                return h('ul', {
                  style: {
                    padding: '5px 0'
                  }
                }, params.row.detailList.map(item => {
                  return h('li', {
                    style: {
                      padding: '5px 0'
                    }
                  }, item.chargeName)
                }))
              }
            }
          },
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.pym'),
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'unitName'
          },
          {
            title: this.$t('labelPublic.gg'),
            key: 'size'
          },
          {
            title: this.$t('labelPublic.price'),
            width: 100,
            render: (h, params) => {
              const _text = params.row.price.toFixed(2)
              if (_text.length > this.priceWidth.length) {
                this.priceWidth = _text
              }
              return h('span', _text)
            }
          },
        ],
        priceData: [],
        selectPriceBox: [],

        // 编辑表格
        editCol: [
					{
            title: this.$t('liveDeskOperation.colTit4'),
            key: 'name'
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit1_1'),
            key: 'setName',
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit1_2'),
            render: (h, params) => {
              if (params.row.setid === 0) {
                return h('span', params.row.realPrice);
              } else {
                return h('span', '—');
              }
            }
          },
          {
            title: this.$t('liveDeskOperation.colTit6'),
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
                      this.formEdit.editData[params.index].price = this.formEdit.editData[params.index].realPrice * params.row.num;
                      this.formEdit.editData[params.index].finalPrice = this.formEdit.editData[params.index].realPrice * params.row.num;
                      this.formEdit.editData[params.index].sell = 100;
                      this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index]);
                    }
                  }
                })
              } else {
                return h('span', params.row.num)
              }
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit1_3'),
            key: 'price',
            render: (h, params) => {
              return h('span', params.row.price)
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit1_4'),
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
                    'on-blur': (val) => {
                      this.formEdit.editData[params.index].finalPrice = parseFloat((this.formEdit.editData[params.index].price * params.row.sell / 100).toFixed(2));
                      this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index])
                    }
                  }
                }),
                h('span', '%')
              ])
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit1_5'),
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
            title: this.$t('liveDeskOrderDetail.colTit1_6'),
            key: 'doctorUserId',
            render: (h, params) => {
              if (params.row.assignDoctor == 1) {
                return h('i-select', {
                  props: {
                    value: params.row.doctorUserId
                  },
                  on: {
                    'on-change': (val) => {
                      this.formEdit.editData[params.index].doctorUserId = val
                    }
                  }
                }, this._orderDocList.map(item => {
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
                      this.remove(params.row, params.index)
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
    watch: {
      _modalKey(val) {
        this.orderKey = true
        this.formEdit.remark = ''
        this.formAdd = {}
        this.$refs['formEdit'].resetFields()
        this.formEdit.editData = []
        this.$refs.scroll.clearQuery();
        this.modal = true
        console.log(this.modal)
        console.log(this.formEdit.editData)
      },
      priceWidth(val) {
        console.log(val.length)
        this.priceCol[7].width = val.length * 12
      },
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    mounted() {
      this.getTree()
      this.getList(this.formPrice, 1, 6)
    },
    methods: {
      //点击显示搜索
      changeSearch(type) {
        if (type == this.searchKey) {
          this.searchKey = 0
        } else {
          this.searchKey = type
        }
      },
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
      setPrice(val) {
        this.$nextTick(() => {
          this.formAdd.finalPrice = parseFloat((val).toFixed(2))
          if (this.formAdd.realPrice === 0) {
            this.formAdd.sell = 100
          } else {
            this.formAdd.sell = parseFloat((val * 100 / this.formAdd.num / this.formAdd.realPrice).toFixed(2))
          }
        })
      },
      setNum(val) {
        this.$nextTick(() => {
          this.formAdd.num = parseInt(val)
          this.formAdd.finalPrice = parseFloat((parseInt(val) * this.formAdd.realPrice).toFixed(2))
          this.formAdd.sell = 100
        })
      },
      searchAdd() {
        console.log(this.formAdd)
        if (typeof this.formAdd.id != 'undefined') {
          if (this.searchType) {
            this.formAdd.price = parseFloat((this.formAdd.num * this.formAdd.realPrice).toFixed(2))
            let _index = this.formEdit.editData.findIndex(item => {
                if (item.setid === 0 && item.id === this.formAdd.id) {
                  return item
                }
              }),
              _data = JSON.parse(JSON.stringify(this.formAdd))
            if (_index < 0) {
              this.formEdit.editData.push(_data)
            } else {
              this.$Notice.error({
                title: this.$t('publicSet.noticeTit'),
                desc: this.$t('liveDeskOrderDetail.msg1')
              })
            }
          } else {
            let _box = JSON.parse(JSON.stringify(this.formBox))
            _box.map(item => {
              this.formEdit.editData.push(item)
            })
            this.$Notice.success({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('liveDeskOrderDetail.msg2')
            })
          }
        }
        this.$refs.formEdit.validateField('editData');
      },
      remove(data, index) {
        if (typeof data.setid == 'object') {
          this.formEdit.editData.splice(index, 1)
        } else {
          for (var i = 0; i < this.formEdit.editData.length; i++) {
            console.log(i)
            if (data.setid == this.formEdit.editData[i].setid) {
              this.formEdit.editData.splice(i, 1)
              i--
            }
          }
        }
      },
      save() {
        let _vm = this,
          _box = [],
          _obj = {}
        for (let item of _vm.formEdit.editData) {
          _obj['ChargeID'] = item.id
          _obj['ChargeName'] = item.name
          _obj['Num'] = item.num
          _obj['Price'] = item.price
          _obj['FinalPrice'] = item.finalPrice
          _obj['SetID'] = item.setid
            ? item.setid
            : null;
          _obj['DoctorUserID'] = item.doctorUserId
          _box.push(_obj)
          _obj = {}
        }
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addOrder.jhtml',
              data: {
                customerId: sessionStorage.getItem('liveId'),
                remark: _vm.formEdit.remark,
                detailListStr: JSON.stringify(_box)
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.modal = false
                  if(_vm.langRouterKey !== 'liveDeskOrderDetail') {
                    _vm.$Notice.success({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.content
                    });
                  } else {
                    _vm.getLang.word(res.data.content, (data) => {
                      _vm.$Notice.success({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.$emit('orderSuccess')
                } else {
                  if(_vm.langRouterKey !== 'liveDeskOrderDetail') {
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
                _vm.saveLoad = false
              },
              error: function (res) {
                console.log(res)
              }
            })
          }
        })
      },


      getList(form, pageNumber, pageSize) {
        let _vm = this
        _vm.priceWidth = ''
        form.pageSize = pageSize
        form.pageNumber = pageNumber
        _vm.$http.get({
          url: 'guard-webManager/liveDesk/serachCharge.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.priceData = res.data.content.content || []
              _vm.pageNumber = res.data.content.pageNumber || 1
              _vm.total = res.data.content.total || 0
              _vm.totalPages = res.data.content.totalPages || 1
              if (form.type === 3) {
                _vm.typeKey = false
              } else {
                _vm.typeKey = true
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getTree() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/liveDesk/chargeCategoryTreeList.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              let _data = res.data.content || []
              _vm.treeData = _vm.setTree(_data)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setTree(data) {
        let _data = data.map(item => {
          let _list = {
            id: item.id,
            title: item.name
          }
          if (item.childrens && item.childrens.length) {
            _list.children = this.setTree(item.childrens)
          } else {
            _list.children = []
          }
          return _list
        })
        return _data
      },
      change() {
        if (this.orderKey) {
          this.$refs.scroll.clearQuery();
          this.formAdd = {}
        }
        this.orderKey = !this.orderKey
      },
      chooseTree(data) {
        console.log(data)
        if (data.length) {
          this.formPrice.categoryId = data[0].id
        } else {
          this.formPrice.categoryId = ''
        }
        this.getList(this.formPrice, 1, 6)
      },
      resetModal() {
        this.orderKey = true
        this.modal = false
      },
      changePage(num) {
        this.getList(this.formPrice, num, 6)
      },
      handleReset(name) {
        if (this.formPrice.categoryId) {
          this.$refs.treeList.getSelectedNodes()[0].selected = false
        }
        this.formPrice.name = ''
        this.formPrice.categoryId = ''
        this.formPrice.type = 1
        this.selectPriceBox = []
        this.getList(this.formPrice, 1, 6)
      },
      changeAddPrice(data) {
        this.selectPriceBox = data
      },
      addPrice() {
        if (this.typeKey) {
          let _data = this.selectPriceBox.filter(item => {
            const _index = this.formEdit.editData.findIndex(list => {
              if (list.setid === 0 && item.id === list.id) {
                return item
              }
            })
            if (_index < 0) {
              item.num = 1
              item.realPrice = item.price
              item.finalPrice = item.price
              item.sell = 100
              item.doctorUserId = ''
              item.setid = 0
              return item
            } else {
              this.$Notice.warning({
                title: this.$t('publicSet.noticeTit'),
                desc: this.$t('liveDeskOrderDetail.msg3',[item.name])
              })
            }
          })
          this.formEdit.editData.push(..._data)
        } else {
          let _list = []
          this.selectPriceBox.map(item => {
            item.detailList.map(child => {
              child.name = child.chargeName
              child.finalPrice = child.amount
              child.price = child.amount
              child.doctorUserId = ''
              child.sell = 100
              child.assignDoctor = child.chargeAssignDoctor
              child.setName = item.name
              child.id = child.chargeid
              _list.push(child)
            })
          })
          this.formEdit.editData.push(..._list)
        }
        this.change()
      },
    }
  }

</script>

<style scoped>
  .order-view .order-search {
    z-index: 1;
  }

  #liveOrder {
    padding-bottom: 100px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: 0.3s;
    transform: rotateX(-180deg);
  }

  .fade-enter,
  .fade-leave-to {
    transition: 0.3s;
    transform: rotateX(180deg);
	}
	.tree-box {
		height: 500px;
		overflow: auto;
	}

</style>
