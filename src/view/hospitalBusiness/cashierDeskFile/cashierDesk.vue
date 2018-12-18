/**
* 收银台
*/
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>{{$t('layoutNav.cashierDesk')}}</h2>
			<ul class="header-btn-group">
       <li class="header-item" @click='toView(1)'><Icon type="clipboard"></Icon>{{$t('cashierDesk.btn1')}}</li>
       <li class="header-item" @click='toView(2)'><Icon type="clipboard"></Icon>{{$t('cashierDesk.btn2')}}</li>
       <li class="header-item" @click='toView(3)'><Icon type="cash"></Icon>{{$t('cashierDesk.btn3')}}</li>
       <li class="header-item" @click='toView(4)'><Icon type="calculator"></Icon>{{$t('cashierDesk.btn4')}}</li>
     </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('cashierDesk.menu1')">
          <Table stripe :columns="colWait" :data="dataWait"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('cashierDesk.menu2')">
          <Table stripe :columns="colDone" :data="dataDone"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('cashierDesk.menu3')">
          <Table stripe :columns="colBill" :data="dataBill"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('cashierDesk.menu4')">
          <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
            <Form-item prop='query'>
              <Input v-model="formSearch.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch(formSearch)" :maxlength='15'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch(formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Alert v-if='searchKey'>
            {{$t('onlineDesk.searchTit')}}
            <div slot="desc" v-if='dataCus.length === 0'>
              <p>{{$t('onlineDesk.searchMsgNo')}}</p>
            </div>
            <div slot="desc" v-else>
              <p>{{$t('onlineDesk.searchMsg',[dataCus.length])}}</p>
            </div>
          </Alert>
          <Table stripe :columns="colCus" :data="dataCus"></Table>
        </Tab-pane>
      </Tabs>			
    </div>
    <Modal
      :title="$t('cashierDesk.modalTit2')"
      v-model="modalEdit"
      :closable="false"
      :loading="loading"
      @on-ok="okEdit"
      class-name="vertical-center-modal">
      <Form ref="formEdit" :model="formEdit" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('cashierDesk.colTit3')" v-show="formEdit.ordertype !== 7">
          <span>{{formEdit.cusName}} ({{formEdit.cusId}})</span>
        </Form-item>
        <Form-item label="渠道商" v-show="formEdit.ordertype === 7">
          <span>{{formEdit.distributionUserName}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label14')">
          <span>{{formEdit.cashTotal}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label15')">
          <span>{{formEdit.cardTotal}}</span>
        </Form-item>
        <Form-item :label="coinName">
          <span>{{formEdit.virtualCurrencyBalance}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label16')">
          <span>{{formEdit.total}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label4')" prop="cash" required>
          <cmptInputNumber v-model="formEdit.cash"  style="width:300px" @on-change='setCard'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label17', [1])" prop="cardCategory1Id" required>
          <Select v-model="formEdit.cardCategory1Id" style="width:150px" clearable>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber v-model="formEdit.card1" style="width:150px" @on-change='setCard1'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label17', [2])" prop="cardCategory2Id" required>
          <Select v-model="formEdit.cardCategory2Id" style="width:150px" clearable>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber v-model="formEdit.card2" @on-change='setCard2' style="width:150px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label17', [3])" prop="cardCategory3Id" required>
          <Select v-model="formEdit.cardCategory3Id" style="width:150px" clearable>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber v-model="formEdit.card3" @on-change='setCard3' style="width:150px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label17', [4])" prop="cardCategory4Id" required>
          <Select v-model="formEdit.cardCategory4Id" style="width:150px" clearable>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber v-model="formEdit.card4"  @on-change='setCard4' style="width:150px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label17', [5])" prop="cardCategory5Id" required>
          <Select v-model="formEdit.cardCategory5Id" style="width:150px" clearable>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber v-model="formEdit.card5" @on-change='setCard5' style="width:150px"></cmptInputNumber>
        </Form-item>
      </Form>
    </Modal>
    <Modal
      :title="$t('cashierDesk.modalTit1')"
      width='800'
      v-model="modalOrderCancel"
      :closable="false"
      :loading="loading"
      @on-ok="okOrderCancel"
      class-name="vertical-center-modal">
      <Form ref="formOrderCancel" :model="formOrderCancel" :label-width="100" label-position="right">
        <Form-item :label="$t('cashierDesk.colTit3')">
          <span>{{formOrderCancel.customerName}} ({{formOrderCancel.customerId}})</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit5')">
          <span>{{formOrderCancel.createUserName}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit6')">
          <span>{{formOrderCancel.createTime}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit2')">
          <span>{{formOrderCancel.orderTypeText}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit4')">
          <span>{{formOrderCancel.amount}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')">
          <span>{{formOrderCancel.remark}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit12')" v-show='formOrderCancel.orderType === 3'>
          <Table stripe :columns="colPreDetail" :data="formOrderCancel.detailList"></Table>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit12')" v-show='formOrderCancel.orderType === 1'>
          <Table stripe :columns="colOrderDetail" :data="formOrderCancel.detailList"></Table>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
    components: {resizeTime, resizeCus},
    data () {
      const validateMoney = (rule, value, callback) => {
        const cardList = [this.formEdit.cardCategory1Id, this.formEdit.cardCategory2Id, this.formEdit.cardCategory3Id, this.formEdit.cardCategory4Id, this.formEdit.cardCategory5Id];
        const amountList = [this.formEdit.card1, this.formEdit.card2, this.formEdit.card3, this.formEdit.card4, this.formEdit.card5];
        let sum = parseFloat(this.formEdit.cash);
        cardList.map((item, index) => {
          if(item) {
            sum += amountList[index];
          }
        });
        console.log(sum.toFixed(2))
        console.log(this.formEdit.total)
        if(sum.toFixed(2) !== this.formEdit.total) {
          callback(new Error(this.$t('cashierDesk.valid1', [this.formEdit.total])));
        }
        callback();
      };
      const validateChange= (rule, value, callback) => {
        const id = rule.field.split('Id')[0].split('cardCategory')[1];
        if(this.formEdit['card' + id] !== 0 && value === '') {
          callback(new Error(this.$t('cashierDesk.valid2')));
        }
        console.log(value)
        if(value === '') {
          callback();
        }
        const cardList = [this.formEdit.cardCategory1Id, this.formEdit.cardCategory2Id, this.formEdit.cardCategory3Id, this.formEdit.cardCategory4Id, this.formEdit.cardCategory5Id];
        const result = cardList.filter(item => item === value);
        if(result.length > 1) {
          callback(new Error(this.$t('cashierDesk.valid3')));
        };
        callback();
      };
      return {
        colWait: [
          { 
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 50
          },
          {
            title: this.$t('cashierDesk.colTit1'),
            width: 60,
            render: (h, params) => {
              const color = params.row.audit === 1 
                ? '#FF6F76' 
                : '#4172F6';
              return h('span', {
                style: {
                  color: color
                }
              }, params.row.auditStatus);
            }
          },
          {
            title: this.$t('cashierDesk.colTit2'),
            key: 'type',
            width: 60
          },
          {
            title: this.$t('cashierDesk.colTit3'),
            width: 60,
            render: (h, params) => {
              if(params.row.orderType !== 7) {
                return h(resizeCus, {
                  props: {
                    name: params.row.customerName,
                    id: params.row.customerID
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(params.row.customerID, params.row.customerName);
                    }
                  }
                });
              } else {
                return h('span', `渠道商 (${params.row.customerName})`);
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit4'),
            align: 'right',
            width: 60,
            key: 'amount',
            render: (h, params) => {
              if(params.row.amount || params.row.amount === 0) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit5'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('cashierDesk.colTit6'),
            width: 80,
            key: 'createTime',
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 70,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'cash'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toOrder(params.row.orderType, params.row.orderID)
                    }
                  }
                }, this.$t('cashierDesk.btn5')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline',
                    loading: this.loadOrderCancel,
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.cancelOrder(params.row)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        dataWait: [],
        loading: true,
        modalOrderCancel: false,
        loadOrderCancel: false,
        formOrderCancel: {},
        colOrderDetail: [
          {
            title: this.$t('cashierDesk.colTit7'),
            width: 90,
            key: 'chargeName'
          },
          {
            title: this.$t('cashierDesk.colTit9'),
            width: 70,
            key: 'setName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'chargeSize'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 50,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('cashierDesk.colTit8'),
            width: 50,
            key: 'num'
          },
          {
            title: this.$t('cashierDesk.colTit10'),
            align: 'right',
            width: 60,
            key: 'price',
            render: (h, params) => {
              if(params.row.price || params.row.price === 0) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit11'),
            align: 'right',
            width: 60,
            key: 'finalPrice',
            render: (h, params) => {
              if(params.row.finalPrice || params.row.finalPrice === 0) {
                return h('span', params.row.finalPrice.toFixed(2));
              }
            }
          }
        ],
        colPreDetail: [
          {
            title: this.$t('cashierDesk.colTit7'),
            width: 100,
            key: 'chargeName'
          },
          {
            title: this.$t('cashierDesk.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('labelPublic.price'),
            align: 'right',
            width: 60,
            key: 'price',
            render: (h, params) => {
              if(params.row.price || params.row.price === 0) {
                return h('span', params.row.price.toFixed(2));
              }
            }

          },
          {
            title: this.$t('cashierDesk.colTit4'),
            align: 'right',
            width: 60,
            key: 'total',
            render: (h, params) => {
              if(params.row.total || params.row.total === 0) {
                return h('span', params.row.total.toFixed(2));
              }
            }
          }
        ],

        coinName: '',
        colDone: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('cashierDesk.colTit2'),
            width: 60,
            render: (h, params) => {
              const index = this.orderTypeList.findIndex(item => item.id === params.row.ordertype);
              if(index >= 0) {
                return h('span', this.$t(this.orderTypeList[index].lang));
              }
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 50,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('cashierDesk.colTit19') 
                : this.$t('cashierDesk.colTit20');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('cashierDesk.colTit13'),
            width: 60,
            key: 'no',
          },
          {
            title: this.$t('cashierDesk.colTit3'),
            width: 60,
            render: (h, params) => {
              if(params.row.ordertype !== 7) {
                return h(resizeCus, {
                  props: {
                    name: params.row.customerName,
                    id: params.row.customerid
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(params.row.customerid, params.row.customerName);
                    }
                  }
                });
              } else {
                return h('span', `渠道商 (${params.row.distributionUserName})`);
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit14'),
            width: 80,
            key: 'createtime',
            render: (h, params) => {
              if(params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit15'),
            width: 50,
            key: 'createUserName'
          },
          {
            title: this.$t('cashierDesk.label3'),
            align: 'right',
            width: 60,
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit16'),
            align: 'right',
            width: 60,
            key: 'all',
            render: (h, params) => {
              if(Number.isFinite(params.row.all)) {
                return h('span', params.row.all.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.label4'),
            align: 'right',
            width: 60,
            key: 'cash',
            render: (h, params) => {
              if(Number.isFinite(params.row.cash)) {
                return h('span', params.row.cash.toFixed(2));
              }
            }
          },
          {
            title: '虚拟币',
            align: 'right',
            width: 60,
            key: 'virtualCurrencyBalance',
            render: (h, params) => {
              if(Number.isFinite(params.row.virtualCurrencyBalance)) {
                return h('span', params.row.virtualCurrencyBalance.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.label5'),
            align: 'right',
            width: 60,
            key: 'card',
            render: (h, params) => {
              if(Number.isFinite(params.row.card)) {
                return h('span', params.row.card.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit17'),
            key: 'cardCategory1Name',
            width: 50,
            render: (h, params) => {
              const _text = []
              if(params.row.cardCategory1Name) {
                _text.push(params.row.cardCategory1Name)
              }
              if(params.row.cardCategory2Name) {
                _text.push(params.row.cardCategory2Name)
              }
              if(params.row.cardCategory3Name) {
                _text.push(params.row.cardCategory3Name)
              }
              if(params.row.cardCategory4Name) {
                _text.push(params.row.cardCategory4Name)
              }
              if(params.row.cardCategory5Name) {
                _text.push(params.row.cardCategory5Name)
              }
              return h('ul', _text.map(item => {
                return h('li', item)
              }))
            }
          },
          {
            title: this.$t('cashierDesk.label9'),
            align: 'right',
            width: 60,
            key: 'deposit',
            render: (h, params) => {
              if(Number.isFinite(params.row.deposit)) {
                return h('span', params.row.deposit.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.label10'),
            align: 'right',
            width: 60,
            key: 'coupon',
            render: (h, params) => {
              if(Number.isFinite(params.row.coupon)) {
                return h('span', params.row.coupon.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit18'),
            align: 'right',
            width: 60,
            key: 'debt',
            render: (h, params) => {
              if(Number.isFinite(params.row.debt)) {
                return h('span', params.row.debt.toFixed(2));
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 60,
            key: 'remark'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              const _display = params.row.status === 1 
                ? 'none' 
                : 'inline-block';
              const display1 = params.row.ordertype === 7
                ? 'none'
                : 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'printer'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPrint(params.row)
                    }
                  }
                }, this.$t('printView.btn')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.editOrder(params.row)
                    }
                  }
                }, this.$t('cashierDesk.btn7')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'card'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle',
                    display: display1
                  },
                  on: {
                    click: () => {
                      this.toBill(params.row.customerid)
                    }
                  }
                }, this.$t('cashierDesk.btn8'))
              ])
            }
          }
        ],
        dataDone: [],
        cardList: [],
        modalEdit: false,
        formEdit: {},

        colBill: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 50
          },
          {
            title: this.$t('cashierDesk.colTit21'),
            key: 'createtime',
            width: 80,
            render: (h, params) => {
              if(params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit3'),
            width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerid
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerid, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('billAdd.label'),
            width: 60,
            key: 'code',
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('cashierDesk.colTit4'),
            align: 'right',
            width: 60,
            key: 'amount',
            render: (h, params) => {
              if(Number,isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit22'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 60,
            key: 'remark'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
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
                      this.removeBill(params.row)
                    }
                  }
                }, this.$t('publicSet.del'))
                ])
            }
          }
        ],
        dataBill: [],

        formSearch: {
          query: ''
        },
        searchKey: false,
        colCus: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('cashierDesk.colTit3'),
            width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.sjh'),
            width: 60,
            key: 'mobile'
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('labelPublic.hy'),
            width: 60,
            key: 'memberCategoryName'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toBill(params.row.id)
                    }
                  }
                }, this.$t('cashierDesk.btn8')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'cash'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toPay(params.row.id)
                    }
                  }
                }, this.$t('cashierDesk.btn3'))
              ])
            }
          }
        ],
        dataCus: [],
        ruleForm: {
          cash: [
            { validator: validateMoney, trigger: 'change' }
          ],
          cardCategory1Id: [
            { validator: validateChange, trigger: 'change' }
          ],
          cardCategory2Id: [
            { validator: validateChange, trigger: 'change' }
          ],
          cardCategory3Id: [
            { validator: validateChange, trigger: 'change' }
          ],
          cardCategory4Id: [
            { validator: validateChange, trigger: 'change' }
          ],
          cardCategory5Id: [
            { validator: validateChange, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      orderTypeList () {
        return this.$store.getters.getOrderTypeList;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'cashierDesk') {
          this.getList();
          this.getSearch(this.formSearch);
        }
      },
    },
    created () {
      this.getList();
    },
    mounted () {
      this.getCard();
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/list.jhtml',
          success: function(res){
            console.log(res)
            _vm.coinName = res.data.content.virtualCurrencyName || '';
            _vm.colDone.find(item => item.key === 'virtualCurrencyBalance').title = _vm.coinName ? `${_vm.coinName }` : '虚拟币';
            const _dataWait = res.data.content.CashierUndo || [];
            const _colWait = _vm.tableCount(_dataWait, ['amount']);
            _colWait.map(item => {
              const index = _vm.colWait.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.colWait[index].width = item.width;
              }
            });

            const _dataDone = res.data.content.CashierList.map(item => {
              item.all = parseFloat((item.card + item.cash + item.virtualCurrencyBalance).toFixed(2));
              return item;
            }) || [];
            const _colDone = _vm.tableCount(_dataDone, ['amount', 'all', 'cash', 'virtualCurrencyBalance', 'card', 'deposit', 'coupon', 'dept']);
            _colDone.map(item => {
              const index = _vm.colDone.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.colDone[index].width = item.width;
              }
            });

            const _dataBill = res.data.content.BillList || [];
            const _colBill = _vm.tableCount(_dataBill, ['amount']);
            _colBill.map(item => {
              const index = _vm.colBill.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.colBill[index].width = item.width;
              }
            });

            if(_vm.langRouterKey !== 'cashierDesk') {
              _vm.dataWait = _dataWait;
              _vm.dataDone = _dataDone;
              _vm.dataBill = _dataBill;
            } else {
              _vm.requestList(_dataWait, ['auditStatus', 'type']).then(res => _vm.dataWait = res);
              _vm.requestList(_dataDone, ['cardCategory1Name', 'cardCategory2Name', 'cardCategory3Name', 'cardCategory4Name', 'cardCategory5Name', 'remark']).then(res => _vm.dataDone = res);
              _vm.requestList(_dataBill, ['code', 'name', 'remark']).then(res => _vm.dataBill = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取银行卡
      getCard () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/cardCategoryInfo.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.cardList = res.data.content || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },

      //取消订单收银
      cancelOrder (data) {
        let _vm = this;
        _vm.loadOrderCancel = true;
        _vm.$http.get({
          url: 'guard-webManager/cashierDesk/cancel.jhtml',
          data: {
            id: data.orderID,
            orderType: data.orderType
          },
          success: function(res){
            if(res.data.code === 0 ){
              const obj = res.data.content || {};
              const list = obj.Order || {};
              let _formOrderCancel = {
                customerName: obj.CustomerName || '',
                customerId: obj.CustomerID || '',
                createUserName: obj.CreateUserName || '',
                createTime: obj.CreateTime || '',
                orderType: data.orderType,
                orderId: data.orderID,
                orderTypeText: obj.Type || '',
                amount: obj.Amount
                  ? obj.Amount.toFixed(2)
                  : '0.00',
                remark: obj.Remark || '',
                detailList: list.detailList || []
              };
              if(data.orderType === 1) {
                const _col = _vm.tableCount(_formOrderCancel.detailList, ['price', 'finalPrice']);
                _col.map(item => {
                  const index = _vm.colOrderDetail.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.colOrderDetail[index].width = item.width;
                  }
                });
              }
              if(data.orderType === 3) {
                const _col = _vm.tableCount(_formOrderCancel.detailList, ['price', 'total']);
                _col.map(item => {
                  const index = _vm.colPreDetail.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.colPreDetail[index].width = item.width;
                  }
                });
              }
              if(_vm.langRouterKey !== 'cashierDesk') {
                _vm.formOrderCancel = {..._formOrderCancel};
              } else {
                _vm.requestList([_formOrderCancel], ['remark', 'orderTypeText']).then(res => {
                  _vm.requestList(res[0].detailList, ['chargeName', 'setName', 'chargeCategoryName', 'chargeUnitName', 'chargeSize']).then(res1 => {
                    res[0].detailList = res1;
                    _vm.formOrderCancel = {...res[0]};
                  });
                });
              }
              _vm.modalOrderCancel = true;
              _vm.loadOrderCancel = false;
            } else {
              if(_vm.langRouterKey !== 'cashierDesk') {
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
              _vm.loadOrderCancel = false
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      okOrderCancel () {
        let _vm = this;
        _vm.$http.post({
          url: 'guard-webManager/cashierDesk/cancelOrder.jhtml',
          data: {
            id: _vm.formOrderCancel.orderId,
            orderType: _vm.formOrderCancel.orderType
          },
          success: function(res){
            if(res.data.code === 0 ){
              _vm.getList();
              _vm.modalOrderCancel = false;
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              if(_vm.langRouterKey !== 'cashierDesk') {
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
          error: function(res){
            console.log(res);
          }
        });
      },

      //跳转收银
      toOrder (type, id) {
        const lang = this.orderTypeList.find(item => item.id === type).lang;
        const url = this.orderTypeList.find(item => item.id === type).url;
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: url,
            text: lang
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: url,
          query: {
            id: id
          }
        });
      },

      //打印
      toPrint (data) {
        let _type = ''
        if(data.ordertype === 1) {
          _type = 'order'
        } else if(data.ordertype === 3) {
          _type = 'depositOrder'
        } else if(data.ordertype === 4) {
          _type = 'backOrder'
        } else if(data.ordertype === 5) {
          _type = 'depositRebateOrder'
        } else if(data.ordertype === 10) {
          _type = 'repaymentOrder'
        } else if(data.ordertype === 7) {
          _type = 'channelRecharge'
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: '/printView',
            text: 'printView.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/printView',
          query: {
            id: data.id,
            type: _type,
          }
        })
      },

      //跳转开发票 
      toBill (id) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: '/billAdd',
            text: 'billAdd.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/billAdd',
          query: {
            id: id
          }
        })
      },

      //调整收银
      editOrder (data) {
        this.$refs.formEdit.resetFields();
        this.formEdit = {
          cusId: data.customerid,
          cusName: data.customerName,
          distributionUserName: data.distributionUserName,
          ordertype: data.ordertype,
          cashTotal: data.cash
            ? data.cash.toFixed(2)
            : '0.00',
          cardTotal: data.card
            ? data.card.toFixed(2)
            : '0.00',
          virtualCurrencyBalance: data.virtualCurrencyBalance
            ? data.virtualCurrencyBalance.toFixed(2)
            : '0.00',
          total: data.card + data.cash
            ? (data.card + data.cash).toFixed(2)
            : '0.00',
          id: data.id,
          cash: data.cash
            ? data.cash * 1
            : 0,
          card1: data.card1
            ? data.card1 * 1
            : 0,
          card2: data.card2
            ? data.card2 * 1
            : 0,
          card3: data.card3
            ? data.card3 * 1
            : 0,
          card4: data.card4
            ? data.card4 * 1
            : 0,
          card5: data.card5
            ? data.card5 * 1
            : 0,
          cardCategory1Id: data.cardcategory1id || '',
          cardCategory2Id: data.cardcategory2id || '',
          cardCategory3Id: data.cardcategory3id || '',
          cardCategory4Id: data.cardcategory4id || '',
          cardCategory5Id: data.cardcategory5id || ''
        };
        this.modalEdit = true;
      },
      okEdit () {
        let _vm = this;
        _vm.$refs.formEdit.validate((valid) => {
          if(valid) {
            _vm.$http.post({
              url: 'guard-webManager/cashierDesk/adjustCashCardEdit.jhtml',
              data: _vm.formEdit,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList();
                  _vm.$refs['formEdit'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'cashierDesk') {
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
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
      setCard (val) {
        this.$nextTick(() => {
          this.formEdit.cash = parseFloat((val).toFixed(2))
        })
      },
      setCard1 (val) {
        this.$nextTick(() => {
          this.formEdit.card1 = parseFloat((val).toFixed(2));
          this.$refs.formEdit.validateField('cardCategory1Id');
        })
      },
      setCard2 (val) {
        this.$nextTick(() => {
          this.formEdit.card2 = parseFloat((val).toFixed(2))
          this.$refs.formEdit.validateField('cardCategory2Id');
        })
      },
      setCard3 (val) {
        this.$nextTick(() => {
          this.formEdit.card3 = parseFloat((val).toFixed(2))
          this.$refs.formEdit.validateField('cardCategory3Id');
        })
      },
      setCard4 (val) {
        this.$nextTick(() => {
          this.formEdit.card4 = parseFloat((val).toFixed(2))
          this.$refs.formEdit.validateField('cardCategory4Id');
        })
      },
      setCard5 (val) {
        this.$nextTick(() => {
          this.formEdit.card5 = parseFloat((val).toFixed(2))
          this.$refs.formEdit.validateField('cardCategory5Id');
        })
      },

      //删除发票
      removeBill (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('cashierDesk.msg3')}</p>
          <p>${_vm.$t('cashierDesk.msg4')}${data.code}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/cashierDesk/delBill.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'cashierDesk') {
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
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },


      //查询客户
      getSearch (form) {
        let _vm = this;
        if(form.query === '') {
          return;
        }
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/query.jhtml',
          data: form,
          success: function(res){
            if(res.data.code === 0){
              let _data = res.data.content || [];
              _vm.searchKey = true;
              if(_vm.langRouterKey !== 'cashierDesk') {
                _vm.dataCus = _data;
              } else {
                _vm.requestList(_data, ['channelName', 'memberCategoryName']).then(res => _vm.dataCus = res);
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.dataCus = [];
        this.searchKey = false;
      },

      //跳转客户详情
      toCusIndex (id, name) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
      
      //跳转查询列表 
      toView (type) {
        let _url = ''
        let _text = ''
        switch (type) {
          case 1:
          _url = '/settlementList'
          _text = 'cashierDesk.btn1'
          break;
          case 2:
          _url = '/cashierList'
          _text = 'cashierDesk.btn2'
          break;
          case 3:
          _url = '/debtOrder'
          _text = 'debtOrder.tit'
          break;
          case 4:
          _url = '/addSettlement'
          _text = 'cashierDesk.btn4'
          break;
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push(_url)
      },

      //跳转还款详情
      toPay (id) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: '/repayment',
            text: 'repayment.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/repayment',
          query: {
            id: id
          }
        })
      },
    }
  }
</script>