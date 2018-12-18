/**
* 添加/修改物品/药品页面
*/

<template>
  <div class="container-box depositChargeEdit">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <div class="customer-item">
          <div class="customer-item-title">
            <h3><Icon type="pricetag"></Icon>{{$t('productEdit.tit1')}}</h3>
          </div>
          <Row type="flex" justify="start">
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.mc')" prop="name" required>
                <span v-if='seen'>{{formValidate.name}}</span>
                <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20' @on-blur='setPinYin' v-else></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.pym')" prop="pinYin" required>
                <Input v-model.trim="formValidate.pinYin" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.lx')" prop='categoryID' required>
                <Input v-model="categoryName" readonly icon="ios-search" :placeholder="$t('product.modalTit3')" @on-focus="addCategory(true)"></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('productEdit.label1')" prop="price" required>
                <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.price" style="width:100%" @on-change='setPrice'></cmptInputNumber>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.gg')" prop="size">
                <Input v-model.trim="formValidate.size" :placeholder="$t('placeholderPublic.input')" :maxlength='50'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('product.colTit1')" prop="alias">
                <Input v-model.trim="formValidate.alias" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6" v-for='item in formData' :key='item.id'>
              <Form-item :label="item.name" :prop="item.properties">
                <Input v-model.trim="formValidate[item.properties]" :placeholder="$t('placeholderPublic.input')" :maxlength='50'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='seen'>
              <Form-item :label="$t('labelPublic.zt')" prop="status">
                <Radio-group v-model="formValidate.status">
                  <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
                  <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='24' :md="16" :lg="12">
              <Form-item :label="$t('labelPublic.ms')" prop="remark">
                <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 1,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
              </Form-item>
            </Col>
            <Col span="24">
              <Form-item :label="$t('productEdit.label2')" prop="prescription">
                <Radio-group v-model="formValidate.prescription">
                  <Radio :label="1">{{$t('productEdit.label3')}}</Radio>
                  <Radio :label="2">{{$t('productEdit.label4')}}</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <Col span="24">
              <Form-item :label="$t('productEdit.label5')" prop="retailStatus" v-if='!seen || isMenuHosp'>
                <Radio-group v-model="formValidate.retailStatus">
                  <Radio :label="1">{{$t('productEdit.label6')}}</Radio>
                  <Radio :label="0">{{$t('productEdit.label7')}}</Radio>
                </Radio-group>
                <p style='paddingLeft:30px;lineHeight:33px;display:inline-block;'>{{$t('productEdit.msg1')}}</p>
              </Form-item>
              <Form-item :label="$t('productEdit.label5')" v-else>
                <span>{{typeStatus}}</span><span style='paddingLeft:60px;'>{{$t('productEdit.msg2')}}</span>
              </Form-item>
            </Col>
          </Row>
        </div>
        <div class="customer-item" v-if='this.formValidate.retailStatus === 1'>
          <div class="customer-item-title">
            <h3><Icon type="pricetag"></Icon>{{$t('productEdit.tit2')}}</h3>
          </div>
          <Form-item :label="$t('productEdit.label8')" v-if='isMenuHosp'>
            <Button-group>
              <Button :type="formValidate.mode === 1 ? 'primary' : 'ghost'" @click='changeBtn(1)'>{{$t('productEdit.label9')}}</Button>
              <Button :type="formValidate.mode === 2 ? 'primary' : 'ghost'" @click='changeBtn(2)'>{{$t('productEdit.label10')}}</Button>
            </Button-group>
          </Form-item>
          <Form-item :label="$t('productEdit.label8')" v-else>
            <span>{{dealStatus}}</span>
          </Form-item>
          <Row type="flex" justify="start">
            <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='isMenuHosp'>
              <Form-item :label="dealLabel" prop="retailPrice" required>
                <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.retailPrice" style="width:100%" @on-change='setRetailPrice'></cmptInputNumber>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('productEdit.label13')" prop='chargeCategoryID' required>
                <Input v-model="chargeCategoryName" readonly icon="ios-search" :placeholder="$t('product.modalTit3')" @on-focus="addCategory(false)"></Input>
              </Form-item>
            </Col>
          </Row>
          <Form-item :label="$t('productEdit.label14')" prop="retailList" required>
            <Table stripe :columns="colPrice" :data="dataPrice"></Table>
          </Form-item>
        </div>
        <div class="customer-item">
          <div class="customer-item-title">
            <h3><Icon type="pricetag"></Icon>{{$t('productEdit.tit3')}}</h3>
          </div>
          <Form-item prop="unitID" required>
            <Table stripe :columns="colUnit" :data="dataUnit"></Table>
          </Form-item>
        </div>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <cmptProductCategoryChoose :placeHolder="$t('product.modalTit3')" @on-change="chooseCategoryProduct" :openKey='categoryProductOpenKey'></cmptProductCategoryChoose>
    <cmptChargeCategoryChoose :placeHolder="$t('product.modalTit3')" @on-change="chooseCategoryCharge" :openKey='categoryChargeOpenKey'></cmptChargeCategoryChoose>
  </div>
