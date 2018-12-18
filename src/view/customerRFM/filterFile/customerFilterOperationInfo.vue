/**
* 执行条件查询页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>执行条件查询</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
        <Form-item label="最后执行时间：" prop='lastOperationStart'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='lastTime' ref='lastDate'></Date-picker>
        </Form-item>
        <Form-item label="执行项目：" prop='type'>
          <Radio-group v-model="formAdd.type" style="width:500px">
            <Form-item prop="chargeId">
              <Radio :label="1">指定项目</Radio>
              <Input v-model="formAdd.chargeName" readonly icon="ios-search" placeholder="选择指定项目" @on-focus="showCharge" style='width:300px;'></Input>
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
        <Form-item label="执行人：" prop='operatorUserId'>
          <cmptHospChooseUser _placeHolder="选择执行人" :_style="{width:'300px'}" :_userName="formAdd.operatorUserName" v-on:setUserName="setOperator"></cmptHospChooseUser>
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
        formAdd: {
          lastOperationStart: '',
          lastOperationEnd: '',
          type: 1,
          chargeId: '',
          chargeName: '',
          chargeCategoryId: '',
          chargeCategoryName: '',
          itemId: '',
          operatorUserId: '',
          operatorUserName: '',
        },
        openKey: false,
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
      setOperator (data) {
        this.formAdd.operatorUserName = data.name
        this.formAdd.operatorUserId = data.id
      },
      lastTime (date) {
        this.formAdd.lastOperationStart = date[0]
        this.formAdd.lastOperationEnd = date[1]
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
            type: '6'
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.$refs['lastDate'].handleClear()
        this.formAdd.chargeName = ''
        this.formAdd.chargeCategoryName = ''
        this.formAdd.operatorUserName = ''
      }
    }
  }
</script>


