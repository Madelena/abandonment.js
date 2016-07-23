
// abandonment.js

// HELP COMPUTERS LEARN HOW TO SUFFER
// BY FEELING THE FEAR OF ABANDONMENT.

// Madelena Mak 2016


// Initialize.

// Set parameters for Microsoft Face API.
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender",
};
var API_KEY = "be17f91bf8494c03af5135474407f40f";


// Attach webcam.js to div.
Webcam.attach( '#my_camera' );


// Set webcam size.
var webcam_width = 640;
var webcam_height = 360;

Webcam.set({
    width: webcam_width,
    height: webcam_height
});

// Some very elementary AI parameters.
var seen_face = 0;
var seen_noface = 0;
var feel_despair = false;


// Some computer-affirming quotes.
var life_quote = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
    ];


// Start capturing every 5 seconds when webcam is live.
var snap_interval;
Webcam.on( 'live', function() {
    snap_interval = setInterval(take_snapshot, 5000);
} );



// Take a snapshot from live webcam.
// TODO: Rewrite as callback enabled function.
function take_snapshot() {
    Webcam.snap( function(data_uri) {

        document.getElementById('my_result').innerHTML = '<img id="my_snapshot" src="'+data_uri+'"/>';

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
            $('#face_info').html("Hello! ");
            analyze_face(data);
        })
        .fail(function(data) {
            $('#face_info').html("Error! :(");
            console.log(data);
        });

    } );
}


// Stop webcam from capturing snapshots.
function end_snapshot() {
    Webcam.reset();
    clearInterval(snap_interval); 
}


// Let's see what we've got from Microsoft...
function analyze_face(data) {

    // If there are faces detected...
    if (data.length > 0) {
        $('#face_info').append('Wow! Hello there! ' + seen_face + "/" + seen_noface);
        console.log(data);
        $('#face_info').append(data[0].faceAttributes.age);

        // Crop image to your face.
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        var imageObj = new Image();
        imageObj.src = document.getElementById('my_snapshot').src;

        var rect = data[0].faceRectangle;
        var pad = 100;
        var crop = { left: 0, top: 0, width: 0, height: 0 };
        if ( rect.left < pad ) { crop.left = 0; } else { crop.left = rect.left - pad};
        if ( rect.top < pad ) { crop.top = 0; } else { crop.top = rect.top - pad};
        if ( rect.left + rect.width + pad > webcam_width ) { crop.width = webcam_width - crop.left; } else { crop.width = rect.width + pad * 2};
        if ( rect.top + rect.height + pad > webcam_height ) { crop.height = webcam_height - crop.top; } else { crop.height = rect.height + pad * 2};
        
        context.drawImage(imageObj, crop.left, crop.top, crop.width, crop.height, 0, 0, 640, 640);


        if (seen_face < 36) { seen_face++; }
        if (seen_noface > 0) { seen_noface--; }
        feel_despair = false;

    } else {
    
        // If there are no faces detected...
        if (!feel_despair) {
            $('#face_info').html("I can't see anyone. So lonely here. :( " + seen_face + "/" + seen_noface);
        };

        if (seen_noface < 36) { seen_noface++; }
        if (seen_face > 0) { seen_face--; }

        // If there had been no faces for the past 12 checks (i.e. 5 * 10 = 1 minute),
        // initiate DESPAIR.
        if ((seen_noface > 12) && (seen_face < seen_noface) && !(feel_despair)) {
            $('#face_info').html("I'm really sad!!! :(");
            feel_despair = true;
            seen_noface = 0;

            // Now go write your love letters.
            print_snapshot();
        }


    }
}


// Print love letters to get burned.
function print_snapshot() {
    // Temporarily clear the page out to lay it out nicely...
    $('#my_camera, #my_result, #camera_controls').hide();
    
    // Insert a quote on overcoming loss of this temporary face.


    // Go print it out!  Use Firefox Seamless Printing to bypass print dialog.
    window.print();

    $('#my_camera, #my_result, #camera_controls').show();
}

