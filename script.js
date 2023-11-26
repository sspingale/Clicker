let bigcanvas = document.querySelector("canvas");
let ctx = bigcanvas.getContext("2d");
let container = document.querySelector(".container");
let filters = document.querySelector(".filters");
let collapsed = document.querySelector(".collapsed");
let cameraon = document.getElementById("cameraon");
let cameraoff = document.getElementById("cameraoff");
let takeimage = document.getElementById("takeimage");
let buttons = document.querySelector(".buttons");
let sidebar = document.querySelector("#sidebar");
let closebtn = document.querySelector(".closebtn");
let togglesidebar = document.querySelector(".togglesidebar");
let time = 0,rows = 5, splitscreentime = 0,filmstriptime = 0;

// Filters given below
let normal = document.getElementById("normal");
let grey = document.getElementById("grey");
let invert = document.getElementById("invert");
let bright = document.getElementById("bright");
let reddish = document.getElementById("reddish");
let truered = document.getElementById("truered");
let bluish = document.getElementById("bluish");
let trueblue = document.getElementById("trueblue");
let greenish = document.getElementById("greenish");
let truegreen = document.getElementById("truegreen");
let mirror = document.getElementById("mirror");
let diagonalleftmirror = document.getElementById("diagonalleftmirror");
let leftmirror = document.getElementById("leftmirror");
let rightmirror = document.getElementById("rightmirror");
let bottommirror = document.getElementById("bottommirror");
let topmirror = document.getElementById("topmirror");
let upsidedown = document.getElementById("upsidedown");
let upsidedownmirror = document.getElementById("upsidedownmirror");
let grid2 = document.getElementById("grid2");
let grid3 = document.getElementById("grid3");
let grid4 = document.getElementById("grid4");
let gridvariant = document.getElementById("gridvariant");
let xray = document.getElementById("xray");
let diagonal = document.getElementById("diagonal");
let oldview = document.getElementById("oldview");
let oldtvglitch = document.getElementById("oldtvglitch");
let twin = document.getElementById("twin");
let blackandwhite = document.getElementById("blackandwhite");
let invertblackandwhite = document.getElementById("invertblackandwhite");
let whiteandblack = document.getElementById("whiteandblack");
let invertwhiteandblack = document.getElementById("invertwhiteandblack");
let cartoon = document.getElementById("cartoon");
let lightcartoon = document.getElementById("lightcartoon");
let alien = document.getElementById("alien");
let switchview = document.getElementById("switch");
let switchsplit = document.getElementById("switchsplit");
let pentagonal = document.getElementById("pentagonal");
let quad = document.getElementById("quad");
let hazydays = document.getElementById("hazydays");
let random = document.getElementById("random");
let rainbow = document.getElementById("rainbow");
let crayon = document.getElementById("crayon");
let multicolorgrid = document.getElementById("multicolorgrid");
let verticalrainbow = document.getElementById("verticalrainbow");
let reverseview = document.getElementById("reverseview");
let snowfall = document.getElementById("snowfall");
let filmstrip = document.getElementById("filmstrip");
let delaytime = document.getElementById("delaytime");
// Filters end

let filtersarr = ["normal","grey","invert","bright","reddish","bluish","greenish","leftmirror","rightmirror","bottommirror","topmirror","pentagonal","quad","grid2","grid3","grid4","blackandwhite","whiteandblack","truered","trueblue","truegreen","mirror","diagonalleftmirror","upsidedown","upsidedownmirror","gridvariant","xray","diagonal","oldview","oldtvglitch","twin","invertblackandwhite","invertwhiteandblack","cartoon","lightcartoon","alien","switchview","switchsplit","gridvariant","xray","hazydays","rainbow","crayon","multicolorgrid","verticalrainbow","reverseview","snowfall","filmstrip","delaytime"];
let snowarr = [],splitscreenarr = [],discoarr = [],filmstriparr = [];
let max=18 , min=10;
let colorsarr = ["blue","green","red","orange","yellow","purple"];
let video = null;
let audio = null;
let videostream = null;
let width = 2*window.innerWidth/5;
let ratio = 3/4;
let height = width*ratio;
const screenshot = document.body;
let filter = "Normal";
let Interval;

window.addEventListener("load",()=>{
    Cam.removeall();
    buttons.appendChild(cameraon);
});

