PennController.ResetPrefix(null) 

Sequence(
	//SETUP
    "preload",             //Preload images
    "instructions",  //Instructions about the study
    "catch_trials",        //Catch trials
    "consent",             //Consent form
	//EXPERIMENT STUDY
    randomize("trials_test"),
    // EXPERIMENT TEST
    //DEMOGRAPHICS, END
    "demographics",         //Demographics questions
    SendResults(),          //Send results
    "validation"            //Validation instructions <- right now has download recording option
);

//Preload images
CheckPreloaded().label("preload");

//Replace the URL with one that points to a PHP file on your own webserver
InitiateRecorder("https://my.server/path/to/file.php").label("init");

//Trial to upload recordings, then continue automatically.
UploadRecordings("sync","noblock");

//Default formatting
Header(
    defaultHtml
        .center()
        .print(),
    defaultButton
        .center()
        .print(),
    defaultText
        .print()
);