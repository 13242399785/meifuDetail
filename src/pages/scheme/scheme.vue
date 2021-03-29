<template>
    <div class="scheme-wapper">
        <div class="auto" v-show="footerShow">
            <div class="scheme-title">{{nowData.protitle}}</div>
            <!-- 《所需产品与药物》 -->
            <div class="scheme-item-t">{{nowData.program.CPYWtitle1}}</div>
            <div class="buy-list border-list border-bottom-none">
                <h4>{{nowData.program.HFPtitle1}}</h4>
                <div class="buy-item" v-for="(item,index) in nowData.program.ProductList" :key="index">
                    <p class="buy-detail-w">【<span class="buy-detail">{{item.Typename}}</span>】{{item.Productname}}， <span class="buy-prise">官网售价{{item.Externalprice}}</span> 元</p>
                    <p class="buy-wapper"><span v-if="item.Price">拼团{{item.Price}}元</span>，<span target="_blank"  class="buy-btn" @click="goUrl(item.BuyURL)">点击购买 >></span></p>
                </div>
            </div>
            <!-- <div class="buy-list-detail">
                <img :src="bgImg" alt="">
            </div> -->
            <div class="list-detail border-list border-bottom-none">
                {{nowData.program.HFPtitle2}}
            </div>
            <div class="buy-list border-list border-bottom-none">
                <h4>{{nowData.program.YWtitle1}}</h4>
                <div class="buy-item">
                    <p class="buy-detail-w">{{nowData.program.KFYWtitle1}}</p>
                    <p v-for="(item,index) in nowData.program.KFUsemedicinesList1" :key="index">{{item.Drugname}}</p>
                </div>
                <p><br/></p>
                <div class="buy-item">
                    <p class="buy-detail-w">{{nowData.program.WYYWtitle1}}</p>
                    <p  v-for="(item,index) in nowData.program.WYUsemedicinesList1" :key="index">{{item.Drugname}}</p>
                </div>
            </div>
            <!-- <div class="buy-list-detail">
                <img :src="bgImg" alt="">
            </div> -->
            <div class="list-detail border-list ">
               {{nowData.program.YWtitle3}}
            </div>
            <!--护肤步骤与用药建议 -->
            <div class="scheme-item-t">{{nowData.program.HFYYJYtitle}}</div>
            <div class="scheme-item-t">{{nowData.program.daidingtitle}}</div>
            <div class="mar-list">
                <!-- 早 -->
                <div  v-show="nowData.program.morninglist.length>0">
                    <h4>{{nowData.program.zaotitle}}</h4>
                    <p v-for="(item,index) in nowData.program.morninglist" :key="index">{{item.Operating}}</p>
                </div>
                <!-- 中午 -->
                <div v-show="nowData.program.noonlist.length>0">
                    <h4>{{nowData.program.zhongtitle}}</h4>
                    <p v-for="(item,index) in nowData.program.noonlist" :key="index">{{item.Operating}}</p>
                </div>
                <!-- 晚 -->
                <div v-show="nowData.program.nightlist.length>0">
                    <h4>{{nowData.program.wantitle}}</h4>
                    <p v-for="(item,index) in nowData.program.nightlist" :key="index">{{item.Operating}}</p>
                </div>
                <!-- 其它 -->
                <div v-show="nowData.program.Otherlist&&nowData.program.Otherlist.length>0">
                    <h4>{{nowData.program.qitatitle}}</h4>
                    <p v-for="(item,index) in nowData.program.Otherlist" :key="index">{{item.Operating}}</p>
                </div>
                <br/>    
                <h4>{{nowData.program.YWtitle2}}</h4>
                <h4>{{nowData.program.KFYWtitle2}}</h4>
                <p v-for="(item,index) in nowData.program.KFUsemedicinesList2" :key="index">{{item.Drugname}}<span class="min-listsize">（{{item.Usage}}）</span></p>
                <h4>{{nowData.program.WYYWtitle2}}</h4>
                <p  v-for="(item,index) in nowData.program.WYUsemedicinesList2" :key="index">{{item.Drugname}}<span class="min-listsize">（{{item.Usage}}）</span></p>
            </div>
            <!-- <div class="buy-list-detail">
                <img :src="bgImg" alt="">
            </div> -->
            <div class="list-detail">
                {{nowData.program.YWtitle4}}
            </div>
            <!-- 注意事项 -->
            <div  v-show="nowData.program.Precautionslist.length>0">
                <br/>
                <div class="scheme-item-t">{{nowData.program.ZYSXtitle}}</div>
                <div class="mar-list">
                    <p v-for="(item,index) in nowData.program.Precautionslist" :key="index">{{item.Precautions}}</p>
                </div>
            </div>
            
            <!-- 应对措施 -->
            <div  v-show="nowData.program.Responseslist.length>0">
                <br/>
                <div class="scheme-item-t">{{nowData.program.YDCStitle}}</div>
                <div class="mar-list">
                    <p v-for="(item,index) in nowData.program.Responseslist" :key="index">{{item.Solution}}</p>
                </div>
            </div>
            
            
            <!-- 修复预期 -->
            <div v-if="nowData.program.Expectedlist.length>0">
                <br/>
                <div class="scheme-item-t">{{nowData.program.XFYQtitle}}</div>
                <div class="mar-list">
                    <div v-for="(item,index) in nowData.program.Expectedlist" :key="index">
                        <p v-if="index<(nowData.program.Expectedlist.length-1)" >{{item.Expected}}</p>
                        <img v-if="index==(nowData.program.Expectedlist.length-1)" alt="" :src="$api.serverUrl+item.Expected">
                    </div>
                    <!-- <img src="http://www.ruanyifeng.com/blogimg/asset/201402/bg2014021402.png" alt=""> -->
                </div>
            </div>
            
            <!-- 案主信息 -->
            <br/>
            <div class="scheme-item-t">{{nowData.usertitle}}</div>
            <div class="mar-list" v-if="footerShow">
                <!-- <p v-for="(item,index) in infoList" :key="index">{{item.info}}</p> -->
                
                <p>【是否会发红】 &nbsp; {{nowData.user.Redness?'否':'是'}}</p>
                <p>【是否发热发烫】&nbsp; {{nowData.user.Fever?'否':'是'}}</p>
                <p>【是否会肿】&nbsp; {{nowData.user.Swelling?'否':'是'}}</p>
                <p>【是否会痒】&nbsp; {{nowData.user.Itch?'否':'是'}}</p>
                <p>【是否会刺痛】&nbsp; {{nowData.user.Tingling?'否':'是'}}</p>
                <p>【是否会干燥】&nbsp; {{nowData.user.Dry?'否':'是'}}</p>
                <p>【是否出油】&nbsp; {{nowData.user.Oil?'否':'是'}}</p>
                <p>【是否长痘】&nbsp; {{nowData.user.Acne?'否':'是'}}</p>
                <p>【症状多久发作一次】&nbsp; {{nowData.user.Symptom}}</p>
                <p>【皮肤问题几年了】&nbsp; {{nowData.user.Skinproblems}}</p>
                <p>【是否去医院诊断,诊断结论】&nbsp; {{nowData.user.Diagnosis}}</p>
                <p>【期间用过药物，使用多久，效果】&nbsp; {{nowData.user.Useddrug}}</p>
                <p>【对哪些药物和食物过敏】&nbsp; {{nowData.user.Allergen}}</p>
                <p>【有无高血压，糖尿病，甲状腺，肿瘤，病史】&nbsp; {{nowData.user.Surgical?'无':'有'}}</p>
                <p>【有无焦虑，抑郁病史】&nbsp; {{nowData.user.Psychiatry?'无':'有'}}</p>
                <p v-if="parseInt(nowData.user.Gender)==1">【是否处在备孕，孕中，哺乳期】&nbsp; {{nowData.user.Gynecology?'没有':'是'}}</p>
                <p>【用过哪些护肤品感觉挺好或还行】&nbsp; {{nowData.user.Feelgoode}}</p>
                <p>【用过哪些护肤品感觉不好】&nbsp; {{nowData.user.Feelbad}}</p>
                <p>【性别】&nbsp; {{nowData.user.Gender?'女':'男'}}</p>
                <p>【年龄】&nbsp; {{nowData.user.Age}}</p>
                <p>【城市】&nbsp; {{nowData.user.City}}</p>
                <p>【职业】&nbsp; {{nowData.user.Profession}}</p>
                <p>【是否使用彩妆】 &nbsp; {{nowData.user.Makeup?'否':'是'}}</p>
                <p>【是否使用防晒】 &nbsp; {{nowData.user.Sunprotection?'否':'是'}}</p>
                <p>【其他】&nbsp; {{nowData.user.Remarks}}</p>
                <img v-for="(item,index) in nowData.user.HeadList" :key="index" :src="$api.serverUrl+item" alt="">
                <img v-for="(item,index) in nowData.user.Profile" :key="index" :src="$api.serverUrl+item" alt="">
                <img v-for="(item,index) in nowData.user.Partial" :key="index" :src="$api.serverUrl+item" alt="">
                <img v-for="(item,index) in nowData.user.Product" :key="index" :src="$api.serverUrl+item" alt="">
                
            </div>
        </div>
        <footers :pid="programId" :openId="nowOpenid" v-show="footerShow"></footers>
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    import footers from '@/components/footer/footers'
    export default{
        components:{footers},
        data(){
            return{ 
                bgImg:'../../../static/images/down.png',
                nowData:{
                    "protitle":'',
                    "Message":'',
                    "program":{
                        "Otherlist":[],
                        "Expectedlist":[],
                        "morninglist":[],
                        "noonlist":[],
                        "nightlist":[],
                        "Otherlist":[],
                        "Precautionslist":[],
                        "Responseslist":[],
                        "CPYWtitle1":'',
                        "YWtitle4":''
                    },
                    "user":{

                    },
                    "usertitle":''
                },
                infoList:[
                    {'info':"【是否会发红】"}
                ],
                footerShow:false,
                programId:0
            }
        },
        mounted(){
            var url=window.location.href,
			indexNow=url.indexOf('=');
			// this.nowOpenid=url.slice(indexNow+1,url.length)
            this.nowOpenid=this.$route.params.id
            this.getList();
            // console.log(JSON.parse(localStorage.getItem("nowUserDt")))
        },
        methods:{
            toArray(str){
                if(!str){
                    return []
                }else{
                    if(str.indexOf(',')){

                    }
                }
            },
            //跳转地址
            goUrl(url){
                setTimeout(function(){
                    window.location.href=url
                },100)
            },
            getList(){
                let params={
                    "openId":this.nowOpenid,
                    "phone":''
                },
                that=this;
                // //判断用户
                this.$api.getOpenIdUser(params).then(res=>{
                    if(res.data.Code==0){
                        // let nowD=res.data.Data;
                        let titleInfo=res.data.Data.Message;
                        if(titleInfo==0){
                            // 填写信息
                            that.footerShow=false;
                            // Dialog.alert({
                            //     message: "请先填写信息！",
                            //     theme: 'round-button',
                            //     }).then(() => {
                            //         console.log(res.data.Data)
                            if(res.data.Data.user){//已填写过信息
                                // that.$router.push({name:'info', params:{ id: that.nowOpenid,index:0||res.data.Data.user.Id }})  
                                that.footerShow=false;
                                Dialog.alert({
                                    message: "未付款",
                                    theme: 'round-button',
                                    confirmButtonText:'立即付款'
                                    }).then(() => {
                                        window.location.href=res.data.Data.url;
                                    //    that.getList() 
                                });
                            }else{
                                that.$router.push({name:'info', params:{ id: that.nowOpenid,index:0 }})  
                            }
                                    
                                
                            // });
                        }else if(titleInfo==1){
                            //制定
                            that.footerShow=false;
                              Dialog.alert({
                                message: "未付款",
                                theme: 'round-button',
                                confirmButtonText:'立即付款'
                                }).then(() => {
                                    window.location.href=res.data.Data.url;
                                //    that.getList() 
                            });
                        }else if(titleInfo==2){
                            //
                            that.footerShow=true;
                            that.nowData=res.data.Data
                            that.programId=res.data.Data.program.Id
                        }
                    }else{
                        //错误
                        that.footerShow=false;
                        Dialog.alert({
                            message: '当前链接用户不存在，请先创建用户！',
                            theme: 'round-button',
                            }).then(() => {
                            // on close
                            that.getList()
                        });
                    }
                    

                }).catch((error) => {
                    console.error(error);
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '../../../static/scss/common.scss';
    .scheme-wapper{
        background: #fff;
        height: 100%;
        overflow: auto;
        font-size: 0.16rem;
        padding-bottom: 0.56rem;
        color:#2b2b2b;
        text-align:justify;
        h4{
                line-height: 0.35rem;
            }
        .scheme-title{
            font-size: 0.20rem;
            margin:0.1rem 0 0.18rem;
        }
        .scheme-item-t{
            color: $zhu_cl;
            font-size: 0.22rem;
            text-align: center;
            margin: 0.14rem 0;
        }
        .buy-wapper{
            margin-bottom: 0.06rem;
            margin-top: 0.02rem;
        }
        .buy-detail-w{
            vertical-align: middle;
            justify-content: space-between;
            // line-height: 0.3rem;
            
        }
        .buy-detail{
            color: $zhu_cl;
        }
        .buy-prise{
            // color: $zhu_cl;
        }
        .buy-list-detail{
            text-align: center;
            overflow: hidden;
            height:32px;
            position: relative;
            img{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                animation: tranFalsh 3s infinite;
                -moz-animation: tranFalsh 3s infinite;	/* Firefox */
                -webkit-animation: tranFalsh 3s infinite;	/* Safari 和 Chrome */
                -o-animation: tranFalsh 3s infinite;	/* Opera */
            }
            
        }
        .border-list{
            border: 1px solid #ccc;
            padding: 0.08rem 0.04rem;
        }
        .border-bottom-none{
            border-bottom: none;
        }
        .buy-list{
            .buy-btn{
                cursor: pointer;
                    color: #fff;
                    display: inline-block;
                    background: #055bd9;
                    padding: 2px 8px;
                    border-radius: 8px;
                    text-decoration: underline
            }
            
        }
        .list-detail{
            color: brown;
        }
        .buy-item{

        }
        .mar-list{
            
            p{
                line-height: 0.2rem;
                margin-bottom: 0.1rem;
                justify-content: space-between;
            }
            .min-listsize{
                font-size: 0.12rem;
            }
            img{
                width: 100%;
                margin: 5px 0;
            }
        }
        p{
            justify-content: space-between;
        }
        .van-tabbar-item{
            color:$zhu_cl
        }
        .van-tabbar-item--active{
            color: #fff;
            background: $zhu_cl
        }
        
    }
    @keyframes tranFalsh
    {
        from {top: -100%;}
        to {top:0;}
    }
</style>
