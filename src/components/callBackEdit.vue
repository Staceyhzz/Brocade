<template>
  <div class="call-back-edit">
    <Modal :title="$t('liveDeskCallback.modalTit')" v-model="modal" :mask-closable='false' :closable='false' width='90%' class-name="call-back-edit-modal">
      <div class="call-back-content">
        <div class="call-back-nav">
          <Input v-model="content" icon="ios-search" :placeholder="$t('liveDeskCallback.placeholder1_1')"></Input>
          <div class="nav-scroll">
            <ul>
              <li v-for='(item, index) in searchList' :key='index' @click='choose(item)' :class="[navId === item.id ? 'active' : '']">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="call-back-main">
          <Table height="350" stripe :columns="editCol" :data="editData"></Table>
          <Form :label-width="80" :model="formAdd" label-position="right" inline class='form-add clearfix'>
            <Form-item :label="$t('liveDeskCallback.colTit1')" prop='categoryid'>
              <Select v-model="formAdd.categoryid" style='width:120px'>
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item :label="$t('liveDeskCallback.colTit2')" prop='days'>
              <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.days" @on-change='setDays'></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('liveDeskCallback.colTit4')" prop='name'>
              <Input v-model.trim="formAdd.name"></Input>
            </Form-item>
            <Button type="ghost" class='add' @click='add'>{{$t('publicSet.add')}}</Button>
          </Form>
        </div>
      </div>
      <div class="modal-footer clearfix" slot="footer">
        <div class="batch" v-if='modal'>
          <Form :label-width="60" :model="formBatch" label-position="right" inline>
            <Form-item :label="$t('liveDeskCallback.colTit5')" prop='startTime'>
              <Date-picker :transfer='true' type="date" placement="top" :options='options' @on-change='setTime' :value='formBatch.startTime'
                :clearable='false'></Date-picker>
            </Form-item>
            <Form-item :label="$t('liveDeskCallback.label4')" prop='userId'>
							<Input v-model="formBatch.userName" readonly icon="ios-search" :placeholder="$t('liveDeskCallback.placeholder')" @on-focus='showUser(-1)'></Input>
            </Form-item>
          </Form>
        </div>
        <div class="btn">
          <Button type="primary" @click='save'>{{$t('liveDeskCallback.btn1_1')}}</Button>
          <Button type="ghost" @click='cancel'>{{$t('liveDeskCallback.btn1_2')}}</Button>
        </div>
      </div>
    </Modal>
		<cmptChooseUserSinger :placeHolder="$t('liveDeskCallback.placeholder')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {
			cmptChooseUserSinger
    },
    name: 'callBackEdit',
    props: {
      openKey: Boolean,
    },
    data() {
      return {
        modal: false,
        content: '',
        navId: null,
        navList: [],
        formBatch: {
          startTime: moment().format('YYYY-MM-DD'),
          userName: localStorage.getItem('userAccount'),
          userId: localStorage.getItem('userId')
        },
        editData: [],
        editCol: [
					{
            title: this.$t('liveDeskCallback.colTit1'),
            width: 100,
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.categoryid,
                  size: 'small',
                },
                on: {
                  'on-change': (val) => {
                    this.editData[params.index].categoryid = val
                  }
                }
              }, this.typeList.map(item => {
                return h('i-option', {
                  props: {
                    value: item.id
                  }
                }, item.name)
              }))
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit2'),
            width: 85,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.days,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.days = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData[params.index].time = moment(this.formBatch.startTime).add(params.row.days,
                      'd').format('YYYY-MM-DD');
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit3'),
            width: 120,
            render: (h, params) => {
              return h('Date-picker', {
                props: {
                  type: 'date',
                  size: 'small',
                  value: params.row.time,
                  clearable: false,
                  options: this.options,
                  transfer: true
                },
                on: {
                  'on-change': (val) => {
                    this.editData[params.index].time = val
                    const end = moment(val)
                    const start = moment(this.formBatch.startTime)
                    const diff = end.diff(start, 'd')
                    this.editData[params.index].days = diff
                    this.editData.splice(params.index, 1, this.editData[params.index])
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.label4'),
            width: 85,
            render: (h, params) => {
              return h('Input', {
                props: {
                  value: params.row.userName,
                  readonly: true,
                  size: 'small',
                },
                on: {
                  'on-focus': () => {
                    this.showUser(params.index)
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit4'),
            width: 120,
            render: (h, params) => {
              let _val = '',
                _bool = false
              return h('Input', {
                props: {
                  type: 'textarea',
                  value: params.row.name
                },
                on: {
                  input: (val) => {
                    console.log(val)
                    _val = val
                  },
                  'on-change': () => {
                    _bool = true
                  },
                  'on-blur': () => {
                    if (_bool) {
                      this.editData[params.index].name = _val
                    }
                  }
                }
              })
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            width: 60,
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
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },


				userOpenKey: false,



        formAdd: {
          days: 0,
          name: '',
          categoryid: '',
          time: '',
          userId: '',
          userName: ''
        },
      }
    },
    watch: {
      openKey(val) {
        console.log(11111)
        this.content = ''
        this.navId = null
        this.editData = []
        this.formBatch = {
          startTime: moment().format('YYYY-MM-DD'),
          userName: localStorage.getItem('userAccount'),
          userId: localStorage.getItem('userId')
        }
        this.formAdd = {
          days: 0,
          name: '',
          categoryid: '',
          time: '',
          userId: '',
          userName: ''
        }
        this.modal = true
      },
    },
    computed: {
      searchList() {
        if (this.content === '') {
          return this.navList
        } else {
          return this.navList.filter(item => {
            console.log(item.name.indexOf(this.content))
            if (item.name.indexOf(this.content) >= 0) {
              return item
            }
          })
        }
      },
      typeList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList
      },
    },
    mounted() {
      this.getList()
      this.$store.dispatch('setSelectCallbackCategoryInfoList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/callbackSetList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.navList = res.data.content || []
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      choose(data) {
        if (this.editData.length) {
          this.$Modal.confirm({
            title: this.$t('publicSet.noticeTit'),
            content: `${this.$t('liveDeskCallback.msg1_1')}`,
            onOk: () => {
              this.pushDataIn(data)
            },
            onCancel: () => {

            }
          })
        } else {
          this.pushDataIn(data)
        }
      },
      pushDataIn(data) {
        this.navId = data.id
        let _data = data.detailList.map(item => {
          item.time = moment(this.formBatch.startTime).add(item.days, 'd').format('YYYY-MM-DD')
          item.userId = this.formBatch.userId
          item.userName = this.formBatch.userName
          return item
        })
        _data = JSON.parse(JSON.stringify(_data))
        this.editData.splice(0, this.editData.length, ..._data)
      },
      remove(index) {
        this.editData.splice(index, 1)
      },
      setTime(date) {
        this.formBatch.startTime = date
        const _data = this.editData.map(item => {
          item.time = moment(date).add(item.days, 'd').format('YYYY-MM-DD')
          return item
        })
        this.editData.splice(0, this.editData.length, ..._data)
      },
      showUser(type) {
        this.userKey = type;
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser(data) {
        if (this.userKey === -1) {
          this.formBatch.userId = data.id
          this.formBatch.userName = data.name
          const _data = this.editData.map(item => {
            item.userName = data.name
            item.userId = data.id
            return item
          })
          this.editData.splice(0, this.editData.length, ..._data)
          console.log(this.editData[0])
        } else {
          this.editData[this.userKey].userName = data.name
          this.editData[this.userKey].userId = data.id
          this.editData.splice(this.userKey, 1, this.editData[this.userKey])
          console.log(this.editData[0])
        }
      },
      cancel() {
        this.modal = false
      },
      add() {
        this.formAdd.time = moment(this.formBatch.startTime).add(this.formAdd.days, 'd').format('YYYY-MM-DD')
        this.formAdd.userName = this.formBatch.userName
        this.formAdd.userId = this.formBatch.userId
        const _obj = Object.assign({}, this.formAdd)
        this.editData.push(_obj)
      },
      setDays(val) {
        this.$nextTick(() => {
          this.formAdd.days = parseInt(val)
        })
      },
      save() {
				if (this.editData.length === 0) {
					this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('liveDeskCallback.valid1_1')
					})
					return;
				}
				const list = this.editData.filter(item => item.categoryid === '');
				if(list.length) {
					this.$Notice.error({
						title: this.$t('publicSet.noticeTit'),
						desc: this.$t('liveDeskCallback.valid1_2')
					})
					return;
				}
				this.$emit('saveCallBack', this.formBatch.startTime, this.editData);
				this.modal = false;
      },
    }
  }

</script>

<style lang="less" scoped>
  .call-back-edit-modal {
    .call-back-content {
      position: relative;
    }
    .call-back-nav {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      padding: 15px 15px 0;
      box-shadow: -1px 0 0 0 #e3e8ee inset;
    }
    .call-back-main {
      margin-left: 200px;
    }
    .nav-scroll {
      width: 170px;
      height: ~'calc(100% - 33px)';
      padding-top: 15px;
      overflow: hidden;
      ul {
        width: 190px;
        height: 100%;
        overflow: auto;
      }
      li {
        width: 170px;
        padding: 8px;
        line-height: 17px;
        text-align: center;
        color: #2A2A2A;
        cursor: pointer;
        border-right: 3px;
        &:hover {
          color: #4172F6;
          background: rgba(65, 114, 246, 0.05);
        }
      }
      .active {
        color: #4172F6;
        background: rgba(65, 114, 246, 0.05);
      }
    }
    .modal-footer {
      padding-left: 200px;
    }
    .batch {
      float: left;
    }
    .btn {
      float: right;
    }
    .form-add {
      padding: 15px 0;
    }
    .add {
      float: right;
      margin-right: 18px;
    }
    .clearfix {
      *zoom: 1;
      &:after {
        content: "\200B";
        display: block;
        height: 0;
        clear: both;
      }
    }
  }

</style>

<style type="text/css">
  .call-back-edit-modal .ivu-modal-header-inner {
    text-align: center;
    font-weight: normal;
  }

  .call-back-edit-modal .ivu-modal-body {
    padding: 0;
  }

  .call-back-edit-modal .ivu-table-cell {
    padding: 5px;
  }

  .call-back-edit-modal .ivu-form-item {
    margin-bottom: 0;
  }

</style>
