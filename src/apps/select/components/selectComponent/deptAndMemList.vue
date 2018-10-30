<template>
    <div class="selectionStaffList flex flex-direction-column">  
        <div class="flex-1 overflowYScroll selectionStaffContainer">
            <div 
                style="text-align:center;margin:10px 0px 15px 0px;"
                v-if="(type == 'depart' && !deptLoading) || (type == 'post' && !postLoading)">
                <inline-loading ></inline-loading>&nbsp;加载中
            </div>
            <div class="list-wrap ">
                <div class="vux-1px-t" v-show="(type == 'depart' && withUser == 1 && deptLoading && deptInfoList.length > 0 && userList.length > 0 )||(type == 'depart' && withUser == 2 && deptLoading && deptInfoList.length > 0 )"></div>
                <!-- 部门列表 -->
                <div class="list flex flex-align-items vux-1px-b"
                    v-for="(item , index) in deptInfoList" 
                    :key="item.id" 
                    v-if="type == 'depart' && deptLoading && deptInfoList.length > 0"
                    >
                    <div class="select-left" 
                        @click="selectStaff(item , index , 'depart')" 
                        v-if="muliteChoice != 2 " >
                        <i class="weui-icon weui_icon_circle weui-icon-circle" v-if=" item.nodeType != '0'" :class="{ 'weui_icon_success weui-icon-success' : item.selected , ' weui_icon_circle weui-icon-circle' : !item.selected }" style="" ></i>
                        <!-- <div class="weui_icon_circle_disabled" v-if="item.nodeType == '0'"></div> -->
                    </div>
                    <div class="flex flex-1 flex-align-items" @click="toModule(item , index)">
                        <div class="left">
                            <i class="fa fa-folder-open"></i>
                        </div>
                        <div class="name flex-1 textLineClamb1">{{item.name}} <span v-if="item.userIds">({{item.userIds.length}})</span></div>
                        <div class="arrow">
                            <x-icon type="ios-arrow-right" size="15"></x-icon>
                        </div>
                    </div>
                </div>
                
                <!-- 人员列表 -->
                <div class="list flex flex-align-items vux-1px-b"
                    v-for="(item , index) in userList" 
                    :key="item.id" 
                    @click="selectStaff(item , index , 'user')"
                    v-if="userList.length > 0 && withUser == 1"
                    >
                    <div class="select-left">
                        <i class="weui-icon weui_icon_circle weui-icon-circle" 
                            :class="{ 'weui_icon_success weui-icon-success' : item.selected , ' weui_icon_circle weui-icon-circle' : !item.selected}" style="" ></i>
                    </div>
                    <div class="flex flex-1 flex-align-items">
                        <div class="left flex flex-align-items">
                            <img src="~select/assets/img/headmr.png" class="icon" style="width:100%;height:100%;" v-if="item.headImgUrl == null || item.headImgUrl == ''">
                            <img :src="HostSource + item.headImgUrl " class="icon headImg" style="width:100%;height:100%;" v-if="!(item.headImgUrl == null || item.headImgUrl == '')">
                        </div> 
                        <div class="name flex-1 ">{{item.name}}</div>
                    </div>
                </div>
                 <no-data-tip 
                    :msg="msg" 
                    :showFlag="(type == 'depart' && withUser == 1 && deptLoading && deptInfoList.length == 0 && userList.length == 0)|| (type == 'depart' && withUser == 2 && deptLoading && deptInfoList.length == 0 )" 
                    top="80"></no-data-tip>
            </div>
        </div>
    </div>
</template>

