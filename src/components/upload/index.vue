<template>
    <div class="upload">
        <div class="clip-wp" v-show="panelVisible">
            <x-button type="primary" :mini="true" id="button" @click.native="crop">确定</x-button>
            <div>
                <img id="image" :src="url" alt="Picture">
            </div>
        </div>
         <div v-if="isWechat">
            <input type="file" ref="changeInput" accept="image/*" @change="upload">
        </div>
        <!-- <img v-if="imgUrl" :src="sourceUrl + imgUrl" id="img"> -->

        <popup v-model="photoShowVisible" popup-transition="popup-fade" position="bottom">
            <cell @click.native="byMobile()" style="color:#333;background:#fff;text-align:center;">
                <div slot="title" style="text-align:center;" >拍照</div>
            </cell>
            <cell @click.native="byAlbum()" style="color:#333;background:#fff;text-align:center;">
                <div slot="title" style="text-align:center;">从相机中选择</div>
            </cell>
            <group>
                <cell @click.native="cancelBtn()" style="color:#333;background:#fff;text-align:center;">
                    <div slot="title" style="text-align:center;">取消</div>
                </cell>
            </group>
        </popup>
    </div>
    
</template>
<script>
import { XButton , TransferDomDirective as TransferDom , Loading ,Popup,Cell,Group} from 'vux'
import Cropper from 'cropperjs';
import lrz from 'lrz';
export default {
    data(){
        return{
            sourceUrl : constGlobal.HostImgUrl,
            cropper : '',
            croppable : false,
            panelVisible : false,
            url : '',
            postHeaderImg : '',
            loadingText : '图片上传中...',
            isWechat : constGlobal.isWeChat(),                     //判断是否是微信
            photoShowVisible : false,             //图片上传弹框是否显示
            isCancel : false,
            imgUrl : ''
        }
    },
    components:{
        XButton,
        Loading,
        Popup,Cell,Group
    },
    directives: {
        TransferDom
    },
    mounted(){
        /**
         * 初始化裁剪框
        */
        var self = this;
        var image = document.getElementById('image');
        this.cropper = new Cropper(image, {
            aspectRatio: 144/192,
            viewMode: 1,
            background:false,
            zoomable:true,
            cropBoxResizable:false,         //是否可以调整裁剪框的大小
            minCropBoxWidth:144,            //裁剪层的最小宽度
            minCropBoxHeight:192,           //裁剪层的最小高度
            dragMode:'move',                //可以拖动图片
            ready: function () {
                self.croppable = true;
            }
        });
    },
    methods:{
         /**
         * 选择图片
        */
        upload (e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.url = this.getObjectURL(files[0]);
            if(this.cropper){
                this.cropper.replace(this.url);
            }
            this.panelVisible = true;
        },
        /**
         * 显示图片点击上传弹出框
        */
        showFileSelect(){
            if( this.isCancel == false){
                this.photoShowVisible = true;
            }else{
                this.isCancel = !this.isCancel;
            }
        },
        /**
         * 取消选择图片
        */
        cancelBtn(){
            this.photoShowVisible = false;
            this.isCancel = !this.isCancel;
        },
        /**
         * 拍照
        */
        byMobile: function() {
            this.photoShowVisible = false;
            navigator.camera.getPicture(this.takePictureSuccess, this.takePictureFail, {
                quality: 100,
                allowEdit:false,
                correctOrientation: true,
                saveToPhotoAlbum: false,
                destinationType: Camera.DestinationType.FILE_URI
            });
        },
        /**
         * 从相机中选择
        */
        byAlbum: function() {
            this.$parent.photoShowVisible = false;
            navigator.camera.getPicture(this.takePictureSuccess, this.takePictureFail, {
                quality: 100,
                allowEdit:false,
                correctOrientation: true,
                saveToPhotoAlbum: false,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                destinationType: Camera.DestinationType.FILE_URI
            });
        },
        /**
         * 获取图片成功
        */
        takePictureSuccess:function( imageData){
            var _this = this;
            let options = {
                quality: 80,
                widthRatio:144,
                heightRatio:192,
            }
            plugins.crop( function success( url ){
                url = url.split('?');
                _this.uploadImgApp( url[0] )
            },function fail( err ){
            },imageData , options)
        },
        /**
         * 获取图片失败
        */
        takePictureFail:function(err){
            common.toastMsg('获取图片失败');
        },
        /**
         * app图片上传
        */
        uploadImgApp( fileUrl){
            var _this = this;
            var url = constGlobal.HostFileUpload + 'uploadImg';
            var options = new FileUploadOptions();
            var name = fileUrl.substring( fileUrl.lastIndexOf('/')+1);
            options.chunkedMode = false;  
            options.fileKey = "file";  
            options.fileName = name.indexOf("?")>=0 ? name.substring(0,name.indexOf("?")) : name;  
            options.mimeType = "image/jpeg";  
            options.httpMethod = "POST";  

            var fileTransfer = new FileTransfer();
            var successCallback = function( r){
                _this.photoShowVisible = false;
                var res = JSON.parse( r.response )
                if( res.status == 0){
                    _this.imgUrl = res.data;
                }
            }
            var errorCallback = function( error){
                _this.photoShowVisible = false;
                common.toastMsg('图片上传失败')
            }
            fileTransfer.upload(
                fileUrl,
                encodeURI(url),  //服务器上传的路径  
                successCallback,  //成功的回调  
                errorCallback,    //失败的回调  
                options);         //配置项  
        },
       
        /**
         * dataURL转blob
        */
        dataURLtoFile(dataurl,filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr],filename, {type:mime});
        },
        /**
         * 裁剪
        */
        crop () {
            this.panelVisible = false;
            var croppedCanvas;
            var roundedCanvas;
            if (!this.croppable) {
                return;
            }
            croppedCanvas = this.cropper.getCroppedCanvas();
            roundedCanvas = this.getRoundedCanvas(croppedCanvas);
            this.postHeaderImg = roundedCanvas.toDataURL('image/png');
            var file = this.dataURLtoFile(this.postHeaderImg,'headerImg.png')
            lrz( file ,{
                quality:0.8
            }).then( res=>{
                let url = constGlobal.HostFileUpload + 'uploadImg'
                http.apiPost( url , res.formData ).then( res=>{
                    if( res.status == 0){
                        this.imgUrl = res.data;
                        if( res.data ){
                            this.updateExamRegistrationUserInfoPo();
                        }
                    }else{
                        common.toastMsg( res.message )
                    }
                })
            }).catch( err=>{
                common.toastMsg('图片上传失败，请稍后重试！');
            })
        },
       
    }
}
</script>
<style lang="scss">
    @import '~components/upload/clipper.scss';
    .vux-popup-dialog{
        .weui-cell{
            padding:12px 15px;
        }
        .vux-no-group-title{
            margin-top:5px !important;
        }
    }
    .clip-wp{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        z-index: 11;
        background-color: #000;
        text-align: center;
        button{
            position: absolute;
            z-index: 99;
            right: 20px;
            top: 30px;
        }
    
    }
</style>

