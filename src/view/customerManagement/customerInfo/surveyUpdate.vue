/** 
 * 修改问卷页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexSurvey.tit1')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('surveyAdd.label1')">
          <span>{{name}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('surveyAdd.label2')" prop="detailListStr" required>
          <Table stripe :columns="col" :data="data" :disabled-hover='true'></Table>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateList = (rule, value, callback) => {
        const index = this.data.findIndex(item => item.answer === '');
        if (index < 0) {
          callback()
        } else {
          callback(new Error(this.$t('surveyAdd.valid')));
        }
      };
      return {
        saveLoad: false,
        cusName: '',
        name: '',
        formValidate: {
          id: '',
          remark: '',
          detailListStr: '',
        },
        col: [
          {
            title: this.$t('surveyAdd.label3'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('surveyAdd.label4'),
            render: (h, params) => {
              const _text = params.row.type === 1 
                ? this.$t('surveyAdd.label5')
                : params.row.type === 2 
                ? this.$t('surveyAdd.label6') 
                : this.$t('surveyAdd.label7');
              return h('span', _text);
            }
          },
          {
            title: this.$t('surveyAdd.label2'),
            render: (h, params) => {
              const title = (params.row.content).match(/<p>([\s\S]*?)<\/p>/)[1];
              let list = [];
              for(let i = 1; i < 7; i++) {
                if(typeof params.row['option' + i] === 'string' && params.row['option' + i]) {
                  list.push(params.row['option' + i])
                }
              }
              return h('div', [
                h('p', title),
                h('ul', list.map((item, index) => {
                  const text = String.fromCharCode(65 + index);
                  return h('li', `${this.$t('surveyAdd.label8', [text])}${item}`);
                }))
              ]);
            }
          },
          {
            title: this.$t('surveyAdd.label9'),
            render: (h, params) => {
              if(params.row.type === 3) {
                return h('Input', {
                  props: {
                    size: 'small',
                    value: params.row.answer
                  },
                  on: {
                    'input': (val) => {
                      console.log(val)
                      params.row.answer = val.replace(/(^\s*)|(\s*$)/g, "");
                      this.data[params.index] = params.row;
                    },
                  }
                });
              } else {
                let list = [];
                for(let i = 1; i < 7; i++) {
                  if(typeof params.row['option' + i] === 'string' && params.row['option' + i]) {
                    list.push(
                      {
                        name: params.row['option' + i],
                        id: String.fromCharCode(64 + i)
                      }
                    );
                  }
                }
                if(params.row.type === 1) {
                  return h('RadioGroup', {
                    props: {
                      value: params.row.answer
                    },
                    on: {
                      'on-change': (val) => {
                        console.log(val)
                        params.row.answer = val;
                        this.data[params.index] = params.row;
                        console.log(this.data);
                      }
                    }
                  }, list.map(item => {
                    return h('Radio', {
                      props: {
                        label: item.id
                      }
                    }, item.name);
                  }));
                }
                if(params.row.type === 2) {
                  return h('CheckboxGroup', {
                    props: {
                      value: params.row.checkBox
                    },
                    on: {
                      'on-change': (val) => {
                        console.log(val)
                        params.row.checkBox = val;
                        params.row.answer = val.join('');
                        this.data[params.index] = params.row;
                        console.log(this.data);
                      }
                    }
                  }, list.map(item => {
                    return h('Checkbox', {
                      props: {
                        label: item.id
                      }
                    }, item.name);
                  }));
                }
              }
            }
          },
        ],
        data: [],
        ruleForm: {
          detailListStr: [{
            validator: validateList,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getUpdateSurvey.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const _obj = res.data.content.customerSurvey || {};
            const _data = res.data.content.titleList.map(item => {
              const index = _obj.DetailList.findIndex(l => l.titleid === item.id);
              let list = {
                ...item,
                answer: _obj.DetailList[index].answer,
                checkBox: []
              }
              if(item.type === 2) {
                list.checkBox = _obj.DetailList[index].answer.split('');
              }
              return list;
            }) || [];
            const _result = _data.map(item => {
              return {
                titleId: item.id,
                answer: item.answer
              };
            });
            _vm.name = _obj.surveyName || '';
            _vm.data = _data;
            _vm.formValidate = {
              id: _obj.id,
              remark: _obj.remark,
              detailListStr: JSON.stringify(_result)
            };
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            const list = _vm.data.map(item => {
              return {
                titleId: item.id,
                answer: item.answer
              };
            });
            _vm.formValidate.detailListStr = JSON.stringify(list);
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/updateSurvey.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  const breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/customer',
                      text: 'layoutNav.customerManage'
                    },
                    {
                      url: '/indexSurvey',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexSurvey');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  });
                } else {
                  _vm.saveLoad = false;
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
