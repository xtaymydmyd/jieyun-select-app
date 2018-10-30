<template>
    <div class="demo">       
        <visibile-range-model 
            ref="visibileRangeModel"
            @submitRangeList = "submitRangeList"
            @cancelRangeList = "cancelRangeList">
        </visibile-range-model>
    </div>
</template>

<script>
import visibileRangeModel from 'components/visibileRange/visibileRangeModel.vue'
export default {
    name: 'app',
    data(){
        return {
        }
    },
    components: {
        visibileRangeModel
    },
    methods:{
        submitRangeList(){

        },
        cancelRangeList(){
            
        }
    },
}
</script>
