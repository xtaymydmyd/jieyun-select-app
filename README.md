# jieyun-select-app

### app选择人员

## Install

### Install iView

npm 安装:
```
npm install iview@2.12.0
```

## Usage

在apps下增加 select(选择人员) 文件夹

```vue
<template>
    <div @click="selectStaff(1)">选择人员多选（在部门和岗位、群组中选择）</div>
</template>
<script>
    import selectModel from 'components/select/selectModel.vue'
    export default {
        data () {
            return {
                
            }
        },
        methods:{
            selectStaff(type){
                //url : 点击确定跳转的链接
                //withUser :  是否查询用户  1：查询用户，2:不查询用户
                //deptId : 父部门id 
                //muliteChoice : 是否多选人员 1 ：多选  2：单选
                //userList : 已选人员列表
                //userTypeList : 查询人员类型列表，; 为null 的时候查询所有
                var param = {}

                var param = { 
                    deptId : '1',//父部门id 
                    deptIdList : [{
                        "id":"0017d5a752ce4175a0f8f8b0b9a14a14",
                        "nodeType":"1"
                    },{
                        "id":"1",
                        "nodeType":"0"
                    }],
                    withUser : 1, //是否查询用户  1：查询用户，2:不查询用户
                    muliteChoice : 1,//是否多选人员 1 ：多选  2：单选
                    title : '选择参会人',//标题
                    ignoreOneself : 1,//是否忽略自己 ，忽略：1；不忽略：其他 
                    userTypeIdList : [], //用户类型列表
                    condition : ['depart' , 'post' , 'group'],
                    userList : [{
                        'name' : '锁生斌',
                        'id' : '4732b1f78af711e89ff5c790f4588ec7'
                    }],
                }
                selectMethod.toSelect(param);  
            }
        }
    }
</script>
```



