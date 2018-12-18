/**
* 添加/修改回访组信息页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" :rules="ruleForm" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required style='width:400px;'>
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('callbackSetEdit.label1')" prop="more" required>
          <Table stripe :columns="col" :data="formValidate.more"></Table>
          <Button type="primary"  icon="plus-round" @click='add' style='margin-top:10px;'>{{$t('publicSet.add')}}</Button>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('callbackSetEdit.modalTit')"
        v-model="modalEdit"
        :closable="false"
        @on-ok='ok'
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formValidate1" :model="formValidate1" :rules="ruleForm1" :label-width="100" label-position="right">
          <Form-item :label="$t('callbackSetEdit.label2')" prop="index" required>
            <Select v-model="formValidate1.index">
              <Option v-for="(item, index) in typeList" :value="index" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('callbackSetEdit.label3')" prop="days" required>
            <cmptInputNumber :max="10000" :min="1" v-model="formValidate1.days"></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="name">
            <Input v-model.trim="formValidate1.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
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
      const validateMore = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error(this.$t('callbackSetEdit.valid1')));
        } else {
          callback();
        }
      };
      const validateIndex = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackSetEdit.valid2')));
        } else {
          callback();
        }
      };
      return {
        key: true,
        saveLoad: false,
        modalEdit: false,
        loading: true,
        formValidate: {
          name: '',
          remark: '',
          more: []
        },
        col: [
          {
            title: this.$t('callbackSetEdit.label2'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('callbackSetEdit.label3'),
            width: 60,
            key: 'days'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'name'
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
        formValidate1: {
          index: '',
          days: 1,
          name: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          more: [
            { validator: validateMore, trigger: 'blur' }
          ]
        },
        ruleForm1: {
          index: [
            { validator: validateIndex, trigger: 'blur' }
          ],
        }              
      }
    },
    computed: {
      typeList () {
        return this.$store.getters.getSelectCallbackCategoryInfoList
      },
      titMsg () {
        if(this.$route.query.id !== 'add') {
          return this.$t('callbackCategory.modalTit2');
        } else {
          return this.$t('callbackCategory.modalTit1');
        }
      },
    },
    created () {
      if(this.$route.query.id !== 'add') {
        this.getId();
      } else {
        this.key = false;
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    mounted () {
      this.$store.dispatch('setSelectCallbackCategoryInfoList')
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/callbackSet/get.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            _vm.formValidate.name = res.data.content.name || '';
            _vm.formValidate.remark = res.data.content.remark || '';
            _vm.formValidate.more = res.data.content.detailList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add () {
        this.$refs['formValidate1'].resetFields()
        this.modalEdit = true
      },
      ok () {
        this.$refs['formValidate1'].validate((valid) => {
          if(valid) {
            let box = {
              categoryid: this.typeList[this.formValidate1.index].id,
              categoryName: this.typeList[this.formValidate1.index].name,
              days: this.formValidate1.days,
              name: this.formValidate1.name
            }
            this.formValidate.more.push(box)
            this.modalEdit = false
          } else {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true;
            });
          }
        })
      },
      remove (index) {
        this.formValidate.more.splice(index, 1);
      },
      save () {
        let _vm = this
        let url = ''
        let data = {}
        let detailList = []
        for (let i = 0; i < _vm.formValidate.more.length; i++) {
          let detailObj = {}
          detailObj['categoryid'] = _vm.formValidate.more[i]['categoryid']
          detailObj['days'] = _vm.formValidate.more[i]['days']
          detailObj['name'] = _vm.formValidate.more[i]['name']
          detailList.push(detailObj)
        }
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              url = 'guard-webManager/callbackSet/edit.jhtml'
              data.callbackSet = JSON.stringify({
                id: _vm.$route.query.id,
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                detailList: detailList
              })
            } else {
              url = 'guard-webManager/callbackSet/add.jhtml'
              data.callbackSet = JSON.stringify({
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                detailList: detailList
              })
            }
            console.log(data)
            _vm.saveLoad = true
            _vm.$http.post({
              url: url,
              data: data,
              success: function(res){
                console.log(res)
                if(res.data.code === 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  })
                  _vm.$router.push('/callbackSet')
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
