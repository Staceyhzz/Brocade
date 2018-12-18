/** 
 * 添加咨询页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <Form ref="formAdd" :model="formAdd" :rules="ruleForm" label-position="right" v-if='powerKey'>
      <Form-item prop="content" required>
        <Input v-model="formAdd.content" type="textarea" :autosize="{minRows: 7,maxRows: 10}" :placeholder="$t('liveDeskConsult.valid3')"></Input>
      </Form-item>
      <Row>
        <Col :lg="8">
					<div class="tagbox" v-for='(item, index) in tagBox' @click="tagClose(index)" :key='item.name'>
						<Tag color="blue" type="border">{{item.name}}</Tag>
					</div>&nbsp;
        </Col>
        <Col :lg="16">
        <Row>
          <Col :lg="10">
						<Form-item :label="$t('liveDeskConsult.label1')" prop="symptomId" required :label-width='70'>
							<Select v-model="objName" @on-change='changeObj' :clearable='true' :placeholder="$t('liveDeskConsult.placeholder')" ref='select'>
								<Option v-for="(item, index) in objList" :value="index" :key="item.name">{{ item.name }}</Option>
							</Select>
						</Form-item>
          </Col>
          <Col :lg="9">
						<Form-item :label="$t('liveDeskConsult.label2')" prop="tool" required :label-width='70'>
							<Select v-model="formAdd.tool">
								<Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
							</Select>
						</Form-item>
          </Col>
          <Col :lg="{ span: 4, offset: 1 }">
          	<Button type="primary" long @click='save' :saveLoad='saveLoad'>{{$t('publicSet.add')}}</Button>
          </Col>
        </Row>
        </Col>
      </Row>
    </Form>
    <div v-else>
      {{powerMsg}}
    </div>
    <hr>
    <Table stripe :columns="col" :data="data"></Table>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
		components: {
			resizeTime,
			resizeRemark
    },
    data() {
      const validateTool = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskConsult.valid1')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskConsult.valid2')));
        } else {
          callback();
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskConsult.valid3')));
        } else {
          callback();
        }
      };
      return {
        toolStart: '',
        contentStart: '',
        saveLoad: false,
        powerKey: true,
        powerMsg: '',
        customerName: '',
        objName: '',
        formAdd: {
          customerId: sessionStorage.getItem('liveId'),
          tool: '',
          content: '',
          symptomId: '',
          symptom2Id: '',
          symptom3Id: '',
          symptom4Id: '',
          symptom5Id: '',
        },
        tagBox: [],
        idBox: [],
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('liveDeskConsult.colTit1'),
						width: 80,
						sortable: true,
						key: 'createtime',
						render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('liveDeskConsult.colTit2'),
						width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('liveDeskConsult.colTit3'),
						width: 80,
            key: 'createUserName',
            render: (h, params) => {
              const _display = typeof params.row.createUserDeptName === 'string' ? 'inline-block' : 'none'
              const _display2 = typeof params.row.createUserName === 'string' ? 'inline-block' : 'none'
              return h('p', [
                h('span', {
                  style: {
                    display: _display
                  }
                }, "【" + params.row.createUserDeptName + '】'),
                h('span', {
                  style: {
                    display: _display2
                  }
                }, "【" + params.row.createUserName + '】'),
              ])
            }
          },
          {
            title: this.$t('liveDeskConsult.label2'),
						width: 60,
            key: 'toolName'
          },
          {
            title: this.$t('liveDeskConsult.label1'),
						width: 80,
            key: 'symptomName',
            render: (h, params) => {
							let box = [];
							if(params.row.symptomName) {
								box.push(params.row.symptomName);
							}
							if(params.row.symptom2Name) {
								box.push(params.row.symptom2Name);
							}
							if(params.row.symptom3Name) {
								box.push(params.row.symptom3Name);
							}
							if(params.row.symptom4Name) {
								box.push(params.row.symptom4Name);
							}
							if(params.row.symptom5Name) {
								box.push(params.row.symptom5Name);
							}
							return h('ul', box.map(item => {
								return h('li', item);
							}));
            }
          },
          {
            title: this.$t('liveDeskConsult.colTit4'),
						key: 'content',
						width: 100,
						render: (h, params) => {
							if(params.row.content) {
								return h(resizeRemark, {
									props: {
										remark: params.row.content
									}
								})
							}
						}
          },
        ],
        data: [],
        ruleForm: {
          tool: [{
            validator: validateTool,
            trigger: 'change'
          }],
          symptomId: [{
            validator: validateObj,
            trigger: 'change'
          }],
          content: [{
            validator: validateCon,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      toolList() {
        return this.$store.getters.getSelectToolList
      },
      objList() {
        return this.$store.getters.getSelectSymptomInfoList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      }
		},
		watch: {
      langRouterKey (val) {
        if(val === 'liveDeskConsult') {
          this.getList();
        }
      },
    },
    created() {
			this.getPower();
    },
    mounted() {
      this.getList()
      this.$store.dispatch('setSelectToolList')
      this.$store.dispatch('setSelectSymptomInfoList')
    },
    methods: {
      getPower() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/consultAdd.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.formAdd.tool = res.data.content.LastTool || ''
              _vm.formAdd.content = res.data.content.DefaultContent || ''
              _vm.toolStart = res.data.content.LastTool || ''
              _vm.contentStart = res.data.content.DefaultContent || ''
            } else {
              _vm.powerMsg = res.data.desc
              _vm.powerKey = false
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getConsults.jhtml',
          data: {
            id: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'liveDeskConsult') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['toolName', 'symptomName', 'symptom2Name', 'symptom3Name', 'symptom4Name', 'symptom5Name', 'content']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      changeObj(index) {
        let _vm = this
        if (typeof index !== 'string' && _vm.idBox.length < 5) {
          let _id = _vm.objList[index].id,
            _index = _vm.idBox.findIndex((item) => item == _id)
          console.log(_index)
          if (_index < 0) {
            _vm.idBox.push(_id)
            _vm.tagBox.push(_vm.objList[index])
            _vm.setId()
          }
        }
      },
      tagClose(index) {
        this.idBox.splice(index, 1)
        this.tagBox.splice(index, 1)
        this.$refs['select'].clearSingleSelect()
        this.setId()
      },
      setId() {
				this.formAdd.symptomId = typeof this.idBox[0] === 'number' 
					? this.idBox[0] 
					: null;
				this.formAdd.symptom2Id = typeof this.idBox[1] === 'number' 
					? this.idBox[1] 
					: null;
				this.formAdd.symptom3Id = typeof this.idBox[2] === 'number' 
					? this.idBox[2] 
					: null;
				this.formAdd.symptom4Id = typeof this.idBox[3] === 'number' 
					? this.idBox[3] 
					: null;
				this.formAdd.symptom5Id = typeof this.idBox[4] === 'number' 
				  ? this.idBox[4] 
				  : null;
      },
      save() {
        let _vm = this
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addConsult.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.updateMessage();
									if(_vm.langRouterKey !== 'liveDeskConsult') {
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
									if(_vm.langRouterKey !== 'liveDeskConsult') {
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
      updateMessage() {
        let  _data = this.$store.getters.getLiveDeskMsg;
				_data.symptomName = typeof this.idBox[0] === 'number' 
					? this.tagBox[0].name 
					: null;
				_data.symptom2Name = typeof this.idBox[1] === 'number' 
					? this.tagBox[1].name 
					: null;
				_data.symptom3Name = typeof this.idBox[2] === 'number' 
					? this.tagBox[2].name 
					: null;
				_data.symptom4Name = typeof this.idBox[3] === 'number' 
					? this.tagBox[3].name 
					: null;
				_data.symptom5Name = typeof this.idBox[4] === 'number' 
					? this.tagBox[4].name 
					: null;
        this.$store.dispatch('setLiveConsultChange', _data)
        this.$refs['formAdd'].resetFields()
        this.$refs['select'].clearSingleSelect()
        this.tagBox = []
        this.idBox = []
        this.formAdd.tool = this.toolStart
        this.formAdd.content = this.contentStart
        this.getList()
      },
    }
  }

</script>

<style scoped>
  .living-box .tagbox {
    display: inline-block;
  }

  hr {
    width: 100%;
    height: 1px;
    margin: 15px 0;
    border: none;
    background: rgba(65, 65, 65, 0.1);
  }

</style>