export class Camera{
    constructor(canvas,width,height) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas.width = width; 
        this.canvas.height = height;
    }
    
    RemoveAllChildren(){
        var contain = document.querySelector(".container");
        var first = contain.firstElementChild;
        while(first){
            first.remove();
            first = contain.firstElementChild;
        }
    }

    
    
    removeall(){
        cameraon.remove();
        cameraoff.remove();
        takeimage.remove();
        this.RemoveAllChildren();
    }

    // Start and stop Webcam 
    startWebCam(){
        video = document.createElement("video");
        let promise = window.navigator.mediaDevices.getUserMedia({video:true});
        promise.then((stream)=>{
            this.removeall();
            container.appendChild(bigcanvas);
            buttons.appendChild(takeimage);
            buttons.appendChild(cameraoff);
            video.srcObject = stream;
            video.play();
            videostream = stream;
            Interval = setInterval(()=>{
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(video,0,0,width,height);
                this.MirrorImageScale();
                this.ApplyFilters(filter);
                // this.NewScale();
                // this.DiscoScale();
                // this.SplitScreenScale();
            });
        })
        promise.catch((err)=>{
            alert("Error in Detecting Camera",err);
        });
    }

    // All the Review Filters Given below

    ApplyReviewFilters(){
        for(let i=0;i<filtersarr.length;i++){
            ctx.clearRect(0,0,filtersarr[i].width,filtersarr[i].height);
            ctx.drawImage(video,0,0,filtersarr[i].width,filtersarr[i].height);
        }
    }

    stopWebCam(){
        this.removeall();
        buttons.appendChild(cameraon);
        clearInterval(Interval);
        if(video && videostream){
            video.pause();
            videostream.getTracks().forEach((s) => {
                s.stop();
            });
            ctx.clearRect(0, 0, width, height);
            filter = "Normal";
        }
    }

    ApplyFilters(filter){
        switch (filter) {
            case "grey":
                this.GreyScale();
                break;
            case "invert":
                this.InvertScale();
                break;
            case "bright":
                this.BrightScale();
                break;
            case "reddish":
                this.RedScale();
                break;
            case "bluish":
                this.BlueScale();
                break;
            case "greenish":
                this.GreenScale();
                break;
            case "leftmirror":
                this.LeftMirrorScale();
                break;
            case "rightmirror":
                this.RightMirrorScale();
                break;
            case "bottommirror":
                this.BottomMirrorScale();
                break;
            case "topmirror":
                this.TopMirrorScale();
                break;
            case "grid2":
                this.GridScale(ctx,2,2);
                break;
            case "grid3":
                this.GridScale(ctx,3,3);
                break;
            case "grid4":
                this.GridScale(ctx,4,4);
                break;
            case "blackandwhite":
                this.BlackAndWhiteScale();
                break;
            case "pentagonal":
                this.PentagonalMirrorScale();
                break;
            case "quad":
                this.QuadMirrorScale();
                break;
            case "whiteandblack":
                this.WhiteAndBlackScale();
                break;
            case "hazydays":
                this.HazyDays();
                break;
            case "truered":
                this.TrueRedScale();
                break;
            case "trueblue":
                this.TrueBlueScale();
                break;
            case "truegreen":
                this.TrueGreenScale();
                break;
            case "mirror":
                this.MirrorImageScale();
                break;
            case "diagonalleftmirror":
                this.DiagonalLeftMirror();
                break;
            case "upsidedown":
                this.UpsideDownScale();
                break;
            case "upsidedownmirror":
                this.UpsideDownMirrorScale();
                break;
            case "gridvariant":
                this.GridVariant();
                break;
            case "xray":
                this.XRayScale();
                break;
            case "diagonal":
                this.DiagonalStretchScale();
                break;
            case "oldview":
                this.OldViewScale();
                break;
            case "oldtvglitch":
                this.OldTVGlitchScale();
                break;
            case "twin":
                this.TwinScale();
                break;
            case "invertblackandwhite":
                this.InvertBlackAndWhite();
                break;
            case "invertwhiteandblack":
                this.InvertWhiteAndBlack();
                break;
            case "cartoon":
                this.CartoonScale();
                break;
            case "lightcartoon":
                this.LightCartoonScale();
                break;
            case "alien":
                this.AlienScale();
                break;
            case "switch":
                this.SwitchScale();
                break;
            case "switchsplit":
                this.SwitchSplitScale();
                break;
            case "random":
                this.RandomFilterScale();
                break;
            case "rainbow":
                this.RainbowScale();
                break;
            case "crayon":
                this.CrayonColorScale();
                break;
            case "multicolorgrid":
                this.MultiColorGridScale();
                break;
            case "verticalrainbow":
                this.VerticalRainbowColorScale();
                break;
            case "reverseview":
                this.ReverseViewScale();
                break;
            case "snowfall":
                this.SnowFallScale();
                break;
            case "filmstrip":
                this.FilmStripScale();
                break;
            case "delaytime":
                this.SplitScreenScale();
                break;
            default:
                this.NormalScale();
                break;
        }
    }

    NormalScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] += 0;
            imageData.data[i+1] += 0;
            imageData.data[i+2] += 0;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    GreyScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=4){
            var avg = (data[i]+data[i+1]+data[i+2])/3;
            data[i] = data[i+1] = data[i+2] = avg;
        }
        ctx.putImageData(imageData,0,0);
    }

    InvertScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let r,g,b;
        for(let i=0;i<imageData.data.length;i+=4){
            r = imageData.data[i];
            g = imageData.data[i+1];
            b = imageData.data[i+2];
            imageData.data[i] = 255-r;
            imageData.data[i+1] = 255-g;
            imageData.data[i+2] = 255-b;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    BrightScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] += 100;
            imageData.data[i+1] += 100;
            imageData.data[i+2] += 100;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    RedScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] += 0;
            imageData.data[i+1] = 0;
            imageData.data[i+2] = 0;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    BlueScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] = 0;
            imageData.data[i+1] = 0;
            imageData.data[i+2] += 0;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    GreenScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] = 0;
            imageData.data[i+1] += 0;
            imageData.data[i+2] = 0;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    LeftMirrorScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.height;i++){
            for(let j=0;j<imageData.width/2;j++){
                let pixel = this.getPixel(imageData,imageData.width-j,i);
                imageData.data[(i*imageData.width+j)*4] = pixel.r;
                imageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    RightMirrorScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.height;i++){
            for(let j=imageData.width;j>imageData.width/2;j--){
                let pixel = this.getPixel(imageData,imageData.width-j,i);
                imageData.data[(i*imageData.width+j)*4] = pixel.r;
                imageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    getPixel(imageData,x,y){
        return{
            r:imageData.data[(y*imageData.width+x)*4+0],
            g:imageData.data[(y*imageData.width+x)*4+1],
            b:imageData.data[(y*imageData.width+x)*4+2],
            a:imageData.data[(y*imageData.width+x)*4+3]
        }
    }
    
    
    BottomMirrorScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,imageData.height-y);
                imageData.data[(y*imageData.width+x)*4] = pixel.r;
                imageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                imageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                imageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(imageData,0,0)
    }
    
    TopMirrorScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let y=imageData.height-1;y>=0;y--){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,imageData.height-y);
                imageData.data[(y*imageData.width+x)*4] = pixel.r;
                imageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                imageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                imageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(imageData,0,0)
    }
    
    GridScale(ctx,rows,column){
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        for(let i=0;i<rows;i++){
            for(let j=0;j<column;j++){
                ctx.drawImage(gridcanvas,bigcanvas.width*j/column,bigcanvas.height*i/rows);
            }
        }
    }
    
    OldViewScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]<=255&&imageData.data[i+1]<=255&&imageData.data[i+2]<=0){
                imageData.data[i] += 255;
                imageData.data[i+1] += 255;
                imageData.data[i+2] += 255;
            }
            else{
                imageData.data[i] -= imageData.data[i]/2;
                imageData.data[i+1] -= imageData.data[i+1]/2;
                imageData.data[i+2] -= imageData.data[i+2]/2;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    PentagonalMirrorScale(){
        let rows = 2,column =2;
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        newctx.stroke();
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        for(let i=0;i<rows;i++){
            for(let j=0;j<column;j++){
                ctx.drawImage(gridcanvas,bigcanvas.width*j/column,bigcanvas.height*i/rows);
            }
        }
        ctx.drawImage(gridcanvas,(bigcanvas.width*0/column)+bigcanvas.width/4,(bigcanvas.height*0/rows)+bigcanvas.height/4);
    }
    
    BlackAndWhiteScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]>=128&&imageData.data[i+1]>=128&&imageData.data[i+2]>=128){
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
            else{
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    WhiteAndBlackScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]<=64&&imageData.data[i+1]<=64&&imageData.data[i+2]<=64){
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
            else if((imageData.data[i]>64&&imageData.data[i]<128)&&(imageData.data[i+1]>64&&imageData.data[i+1]<128)&&(imageData.data[i+2]>64&&imageData.data[i+2]<128)){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else if((imageData.data[i]>128&&imageData.data[i]<192)&&(imageData.data[i+1]>128&&imageData.data[i+1]<192)&&(imageData.data[i+2]>128&&imageData.data[i+2]<192)){
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
            else{
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    QuadMirrorScale(){
        let rows = 2,column =2;
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        ctx.drawImage(gridcanvas,bigcanvas.width*0/column,bigcanvas.height*1/rows);
        this.RightMirrorScale();
        this.BottomMirrorScale();
    }

    CurvedBorder(color,linewidth){
        // let color = "black",linewidth = 50;
        this.DrawLine(0,0,this.canvas.width,0,color,linewidth);
        this.DrawLine(0,0,0,this.canvas.height,color,linewidth);
        this.DrawLine(this.canvas.width,0,this.canvas.width,this.canvas.height,color,linewidth);
        this.DrawLine(0,this.canvas.height,this.canvas.width,this.canvas.height,color,linewidth);
        this.DrawCurveEllipse(50,50,50,50,0,Math.PI,3*Math.PI/2,false);
        this.DrawCurveEllipse(this.canvas.width-50,50,50,50,0,0,-Math.PI/2,true);
        this.DrawCurveEllipse(50,this.canvas.height-50,50,50,0,Math.PI/2,Math.PI,false);
        this.DrawCurveEllipse(this.canvas.width-50,this.canvas.height-50,50,50,0,0,Math.PI/2,false);
    }

    HazyDays(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] += 100;
            imageData.data[i+1] += 50;
            imageData.data[i+2] -= 50;
        }
        ctx.putImageData(imageData,0,0);
        this.CurvedBorder("black",50);
    }

    DrawLine(x1,y1,x2,y2,color,linewidth){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = linewidth;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }

    DrawCurveEllipse(x1,y1,x2,y2,rotation,startangle,endangle,anticlockwise){
        ctx.beginPath();
        ctx.ellipse(x1,y1,x2,y2,rotation,startangle,endangle,anticlockwise);
        ctx.stroke();
        ctx.closePath();
    }

    TwinScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel1 = this.getPixel(imageData,imageData.width - x,y);
                let pixel2 = this.getPixel(imageData,x,y);
                imageData.data[(y*imageData.width+x)*4] = pixel1.r;
                imageData.data[(y*imageData.width+x)*4+1] = pixel2.g;
                imageData.data[(y*imageData.width+x)*4+2] = pixel1.b;
                imageData.data[(y*imageData.width+x)*4+3] = pixel2.a;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    InvertBlackAndWhite(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]>=128&&imageData.data[i+1]>=128&&imageData.data[i+2]>=128){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else{
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    InvertWhiteAndBlack(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]<=64&&imageData.data[i+1]<=64&&imageData.data[i+2]<=64){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else if((imageData.data[i]>64&&imageData.data[i]<128)&&(imageData.data[i+1]>64&&imageData.data[i+1]<128)&&(imageData.data[i+2]>64&&imageData.data[i+2]<128)){
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
            else if((imageData.data[i]>128&&imageData.data[i]<192)&&(imageData.data[i+1]>128&&imageData.data[i+1]<192)&&(imageData.data[i+2]>128&&imageData.data[i+2]<192)){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else{
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    CartoonScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=14){
            if(imageData.data[i]<=64&&imageData.data[i+1]<=64&&imageData.data[i+2]<=64){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else if((imageData.data[i]>64&&imageData.data[i]<128)&&(imageData.data[i+1]>64&&imageData.data[i+1]<128)&&(imageData.data[i+2]>64&&imageData.data[i+2]<128)){
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
            else if((imageData.data[i]>128&&imageData.data[i]<192)&&(imageData.data[i+1]>128&&imageData.data[i+1]<192)&&(imageData.data[i+2]>128&&imageData.data[i+2]<192)){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else{
                imageData.data[i] = 255;
                imageData.data[i+1] = 255;
                imageData.data[i+2] = 255;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    OldTVGlitchScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let num = [];
        for(let i=0;i<255;i++){
            num.push(i);
        }
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i] += num[Math.floor(Math.random()*num.length)]/1.5;
            imageData.data[i+1] += num[Math.floor(Math.random()*num.length)]/1.5;
            imageData.data[i+2] += num[Math.floor(Math.random()*num.length)]/1.5;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    AlienScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
    }
    
    SwitchScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                if(y<imageData.height/2){
                    let pixel = this.getPixel(imageData,imageData.width - x,y);
                    newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                    newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                    newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                    newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
                }
                else{
                    let pixel = this.getPixel(imageData,x,y);
                    newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                    newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                    newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                    newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
                }
            }
        }
        ctx.putImageData(newimageData,0,0);
    }

    SwitchSplitScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                if(x<imageData.width/2){
                    let pixel = this.getPixel(imageData,x,imageData.height-y);
                    newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                    newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                    newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                    newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
                }
                else{
                    let pixel = this.getPixel(imageData,x,y);
                    newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                    newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                    newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                    newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
                }
            }
        }
        ctx.putImageData(newimageData,0,0);
    }
    
    UpsideDownScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,imageData.height - y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
    }
    
    UpsideDownMirrorScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,imageData.width-x,imageData.height - y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
    }
    
    MirrorImageScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,imageData.width - x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
    }
    
    
    XRayScale(){
        // Complete but still incomplete
        let imageData = ctx.getImageData(0,0,width,height);
        let r,g,b;
        for(let i=0;i<imageData.data.length;i+=4){
            r = imageData.data[i];
            g = imageData.data[i+1];
            b = imageData.data[i+2];
            imageData.data[i] = 155-r;
            imageData.data[i+1] = 215-g;
            imageData.data[i+2] = 185-b;
        }
        ctx.putImageData(imageData,0,0);
    }
    
    DiagonalStretchScale(){
        //Complete but still Incomplete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let i=0;i<imageData.height;i++){
            for(let j=0;j<imageData.width;j++){
                let pixel = this.getPixel(imageData,Math.max(j-i,i-j),Math.max(j-i,i-j));
                newimageData.data[(i*imageData.width+j)*4] = pixel.r;
                newimageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                newimageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                newimageData.data[(i*imageData.width+j)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
    }

    KaleidoscopeScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let i=0;i<imageData.height/2;i++){
            for(let j=0;j<imageData.width/2;j++){
                let pixel = this.getPixel(imageData,imageData.width-j,i);
                newimageData.data[(i*imageData.width+j)*4] = pixel.r;
                newimageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                newimageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                newimageData.data[(i*imageData.width+j)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
        // this.LeftMirrorScale();
        // this.TopMirrorScale();
    }

    CrayonColorScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]==255||imageData.data[i+1]==255||imageData.data[i+2]==255){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else if(imageData.data[i]<=25||imageData.data[i+1]<=25||imageData.data[i+2]<=25){
                imageData.data[i] = 0;
                imageData.data[i+1] -= 50;
                imageData.data[i+2] = 0;
            }
            else if(imageData.data[i]<=75||imageData.data[i+1]<=75||imageData.data[i+2]<=75){
                imageData.data[i] -= 70;
                imageData.data[i+1] = 50;
                imageData.data[i+2] += 10;
            }
            else if(imageData.data[i]<=125||imageData.data[i+1]<=125||imageData.data[i+2]<=125){
                imageData.data[i] = 70;
                imageData.data[i+1] = 50;
                imageData.data[i+2] = 100;
            }
            else{
                imageData.data[i] += 100;
                imageData.data[i+1] += 50;
                imageData.data[i+2] += 50;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    
    TrueBlueScale(){
        //Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=4){
            if(data[i]<=data[i+2]&&data[i+1]<=data[i+2]){
                data[i] +=0;
                data[i+1] +=0;
                data[i+2] +=0;
            }
            else{
                var avg = (data[i]+data[i+1]+data[i+2])/3;
                data[i] = data[i+1] = data[i+2] = avg;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    TrueGreenScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=4){
            if(data[i]<=data[i+1]&&data[i+2]<=data[i+1]){
                data[i] +=0;
                data[i+1] +=0;
                data[i+2] +=0;
            }
            else{
                var avg = (data[i]+data[i+1]+data[i+2])/3;
                data[i] = data[i+1] = data[i+2] = avg;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    TrueRedScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=4){
            if(data[i+1]*1.5<=data[i]&&data[i+2]*1.5<=data[i]){
                data[i] +=0;
                data[i+1] +=0;
                data[i+2] +=0;
            }
            else{
                var avg = (data[i]+data[i+1]+data[i+2])/3;
                data[i] = data[i+1] = data[i+2] = avg;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    FacePartialScale(){
        // Complete but need some modification
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=4){
            if(data[i]>=data[i+1]&&data[i+1]<=data[i+2]){
                data[i] +=0;
                data[i+1] +=0;
                data[i+2] +=0;
            }
            else{
                var avg = (data[i]+data[i+1]+data[i+2])/3;
                data[i] = data[i+1] = data[i+2] = avg;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    DiagonalLeftMirror(){
        // Complete but need to be added
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.height;i++){
            for(let j=0;j<imageData.width;j++){
                let pixel = this.getPixel(imageData,i,j);
                imageData.data[(i*imageData.width+j)*4] = pixel.r;
                imageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    LightCartoonScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            if(imageData.data[i]<=64||imageData.data[i+1]<=64||imageData.data[i+2]<=64){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }
            else{
                imageData.data[i] += 0;
                imageData.data[i+1] += 0;
                imageData.data[i+2] += 0;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    GridVariant(){
        //Complete
        time++;
        if(time%500==0){
            rows = this.GetRandomNumbers(5);
        }
        this.GridScale(ctx,rows,rows);
    }

    GetRandomNumbers(range){
        return Math.ceil(Math.random()*range);
    }

    RandomFilterScale(){
        // Complete
        time++;
        if(time%500==0){
            filter = filtersarr[Math.floor(Math.random()*filtersarr.length)];
        }
        this.ApplyFilters(filter);
    }
    
    GetDistanceFromCenter(x,y){
        return Math.sqrt(Math.pow(Math.abs(width/2-x),2)+Math.pow(Math.abs(height/2-y),2))
    }
    
    DrawDiagonalLine(x,y,radius,color,linewidth){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = linewidth;
        ctx.moveTo(x+radius*1.7*Math.cos(Math.PI/4),y+radius*1.7*Math.cos(Math.PI/4));
        ctx.lineTo(x,y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    GetDistanceFromLeftCorner(x,y){
        return Math.sqrt(Math.pow(x,2)+Math.pow(Math.abs(height-y),2));
    }

    LightPinkColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] += pixel.r;
        newimageData.data[(y*imageData.width+x)*4+1] -= pixel.g;
        newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
        newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
    }
    
    RedColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] += pixel.r;
        newimageData.data[(y*imageData.width+x)*4+1] -= pixel.g;
        newimageData.data[(y*imageData.width+x)*4+2] -= pixel.b;
        newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
    }

    YellowColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] += pixel.r;
        newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
        newimageData.data[(y*imageData.width+x)*4+2] -= pixel.b;
        newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
    }

    GreenColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] -= pixel.r;
        newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
        newimageData.data[(y*imageData.width+x)*4+2] -= pixel.b;
        newimageData.data[(y*imageData.width+x)*4+3] += pixel.a;
    }

    BlueColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] -= pixel.r;
        newimageData.data[(y*imageData.width+x)*4+1] -= pixel.g+100;
        newimageData.data[(y*imageData.width+x)*4+2] += pixel.b+100;
        newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
    }

    PinkColor(newimageData,imageData,x,y){
        let pixel = this.getPixel(imageData,x,y);
        newimageData.data[(y*imageData.width+x)*4] = pixel.r + 155;
        newimageData.data[(y*imageData.width+x)*4+1] -= pixel.g+50;
        newimageData.data[(y*imageData.width+x)*4+2] += pixel.b+50;
        newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
    }

    RainbowScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(imageData);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let distance = this.GetDistanceFromLeftCorner(x,y);
                if(distance<width/4){
                    this.LightPinkColor(newimageData,imageData,x,y);
                }
                else if(distance>110&&distance<200){
                    this.RedColor(newimageData,imageData,x,y);
                }
                else if(distance>200&&distance<300){
                    this.YellowColor(newimageData,imageData,x,y);
                }
                else if(distance>300&&distance<400){
                    this.GreenColor(newimageData,imageData,x,y);
                }
                else if(distance>400&&distance<500){
                    this.BlueColor(newimageData,imageData,x,y);
                }
                else{
                    this.PinkColor(newimageData,imageData,x,y);
                }
            }
        }
        ctx.putImageData(newimageData,0,0);
    }

    MultiColorGridScale(){
        // Complete
        let column = 2,rows = 2;
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        ctx.drawImage(gridcanvas,bigcanvas.width*0/column,bigcanvas.height*0/rows);
        let imageData1 = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData1.data.length;i+=4){
            imageData1.data[i] += 0;
            imageData1.data[i+1] = 0;
            imageData1.data[i+2] = 0;
        }
        ctx.putImageData(imageData1,width/2,0);
        let imageData2 = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData2.data.length;i+=4){
            imageData2.data[i] = 0;
            imageData2.data[i+1] += 0;
            imageData2.data[i+2] = 0;
        }
        ctx.putImageData(imageData2,0,height/2);
        let imageData3 = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData3.data.length;i+=4){
            imageData3.data[i] = 0;
            imageData3.data[i+1] = 0;
            imageData3.data[i+2] += 0;
        }
        ctx.putImageData(imageData3,width/2,height/2);
    }

    
    VerticalRainbowColorScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        for(let i=0;i<imageData.height;i++){
            for(let j=0;j<imageData.width;j++){
                if(j<imageData.width/6){
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] = pixel.r;
                    imageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                    imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
                }
                else if(j>imageData.width/6&&j<2*imageData.width/6){
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] += pixel.r+100;
                    imageData.data[(i*imageData.width+j)*4+1] = pixel.g;
                    imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
                }
                else if(j>2*imageData.width/6&&j<3*imageData.width/6){
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] = pixel.r;
                    imageData.data[(i*imageData.width+j)*4+1] += pixel.g+100;
                    imageData.data[(i*imageData.width+j)*4+2] = pixel.b;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
                }
                else if(j>3*imageData.width/6&&j<4*imageData.width/6){
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] = pixel.r+100;
                    imageData.data[(i*imageData.width+j)*4+1] += pixel.g+100;
                    imageData.data[(i*imageData.width+j)*4+2] = pixel.b-10;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a-50;
                }
                else if(j>4*imageData.width/6&&j<5*imageData.width/6){
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] = pixel.r-200;
                    imageData.data[(i*imageData.width+j)*4+1] = pixel.g-100;
                    imageData.data[(i*imageData.width+j)*4+2] += pixel.b+50;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a+50;
                }
                else{
                    let pixel = this.getPixel(imageData,j,i);
                    imageData.data[(i*imageData.width+j)*4] += pixel.r;
                    imageData.data[(i*imageData.width+j)*4+1] = pixel.b;
                    imageData.data[(i*imageData.width+j)*4+2] += pixel.b;
                    imageData.data[(i*imageData.width+j)*4+3] = pixel.a;
                }
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    ReverseViewScale(){
        // Complete
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,-width/2,0);
        ctx.putImageData(newimageData,width/2,0);
    }

    GetObjectsForSnow(){
        let x = Math.floor(Math.random()*width);
        let Obj = {x:x,y:0};
        return Obj;
    }

    GenerateRandomSnow(x,y){
        let radius = 3.5;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x,y,radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    ManageSnowPath(){
        let Obj = {...this.GetObjectsForSnow()};
        let Obj2 = {...this.GetObjectsForSnow()};
        let Obj3 = {...this.GetObjectsForSnow()};
        snowarr.push(Obj);
        snowarr.push(Obj2);
        snowarr.push(Obj3);
        let i = 0;
        while(i<snowarr.length){
            snowarr[i].y+=5;
            this.GenerateRandomSnow(snowarr[i].x,snowarr[i].y);
            i++;
        }
    }

    SnowFallScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
        this.ManageSnowPath();
    }

    SplitScreenScale(){
        let column = 2,rows = 1;
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        ctx.drawImage(gridcanvas,bigcanvas.width*0/column,bigcanvas.height*0/rows);
        let imageData = ctx.getImageData(0,0,width/2,height);
        let newimageData = ctx.createImageData(width,height);
        splitscreentime++;
        if(splitscreentime<75){
            splitscreenarr.push(imageData);
        }
        else{
            splitscreenarr.push(imageData);
            newimageData = splitscreenarr.shift();
        }
        ctx.putImageData(newimageData,width/2,0);
    }

    FilmStripScale(){
        let column = 2,rows = 2;
        let gridcanvas = document.createElement("canvas");
        gridcanvas.width = width/column;
        gridcanvas.height = height/rows;
        let newctx = gridcanvas.getContext('2d');
        newctx.drawImage(ctx.canvas,0,0,gridcanvas.width,gridcanvas.height);
        ctx.clearRect(0,0,bigcanvas.width,bigcanvas.height);
        ctx.drawImage(gridcanvas,bigcanvas.width*0/column,bigcanvas.height*0/rows);
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        filmstriptime++;
        if(filmstriptime<75*rows*column){
            filmstriparr.push(imageData);
        }
        else{
            let index = 0;
            filmstriparr.push(imageData);
            newimageData = filmstriparr.shift();
            for(let i=0;i<rows;i++){
                for(let j=0;j<column;j++){
                    ctx.putImageData(filmstriparr[index*75],bigcanvas.width*j/column,bigcanvas.height*i/rows);
                    index++;
                }
            }
        }
    }

    RandomColorSpots(x,y,radius,color){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(x,y,radius,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    GetObjectsForDisco(){
        let x = Math.floor(Math.random()*width);
        let y = Math.floor(Math.random()*height);
        let Obj = {x:x,y:y};
        return Obj;
    }

    ManageDiscoPaths(){
        let Obj = {...this.GetObjectsForDisco()},numberoflights = 30;
        let color = colorsarr[Math.floor(Math.random()*colorsarr.length)];
        let num = [],length = 3;
        for(let i=0;i<length;i++){
            let radius = Math.floor(Math.random()*max);
            num.push(radius);
        }
        if(discoarr.length<numberoflights){
            discoarr.push(Obj);
        }
        let i = 0;
        while(i<discoarr.length){
            discoarr[i].y+=num[Math.random()*num.length];
            this.RandomColorSpots(discoarr[i].x,discoarr[i].y,num[Math.random()*num.length],color);
            i++;
        }
    }

    DiscoScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
        this.ManageDiscoPaths();
        // this.RandomColorSpots(100,100,10,"lime");
    }
    
    GenerateRandomSparkles(x,y,radius,color){
        let linewidth = 5;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.arc(x,y,radius,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // Instead of Drawing lines create a linear gradient here
        this.DrawDiagonalLine(x,y,radius,color,linewidth);
    }

    MintScale(){
        // Complete but not added
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=2){
            var sum = (data[i]+data[i+1]+data[i+2]);
            data[i] = sum/3+25;
            data[i+1] = sum/2+25;
            data[i+2] = sum+25;
        }
        ctx.putImageData(imageData,0,0);
    }

    PatanahiScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let data = imageData.data;
        for(let i=0;i<imageData.data.length;i+=2){
            var sum = (data[i]+data[i+1]+data[i+2]);
            data[i] = sum/5+40;
            data[i+1] = sum/5+40;
            data[i+2] = sum/5+40;
        }
        ctx.putImageData(imageData,0,0);
    }

    GenerateRandomBlackSpots(x,y){
        let radius = 2;
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(x,y,radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    ManageComicBookSpots(imageData){
        for(let i=0;i<1.4*imageData.height;i+=5){
            for(let j=0;j<imageData.width;j+=5){
                this.GenerateRandomBlackSpots(i,j);
            }
        }
    }

    ComicBookScale(){
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel = this.getPixel(imageData,x,y);
                newimageData.data[(y*imageData.width+x)*4] = pixel.r+50;
                newimageData.data[(y*imageData.width+x)*4+1] = pixel.g+50;
                newimageData.data[(y*imageData.width+x)*4+2] = pixel.b+50;
                newimageData.data[(y*imageData.width+x)*4+3] = pixel.a;
            }
        }
        ctx.putImageData(newimageData,0,0);
        this.ManageComicBookSpots(newimageData);
    }
    
    NewScale(){
        // Create Sparkle Filter
        this.GreyScale();
        let imageData = ctx.getImageData(0,0,width,height);
        let newimageData = ctx.createImageData(width,height);
        for(let y=0;y<imageData.height;y++){
            for(let x=0;x<imageData.width;x++){
                let pixel1 = this.getPixel(imageData,x,y);
                let pixel2 = this.getPixel(imageData,x+1,y);
                if(pixel1.r==pixel2.r&&pixel1.g==pixel2.g&&pixel1.b==pixel2.b&&pixel1.a==pixel2.a){
                    newimageData.data[(y*imageData.width+x)*4] = 0;
                    newimageData.data[(y*imageData.width+x)*4+1] = 0;
                    newimageData.data[(y*imageData.width+x)*4+2] = 0;
                    newimageData.data[(y*imageData.width+x)*4+3] = 0;
                }
                else{
                    newimageData.data[(y*imageData.width+x)*4] = 255;
                    newimageData.data[(y*imageData.width+x)*4+1] = 255;
                    newimageData.data[(y*imageData.width+x)*4+2] = 255;
                    newimageData.data[(y*imageData.width+x)*4+3] = 255;
                }
            }
        }
        ctx.putImageData(newimageData,0,0);
        // let imageData = ctx.getImageData(0,0,width,height);
        // for(let i=0;i<imageData.width;i+=5){
        //     for(let j=0;j<imageData.height;j+=5){
        //         ctx.putImageData(imageData,i,j);
        //     }
        // }
        // this.ManageComicBookSpots(newimageData);
        // this.GenerateRandomSparkles(50,50,30,"white");
    }
}

