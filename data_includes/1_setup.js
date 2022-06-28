PennController.ResetPrefix(null) 

Sequence(
	//SETUP
    "instructions",  //Instructions about the study
    "consent",       //Consent form
    "catch_trials",  //Catch trials
	//EXPERIMENT
    randomize("trials_study"),
    randomize("trials_test"),
    //DEMOGRAPHICS, END
    "demographics",         //Demographics questions
    SendResults(),          //Send results
    "validation"            //Validation instructions <- right now has download recording option
);

//Preload images
CheckPreloaded().label("preload");

//Increment group counter at beginning
SetCounter("counter", "inc", 1);

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