<template>
    <div>
        <div class="moudle-title">添加相册</div>
        <div class="ActivityList">
            <div class="ActivityItem" v-for="(item,index) in data" :key="index">
                <div class="ActivityName">{{item.activity_name}}</div>
                <div class="ActivityTime">{{item.activity_time}}</div>
                <div class="ActivityImgList">
                    <el-image 
                        fit="contain"
                        style="width: 30%;margin:10px;"
                        :src="img" 
                        z-index="100000"
                        :lazy="true"
                        v-for="(img,idx) in item.activity_img" :key="idx"
                        :preview-src-list="getSrcList(item.activity_img,idx)">
                    </el-image>
                    <!-- <img :src="img" alt="" v-for="(img,idx) in item.activity_img" :key="idx"> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {queryActivityPhoto} from '../../../server/index'
    export default {
        name: 'photoList',
        data(){
            return {
                data: [],       // 列表数据
            }
        },
        created(){
            this.getActivityPhotoList();
        },
        methods: {
            // 获取活动图片列表
            getActivityPhotoList(){
                var params = {},
                    This = this;
                queryActivityPhoto(params).then(({data})=>{
                    console.log(data)
                    This.data = data.data.map(item=>{
                        item.activity_img = item.activity_img.split(',').map(item=>{
                            return 'http://139.155.73.51:8090'+item
                        })
                        return item
                    })
                    console.log(This.data)
                })
            },
            getSrcList(activity_img,index){
                return activity_img.slice(index).concat(activity_img.slice(0,index))
            }
        }
    }
</script>

<style lang="scss" scoped>
.ActivityList{
    padding: 20px;
    .ActivityItem{
        .ActivityName{
            font-size: 18px;
            line-height: 50px;
            font-weight: 500;
        }
        .ActivityTime{
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .ActivityImgList{
            // -moz-column-count:3; /* Firefox */
            // -webkit-column-count:3; /* Safari 和 Chrome */
            // column-count:6;
            // -moz-column-gap: 2em;
            // -webkit-column-gap: 2em;
            // column-gap: 2em;
            // img{
            //     width: 100%;
            //     -moz-page-break-inside: avoid;
            //     -webkit-column-break-inside: avoid;
            //     break-inside: avoid;
            // }
        }
    }
}

</style>