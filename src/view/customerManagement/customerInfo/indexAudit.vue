/** 
 * 审核申请页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit1')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit2')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit3')}}</h3>
      </div>
      <Table stripe :columns="col2" :data="data2"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit4')}}</h3>
      </div>
      <Table stripe :columns="col3" :data="data3"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit5')}}</h3>
      </div>
      <Table stripe :columns="col4" :data="data4"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit6')}}</h3>
      </div>
      <Table stripe :columns="col5" :data="data5"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit7')}}</h3>
      </div>
      <Table stripe :columns="col6" :data="data6"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit8')}}</h3>
      </div>
      <Table stripe :columns="col7" :data="data7"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit9')}}</h3>
      </div>
      <Table stripe :columns="col8" :data="data8"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit10')}}</h3>
      </div>
      <Table stripe :columns="col9" :data="data9"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit11')}}</h3>
      </div>
      <Table stripe :columns="col10" :data="data10"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit12')}}</h3>
      </div>
      <Table stripe :columns="col11" :data="data11"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit13')}}</h3>
      </div>
      <Table stripe :columns="col12" :data="data12"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAudit.tit14')}}</h3>
      </div>
      <Table stripe :columns="col13" :data="data13"></Table>
    </div>
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
      return {
        pageLodading: true,
        cusId: '',
        cusName: '',
        data: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        data6: [],
        data7: [],
        data8: [],
        data9: [],
        data10: [],
        data11: [],
        data12: [],
        data13: [],
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit4'),
            width: 60,
            key: 'oldUserName'
          },
          {
            title: this.$t('indexAudit.colTit5'),
            width: 60,
            key: 'newUserName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'exploitChange')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col1: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit13'),
            width: 60,
            key: 'oldUserName'
          },
          {
            title: this.$t('indexAudit.colTit14'),
            width: 60,
            key: 'newUserName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'managerChange')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col2: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit15'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexAudit.colTit16'),
            width: 60,
            key: 'oldUserName'
          },
          {
            title: this.$t('indexAudit.colTit17'),
            width: 60,
            key: 'newUserName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'orderDetailManager')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col3: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'blacklist')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col4: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit18'),
            width: 60,
            key: 'oldMemberCategoryName'
          },
          {
            title: this.$t('indexAudit.colTit19'),
            width: 60,
            key: 'newMemberCategoryName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'member')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col5: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit20'),
            width: 60,
            key: 'equityName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'addEquity')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col6: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit20'),
            width: 60,
            key: 'equityName'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'deleteEquity')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col7: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit21'),
            width: 60,
            key: 'toCustomerName'
          },
          {
            title: this.$t('indexAudit.colTit22'),
            width: 60,
            key: 'depositid'
          },
          {
            title: this.$t('indexAudit.colTit23'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'depositTransfer')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col8: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit24'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('indexAudit.colTit23'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'addCoupon')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col9: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit25'),
            width: 60,
            key: 'couponid'
          },
          {
            title: this.$t('indexAudit.colTit23'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'rebateCoupon')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col10: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit26'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'addPoint')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col11: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit26'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'rebatePoint')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col12: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit26'),
            width: 60,
						key: 'amount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit24'),
            width: 60,
            key: 'couponCategoryName'
          },
          {
						title: this.$t('indexAudit.colTit27'),
            width: 60,
						key: 'couponamount',
						align: 'right',
						render: (h, params) => {
							if(Number.isFinite(params.row.couponamount)) {
								return h('span', params.row.couponamount.toFixed(2));
							}
						}
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'pointCoupon')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ],
        col13: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAudit.colTit1'),
            width: 80,
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
            title: this.$t('indexAudit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAudit.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexAudit.colTit28'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexAudit.colTit29'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('indexAudit.colTit30'),
            width: 60,
            key: 'fromnum'
          },
          {
            title: this.$t('indexAudit.colTit6'),
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
          {
            title: this.$t('indexAudit.colTit7'),
            width: 70,
            render: (h, params) => {
							const _color = params.row.auditstatus === 1 
								? 'orange' 
								: params.row.auditstatus === 3 
								? '#FF6F76' 
								: '#4172F6';
							const _text = params.row.auditstatus === 1 
								? this.$t('indexAudit.colTit10') 
								: params.row.auditstatus === 3 
								? this.$t('indexAudit.colTit9') 
								: this.$t('indexAudit.colTit8') ;
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('indexAudit.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.autoapprove === 1) {
                return h('span', this.$t('indexAudit.colTit12'));
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row, 'debtOperation')
                      }
                    }
                  }, this.$t('publicSet.check'))
                ])
              }
            }
          }
        ]
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
		watch: {
      langRouterKey (val) {
        if(val === 'indexAudit') {
          this.getId(this.cusId);
        }
      },
    },
    created() {
			this.cusId = sessionStorage.getItem('cusId');
			this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getAudit.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						const result = res.data.content || {};
						// 开发人员变更
						const _data = result.exploitOwnerShipOrderList || [];
						// 咨询人员变更
						const _data1 = result.managerOwnerShipOrderList || [];
						// 医生变更
						const _data2 = result.orderDetailManagerOrderList || [];
						// 黑名单
						const _data3 = result.blacklistOrderList || [];
						// 会员变更
						const _data4 = result.memberOrderList || [];
						// 增加权益
						const _data5 = result.addEquityOrderList || [];
						// 删除权益
						const _data6 = result.deleteEquityOrderList || [];
						// 预收款转账
						const _data7 = result.depositTransferOrderList || [];
						const _col7 = _vm.tableCount(_data7, ['amount']);
            _col7.map(item => {
              const index = _vm.col7.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col7[index].width = item.width;
              }
						});
						// 送券
						const _data8 = result.couponOrderList || [];
						const _col8 = _vm.tableCount(_data8, ['amount']);
            _col8.map(item => {
              const index = _vm.col8.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col8[index].width = item.width;
              }
						});
						// 扣券
						const _data9 = result.couponRebateOrderList || [];
						const _col9 = _vm.tableCount(_data9, ['amount']);
            _col9.map(item => {
              const index = _vm.col9.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col9[index].width = item.width;
              }
						});
						// 赠送积分
						const _data10 = result.addPointOrderList || [];
						const _col10 = _vm.tableCount(_data10, ['amount']);
            _col10.map(item => {
              const index = _vm.col10.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col10[index].width = item.width;
              }
						});
						// 扣减积分
						const _data11 = result.rebatePointOrderList || [];
						const _col11 = _vm.tableCount(_data11, ['amount']);
            _col11.map(item => {
              const index = _vm.col11.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col11[index].width = item.width;
              }
						});
						// 积分兑换券
						const _data12 = result.pointCouponOrderList || [];
						const _col12 = _vm.tableCount(_data12, ['amount', 'couponamount']);
            _col12.map(item => {
              const index = _vm.col12.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col12[index].width = item.width;
              }
						});
						// 欠费划扣
						const _data13 = result.debtOperationOrderList || [];
						

						if(_vm.langRouterKey !== 'indexAudit') {
							_vm.data = _data;
							_vm.data1 = _data1;
							_vm.data2 = _data2;
							_vm.data3 = _data3;
							_vm.data4 = _data4;
							_vm.data5 = _data5;
							_vm.data6 = _data6;
							_vm.data7 = _data7;
							_vm.data8 = _data8;
							_vm.data9 = _data9;
							_vm.data10 = _data10;
							_vm.data11 = _data11;
							_vm.data12 = _data12;
							_vm.data13 = _data13;
            } else {
							_vm.requestList(_data, ['content']).then(res => _vm.data = res);
							_vm.requestList(_data1, ['content']).then(res => _vm.data1 = res);
							_vm.requestList(_data2, ['content', 'chargeName']).then(res => _vm.data2 = res);
							_vm.requestList(_data3, ['content']).then(res => _vm.data3 = res);
							_vm.requestList(_data4, ['content', 'oldMemberCategoryName', 'newMemberCategoryName']).then(res => _vm.data4 = res);
							_vm.requestList(_data5, ['content', 'equityName']).then(res => _vm.data5 = res);
							_vm.requestList(_data6, ['content', 'equityName']).then(res => _vm.data6 = res);
							_vm.requestList(_data7, ['content']).then(res => _vm.data7 = res);
							_vm.requestList(_data8, ['content', 'categoryName']).then(res => _vm.data8 = res);
							_vm.requestList(_data9, ['content']).then(res => _vm.data9 = res);
							_vm.requestList(_data10, ['content']).then(res => _vm.data10 = res);
							_vm.requestList(_data11, ['content']).then(res => _vm.data11 = res);
							_vm.requestList(_data12, ['content', 'couponCategoryName']).then(res => _vm.data12 = res);
							_vm.requestList(_data13, ['content', 'chargeName']).then(res => _vm.data13 = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      toView(data, type) {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: '/auditInfoView',
            text: 'indexAudit.tit15'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/auditInfoView',
          query: {
            id: data.id,
            type: type,
          }
        });
      },
    }
  }

</script>
