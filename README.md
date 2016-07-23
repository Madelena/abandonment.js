# abandonment.js
An art installation to reconcile with the fear of abandonment.

## Thesis

Abandonment is the first event we all witnessed when we were born, coming out of our mothers' wombs. The fear of abandonment was what immediately came afterwards, and those immediate seconds have a tremendous effect on how we experience life afterwards. This art installation is made by the artist to reconcile with her own fears, and to realize that the act of parting is only natural, in a humorous, absurdist yet brutal and dystopian manner.


## Technical setup

It uses webcam.js to capture the audiences every 5 seconds, and then sends the image to Microsoft Cognitive Services Face API to determine if a face is present.  The presence of a face will change the emotional scores of the program.  When the scores hit a level of 'despair', it will print out a love letter to the face it had last seen.

In the art installation, the webcam is set up in an old doll, while there is also a printer and a shredder.  Anything that gets printed out will go on a brief moment of display and remembrance, only to be fed right into the shredder for the memory to be destroyed.
