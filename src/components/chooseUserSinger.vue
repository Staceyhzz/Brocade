/**
* 集团/机构 单选用户弹窗组件
* activate 组件缓存时辅助关闭
* dimension:  true    集团维度
*             false   医院维度
* defaultUser: true   显示默认公共人员
*              false  不显示默认公共人员 
*/
<template>
  <Modal
    :title="placeHolder"
    width='700'
    v-model="modal"
    :closable="false"
    class-name="vertical-center-modal">
    <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
      <Form-item :label="$t('labelPublic.yy')" prop='hospitalId' v-if='dimension'>
        <Select v-model="formSearch.hospitalId" clearable style="width:200px">
          <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <Form-item :label="$t('labelPublic.bm')" prop='deptId' v-else>
        <Select v-model="formSearch.deptId" style="width:162px">
          <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <Form-item :label="$t('labelPublic.zh')" prop='account'>
        <Input :maxlength='15' v-model.trim="formSearch.account" :placeholder="$t('placeholderPublic.input')" @on-enter="getUser"></Input>
      </Form-item>
      <Form-item :label="$t('labelPublic.xm')" prop='name'>
        <Input :maxlength='15' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getUser"></Input>
      </Form-item>
      <ul class="header-btn-group not-float">
        <li class="header-item" @click="getUser"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
      </ul>
    </Form>
    <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
  </Modal>
</template>

<script>
  export default {
    name: 'chooseUserSinger',
    props: {
      placeHolder: String,
      openKey: Boolean,
      hospId: {
        type: Number,
        default: 0
      },
      dimension: {
        type: Boolean,
        default: false
      },
      activate: {
        type: Boolean,
        default: false
      },
      defaultUser: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      openKey (val) {
        this.modal = true
      },
      activate (val) {
        this.modal = false;
      }
    },
    data () {
      return {
        formSearch: {
          hospitalId: '',
          deptId: '',
          account: '',
          name: '',
        },
        modal: false,
        userData: [],
        userCol: [
          {
            title: this.$t('labelPublic.zh'),
            width: 100,
            key: 'account'
          },
          {
            title: this.$t('labelPublic.xm'),
            width: 100,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 120,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.bm'),
            width: 80,
            key: 'deptName'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 80,
            key: 'gender'
          },
        ]
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      deptList () {
        return this.$store.getters.getSelectDeptList;
      },
      hospName () {
        if(this.hospId * 1 === 0) {
          return localStorage.getItem('hospName');
        } else {
          const index = this.hospList.findIndex(item => item.id === this.hospId * 1);
          if(index >= 0) {
            return this.hospList[index].name;
          } else {
            return '';
          }
        }
      },
      url () {
        if(this.defaultUser) {
          if(this.dimension) {
            return 'guard-webManager/select/userList.jhtml';
          } else {
            return 'guard-webManager/select/hospitalUserList.jhtml';
          }
        } else {
          if(this.dimension) {
            return 'guard-webManager/select/operatorUserList.jhtml';
          } else {
            return 'guard-webManager/select/hospitalOperatorUserList.jhtml';
          }
        }
      }
    },
    mounted () {
      this.formSearch.hospitalId = this.hospId
        ? this.hospId
        : localStorage.getItem('hospId');
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectDeptList', this.formSearch.hospitalId);
      this.getUser();
    },
    methods: {
      //弹窗搜索
      getUser () {
        let _vm = this;
        console.log(_vm.dimension)
        console.log(_vm.defaultUser)
        _vm.$http.get({
          url: _vm.url,
          data: _vm.formSearch,
          success: function(res){
            if(res.data.code === 0 ) {
              if(_vm.dimension) {
                _vm.userData = res.data.content || [];
              } else {
                _vm.userData = res.data.content.map(item => {
                  item.hospitalName = _vm.hospName;
                  return item;
                }) || [];
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.getUser();
      },
      chooseUser (data) {
        let _data = {
          id: data.id,
          name: data.name,
        };
        this.$emit('setUserData', _data);
        this.modal = false;
      },
    }
  }
</script>