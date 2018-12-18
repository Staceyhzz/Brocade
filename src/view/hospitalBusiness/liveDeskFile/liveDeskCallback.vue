/** 
 * 添加回访页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <div v-if='!powerKey'>
      {{$t('liveDeskCallback.msg')}}
    </div>
    <Form ref="formAdd" :model="formAdd" :rules="ruleForm" label-position="right">
      <Form-item prop="name" required v-if='powerKey'>
        <Input v-model="formAdd.name" type="textarea" :autosize="{minRows: 7,maxRows: 10}" :placeholder="$t('liveDeskCallback.valid3')"></Input>
      </Form-item>
      <Row v-if='powerKey'>
        <Col :md="12" :lg="8">
					<Form-item :label="$t('liveDeskCallback.label2')" prop="categoryId" required :label-width='100'>
						<Select v-model="formAdd.categoryId">
							<Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</Form-item>
        </Col>
        <Col :md="12" :lg="8">
					<Form-item :label="$t('liveDeskCallback.label3')" required prop="taskTime" :label-width='100'>
						<Date-picker :transfer='true' type="date" placement="bottom-start" :placeholder="$t('liveDeskCallback.label6')" :options='options' @on-change='saveDate' style='width:100%'
							ref='cleanDate'></Date-picker>
					</Form-item>
        </Col>
        <Col :md="12" :lg="8">
					<Form-item :label="$t('liveDeskCallback.label4')" prop="userId" required :label-width='100'>
						<Input v-model="userName" readonly icon="ios-search" :placeholder="$t('liveDeskCallback.placeholder')" @on-focus='showUser'></Input>
					</Form-item>
        </Col>
      </Row>
      <Row>
        <Col :md="12" :lg="7" v-if='powerKey1'>
        	<Button type="warning" long style='marginBottom:10px' @click='addSet'>{{$t('liveDeskCallback.btn')}}</Button>
        </Col>
        <Col :md="{ span: 11, offset: 1 }" :lg="{ span: 3, offset: 14 }" v-if='powerKey'>
        	<Button type="primary" long @click='save' :loading='saveLoad'>{{$t('publicSet.add')}}</Button>
        </Col>
      </Row>
    </Form>
    <hr>
    <div class="list">
      <Card v-for='(item, index) in data' :key='index' class='item'>
        <h3>{{item.categoryName}}</h3>
        <div :class="['callBack', item.createtime ? 'gray' : '']">
          <p>{{$t('liveDeskCallback.label1')}}{{item.name}}</p>
          <h4>
            <span>{{item.userName}}</span>{{$t('liveDeskCallback.label6')}}{{item.tasktime.split(' ')[0]}}</h4>
        </div>
        <div>
          <p>{{$t('liveDeskCallback.label5')}}{{item.content}}</p>
          <h4>
            <span>{{item.createUserName}}</span>{{item.createtime}}
          </h4>
        </div>
      </Card>
      <Button type="info" long v-if='moreListBtn' @click='showMore'>{{$t('liveDeskCallback.more')}}</Button>
    </div>
    <cmptCallBackEdit :openKey='modal' @saveCallBack='saveCallBack'></cmptCallBackEdit>
		<cmptChooseUserSinger :placeHolder="$t('liveDeskCallback.placeholder')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptCallBackEdit from 'components/callBackEdit.vue';
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
    components: {
			cmptCallBackEdit,
			cmptChooseUserSinger
    },
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskCallback.valid1')));
        } else {
          callback();
        }
      };
      const validateDay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskCallback.valid2')));
        } else {
          callback();
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskCallback.valid3')));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        saveLoad: false,
        powerKey: true,
        powerKey1: true,
        powerMsg: '',
        moreListBtn: false,
        moreList: [],
        formAdd: {
          customerId: sessionStorage.getItem('liveId'),
          taskTime: '',
          categoryId: '',
          name: '',
          userId: localStorage.getItem('userId'),
				},
				userOpenKey: false,
        userName: localStorage.getItem('userAccount'),
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        data: [],
        ruleForm: {
          taskTime: [{
            validator: validateDay,
            trigger: 'change'
          }],
          categoryId: [{
            validator: validateType,
            trigger: 'change'
          }],
          name: [{
            validator: validateCon,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      typeList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'liveDeskCallback') {
          this.getList();
        }
      },
    },
    created() {
      this.getPower()
      this.getPower1()
    },
    mounted() {
      this.getList()
      this.$store.dispatch('setSelectCallbackCategoryInfoList')
    },
    methods: {
      getPower() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/callbackTaskAdd.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
            } else {
              _vm.powerKey = false
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getPower1() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/callbackSetAdd.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
            } else {
              _vm.powerKey1 = false
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getCallback.jhtml',
          data: {
            id: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            let _data = res.data.content || []
            if(_vm.langRouterKey !== 'liveDeskCallback') {
              if (_data.length > 10) {
                _vm.moreListBtn = true
                _vm.data = _data.slice(0, 10)
                _vm.moreList = _data.slice(10)
              } else {
                _vm.moreListBtn = false
                _vm.data = _data
              }
            } else {
              _vm.requestList(_data, ['categoryName', 'content', 'name']).then(res => {
                if (res.length > 10) {
                  _vm.moreListBtn = true
                  _vm.data = res.slice(0, 10)
                  _vm.moreList = res.slice(10)
                } else {
                  _vm.moreListBtn = false
                  _vm.data = res
                }
              });
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      saveDate(date) {
        this.formAdd.taskTime = date
			},
			showUser() {
				this.userOpenKey = !this.userOpenKey;
			},
      chooseUser(data) {
        this.formAdd.userId = data.id
        this.userName = data.name
      },
      addSet() {
        this.modal = !this.modal
      },
      showMore() {
        this.data.push(...this.moreList)
        this.moreListBtn = false
      },
      saveCallBack(time, data) {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/liveDesk/addCallbackSet.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId'),
            startTime: time,
            userId: localStorage.getItem('userId'),
            detailListStr: JSON.stringify(data),
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.getList()
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              if(_vm.langRouterKey !== 'liveDeskCallback') {
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
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      save() {
        let _vm = this
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addCallBackTask.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$refs['cleanDate'].handleClear()
                  _vm.$refs['formAdd'].resetFields()
                  _vm.getList()
                  if(_vm.langRouterKey !== 'liveDeskCallback') {
                    _vm.$Notice.success({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.content
                    });
                  } else {
                    _vm.getLang.word(res.data.content, (data) => {
                      _vm.$Notice.success({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                } else {
                  if(_vm.langRouterKey !== 'liveDeskCallback') {
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
                }
                _vm.saveLoad = false
              },
              error: function (res) {
                console.log(res)
              }
            })
          }
        })
      },
    }
  }

</script>

<style scoped>
  hr {
    width: 100%;
    height: 1px;
    margin: 15px 0;
    border: none;
    background: rgba(65, 65, 65, 0.1);
  }

  .list .item {
    margin-bottom: 20px;
  }

  .list .item h3 {
    font-weight: normal;
    text-align: center;
    margin-bottom: 15px;
  }

  .list .item h4 {
    font-weight: normal;
    text-align: right;
  }

  .list .item h4 span {
    margin-right: 20px;
  }

  .list .item .callBack {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px dashed rgba(65, 65, 65, 0.6);
  }

  .list .item .gray {
    color: #C8C8C8;
  }

</style>
