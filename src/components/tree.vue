<template>
    <ul :id="key ? 'org' : ''">
        <li v-for='child in data'>
            <a :id="child.id">{{child.name}}</a>
            <tree :data='child.childrens'></tree>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'tree',
        props: {
            data: Array,
        },
        computed: {
            key () {
                if(this.data.length > 0) {
                    if(this.data[0].id == 0) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        },
        methods: {
        }
    }

</script>