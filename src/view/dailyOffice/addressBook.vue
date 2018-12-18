/** * 通讯录 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>通讯录</h2>
    </div>
    <div class="container-body">
      <Form inline :label-width="50" ref='formSearch' :model='formSearch'>
        <Form-item label="部门" prop='deptId'>
          <Select v-model="formSearch.deptId" placeholder="请选择部门" style="width: 162px" clearable>
            <Option v-for="item in deptData" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="姓名" prop='name'>
          <Input type="text" placeholder="请输入姓名" v-model.trim="formSearch.name" @on-enter="getList('1', '10', formSearch.deptId, formSearch.name)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.deptId, formSearch.name)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
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
        columns: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '部门',
            key: 'deptName'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'gender'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '手机',
            key: 'mobile'
          }
        ],
        data: [],
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        hospitalId: null,
        loading: true,
        formSearch: {
          name: '',
          deptId: null
        }
      }
    },
    computed: {
      deptData: function () {
        return this.$store.getters.getSelectDeptList
      }
    },
    created() {
      this.hospitalId = localStorage.getItem('hospId')
      // this.getDeptList(this.hospitalId)
      this.getList('1', '10', this.formSearch.deptId, this.formSearch.name)
    },
    mounted() {
      this.$store.dispatch('setSelectDeptList', this.hospitalId)
    },
    methods: {
      getList(pageNumber, pageSize, deptId, name) {
        let _this = this;
        if (name.length == 0) {
          name = null
        }
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/addressBook/list.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: name,
            deptId: deptId
          },
          success: function (res) {
						_this.data = res.data.content.content
						for (let i = 0; i < _this.data.length; i++) {
							_this.data[i].gender = _this.data[i].gender == '1' ? '男' : '女'
						}
						_this.total = res.data.content.total
						_this.pageNumber = res.data.content.pageNumber
						_this.totalPages = res.data.content.totalPages
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch.deptId, this.formSearch.name)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name == 'formSearch') {
          this.getList('1', '10', this.formSearch.deptId, this.formSearch.name)
        }
      }
    }

  }

</script>