function Check(){
    if(width<426){
        width = 2*window.innerWidth/5;
        ratio = 1;
        height = width*ratio;
    }
}

Check();
let Cam = new Camera(bigcanvas,width,height);

cameraon.addEventListener("click",()=>{
    Cam.startWebCam();
});

cameraoff.addEventListener("click",()=>{
    Cam.stopWebCam();
});

togglesidebar.addEventListener("click",()=>{
    sidebar.classList.remove("hidesidebar");
    sidebar.classList.add("showsidebar");
});

closebtn.addEventListener("click",()=>{
    sidebar.classList.remove("showsidebar");
    sidebar.classList.add("hidesidebar");
});

function Reset(){
    time = 0;
    splitscreentime = 0;
    splitscreenarr = [];
    snowarr = [];
    discoarr = [];
}

// Filters are given below

normal.addEventListener("click",()=>{
    filter = "normal";
});

grey.addEventListener("click",()=>{
    filter = "grey";
});

bright.addEventListener("click",()=>{
    filter = "bright";
});

reddish.addEventListener("click",()=>{
    filter = "reddish";
});

bluish.addEventListener("click",()=>{
    filter = "bluish";
});

greenish.addEventListener("click",()=>{
    filter = "greenish";
});

leftmirror.addEventListener("click",()=>{
    filter = "leftmirror";
});

