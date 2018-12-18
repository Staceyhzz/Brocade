/**
* 订单条件查询页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>订单条件查询</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
        <Form-item label="支付时间：" prop='paidStart'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='paidTime' ref='paidDate'></Date-picker>
        </Form-item>
        <Form-item label="执行项目：" prop='type'>
          <Radio-group v-model="formAdd.type" style="width:500px">
            <Form-item prop="chargeId">
              <Radio :label="1">指定项目</Radio>
              <Input v-model="formAdd.chargeName" readonly icon="ios-search" placeholder="选择指定项目" @on-focus="showCharge" style='width:300px;display:inline-block;'></Input>
            </Form-item>
            <Form-item prop='chargeCategoryId'>
              <Radio :label="2" style='margin-top:15px;'>指定项目分类</Radio>
              <cmptCategoryChoose _placeHolder="选择指定项目分类" :_style="{width:'300px',display:'inline-block'}" :_categoryName="formAdd.chargeCategoryName" v-on:setCategoryName="setCategory"></cmptCategoryChoose>
            </Form-item>
            <Form-item prop="itemId">
              <Radio :label="3">指定报表分类</Radio>
              <Select v-model="formAdd.itemId" style="width:300px">
                <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Radio-group>
        </Form-item>
        <Form-item label="消费金额：" prop='compare1'>
          <Select v-model="formAdd.compare1" style="width:80px">
            <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
          </Select>
          <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.amount" style="width:215px"></cmptInputNumber>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="search" @click='search'>查询</Button>
        <Button type="primary"  icon="refresh" @click="handleReset('formAdd')">重置</Button>
      </div>
    </div>
    <cmptChargeChoose placeHolder="选择指定项目" @on-change="setCharge" :openKey='openKey'></cmptChargeChoose>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue'
  export default {
    components: {
      cmptChargeChoose
    },
    data () {
      return {
        openKey: false,
        formAdd: {
          paidStart: '',
          paidEnd: '',
          type: 1,
          chargeId: '',
          chargeName: '',
          chargeCategoryId: '',
          chargeCategoryName: '',
          itemId: '',
          compare1: '>=',
          amount: null,
        },
        typeList: [
          {
            name: '>=',
          },
          {
            name: '>',
          },
          {
            name: '=',
          },
          {
            name: '<=',
          },
          {
            name: '<',
          }
        ],
      }
    },
    computed: {
      itemList () {
        return this.$store.getters.getSelectAllItemList
      },
    },
    created () {
      this.$store.dispatch('setPageLoading', 1)
    },
    mounted () {
      this.$store.dispatch('setSelectAllItemList')
    },
    methods: {
      showCharge () {
        this.openKey = !this.openKey
      },
      setCharge (data) {
        this.formAdd.chargeName = data.name
        this.formAdd.chargeId = data.id
      },
      setCategory (data) {
        this.formAdd.chargeCategoryName = data.name
        this.formAdd.chargeCategoryId = data.id
      },
      paidTime (date) {
        this.formAdd.paidStart = date[0]
        this.formAdd.paidEnd = date[1]
      },
      search () {
        let breadData = [
        {
          url: '/desktop',
          text: '桌面'
        },
        {
          url: '/customerFilter',
          text: '客户选择器'
        },
        {
          url: '/basicEdit',
          text: '条件查找结果'
        },
        ]
        sessionStorage.setItem('filterSearch', JSON.stringify(this.formAdd))
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/basicEdit',
          query: {
            type: '4'
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.$refs['paidDate'].handleClear()
        this.formAdd.chargeName = ''
        this.formAdd.chargeCategoryName = ''
        this.formAdd.amount = null
      }
    }
  }
</script>


