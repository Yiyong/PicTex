
var pic_width = 640;
var pic_height = 640;
var len = 30;

var t_background = new Array();
var t_font = new Array();
var t_textAlign = new Array();
var t_textBaseline = new Array();
var t_startX = new Array();
var t_startY = new Array();
var t_font_size = new Array();
var t_font_color = new Array();

//Image
var TextImg;
var FBImage_base64;
var encodedPng;
var decodedPng;
var canvas = document.createElement('canvas');
var canvas2 = document.createElement('canvas');

function init_Template()
{   
   
   t_background[1] = "camera/template1o.jpg";
   t_font[1] = "Kunstler Script";
   t_textAlign[1] = "center";
   t_font_size[1] = "60";
   t_font_color[1] = "black";
   t_startX[1] = 70;
   t_startY[1] = 70;
   
   t_background[2] = "camera/template2o.jpg";
   t_font[2] = "Freestyle Script";
   t_textAlign[2] = "center";
   t_font_size[2] = "60";
   t_font_color[2] = "white";
   t_startX[2] = 70;
   t_startY[2] = 70;
   
   t_background[3] = "camera/template3o.jpg";
   t_font[3] = "Highlight LET";
   t_textAlign[3] = "center";
   t_font_size[3] = "50";
   t_font_color[3] = "white";
   t_startX[3] = 70;
   t_startY[3] = 70;
   
   t_background[4] = "camera/template4o.jpg";
   t_font[4] = "Mistral";
   t_textAlign[4] = "center";
   t_font_size[4] = "60";
   t_font_color[4] = "white";
   t_startX[4] = 70;
   t_startY[4] = 70;
}

function textToImg(i) {

		var txt = document.getElementById("text").value;	
		if (txt == '') {
			alert('Please Input Your Text');
			document.getElementById("text").focus();
		}
		else 
		{
		canvas.width = pic_width;
		canvas.height = pic_height;
		var context = canvas.getContext('2d');
		
		
		var background = new Image();
         background.onload = function(){
            context.drawImage(background,0,0,pic_width,pic_height);
          };
		background.crossOrigin = ''; 
        background.src = t_background[i];
		
		//canvas2 = document.getElementById("c2");
		context2 = canvas2.getContext('2d');
		context2.drawImage(canvas, 0, 0) // paint first canvas onto new canvas
        context.clearRect(0, 0, pic_width, pic_height) // clear first canvas
        context.drawImage(background, 0, 0) // draw image on first canvas
        context.drawImage(canvas2, 0, 0)
		
	    var fontSize = t_font_size[i] || 25;
		context.fillStyle = t_font_color[i];
		context.font = 'bold ' + fontSize + 'px '+ t_font[i];
		context.textBaseline = 'top';
		
		function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var lines = text.split('\n');

		for(var i = 0; i< lines.length; i++)
		{
		   var words = lines[i].split(' ');
           var line = words[0];   
           var testLine = line + ' ';		
		   
		   for(var n = 0; n < words.length; n++) {
           var metrics = context.measureText(testLine);
           var testWidth = metrics.width;
           if(testWidth > maxWidth) {
		      if(context.measureText(line).width > maxWidth)
			  {
			     var index = line.length-1;
		         for(var j = line.length-1;i>=0;j--)
		         {
		           if(context.measureText(line.substring(0,j)).width <= maxWidth)
			      {
			        index = j;
			        break;
			      }			 
		         }
		         context.fillText(line.substring(0,index-1)+'-',x,y);
		         y += lineHeight;
		         context.fillText('\n', x, y);		   
		         line = line.substring(index-1,line.length);
			 }
			  else
			  {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
			  }
            }
            else {
            line = testLine;
           }
            if(n+1<words.length)		   
		    testLine = line + ' ' + words[n+1];
         }
		 while(context.measureText(line).width > maxWidth)
		 {
		    var templine = '';
			var index = line.length-1;
		    for(var j = line.length-1;i>=0;j--)
		    {
		           if(context.measureText(line.substring(0,j)).width <= maxWidth)
			      {
			        index = j;
			        break;
			      }			 
		    }
		    context.fillText(line.substring(0,index-1)+'-',x,y);
		    y += lineHeight;
		    context.fillText('\n', x, y);		   
		    line = line.substring(index-1,line.length);
		 }
		
		    context.fillText(line, x, y);	 
		    y += lineHeight;
		    context.fillText('\n', x, y);
		}
        
      }

	    var maxWidth = 540;
        var lineHeight = 60;
        var x = t_startX[i];
        var y = t_startY[i];
		
		wrapText(context, txt, x, y, maxWidth, lineHeight);
	  
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		TextImg = document.getElementById("img");
		TextImg.src = canvas.toDataURL("image/png");	
		FBImage_base64 = canvas.toDataURL("image/png");
		encodedPng = FBImage_base64.substring(FBImage_base64.indexOf(',')+1,FBImage_base64.length);
        decodedPng = Base64Binary.decode(encodedPng);
		}
		
	}