//Facebook
var access_token;
window.fbAsyncInit = function() {
    FB.init({
      appId      : 555896854437608, // App ID
	  channelUrl : 'http://www-scf.usc.edu/~yiyonggu/channel.html',
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    // Additional init code here
	FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
    // connected
	access_token = FB.getAuthResponse()['accessToken'];
    } else if (response.status === 'not_authorized') {
    // not_authorized
	 //login();
    } else {
    // not_logged_in
	//login();
    }
    });
};

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));  
   
function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
			access_token = FB.getAuthResponse()['accessToken'];
        } else {
            // cancelled
			console.log('User cancelled login or did not fully authorize.');
        }
    });
}
   
   
if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
}



function PostImageToFacebook(filename, mimeType, imageData)
{
    var text = document.getElementById("text").value;
	if(text == '')
	{
	  alert('Please Input Your Text');
			document.getElementById("text").focus();
	}
	
	else
	{
	   login();
	   UploadImageToFacebook(filename, mimeType, imageData);
	}
}

function UploadImageToFacebook(filename, mimeType, imageData)
{
    message = document.getElementById("text").value + '\r\n\r\n' + '- From PicTex';
    var boundary = '----ThisIsTheBoundary1234567890';    
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
	formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';
	    
    xhr = new XMLHttpRequest();
	xhr.onreadystatechange = GetImageId;
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + access_token, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
	// this is the multipart/form-data boundary we'll use
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );	
}

function GetImageId()
{
   // only if req shows "loaded"
	if (xhr.readyState == 4) {
        // only if "OK"
        if (xhr.status == 200) {
		    ID_JsonText = eval("(" + xhr.responseText + ")");
			xhr_wall = new XMLHttpRequest();
			xhr_wall.open( 'Get', 'https://graph.facebook.com/' + ID_JsonText.id + '?access_token=' + access_token, true );
			xhr_wall.onreadystatechange = GetImageURL;
			xhr_wall.send();
		}
		
	}
}

function GetImageURL()
{
   if (xhr_wall.readyState == 4) {
        // only if "OK"
        if (xhr_wall.status == 200) {
		    Image_JsonText = eval("(" + xhr_wall.responseText + ")");
			PostToWall(Image_JsonText.source);
		}
	}
}

function PostToWall(ImageURL)
{
  var publish = {
    method: 'feed',
    picture: ImageURL,
   };
   function callback()
   { 
   }
   FB.ui(publish, callback);
}
