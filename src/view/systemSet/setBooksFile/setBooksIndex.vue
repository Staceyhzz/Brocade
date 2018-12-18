/**
* 账套管理页面
*/

<template>
	<div class="container-box">
		<div class="container-header">
			<h2>{{$t('layoutNav.setBooksManage')}}</h2>
			<ul class="header-btn-group">
       <li class="header-item" @click="add"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
     </ul>
   </div>
   <div class="container-body">
     <Table stripe :columns="columns" :data="data"></Table>
   </div>
   <Modal
      :title="$t('setBooksIndex.modalTit')"
      v-model="modal"
      :closable="false"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.bh')">
          <span>{{formValidate.companyCode}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.mc')">
          <span>{{formValidate.dbAccountName}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label1')">
          <span>{{formValidate.dbname}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label2')">
          <span>mysql</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label3')">
          <span>{{formValidate.url}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label4')">
          <span>{{formValidate.isEnable ? $t('setBooksIndex.use') : $t('setBooksIndex.unUse')}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label5')">
          <span>{{formValidate.linkStatus ? $t('setBooksIndex.success') : $t('setBooksIndex.error')}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label6')">
          <span>{{formValidate.username}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label7')">
          <span>{{formValidate.password}}</span>
        </Form-item>
        <Form-item :label="$t('setBooksIndex.label8')">
          <span>{{formValidate.createDate}}</span>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        modal: false,
        formValidate: {},
        columns: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'companyCode'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'dbAccountName'
          },
          {
            title: this.$t('labelPublic.zt'),
            key: 'isEnable',
            render: (h, params) => {
              const _text = params.row.isEnable 
                ? this.$t('setBooksIndex.use')
                : this.$t('setBooksIndex.unUse');
              const _color = params.row.linkStatus 
                ? 'green' 
                : 'red';
              const _text1 = params.row.linkStatus 
                ? this.$t('setBooksIndex.success')
                : this.$t('setBooksIndex.error');
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: this.$t('setBooksIndex.label5'),
                  content: _text1
                }
              }, [
              h('p', [
                h('Icon', {
                  props: {
                    type: 'record',
                    color: _color
                  }
                }),
                h('span', _text) 
                ])
              ])
            }
          },
          {
            title: this.$t('setBooksIndex.label1'),
            key: 'dbname'
          },
          {
            title: this.$t('setBooksIndex.label8'),
            key: 'createDate'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 240,
            render: (h, params) => {
              const _display = params.row.isEnable ? 'none' : 'inline-block',
              _display1 = params.row.isEnable ? 'none' : 'inline-block'
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    marginRight: '2px',
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'checkmark'
                  },
                  style: {
                    display: _display1
                  },
                  on: {
                    click: () => {
                      this.check(params.row)
                    }
                  }
                }, this.$t('setBooksIndex.btn')),
              ])
            }
          }
        ],
        data: [],
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/accountMode/list.jhtml',
          success: function(res){
            console.log(res)
            _vm.data = res.data.content || [];
            _vm.data.map((item, index) => {
              item.linkStatus = true;
              _vm.test(item, index);
            })
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      test (data, index) {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/accountMode/testDbConnect2.jhtml',
          data: {
            url: data.url,
            user: data.username,
            password: data.password, 
          },
          success: function(res){
            console.log(res)
            if(res.data.code === 0){
              data.linkStatus = true
              _vm.data.splice(index, 1, data)
            } else {
              console.log(res.data.desc)
              data.linkStatus = false
              _vm.data.splice(index, 1, data)
            }
          },
          error: function(res){
            console.log(res)
            data.linkStatus = false
            _vm.data.splice(index, 1, data)
          }
        })
      },
      add () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/setBooksIndex',
            text: 'layoutNav.setBooksManage'
          },
          {
            url: '/setBooksIndexAdd',
            text: 'setBooksIndex.msg1'
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push('/setBooksIndexAdd')
      },
      toView (data) {
        this.formValidate = {...data}
        if(this.formValidate.url) {
          this.formValidate.url = this.formValidate.url.split('//')[1]
          this.formValidate.url = this.formValidate.url.split('/')[0]
        }
        this.modal = true
      },
      remove (data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('setBooksIndex.msg2')}</p>
          <p>${_vm.$t('setBooksIndex.msg3')}</p>
          <p>${_vm.$t('labelPublic.bh')}：${data.companyCode}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.dbAccountName}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/accountMode/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      check (data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('setBooksIndex.msg4')}</p>
          <p>${_vm.$t('setBooksIndex.msg5')}</p>`,
          onOk: () => {
            _vm.$http.get({
              url: 'guard-webManager/accountMode/switchAccountMode.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('setBooksIndex.msg6')
                  })
                  setTimeout(() => {
                    _vm.$router.push('/login')
                  }, 2000)
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        })
      },
    }
  }
</script>