<template>
    <div class="detail">
        <!-- 医院的名字与等级的结构 -->
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1698028453687" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4024" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="4025" fill="#d81e06"></path></svg>
                <span>
                    {{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}
                </span>
            </div>
        </div>
        <!-- 医院的 Logo 和路线 -->
        <div class="logo">
            <div class="left">
                <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData">
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1698047910831" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4029" width="16" height="16"><path d="M874.048 533.333333C863.424 716.629333 716.629333 863.424 533.333333 874.048V917.333333a21.333333 21.333333 0 0 1-42.666666 0v-43.285333C307.370667 863.424 160.576 716.629333 149.952 533.333333H106.666667a21.333333 21.333333 0 0 1 0-42.666666h43.285333C160.576 307.370667 307.370667 160.576 490.666667 149.952V106.666667a21.333333 21.333333 0 0 1 42.666666 0v43.285333c183.296 10.624 330.090667 157.418667 340.714667 340.714667h42.816a21.333333 21.333333 0 1 1 0 42.666666H874.026667z m-42.752 0h-127.786667a21.333333 21.333333 0 0 1 0-42.666666h127.786667C820.778667 330.922667 693.056 203.221333 533.333333 192.704V320a21.333333 21.333333 0 0 1-42.666666 0V192.704C330.922667 203.221333 203.221333 330.944 192.704 490.666667H320a21.333333 21.333333 0 0 1 0 42.666666H192.704c10.517333 159.744 138.24 287.445333 297.962667 297.962667V704a21.333333 21.333333 0 0 1 42.666666 0v127.296c159.744-10.517333 287.445333-138.24 297.962667-297.962667zM512 554.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z" fill="#3D3D3D" p-id="4030"></path></svg>
                    <span>具体位置:{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</span>
                </div>
                <div class="route">
                    规划路线:{{hospitalStore.hospitalInfo.hospital?.route}}
                </div>

            </div>
        </div>
        <!-- 医院介绍 -->
        <div class="footer">
            <h1>医院介绍</h1>
            <p>
                {{ hospitalStore.hospitalInfo.hospital?.intro }}
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
//获取医院详情仓库数据进行展示
import useDetailStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
    .detail {
        .top {
            display: flex;
            align-items: center;
            position: relative;

            .name {
                font-size: 30px;
                font-weight: 900;
            }
            .level {
                color: #7f7f7f;
                margin-left: 10px;
                span {
                    margin-left: 5px;
                }
            }
        }

        .logo {
            display: flex;
            margin: 10px 0px;
            .left {
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
            }

            .right {
                color: #7f7f7f;
                margin-left: 10px;
                div {
                    margin: 10px 0px;
                }
            }
        }

        .footer {
            color: #7f7f7f;
            p {
                margin-top: 10px;
                line-height: 30px;
            }
        }
    }
</style>
