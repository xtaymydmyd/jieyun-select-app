<template>
    <div class="demo">       
        <VueUEditor @ready="editorReady" style="height:200px;margin-top:10px;margin-left: 10px;margin-right: 10px;"></VueUEditor>
    </div>
</template>

<script>

import VueUEditor from 'components/UEditor/UEditor';
export default {
    name: 'app',
    data(){
        return {
        }
    },
    components: {
        VueUEditor
    },
    mounted:function () {
        
    },
    methods:{
        /**
         * 编辑ueditor-ready
        */
        editorReady(editorInstance){
            var _this = this;
            this.editorInstance = editorInstance;
            editorInstance.addListener('contentChange', () => {
            })

        },
    },
}
</script>
