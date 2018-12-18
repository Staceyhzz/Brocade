/** 
 * 会员类型管理 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.memberCategoryManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='reset(1)'>
          <Icon type="gear-b"></Icon>{{$t('memberCategory.btn1')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal 
				:title="$t('memberCategory.modalTit')" 
				v-model="modalEdit" 
				:closable="false" 
				@on-ok="ok" 
				:loading="loading" 
				class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('labelPublic.mc')" prop="name" required>
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20' v-if='key'></Input>
						<span v-else>{{ formValidate.name }}</span>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark" v-show='key'>
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
					<Form-item :label="$t('memberCategory.colTit3')" prop="amount" required v-show='!key'>
            <cmptInputNumber :max="100000000" :min="0" v-model="formValidate.amount" style='width:300px'></cmptInputNumber>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      const validateMoney = (rule, value, callback) => {
				console.log(value)
        if (value === 0 && !this.key) {
          callback(new Error(this.$t('memberCategory.valid')));
        } else {
          callback();
        }
      };
      return {
        columns: [
					{
            title: this.$t('memberCategory.colTit1'),
            key: "level",
            width: 40
          },
          {
						title: this.$t('labelPublic.mc'),
						width: 60,
            key: "nameLang"
          },
          {
						title: this.$t('memberCategory.colTit2'),
						width: 50,
            render: (h, params) => {
							const url = params.row.imageurl
								? this.baseImgURL + params.row.imageurl
								: require("assets/img/default-avatar.png");
							return h('img', {
								attrs: {
									src: url
								},
								style: {
									display: 'block',
									width: '36px',
									height: '36px'
								}
							});
            }
          },
          {
						title: this.$t('memberCategory.colTit3'),
						width: 80,
            key: "amount"
          },
          {
						title: this.$t('labelPublic.ms'),
						width: 80,
            key: "remarkLang"
          },
          {
						title: this.$t('memberCategory.colTit4'),
						width: 80,
            render: (h, params) => {
              const data = params.row.equityListLang.split('__') || [];
              return h(
                "ul",
                data.map(item => {
                  return h("li", item);
                })
              );
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 250,
            render: (h, params) => {
							const _display = params.row.amount > 0 
								? "inline-block" 
								: "none";
              return h("div", [
                h("Button", {
									props: {
										type: "primary",
										size: "small",
										icon: "edit"
									},
									style: {
										margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
									},
									on: {
										click: () => {
											this.edit(true, params.row);
										}
									}
								}, this.$t('publicSet.edit')),
                h("Button", {
									props: {
										type: "error",
										size: "small",
										icon: "edit"
									},
									style: {
										margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
									},
									on: {
										click: () => {
											this.toView(params.row, 1);
										}
									}
								}, this.$t('memberCategory.btn2')),
                h("Button", {
									props: {
										type: "info",
										size: "small",
										icon: "gear-b"
									},
									style: {
										margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
									},
									on: {
										click: () => {
											this.reset(params.row);
										}
									}
								}, this.$t('memberCategory.btn3')),
                h("Button", {
									props: {
										type: "warning",
										size: "small",
										icon: "edit"
									},
									style: {
										margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
										display: _display
									},
									on: {
										click: () => {
											this.edit(false, params.row);
										}
									}
								}, this.$t('memberCategory.btn4')),
                h("Button", {
									props: {
										type: "primary",
										size: "small",
										icon: "wrench"
									},
									style: {
										margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
									},
									on: {
										click: () => {
											this.toView(params.row, 2);
										}
									}
								}, this.$t('memberCategory.btn5'))
              ]);
            }
          }
        ],
				data: [],
				
        modalEdit: false,
				loading: true,
        key: true,
				
        formValidate: {
          id: "",
          name: "",
					remark: "",
					amount: 0
        },
        ruleForm: {
          name: [
						{ validator: validateName, trigger: 'blur' }
					],
					amount: [
						{ validator: validateMoney, trigger: 'change' }
					]
        }
      };
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      }
    },
    watch: {
      langRouterKey (val) {
        if(val === 'memberCategory') {
          this.getList();
        }
      },
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch("setPageLoading", -1);
        _vm.$http.getPage({
          url: "guard-webManager/memberCategory/list.jhtml",
          success: function (res) {
            const props = ['name', 'remark', 'equityList'];
            const _data = res.data.content.map(item => {
              let obj = {
                ...item
              };
              obj.equityList = obj.equityList.map(item => item.equityName).join('__') || '';
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            });
            if(_vm.langRouterKey !== 'memberCategory') {
              console.log(_data)
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.$store.dispatch("setPageLoading", 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      edit(type, data) {
				this.key = type;
				this.$refs.formValidate.resetFields();
				this.formValidate = {
					id: data.id,
					name: data.name,
					remark: data.remark,
					amount: data.amount || 0
				};
        this.modalEdit = true;
      },
      ok() {
				let _vm = this;
				let _url = _vm.key
					? 'guard-webManager/memberCategory/update.jhtml'
					: 'guard-webManager/memberCategory/updateAmount.jhtml';
        _vm.$refs.formValidate.validate(valid => {
          if (valid) {
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'memberCategory') {
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
        });
      },
      reset(data) {
        let _vm = this,
          _url = "",
          _id = "",
          _text = "";
        if (typeof data === "object") {
          _url = "guard-webManager/memberCategory/updateDefaultImage.jhtml";
          _id = data.id;
          _text = _vm.$t('memberCategory.msg1');
        } else {
          _url = "guard-webManager/memberCategory/reset.jhtml";
          _id = "";
          _text = _vm.$t('memberCategory.msg2');
        }
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _text,
          onOk: () => {
            _vm.$http.post({
              url: _url,
              data: {
                id: _id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'memberCategory') {
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
                console.log(res);
              },
              error: function (res) {
                console.log(res);
              }
            });
          },
          onCancel: () => {}
        });
      },
      toView(data, type) {
        let _url = "",
          _name = "",
          _vip = "";
        if (type === 1) {
          _url = "/updateImage";
          _name = "memberCategory.btn2";
          _vip = data.nameLang;
        } else {
          _url = "/memberCategoryQuitys";
          _name = "memberCategory.btn5";
          _vip = "";
        }
        let breadData = [
					{
            url: "/desktop",
            text: "layoutNav.desk"
          },
          {
            url: "/memberCategory",
            text: "layoutNav.memberCategoryManage"
          },
          {
            url: _url,
            text: _name
          }
        ];
        this.$store.dispatch("setBreadData", breadData);
        this.$router.push({
          path: _url,
          query: {
            id: data.id,
            vip: _vip
          }
        });
      }
    }
  };

</script>
