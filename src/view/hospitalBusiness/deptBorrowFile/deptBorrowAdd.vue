/** 
 * 添加部门借用单 
 */

<template>
  <div class="order-view dept-borrow-add">
    <div class="container-box">
      <div class="container-header">
        <h2>{{$t('deptBorrowAdd.tit')}}</h2>
      </div>
      <div class="container-body">
        <h3 class="oreder-tit">{{$t('deptBorrow.colTit9')}}</h3>
        <Form ref="formEdit" :model='formEdit' :label-width="90" label-position="right" style='margin-top:10px;' :rules="ruleForm">
          <Row type="flex" justify="start">
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label1')">
								<span>{{$t('deptBorrow.colTit9')}}</span>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label2')">
								<span>{{deptName}}</span>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label3')">
								<span>{{userName}}</span>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label4')">
								<span>{{hospName}}</span>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label5')" prop='fromWarehouseId' required>
								<Select v-model="formEdit.fromWarehouseId" :disabled='wareStatus'>
									<Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='12' :md="8" :lg="6">
							<Form-item :label="$t('deptBorrowAdd.label6')" prop='createDate' required>
								<Date-picker :transfer='true' type="date" :value='formEdit.createDate' :clearable='false' @on-change='setTime' style='width:100%'></Date-picker>
							</Form-item>
						</Col>
						<Col :xs='24' :sm='24' :md="24" :lg="12">
							<Form-item :label="$t('deptBorrowAdd.label7')" prop="remark" required>
								<Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('deptBorrowAdd.valid2')" :maxlength='100'></Input>
							</Form-item>
						</Col>
          </Row>
          <hr>
          <Form-item prop="detailListStr" required :label="$t('deptBorrowAdd.label8')">
            <Table stripe :columns="editCol" :data="editData"></Table>
            <p class="sumCount">{{$t('deptBorrowAdd.label9')}}
              <span>{{$t('deptBorrowAdd.label10')}}: {{couNum}}</span>
            </p>
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
        <Form ref="formAdd" :model='formAdd' :label-width="60" label-position="right">
          <Row>
            <Col span='10'>
              <Form-item :label="$t('deptBorrowAdd.label11')">
                <input-remote
                  :list='searchList' 
                  :asyncKey='asyncKey' 
                  @on-change-word='changeWord' 
                  @on-select='changeLabel' 
                  idProp='productid' 
                  nameProp='productName' 
                  size='large'
                  placement='top'
                  :placeholder="$t('deptBorrowAdd.placeholder')">
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
							<Form-item :label="$t('deptBorrowAdd.label12')">
								<span>{{formAdd.stockNum}}</span>
							</Form-item>
            </Col>
            <Col span='5' offset="1">
							<Form-item :label="$t('deptBorrowAdd.label10')">
								<cmptInputNumber :max="formAdd.stockNum" :min="1" v-model="formAdd.num" style="width:100%" @on-change='setNum'></cmptInputNumber>
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
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('deptBorrowAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('deptBorrowAdd.valid2')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.editData.length == 0) {
          callback(new Error(this.$t('deptBorrowAdd.valid3')));
        } else {
          callback()
        }
      };
      return {
        deptName: localStorage.getItem('deptName'),
        hospName: localStorage.getItem('hospName'),
        userName: localStorage.getItem('userAccount'),

        //快捷搜索
        searchList: [],
        asyncKey: true,
        searchIndex: 0,

        formAdd: {
          stockNum: 1,
          num: 0,
        },
        saveLoad: false,
        formEdit: {
          deptId: localStorage.getItem('deptId'),
          fromWarehouseId: '',
          createDate: moment().format('YYYY-MM-DD'),
          doUserId: localStorage.getItem('userId'),
          remark: '',
          detailListStr: '',
        },
        editCol: [
					{
						title: this.$t('deptBorrowAdd.colTit1'),
						width: 60,
            key: 'name'
          },
          {
            title: this.$t('deptBorrowAdd.colTit2'),
						width: 60,
            key: 'alias'
          },
          {
            title: this.$t('labelPublic.gg'),
						width: 60,
            key: 'size'
          },
          {
            title: this.$t('labelPublic.dw'),
						width: 60,
            key: 'unitName'
          },
          {
            title: this.$t('deptBorrowAdd.colTit3'),
						width: 60,
            key: 'stockNum'
          },
          {
            title: this.$t('deptBorrowAdd.colTit4'),
						width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 1,
                  value: params.row.num,
                  max: params.row.stockNum
                },
                on: {
                  'on-change': (val) => {
                    params.row.num = parseInt(val);
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
            title: this.$t('labelPublic.ms'),
						width: 60,
            key: 'remark',
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
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
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        editData: [],
        ruleForm: {
          fromWarehouseId: [{
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
          _obj.Num = item.num
          _obj.ProductID = item.id
          _box.push(_obj)
          _obj = {}
        })
        return JSON.stringify(_box)
      },
      warehouseList() {
        return this.$store.getters.getSelectHospitalWarehouseList
      },
      couNum() {
        let _real = 0
        this.editData.map(item => {
          _real += item.num
        })
        return _real
      },
      wareStatus() {
        if (this.formEdit.fromWarehouseId == '') {
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
      this.$refs.formEdit.validateField('fromWarehouseId')
    },
    methods: {
      //远程搜索
      changeWord(val) {
        let _vm = this;
        if(_vm.formEdit.fromWarehouseId) {
          _vm.asyncKey = true;
          _vm.searchIndex++;
          const _index = _vm.searchIndex;
          _vm.$http.get({
            url: 'guard-webManager/select/productStockAllUser.jhtml',
            data: {
              name: val,
              warehouseId: _vm.formEdit.fromWarehouseId
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
        obj.price = parseFloat((data.amount / data.num).toFixed(2));
        obj.num = 1;
        this.formAdd = Object.assign({}, obj);
      },
      searchAdd() {
        if(!Number.isFinite(this.formAdd.id)) {
          return;
        }
        const index = this.editData.findIndex(item => item.id === this.formAdd.id);
        if(index < 0) {
          this.editData.push(Object.assign({}, this.formAdd));
          this.$refs.formEdit.validateField('detailListStr');
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('deptBorrowAdd.msg')
          })
        }
      },
      setNum(val) {
        this.$nextTick(() => {
          this.formAdd.num = parseInt(val)
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
              url: 'guard-webManager/deptBorrow/addBorrow.jhtml',
              data: _vm.formEdit,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.$router.push('/deptBorrow')
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
                console.log(res);
              }
            });
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
  .dept-borrow-add {
    position: relative;
    width: 100%;
    height: ~'calc(100% - 42px)';
    .container-box {
      height: 100%;
      padding-bottom: 100px;
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
