<template>
    <div class="demo" style="width:100%;height:100%;">       
        <div @click="selectStaff(1)">选择人员多选（在部门和岗位、群组中选择）</div>
        <div @click="selectStaff(2)">选择人员单选（在部门和岗位中选择）</div>
        <div @click="selectStaff(4)">选择人员多选（在群组中选择）</div>
        <div @click="selectStaff(3)">选择部门</div>

        <a href="selectionStaff.html#/editGroupList">编辑群组</a>
        <div class="list flex flex-align-items vux-1px-b" 
            v-for="item in userList" 
            :key="item.id" 
            v-if="userList.length > 0"
            >
           <div class="name flex-1 ">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
import selectMethod from 'select/assets/js/select.js'
export default {
    name: 'app',
    data(){
        return {
            userList : []
        }
    },
    components: {
    },
    mounted:function () {
        this.init();
        if(selectMethod.isFromSelectStaff()){
            console.log(selectMethod.getResult())
        }
    },
    methods:{
        
        init(){
            var length = this.$route.query.selectionStaff;
            if(length > 0){
                this.userList = common.sessionGet("selectionStaffUserList")
                
            }
        },
        selectStaff(type){
            //url : 点击确定跳转的链接
            //withUser :  是否查询用户  1：查询用户，2:不查询用户
            //deptId : 父部门id 
            //muliteChoice : 是否多选人员 1 ：多选  2：单选
            //userList : 已选人员列表
            //userTypeList : 查询人员类型列表，; 为null 的时候查询所有
            var param = {}

            if(type == 1){ 
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
                
            }else if(type == 2){
                // param = {
                //     title : '选择参会人',
                //     url : 'demo.html#/demo',
                //     withUser : 1,
                //     userTypeIdList : [], 
                //     deptId : '1',
                //     muliteChoice : 2,
                //     condition : ['depart' , 'post']
                // }
                // common.sessionSet("selectionStaffUserListEdit" , this.userList);
                // common.sessionSet("selectionStaffDeptListEdit" , []);
                // common.sessionSet("selectionStaff" , param);
                
                // window.location.href = 'selectionStaff.html#/index'
                this.$router.push({ 
                    name : 'index',
                    path : '/index' , 
                    query : { 
                        deptId : '082ca649198a48aa958bbc406c2dcfda',//父部门id 
                        withUser : 1, //是否查询用户  1：查询用户，2:不查询用户
                        muliteChoice : 2,//是否多选人员 1 ：多选  2：单选
                        title : '选择参会人',//标题
                        userTypeIdList : [], //用户类型列表
                        condition : ['depart' , 'post' , 'group'],
                        callbackUrl : "demo.html#/demo"
                    }
                });
            }else if(type == 3){
                param = {
                    title : '选择部门',
                    url : 'demo.html#/demo',
                    withUser : 2,
                    userTypeIdList : [], //
                    deptId : '1',
                    muliteChoice : 1,
                    condition : ['depart'],
                }
            }else if(type == 4){
                param = {
                    title : '选择人员',
                    url : 'demo.html#/demo',
                    withUser : 1,
                    userTypeIdList : [], //
                    deptId : '1',
                    muliteChoice : 1,
                    condition : ['depart' , 'post','group'],
                }
            }
            // common.sessionSet("selectionStaffUserListEdit" , this.userList);
            // common.sessionSet("selectionStaffDeptListEdit" , []);
            // common.sessionSet("selectionStaff" , param);
            
            // window.location.href = 'selectionStaff.html#/index'
        }
        
    },
}
</script>
