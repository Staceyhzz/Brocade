/** 
 * 最后一次成交时间查询页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>最后一次成交时间查询</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
        <Form-item label="时间段：">
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='lastTime'
            ref='lastDate'></Date-picker>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="search" @click='search'>查询</Button>
        <Button type="primary" icon="refresh" @click="handleReset('formAdd')">重置</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formAdd: {
          createTimeStart: '',
          createTimeEnd: '',
        },
      }
    },
    created() {
      this.$store.dispatch('setPageLoading', 1)
    },
    methods: {
      search() {
        let breadData = [{
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
            type: '12'
          }
        })
      },
      lastTime(date) {
        this.formAdd.createTimeStart = date[0]
        this.formAdd.createTimeEnd = date[1]
      },
      handleReset(name) {
        this.$refs['lastDate'].handleClear();
      }
    }
  }

</script>
