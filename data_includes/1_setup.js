PennController.ResetPrefix(null) 

Sequence(
	//SETUP
    "introduction",  //Introduction to the study
    "consent",       //Consent form
    "instructions_catch_trials", //Catch trials instructions
    "catch_trials",  //Catch trials
	//EXPERIMENT -- STUDY
	"instructions_study",      //Instructions to the study phase
    randomize("trials_study"), //Study trials
    //EXPERIMENT -- TEST
    "instructions_test",       //Instructions to the test phase
    randomize("trials_test"),  //Test trials
    //DEMOGRAPHICS, END
    "demographics",         //Demographics questions
    SendResults(),          //Send results
    "validation"            //Validation instructions <- right now has download recording option
);

//Preload images
CheckPreloaded().label("preload");

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