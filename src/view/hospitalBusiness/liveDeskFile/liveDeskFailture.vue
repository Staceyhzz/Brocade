/** 
 * 流失原因页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <Form ref="formAdd" :model="formAdd" :rules="ruleForm" label-position="right" v-if='powerKey'>
      <Form-item prop="content" required>
        <Input v-model="formAdd.content" type="textarea" :autosize="{minRows: 7,maxRows: 10}" :placeholder="$t('liveDeskFailture.valid2')"></Input>
      </Form-item>
      <Row>
        <Col :md="18" :lg="{ span: 11, offset: 9 }">
					<Form-item :label="$t('liveDeskFailture.label1')" prop="categoryId" required :label-width='90'>
						<Select v-model="formAdd.categoryId">
							<Option v-for="item in typeList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
						</Select>
					</Form-item>
        </Col>
        <Col :md="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 1 }">
        	<Button type="primary" long @click='save' :loading='saveLoad'>{{$t('publicSet.add')}}</Button>
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
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskFailture.valid1')))
        } else {
          callback()
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('liveDeskFailture.valid2')))
        } else {
          callback()
        }
      };
      return {
        saveLoad: false,
        powerKey: true,
        powerMsg: '',
        formAdd: {
          customerId: sessionStorage.getItem('liveId'),
          categoryId: '',
          content: ''
        },
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
              return h('span', '【' + params.row.createUserDeptName + '】 【' + params.row.createUserName + '】')
            }
          },
          {
            title: this.$t('liveDeskFailture.label1'),
						width: 80,
            key: 'categoryName'
          },
          {
            title: this.$t('liveDeskFailture.label2'),
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
          categoryId: [{
            validator: validateType,
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
      typeList() {
        return this.$store.getters.getSelectAllFailtureCategoryList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      }
		},
		watch: {
      langRouterKey (val) {
        if(val === 'liveDeskFailture') {
          this.getList();
        }
      },
    },
    created() {
      this.getPower()
    },
    mounted() {
      this.getList()
      this.$store.dispatch('setSelectAllFailtureCategoryList')
    },
    methods: {
      getPower() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/failtureAdd.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
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
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/failtureList.jhtml',
          data: {
            id: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            let _data = res.data.content.FailtureList || []
            if(_vm.langRouterKey !== 'liveDeskFailture') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['categoryName', 'content']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
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
              url: 'guard-webManager/customerRecord/addFailture.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$refs['formAdd'].resetFields()
                  _vm.getList()
                  if(_vm.langRouterKey !== 'liveDeskFailture') {
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
                  if(_vm.langRouterKey !== 'liveDeskFailture') {
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

</style>
