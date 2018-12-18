/**
* 药物品属性
*/

<template>
  <div class="container-box product-quality">
    <div class="container-header">
      <h2>{{$t('layoutNav.productQualityManage')}}</h2>
    </div>
    <div class="container-body">
      <div class="customer-item">
        <div class="customer-item-title">
          <h3><Icon type="pricetag"></Icon>{{$t('productQuality.tit1')}}</h3>
        </div>
        <div class="checkBox-item">
          <Checkbox-group v-model="disabledGroup">
            <Row type="flex" justify="start">
              <Col :xs='24' :sm='12' :md="6" :lg="4" v-for='item in disabledGroup' :key='item' class='check-item'>
                <Checkbox :label="item" disabled>{{$t(item)}}</Checkbox>
              </Col>
            </Row>
          </Checkbox-group>
        </div>
      </div>
      <div class="customer-item">
        <div class="customer-item-title">
          <h3><Icon type="pricetag"></Icon>{{$t('productQuality.tit2')}}</h3>
        </div>
        <div class="checkBox-item">
          <Checkbox-group v-model="selectBox">
            <Row type="flex" justify="start">
              <Col :xs='24' :sm='12' :md="6" :lg="4" v-for='item in data' :key='item.id' class='check-item'>
                <Checkbox :label="item.id">{{item.nameLang}}</Checkbox>
                  <span v-if='item.edit' class='edit' @click='edit(item)'><Icon type="edit"></Icon></span>
              </Col> 
            </Row>
          </Checkbox-group>
        </div>
      </div>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
      </div>
    </div>
    <Modal
      :title="$t('productQuality.modalTit')"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required>
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='10'></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        modal: false,
        loading: true,
        formValidate: {
          id: '',
          name: '',
        },
        disabledGroup: ['labelPublic.bh', 'labelPublic.mc', 'productQuality.label1','labelPublic.pym', 'labelPublic.lx', 'labelPublic.zt', 'labelPublic.gg'],
        data: [],
        selectBox: [],
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'productQuality') {
          this.getList();
        }
      },
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/productProperties/list.jhtml',
          success: function(res){
            console.log(res.data.content)
            let _data = res.data.content.map(item => {
              if(item.status === 1) {
                _vm.selectBox.push(item.id);
              }
              return {
                name: item.name,
                nameLang: item.name,
                id: item.id,
                properties: item.properties,
                edit: item.properties.includes('Custom')
              };
            }) || [];
            if(_vm.langRouterKey !== 'productQuality') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['nameLang']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      edit (data) {
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = data.id
        this.formValidate.name = data.name
        this.modal = true
      },
      ok () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/productProperties/updateCustom.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields()
                  _vm.modal = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'productQuality') {
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
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true
                  })
                }
              },
              error: function(res){
                console.log(res)
              }
            })
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      },
      save () {
        let _vm = this
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/productProperties/update.jhtml',
          data: {
            idList: _vm.selectBox.join(',')
          },
          success: function(res){
            if(res.data.code == 0 ){
              _vm.getList()
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              if(_vm.langRouterKey !== 'productQuality') {
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
          error: function(res){
            console.log(res)
          }
        })
      },
    }
  }
</script>

<style scoped lang='less'>
  .product-quality {
    .checkBox-item {
      padding: 28px;
      margin: 0 100px 15px;
      border: 1px solid rgba(42,42,68,0.10);
      border-radius: 6px;
    }
    .checkBox-item .edit {
      cursor: pointer;
    }
    .check-item {
      margin: 15px 0;
    }
  }
</style>
<style type="text/css">
  .product-quality .ivu-checkbox-group-item {
    display: inline;
  }
</style>