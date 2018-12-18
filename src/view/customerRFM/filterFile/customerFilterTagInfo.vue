/**
 * 标签查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>标签查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="标签：" prop='tagIds'>
                    <Row :gutter="100">
                        <Col span="16">
                            <div class="tagBox">
                                <div class="tagItem" v-for='(item, index) in tagList' :key='item.name' @click.capture='remove(index)'>
                                    <Tag type="border" closable color="blue">{{item.name}}</Tag>
                                </div>
                            </div>
                        </Col>
                        <Col span="4">
                            <Button type="primary"  icon="search" @click='show'>选择</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="search" @click='search'>查询</Button>
                <Button type="primary"  icon="refresh" @click="handleReset('formAdd')">重置</Button>
            </div>
        </div>
        <Modal
            title="选择标签"
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter="getSearch"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getSearch"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modal: false,
                formSearch: {
                    name: '',
                },
                formAdd: {
                    tagIds: '',
                },
                tagList: [],
                col: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                ],
                data: [],
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.getSearch()
        },
        methods: {
            getSearch () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/tagList.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            show () {
                this.modal = true
            },
            choose (data) {
                let _bool = true
                this.tagList.map(item => {
                    if(item.id == data.id) {
                        _bool = false
                    }
                })
                if(_bool) {
                    this.tagList.push(data)
                }
                this.modal = false
            },
            remove (index) {
                this.tagList.splice(index, 1)
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
                let _box = []
                this.tagList.map(item => {
                    _box.push(item.id)
                })
                this.formAdd.tagIds = _box.join(',')
                sessionStorage.setItem('filterSearch', JSON.stringify(this.formAdd))
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/basicEdit',
                    query: {
                        type: '9'
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                if(name == 'formAdd') {
                    this.tagList = []
                } else {
                    this.getSearch()
                }
            }
        }
    }
</script>

<style scoped>
    .tagBox .tagItem {
        display: inline-block;
        padding: 2px 5px;
    }
</style>


