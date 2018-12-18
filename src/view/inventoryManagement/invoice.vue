/** * 添加发票记录 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>添加发票记录</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView('add')">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="开票日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime' ref='clearTime'></Date-picker>
        </Form-item>
        <Form-item label="供应商" prop='supplierId'>
          <cmptSupplierChoose _placeHolder="选择供应商" :_style="{width:'162px'}" :_supplierName="supplierName" v-on:setSupplierName="setSupplier"></cmptSupplierChoose>
        </Form-item>
        <Form-item label="发票号" prop='code'>
          <Input :maxlength='20' v-model.trim="formSearch.code" placeholder="请输入发票号" @on-enter='getList(1, 10, formSearch)'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        supplierName: '',
        formSearch: {
          startTime: '',
          endTime: '',
          supplierId: '',
          code: '',
        },
        col: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '操作日期',
            key: 'createtime',
            render: (h, params) => {
              const _text = params.row.createtime.split(' ')[0]
              return h('span', _text)
            }
          },
          {
            title: '供应商',
            key: 'supplierName'
          },
          {
            title: '发票号',
            key: 'code'
          },
          {
            title: '发票抬头',
            key: 'name'
          },
          {
            title: '金额',
            key: 'amount',
            render: (h, params) => {
              const _text = params.row.amount.toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '操作用户',
            key: 'createUserName'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, '查看'),
              ])
            }
          }
        ],
        data: [],
      }
    },
    created() {
      this.getList('1', '10', this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        var _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/invoice/page.jhtml',
          data: form,
          success: function (res) {
						_vm.data = res.data.content.content
						_vm.total = res.data.content.total
						_vm.pageNumber = res.data.content.pageNumber
						_vm.totalPages = res.data.content.totalPages
						console.log(res)
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //供应商
      setSupplier(data) {
        this.formSearch.supplierId = data.id
        this.supplierName = data.name
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        if (name == 'formSearch') {
          this.$refs['clearTime'].handleClear();
          this.supplierName = ''
        }
        this.getList(1, '10', this.formSearch)
      },
      toView(data) {
        var _text = ''
        var _id = ''
        var _url = ''
        if (typeof data == 'object') {
          _text = '采购发票信息'
          _id = data.id
          _url = '/invoiceView'
        } else {
          _text = '添加发票'
          _id = data
          _url = '/invoiceAdd'
        }
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/invoice',
            text: '采购发票'
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: _id
          }
        })
      },
    }
  }

</script>>
