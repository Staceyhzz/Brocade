/**
* 渠道分销设置
*/

<template>
  <div class="container-box distribution-basic">
    <div class="container-header">
      <h2>渠道分销设置</h2>
      <div class="show-time">
        <span>授权到期：{{time}}</span>
        <ButtonGroup size='small'>
          <Button :type="status === '1' ? 'primary' : 'ghost'" :loading='statusLoad' @click="changeStatus('1')">开启</Button>
          <Button :type="status === '0' ? 'primary' : 'ghost'" :loading='statusLoad' @click="changeStatus('0')">关闭</Button>
        </ButtonGroup>
      </div>
    </div>
    <div class="container-body">
			<h3>自定义虚拟币名称</h3>
      <div class="deal-item">
				<Input v-model.trim="coinName" :placeholder="$t('placeholderPublic.input')" :maxlength='20' style='width: 300px'></Input>
      </div>
      <h3>渠道等级设置</h3>
      <div class="deal-item">
        <p class="info">可以给渠道商设置多个等级，并且各个等级的的名称及充值条件均可设置。升级时充值所获得的虚拟币（并不是比特币）你可以自定虚拟币名称。</p>
        <div class="table-item">
          <Table stripe :columns="levelCol" :data="levelData"></Table>
        </div>
        <Button type="primary" icon="plus-round" @click="addLevel">增加等级</Button>
      </div>
			<h3>渠道返点设置</h3>
      <div class="deal-item">
        <p class="info">渠道商进行升级充值时，其上级负责的渠道商，可根据自己的等级和层级获得不同的返点奖励。目前仅支持根据充值实付金额返现金，暂不支持根据虚拟币返虚拟币。</p>
				<div class="rate-level">
					返点层级：
					<cmptInputNumber :max="9" :min="0" v-model="rateLevel" @on-change='setRateLevel'></cmptInputNumber>
					级
				</div>
        <div class="table-item">
          <Table stripe :columns="rateCol" :data="rateData"></Table>
        </div>
      </div>
      <h3>顾客消费返点设置</h3>
      <div class="deal-item">
        <p class="info">渠道商推荐的客户产生消费时，相应的渠道商及上一层级渠道商均可获取对应层级的返点。如果在上方了多个渠道等级，在此处你需要为每个等级设置层级返点。</p>
        <div class="radio-box">
          <span class="tit">返点金额：</span>
          <RadioGroup v-model="rechargeType" vertical>
            <Radio label="1">
              <span class='radio-tit'>交钱即返</span>
              <span class='radio-msg'>此模式下，顾客缴纳预存款时，还未任何购买项目的消费，渠道商即获得客户缴款金额的返点。客户消费时，渠道商仅可获得客户补缴部分的返点。</span>
            </Radio>
            <Radio label="0">
              <span class='radio-tit'>消费即返</span>
              <span class='radio-msg'>此模式下，顾客预存时，渠道商没有任何返点。必须在顾客消费项目时，渠道商获得客户实缴金额和使用预存金的返点。</span>
            </Radio>
          </RadioGroup>
        </div>
        <div class="charge-box">
          <div>
            项目成本剔除：
            <span @click="showCharge">配置</span>
          </div>
          <p class="info">针对部分项目，配置成本剔除金额，则返点时，将在缴款金额上再扣减成本后计算返点。</p>
        </div>
        <div class="rate-level">
					返点层级：
					<cmptInputNumber :max="9" :min="0" v-model="cusRateLevel" @on-change='setCusRateLevel'></cmptInputNumber>
					级
				</div>
        <div class="table-item">
          <Table stripe :columns="cusRateCol" :data="cusRateData"></Table>
        </div>
      </div>
      <div class="jyw-footer-btn">
        <Button type="primary" @click='save' :loading='saveLoad' v-show="status !== '1'">保存</Button>
        <Button type="ghost" class='cancel' @click='cancel'>取消</Button>
      </div>
    </div>
    <Modal 
			title="设置渠道等级" 
			v-model="modalLevel" 
			:closable="false" 
			@on-ok="okLevel" 
			:loading="loadingLevel"
			class-name="vertical-center-modal">
      <Form ref="formLevel" :model="formLevel" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item label="渠道等级">
          <span>{{formLevel.level}}</span>
        </Form-item>
        <Form-item label="等级名称" prop="name" required>
          <Input v-model.trim="formLevel.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item label="充值金额" prop="money" required>
          <cmptInputNumber :max="1000000" :min="0" v-model="formLevel.money" @on-change='setLevelMoney'></cmptInputNumber>
        </Form-item>
        <Form-item label="虚拟币数量" prop="coin" required>
          <cmptInputNumber :max="1000000" :min="0" v-model="formLevel.coin"  @on-change='setLevelCoin'></cmptInputNumber>
        </Form-item>
      </Form>
    </Modal>
    <Modal 
			title="项目成本设置" 
			v-model="modalCharge" 
      width='700'
			class-name="vertical-center-modal">
      <Button type="primary" icon="plus-round" @click="addCharge" style='marginBottom: 20px'>增加项目</Button>
      <Form :label-width="50" inline ref='formSearch' :model='formSearch' @submit.native.prevent>
        <Form-item :label="$t('labelPublic.mc')" prop='name'>
          <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" :maxlength='50' @on-enter='getChargeList'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getChargeList"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="chargeCol" :data="chargeSearchList" :height='500'></Table>
    </Modal>
    <cmptChargeChoose :placeHolder="$t('placeholderPublic.sfxm')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeChoose},
    data() {
			const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入分销等级名称'));
        } else {
          callback();
        }
      };
      return {
        status: '1',
        time: '',
        statusLoad: false,

				saveLoad: false,

				coinName: '',

        levelCol: [{
            title: '等级',
            width: 60,
            key: 'level'
          },
          {
            title: '等级名称',
            width: 80,
            key: 'name'
          },
          {
            title: '升级条件',
            width: 100,
            render: (h, params) => {
              return h('span', `充${params.row.money}得${params.row.coin}`)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
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
                      this.editLevel(params.row, params.index);
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: params.index + 1 === this.levelData.length ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.delLevel(params.index);
                    }
                  }
                }, this.$t('publicSet.del'))
              ]);
            }
          }
        ],
        levelData: [],
				
				formLevel: {},
				modalLevel: false,
				loadingLevel: true,
				levelType: true,
				levelIndex: 0,

				ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
				},
				
				rateLevel: 0,
				rateCol: [
					{
						title: '层级',
            width: 60,
            render: (h, params) => {
							return h('span', params.index + 1);
						}
					}
				],
        rateData: [],
        rateList: [],

        rechargeType: '1',
        chargeCol: [
          {
            title: '项目名称',
            key: 'name',
            width: 150,
          },
          {
            title: '项目价格',
            key: 'price',
            width: 80,
          },
          {
            title: '项目成本',
            width: 100,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.money,
                  max: params.row.price,
                },
                on: {
                  'on-change': (val) => {
                    params.row.money = parseFloat((val).toFixed(2));
                    this.chargeSearchList[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.chargeSearchList.splice(params.index, 1, this.chargeSearchList[params.index]);
                    const index = this.chargeData.findIndex(item => item.id === params.row.id);
                    this.chargeData[index].money = params.row.money;
                  }
                }
              });
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
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
                      this.removeCharge(params.row.id);
                    }
                  }
                }, this.$t('publicSet.del'))
              ]);
            }
          }
        ],
        chargeData: [],
        chargeSearchList: [],
        chargeOpenKey: false,
        modalCharge: false,
        formSearch: {
          name: ''
        },

        cusRateLevel: 0,
        cusRateCol: [
					{
						title: '层级',
            width: 60,
            render: (h, params) => {
							return h('span', params.index + 1);
						}
					}
				],
        cusRateData: [],
        cusRateList: [],
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/distributionSet/list.jhtml',
          success: function (res) {
            //状态
            _vm.time = res.data.content.effectiveDate || '';
            _vm.status = res.data.content.distributionOpen || '1';
            //虚拟币名称
            _vm.coinName = res.data.content.virtualCurrencyBalance || '虚拟币';
            //渠道等级
            _vm.levelData = res.data.content.distributionNameList.map(item => {
              return {
                id: item.id,
                name: item.name,
                level: item.level,
                money: item.recharge || 0,
                coin: item.getAmount || 0
              };
            })|| [];
            //渠道返点
            if(res.data.content.distributionLevelList.length) {
              _vm.rateLevel = res.data.content.distributionLevelList[0].rateList.length || 0;
              _vm.rateData = [...Array(_vm.rateLevel)].fill({});
            }
            _vm.rateList = res.data.content.distributionLevelList.map(item => {
              return {
                id: item.id,
                rate: item.rateList || []
              };
            }) || [];
            _vm.initRateCol();
            //顾客返点金额
            _vm.rechargeType = res.data.content.patternSet || '1';
            //项目
            _vm.chargeData = res.data.content.projectCostList.map(item => {
              return {
                id: item.chargeID,
                name: item.chargeName,
                price: item.price || 0,
                money: item.costPrice || 0
              };
            }) || [];
            //消费返点
            if(res.data.content.customerrebatelList.length) {
              _vm.cusRateLevel = res.data.content.customerrebatelList[0].rateList.length || 0;
              _vm.cusRateData = [...Array(_vm.cusRateLevel)].fill({});
            }
            _vm.cusRateList = res.data.content.customerrebatelList.map(item => {
              return {
                id: item.id,
                rate: item.rateList || []
              };
            }) || [];
            _vm.initCusRateCol();
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //修改状态
      changeStatus(type) {
        const text = type === '1' ? '确定开启渠道分销功能，开启后无法再次修改保存设置，需重新关闭后编辑' : '确定关闭渠道分销功能，关闭后可对设置进行编辑，请设置完成后重新开启';
        this.$Modal.confirm({
          title: this.$t('publicSet.noticeTit'),
          content: `<p>${text}</p>`,
          onOk: () => {
            this.saveStatus(type);
          }
        });
      },
      saveStatus(type) {
        let _vm = this;
        _vm.statusLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/distributionSet/switching.jhtml',
          data: {
            status: type,
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '操作成功！'
              });
              _vm.status = type;
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
            _vm.statusLoad = false;
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      //渠道等级设置
      addLevel() {
				this.$refs.formLevel.resetFields();
				this.formLevel = {
          id: moment().format('x'),
					level: this.levelData.length + 1,
					name: '',
					money: 0,
					coin: 0
				};
				this.modalLevel = true;
				this.levelType = true;
      },
      editLevel(data, index) {
				this.$refs.formLevel.resetFields();
				this.formLevel = {
          id: data.id,
					level: data.level,
					name: data.name,
					money: data.money,
					coin: data.coin,
				};
				this.levelIndex = index;
				this.levelType = false;
				this.modalLevel = true;
			},
			okLevel() {
				this.$refs.formLevel.validate((valid) => {
          if (valid) {
						if(this.levelType) {
							const data = Object.assign({}, this.formLevel);
              this.levelData.push(data);
              this.rateList.push({
                id: data.id,
                rate: [...Array(this.rateLevel)].fill(0)
              });
              this.cusRateList.push({
                id: data.id,
                rate: [...Array(this.rateLevel)].fill(0)
              });
						} else {
							this.levelData.splice(this.levelIndex, 1, {
                id: this.formLevel.id,
								level: this.formLevel.level,
								name: this.formLevel.name,
								money: this.formLevel.money,
								coin: this.formLevel.coin,
							});
						}
            this.modalLevel = false;
            this.initRateCol();
            this.initCusRateCol();
					} else {
						this.loadingLevel = false;
						this.$nextTick(() => {
							this.loadingLevel = true;
						})
					}
				});
			},
      delLevel(index) {
        this.levelData.splice(index, 1);
        this.rateList.splice(index, 1);
        this.cusRateList.splice(index, 1);
        this.initRateCol();
        this.initCusRateCol();
			},
			setLevelMoney() {
				this.$nextTick(() => {
					this.formLevel.money = parseFloat((this.formLevel.money).toFixed(2));
				});
			},
			setLevelCoin() {
				this.$nextTick(() => {
					this.formLevel.coin = parseFloat((this.formLevel.coin).toFixed(2));
				});
			},
			//渠道返点设置
			setRateLevel() {
				this.$nextTick(() => {
          this.rateLevel = parseInt((this.rateLevel));
          this.rateData = [...Array(this.rateLevel)].fill({});
          this.rateList.map(item => {
            if(item.rate.length > this.rateLevel) {
              //当提点层级减小时
              item.rate.splice(this.rateLevel, item.rate.length - this.rateLevel);
            } else if(item.rate.length < this.rateLevel) {
              //当提点层级增加时
              const num = this.rateLevel - item.rate.length;
              for(let i = 0; i < num; i++) {
                item.rate.push(0);
              }
            }
          });
				});
      },
      //初始化返点表格
      initRateCol() {
        let colBox = [
          {
            title: '层级',
            width: 60,
            render: (h, params) => {
							return h('span', params.index + 1);
						}
          }
        ];
        this.levelData.map(item => {
          const col = {
            title: item.name,
            width: 110,
            render: (h, params) => {
              const index = this.rateList.findIndex(i => i.id === item.id);
              return h('div', [
                h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    value: this.rateList[index].rate[params.index],
                    max: 100,
                  },
                  on: {
                    'on-change': (val) => {
                      this.rateList[index].rate[params.index] = parseFloat((val).toFixed(2));
                    },
                    'on-blur': () => {
                      this.rateData.splice(params.index, 1, this.rateData[params.index]);
                    }
                  }
                }),
                h('span', '%')
              ]);
            }
          };
          colBox.push(col);
        });
        this.rateCol = [...colBox];
      },
      //配置项目
      showCharge() {
        this.handleReset();
        this.modalCharge = true;
      },
      getChargeList() {
        if(this.formSearch.name) {
          this.chargeSearchList = this.chargeData.filter(item => {
            if(item.name.toLowerCase().includes(this.formSearch.name.toLowerCase())) {
              return item;
            }
          });
        } else {
          this.chargeSearchList = this.chargeData;
        }
      },
      handleReset() {
        this.$refs.formSearch.resetFields();
        this.getChargeList();
      },
      addCharge() {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseCharge (data) {
        const index = this.chargeData.findIndex(item => item.id === data.id);
        if(index < 0) {
          this.chargeData.unshift({
            id: data.id,
            name: data.name,
            price: data.price ? data.price : 0,
            money: 0
          });
          this.handleReset();
        }
      },
      removeCharge(id) {
        const index = this.chargeData.findIndex(item => item.id === id);
        this.chargeData.splice(index, 1);
        this.getChargeList();
      },
      //顾客返点设置
			setCusRateLevel() {
				this.$nextTick(() => {
          this.cusRateLevel = parseInt((this.cusRateLevel));
          this.cusRateData = [...Array(this.cusRateLevel)].fill({});
          this.cusRateList.map(item => {
            if(item.rate.length > this.cusRateLevel) {
              //当提点层级减小时
              item.rate.splice(this.cusRateLevel, item.rate.length - this.cusRateLevel);
            } else if(item.rate.length < this.cusRateLevel) {
              //当提点层级增加时
              const num = this.cusRateLevel - item.rate.length;
              for(let i = 0; i < num; i++) {
                item.rate.push(0);
              }
            }
          });
				});
      },
      //初始化顾客返点表格
      initCusRateCol() {
        let colBox = [
          {
            title: '层级',
            width: 60,
            render: (h, params) => {
							return h('span', params.index + 1);
						}
          }
        ];
        this.levelData.map(item => {
          const col = {
            title: item.name,
            width: 110,
            render: (h, params) => {
              const index = this.cusRateList.findIndex(i => i.id === item.id);
              return h('div', [
                h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    value: this.cusRateList[index].rate[params.index],
                    max: 100,
                  },
                  on: {
                    'on-change': (val) => {
                      this.cusRateList[index].rate[params.index] = parseFloat((val).toFixed(2));
                    },
                    'on-blur': () => {
                      this.cusRateData.splice(params.index, 1, this.cusRateData[params.index]);
                    }
                  }
                }),
                h('span', '%')
              ]);
            }
          };
          colBox.push(col);
        });
        this.cusRateCol = [...colBox];
      },
      cancel() {
        this.$router.go(-1);
      },
      save() {
        let _vm = this;
        if(!_vm.coinName) {
          _vm.$Notice.error({
            title: _vm.$t('publicSet.noticeTit'),
            desc: '请填写完虚拟币名称！'
          });
          return;
        }
        _vm.saveLoad = true;
        const nameList = _vm.levelData.map(item => {
          return {
            name: item.name,
            level: item.level,
            recharge: item.money,
            getAmount: item.coin
          };
        });
        const rateList = _vm.rateList.map(item => {
          return {
            rateList: item.rate
          };
        });
        const chargeList = _vm.chargeData.map(item => {
          return {
            chargeID: item.id,
            costPrice: item.money
          };
        });
        const cusList = _vm.cusRateList.map(item => {
          return {
            rateList: item.rate
          };
        });
        _vm.$http.post({
          url: 'guard-webManager/distributionSet/update.jhtml',
          data: {
            distributionOpen: _vm.status,
            virtualCurrencyBalance: _vm.coinName,
            distributionNameStr: JSON.stringify(nameList),
            distributionLevelStr: JSON.stringify(rateList),
            patternSet: _vm.rechargeType,
            projectCostStr: JSON.stringify(chargeList),
            customerrebatelStr: JSON.stringify(cusList),
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '操作成功！'
              });
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
            _vm.saveLoad = false;
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
    }
  }

