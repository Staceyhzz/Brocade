/**
 * 收费项目类型弹窗选择组件
 * 缓存关闭弹窗
 * activatedKey: false
 */
<template>
  <Modal
    :title="placeHolder"
    width='700'
    v-model="modal"
    :closable="false"
    class-name="modal-category-tree">
    <div class="box">
      <Tree :data="treeData" :render="renderTree"></Tree>
    </div>
  </Modal>
</template>

<script>
	export default {
		name: 'chargeCategoryChoose',
    props: {
      placeHolder: String,
      openKey: Boolean,
      activatedKey: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        modal: false,
        treeData: [],
      }
    },
    watch: {
      openKey (val) {
        this.modal = true;
      },
      activatedKey (val) {
        this.modal = false;
      },
    },
    mounted () {
      this.getCategoryList();
    },
    methods: {
      getCategoryList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/chargeCategoryList.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              console.log(res)
              const _data = res.data.content || [];
              _vm.treeData = _vm.getTypeTree(_data, ['id', 'name']);
            } else {
              console.log(res.data.desc);
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      renderTree (h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          },
          class: 'tree-hover',
          on: {
            click: () => {
              data.expand = !data.expand;
            }
          }
        }, [
          h('span', data.name),
          h('Button', {
            style: {
              float: 'right',
              marginRight: '32px',
            },
            props: {
              type: 'primary',
              size: 'small',
              icon: 'checkmark-round'
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                this.choose(data)
              }
            }
          })
        ]);
      },
      choose (data) {
        let _data = {
          id: data.id,
          name: data.name,
        };
        this.$emit('on-change', _data);
        this.modal = false;
      },
    }
  }
</script>

