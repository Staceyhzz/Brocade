/**
* 预约工作台选择用户
*/
<template>
  <Modal
    :title="placeHolder"
    width='700'
    v-model="modal"
    :closable="false"
    class-name="vertical-center-modal">
    <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
      <Form-item prop='query'>
        <Input v-model="formSearch.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch()" ></Input>
      </Form-item>
      <ul class="header-btn-group not-float">
        <li class="header-item" @click="getSearch()"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
        <li class="header-item" @click="handleReset()"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
      </ul>
    </Form>
    <Alert v-if='key'>
      {{$t('onlineDesk.searchTit')}}
      <div slot="desc" v-if='data.length === 0'>
        <p>{{$t('onlineDesk.searchMsgNo')}}</p>
      </div>
      <div slot="desc" v-else>
        <p>{{$t('onlineDesk.searchMsg',[data.length])}}</p>
      </div>
    </Alert>
    <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
  </Modal>
</template>

<script>
  export default {
    name: 'appointmentUser',
    props: {
      placeHolder: String,
      openKey: Boolean,
    },
    watch: {
      openKey (val) {
        this.modal = true
      },
    },
    data () {
      return {
        formSearch: {
          query: '',
        },
        modal: false,
        key: false,
        data: [],
        col: [
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.sjh'),
            width: 80,
            key: 'mobile'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 60,
            key: 'gender'
          },
          {
            title: this.$t('labelPublic.hy'),
            width: 60,
            key: 'memberCategoryName'
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('labelPublic.nl'),
            width: 50,
            key: 'age'
          },
          {
            title: this.$t('appointmentUser.colTit1'),
            width: 70,
            render: (h, params) => {
              const color = params.row.visit === '1' 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.visit === '1' 
                ? this.$t('appointmentUser.colTit2')
                : this.$t('appointmentUser.colTit3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('appointmentUser.colTit4'),
            width: 70,
            render: (h, params) => {
              const color = params.row.deal === '1' 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.deal === '1' 
                ? this.$t('appointmentUser.colTit5')
                : this.$t('appointmentUser.colTit6');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          }
        ]
      }
    },
    methods: {
      getSearch () {
        let _vm = this;
        if(_vm.formSearch.query === '') {
          _vm.key = false;
          return;
        }
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/query.jhtml',
          data: _vm.formSearch,
          success: function(res){
            if(res.data.code === 0 ) {
              _vm.data = res.data.content || [];
              _vm.key = true;
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.key = false;
        this.data = [];
        this.getSearch();
      },
      choose (data) {
        let _data = {
          id: data.id,
          name: data.name,
        };
        this.$emit('on-change', _data);
        this.modal = false;
      },
    }
  }
</script>