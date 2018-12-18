/**
 * 用户弹窗多选选择组件
 * _activate 组件缓存时辅助关闭
 * dimension:  true    集团维度
 *             false   医院维度
 * defaultUser: true   显示默认公共人员
 *              false  不显示默认公共人员 
 */
<template>
  <div class="chooseUserCheckBox">
    <Modal
      :title="_placeHolder"
      width='720'
      v-model="modal"
      :closable="false"
      @on-ok='ok'
      class-name="vertical-center-modal">
      <Form :label-width="50" inline ref='deptFormUser' :model='deptFormUser'>
        <Form-item :label="$t('labelPublic.yy')" prop='hospitalId' v-if='dimension'>
          <Select v-model="deptFormUser.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.bm')" prop='deptId' v-else>
          <Select v-model="deptFormUser.deptId" style="width:162px" clearable>
            <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.zh')" prop='account'>
          <Input v-model.trim="deptFormUser.account" :placeholder="$t('placeholderPublic.input')" @on-enter="getUser" :maxlength='15'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.xm')" prop='name'>
          <Input v-model.trim="deptFormUser.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getUser" :maxlength='15'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getUser"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('deptFormUser')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table height="350" stripe :columns="userCol" :data="userData" @on-selection-change='chooseUser'></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'chooseUserCheckBox',
    props: {
      _placeHolder: String,
      _hospId: {
        type: Number,
        default: 0
      },
      _modal: Boolean,
      _activate: {
        type: Boolean,
        default: false
      },
      dimension: {
        type: Boolean,
        default: false
      },
      defaultUser: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      _modal (val) {
        if(this.userData.length) {
          this.userData.splice(0, this.userData.length, ...this.userData);
        }
        this.selectData = [];
        this.modal = true;
      },
      _activate (val) {
        this.modal = false;
      }
    },
    data () {
      return {
        deptList: [],
        userData: [],
        selectData: [],
        modal: false,
        deptFormUser: {
          hospitalId: '',
          deptId: '',
          account: '',
          name: '',
        },
        userCol: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
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
        ],
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      hospName () {
        if(this._hospId * 1 === 0) {
          return localStorage.getItem('hospName');
        } else {
          const index = this.hospList.findIndex(item => item.id === this._hospId * 1);
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
      this.$store.dispatch('setSelectAllHospList');
      console.log(this._hospId + '-----')
      this.deptFormUser.hospitalId = this._hospId
        ? this._hospId
        : localStorage.getItem('hospId');
      this.getDeptList();
      this.getUser();
    },
    methods: {
      //获取部门下拉
      getDeptList () {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalDeptInfo.jhtml',
          data: {hospitalId: _vm.deptFormUser.hospitalId},
          success: function(res){
            if(res.data.code === 0) {
              _vm.deptList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      //弹窗搜索
      getUser () {
        let _vm = this;
        let _url = _vm.dimension
          ? 'guard-webManager/select/userList.jhtml'
          : 'guard-webManager/select/hospitalUserList.jhtml';
        _vm.$http.get({
          url: _vm.url,
          data: _vm.deptFormUser,
          success: function(res){
            if(res.data.code === 0) {
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
            console.log(res)
          }
        })
      },
      ok () {
        this.$emit('ok', this.selectData);
        this.modal = false;
      },
      chooseUser (data) {
        this.selectData = data;
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.deptFormUser.hospitalId = this._hospId
        this.getUser()
      }
    }
  }
</script>