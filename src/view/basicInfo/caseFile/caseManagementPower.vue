/**
* 病例表单管理
*/

<template>
  <div class="container-box case-management-power">
    <div class="container-header">
      <h2>病例表单权限管理</h2>
    </div>
    <div class="container-body">
      <div class="main-item">
        <h3 class="main-tit">查看
          <span>查看病历的权限</span>
        </h3>
        <div class="tag-list">
          <div class="tag-item" v-for="(item, index) in lookList" :key="index" @click.capture="remove(1, index)">
            <Tag closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        <div class="add-btn" @click="add(1)">
          <Icon type="plus-round"></Icon>点击选择成员
        </div>
      </div>
      <div class="main-item">
        <h3 class="main-tit">提交
          <span>填写病历的权限</span>
        </h3>
        <div class="tag-list">
          <div class="tag-item" v-for="(item, index) in addList" :key="index" @click.capture="remove(2, index)">
            <Tag closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        <div class="add-btn" @click="add(2)">
          <Icon type="plus-round"></Icon>点击选择成员
        </div>
      </div>
      <div class="main-item">
        <h3 class="main-tit">编辑
          <span>编辑病历的权限</span>
        </h3>
        <div class="tag-list">
          <div class="tag-item" v-for="(item, index) in editList" :key="index" @click.capture="remove(3, index)">
            <Tag closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        <div class="add-btn" @click="add(3)">
          <Icon type="plus-round"></Icon>点击选择成员
        </div>
      </div>
      <div class="main-item">
        <h3 class="main-tit">删除
          <span>删除病历的权限</span>
        </h3>
        <div class="tag-list">
          <div class="tag-item" v-for="(item, index) in delList" :key="index" @click.capture="remove(4, index)">
            <Tag closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        <div class="add-btn" @click="add(4)">
          <Icon type="plus-round"></Icon>点击选择成员
        </div>
      </div>
      <div class="main-item">
        <h3 class="main-tit">归档
          <span>归档病历的权限</span>
        </h3>
        <div class="tag-list">
          <div class="tag-item" v-for="(item, index) in fileList" :key="index" @click.capture="remove(5, index)">
            <Tag closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        <div class="add-btn" @click="add(5)">
          <Icon type="plus-round"></Icon>点击选择成员
        </div>
      </div>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal
      title="权限设置"
      v-model="modal"
      @on-ok="ok"
      class-name="vertical-center-modal">
      <div style='padding:20px'>
        <div style='margin:0 5px 5px 0; display: inline-block' v-for="(item, index) in selectList" :key='index'>
          <Tag color="blue">{{item.name}}</Tag>
        </div>
      </div>
      <Tabs :animated="false">
        <TabPane label="部门">
          <Table height="350" stripe :columns="col1" :data="data1" @on-selection-change='changeDept' ref="selDept"></Table>
        </TabPane>
        <TabPane label="角色">
          <Table height="350" stripe :columns="col2" :data="data2" @on-selection-change='changeRole' ref="selRole"></Table>
        </TabPane>
        <TabPane label="用户">
          <Table height="350" stripe :columns="col3" :data="data3" @on-selection-change='changeUser' ref="selUser"></Table>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        saveLoad: false,

        modal: false,
        type: 1,

        lookList: [],
        addList: [],
        editList: [],
        delList: [],
        fileList: [],

        selectList: [],

        col1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '部门名称',
            key: 'name'
          }
        ],
        data1: [],
        col2: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'name'
          }
        ],
        data2: [],
        col3: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名称',
            key: 'name'
          }
        ],
        data3: [],
      }
    },
    created () {
      this.getList();
      this.getDept();
      this.getRole();
      this.getUser();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByMenuIdSmartUserAuthDetailMap.jhtml',
          data: {
            hospitalId: localStorage.getItem('hospId'),
            menuId: _vm.$route.query.id
          },
          success: function(res){
            const deptList = res.data.content.deptList || [];
            const roleList = res.data.content.roleList || [];
            const userList = res.data.content.userList || [];

            deptList.map(item => {
              const obj = {
                name: item.deptName,
                id: item.deptId * 1,
                type: 1,
                auth: item.authCode * 1
              };
              if(item.authCode === '1') {
                _vm.lookList.push(obj);
              } else if(item.authCode === '2') {
                _vm.addList.push(obj);
              } else if(item.authCode === '3') {
                _vm.editList.push(obj);
              } else if(item.authCode === '4') {
                _vm.delList.push(obj);
              } else if(item.authCode === '5') {
                _vm.fileList.push(obj);
              }
            });

            roleList.map(item => {
              const obj = {
                name: item.roleName,
                id: item.roleId * 1,
                type: 2,
                auth: item.authCode * 1
              };
              if(item.authCode === '1') {
                _vm.lookList.push(obj);
              } else if(item.authCode === '2') {
                _vm.addList.push(obj);
              } else if(item.authCode === '3') {
                _vm.editList.push(obj);
              } else if(item.authCode === '4') {
                _vm.delList.push(obj);
              } else if(item.authCode === '5') {
                _vm.fileList.push(obj);
              }
            });

            userList.map(item => {
              const obj = {
                name: item.userName,
                id: item.userId * 1,
                type: 3,
                auth: item.authCode * 1
              };
              if(item.authCode === '1') {
                _vm.lookList.push(obj);
              } else if(item.authCode === '2') {
                _vm.addList.push(obj);
              } else if(item.authCode === '3') {
                _vm.editList.push(obj);
              } else if(item.authCode === '4') {
                _vm.delList.push(obj);
              } else if(item.authCode === '5') {
                _vm.fileList.push(obj);
              }
            });
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getDept() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/dept/list.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.data1 = res.data.content.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  _checked: false
                }
              }) || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getRole() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/role/list.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.data2 = res.data.content.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  _checked: false
                }
              }) || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getUser() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalOperatorUserList.jhtml',
          data: {
            hospitalId: localStorage.getItem('hospId'),
            deptId: '',
            account: '',
            name: '',
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.data3 = res.data.content.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  _checked: false
                }
              }) || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add(type) {
        this.type = type;
        let list = [];
        if(type === 1) {
          list = this.lookList;
        } else if(type === 2) {
          list = this.addList;
        } else if(type === 3) {
          list = this.editList;
        } else if(type === 4) {
          list = this.delList;
        } else if(type === 5) {
          list = this.fileList;
        }
        this.selectList = list;
        const list1 = this.data1.map(item => {
          const index = list.findIndex(i => i.type === 1 && i.id === item.id);
          return {
            ...item,
            _checked: index < 0 ? false : true,
          };
        });
        this.data1 = list1;
        const list2 = this.data2.map(item => {
          const index = list.findIndex(i => i.type === 2 && i.id === item.id);
          return {
            ...item,
            _checked: index < 0 ? false : true,
          };
        });
        this.data2 = list2;
        const list3 = this.data3.map(item => {
          const index = list.findIndex(i => i.type === 3 && i.id === item.id);
          return {
            ...item,
            _checked: index < 0 ? false : true,
          };
        });
        this.data3 = list3;
        this.modal = true;
      },
      remove(type, index) {
        if(type === 1) {
          this.lookList.splice(index, 1);
        } else if(type === 2) {
          this.addList.splice(index, 1);
        } else if(type === 3) {
          this.editList.splice(index, 1);
        } else if(type === 4) {
          this.delList.splice(index, 1);
        } else if(type === 5) {
          this.fileList.splice(index, 1);
        }
      },
      changeDept(data) {
        const list = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            type: 1,
            auth: this.type
          };
        });
        this.changeSelectList(1, list);
      },
      changeRole(data) {
        const list = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            type: 2,
            auth: this.type
          };
        });
        this.changeSelectList(2, list);
      },
      changeUser(data) {
        const list = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            type: 3,
            auth: this.type
          };
        });
        this.changeSelectList(3, list);
      },
      changeSelectList(type, list) {
        const deptList = this.selectList.filter(item => item.type === 1);
        const roleList = this.selectList.filter(item => item.type === 2);
        const userList = this.selectList.filter(item => item.type === 3);
        if(type === 1) {
          this.selectList = [...list, ...roleList, ...userList];
        } else if(type === 2) {
          this.selectList = [...deptList, ...list, ...userList];
        } else if(type === 3) {
          this.selectList = [...deptList, ...roleList, ...list];
        }
      },
      ok() {
        if(this.type === 1) {
          this.lookList = this.selectList;
        } else if(this.type === 2) {
          this.addList = this.selectList;
        } else if(this.type === 3) {
          this.editList = this.selectList;
        } else if(this.type === 4) {
          this.delList = this.selectList;
        } else if(this.type === 5) {
          this.fileList = this.selectList;
        }
      },
      saveList() {
        let deptList = [];
        let roleList = [];
        let userList = [];
        this.lookList.map(item => {
          if(item.type === 1) {
            deptList.push(item);
          } else if(item.type === 2) {
            roleList.push(item);
          } else if(item.type === 3) {
            userList.push(item);
          }
        });
        this.addList.map(item => {
          if(item.type === 1) {
            deptList.push(item);
          } else if(item.type === 2) {
            roleList.push(item);
          } else if(item.type === 3) {
            userList.push(item);
          }
        });
        this.editList.map(item => {
          if(item.type === 1) {
            deptList.push(item);
          } else if(item.type === 2) {
            roleList.push(item);
          } else if(item.type === 3) {
            userList.push(item);
          }
        });
        this.delList.map(item => {
          if(item.type === 1) {
            deptList.push(item);
          } else if(item.type === 2) {
            roleList.push(item);
          } else if(item.type === 3) {
            userList.push(item);
          }
        });
        this.fileList.map(item => {
          if(item.type === 1) {
            deptList.push(item);
          } else if(item.type === 2) {
            roleList.push(item);
          } else if(item.type === 3) {
            userList.push(item);
          }
        });
        const list1 = deptList.map(item => {
          return {
            hospitalId: localStorage.getItem('hospId'),
            menuId: this.$route.query.id,
            authCode: item.auth,
            deptId: item.id
          };
        });
        const list2 = roleList.map(item => {
          return {
            hospitalId: localStorage.getItem('hospId'),
            menuId: this.$route.query.id,
            authCode: item.auth,
            roleId: item.id
          };
        });
        const list3 = userList.map(item => {
          return {
            hospitalId: localStorage.getItem('hospId'),
            menuId: this.$route.query.id,
            authCode: item.auth,
            userId: item.id
          };
        });
        return {
          menuId: this.$route.query.id,
          hospitalId: localStorage.getItem('hospId'),
          deptList: JSON.stringify(list1),
          roleList: JSON.stringify(list2),
          userList: JSON.stringify(list3)
        };
      },
      save() {
        let _vm = this;
        const data = _vm.saveList();
        _vm.saveLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/case/updateByMenuIdSmartUserAuthDetai.jhtml',
          data: data,
          success: function(res){
            if(res.data.code === 0 ){
              _vm.$router.push('/caseManagement');
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
              _vm.saveLoad = false;
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang='less' scoped>
  .case-management-power {
    .container-body {
      padding: 30px 0;
      background-color: #f2f4f8;
      box-shadow: none;
    }
    .main-item {
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
    }
    .main-tit {
      font-size: 18px;
      font-weight: normal;
      line-height: 30px;
      color: #181818;
      span {
        padding-left: 10px;
        font-size: 14px;
        color: #797979;
      }
    }
    .tag-list {
      padding: 10px;
      .tag-item {
        display: inline-block;
        margin: 0 10px 10px 0;
      }
    }
    .add-btn {
      display: inline-block;
      padding: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #678ef8;
      cursor: pointer;
      i {
        margin-right: 10px;
      }
    }
  }
</style>




