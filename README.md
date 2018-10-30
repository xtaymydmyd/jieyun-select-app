# jieyun-select-app

### app选择人员

## Install

### Install iView

npm 安装:
```
npm install iview@2.12.0
```

### Install Element-ui

npm 安装:
```
npm i element-ui@2.4.5
```

## Usage

```vue
<template>
    <button @click="select">选择部门、岗位、人员</button>
    <button @click="selectDepart">选择部门</button>
     <select-model 
        ref="selectModelRef" 
        :config=config 
        @deleteSelectTag="deleteSelectTag"
        @submitRangeList="submitRangeList"></select-model>
    <select-depart-model 
        ref="selectDepartModelRef" 
        :config=config
        @submitRangeList="submitRangeList"
        @cancelRangeList="cancelRangeList"></select-depart-model>
</template>
<script>
    import selectModel from 'components/select/selectModel.vue'
    export default {
        data () {
            return {
                config : {
                    rootNodeId : null,
                    rootNodeType : '0',
                    title : '选择人员',
                    type : 0,//0:可选部门、岗位、群组和搜索人员 1：只选择人员 ，选择部门显示部门内所有人员
                    condition : ['depart' ,'group'],
                    muliteChoice : 1//是否多选人员 1 ：多选  2：单选
                },
            }
        },
        methods:{
            select(){
                this.$refs.selectModelRef.initSelect(this.count);
            },
            selectDepart(){
                this.$refs.selectDepartModelRef.initSelect(this.count);
            },
            deleteSelectTag(item){
                console.log(item);
            },
            /**
            * 确定后返回的数据
            */
            submitRangeList(count){
                console.log(count)
            },
            /**
            * 取消后返回的数据
            */
            cancelRangeList(){
                console.log(count)
            }
        }
    }
</script>
```



