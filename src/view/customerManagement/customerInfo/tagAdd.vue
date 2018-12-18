/** 
 * 客户标签管理页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerTag')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('tagAdd.label1')" prop="tagList" required>
          <div class="tagBox">
            <div v-for='(item, index) in tagBox' :key='index' class='tagList-item' @click.capture="close(index)">
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Form-item>
      </Form>
      <Tabs value="name1" :animated='false'>
        <Tab-pane :label="$t('tagAdd.label3')" name="name1">
          <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
            <Form-item prop='name'>
              <Input v-model.trim="formSearch.name" :placeholder="$t('tagAdd.placeholder')" :maxleng='20'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getList(formSearch)">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <div class="tagBox">
            <div v-for='(item, index) in tagList' :key='index' class='tagList-item' @click.capture="choose(item, true)">
              <Tag type="border" color="blue">{{item.name}}</Tag>
            </div>
          </div>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('tagAdd.label2')" name="name2">
          <Table stripe :columns="col" :data="data"></Table>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        if (this.tagBox.length === 0) {
          callback(new Error(this.$t('tagAdd.valid')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          tagList: []
        },
        formSearch: {
          name: ''
        },
        data: [],
        col: [
          {
            title: this.$t('tagAdd.label2'),
            key: 'name'
          },
          {
            title: this.$t('tagAdd.label1'),
            render: (h, params) => {
              return h('div', params.row.detailList.map(item => {
                const _color = item.status === 1 
                  ? 'blue' 
                  : 'red';
                return h('div', {
                  style: {
                    display: 'inline-block',
                    margin: '0px 5px'
                  },
                }, [
                  h('Tag', {
                    props: {
                      type: 'border',
                      color: _color
                    },
                    nativeOn: {
                      click: () => {
                        if (item.status === 1) {
                          this.choose(item, false);
                        }
                      }
                    },
                  }, item.tagName)
                ])
              }))
            }
          }
        ],
        tagList: [],
        tagBox: [],
        ruleForm: {
          tagList: [{
            validator: validateList,
            trigger: 'change'
          }],
        }
      }
    },
    mounted() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      // 获取资料
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/tagAdd.jhtml',
          data: {
            customerId: _vm.formValidate.customerId
          },
          success: function (res) {
						_vm.data = res.data.content || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //查找标签
      getList(form) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/tagList.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.tagList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      choose(data, type) {
        const id = type
          ? data.id
          : data.tagid;
        const name = type
          ? data.name
          : data.tagName;
        const index = this.tagBox.findIndex(item => item.id === id);
        if(index < 0) {
          this.tagBox.push({
            id: id,
            name: name
          });
          this.$refs.formValidate.validateField('tagList');
        }
      },
      close(index) {
        this.tagBox.splice(index, 1);
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.tagList = [];
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.formValidate.tagList = _vm.tagBox.map(item => item.id).join(',');
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addTag.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  const breadData = [{
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/customer',
                      text: 'layoutNav.customerManage'
                    },
                    {
                      url: '/customerMsg',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/customerMsg');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
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
        this.$router.back(-1);
      }
    }
  }

</script>

<style scoped>
  .tagList-item {
    display: inline-block;
    margin: 3px 6px;
  }

</style>
