/** 
 * 打印预览 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('printView.tit')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="print">
          <Icon type="printer"></Icon>{{$t('printView.btn')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <div id="printer">
        <div id="myPrintArea" v-html='text' :style="{width: printWidth + 'px'}" ref='print'>{{text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import print from 'utils/print'
  export default {
    data() {
      return {
        text: '',
        printWidth: '',
        printUrl: [
					{
            type: 'order',
            url: 'guard-webManager/print/getPrintOrder.jhtml',
          },
          {
            type: 'depositOrder',
            url: 'guard-webManager/print/getPrintDepositOrder.jhtml',
          },
          {
            type: 'repaymentOrder',
            url: 'guard-webManager/print/getPrintRepaymentOrder.jhtml',
          },
          {
            type: 'backOrder',
            url: 'guard-webManager/print/getPrintBackOrder.jhtml',
          },
          {
            type: 'depositRebateOrder',
            url: 'guard-webManager/print/getPrintDepositRebateOrder.jhtml',
          },
          {
            type: 'operation',
            url: 'guard-webManager/print/getPrintOperation.jhtml',
          },
          {
            type: 'customerOperation',
            url: 'guard-webManager/print/getPrintCustomerOperation.jhtml',
          },
          {
            type: 'settlement',
            url: 'guard-webManager/print/getPrintSettlement.jhtml',
          },
          {
            type: 'surgery',
            url: 'guard-webManager/print/getPrintSurgery.jhtml',
          },
          {
            type: 'medicalRecord',
            url: 'guard-webManager/print/getPrintMedicalRecord.jhtml',
          },
          {
            type: 'allocate',
            url: 'guard-webManager/print/getPrintAllocate.jhtml',
          },
          {
            type: 'borrow',
            url: 'guard-webManager/print/getDeptBorrow.jhtml',
          },
          {
            type: 'borrowStockIn',
            url: 'guard-webManager/print/getBorrowStockIn.jhtml',
          },
          {
            type: 'prescription',
            url: 'guard-webManager/print/getPrintCustomerPrescription.jhtml',
          },
          {
            type: 'use',
            url: 'guard-webManager/print/getUse.jhtml',
          },
          {
            type: 'check',
            url: 'guard-webManager/print/getCheck.jhtml',
          },
          {
            type: 'returnSales',
            url: 'guard-webManager/print/getSalesReturnStockIn.jhtml',
          },
          {
            type: 'return',
            url: 'guard-webManager/print/getReturn.jhtml',
          },
          {
            type: 'purchase',
            url: 'guard-webManager/print/getPurchase.jhtml',
          },
          {
            type: 'stockOutDesk',
            url: 'guard-webManager/print/getPrintStockOutDesk.jhtml',
          },
          {
            type: 'channelRecharge',
            url: 'guard-webManager/print/getChannelRechargeOrder.jhtml',
          },
        ],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this,
          _url = '',
          _id = ''
        _vm.printUrl.map(item => {
          if (_vm.$route.query.type === item.type) {
            _url = item.url
            if (item.type === 'prescription') {
              _id = _vm.$route.query.orderDetailId
            } else {
              _id = ''
            }
          }
        })
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: _url,
          data: {
            id: _vm.$route.query.id,
            orderDetailId: _id
          },
          success: function (res) {
            _vm.printWidth = res.data.content.print.width
            _vm.text = res.data.content.content
            _vm.$nextTick(() => {
              let $dom = $(_vm.$refs.print)
              let $table = $dom.find('table')
              $table.css({
                fontSize: res.data.content.print.fontsize + 'px',
                fontFamily: res.data.content.print.fontfamily
              })
              console.log($table)
            })
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      print() {
        // $("#myPrintArea").printArea()
        let box = window.document.body.innerHTML
        let inner = document.getElementById('printer').innerHTML
        window.document.body.innerHTML = inner
        window.print()
        // window.document.body.innerHTML = box
        this.$router.go(0)
        // console.log(inner)

      },

    }
  }

</script>
<style>
  #myPrintArea {
    font: initial;
    color: #000;
  }

</style>
