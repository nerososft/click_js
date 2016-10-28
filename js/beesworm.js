var beesworm = new Object({
    URL:{
        BASE_URL: function(){
            return "http://localhost:8080/data/";
        },
        BEESWORM: function(genename,cancertype){
            return beesworm.URL.BASE_URL()+genename+"/"+cancertype+"/beeswarmnew";
        }
    },
    Operate:{
        BEESWORM: function(genename,cancertype,cutoff){
            $("#bt_draw").attr("disabled","true");
            $("#echarts").html('<div class="spinner">'+
                                  '<div class="rect1"></div>'+
                                  '<div class="rect2"></div>'+
                                  '<div class="rect3"></div>'+
                                  '<div class="rect4"></div>'+
                                  '<div class="rect5"></div>'+
                                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Loading~~~</p>');
            //此处判断本地stronge缓存
            //if(cache.init){
            //    var cacheFile =  cache.get(genename);
            //    if(cacheFile){
            //        beesworm.View.draw(genename,cancertype,dataAll);
            //    }else{
                    $.get(beesworm.URL.BEESWORM(genename,cancertype),{},function(data,status){
                        if(status){
                            if(data.state){
                                //console.log(data);
                                var dataAll = new Array();
                                    
                                var fuckdata = [];
                                for(var element in data.data){//--->基因
                                    var gene = [];
                                    for(var a in data.data[element]){//--->样本正常否
                                        var prop = [];
                                        for(var b in data.data[element][a]){//---->样本
                                            //console.log(data.data[element][a][b]);
                                            var item = [];
                                            for(var c in data.data[element][a][b]){
                                                item.push(data.data[element][a][b][c]);
                                            }
                                            prop.push(item);
                                        }
                                        gene.push(prop);
                                    }
                                    fuckdata.push(gene);
                                }
                                dataAll.push(fuckdata);
                                //console.log(dataAll);
                                var datatag = new Array();
                                beesworm.View.draw(genename,cancertype,dataAll,datatag,cutoff);
                            }else{
                                $.get(data.msg,{},function(data,status){
                                    var dataAll = [data]; 
                                    var datatag = [];
                                    beesworm.View.draw(genename,cancertype,dataAll,datatag,cutoff);
                                });
                            }
                        }else{
                              $("#echarts").html('<p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">There is something wrong with server~~~</p>');
           
                        }

                    //    cache.save(genename,data);
                    });
            //    }
            //}else{
            //    console.log("当前浏览器不支持缓存！");
            //    $.get(beesworm.URL.BEESWORM(genename,cancertype),{},function(data,status){
            //            var dataAll = [];
            //            beesworm.View.draw(genename,cancertype,dataAll);
            //    });
            //}
        }
    },Utils:{
        box:function(up,q3,avg,mid,q1,down,xmin,xmax,cutoffall,Xmax){
            var ups = "";var q3s = "";var avgs="";var mids="";var q1s="";
            var downs="";var xmins="";
            var xmaxs="";
            if(up!=""){
                ups="up:"+(up+"").substring(0,5);
            }
            if(q3!=""){
                q3s="q3:"+(q3+"").substring(0,5);
            }
            if(avg!=""){
                avgs="avg:"+(avg+"").substring(0,5);
            }
            if(mid!=""){
                mids="mid:"+(mid+"").substring(0,5);
            }
            if(q1!=""){
                q1s="q1:"+(q1+"").substring(0,5);
            }
            if(down!=""){
                downs="down:"+(down+"").substring(0,5);
            }

            var data  =  [[{//up
                                coord: [xmin, up],
                                symbol: 'none',
                                label:{
                                    normal: {
                                        formatter: ups,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'up:'+up
                                }
                            }, {
                                coord: [xmax, up],
                                symbol: 'none'
                            }],
                            [{//v up
                                coord: [(xmin+xmax)/2, up],
                                symbol: 'none',
                                
                            }, {
                                coord: [(xmin+xmax)/2, q3],
                                symbol: 'none'
                            }],
                            [{//q3
                                coord: [xmin, q3],
                                symbol: 'none'
                            }, {
                                coord: [xmax,q3],
                                symbol: 'none',
                                label:{
                                    normal: {
                                        formatter: q3s,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'q3:'+q3
                                }
                            }],
                            [{//left
                                coord: [xmin, q3],
                                symbol: 'none'
                            }, {
                                coord: [xmin, q1],
                                symbol: 'none'
                            }],
                            [{//right
                                coord: [xmax, q3],
                                symbol: 'none'
                            }, {
                                coord: [xmax, q1],
                                symbol: 'none'
                            }],
                            [{//avg
                                coord: [xmin, avg],
                                symbol: 'circle'
                            }, {
                                coord: [xmax, avg],
                                symbol: 'circle',
                                label:{
                                    normal: {
                                        formatter: avgs,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'avg:'+avg
                                }
                            }],[{//mid
                                coord: [xmin, mid],
                                symbol: 'none',
                                color:"#ff0000"
                            }, {
                                coord: [xmax, mid],
                                symbol: 'none',
                                label:{
                                    normal: {
                                        formatter: mids,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'mid:'+mid
                                }
                            }],[{//q1
                                coord: [xmin, q1],
                                symbol: 'none'
                            }, {
                                coord: [xmax, q1],
                                symbol: 'none',
                                label:{
                                    normal: {
                                        formatter: q1s,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'q1:'+q1
                                }
                            }],
                             [{//v up
                                coord: [(xmin+xmax)/2, q1],
                                symbol: 'none'
                            }, {
                                coord: [(xmin+xmax)/2, down],
                                symbol: 'none'
                            }],[{//down
                                coord: [xmin, down],
                                symbol: 'none'
                            }, {
                                coord: [xmax, down],
                                symbol: 'none',
                                label:{
                                    normal: {
                                        formatter: downs,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: 'down:'+down
                                }
                            }]];
                        
                            cutoffall.forEach(function(c){
                                //console.log(c);
                                c.forEach(function(d){
                                      
                                });
                                  var line = [{//up
                                        coord: [0, c[0]],
                                        symbol: 'arrow'
                                    }, {
                                        coord: [Xmax, c[0]],
                                        symbol: 'arrow'
                                    }]
                                data.push(line);
                            });

            return data;
        },
        ttest:function(data,gene1,gene2,alpha,times){
            var ttestdata = [];
            data.forEach(function(a) {
                a.forEach(function(b){
                    b.forEach(function(c){
                         ttestdata.push(c);
                    });
                });
            });

            var s1 = 0;
            var s2 = 0;
            var x1 = 0;
            var x2 = 0;

            ttestdata[gene1].forEach(function(x){
                x1 = (x1+x[1])/2;
                s1+=x[1];
            });
            ttestdata[gene2].forEach(function(x){
                s2+=x[1];
                x2 = (x2+x[1])/2;
            });


            return (x1-x2-alpha)/Math.sqrt(s1^2/ttestdata[gene1].length,s2^2/ttestdata[gene2].length);


        }
    },
    View:{
        draw: function(genename,cancertype,data,datatag){
            $("#echarts").html('<div class="spinner">'+
                                  '<div class="rect1"></div>'+
                                  '<div class="rect2"></div>'+
                                  '<div class="rect3"></div>'+
                                  '<div class="rect4"></div>'+
                                  '<div class="rect5"></div>'+
                                '</div><p class="col-md-12" style="text-align:center;color:rgb(61,132,193);">Rendering~~~</p>');


            var schema = [
                {name: 'value', index: 1, text: '$'},
                {name: 'sampleId', index: 2, text: '%'},
            ];
            //此处调用echarts绘制数据图形

            //标注点数据
            //var dataTag = [[13.9565,2.0258,'TCGA-DB-A64X-01'],[12.9226,1.976,'TCGA-TM-A84F-10']];

            //console.log(data);
            var ttest_gene1  = $("#gene1").val();
            var ttest_gene2 = $("#gene2").val();
            var ttest_alpha = $("#alpha").val();
            var t_value = "";
            if(ttest_gene1!=""&ttest_gene2!=""){
                if(ttest_alpha==""){
                    ttest_alpha = 0.05;//默认置信度
                }
                var t_value= beesworm.Utils.ttest(data,ttest_gene1,ttest_gene2,ttest_alpha,1);
            }

            console.log(t_value);



            //计算xsize
            var glist = genename.split(',');
            var Xmax = glist.length * 3;
            var Ymax = 0;
            var Ymin = 20;

            //glist扩展
            var glist_ex = [];
            glist.forEach(function(element) {
                //console.log(element);
                glist_ex.push(element+"n");
                glist_ex.push(element+"t");
            }, this);
            console.log(glist_ex);
            //计算Ysize
            var series = [];
            data.forEach(function(a) {
                var i = 0;
                a.forEach(function(b){
                    b.forEach(function(c){

                        //判断颜色
                        var color;
                        if(i%2==0){
                            color="#0000ff";
                        }else{
                            color = "#ff0000";
                        }
                        //计算x最小值
                        var xmin = 10000;
                        var xmax = 0;
                        var down = 1000;
                        var up = 0;
                        var avg = 0;
                        var ymin = 2000;
                        var ymax = 0;

                        var input_cutoff1 = $("#line1").val();
                        var input_cutoff2 = $("#line2").val();
                        var cutoff = [];
                        if(input_cutoff1!=""){
                            cutoff.push(input_cutoff1);
                        }
                        if(input_cutoff2!=""){
                            cutoff.push(input_cutoff2);
                        }
                        cutoff.sort();

                        var cutoffall  = [];
                        cutoff.forEach(function(cc){
                            cutoffall.push([cc,0]);
                        });
                         //cutoff计算
                        var cut1 = 0;
                        var cut2 = 0;

                        var value_list = [];
                        var all_count = 0;
                        
                            c.forEach(function(item_one) {
                                //cutoff个数统计
                                all_count++;
                                if(cutoffall.length==1){
                                    if(item_one[1]>=cutoff[0]){
                                        cutoffall[0][1]++;
                                    }
                                }else if(cutoffall.length==2){
                                    if(item_one[1]<cutoff[0]){
                                        cutoffall[0][1]++;
                                    }else if(item_one[1]>=cutoff[0] && item_one[1]<cutoff[1]){
                                        cutoffall[1][1]++;
                                    }
                                }

                                if(xmin>item_one[0]){//计算x最小
                                    xmin = item_one[0];
                                }
                                if(xmax<item_one[0]){//计算x最大
                                    xmax = item_one[0]
                                }

                                if(ymin>item_one[1]){//计算y最小
                                    ymin = item_one[1];
                                }
                                if(ymax<item_one[1]){//计算y最大
                                    ymax = item_one[1]
                                }

                                avg = (avg+item_one[1])/2;//计算平均数
                                value_list.push(item_one[1]);
                            }, this);

                        //cutoff统计百分比
                       cutoffall.forEach(function(cuu){
                            cuu[1]/=all_count;
                       });
                       //console.log(cutoffall);


                        value_list.sort();//排序

                        var q1 = value_list[Math.floor((value_list.length+1)/4)];
                        var mid = value_list[Math.floor((value_list.length+1)/2)];
                        var q3 = value_list[Math.floor(3*((value_list.length+1)/4))];
                        up = q3+1.5*(q3-q1);

                        down = q1-1.5*(q3-q1);
                        if(up>Ymax){
                            Ymax = up;
                        }
                        if(down<Ymin){
                            Ymin = down;
                        }

                        var linedata = [];
                        if($("#boxplot").is(':checked')){
                            linedata = beesworm.Utils.box(up,q3,avg,mid,q1,down,xmin,xmax,cutoffall,Xmax);
                        }else{
                            linedata = beesworm.Utils.box("","","","","","","","",cutoffall,Xmax);
                        }
                        //构造cutoff百分比
                            if(cutoffall.length==1){
                                var line1 = [{//up
                                        coord: [(xmin+xmax)/2, ymax-(ymax-cutoffall[0][0])/2],
                                        symbol: 'none',
                                        label:{
                                            normal: {
                                                formatter: (""+(1-cutoffall[0][1])*100).substring(0,4)+"%",
                                                textStyle: {
                                                    align: 'center',
                                                    color: "#00ff00"

                                                }
                                            }
                                        }
                                    }, {
                                        coord: [(xmin+xmax)/2, ymax-(ymax-cutoffall[0][0])/2],
                                        symbol: 'none'
                                    }];
                                var line2 = [{//down
                                    coord: [(xmin+xmax)/2, cutoffall[0][0]-(cutoffall[0][0]-ymin)/2],
                                    symbol: 'none',
                                    label:{
                                        normal: {
                                            formatter: (""+cutoffall[0][1]*100).substring(0,4)+"%",
                                            textStyle: {
                                                align: 'center',
                                                    color: "#00ff00"
                                            }
                                        }
                                    }
                                }, {
                                    coord: [(xmin+xmax)/2, cutoffall[0][0]-(cutoffall[0][0]-ymin)/2],
                                    symbol: 'none'
                                }];
                                    
                                linedata.push(line1);
                                linedata.push(line2);
                            }
                            if(cutoffall.length==2){
                                // console.log(ymax-(ymax-cutoffall[1][0])/2);
                                // console.log(cutoffall[1][0]-(cutoffall[1][0]-cutoffall[0][0])/2);
                                // console.log(cutoffall[0][0]-(cutoffall[0][0]-ymin)/2);
                                var line1 = [{//up
                                        coord: [(xmin+xmax)/2, ymax-(ymax-cutoffall[1][0])/2],
                                        symbol: 'none',
                                        label:{
                                            normal: {
                                                formatter: (""+(1-cutoffall[0][1]-cutoffall[1][1])*100).substring(0,4)+"%",
                                                textStyle: {
                                                    align: 'center',
                                                    color: "#00ff00"
                                                }
                                            }
                                        }
                                    }, {
                                        coord: [(xmin+xmax)/2, ymax-(ymax-cutoffall[1][0])/2],
                                        symbol: 'none'
                                    }];
                                var line2 = [{//center
                                    coord: [(xmin+xmax)/2, cutoffall[1][0]-(cutoffall[1][0]-cutoffall[0][0])/2],
                                    symbol: 'none',
                                    label:{
                                        normal: {
                                            formatter: (""+cutoffall[1][1]*100).substring(0,4)+"%",
                                            textStyle: {
                                                align: 'center',
                                                color: "#00ff00"
                                            }
                                        }
                                    }
                                }, {
                                    coord: [(xmin+xmax)/2, cutoffall[1][0]-(cutoffall[1][0]-cutoffall[0][0])/2],
                                    symbol: 'none'
                                }];
                                var line3 = [{//down
                                    coord: [(xmin+xmax)/2, cutoffall[0][0]-(cutoffall[0][0]-ymin)/2],
                                    symbol: 'none',
                                    label:{
                                        normal: {
                                            formatter: (""+(cutoffall[0][1])*100).substring(0,4)+"%",
                                            textStyle: {
                                                align: 'center',
                                                color: "#00ff00"
                                            }
                                        }
                                    }
                                }, {
                                    coord: [(xmin+xmax)/2, cutoffall[0][0]-(cutoffall[0][0]-ymin)/2],
                                    symbol: 'none'
                                }];
                                    
                                linedata.push(line1);
                                linedata.push(line2);
                                linedata.push(line3);
                            }
                        //构造绘制数据组(散点图)
                       
                        var serie = {
                            name: glist_ex[i],
                            symbolSize: 3,
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: c,
                            itemStyle: {
                                normal: {
                                    color: color
                                }
                            },
                            //up,q3,avg,mid,q1,down,xmin,xmax

                            markLine:{
                            label: {
                                normal: {
                                    formatter: '',
                                    textStyle: {
                                        align: 'right'
                                    }
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color:"#000",
                                    type: 'solid'
                                }
                            },
                            data:linedata
                        }
                        };
                        i++;
                        console.log(serie);
                        series.push(serie);



                        c.forEach(function(d){
                            //console.log(d[1]);
                            if(d[1]>Ymax){
                                Ymax = d[1];
                            }
                            if(d[1]<Ymin){
                                Ymin = d[1];
                            }
                        });
                    });
                });
            }, this);


            //标注点数据组（散点）
            var labelpoint = {
                    zlevel:1,
                    name: 'label',
                    type: 'scatter',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: "#00ff00"
                        }
                    },
                    data: datatag
                };

            series.push(labelpoint);


            var title =  "";
              if(ttest_gene1!=""&ttest_gene2!=""){
                  title = "          T-Test  of "+glist[ttest_gene1]+" and "+glist_ex[ttest_gene2]+" is "+t_value;
              }

            option = {
                title: {
                    text: cancertype+title,
                    x: 'left',
                    y: 0
                },
                grid: [
                    {x: '5%', y: '10%', width: '94%', height: '83%'}
                ],
                brush: {
                    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    xAxisIndex: 0
                },
                legend: {
                    y: 'top',
                    data: glist_ex,
                    padding: 30,
                    itemGap: 5,
                    textStyle: {
                        color: '#000',
                        fontSize: 16
                    }
                },
                toolbox: { 
                    orient:"vertical",
                    feature: {
                        mark : {show: true},  
                        dataView : {show: true, readOnly: false}, 
                        dataZoom: {
                            show: true
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }],
               tooltip : {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        console.log(value);
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + obj.seriesName + '  ' + value[2]
                            + '</div>'
                            + 'value: '+value[1] + '<br>';
                    }
                },
                xAxis: [
                    { 
                        gridIndex: 0, min: 0, max: Xmax
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0, min: Ymin-0.5, max: Ymax+0.5
                    }
                ],
                series: series
            };
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts'));
            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            $("#bt_draw").removeAttr("disabled");
            
            //监听事件
            myChart.on("dblclick", function(param){
                var mes = '【' + param.type + '】';
                if (typeof param.seriesIndex != 'undefined') {
                    mes += '  seriesIndex : ' + param.seriesIndex;
                    mes += '  dataIndex : ' + param.dataIndex;
                }
                if (param.type == 'hover') {
                    document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes;
                }
                else {
                    //console.log(Math.round(param.data[0]));
                    if((Math.round(param.data[0])-1)%3==0){
                         $("#note").append('<div class="alert alert-info alert-dismissible" role="alert" style="padding:0;margin:0;margin-top:1px;">'+
                            '<button type="button" style="padding:0;margin:0;" class="close" data-dismiss="alert">'+
                                '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                            '<strong style="padding:0;margin:0;">'+param.data[2]+' </strong> value: '+param.data[1]+
                        '</div>');
                    }else{
                         $("#note").append('<div class="alert alert-danger alert-dismissible" role="alert" style="padding:0;margin:0;margin-top:1px;">'+
                            '<button type="button" style="padding:0;margin:0;" class="close" data-dismiss="alert">'+
                                '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                            '<strong style="padding:0;margin:0;">'+param.data[2]+' </strong> value: '+param.data[1]+
                        '</div>');
                    }
                    
                    //标注点数据加入
                    datatag.push(param.data);

                    //递归绘制
                    beesworm.View.draw(genename,cancertype,data,datatag);
                    
                    console.log(param.data[1]+param.data[2]);
                }
            });
        }
    }
});