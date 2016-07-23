// Microsoft Face API
// Written as handy JQuery-based Javascript functions with callbacks.


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


function face_verify(faceId1, faceId2) {
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/verify?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "POST",
        // Request body
        data: '{ "faceId1":"' + faceId1 + '", "faceId2":"' + faceId2 + '" }',
    })
    .done(function(data) {
        alert("success");
        console.log(data);
        // confidence, isIdentical: true
    })
    .fail(function() {
        alert("error");
    });
}
