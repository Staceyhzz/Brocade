/** * 添加进货信息 */

<template>
  <div class="order-view purchase-add">
    <div class="container-box">
      <div class="container-header">
        <h2>添加进货信息</h2>
      </div>
      <div class="container-body">
        <h3 class="oreder-tit">入库单</h3>
        <Form ref="formEdit" :model='formEdit' :label-width="80" label-position="right" style='margin-top:10px;' :rules="ruleForm">
          <Row>
            <Col :sm='24' :md="12" :lg="8">
            <Form-item label="仓库" prop='warehouseId' required>
              <Select v-model="formEdit.warehouseId">
                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="8">
            <Form-item label="进货日期" prop='createDate'>
              <Date-picker :transfer='true' type="date" placeholder="选择日期" :value='formEdit.createDate' :clearable='false' @on-change='setTime'
                style='width:100%'></Date-picker>
            </Form-item>
            </Col>
            <Col :sm='24' :md="12" :lg="8">
            <Form-item label="供应商" prop='supplierName' required>
              <cmptSupplierChoose _placeHolder="选择供应商" :_supplierName="formEdit.supplierName" v-on:setSupplierName="setSupplier"></cmptSupplierChoose>
            </Form-item>
            </Col>
            <Col :sm='24' :lg="12">
            <Form-item label="描述" prop="remark">
              <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
            </Form-item>
            </Col>
          </Row>
          <hr>
          <Form-item prop="detailListStr" required label="列表">
            <Table stripe :columns="editCol" :data="editData"></Table>
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
        <input-remote
          :list='searchList' 
          :asyncKey='asyncKey' 
          @on-change-word='changeWord' 
          @on-select='changeLabel' 
          idProp='id' 
          nameProp='name' 
          size='large'
          placement='top'
          placeholder="请输入项目名称进行快捷搜索">
          <template slot="title">
            <p style="width: 10%">{{$t('labelPublic.bh')}}</p>
            <p style="width: 45%">{{$t('labelPublic.mc')}}</p>
            <p style="width: 15%">{{$t('labelPublic.gg')}}</p>
            <p style="width: 15%">{{$t('labelPublic.lx')}}</p>
						<p style="width: 15%">{{$t('labelPublic.dw')}}</p>
          </template>
          <template scope="label">
            <p style="width: 10%">{{label.data.id}}</p>
            <p style="width: 45%">{{label.data.name}}</p>
            <p style="width: 15%">{{label.data.categoryName}}</p>
            <p style="width: 15%">{{label.data.size}}</p>
						<p style="width: 15%">{{label.data.unitName}}</p>
          </template>
        </input-remote>
      </div>
      <div class="search-edit">
        <Form ref="formAdd" :model='formAdd' label-position="right">
          <Row>
            <Col span='5'>
            <Form-item label="数量" :label-width="50">
              <cmptInputNumber :max="1000000" :min="1" v-model="formAdd.Num" style="width:100%" @on-change='setNum'></cmptInputNumber>
            </Form-item>
            </Col>
            <Col span='5'>
            <Form-item label="进价" :label-width="50">
              <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.Price" style="width:100%" @on-change='setPrice'></cmptInputNumber>
            </Form-item>
            </Col>
            <Col span='6'>
            <Form-item label="失效日期" :label-width="70">
              <Date-picker :transfer='true' type="date" placeholder="选择失效日期" :clearable='false' @on-change='setAddTime' style='width:100%'
                ref='cleanDate' :options='options'></Date-picker>
            </Form-item>
            </Col>
            <Col span='5'>
            <Form-item label="批号" :label-width="50">
              <Input v-model="formAdd.Batch" placeholder="请输入批号"></Input>
            </Form-item>
            </Col>
            <Col span='3'>
            <Form-item :label-width="20">
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
          callback(new Error('请选择信息'));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.editData.length == 0) {
          callback(new Error('请选择列表信息'));
        } else {
          let _bool = true
          this.editData.map(item => {
            if (item.Expiration === '') {
              _bool = false
              callback(new Error('请选择有效日期'))
            }
            if (item.Batch === '') {
              _bool = false
              callback(new Error('请填写批号'))
            }
          })
          if (_bool) {
            callback()
          }
        }
      };
      return {
        //快捷搜索
        searchList: [],
        asyncKey: true,
        searchIndex: 0,
        formAdd: {
          Num: 1,
          Price: 0,
          Expiration: '',
          Batch: '',
        },
        saveLoad: false,
        formEdit: {
          warehouseId: '',
          createDate: moment().format('YYYY-MM-DD'),
          supplierId: '',
          supplierName: '',
          remark: '',
          detailListStr: '',
        },
        categoryName: '',
        editCol: [{
            title: '名称',
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
            title: '国药准字',
            key: 'approvalNumber'
          },
          {
            title: '数量',
            key: 'Num',
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 1,
                  value: params.row.Num,
                },
                on: {
                  'on-change': (val) => {
                    params.row.Num = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: '进价',
            key: 'Price',
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.Price
                },
                on: {
                  'on-change': (val) => {
                    params.row.Price = parseFloat(val.toFixed(2));
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: '失效日期',
            key: 'Expiration',
            render: (h, params) => {
              return h('Date-picker', {
                props: {
                  type: 'date',
                  size: 'small',
                  placeholder: '选择日期',
                  value: params.row.Expiration,
                  clearable: false,
                  options: this.options,
                  transfer: true
                },
                on: {
                  'on-change': (val) => {
                    this.editData[params.index].Expiration = val
                  }
                }
              })
            }
          },
          {
            title: '批号',
            key: 'Batch',
            render: (h, params) => {
              let _val = '',
                _bool = false
              return h('Input', {
                props: {
                  size: 'small',
                  value: params.row.Batch
                },
                on: {
                  input: (val) => {
                    _val = val
                  },
                  'on-change': (event) => {
                    console.log(event.target.value + '--------')
                    _bool = true
                  },
                  'on-blur': () => {
                    console.log(_val)
                    if (_bool) {
                      this.editData[params.index].Batch = _val
                      this.$refs.formEdit.validateField('detailListStr')
                    }
                  }
                }
              })
            }
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
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        ruleForm: {
          warehouseId: [{
            validator: validateList,
            trigger: 'change'
          }],
          supplierName: [{
            validator: validateList,
            trigger: 'change'
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
        return JSON.stringify(this.editData)
      },
      warehouseList() {
        return this.$store.getters.getSelectUserWarehouseList
      },
    },
    created() {
      this.$store.dispatch('setPageLoading', 1)
    },
    mounted() {
      this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
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
				const obj = {
					...data,
					ProductID: data.id,
					Price: data.price,
					Num: 1,
					Expiration: '',
					Batch: ''
				};
				this.$refs['cleanDate'].handleClear();
        this.formAdd = Object.assign({}, obj);
      },
      setAddTime(date) {
        this.formAdd.Expiration = date
      },
      searchAdd() {
				if(!Number.isFinite(this.formAdd.ProductID)) {
					return;
				} else {
					const index = this.editData.findIndex(item => item.ProductID === this.formAdd.ProductID);
					if(index < 0) {
						this.editData.push(Object.assign({}, this.formAdd));
					} else {
						this.$Notice.error({
              title: '系统提示！',
              desc: '该物品已添加，请勿重复操作！'
            })
					}
				}
      },
      setNum(val) {
        this.$nextTick(() => {
          this.formAdd.Num = parseInt(val)
        })
      },
      setPrice(val) {
        this.$nextTick(() => {
          this.formAdd.Price = parseFloat(val.toFixed(2))
        })
      },
      //获取类型
      setProduct(data) {
        this.formSearch.categoryId = data.id
        this.categoryName = data.name
      },
      //供应商
      setSupplier(data) {
        this.formEdit.supplierId = data.id
        this.formEdit.supplierName = data.name
      },
      remove(index) {
        this.editData.splice(index, 1)
      },
      setTime(date) {
        this.formEdit.createDate = date
      },
      save() {
        let _vm = this,
          _key = false
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.editData.map(item => {
              if (new Date(item.Expiration) - new Date(_vm.formEdit.createDate) < 0) {
                _key = true
              }
            })
            if (_key) {
              _vm.$Modal.confirm({
                title: '系统提示',
                content: `<p>项目失效日期比进货日期早，是否继续？</p>`,
                okText: '是',
                cancelText: '否',
                onOk: () => {
                  _vm.realSave()
                }
              })
            } else {
              _vm.realSave()
            }
          }
        })
      },
      realSave() {
        let _vm = this
        _vm.saveLoad = true
        _vm.formEdit.detailListStr = _vm.setSave
        console.log(_vm.formEdit)
        _vm.$http.post({
          url: 'guard-webManager/purchase/add.jhtml',
          data: _vm.formEdit,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.$router.push('/purchase')
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
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1)
      }
    }

  }

</script>

<style scoped lang='less'>
  .purchase-add {
    position: relative;
    width: 100%;
    height: ~'calc(100% - 42px)';
    .container-box {
      height: 100%;
      padding-bottom: 230px;
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
