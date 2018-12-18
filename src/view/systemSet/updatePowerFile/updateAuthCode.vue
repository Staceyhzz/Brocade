/**
* 设置操作权限
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('userAuthCustomSet.msg4')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data" @on-selection-change='choose'></Table>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        saveLoad: false,
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name',
            render: (h, params) => {
              const text = this.$t('userPermissions.' + params.row.id);
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'content',
            render: (h, params) => {
              const text = this.$t('userPermissions.' + params.row.id + 'Remark');
              return h('span', text);
            }
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
        ],
        data: [],
        selectBox: [],
        key: true,
      }
    },
    created () {
      if(this.$route.query.type === 'user') {
        this.key = true
      } else if(this.$route.query.type === 'role') {
        this.key = false
      }
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this,
        _url = ''
        if(_vm.key) {
          _url = 'guard-webManager/userAuthCustom/record.jhtml'
        } else {
          _url = 'guard-webManager/role/config.jhtml'
        }
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: _url,
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            let _all = res.data.content.allAuthCodeList
            let _now = res.data.content.authCodeList
            _all.map(item => {
              _now.map(item1 => {
                if(item.id === item1.id) {
                  item['_checked'] = true
                }
              })
            })
            _vm.data = _all
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.choose(_now);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      choose (data) {
        this.selectBox = []
        data.map(item => {
          this.selectBox.push(item.id)
        })
      },
      save () {
        let _vm = this,
        _url = ''
        if(_vm.key) {
          _url = 'guard-webManager/userAuthCustom/updateAuthCode.jhtml'
        } else {
          _url = 'guard-webManager/role/updateAuthCodeEdit.jhtml'
        }
        _vm.saveLoad = true
        _vm.$http.post({
          url: _url,
          data: {
            id: _vm.$route.query.id,
            authCodeList: _vm.selectBox.join(','),
          },
          success: function(res){
            if(res.data.code === 0){
              _vm.$router.back(-1)
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
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
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>