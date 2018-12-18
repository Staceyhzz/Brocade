/**
* 添加/修改标签组管理页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required>
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('tagGroupEdit.label')" prop="list" required>
          <Row>
            <Col span="20">
              <Table stripe :columns="columns" :data="formValidate.list"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
              <Button type="primary"  icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
              <Button type="primary"  icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('tagGroupEdit.modalTit')"
        v-model="modalEdit"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form  :label-width="50" inline ref="formSearch" :model="formSearch">
          <Form-item :label="$t('labelPublic.mc')" prop="name">
            <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter='getList(formSearch.name)'></Input>
          </Form-item>
          <ul class="header-btn-group not-float">
            <li class="header-item" @click='getList(formSearch.name)'><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
            <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
          </ul>
        </Form>
        <Table height="350" stripe :columns="columns1" :data="data" @on-selection-change='change'></Table>
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
      const validateList = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error(this.$t('tagGroupEdit.valid')));
        } else {
          callback();
        }
      };
      return {
        key: true,
        saveLoad: false,
        titMsg: '',
        columns: [
          {
            title: this.$t('callbackSetEdit.label2'),
            width: 60,
            key: 'tagName'
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
        data: [],
        selectBox: [],
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('tagGroup.tag'),
            key: 'name'
          }
        ],
        modalEdit: false,
        loading: true,
        formValidate: {
          name: '',
          remark: '',
          list: []
        },
        formSearch: {
          name: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          list: [
            { validator: validateList, trigger: 'blur' }
          ]
        },
      }
    },
    created () {
      if(this.$route.query.id !== 'add') {
        this.titMsg = this.$t('tagGroup.modalTit2');
        this.getId();
      } else {
        this.titMsg = this.$t('tagGroup.modalTit1');
        this.key = false;
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    mounted () {
      this.getList(this.formSearch.name)
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/tagGroup/get.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            _vm.formValidate.name = res.data.content.name || '';
            _vm.formValidate.remark = res.data.content.remark || '';
            _vm.formValidate.list = res.data.content.detailList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getList (name) {
        let _vm = this;
        if(name.length == 0) {
          name = null
        }
        _vm.$http.get({
          url: 'guard-webManager/select/tagList.jhtml',
          data: {name: name},
          success: function(res){
            if(res.data.code === 0 ){
              console.log(res.data.content)
              _vm.data = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add () {
        this.modalEdit = true;
      },
      clean () {
        this.formValidate.list.splice(0);
      },
      remove (index) {
        this.formValidate.list.splice(index, 1);
      },
      change (data) {
        this.selectBox = data;
      },
      ok () {
        let _bool = true;
        this.selectBox.map(item => {
          this.formValidate.list.map(item1 => {
            if(item.id == item1.tagid) {
              _bool = false
            }
          })
          if(_bool) {
            item.tagName = item.name
            item.tagid = item.id
            this.formValidate.list.push(item)
          } else {
            _bool = true
          }
        })
        this.modalEdit = false
        this.$refs.formValidate.validateField('list')
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.getList(this.formSearch.name)
      },
      save () {
        let _vm = this
        let url = ''
        let data = {}
        let idBox = []
        _vm.formValidate.list.map(item => {
          idBox.push(item.tagid)
        })
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              url = 'guard-webManager/tagGroup/edit.jhtml'
              data = {
                id: _vm.$route.query.id,
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                tagIds: idBox.join(',')
              }
            } else {
              url = 'guard-webManager/tagGroup/add.jhtml'
              data = {
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                tagIds: idBox.join(',')
              }
            }
            _vm.saveLoad = true
            _vm.$http.post({
              url: url,
              data: data,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$router.push('/tagGroup')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  })
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
