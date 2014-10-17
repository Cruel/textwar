(function($){

    var test = {
        "nodes": {
            "a": {name:'level1'},
            "c": {name:'level2'},
            "b": {name:'level3'},
            "e": {name:'level4'},
            "d": {name:'level5'},
            "g": {name:'level6'},
            "f": {name:'level7'},
            "i": {name:'level8'}
        },
        "edges": {
            "a": {
                "i": {
                    "weight": 0.66832899999999995
                }
            },
            "c": {
                "b": {
                    "weight": 0.640741
                }
            },
            "b": {
                "a": {
                    "weight": 0.84375
                }
            },
            "e": {
                "d": {
                    "weight": 0.1434
                }
            },
            "d": {
                "c": {
                    "weight": 0.98863599999999996
                },
                "g": {
                    "weight": 0.5
                }
            },
            "g": {
                "b": {
                    "weight": 0.318519
                }
            },
            "f": {
                "e": {
                    "weight": 0.84353699999999998
                }
            },
            "i": {
                "a": {
                    "weight": 0.13125000000000001
                },
                "e": {
                    "weight": 0.122449
                },
                "f": {
                    "weight": 0.73033700000000001
                }
            }
        },
        "_": "zebra finch bk70bk62 - syllable transitions (forward probabilities)"
    };

    var CLR = {
        branch:"#b2b19d",
        code:"orange",
        doc:"#922E00",
        demo:"#a7af00"
    }

    var test = {
        nodes: {
            "level 1": {
                alpha: 1
            },
            "level 2": {
                alpha: 1
            }
        },
        edges: {
            "level 1": {
                "level 2":{}
            }
        }
    };

    var theUI = {
        nodes:{"arbor.js":{color:"red", shape:"dot", alpha:1},

            demos:{color:CLR.branch, shape:"dot", alpha:1},
            halfviz:{color:CLR.demo, alpha:0, link:'/halfviz'},
            atlas:{color:CLR.demo, alpha:0, link:'/atlas'},
            echolalia:{color:CLR.demo, alpha:0, link:'/echolalia'},

            docs:{color:CLR.branch, shape:"dot", alpha:1},
            reference:{color:CLR.doc, alpha:0, link:'#reference'},
            introduction:{color:CLR.doc, alpha:0, link:'#introduction'},

            code:{color:CLR.branch, shape:"dot", alpha:1},
            github:{color:CLR.code, alpha:0, link:'https://github.com/samizdatco/arbor'},
            ".zip":{color:CLR.code, alpha:0, link:'/js/dist/arbor-v0.92.zip'},
            ".tar.gz":{color:CLR.code, alpha:0, link:'/js/dist/arbor-v0.92.tar.gz'}
        },
        edges:{
            "arbor.js":{
                demos:{length:.8},
                docs:{length:.8},
                code:{length:.8}
            },
            demos:{halfviz:{},
                atlas:{},
                echolalia:{}
            },
            docs:{reference:{},
                introduction:{}
            },
            code:{".zip":{},
                ".tar.gz":{},
                "github":{}
            }
        }
    }

    var DeadSimpleRenderer = function(canvas_selector){
        var dom = $(canvas_selector),
            canvas = dom.get(0),
            ctx = canvas.getContext("2d"),
//            gfx = arbor.Graphics(canvas),
            sys = null;

        var that = {
            init:function(system){
                sys = system;
                $(window).resize(that.resize);
                sys.screenPadding(80); // leave an extra 80px of whitespace per side
                that.resize();
                that.initMouseHandling();
            },
            resize: function(){
                var w = $(window).width(),
                    h = $(window).height();
                canvas.width = w; canvas.height = h; // resize the canvas element to fill the screen
                sys.screenSize(w, h);
            },
            redraw:function(){
                ctx.clearRect(0,0, canvas.width, canvas.height);

                sys.eachEdge(function(edge, pt1, pt2){
                    // edge: {source:Node, target:Node, length:#, data:{}}
                    // pt1:  {x:#, y:#}  source position in screen coords
                    // pt2:  {x:#, y:#}  target position in screen coords

                    // draw a line from pt1 to pt2
                    ctx.strokeStyle = "rgba(0,0,0, .333)";
                    ctx.lineWidth = 1 + 4*edge.data.weight;
                    ctx.beginPath();
                    ctx.moveTo(pt1.x, pt1.y);
                    ctx.lineTo(pt2.x, pt2.y);
                    ctx.stroke();
                });

                sys.eachNode(function(node, pt){
                    // node: {mass:#, p:{x,y}, name:"", data:{}}
                    // pt:   {x:#, y:#}  node position in screen coords

                    // draw a rectangle centered at pt
                    var w = 10;
                    ctx.fillStyle = "black";
                    ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);
                });
                sys.eachNode(function(node, pt){
                    // node: {mass:#, p:{x,y}, name:"", data:{}}
                    // pt:   {x:#, y:#}  node position in screen coords


                    // determine the box size and round off the coords if we'll be
                    // drawing a text label (awful alignment jitter otherwise...)
                    var w = ctx.measureText(node.name||"").width + 6;
                    var label = node.name;
                    if (!(label||"").match(/^[ \t]*$/)){
                        pt.x = Math.floor(pt.x);
                        pt.y = Math.floor(pt.y);
                    }else{
                        label = null;
                    }

                    // clear any edges below the text label
//                    ctx.fillStyle = 'rgba(255,255,255,.6)'
//                    ctx.fillRect(pt.x-w/2, pt.y-7, w,14)


                    ctx.clearRect(pt.x-w/2, pt.y-7, w,14);



                    // draw the text
                    if (label){
                        ctx.font = "bold 14px Arial";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "#888888";
                        ctx.fillStyle = node.data.color;
//                        ctx.fillStyle = 'rgba(0,0,0,'+(node.data.alpha||1)+')'

                        // ctx.fillText(label||"", pt.x, pt.y+4)
                        ctx.fillText(label||"", pt.x, pt.y+4);
                    }
                });
            },

            initMouseHandling: function(){
                // no-nonsense drag and drop (thanks springy.js)
                selected = null;
                nearest = null;
                var dragged = null;
                var oldmass = 1

                var handler = {
                    moved:function(e){
                        var old_nearest = nearest && nearest.node._id;
                        var pos = $(this).offset();
//                        var s = {x:e.pageX-pos.left, y:e.pageY-pos.top};
                        var _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
                        nearest = sys.nearest(_mouseP);
                        if (!nearest) return false;

                        if (dragged !== null && dragged.node !== null && dragged.distance < 60){
                            var p = sys.fromScreen(_mouseP);
                            dragged.node.p = {x:p.x, y:p.y};
//                        dragged.tempMass = 10000;
                        }
                        else if (!dragged) {
                            dom.toggleClass('linkable', nearest.distance < 25);
                        }

                        return false;
                    },
                    clicked:function(e){
                        var pos = $(this).offset();
                        var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
                        selected = nearest = dragged = sys.nearest(p);
//console.log(selected.node);
                        if (selected.node !== null && selected.distance < 50){
                            dragged.node.tempMass = 50;
                            dragged.node.fixed = true;
                        } else {
                            selected = null;
                        }

                        sys.tweenNode('Level 1', 3, {
                            alpha: 0.1,
//                        fontsize: 20,
                            radius: 10
//                        color: 'rgba(0,0,0,0.1)'
                        });


                        if (dragged && dragged.node !== null) dragged.node.fixed = true

                        $(canvas).unbind('mousemove', handler.moved);
                        $(canvas).bind('mousemove', handler.dragged);
                        $(window).bind('mouseup', handler.dropped);

                        return false;
                    },
                    dragged:function(e){
                        var old_nearest = nearest && nearest.node._id;
                        var pos = $(this).offset();
                        var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);

                        nearest = sys.nearest(s);
                        if (!nearest) return;

                        if (dragged !== null && dragged.node !== null && dragged.distance < 60){
                            var p = sys.fromScreen(s);
                            dragged.node.p = {x:p.x, y:p.y};
//                        dragged.tempMass = 10000;
                        }
                        else if (!dragged) {
                            dom.toggleClass('linkable', nearest.distance < 25);
                        }

                        return false;
                    },

                    dropped:function(e){
                        $(canvas).unbind('mousemove', handler.dragged);
                        $(window).unbind('mouseup', handler.dropped);
                        $(canvas).bind('mousemove', handler.moved);
//                        _mouseP = null;

                        if (selected !== null && dragged === null){
                            console.log(selected.node.data.url);
                            $('html').injector().get('$location').path(selected.node.data.url);
                            $('html').scope().$apply();
                            return;
                        }
                        if (dragged===null || dragged.node===undefined) return;
                        if (dragged.node !== null) dragged.node.fixed = false;
                        dragged.node.fixed = false;
                        dragged.node.tempMass = 1000;
                        dragged = null;
                        selected = null;

                        return false;
                    }


                };

                $(canvas).mousedown(handler.clicked);
                $(canvas).mousemove(handler.moved);
            }
        };
        return that;
    }

    window.loadLevelGraph = function(data){
        var $graph = $('#levels-graph'),
            sys = arbor.ParticleSystem(1000, 800, 0.5);
        sys.renderer = DeadSimpleRenderer("#levels-graph");

        test = {
            nodes: {},
            edges: {
                "Level 1": {
                    "Level 2":{}
                }
            }
        };

        angular.forEach(data, function (item) {
            console.log(item);
            test.nodes[item.name] = {
                alpha: 1,
                url: '/level/'+item.slug
            };
        });

        sys.graft(test);
        sys.eachNode(function(node, pt){
            node.data.fontsize = 5;
//            node.data.color = 'rgba(0,0,0,1)';
            node.data.radius = 5;
        });


    };
})(jQuery);
