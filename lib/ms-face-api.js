// Microsoft Face API
// Written as handy JQuery-based Javascript functions with callbacks.




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
