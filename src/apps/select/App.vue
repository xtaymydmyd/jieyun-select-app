<template>
    <div id="app" class="selectionStaff" v-bind:class="{ WeChat: isWeChat }">        
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
     data(){
        return {
            isWeChat : constGlobal.isWeChat()
        }
    },
    components: {
    },
    mounted:function () {
        
    },
    methods:{
        
    },
}
</script>

<style lang="scss">
    @import "~select/assets/css/public.scss";
    @import "~select/assets/css/1px.scss";
    @import "~assets/css/flexComp.scss";
    .selectionStaff{
        width:100%;
        height:100%;
    }
</style>
