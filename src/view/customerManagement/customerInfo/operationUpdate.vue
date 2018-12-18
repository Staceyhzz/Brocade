/** 
 * 修改划扣页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexOperation.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('labelPublic.yy')">
          <span>{{formShow.hospitalName}}</span>
        </Form-item>
        <Form-item :label="$t('indexOperation.colTit4')">
          <span>{{formShow.chargeName}}</span>
        </Form-item>
        <Form-item :label="$t('indexOperation.colTit6')">
          <span>{{formShow.num}}</span>
        </Form-item>
        <Form-item :label="$t('indexOperation.colTit7')" prop="operatorListStr" required>
          <Row>
            <Col span="20">
              <Table stripe :columns="col" :data="formShow.operatorList"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
              <Button type="primary" icon="plus-round" @click='add'>{{$t('operationUpdate.btn')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal :title="$t('operationUpdate.valid')" v-model="modalEdit" :closable="false" class-name="vertical-center-modal">
      <Table height="350" stripe :columns="col1" :data="data1" @on-row-click='choose'></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateObj = (rule, value, callback) => {
        if (this.formShow.operatorList.length === 0) {
          callback(new Error(this.$t('operationUpdate.valid')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        modalEdit: false,
        formShow: {},
        formValidate: {
          id: '',
          operatorListStr: '',
        },
        col: [
          {
            title: this.$t('labelPublic.xm'),
            key: 'userName',
          },
          {
            title: this.$t('operationUpdate.colTit'),
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.positionid,
                  clearable: true,
                },
                on: {
                  'on-change': (val) => {
                    this.formShow.operatorList[params.index].positionid = val
                  }
                }
              }, this.positionList.map(item => {
                return h('i-option', {
                  props: {
                    value: item.id
                  }
                }, item.name)
              }))
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
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
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.xm'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.bm'),
            key: 'deptName',
          },
        ],
        data1: [],
        positionList: [],
        ruleForm: {
          operatorListStr: [{
            validator: validateObj,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.getId(this.$route.query.id);
    },
    methods: {
      // 判断权限
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/operationUpdate.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const obj = res.data.content.Operation || {};
            _vm.formShow = obj;
            _vm.positionList = res.data.content.PositionList || [];
            _vm.data1 = res.data.content.UserList || [];
            _vm.formValidate.id = obj.id;
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modalEdit = true;
      },
      choose(data) {
        const index = this.formShow.operatorList.findIndex(item => item.userid === data.id);
        if(index < 0) {
          this.formShow.operatorList.push({
            userid: data.id,
            userName: data.name,
            positionid: '',
            positionName: ''
          });
        }
        this.modalEdit = false;
        this.$refs.formValidate.validateField('operatorListStr');
      },
      remove(index) {
        this.formShow.operatorList.splice(index, 1);
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const _data = _vm.formShow.operatorList.map(item => {
              return {
                userId: item.userid,
                positionId: item.positionid
              };
            });
            _vm.formValidate.operatorListStr = JSON.stringify(_data);
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/operationUpdateEdit.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$router.back(-1);
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
