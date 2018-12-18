/** 
 * 医生治疗预约设置 
 */

<template>
  <div class="container-box treat-doctor">
    <div class="container-header">
      <h2>{{$t('layoutNav.treatDoctorManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='toEdit'>
          <Icon type="plus-round"></Icon>{{$t('treatDoctor.btn')}}</li>
        <li class="header-item" @click='add'>
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('treatDoctor.label1')" prop="userName" required>
            <Input v-model="formValidate.userName" readonly icon="ios-search" :placeholder="$t('treatDoctor.valid2')" @on-focus='showUser' v-if='!key' style='width: 250px'></Input>
						<span v-else>{{formValidate.userName}}</span>
          </Form-item>
          <Form-item :label="$t('treatDoctor.label2')" required prop="startTime">
            <Time-picker :value='dateVal' format="HH:mm" type="timerange" placement="bottom-start" :placeholder="$t('treatDoctor.valid1')" @on-change='saveTime'  style='width: 250px'></Time-picker>
          </Form-item>
          <Form-item :label="$t('treatDoctor.label3')" prop="num" required>
						<cmptInputNumber :max="1000000" :min="1" v-model="formValidate.num" @on-change='setNum' style='width: 250px'></cmptInputNumber>
          </Form-item>
        </Form>
      </Modal>
			<cmptChooseUserSinger :placeHolder="$t('treatDoctor.valid2')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
    </div>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('treatDoctor.valid2')));
        } else {
          callback();
        }
      };
      const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('treatDoctor.valid1')));
        } else {
          callback();
        }
      };
      return {
        modalTit: '',
        modalEdit: false,
        loading: true,
				key: true,
				
				userOpenKey: false,

				data: [],
        columns: [
          { 
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title:this.$t('treatDoctor.label1'),
            key: 'userName',
            width: 70
          },
          {
            title: this.$t('treatDoctor.label2'),
            width: 120,
            render: (h, params) => {
              if(params.row.starttime && params.row.endtime) {
                return h('span', params.row.starttime + '-' + params.row.endtime);
              }
            }
          },
          {
            title: this.$t('treatDoctor.label3'),
            width: 80,
            key: 'num'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
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
                      this.edit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del'))
                ])
            }
          }
        ],

        formValidate: {
          id: '',
          userId: '',
          userName: '',
          startTime: '',
          endTime: '',
          num: 1
        },
        dateVal: [],
       
        ruleForm: {
          userName: [{
            validator: validateName,
            trigger: 'change'
          }],
          startTime: [{
            validator: validateTime,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/treatDoctor/list.jhtml',
          success: function (res) {
            const _data = res.data.content.List || [];
            _vm.data = _data.sort((x, y) => x.userid - y.userid);
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      edit(data) {
        this.modalTit = this.$t('treatDoctor.modalTit2');
        this.dateVal = []
        this.$refs['formValidate'].resetFields();
        this.formValidate.userName = data.userName
        this.formValidate.id = data.id
        this.formValidate.startTime = data.starttime
        this.formValidate.endTime = data.endtime
        this.dateVal.push(data.starttime)
        this.dateVal.push(data.endtime)
        this.formValidate.num = data.num
        this.key = true
        this.modalEdit = true
      },
      toEdit() {
        let breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/treatDoctor',
            text: 'layoutNav.treatDoctorManage'
          },
          {
            url: '/treatDoctorEdit',
            text: 'treatDoctor.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/treatDoctorEdit')
      },
      saveTime(time) {
        this.formValidate.startTime = time[0];
        this.formValidate.endTime = time[1];
			},
			setNum (val) {
        this.$nextTick(() => {
          this.formValidate.num = parseInt(val);
        })
      },
      add() {
        this.modalTit = this.$t('treatDoctor.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.dateVal = [];
        this.formValidate.userName = '';
        this.key = false;
        this.modalEdit = true;
      },
      showUser() {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser(data) {
        this.formValidate.userId = data.id;
        this.formValidate.userName = data.name;
      },
      remove(data) {
				let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('treatDoctor.msg1'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/treatDoctor/del.jhtml',
              data: {id: data.id},
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.getList();
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
              error: function (res) {
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      ok() {
				let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
						const url = _vm.key
							? 'guard-webManager/treatDoctor/update.jhtml'
							: 'guard-webManager/treatDoctor/add.jhtml';
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
    }
  }
</script>

