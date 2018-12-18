/** 
 * 修改会员类型页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('memberCategory.btn5')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('memberCategoryQuitys.label')" prop="equityList" required>
          <Row>
            <Col span="20">
            <Table stripe :columns="col" :data="formValidate.equityList"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
            <Button type="primary" icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
            <Button type="primary" icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('memberCategoryQuitys.modalTit')" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col1" :data="data" @on-selection-change='change'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error(this.$t('memberCategoryQuitys.modalTit')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        col: [
					{
            title: this.$t('labelPublic.mc'),
            key: 'equityName'
          },
          {
            title: this.$t('memberCategoryQuitys.colTit'),
            key: 'equityContent'
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
        data: [],
        selectBox: [],
        col1: [
					{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('memberCategoryQuitys.colTit'),
            key: 'content'
          }
        ],
        modalEdit: false,
        loading: true,
        formValidate: {
          id: '',
          equityList: []
        },
        ruleForm: {
          equityList: [{
            validator: validateList,
            trigger: 'change'
          }]
        },
      }
    },
    created() {
      this.getId()
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/memberCategory/getEquitys.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            console.log(res)
            _vm.formValidate.equityList = res.data.content.MemberCategory.equityList
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.data = res.data.content.EquityList;
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modalEdit = true
      },
      clean() {
        this.formValidate.equityList.splice(0)
      },
      remove(index) {
        this.formValidate.equityList.splice(index, 1)
      },
      change(data) {
        this.selectBox = data
      },
      ok() {
				this.selectBox.map(item => {
					const index = this.formValidate.equityList.findIndex(eq => eq.equityid === item.id);
					if(index < 0) {
						const obj = {
							equityid: item.id,
							equityName: item.name,
							equityContent: item.content
						};
						this.formValidate.equityList.push(obj);
					}
				});
        this.modalEdit = false
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
						const _data = {
							id: _vm.$route.query.id,
              equityList: _vm.formValidate.equityList.map(item => item.equityid).join(',') || ''
						}
            _vm.$http.post({
              url: 'guard-webManager/memberCategory/updateEquitys.jhtml',
              data: _data,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/memberCategory')
                } else {
                  _vm.$Notice.error({
										title: _vm.$t('publicSet.noticeTit'),
										desc: res.data.desc
									});
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
