PennController.ResetPrefix(null) 

Sequence(
	//SETUP
    "preload",             //Preload images
    "instructions_start",  //Instructions about the study
    "catch_trials",        //Catch trials
    "consent",             //Consent form
    "init",                //Get microphone permission
    "mic_test",            //Test microphone
    "counter",             //Increment group assignment counter for people who start
	//ATTITUDE QUESTIONS
	"rate_sentences",      //Acceptability/naturalness judgments
	"they_familiarity",    //Familiarity with singular they
	"transphobia_scale",   //Gender essentialism/binary attitudes
	//EXPERIMENT
    "instructions_characters",      //Introduce characters
    randomize("characters"), 
    "instructions_example_trials",  //Example trials
    randomize("trials_example"),
    "instructions_practice",        //Practice trials
    sepWith("sync", randomize("trials_practice")),
    "instructions_test",            //Test trials
    sepWith("sync", randomize("trials_test")),
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