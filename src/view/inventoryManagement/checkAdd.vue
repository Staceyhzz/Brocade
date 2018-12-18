/** * 盘点信息 */

<template>
  <div class="order-view check-add">
    <div class="container-box">
      <div class="container-header">
        <h2>盘点信息</h2>
      </div>
      <div class="container-body">
        <h3 class="oreder-tit">库存盘点单</h3>
        <Form ref="formEdit" :model='formEdit' :label-width="80" label-position="right" style='margin-top:10px;' :rules="ruleForm">
          <Row>
            <Col :sm='24' :md="12" :lg="6">
            <Form-item label="单据类型">
              <span>库存盘点单</span>
            </Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="6">
            <Form-item label="盘点机构">
              <span>{{hospName}}</span>
            </Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="6">
            <Form-item label="盘点仓库" prop='warehouseId' required>
              <Select v-model="formEdit.warehouseId" :disabled='stockKey'>
                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="6">
            <Form-item label="盘点日期" prop='createDate' required>
              <Date-picker :transfer='true' type="date" placeholder="选择日期" :value='formEdit.createDate' :clearable='false' @on-change='setTime'
                style='width:100%'></Date-picker>
            </Form-item>
            </Col>
            <Col :md='24' :lg="12">
            <Form-item label="描述" prop="remark" required>
              <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述" :maxlength='100'></Input>
            </Form-item>
            </Col>
          </Row>
          <hr>
          <Form-item prop="detailListStr" required label="列表">
            <Table stripe :columns="editCol" :data="editData"></Table>
            <p class="sumCount">合计：
              <span>库存总价：{{allStock}}</span>
              <span>盈亏总价：{{allShares}}</span>
              <span>盘点总价：{{allCheck}}</span>
            </p>
          </Form-item>
        </Form>
        <div class="footer-btnGroup">
          <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
          <Button type="primary" icon="android-arrow-back" @click='back'>返回</Button>
        </div>
      </div>
    </div>
    <div class="order-search">
      <div class="search-box">
        <Form ref="formAdd" :model='formAdd' :label-width="60" label-position="right">
          <Row>
            <Col span='10'>
            <Form-item label="快捷搜索">
              <input-remote
                :list='searchList' 
                :asyncKey='asyncKey' 
                @on-change-word='changeWord' 
                @on-select='changeLabel' 
                idProp='productid' 
                nameProp='productName' 
                size='large'
                placement='top'
                placeholder="请输入商品名称">
                <template slot="title">
									<p style="width: 60%">{{$t('labelPublic.mc')}}</p>
									<p style="width: 20%">{{$t('labelPublic.gg')}}</p>
									<p style="width: 20%">{{$t('labelPublic.dw')}}</p>
								</template>
								<template scope="label">
									<p style="width: 60%">{{label.data.productName}}</p>
									<p style="width: 20%">{{label.data.productSize}}</p>
									<p style="width: 20%">{{label.data.productUnitName}}</p>
								</template>
              </input-remote>
            </Form-item>
            </Col>
            <Col span='2' offset="1">
            <Form-item label="库存数量">
              <span>{{formAdd.stockNum}}</span>
            </Form-item>
            </Col>
            <Col span='5' offset="1">
            <Form-item label="盘点数量">
              <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.checkNum" style="width:100%" @on-change='setCheckNum'></cmptInputNumber>
            </Form-item>
            </Col>
            <Col span='4'>
            <Form-item>
              <Button type="primary" icon="plus-round" long @click='searchAdd'>添加</Button>
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
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请先选择盘点仓库，一经选择无法修改！'));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写盘点描述'));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.editData.length == 0) {
          callback(new Error('请选择列表信息'));
        } else {
          callback()
        }
      };
      return {
        hospName: localStorage.getItem('hospName'),
        //快捷搜索
        searchList: [],
        asyncKey: true,
				searchIndex: 0,
				
        formAdd: {
          stockNum: 0,
          checkNum: 0,
        },
        saveLoad: false,
        formEdit: {
          warehouseId: '',
          createDate: moment().format('YYYY-MM-DD'),
          remark: '',
          detailListStr: '',
        },
        editCol: [{
            title: '商品名称',
            key: 'name'
          },
          {
            title: '规格',
            key: 'size'
          },
          {
            title: '单位',
            key: 'unitName'
          },
          {
            title: '当前均价',
            key: 'stockPrice'
          },
          {
            title: '库存数量',
            key: 'stockNum'
          },
          {
            title: '库存总价',
            key: 'stockAmount'
          },
          {
            title: '盈亏数量',
            render: (h, params) => {
              const _text = params.row.checkNum - params.row.stockNum
              return h('span', _text)
            }
          },
          {
            title: '盈亏总价',
            render: (h, params) => {
              const _text = params.row.checkAmount - params.row.stockAmount
              this.editData[params.index].sharesAmount = _text
              return h('span', _text)
            }
          },
          {
            title: '盘点数量',
            key: 'checkNum',
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.checkNum,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.checkNum = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    if (this.editData[params.index].checkNum <= this.editData[params.index].stockNum) {
                      this.setShares(this.editData[params.index], params.index);
                    } else {
                      this.editData[params.index].checkAmount = (params.row.checkNum - params.row.stockNum) *
                        params.row.checkPrice + params.row.stockAmount;
                      this.editData.splice(params.index, 1, this.editData[params.index]);
                    }
                  }
                }
              })
            }
          },
          {
            title: '盘点进价',
            render: (h, params) => {
              if (params.row.checkNum > params.row.stockNum) {
                return h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    value: params.row.checkPrice,
                    max: 1000000,
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.checkPrice = parseFloat((val).toFixed(2));
                      this.editData[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.editData[params.index].checkAmount = (params.row.checkNum - params.row.stockNum) *
                        params.row.checkPrice + params.row.stockAmount;
                      this.editData.splice(params.index, 1, this.editData[params.index]);
                    }
                  }
                })
              }
            }
          },
          {
            title: '盘点总价',
            key: 'checkAmount',
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
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
                }, '删除'),
              ])
            }
          }
        ],
        editData: [],
        ruleForm: {
          warehouseId: [{
            validator: validateList,
            trigger: 'change'
          }],
          remark: [{
            validator: validateText,
            trigger: 'blur'
          }],
          detailListStr: [{
            validator: validateObj,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      setSave() {
        let _box = [],
          _obj = {}
        this.editData.map(item => {
          _obj.ProductID = item.id
          _obj.Num = item.checkNum
          _obj.price = item.checkPrice
          _obj.checkNum = item.stockNum
          _obj.amount = item.sharesAmount
          _box.push(_obj)
          _obj = {}
        })
        return JSON.stringify(_box)
      },
      warehouseList() {
        return this.$store.getters.getSelectHospitalWarehouseList
      },
      allShares() {
        let _real = 0
        this.editData.map(item => {
          _real += item.sharesAmount
        })
        return _real
      },
      allStock() {
        let _real = 0
        this.editData.map(item => {
          _real += item.stockAmount
        })
        return _real
      },
      allCheck() {
        let _real = 0
        this.editData.map(item => {
          _real += item.checkAmount
        })
        return _real
      },
      stockKey() {
        if (this.formEdit.warehouseId == '') {
          return false
        } else {
          return true
        }
      },
    },
    created() {
      this.$store.dispatch('setPageLoading', 1)
    },
    mounted() {
      this.$store.dispatch('setSelectHospitalWarehouseList', localStorage.getItem('hospId'))
      this.$refs.formEdit.validateField('warehouseId')
    },
    methods: {
			//远程搜索
      changeWord(val) {
        let _vm = this;
        if(_vm.formEdit.warehouseId) {
          _vm.asyncKey = true;
          _vm.searchIndex++;
          const _index = _vm.searchIndex;
          _vm.$http.get({
            url: 'guard-webManager/select/productStock.jhtml',
            data: {
              name: val,
              warehouseId: _vm.formEdit.warehouseId
            },
            success: function (res) {
              if (res.data.code === 0) {
                if(_index === _vm.searchIndex) {
                  _vm.searchList = res.data.content.stock || [];
                  _vm.asyncKey = false;
                }
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      //点击选项
      changeLabel(data) {
        let obj = data.product || {};
				obj.stockNum = data.num;
				obj.warehouseID = data.warehouseid;
				obj.stockAmount = data.amount;
				obj.stockPrice = parseFloat((data.amount / data.num).toFixed(2));
				obj.checkNum = 0;
				obj.checkAmount = 0;
				obj.sharesAmount = 0;
				obj.checkPrice = 0;
				obj.getAmount = false;
        this.formAdd = Object.assign({}, obj);
      },
      searchAdd() {
				if(!Number.isFinite(this.formAdd.id)) {
					return;
				}
				const index = this.editData.findIndex(item => item.id === this.formAdd.id);
				if(index < 0) {
					if(this.formAdd.checkNum > this.formAdd.stockNum) {
						this.formAdd.checkAmount = this.formAdd.stockAmount + (this.formAdd.checkNum - this.formAdd.stockNum) * this.formAdd.checkPrice;
						this.editData.push(Object.assign({}, this.formAdd));
					} else {
						this.setShares(this.formAdd, 'add');
					}
				} else {
					this.$Notice.error({
						title: '系统提示！',
						desc: '该物品已添加，请勿重复操作！'
					})
				}
      },
      setShares(data, index) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/check/getStockOutAmount.jhtml',
          data: {
            productID: data.id,
            warehouseID: data.warehouseID,
            checkNum: data.checkNum,
          },
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              data.checkAmount = res.data.content
              if (index === 'add') {
                _vm.editData.push(data)
              } else {
                _vm.editData.splice(index, 1, data)
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setCheckNum(val) {
        this.$nextTick(() => {
          this.formAdd.checkNum = parseInt(val)
        })
      },
      remove(index) {
        this.editData.splice(index, 1)
      },
      setTime(date) {
        this.formEdit.createDate = date
      },
      save() {
        var _vm = this
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.formEdit.detailListStr = _vm.setSave
            _vm.$http.post({
              url: 'guard-webManager/check/add.jhtml',
              data: _vm.formEdit,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.$router.push('/check')
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '操作成功！'
                  })
                } else {
                  _vm.saveLoad = false
                  _vm.$Notice.error({
                    title: '系统提示！',
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
  .check-add {
    position: relative;
    width: 100%;
    height: ~'calc(100% - 42px)';
    .container-box {
      height: 100%;
      padding-bottom: 50px;
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
    .sumCount {
      padding: 15px 0;
    }
    .sumCount span {
      margin: 0px 15px;
    }
  }

</style>
