/**
* 添加/修改收费项目页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <div class="customer-item">
          <div class="customer-item-title">
            <h3><Icon type="pricetag"></Icon>{{$t('chargeEdit.tit1')}}</h3>
          </div>
          <Row type="flex" justify="start">
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.mc')" prop="name" required>
                <span v-if='seen'>{{formValidate.name}}</span>
                <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20' @on-blur='setPinYin' v-else></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('charge.colTit1')" prop="printName" required>
                <span v-if='!printKey'>{{formValidate.printName}}</span>
                <Input v-model.trim="formValidate.printName" :placeholder="$t('placeholderPublic.input')" :maxlength='20' v-else></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.pym')" prop="pinYin" required>
                <Input v-model.trim="formValidate.pinYin" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.lx')" prop='categoryId' required>
                <Input v-model="categoryName" readonly icon="ios-search" :placeholder="$t('charge.modalTit3')" @on-focus="addCategory"></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.dw')" prop='unitID' required>
                <Select v-model="formValidate.unitID">
                  <Option v-for="item in unitList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('labelPublic.gg')" prop="size">
                <Input v-model.trim="formValidate.size" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('charge.colTit2')" prop="code">
                <Input v-model.trim="formValidate.code" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='12' :md="8" :lg="6">
              <Form-item :label="$t('chargeEdit.label1')" prop="assignDoctor">
                <Radio-group v-model="formValidate.assignDoctor">
                  <Radio :label="1">{{$t('chargeEdit.label2')}}</Radio>
                  <Radio :label="0">{{$t('chargeEdit.label3')}}</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <Col :xs='24' :sm='24' :md="16" :lg="12">
              <Form-item :label="$t('labelPublic.ms')" prop="remark">
                <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 1,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
              </Form-item>
            </Col>
          </Row>
        </div>
        <div class="customer-item">
          <div class="customer-item-title">
            <h3><Icon type="pricetag"></Icon>{{$t('chargeEdit.tit2')}}</h3>
          </div>
          <Form-item :label="$t('chargeEdit.label4')" v-if='isMenuHosp'>
            <Button-group>
              <Button :type="formValidate.mode === 0 ? 'primary' : 'ghost'" @click='changeBtn(0)'>{{$t('chargeEdit.btn1')}}</Button>
              <Button :type="formValidate.mode === 1 ? 'primary' : 'ghost'" @click='changeBtn(1)'>{{$t('chargeEdit.btn2')}}</Button>
            </Button-group>
          </Form-item>
          <Form-item :label="$t('chargeEdit.label4')" v-else>
            <span>{{dealStatus}}</span>
          </Form-item>
          <Form-item :label="$t('chargeEdit.label5')" prop="price" v-if='formValidate.mode === 0 && isMenuHosp'>
            <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.price" @on-change='setPrice' style='width: 160px'></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('chargeEdit.label10')" prop="detailListStr" required>
            <Table stripe :columns="col" :data="data"></Table>
          </Form-item>
        </div>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <cmptChargeCategoryChoose :placeHolder="$t('charge.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    components: {cmptChargeCategoryChoose},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('chargeEdit.valid1')))
        } else {
          callback()
        }
      }
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
      }
      const validateCid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('charge.modalTit3')))
        } else {
          callback()
        }
      }
      const validateUnit = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('chargeEdit.valid4')))
        } else {
          callback()
        }
      }
      return {
        isMenuHosp: true,
        seen: true,
        printKey: true,
        saveLoad: false,
        titMsg: '',
        formValidate: {
          id: '',
          name: '',
          printName: '',
          pinYin: '',
          categoryId: '',
          unitID: '',
          size: '',
          code: '',
          assignDoctor: 1,
          remark: '',
          mode: 1,
          price: 0,
          detailListStr: '',
        },

        categoryOpenKey: false,
        categoryName: '',

        col: [
          {
            title: this.$t('chargeEdit.label8'),
            width: 100,
            key: 'name'
          },
          {
            title: this.$t('chargeEdit.label9'),
            width: 100,
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.status,
                },
                on: {
                  'on-change': (val) => {
                    this.data[params.index].status = val
                  }
                }
              }, [
                h('i-option', {
                  props: {
                    value: 0,
                  }
                }, this.$t('chargeEdit.label7')),
                h('i-option', {
                  props: {
                    value: 1,
                  }
                }, this.$t('chargeEdit.label6')),
              ])
            }
          },
          {
            title: this.$t('chargeEdit.label5'),
            width: 100,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  min: 0,
                  value: params.row.price,
                  max: 1000000,
                  disabled: this.formValidate.mode === 0 ? true : false
                },
                on: {
                  'on-change': (val) => {
                    params.row.price = parseFloat((val).toFixed(2));
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
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          printName: [
            { validator: validateName, trigger: 'blur' }
          ],
          pinYin: [
            { validator: validatePy, trigger: 'blur' }
          ],
          categoryId: [
            { validator: validateCid, trigger: 'change' }
          ],
          unitID: [
            { validator: validateUnit, trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      unitList () {
        return this.$store.getters.getSelectUnitInfoList
      },
      dealStatus () {
        return this.formValidate.mode === 0 
          ? this.$t('chargeEdit.btn1') 
          : this.$t('chargeEdit.btn2');
      },
    },
    created () {
      if(this.$route.query.id != 'add') {
        this.titMsg = this.$t('charge.modalTit2') 
        this.seen = true
        this.getEdit()
      } else {
        this.titMsg = this.$t('charge.modalTit1') 
        this.seen = false
        this.getAdd()
      }
      this.isMenuHosp = this.getHeadquarters();
    },
    mounted () {
      this.$store.dispatch('setSelectUnitInfoList')
      if(!this.seen) {
        this.$refs.formValidate.validateField('name')
        this.$refs.formValidate.validateField('printName')
      }
    },
    methods: {
      getAdd () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/charge/getAdd.jhtml',
          success: function(res){
            _vm.data = res.data.content.map(item => {
              return {
                status: 0,
                price: 0,
                hospitalID: item.id,
                name: item.name
              }
            }) || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      getEdit () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/charge/getUpdate.jhtml',
          data: {chargeId: _vm.$route.query.id},
          success: function(res){
            if(res.data.code === 0 ){
              console.log(res.data.content)
              const _charge = res.data.content.charge || {}
              const _data = res.data.content.rcList || []
              const _hosp = res.data.content.hospitalList || []
              _vm.data = _data.map(item => {
                const _index = _hosp.findIndex(hosp => hosp.id === item.hospitalID);
                return {
                  chargeID: item.chargeID,
                  hospitalID: item.hospitalID,
                  id: item.id,
                  price: item.price,
                  status: item.status,
                  name: _hosp[_index].name
                };
              });
              _vm.formValidate = {
                id: _charge.id || '',
                name: _charge.name || '',
                printName: _charge.printName || '',
                pinYin: _charge.pinYin || '',
                categoryId: _charge.categoryID || '',
                unitID: _charge.unitID || '',
                size: _charge.size || '',
                code: _charge.code || '',
                assignDoctor: _charge.assignDoctor === 0
                  ? 0
                  : 1,
                remark: _charge.remark || '',
                mode: _charge.mode === 0
                  ? 0
                  : 1,
                price: _charge.price || 0,
                detailListStr: JSON.stringify(_vm.data) || ''
              };
              _vm.categoryName = _charge.categoryName || '';
              if(_vm.formValidate.printName) {
                _vm.printKey = false
              } else {
                _vm.$refs.formValidate.validateField('printName')
              }
              if(_vm.formValidate.mode === 0) {
                _vm.formValidate.price = _vm.data[0].price
              }
              _vm.$store.dispatch('setPageLoading', 1)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
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
                _vm.formValidate.pinYin = res.data.content || ''
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
      //获取项目分类列表
      addCategory () {
        this.categoryOpenKey = !this.categoryOpenKey;
      },
      chooseCategory (data) {
        this.formValidate.categoryId = data.id;
        this.categoryName = data.name;
      },
      changeBtn (type) {
        this.formValidate.mode = type
        this.data.map(item => {
          item.price = this.formValidate.price
        })
      },
      setPrice (val) {
        this.$nextTick(() => {
          this.formValidate.price = parseFloat((val).toFixed(2))
          if(this.formValidate.mode === 0) {
            this.data.map(item => {
              item.price = parseFloat((val).toFixed(2))
            })
          }
        })
      },
      save () {
        let _vm = this,
        _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.seen) {
              _url = 'guard-webManager/charge/update.jhtml'
            } else {
              _url = 'guard-webManager/charge/add.jhtml'
            }   
            _vm.formValidate.detailListStr = JSON.stringify(_vm.data)
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/charge')
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
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


