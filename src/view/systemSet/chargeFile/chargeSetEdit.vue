/**
* 添加/修改套餐页面
*/

<template>
  <div class="container-box depositChargeEdit">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :rules="ruleForm" :model="formValidate" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required style="width:400px">
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20' @on-blur='setPinYin'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.pym')" prop="pinYin" required style="width:400px">
          <Input v-model.trim="formValidate.pinYin" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('chargeSet.label')" prop="categoryId" style="width:400px">
          <cmptInputOpen :value='categoryName' :placeholder="$t('chargeSet.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
        </Form-item>
        <Form-item :label="$t('labelPublic.zt')" prop="status" v-if='key'>
          <Radio-group v-model="formValidate.status">
            <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
              <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('chargeSetEdit.label1')" prop="timeLimit">
          <Checkbox v-model="formValidate.timeLimit" :true-value='1' :false-value='0'>{{$t('chargeSetEdit.label1')}}</Checkbox>
        </Form-item>
        <Form-item :label="$t('chargeSetEdit.label2')" prop="days" style="width:400px">
          <cmptInputNumber :max="10000" :min="0" v-model="formValidate.days" style="width:300px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('chargeSetEdit.label3')" prop="timeStart">
          <Radio-group v-model="formValidate.timeStart">
            <Radio :label="1">{{$t('chargeSetEdit.label4')}}</Radio>
            <Radio :label="2">{{$t('chargeSetEdit.label5')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('chargeSetEdit.label6')" prop="detailListStr" required>
          <Table stripe :columns="col" :data="chargeList"></Table>
          <Button type="primary"  icon="plus-round" style='margin-top:10px;' @click='add'>{{$t('publicSet.add')}}</Button>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('chargeSetEdit.modalTit')"
        v-model="modal"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('chargeSetEdit.label7')" prop="chargeId" required>
            <Input v-model="formAdd.chargeName" readonly icon="ios-search" :placeholder="$t('placeholderPublic.sfxm')" @on-focus='addCharge'></Input>
          </Form-item>
          <Form-item :label="$t('chargeSetEdit.label8')" prop="num" required>
            <cmptInputNumber :max="1000000" :min="1" v-model="formAdd.num"></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('labelPublic.price')" prop="amount" required>
            <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.amount"></cmptInputNumber>
          </Form-item>
        </Form>
      </Modal>
    </div>
    <cmptChargeCategoryChoose :placeHolder="$t('chargeSet.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
    <cmptChargeChoose :placeHolder="$t('placeholderPublic.sfxm')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
  </div>
</template>

<script>
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeCategoryChoose, cmptChargeChoose},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      const validatePy = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.pinyin1')));
        } else {
          if(/^[a-z0-9]*$/g.test(value)) {
            callback()
          } else {
            callback(new Error(this.$t('validPublic.pinyin2')));
          }
        }
      };
      const validateBody = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('placeholderPublic.sfxm')));
        } else {
          const _index = this.chargeList.findIndex(item => item.chargeId === value);
          if(_index < 0) {
            callback()
          } else {
            callback(new Error(this.$t('chargeSetEdit.valid1')));
          }
        }
      };
      const validateObj = (rule, value, callback) => {
        if (this.chargeList.length === 0) {
          callback(new Error(this.$t('chargeSetEdit.valid2')));
        } else {
          callback();
        }
      };
      return {
        key: true,
        titMsg: '',
        saveLoad: false,

        categoryName: '',
        categoryOpenKey: false,

        formValidate: {
          categoryId: '',
          id: '',
          name: '',
          pinYin: '',
          status: '',
          timeLimit: 0,
          days: 0,
          timeStart: 1,
          remark: '',
          detailListStr: ''
        },

        chargeList: [],
        col: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'chargeId'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'chargeSize'
          },
          {
            title: this.$t('chargeSetEdit.label8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('labelPublic.price'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(params.row.amount || params.row.amount === 0) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
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
                }, this.$t('publicSet.del')),
                ])
            }
          }
        ],

        modal: false,
        loading: true,

        chargeOpenKey: false,

        formAdd: {
          chargeName: '',
          chargeId: '',
          chargeSize: '',
          num: 1,
          amount: 0
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          pinYin: [
            { validator: validatePy, trigger: 'blur' }
          ],
          detailListStr: [
            { validator: validateObj, trigger: 'change' }
          ],
          chargeId: [
            { validator: validateBody, trigger: 'change' }
          ],
        },
      }
    },
    created () {
      if(this.$route.query.id != 'add') {
        this.titMsg = this.$t('chargeSet.modalTit2');
        this.getId()
      } else {
        this.titMsg = this.$t('chargeSet.modalTit1');
        this.key = false
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/chargeSet/detailList.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            let obj = res.data.content || {};
            _vm.formValidate.id = obj.id || '';
            _vm.formValidate.name = obj.name || '';
            _vm.formValidate.pinYin = obj.pinYin || '';
            _vm.formValidate.status = obj.status === 0
              ? 0
              : 1;
            _vm.formValidate.categoryId = obj.categoryID || '';
            _vm.categoryName = obj.categoryName || '';
            _vm.formValidate.timeLimit = obj.timeLimit === 1
              ? 1
              : 0;
            _vm.formValidate.days = obj.days || 0;
            _vm.formValidate.timeStart = obj.timeStart || 1;
            _vm.formValidate.remark = obj.remark || '';
            _vm.chargeList = obj.detailList.map(item => {
              return {
                chargeId: item.chargeid,
                chargeName: item.chargeName,
                chargeSize: item.chargeSize,
                num: item.num
                  ? item.num
                  : 1,
                amount: item.amount
                  ? item.amount
                  : 0
              };
            }) || [];
            _vm.initCol();
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      initCol () {
        const _col = this.tableCount(this.chargeList, ['amount']);
        _col.map(item => {
          const index = this.col.findIndex(col => col.key === item.key);
          console.log(item)
          if(index >= 0) {
            this.col[index].width = item.width;
          }
        });
      },
      setPinYin () {
        let _vm  = this
        if(_vm.formValidate.name !== '') {
          _vm.$http.get({
            url: 'guard-webManager/select/getPinYin.jhtml',
            data: {name: _vm.formValidate.name},
            success: function(res){
              if(res.data.code === 0 ){
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
      //套餐类型
      addCategory () {
        this.categoryOpenKey = !this.categoryOpenKey;
      },
      chooseCategory (data) {
        this.formValidate.categoryId = data.id;
        this.categoryName = data.name;
      },
      clearCategory () {
        this.formValidate.categoryId = '';
        this.categoryName = '';
      },
      //添加项目
      add () {
        this.formAdd.chargeName = ''
        this.$refs['formAdd'].resetFields();
        this.modal = true
      },
      addCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseCharge (data) {
        this.formAdd.chargeName = data.name
        this.formAdd.chargeId = data.id
        this.formAdd.chargeSize = data.size
      },
      //确定增加项目
      ok () {
        this.$refs['formAdd'].validate((valid) => {
          if(valid) {
            const obj = Object.assign({}, this.formAdd);
            this.chargeList.push(obj);
            this.modal = false;
            this.initCol();
            this.$refs.formValidate.validateField('detailListStr');
          } else {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }
        })
      },
      remove (index) {
        this.chargeList.splice(index, 1)
      },
      save () {
        let _vm = this
        let url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              url = 'guard-webManager/chargeSet/update.jhtml'
            } else {
              url = 'guard-webManager/chargeSet/add.jhtml'
            }
            _vm.formValidate.detailListStr = JSON.stringify(_vm.chargeList);
            _vm.saveLoad = true
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/chargeSet')
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

<style>
  .depositChargeEdit .radioModal .ivu-radio-wrapper {
    display: block;
  }
</style>
