/** 
 * 修改划扣耗材 
 */
<template>
  <div class="order-view operation-product">
    <div class="container-box">
      <div class="container-header">
        <h2>{{$t('operationProduct.tit')}}</h2>
      </div>
      <div class="container-body">
        <Form ref="formShow" :model="formShow" :label-width="60" label-position="right">
          <Row>
            <Col :sm='24' :md="12" :lg="8">
							<Form-item :label="$t('operationProduct.label1')">
								<span>{{formShow.customerName}} ({{formShow.customerID}})</span>
							</Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="8">
							<Form-item :label="$t('operationProduct.label2')">
								<span>{{formShow.chargeName}}</span>
							</Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="8">
							<Form-item :label="$t('operationProduct.label3')">
								<span>{{formShow.num}}</span>
							</Form-item>
            </Col>
          </Row>
        </Form>
        <hr>
        <Form ref="formEdit" :model="formEdit" :label-width="60" label-position="right" :rules="ruleForm">
          <Form-item :label="$t('operationProduct.label4')" prop="detailListStr">
            <Table stripe :columns="col" :data="data"></Table>
          </Form-item>
        </Form>
        <div class="footer-btnGroup">
          <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
          <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
        </div>
      </div>
    </div>
    <div class="order-search" v-if='key'>
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
            <p style="width: 50%">{{$t('labelPublic.mc')}}</p>
            <p style="width: 20%">{{$t('labelPublic.lx')}}</p>
            <p style="width: 20%">{{$t('labelPublic.gg')}}</p>
          </template>
          <template scope="label">
            <p style="width: 10%">{{label.data.id}}</p>
            <p style="width: 50%">{{label.data.name}}</p>
            <p style="width: 20%">{{label.data.categoryName}}</p>
            <p style="width: 20%">{{label.data.size}}</p>
          </template>
        </input-remote>
      </div>
      <div class="search-edit">
        <Form ref="formAdd" :model='formAdd' :label-width="60" label-position="right">
          <Row>
            <Col span='2'>
							<Form-item :label="$t('operationProduct.label5')">
								<span>{{formAdd.stockNum}}</span>
							</Form-item>
            </Col>
            <Col span='7'>
							<Form-item :label="$t('operationProduct.label6')">
								<Button-group>
									<Button :type="formAdd.type == 2 ? 'primary' : 'ghost'" @click="setBtn(2)" :disabled='formAdd.num > formAdd.stockNum ? true : false'>{{$t('operationProduct.label7')}}</Button>
									<Button :type="formAdd.type == 1 ? 'primary' : 'ghost'" @click="setBtn(1)">{{$t('operationProduct.label8')}}</Button>
								</Button-group>
							</Form-item>
							</Col>
            <Col span='5'>
							<Form-item :label="$t('operationProduct.label3')">
								<cmptInputNumber :max="formAdd.stockMax" :min="1" v-model="formAdd.num" style="width:100%" @on-change='setNum'></cmptInputNumber>
							</Form-item>
            </Col>
            <Col span='6'>
							<Form-item :label="$t('operationProduct.label8')">
								<Select v-model="formAdd.warehouseId" style="width:100%" :disabled='formAdd.type == 2 ? true : false'>
									<Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</Form-item>
            </Col>
            <Col span='4'>
							<Form-item>
								<Button type="primary" icon="plus-round" long @click='searchAdd'>{{$t('publicSet.add')}}</Button>
							</Form-item>
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
      const validateObj = (rule, value, callback) => {
        if (this.data.length == 0) {
          callback(new Error(this.$t('operationProduct.valid1')))
        } else {
          let _bool = true
          this.data.map(item => {
            if (item.type == 1 && item.warehouseId == '') {
              _bool = false
              console.log(123)
            }
          })
          if (_bool) {
            let _index = this.data.findIndex((item) => item.maxKey == true)
            if (_index < 0) {
              callback()
            } else {
              callback(new Error(this.$t('operationProduct.valid2')))
            }
          } else {
            callback(new Error(this.$t('operationProduct.valid3')))
          }
        }
      };
      return {
        //快捷搜索
        searchList: [],
        asyncKey: true,
        searchIndex: 0,

        formAdd: {
          num: 1,
          stockMax: 1000000,
          stockNum: 0,
          type: 1,
          stockKey: true,
          warehouseId: '',
        },
        saveLoad: false,
        key: false,
        formShow: {},
        formEdit: {
          detailListStr: '',
          operationId: '',
        },
        col: [
					{
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'productId'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'productName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'productSize'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'productUnitName',
          },
          {
            title: this.$t('operationProduct.colTit1'),
            width: 60,
            key: 'stockNum',
          },
          {
            title: this.$t('operationProduct.colTit2'),
            width: 90,
            render: (h, params) => {
              if (params.row.status == 0) {
                return h('Button-group', {
                  props: {
                    size: 'small',
                  }
                }, [
                  h('Button', {
                    props: {
                      type: params.row.type == 2 ? 'primary' : 'ghost',
                      disabled: params.row.stockNum < params.row.num ? true : false
                    },
                    on: {
                      'click': () => {
                        if (params.row.type != 2) {
                          this.data[params.index].type = 2
                          this.data[params.index].warehouseId = ''
                          this.data[params.index].num = 1
                          this.data[params.index].stockMax = this.data[params.index].stockNum > this.data[
                              params.index].maxNum ? this.data[params.index].maxNum : this.data[params.index]
                            .stockNum
                          this.data.splice(params.index, 1, this.data[params.index])
                        }
                      }
                    }
                  }, this.$t('operationProduct.label7')),
                  h('Button', {
                    props: {
                      type: params.row.type == 1 ? 'primary' : 'ghost',
                    },
                    on: {
                      'click': () => {
                        if (params.row.type != 1) {
                          this.data[params.index].type = 1
                          this.data[params.index].warehouseId = ''
                          this.data[params.index].num = 1
                          this.data[params.index].stockMax = this.data[params.index].maxNum
                          this.data.splice(params.index, 1, this.data[params.index])
                        }
                      }
                    }
                  }, this.$t('operationProduct.label8')),
                ])
              } else {
                const _text = params.row.type == 1 ? this.$t('operationProduct.label8') : this.$t('operationProduct.label7')
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('operationProduct.colTit3'),
            width: 110,
            render: (h, params) => {
              if (params.row.status == 0) {
                return h('i-select', {
                  props: {
                    value: params.row.warehouseId,
                    size: 'small',
                    disabled: params.row.type == 2 ? true : false
                  },
                  on: {
                    'on-change': (val) => {
                      this.data[params.index].warehouseId = val
                    }
                  }
                }, this.warehouseList.map(item => {
                  return h('i-option', {
                    props: {
                      value: item.id
                    }
                  }, item.name)
                }))
              } else {
                return h('span', params.row.warehouseName)
              }
            }
          },
          {
            title: this.$t('operationProduct.label3'),
            width: 85,
            render: (h, params) => {
              if (params.row.status == 0) {
                const _display = params.row.maxKey ? 'block' : 'none'
                return h('div', [
                  h('cmptInputNumber', {
                    props: {
                      size: 'small',
                      min: 1,
                      value: params.row.num,
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.num = parseInt(val);
                        this.data[params.index]= params.row;
                      },
                      'on-blur': () => {
                        if (params.row.num > params.row.stockMax) {
                          this.data[params.index].maxKey = true;
                        } else {
                          this.data[params.index].maxKey = false;
                        }
                        this.data.splice(params.index, 1, this.data[params.index]);
                      }
                    }
                  }),
                  h('p', {
                    style: {
                      fontSize: '12px',
                      lineHeight: '14px',
                      color: 'red',
                      display: _display,
                    }
                  }, this.$t('operationProduct.valid4') + params.row.stockMax)
                ])
              } else {
                return h('span', params.row.num)
              }
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            key: 'status',
            width: 60,
            render: (h, params) => {
              const _text = params.row.status == 0 ? this.$t('operationProduct.colTit4') : this.$t('operationProduct.colTit5')
              const _color = params.row.status == 0 ? 'red' : 'blue'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              if (params.row.status == 0) {
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
          }
        ],
        data: [],
        ruleForm: {
          detailListStr: [{
            validator: validateObj,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      warehouseList() {
        return this.$store.getters.getSelectHospitalWarehouseList
      },
    },
    created() {
      this.getId(this.$route.query.id)
      this.formEdit.operationId = this.$route.query.id
    },
    mounted() {
      this.$store.dispatch('setSelectHospitalWarehouseList', localStorage.getItem('hospId'))
    },
    methods: {
      //远程搜索
      changeWord(val) {
        let _vm = this;
        _vm.asyncKey = true;
        _vm.searchIndex++;
        const _index = _vm.searchIndex;
        _vm.$http.get({
          url: 'guard-webManager/select/productSearch.jhtml',
          data: {
            name: val
          },
          success: function (res) {
            if (res.data.code === 0) {
              if(_index === _vm.searchIndex) {
                _vm.searchList = res.data.content || [];
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
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/getBorrow.jhtml',
          data: {
            productId: data.id
          },
          success: function (res) {
            if (res.data.code === 0) {
              data.stockNum = res.data.content || 0
              data.productId = data.id
              data.status = 0
              data.maxNum = 1000000
              data.stockMax = data.maxNum
              data.num = 1
              data.type = 1
              data.warehouseId = ''
              data.productName = data.name
              data.productSize = data.size
              data.productUnitName = data.unitName
              data.maxKey = false
              _vm.formAdd = Object.assign({}, data)
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      searchAdd() {
        let _vm = this,
          _index = _vm.data.findIndex(item => {
            return item.productId == _vm.formAdd.productId
          })
        if (typeof _vm.formAdd.productId === 'number') {
          if (_index < 0) {
            _vm.data.push(Object.assign({}, _vm.formAdd))
          } else {
            _vm.$Notice.error({
              title: _vm.$t('publicSet.noticeTit'),
              desc: _vm.$t('operationProduct.msg')
            })
          }
        }
      },
      setBtn(val) {
        if (this.formAdd.type != val) {
          this.formAdd.type = val
          this.formAdd.num = 1
          this.formAdd.warehouseId = ''
          if (val === 2) {
            this.formAdd.stockMax = this.formAdd.stockNum
          } else {
            this.formAdd.stockMax = 1000000
          }
        }
      },
      setNum(val) {
        this.$nextTick(() => {
          this.formAdd.num = parseInt(val)
        })
      },
      getId(id) {
        let _vm = this
        _vm.data = []
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptDesk/operationProduct.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            _vm.formShow = res.data.content.Operation || {}
            let _default = res.data.content.ChargeProductList || [],
              _do = res.data.content.ProductList || []
            _do.map(item => {
              item.productId = item.productid
              item.stockNum = item.borrowNum
              item.maxKey = false
              if (item.status == 1) {
                _vm.data.push(item)
              } else {
                let _index = _default.findIndex(list => list.productid == item.productid)
                if (_index < 0) {
                  item.maxNum = 1000000
                  if (item.type == 1) {
                    item.stockMax = item.maxNum
                  } else {
                    item.stockMax = item.stockNum
                  }
                } else {
                  if (item.type == 1) {
                    item.stockMax = _default[_index].maxnum * res.data.content.Operation.num
                    console.log(item.stockMax + '----------')
                  }
                }
                item.warehouseId = item.warehouseid
                _vm.data.push(item)
              }
            })
            _default.map(item => {
              item.productId = item.productid
              item.stockNum = item.borrowNum
              item.maxNum = item.maxnum * res.data.content.Operation.num
              item.status = 0
              item.warehouseId = ''
              item.maxKey = false
              if (item.borrowNum >= item.num) {
                item.type = 2
                item.stockMax = item.stockNum
              } else {
                item.type = 1
                item.stockMax = item.maxNum
              }
              if (_do.length == 0) {
                _vm.data.push(item)
              }
            })
            if (res.data.content.ProductAdd == 1) {
              _vm.key = true
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //删除
      remove(index) {
        this.data.splice(index, 1)
      },
      save() {
        let _vm = this
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.formEdit.detailListStr = JSON.stringify(_vm.data)
            _vm.$http.post({
              url: 'guard-webManager/deptDesk/operationProductAddEdit.jhtml',
              data: _vm.formEdit,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.$router.push('/deptDesk')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.saveLoad = false
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>

<style scoped lang='less'>
  .operation-product {
    position: relative;
    width: 100%;
    height: ~'calc(100% - 42px)';
    .container-box {
      height: 100%;
      padding-bottom: 170px;
      overflow: auto;
    }
    .order-search {
      box-shadow: 0 7px 14px 0 rgba(42, 42, 68, 0.1);
      border-radius: 4px;
    }
    hr {
      width: 100%;
      height: 1px;
      margin-bottom: 15px;
      border: none;
      background: rgba(65, 65, 65, 0.1);
    }
  }

</style>