rightmirror.addEventListener("click",()=>{
    filter = "rightmirror";
});

bottommirror.addEventListener("click",()=>{
    filter = "bottommirror";
});

topmirror.addEventListener("click",()=>{
    filter = "topmirror";
});

invert.addEventListener("click",()=>{
    filter = "invert";
});

grid2.addEventListener("click",()=>{
    filter = "grid2";
});

grid3.addEventListener("click",()=>{
    filter = "grid3";
});

grid4.addEventListener("click",()=>{
    filter = "grid4";
});

blackandwhite.addEventListener("click",()=>{
    filter = "blackandwhite";
});

pentagonal.addEventListener("click",()=>{
    filter = "pentagonal";
});

quad.addEventListener("click",()=>{
    filter = "quad";
});

whiteandblack.addEventListener("click",()=>{
    filter = "whiteandblack";
});

hazydays.addEventListener("click",()=>{
    filter = "hazydays";
    Reset();
});

trueblue.addEventListener("click",()=>{
    filter = "trueblue";
});

truered.addEventListener("click",()=>{
    filter = "truered";
});

truegreen.addEventListener("click",()=>{
    filter = "truegreen";
});

mirror.addEventListener("click",()=>{
    filter = "mirror";
});

diagonalleftmirror.addEventListener("click",()=>{
    filter = "diagonalleftmirror" ;
});

