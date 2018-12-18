/** 
 * 客户归属权变更 
 */
<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.ownershipManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="editAll(3)">
          <Icon type="gear-b"></Icon>{{$t('ownership.btn1')}}</li>
        <li class="header-item" @click="editAll(4)">
          <Icon type="gear-b"></Icon>{{$t('ownership.btn2')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>

    <Modal :title="$t('ownership.tit')" v-model="modalEdit" :closable="false" @on-ok="okEdit" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formEdit" :model="formEdit" :rules="ruleValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('ownership.label1')">
          <p>{{formEdit.userName}}</p>
        </Form-item>
        <Form-item :label="$t('labelPublic.lx')">
          <p>{{formEdit.typeName}}</p>
        </Form-item>
        <Form-item :label="$t('ownership.label2')" required prop='toUserName'>
          <Input readonly icon="ios-search" v-model="formEdit.toUserName" @on-focus='showUser' :placeholder="$t('ownership.valid2')"></Input>
        </Form-item>
      </Form>
    </Modal>

    <Modal :title="titleAll" v-model="modalAll" :closable="false" :loading="loading" @on-ok="okAll" class-name="vertical-center-modal">
      <Form ref="formAll" :model="formAll" :rules="ruleValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('ownership.label4')" prop='filterId'>
          <Select v-model="formAll.filterId" style="width:300px" @on-change='changeFilter'>
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('ownership.label3')" prop='ids'>
          <Input v-model.trim="formAll.ids" type="textarea" :rows='5' :placeholder="$t('ownership.input')" @on-change='changeIds'></Input>
        </Form-item>
        <Form-item :label="formAll.type" required prop='userName'>
          <Input readonly icon="ios-search" v-model="formAll.userName" @on-focus='showUser' :placeholder="$t('ownership.valid2')"></Input>
        </Form-item>
      </Form>
    </Modal>

    <cmptChooseUserSinger :placeHolder="$t('ownership.valid2')" @setUserData="setUser" :openKey='userOpenKey'></cmptChooseUserSinger>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('ownership.valid1')));
        } else {
          callback();
        }
      };
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('ownership.valid2')));
        } else {
          callback();
        }
      };
      const validateAll1 = (rule, value, callback) => {
        if (value === '' && this.formAll.filterId === '') {
          callback(new Error(this.$t('ownership.valid1')));
        } else {
          callback();
        }
      };
      const validateAll2 = (rule, value, callback) => {
        if (this.formAll.ids === '' && value === '') {
          callback(new Error(this.$t('ownership.valid1')));
        } else {
          callback();
        }
      };
      return {
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.xm'),
            width: 70,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.bm'),
            width: 70,
            key: 'deptName'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 70,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('ownership.colTit1'),
            width: 80,
            key: 'kfNum',
          },
          {
            title: this.$t('ownership.colTit2'),
            width: 80,
            key: 'zxNum',
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              if (params.row.kfNum) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row, 1)
                      }
                    }
                  }, this.$t('ownership.btn3'))
                ])
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              if (params.row.zxNum) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row, 2)
                      }
                    }
                  }, this.$t('ownership.btn3'))
                ])
              }
            }
          }
        ],
        data: [],

        userOpenKey: false,
        userType: '',

        loading: true,
        modalEdit: false,
        formEdit: {},

        titleAll: '',
        modalAll: false,
        formAll: {},
        typeList: [],

        ruleValidate: {
          ids: [{
            validator: validateAll1,
            trigger: 'blur'
          }],
          filterId: [{
            validator: validateAll2,
            trigger: 'change'
          }],
          toUserName: [{
            validator: validateUser,
            trigger: 'change'
          }],
          userName: [{
            validator: validateUser,
            trigger: 'change'
          }]
        },
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'ownership') {
          this.getList();
        }
      },
    },
    created() {
      this.getList();
      this.getType();
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/ownerShip/list.jhtml',
          success: function(res){
            const kfList = res.data.content.list1 || [];
            const zxList = res.data.content.list2 || [];
            _vm.data = res.data.content.newUserList.map(item => {
              const index1 = kfList.findIndex(k => k.userid === item.id);
              const index2 = zxList.findIndex(z => z.userid === item.id);
              item.kfNum = index1 >= 0
                ? kfList[index1].num
                : 0;
              item.zxNum = index2 >= 0
                ? zxList[index2].num
                : 0;
              return item;
            }) || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getType() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerFilter/list.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.typeList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },

      showUser() {
        this.userOpenKey = !this.userOpenKey;
      },
      setUser(data) {
        if(this.userType === 1 || this.userType === 2) {
          this.formEdit.toUserId = data.id;
          this.formEdit.toUserName = data.name;
        } else {
          this.formAll.userId = data.id;
          this.formAll.userName = data.name;
        }
      },

      edit(data, type) {
        this.$refs.formEdit.resetFields();
        this.formEdit = {
          userId: data.id,
          userName: data.name,
          typeName: type === 1
            ? this.$t('labelPublic.kfry')
            : this.$t('labelPublic.zxry'),
          type: type,
          toUserId: '',
          toUserName: ''
        };
        this.userType = type;
        this.modalEdit = true;
      },
      okEdit() {
        let _vm = this;
        _vm.$refs.formEdit.validate((valid) => {
          if(valid) {
            _vm.$http.post({
              url: 'guard-webManager/ownerShip/changeUserAdd.jhtml',
              data: _vm.formEdit,
              success: function (res) {
                if(res.data.code === 0) {
                  _vm.modalEdit = false;
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'ownership') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        });
      },

      editAll(type) {
        this.$refs.formAll.resetFields();
        this.formAll = {
          ids: '',
          userId: '',
          userName: '',
          filterId: '',
          type: type === 3
            ? this.$t('labelPublic.kfry')
            : this.$t('labelPublic.zxry')
        };
        this.titleAll = type === 3
          ? this.$t('ownership.btn1')
          : this.$t('ownership.btn2');
        this.userType = type;
        this.modalAll = true;
      },
      okAll() {
        let _vm = this;
        _vm.$refs.formAll.validate((valid) => {
          if(valid) {
            const url = _vm.userType === 3
              ? 'guard-webManager/ownerShip/exploitUserBatchAdd.jhtml'
              : 'guard-webManager/ownerShip/managerUserBatchAdd.jhtml';
            const ids = _vm.formAll.ids
              ? _vm.formAll.ids.replace(/[\r\n]/g, ",")
              : '';
            _vm.$http.post({
              url: url,
              data: {
                userId: _vm.formAll.userId,
                ids: ids,
                filterId: _vm.formAll.filterId
              },
              success: function (res) {
                if(res.data.code === 0) {
                  _vm.modalAll = false;
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'ownership') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        });
      },
      changeFilter() {
        this.$refs.formAll.validateField('ids');
      },
      changeIds() {
        this.$refs.formAll.validateField('filterId');
      },
    }
  }

</script>
