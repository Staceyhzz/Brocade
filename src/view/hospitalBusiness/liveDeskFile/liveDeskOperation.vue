/** 
 * 治疗记录页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <Form :label-width="90" ref='formSearch' :model='formSearch'>
			<Row type="flex" justify="start">
				<Col :xs='24' :sm='12' :md="8" :lg="6">
					<Form-item :label="$t('liveDeskOperation.colTit1')" prop='startTime'>
						<Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 100%" @on-change='setTime' :clearable='false'
							:value='dateBox'></Date-picker>
					</Form-item>
				</Col>
				<Col :xs='24' :sm='12' :md="8" :lg="6">
					<Form-item :label="$t('liveDeskOperation.colTit2')" prop='hospitalID'>
						<Select v-model="formSearch.hospitalID" clearable>
							<Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</Form-item>
				</Col>
				<Col :xs='24' :sm='12' :md="8" :lg="6">
					<Form-item :label="$t('liveDeskOperation.colTit3')" prop='categoryID'>
						<cmptInputOpen :value='categoryName' :placeholder="$t('charge.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
					</Form-item>
				</Col>
				<Col :xs='24' :sm='12' :md="8" :lg="6">
					<Form-item :label="$t('liveDeskOperation.colTit4')" prop='chargeName'>
						<Input type="text" :maxlength='20' v-model.trim="formSearch.chargeName" :placeholder="$t('placeholderPublic.input')" @on-enter="getList()"></Input>
					</Form-item>
				</Col>
				<Col :xs='24' :sm='12' :md="8" :lg="6">
					<ul class="header-btn-group">
						<li class="header-item" @click="getList()">
							<Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
						<li class="header-item" @click="handleReset('formSearch')">
							<Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
					</ul>
				</Col>
			</Row>
    </Form>
    <Table stripe :columns="col" :data="data"></Table>
		<cmptChargeCategoryChoose :placeHolder="$t('charge.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
  </div>
</template>

<script>
	import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
		components: {cmptChargeCategoryChoose, resizeRemark},
    data() {
      return {
        modal: false,
        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          categoryID: '',
          hospitalID: '',
          customerID: sessionStorage.getItem('liveId'),
          chargeName: '',
        },
				categoryName: '',
				categoryOpenKey: false,
        dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
        col: [
					{
						title: this.$t('liveDeskOperation.colTit1'),
						width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                const _text = params.row.createTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('liveDeskOperation.colTit2'),
						width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('liveDeskOperation.colTit3'),
						width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('liveDeskOperation.colTit4'),
						width: 80,
            key: 'chargeName'
          },
          {
            title: this.$t('liveDeskOperation.colTit5'),
						width: 80,
            render: (h, params) => {
              if (params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('labelPublic.dw'),
						width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('liveDeskOperation.colTit6'),
						width: 60,
            key: 'num'
          },
          {
            title: this.$t('liveDeskOperation.colTit7'),
						width: 80,
            render: (h, params) => {
              return h('ul', params.row.operatorList.map(item => {
                const _text = typeof item.positionName === 'object' ? '【' + item.userDeptName + '】【' + item.userName +
                  '】' : '【' + item.userDeptName + '】【' + item.userName + '】【' + item.positionName + '】';
                return h('li', _text)
              }))
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
        ],
        data: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectRealHospList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      }
		},
		watch: {
      langRouterKey (val) {
        if(val === 'liveDeskOperation') {
          this.getList();
        }
      },
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$store.dispatch('setSelectRealHospList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/liveDesk/getOperation.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            console.log(res)
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'liveDeskOperation') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeCategoryName', 'chargeName', 'chargeUnitName', 'remark']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
			},
			addCategory() {
				this.categoryOpenKey = !this.categoryOpenKey;
			},
      chooseCategory(data) {
        this.formSearch.categoryID = data.id;
        this.categoryName = data.name;
			},
			clearCategory() {
				this.formSearch.categoryID = '';
        this.categoryName = '';
			},
      handleReset(name) {
        this.$refs[name].resetFields()
        this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
        this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
        this.categoryName = ''
        this.getList()
      },
    }
  }

</script>
