import cmptBreadcrumb from 'components/breadcrumb.vue';
import cmptMenu from 'components/menu.vue';
import cmptHospChooseUser from 'components/hospChooseUser.vue';
import cmptDeptChooseUser from 'components/deptChooseUser.vue';
import cmptProductChoose from 'components/productChoose.vue';
import cmptCategoryChoose from 'components/categoryChoose.vue';
import cmptSupplierChoose from 'components/supplierChoose.vue';
import cmptUeditor from 'components/Ueditor.vue';
import cmptRemoteFilterChannel from 'components/remoteFilterChannel.vue';
import cmptRemoteFilterStore from 'components/remoteFilterStore.vue';
import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
import cmptInputOpen from 'components/inputClearable.vue';
import cmptInputNumber from 'components/inputNumber.vue';

const cmpt = {
    cmptBreadcrumb,
    cmptMenu,
    cmptHospChooseUser,
    cmptDeptChooseUser,
    cmptProductChoose,
    cmptCategoryChoose,
    cmptSupplierChoose,
    cmptUeditor,
    cmptRemoteFilterChannel,
    cmptRemoteFilterStore,
    cmptChooseUserSinger,
    cmptInputOpen,
    cmptInputNumber
};

// exports.install = function (Vue, options) { 

//     Object.keys(cmpt).forEach(function(key) {
//         Vue.component(key, cmpt[key]);
//     });
// }
export default {
    install: function (Vue, options) { 
        Object.keys(cmpt).forEach(function(key) {
            Vue.component(key, cmpt[key]);
        });
    }
};