<script>
import bus from 'select/assets/js/bus.js'
import { XHeader , Group , Cell ,InlineLoading } from 'vux'
import noDataTip from 'select/components/NoDataTip/NoDataTip.vue'
export default {
    name: 'app',
     data(){
        return {
            selectionStaffCondition : common.sessionGet("selectionStaff"),
            title : "选择",
            deptId : '',
            deptInfoList : [], //部门列表
            deptAndUserIdsList : [],
            deptLoading : false,
            type : '',
            
            userIds : [],
            selectUserIds : [], //选择或取消选择人员列表
            userList : [] , //人员列表

            postLoading : false,
            sourceUrl : constGlobal.HostSource,
            msg : '',
            withUser : 1, //是否查询用户  1：查询用户，2:不查询用户
            muliteChoice : 1,
            ignoreUserIdList : [],
            HostSource : constGlobal.HostSource,
            deptIdList : []
        }
    },
    components: {
        XHeader,
        Group,
        Cell,
        noDataTip,
        InlineLoading
    },
    mounted:function () {
        bus.$on('changeSelectInfo', function(param) {
            this.updatSelectStatus(param)
        }.bind(this)) 
    },
    methods:{
        init(param){
            this.type = param.type;
            this.deptId = param.deptId;
            this.deptIdList = param.deptIdList ? param.deptIdList : [];
            this.withUser = param.withUser;
            this.muliteChoice = param.muliteChoice;
            this.userTypeIdList = param.userTypeIdList;
            this.ignoreOneself = param.ignoreOneself;
            this.ignoreUserIdList = param.ignoreUserIdList && param.ignoreUserIdList.length > 0 ? param.ignoreUserIdList : [];

            this.$nextTick(function() {
                bus.$emit("changeTitle", param.title);
            })
            this.initInfo();
        },
        /**
         * 初始化页面数据
        */
        initInfo(){
            this.msg = this.withUser == 1 ? '未查询相关部门或人员信息' : '未查询相关部门';
            this.deptLoading = false;
            this.deptInfoList = [];
            this.userIds = [];
            this.userList = [];

            // var flag = false;
            // var paramIdList = common.sessionGet("selectionStaffDeptIdList");
            // for(var i = 0 ; i < paramIdList && paramIdList.length ; i++){
            //     for(var j = 0 ; j < this.deptIdList.length ; j++){
            //         if(paramIdList[i].id == this.deptIdList[j].id){
            //             flag = true;
            //             break;
            //         }
            //     }
            // }
            if(this.deptIdList.length > 0){ //查询传入的部门id的信息
                this.queryDepaIdListInfo()
            }else{//查询传入的子部门的信息
                this.queryChildDeptAndSelfMember();
            }
        },
        /**
         * 查询部门信息
        */
        queryDepaIdListInfo(){
             var url = constGlobal.HostStaffOrg + 'corpOrDept/search';

            if( !this.deptId && !this.deptIdList){
                this.postLoading = true;
                this.msg = '出错啦';
                return 
            }
            var param = this.deptIdList
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    if(res.data){
                        this.deptInfoList = res.data;
                        
                        this.deptInfoList.forEach(item => {
                            item.selected = false;
                        })
                        if(this.withUser == 1){ //选择人员
                        }else{
                            this.determineDeptSelectStatus();
                        }
                        this.deptLoading = true;
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        /**
         *  查询子级部门(不包含孙级)和成员(该部门)
        */
        queryChildDeptAndSelfMember(){
            var url = constGlobal.HostStaffOrg + 'childDeptAndSelfMember/search';

            if( !this.deptId && !this.deptIdList){
                this.postLoading = true;
                this.msg = '出错啦';
                return 
            }
            var param = {
                deptId : this.deptId,
                deptIdList : this.deptIdList,
                withUser : this.withUser, //0不查询用户
  	            userTypeIdList : this.userTypeIdList,
            }
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    if(res.data){
                        this.deptInfoList = res.data.deptInfoVoList;
                        console.log(this.deptInfoList);
                        this.userList = res.data.userInfoList;
                        this.deptInfoList.forEach(item => {
                            item.selected = false;
                        })
                        if(this.withUser == 1){ //选择人员
                            this.userList.forEach(item => {
                                item.selected = false;
                            })
                            this.determineUserSelectStatus();
                            this.querymemberFillUpDept();
                        }else{
                            this.determineDeptSelectStatus();
                        }
                        this.deptLoading = true;
                        // if(this.deptInfoList.length == 0 && this.userList.length == 0){
                        //     this.deptLoading = false;
                        // }
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        /**
         * 判断部门是否被选中
        */
        determineDeptSelectStatus(){
            var deptList = this.$parent.$refs.resultRef.deptList;
            for(var i = 0 ; i < this.deptInfoList.length ; i++){
                for(var j = 0 ; j < deptList.length ; j++){
                    if(this.deptInfoList[i].id == deptList[j].id){
                        this.deptInfoList[i].selected = true;
                    }
                }
            }
        },
        /**
         * 判断人员是否被选中
        */
        determineUserSelectStatus(){
            var userList = this.$parent.$refs.resultRef.userList;
            if(userList.length == 0){
                return;
            }
            for(var i = 0 ; i < userList.length ; i++){
                for(var j = 0 ; j < this.userList.length ; j++){
                    if(userList[i].id == this.userList[j].id){
                        this.userList[j].selected = true;
                    }
                }
            }
        },
        /**
         * 根据人判断哪些部门是否选中
        */
        querymemberFillUpDept(){
        
            var _this = this;
            var url = constGlobal.HostStaffOrg + 'memberFillUpDept/search';
            var userList = this.$parent.$refs.resultRef.userList;
            this.selectDepartList = [];
            if(userList.length == 0){
                return;
            }
            var ids = [];
            userList.forEach( item => {
                ids.push(item.id);
            })
            var param = {
                userIdList : ids,   //必传
  	            userTypeIdList : [] //可为空
            }
            if(this.ignoreOneself == 1){
                param.ignoreUserIdList = this.ignoreUserIdList
            }
            
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    if(res.data){
                        this.selectDepartList = res.data;
                        this.determineDepartSelectStatus();
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        /**
         * 判断部门是否被选中
        */
        determineDepartSelectStatus(){
            var _this = this;
            var flag = false;
            this.deptInfoList.forEach(item =>{
                item.selected = false;
            })
            if(this.selectDepartList.length > 0){
                for(var i = 0 ; i < this.selectDepartList.length ; i++){
                    for(var j = 0 ; j < this.deptInfoList.length ; j++){
                        if(this.selectDepartList[i] == this.deptInfoList[j].id){
                            this.deptInfoList[j].selected = true;
                            flag = true;
                        }
                    }
                }
            }else{
                flag = true;
            }
            if(!flag) return;
            this.deptInfoList.push();
        },
        /**
         * 删除用户并修改相关状态
        */
        updatSelectStatus(param){
            this.changeUserListSelect(param);
            this.querymemberFillUpDept();
        },
        /**
         * 修改用户状态
        */
        changeUserListSelect(param){
            if(this.userList.length == 0){
                return;
            }
            for(var i = 0 ; i < this.userList.length ; i++){
                if(param.id == this.userList[i].id){
                    this.userList[i].selected = false;
                    break;
                }
            }
            this.userList.push();
        },
        /**
         * 如果是部门
        */
        toModule(item , index){
            var param = {
                title : item.name,
                type : 'depart',
                deptId : item.id
            }
            this.$parent.changeLevel('add' , param);
        },
        /**
         * 选择或取消选择人员
        */
        selectStaff(item , index , type){
            switch (type) {
                case 'depart':
                    if(item.nodeType == '0'){
                        return;
                    }
                    if(this.withUser == 1){
                        this.selectStaffFromDepart(item , index);
                    }else{
                        this.selectStaffDepart(item , index);
                    }
                    break;
                case 'user':
                    this.selectStaffFromUser(item , index);
                    break;
                default:
                    console.log("default")
            }
        },
        /**
         * 选择或取消选择部门 - withUser = 2 不选人
        */
        selectStaffDepart(item , index){
            this.deptInfoList[index].selected = !this.deptInfoList[index].selected;
            this.deptInfoList.push();
            var param = {
                deptList : [item],
                type : this.deptInfoList[index].selected 
            }
            bus.$emit('operaStaffDepart' , param) 
        },
        /**
         * 选择或取消选择部门
        */
        selectStaffFromDepart(info , index){
            var _this = this;
            this.selectUserIds = [];
            this.queryChildrenDeptAndMember(index , info.id)
        },
        queryChildrenDeptAndMember(index , id ){
            var url = constGlobal.HostStaffOrg + 'childrenDeptAndMember/search';
            var param = {
                deptId : id,
                withUser : this.withUser, //0不查询用户
                deptMaximum : 1000, // 设置部门返回值数量限制
  	            userMaximum : 1000 //设置部门返回值数量限制
            }
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    this.deptInfoList[index].selected = !this.deptInfoList[index].selected;
                    this.deptInfoList.push();
                    var param = {
                        userList : res.data.userInfoList,
                        type : this.deptInfoList[index].selected
                    }
                    bus.$emit('operaStaff' , param) 
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        
        /**
         * 根据选择部门下ids获取用户详情
        */
        queryUserAccordionDptIds(status , ids){
            var url = constGlobal.HostStaffOrg + 'userBaseInfo/search';
            var param = {
                ids : ids,
            }
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    if(res.data.length > 0){
                        var param = {
                            userList : res.data,
                            type : status
                        }
                        bus.$emit('operaStaff' , param) 
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        /**
         * 选择或取消选择人员
        */
        selectStaffFromUser(info , index){
            if(this.muliteChoice == 2){
                this.clearSelectStaffSelect(info);
            }
            this.userList[index].selected = !this.userList[index].selected;
            this.userList.push();
            var param = {
                userList : [ info ],
                type : this.userList[index].selected
            }
            bus.$emit('operaStaff' , param) 
        },
        /**
         * 清队已选择人中
        */
        clearSelectStaffSelect(info){
            this.userList.forEach(item => {
                if(item.selected && item.id != info.id){
                    item.selected = false;
                }
            })
        }
    },
}
</script>
<style lang="scss">
    @import "~select/assets/css/selection.scss";
</style>


  