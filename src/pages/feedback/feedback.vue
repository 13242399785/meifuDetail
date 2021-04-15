<template>
    <div class="feedback-wapper">
        <van-nav-bar left-arrow
  @click-left="onClickLeft" class="top-title" title="反馈信息" fixed="true" placeholder="true"></van-nav-bar>
        <!-- <h2 class="van-doc-demo-block__title">当前产品使用状况</h2> -->
        <van-field name="uploader" label="脸部图片">
            <template #input>
                <van-uploader multiple='true' :after-read="afterRead"  v-model="nowData.Head"  accept="image/*" />
            </template>
        </van-field>
        <!-- <h2 class="van-doc-demo-block__title">反馈内容</h2> -->
        <van-field name="radio" label="最近1周干油情况">
            <template #input>
                <van-radio-group v-model="nowData.Feedbackstate" direction="horizontal">
                    <van-radio class="margin-b" name="偏干">偏干</van-radio>
                    <van-radio class="margin-b" name="偏油">偏油</van-radio>
                    <van-radio class="margin-b" name="又干又油">又干又油</van-radio>
                    <van-radio class="margin-b" name="不干不油">不干不油</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <div>
            <van-field
                v-model="nowData.Feedbacktxt"
                type="textarea"
                autosize
                max-height='200'
                label="最近1周皮肤感受"
                placeholder="填写最近1周完整的皮肤感受，症状变化等等，越详细越好！"
            />
        </div>
         <h2 class="van-doc-demo-block__title" v-if="proList.length>0">产品是否使用完</h2>
        <!-- 是否使用彩妆 -->
        <van-field name="radio" :label="item.Productname" v-for="(item,index) in proList" :key="index">
            <template #input>
                <van-radio-group v-model="item.Usage" direction="horizontal">
                <van-radio name="0">快用完</van-radio>
                <van-radio name="1">还有很多</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <div class="btn-commit" >
            <van-button round block type="info" @click="commit">确认反馈</van-button>
        </div>
        <div class="mianze" style="padding-bottom:70px;">
            《免责声明》
        </div>
        <div class="load-wapper" v-if="loadShow">
            <van-loading size="24px" color="#fff" >加载中...</van-loading>
        </div>
        
        <footers :pid="programId" :openId="nowOpenid" v-show="footerShow"></footers>
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    import footers from '@/components/footer/footers'
    import { Toast } from 'vant';//引入ui提示
    import Exif from 'exif-js'
    export default{
        components:{footers},
        name:'home',
        props:['pid'],
        data(){
            return{
                nowData:{
                    "Feedbacktxt":'',
                    "Feedbackstate":'',
                    "Head":[]
                },
                proList:[],
                HeadList:[],
                lbformData:new window.FormData(),
                loadShow:false,
                programId:this.$route.params.id,
                nowOpenid:this.$route.params.index,
                footerShow:true

            }
        },
        mounted(){
             this.getFeedback()
        },
        methods:{
            //获取反馈信息
            getFeedback(){
                let that=this;
                this.$api.getFeedback(this.$route.params.id).then(res=>{
                    let nowd=res.data.Data
                    that.proList=res.data.Data.productlist
                    if(nowd.Massage=='填写反馈'){
                       that.$api.tip('请填写反馈！')
                    }else{
                        Dialog.alert({
                            message: nowd.Massage,
                            theme: 'round-button',
                        }).then(() => {
                            that.$router.go(-1);
                            // that.getFeedback()   
                        });
                    }
                    // console.log(nowd)
                }).catch((error) => {
                    console.error(error);
                })   
            },
            onClickLeft(){
                 this.$router.go(-1);
            },
            // 处理图片
            imgPreview(file,photoType) {
                // console.log(file)
                let self = this
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function () {
                    Orientation = Exif.getTag(this, "Orientation");
                    // 看支持不支持FileReader
                    if (!file || !window.FileReader) return
                    if (/^image/.test(file.type)) {
                        // 创建一个reader
                        let reader = new FileReader()
                        // 将图片2将转成 base64 格式
                        reader.readAsDataURL(file)
                        // 读取成功后的回调
                        reader.onloadend = function() {
                        let result = this.result
                        let img = new Image()
                        img.src = result
                        //判断图片是否大于1000K,不是就直接上传，反之压缩图片
                        if (this.result.length <= 300 * 1024) {
                            // 上传图片
                            self.postImg(this.result,photoType,file.name);
                        } else {
                            img.onload = function() {
                                let data = self.compress(img,Orientation)
                                // 上传图片
                            self.postImg(data,photoType,file.name);
                            }
                        }
                        }
                    }
                });
            },
            // 压缩图片
            compress(img, Orientation) {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                //瓦片canvas
                let tCanvas = document.createElement('canvas')
                let tctx = tCanvas.getContext('2d')
                // let initSize = img.src.length;
                let width = img.width
                let height = img.height
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio
                if ((ratio = (width * height) / 4000000) > 1) {
                    ratio = Math.sqrt(ratio)
                    width /= ratio
                    height /= ratio
                } else {
                    ratio = 1
                }
                canvas.width = width
                canvas.height = height
                // 铺底色
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                //如果图片像素大于100万则使用瓦片绘制
                let count
                if ((count = (width * height) / 1000000) > 1) {
                    // console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
                    //      计算每块瓦片的宽和高
                    let nw = ~~(width / count)
                    let nh = ~~(height / count)
                    tCanvas.width = nw
                    tCanvas.height = nh
                    for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                    }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height)
                }
                //修复ios上传图片的时候 被旋转的问题 
                // if (Orientation != "" && Orientation != 1) {
                //     switch (parseInt(Orientation)) {
                //     case 6: //需要顺时针（向左）90度旋转
                //         this.rotateImg(img, "left", canvas);
                //         break;
                //     case 8: //需要逆时针（向右）90度旋转
                //         this.rotateImg(img, "right", canvas);
                //         break;
                //     case 3: //需要180度旋转
                //         this.rotateImg(img, "right", canvas); //转两次
                //         this.rotateImg(img, "right", canvas);
                //         break;
                //     }
                // }
                //进行压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1)
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata
            },
            // 旋转图片
            rotateImg(img, direction, canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0
                const max_step = 3
                if (img == null) return
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height
                let width = img.width
                let step = 2
                if (step == null) {
                    step = min_step
                }
                if (direction == 'right') {
                    step++
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step)
                } else {
                    step--
                    step < min_step && (step = max_step)
                }
                //旋转角度以弧度值为参数
                let degree = (step * 90 * Math.PI) / 180
                let ctx = canvas.getContext('2d')
                switch (step) {
                    case 0:
                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(img, 0, 0)
                    break
                    case 1:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate(degree)
                    ctx.drawImage(img, 0, -height)
                    break
                    case 2:
                    canvas.width = width
                    canvas.height = height
                    ctx.rotate(degree)
                    ctx.drawImage(img, -width, -height)
                    break
                    case 3:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate(degree)
                    ctx.drawImage(img, -width, 0)
                    break
                }
            },
            //将base64转换为文件
            dataURLtoFile(dataurl,fileName) {
                var arr = dataurl.split(','),
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], fileName, {
                    type:"image/jpeg"
                })
            },
            // 提交图片到后端
            postImg(base64,type,fileName) {
                let file = this.dataURLtoFile(base64,fileName)
                let formData = new window.FormData();
                // console.log(file)
                if(type=='fk'){//反馈图片
                    this.HeadList.push(file)
                    this.lbformData.append('files', file)
                    if(this.nowData.Head.length==this.HeadList.length){//上传
                        this.uploadImg(this.lbformData,'fk')
                    }      
                }
            },
            lbImgU(){
                let formData = new window.FormData()
                if(this.nowData.Head.length==0){
                    return false;
                }
                for(let i=0;i<this.nowData.Head.length;i++){
                    this.imgPreview(this.nowData.Head[i].file,"fk")
                    // formData.append('files', this.nowData.Head[i].file)
                }
                // this.uploadImg(formData,"fk")
            },
            //确定上传图片
            uploadImg(data,type){
                let formData=data,that=this;
                let config={
                    headers:{"Content-Type":"multipart/form-data"}
                }
                that.loadShow=true
                this.$axios.post(this.$api.serverUrl+'/api/Img/UpLoadImg'+'?openid='+this.$route.params.index+'&type='+type+'&Programid='+this.$route.params.id,formData,config).then(res=>{
                    if(res.data){
                        that.$api.tip('反馈成功！') 
                        setTimeout(function(){
                            that.$router.go(-1);
                        },1500)
                    }
                    that.loadShow=false
                })
            },
            //提交反馈
            commit(){
                // this.lbImgU();
                //初始化图片
                this.HeadList=[];
                this.lbformData=new window.FormData();
                let that=this;
                let parsem={
                    "Id": 0,
                    "Programid": this.$route.params.id,
                    "Feedbacktime":'',
                    "Feedbacktxt": this.nowData.Feedbacktxt,
                    "Feedbackstate":this.nowData.Feedbackstate,
                    "Head": "",
                    "Profile": "",
                    "Partial": "",
                    "FbpList": []
                }
                
                for(let i=0;i<this.proList.length;i++){
                     parsem.FbpList.push({"Id":0,"Feedbackid":0,"Productid":this.proList[i].Id,"Finished":this.proList[i].Usage})
                }
                if(parsem.Feedbackstate==''){
                    this.$api.tip('请先选择反馈感受！')
                    return false;
                }
                if(parsem.Feedbacktxt==''){
                    this.$api.tip('请先填写反馈内容！')
                    return false;
                }
                
                this.loadShow=true;
                this.$api.addFeedback(parsem).then(res=>{
                     that.loadShow=false
                     if(res.data.Code==0){
                         that.lbImgU();
                        // that.$api.tip('反馈成功！') 
                        // setTimeout(function(){
                        //     that.$router.go(-1);
                        // },1500)
                    }else{
                        //错误
                        Dialog.alert({
                            message: res.data.Msg,
                            theme: 'round-button',
                            }).then(() => {
                                // on close
                        });
                    }
                }).catch((error) => {
                    that.loadShow=false
                    console.error(error);
                }) 
            },
        }
    }
</script>
<style lang="scss">
     @import '../../../static/scss/common.scss';
     .feedback-wapper{
         height: 100%;
         overflow:auto;
         .van-nav-bar .van-icon{
             color: #fff
         }
         .margin-b{
             margin-bottom: 10px
         }
     }
</style>
