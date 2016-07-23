
// abandonment.js

// HELP COMPUTERS LEARN HOW TO SUFFER
// BY FEELING THE FEAR OF ABANDONMENT.

// Madelena Mak 2016


// Initialize.
// Attach webcam.js to div.
Webcam.attach( '#my_camera' );

// Set parameters for Microsoft Face API.
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender",
};
var API_KEY = "be17f91bf8494c03af5135474407f40f";

// Some very elementary AI parameters.
var seen_face = 0;
var seen_noface = 0;

// Start capturing every 5 seconds when webcam is live.
Webcam.on( 'live', function() {
    // window.setInterval(take_snapshot, 5000);
} );


// Essential for sending octet-stream to Face API. Thanks Stoive!!
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}


// Take a snapshot from live webcam.
function take_snapshot() {
    Webcam.snap( function(data_uri) {

        document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';

        var raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');

        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
            },
            type: "POST",

            // Turn Data URI into binary blob. <3
            data: dataURItoBlob(data_uri),

            // This is a MUST or this function will crap the binary data!
            processData: false,
        })
        .done(function(data) {
            analyze_face(data);
        })
        .fail(function(data) {
            $('#face_info').html("Error! :(");
            console.log(data);
        });

    } );
}


// Let's see what we've got from Microsoft...
function analyze_face(data) {
    if (data.length > 0) {
        $('#face_info').append('Wow! Hello there!');
        console.log(data);
        $('#face_info').append(data[0].faceAttributes.age);

        seen_face++;

        // Is this the same person as 5 seconds ago?

        // Is the same person 5 seconds ago still here?
    } else {
        $('#face_info').append("I can't see anyone. So lonely here. :(");

        seen_noface++;
    }
}