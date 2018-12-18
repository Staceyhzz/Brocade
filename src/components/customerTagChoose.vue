<template>
  <Modal :title="$t('customerTagChoose.tit')" width='700' v-model="modal" :closable="false" @on-ok="ok" class-name="customer-tag-choose">
    <div class="result">
      <p>{{$t('customerTagChoose.label')}}</p>
      <ul>
        <li v-for='item in chooseResult' :key='item.id' class="close" @click='close(item)'>{{item.name}}
          <Icon type="close-round"></Icon>
        </li>
      </ul>
    </div>
    <div class="search">
      <Input v-model.trim="name" :placeholder="$t('customerTagChoose.placeholder')"></Input>
    </div>
    <ul class="box">
      <li v-for='(item, index) in searchList' :key='item.id' :class="[item.status === 0 ? 'un-use' : '', item.choose ? 'active' : '']"
        @click='choose(item)'>{{item.name}}</li>
    </ul>
  </Modal>
</template>

<script>
  export default {
    name: 'customerTagChoose',
    props: {
      openKey: Boolean,
      tagType: {
        type: String,
        default: 'all'
      },
      multiple: {
        type: Boolean,
        default: false,
			},
			activate: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        modal: false,
        name: '',
        tagData: [],
      }
    },
    computed: {
      searchList() {
        let _data = []
        if (this.tagType === 'all') {
          _data = this.tagData
        } else if (this.tagType === 'use') {
          _data = this.tagData.filter(item => item.status === 1)
        }
        if (this.name === '') {
          return _data
        } else {
          return _data.filter(item => {
            if (item.name.indexOf(this.name) >= 0) {
              return item
            }
          })
        }
      },
      chooseResult() {
        return this.tagData.filter(item => item.choose)
      },
    },
    watch: {
      openKey(val) {
        this.name = ''
        this.tagData.map(item => {
          item.choose = false
        })
        this.modal = true
			},
			activate(val) {
				this.modal = false;
			}
    },
    created() {
      this.getTag()
    },
    methods: {
      getTag() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/allTagList.jhtml',
          data: {
            name: ''
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.tagData = res.data.content.map(item => {
                item.choose = false
                return item
              }) || []
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      choose(data) {
        const _index = this.tagData.findIndex(item => item.id === data.id)
        if (_index >= 0) {
          if (this.multiple) {
            if (this.tagData[_index].choose) {
              this.tagData[_index].choose = false
            } else {
              this.tagData[_index].choose = true
            }
          } else {
            if (this.tagData[_index].choose) {
              this.tagData[_index].choose = false
            } else {
              this.tagData.map(item => {
                item.choose = false
              })
              this.tagData[_index].choose = true
            }
          }
        }
      },
      close(data) {
        const _index = this.tagData.findIndex(item => item.id === data.id)
        if (_index >= 0) {
          this.tagData[_index].choose = false
        }
      },
      ok() {
        const data = this.tagData.filter(item => item.choose)
        if (data.length) {
          this.$emit('on-change', data)
        }
      },
    }
  }

</script>
<style lang="less" scoped>
  .customer-tag-choose {
    .search {
      width: 200px;
      margin-bottom: 20px;
    }
    .box {
      height: 180px;
      overflow: auto;
    }
    ul {
      overflow: hidden;
    }
    li {
      float: left;
      min-width: 60px;
      padding: 7px;
      border: 1px solid #4172F6;
      margin: 0px 15px 15px 0;
      line-height: 16px;
      text-align: center;
      color: #4172F6;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        color: #fff;
        border-color: #4172F6;
        background-color: #4172F6;
      }
    }
    .un-use {
      color: #2a2a2a;
      border-color: #2a2a2a;
    }
    .active {
      color: #fff;
      border-color: #4172F6;
      background-color: #4172F6;
    }
    .result {
      position: relative;
      min-height: 47px;
      padding-left: 80px;
      margin-bottom: 15px;
      box-shadow: 0 -1px 0 0 #e3e8ee inset;
      p {
        position: absolute;
        top: 0;
        left: 0;
        line-height: 32px;
      }
    }
    .close {
      position: relative;
      min-width: 70px;
      padding-right: 20px;
      i {
        position: absolute;
        right: 7px;
        top: 9px;
      }
    }
  }

</style>
