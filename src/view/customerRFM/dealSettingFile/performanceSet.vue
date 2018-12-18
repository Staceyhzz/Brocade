/**
 *  绩效设置
 */

<template>
	<div class="container-box performance-set">
		<div class="container-header">
			<h2>绩效设置</h2>
		</div>
		<div class="container-body">
      <Menu mode="horizontal" active-name="/performanceSet" @on-select='toMenu'>
        <Menu-item name="/dealBusiness">成交指标</Menu-item>
        <Menu-item name="/outpatientBusiness">门诊指标</Menu-item>
        <Menu-item name="/performanceSet">绩效设置</Menu-item>
        <Menu-item name="/intentionSet">意向类型</Menu-item>
        <Menu-item name="/intentionDistinguish">意向识别</Menu-item>
      </Menu>
      <h3>项目绩效金额</h3>
      <div class="deal-item">
        <div class="radio-box">
          <p>项目绩效金额是员工绩效核算等报表的有效计算金额，可以根据企业考核模式，选择不同的计算模式，主要差别是对欠款这部分金额的处理上。</p>
          <p>营收计算法，即不对员工考核顾客欠款的情况，根据实收总额计算员工绩效，对于员工相对宽松的考核模式，欠费顾客也能得到相同的待遇。</p>
          <p class="did">现金计算法，即员工需要考核顾客欠款金额，这种方式下欠款项目的治疗是没有业绩的，只有当顾客还款时才能获取相应工作绩效。</p>
          <RadioGroup v-model="type" vertical>
            <Radio :label="1">
              <span class='radio-tit'>营收计算法</span>
              <span class='radio-msg'>项目金额 = 项目应收总额 - 项目赔款 - 项目退单额。</span>
            </Radio>
            <Radio :label="2">
              <span class='radio-tit'>现金计算法</span>
              <span class='radio-msg'>项目金额 = 项目支付总额 + 还款金额 - 项目赔款 - 项目退单额。</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="jyw-footer-btn">
        <Button type="primary" @click='save' :loading='saveLoad'>保存</Button>
        <Button type="ghost" class='cancel' @click='cancel'>取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        saveLoad: false,
        type: 1,
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/managerTarget/getPerformanceAmount.jhtml',
          success: function(res){
            if(res.data.code === 0){
              _vm.type = res.data.content
                ? res.data.content * 1
                : 1;
              _vm.$store.dispatch('setPageLoading', 1)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      toMenu (val) {
        const breadData = [
        {
          url: '/desktop',
          text: '桌面'
        },
        {
          url: val,
          text: '经营指标设置'
        }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push(val)
      },
      cancel () {
        this.getList()
      },
      save () {
        let _vm = this
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/managerTarget/updatePerformanceAmount.jhtml',
          data: {
            type: _vm.type
          },
          success: function(res){
            if(res.data.code === 0 ){
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '操作成功！'
              })
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              })
            }
            _vm.saveLoad = false
          },
          error: function(res){
            console.log(res)
          }
        })
      },
    }
  }
</script>

<style scoped lang='less'>
  .performance-set {
    .container-body {
      padding-top: 0;
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
    .radio-box {
      padding: 30px 46px;
      border: 1px solid #DEDEDE;
      border-radius: 4px;
      label {
        height: auto;
        word-wrap: break-word;
        white-space: normal;
      }
    }
    .radio-tit {
      display: inline-block;
      width: 100px;
      font-size: 14px;
    }
    .radio-msg {
      display: inline-block;
      padding-left: 30px;
      font-size: 14px;
    }
    p {
      margin-bottom: 8px;
      font-size: 13px;
      color: #797979;
    }
    .did {
      margin-bottom: 15px;
    }
  }
</style>