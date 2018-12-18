/** 
 * APP添加划扣表格扩展组件 
 */
<template>
  <Row>
    <Col span="20">
			<Table stripe :columns="col" :data="editList"></Table>
			<Input v-model="remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" class='online-remark' @on-blur='changeText'></Input>
    </Col>
    <Col span="3" offset="1" class='table-left-btn'>
			<Button type="primary" icon="plus-round" @click='addDoc'>{{$t('deptDeskOperationUpdate.btn')}}</Button>
			<Button type="primary" icon="plus-round" @click='add' v-if='powerKey'>{{$t('deptDeskOperationAdd.btn1')}}</Button>
			<Button type="primary" icon="plus-round" @click='save' :loading='saveLoad'>{{$t('deptDeskOperationAdd.btn2')}}</Button>
    </Col>
    <Modal :title="$t('deptDeskOperationUpdate.valid')" v-model="modalEdit" :closable="false" class-name="vertical-center-modal">
      <Table height="350" stripe :columns="col1" :data="doctorList" @on-row-click='choose'></Table>
    </Modal>
    <Modal :title="$t('deptDeskOperationAdd.placeholder')" v-model="modal" :closable="false" class-name="vertical-center-modal">
      <Table height="350" stripe :columns="col2" :data="positionList" @on-row-click='choosePosition'></Table>
    </Modal>
  </Row>
</template>
<script>
  export default {
    props: {
      powerKey: {
        type: Boolean,
        default: true
      },
      orderNum: Number,
      orderId: Number,
			cusId: Number,
			positionList: Array,
			doctorList: Array,
			editList: Array,
			editRemark: String
    },
    data() {
      return {
        saveLoad: false,
        rowIndex: '',
        modal: false,
				modalEdit: false,
				remark: '',
        data: [],
        col: [
					{
            title: this.$t('deptDeskOperationUpdate.label'),
            key: 'userName',
          },
          {
            title: this.$t('deptDeskOperationUpdate.colTit'),
            render: (h, params) => {
              return h('Input', {
                props: {
                  value: params.row.positionName,
                  readonly: true,
                  placeholder: this.$t('deptDeskOperationAdd.placeholder'),
                  icon: 'ios-search'
                },
                on: {
                  'on-focus': () => {
                    this.modal = true;
                    this.rowIndex = params.index
                  }
                }
              })
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
        col2: [
					{
            title: this.$t('deptDeskOperationUpdate.colTit'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark',
          },
        ],
      }
		},
		mounted () {
			console.log(this.editRemark + '/////')
			this.remark = this.editRemark;
		},
    methods: {
      addDoc() {
        this.modalEdit = true;
			},
			choose(data) {
        const index = this.editList.findIndex(item => item.userId === data.id);
        if(index < 0) {
          this.editList.push({
            userId: data.id,
            userName: data.name,
            positionId: '',
            positionName: '',
					});
					this.change();
        }
        this.modalEdit = false;
      },
      add() {
        const index = this.editList.findIndex(item => item.userId === localStorage.getItem('userId') * 1);
        if(index < 0) {
          this.editList.push({
            userId: localStorage.getItem('userId') * 1,
            userName: localStorage.getItem('userAccount'),
            positionId: '',
            positionName: '',
					});
					this.change();
        }
      },
      remove(index) {
				this.editList.splice(index, 1);
				this.change();
      },
      choosePosition(data) {
				this.editList[this.rowIndex].positionName = data.name;
				this.editList[this.rowIndex].positionId = data.id;
				this.modal = false;
				this.change();
			},
			change() {
				this.$emit('on-change', this.editList);
			},
			changeText() {
				this.$emit('on-change-text', this.remark);
			},
      save() {
				let _vm = this;
				if(_vm.orderNum === 0) {
					_vm.$Notice.error({
            title: _vm.$t('publicSet.noticeTit'),
            desc: _vm.$t('deptDeskOperationAdd.valid')
					})
					return;
				}
        if (_vm.editList.length === 0) {
          _vm.$Notice.error({
            title: _vm.$t('publicSet.noticeTit'),
            desc: _vm.$t('deptDeskOperationUpdate.valid')
          })
        } else {
          _vm.saveLoad = true
          const _data = {
            id: _vm.orderId,
            customerId: _vm.cusId,
            num: _vm.orderNum,
            remark: _vm.remark,
            operatorListStr: JSON.stringify(_vm.editList)
          }
          _vm.$http.post({
            url: 'guard-webManager/deptDesk/sendOperationMessage.jhtml',
            data: _data,
            success: function (res) {
              if (res.data.code === 0) {
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: _vm.$t('deptDeskOperationAdd.msg')
                })
              } else {
                _vm.$Notice.error({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.desc
                })
              }
              _vm.saveLoad = false
              _vm.$emit('setOnlineOrder')
            },
            error: function (res) {
              console.log(res)
            }
          })
        }
      },
    }
  };

</script>

<style>
  .online-remark {
    margin-top: 15px;
  }

</style>