</template>

<script>
  import cmptProductCategoryChoose from 'components/productCategoryChoose.vue';
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    components: {cmptProductCategoryChoose, cmptChargeCategoryChoose},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('productEdit.valid1')))
        } else {
          callback();
        }
      };
      const validatePy = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('chargeEdit.valid2')))
        } else {
          if(/^[a-z0-9]*$/g.test(value)) {
            callback()
          } else {
            callback(new Error(this.$t('chargeEdit.valid3')))
          }
        }
      };
      const validateCid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('product.modalTit3')));
        } else {
          callback();
        }
      };
      const validateCharge = (rule, value, callback) => {
        console.log(value)
        if (value) {
          callback()
        } else {
          callback(new Error(this.$t('productEdit.valid2')));
        }
      };
      const validateUnit = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('productEdit.valid3')));
        } else {
          callback()
        }
      };
      const validateWare = (rule, value, callback) => {
        const list = this.dataPrice.filter(item => item.status === 1) || [];
        const result = list.filter(item => !item.wareHouseID) || [];
        if(result.length) {
          callback(new Error(this.$t('productEdit.valid4')));
        } else {
          callback();
        }
      };
      return {
        isMenuHosp: true,
        seen: true,
        saveLoad: false,
        titMsg: '',

        categoryName: '',
        chargeCategoryName: '',
        categoryProductOpenKey: false,
        categoryChargeOpenKey: false,

        formData: [],
        formValidate: {
          id: '',
          name: '',
          pinYin: '',
          categoryID: '',
          price: 0,
          size: '',
          alias: '',
          code: '',
          brand: '',
          approvalNumber: '',
          englishName: '',
          generalName: '',
          custom1: '',
          custom2: '',
          custom3: '',
          status: 1,
          remark: '',
          prescription: 1,
          retailStatus: 0,
          unitID: '',
          extraUnitID: '',
          unitRate: 0,
          retailPrice: 0,
          chargeCategoryID: '',
          mode: 2,
          retailList: [],
        },

        colUnit: [
          {
            title: this.$t('labelPublic.lx'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'unitID',
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.unitID,
                  labelInValue: true,
                },
                on: {
                  'on-change': (data) => {
                    this.dataUnit[params.index].unitID = data.value
                    this.dataUnit[params.index].unitName = data.label
                    if(params.index === 0) {
                      this.formValidate.unitID = data.value
                    } else {
                      this.formValidate.extraUnitID = data.value
                    }
                  }
                }
              }, this.unitList.map(item => {
                return h('i-option', {
                  props: {
                    value: item.id,
                    label: item.name
                  }
                },item.name)
              }))
            }
          },
          {
            title: this.$t('productEdit.colTit4'),
            key: 'unitRate',
            render: (h, params) => {
              if(params.row.key) {
                return h('cmptInputNumber', {
                  props: {
                    min: 1,
                    value: params.row.unitRate,
                    max: 1000000,
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.unitRate = parseInt(val);
                      this.dataUnit[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.dataUnit.splice(params.index, 1, this.dataUnit[params.index]);
                    }
                  }
                })
              } else {
                return h('span', params.row.unitRate)
              }
            }
          },
          {
            title: this.$t('productEdit.colTit5'),
            key: 'count',
            render: (h, params) => {
              if(params.row.key) {
                if(this.formValidate.unitID && this.formValidate.extraUnitID) {
                  const text = `1${this.dataUnit[0].unitName}=${params.row.unitRate}${params.row.unitName}`;
                  return h('span', text);
                }
              }
            }
          },
        ],
        dataUnit: [
          {
            name: this.$t('productEdit.unit1'),
            unitID: '',
            unitRate: 1,
            count: '',
            key: false,
            unitName: '',
          },
          {
            name: this.$t('productEdit.unit2'),
            unitID: '',
            unitRate: 1,
            count: '',
            key: true,
            unitName: '',
          },
        ],

        colPrice: [
          {
            title: this.$t('productEdit.colTit1'),
            key: 'name'
          },
          {
            title: this.$t('productEdit.colTit2'),
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.status,
                },
                on: {
                  'on-change': (val) => {
                    this.dataPrice[params.index].status = val
                  }
                }
              }, [
              h('i-option', {
                props: {
                  value: 0,
                }
              }, this.$t('product.label3')),
              h('i-option', {
                props: {
                  value: 1,
                }
              }, this.$t('product.label2')),
              ])
            }
          },
          {
            title: this.$t('productEdit.label11'),
            key: 'price',
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  min: 0,
                  value: params.row.price,
                  max: 1000000,
                  disabled: this.formValidate.mode === 1 ? true : false
                },
                on: {
                  'on-change': (val) => {
                    params.row.price = parseFloat((val).toFixed(2));
                    this.dataPrice[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.dataPrice.splice(params.index, 1, this.dataPrice[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('productEdit.colTit3'),
            key: 'wareHouseID',
            render: (h, params) => {
              return h('Select', {
                props: {
                  value: params.row.wareHouseID,
                },
                on: {
                  'on-change': (val) => {
                    this.dataPrice[params.index].wareHouseID = val
                  }
                }
              }, params.row.wareHouseList.map(item => {
                return h('Option', {
                  props: {
                    value: item.id,
                  }
                }, item.name)
              }))
            }
          },
        ],
        dataPrice: [],

        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          pinYin: [
            { validator: validatePy, trigger: 'blur' }
          ],
          categoryID: [
            { validator: validateCid, trigger: 'change' }
          ],
          chargeCategoryID: [
            { validator: validateCharge, trigger: 'change' }
          ],
          unitID: [
            { validator: validateUnit, trigger: 'change' }
          ],
          retailList: [
            { validator: validateWare, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      unitList () {
        return this.$store.getters.getSelectUnitInfoList;
      },
      dealStatus () {
        return this.formValidate.mode === 1 
          ? this.$t('productEdit.label9') 
          : this.$t('productEdit.label10');
      },
      dealLabel () {
        return this.formValidate.mode === 1 
          ? this.$t('productEdit.label11') 
          : this.$t('productEdit.label12');
      },
      typeStatus () {
        return this.formValidate.retailStatus === 1 
          ? this.$t('productEdit.label6') 
          : this.$t('productEdit.label7');
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'productEdit') {
          this.getQuality();
        }
      },
    },
    created () {
      if(this.$route.query.id !== 'add') {
        this.titMsg = this.$t('product.modalTit2')
        this.seen = true
      } else {
        this.titMsg = this.$t('product.modalTit1')
        this.seen = false
      }
      this.isMenuHosp = this.getHeadquarters();
      this.getQuality();
    },
    mounted () {
      this.$store.dispatch('setSelectUnitInfoList')
      if(!this.seen) {
        this.$refs.formValidate.validateField('name')
      }
    },
    methods: {
      //获取属性
      getQuality () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/product/getAdd.jhtml',
          success: function(res){
            console.log(res)
            let _data = res.data.content || {};
            _vm.dataPrice = _data.hospitals.map(item => {
              return {
                name: item.name,
                hospitalID: item.id,
                wareHouseID: '',
                status: 0,
                price: 0,
                wareHouseList: item.detailList || []
              };
            }) || [];
            let _formData = _data.properties.map(item => {
              return {
                ...item,
                properties: item.properties[0].toLowerCase() + item.properties.substring(1, item.properties.length)
              };
            }) || [];
            if(_vm.langRouterKey !== 'productEdit') {
              _vm.formData = _formData;
            } else {
              _vm.requestList(_formData, ['name']).then(res => _vm.formData = res);
            }
            if(_vm.seen) {
              _vm.getId();
            } else {
              _vm.$store.dispatch('setPageLoading', 1);
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      getId () {
        let _vm = this
        _vm.$http.getPage({
          url: 'guard-webManager/product/get.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            let _data = res.data.content || {};
            let hospPriceList = _data.retailList || [];
            _vm.formValidate = {..._data};
            _vm.categoryName = _data.categoryName;
            _vm.chargeCategoryName = _data.chargeCategoryName;

            _vm.dataUnit[0].unitID = _data.unitID || '';
            _vm.dataUnit[0].unitName = _data.unitName || '';
            _vm.dataUnit[1].unitID = _data.extraUnitID || '';
            _vm.dataUnit[1].unitName = _data.extraUnitName || '';
            _vm.dataUnit[1].unitRate = _data.unitRate || 1;

            _vm.formValidate.retailPrice = _data.retailPrice
              ? _data.retailPrice
              : 0;
            _vm.formValidate.price = _data.price
              ? _data.price
              : 0;
            _vm.formValidate.retailStatus = _data.retailStatus || 0;
            _vm.formValidate.prescription = _data.prescription || 1;

            hospPriceList.map(item => {
              let _index = _vm.dataPrice.findIndex(hosp => hosp.hospitalID == item.hospitalID);
              if(_index >= 0) {
                _vm.dataPrice[_index].status = item.status || 0;
                _vm.dataPrice[_index].price = item.price || 0;
                _vm.dataPrice[_index].wareHouseID = item.warehouseID || '';
                _vm.dataPrice[_index].mode = item.mode;
              }
            });

            if(_vm.formValidate.mode === 1) {
              _vm.dataPrice.map(item => {
                item.price = _vm.formValidate.retailPrice;
              });
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setPinYin () {
        let _vm  = this
        if(_vm.formValidate.name != '') {
          _vm.$http.get({
            url: 'guard-webManager/select/getPinYin.jhtml',
            data: {name: _vm.formValidate.name},
            success: function(res){
              if(res.data.code == 0 ){
                console.log(res)
                _vm.formValidate.pinYin = res.data.content || null
                _vm.$refs.formValidate.validateField('pinYin')
              } else {
                console.log(res.data.desc)
              }
            },
            error: function(res){
              console.log(res)
            }
          })
        }
      },
      //项目分类
      addCategory (type) {
        if(type) {
          this.categoryProductOpenKey = !this.categoryProductOpenKey;
        } else {
          this.categoryChargeOpenKey = !this.categoryChargeOpenKey;
        }
      },
      chooseCategoryProduct (data) {
        this.formValidate.categoryID = data.id;
        this.categoryName = data.name;
      },
      chooseCategoryCharge (data) {
        this.formValidate.chargeCategoryID = data.id;
        this.chargeCategoryName = data.name;
      },
      changeBtn (type) {
        this.formValidate.mode = type;
        this.dataPrice.map(item => {
          item.price = this.formValidate.retailPrice
        })
      },
      setPrice (val) {
        this.$nextTick(() => {
          this.formValidate.price = parseFloat((val).toFixed(2))
        })
      },
      setRetailPrice (val) {
        this.$nextTick(() => {
          this.formValidate.retailPrice = parseFloat((val).toFixed(2))
          if(this.formValidate.mode === 1) {
            this.dataPrice.map(item => {
              item.price = parseFloat((val).toFixed(2))
            })
          }
        })
      },
      save () {
        let _vm = this,
        _url = '',
        _data = {};
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            _vm.formValidate.retailList = _vm.dataPrice
            if(_vm.seen) {
              _url = 'guard-webManager/product/update.jhtml'
              _data = {
                id: _vm.formValidate.id,
                detailListStr: JSON.stringify(_vm.formValidate)
              }
            } else {
              _url = 'guard-webManager/product/add.jhtml'
              _data = {
                detailListStr: JSON.stringify(_vm.formValidate)
              }
            }   
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _data,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/product')
                } else {
                  if(_vm.langRouterKey !== 'productEdit') {
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
                  _vm.saveLoad = false
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          }
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style>
  .depositChargeEdit .radioModal .ivu-radio-wrapper {
    display: block;
  }
</style>