upsidedown.addEventListener("click",()=>{
    filter = "upsidedown";
});

upsidedownmirror.addEventListener("click",()=>{
    filter = "upsidedownmirror";
});

gridvariant.addEventListener("click",()=>{
    filter = "gridvariant";
    Reset();
});

xray.addEventListener("click",()=>{
    filter = "xray";
});

diagonal.addEventListener("click",()=>{
    filter = "diagonal"
});

oldview.addEventListener("click",()=>{
    filter = "oldview"
});

oldtvglitch.addEventListener("click",()=>{
    filter = "oldtvglitch"
});

twin.addEventListener("click",()=>{
    filter = "twin";
});

invertblackandwhite.addEventListener("click",()=>{
    filter = "invertblackandwhite";
});

invertwhiteandblack.addEventListener("click",()=>{
    filter = "invertwhiteandblack";
});

cartoon.addEventListener("click",()=>{
    filter = "cartoon";
});

lightcartoon.addEventListener("click",()=>{
    filter = "lightcartoon";
});

alien.addEventListener("click",()=>{
    filter = "alien";
});

switchview.addEventListener("click",()=>{
    filter = "switch";
});

switchsplit.addEventListener("click",()=>{
    filter = "switchsplit";
});

random.addEventListener("click",()=>{
    filter = "random";
    Reset();
});

rainbow.addEventListener("click",()=>{
    filter = "rainbow";
});

crayon.addEventListener("click",()=>{
    filter = "crayon";
});

multicolorgrid.addEventListener("click",()=>{
    filter = "multicolorgrid";
});

verticalrainbow.addEventListener("click",()=>{
    filter = "verticalrainbow";
});

reverseview.addEventListener("click",()=>{
    filter = "reverseview";
    Reset();
});

snowfall.addEventListener("click",()=>{
    filter = "snowfall";
    Reset();
});

filmstrip.addEventListener("click",()=>{
    filter = "filmstrip";
    Reset();
});

delaytime.addEventListener("click",()=>{
    filter = "delaytime";
    Reset();
});

// Take Image from canvas

takeimage.addEventListener("click",()=>{
    TakeImage();
});
function TakeImage(){
    let url = bigcanvas.toDataURL();
    let a = document.createElement("a")
    a.href = url;
    a.download = "image.png";
    a.click()
}