</script>

<style scoped lang='less'>
  .distribution-basic {
    .show-time {
      float: right;
      span {
        margin-right: 15px;
      }
    }
    h3 {
      padding: 20px 0;
      font-size: 16px;
      font-weight: normal;
      line-height: 22px;
      color: #181818;
    }

    .deal-item {
      padding: 0 40px;
      margin-bottom: 30px;
    }
		.rate-level {
			margin-bottom: 10px;
		}
    .radio-box {
      position: relative;
      padding-left: 100px;
      .tit {
        position: absolute;
        left: 0;
        top: 0;
        height: 30px;
        line-height: 30px;
      }
      label {
        height: auto;
        word-wrap: break-word;
        white-space: normal;
      }
    }
    .radio-tit {
      display: inline-block;
      width: 100px;
      font-size: 12px;
    }
    .radio-msg {
      display: inline-block;
      padding-left: 30px;
      font-size: 12px;
      color: #797979;
    }
    .tit {
      font-size: 12px;
      line-height: 20px;
      color: #181818;
    }
    .charge-box {
      position: relative;
      padding-left: 150px;
      margin: 10px 0;
      div {
        position: absolute;
        left: 0;
        top: 0;
        span {
          padding: 0 5px;
          color: #4172F6;
          cursor: pointer;
        }
      }
    }
    .info {
      margin: 2px 0 10px;
      font-size: 12px;
      line-height: 17px;
      color: #797979;
    }

    .table-item {
      padding: 10px;
      border: 1px solid #DEDEDE;
      margin-bottom: 20px;
      border-radius: 4px;

      p {
        overflow: hidden;
        padding-right: 10px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 20px;

        button {
          float: right;
        }
      }
    }

    .charge-page {
      margin-top: 15px;
      text-align: right;
    }
  }

</style>
