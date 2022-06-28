//Intro Instructions
newTrial("instructions_start",
    newHtml("instructions_start", "ins_start.html"),
    newButton("Start").wait()
);

//Consent form
newTrial("consent",
    newHtml("consent_form", "consent.html")
    ,
    newText("consent_question", "I have read this informed consent document and the material \
    contained in it has been explained to me verbally. All my questions have been answered, \
    and I freely and voluntarily choose to participate.")
        .center()
        .css("width", "800px")
        .css("margin-bottom", "50px")
    ,
    newScale("consent_answer", "I want to participate in this study.", 
            "I do not wish to participate in this study.")
        .radio()
        .labelsPosition("right")
        .vertical()
        .center()
        .css("width", "800px")
        .print()
        .wait()
        .test.selected("I do not wish to participate in this study.")
        .success(
            clear(),
            newText("leave", "You indicated that you did not want to participate in this study, so it will not begin."),
            SendResults(),
            newButton().remove().wait()
        )
); 

//Catch trials
newTrial("catch_trials",
    newText("catch1_text", "Add 2 to 4, and type the answer out in lower-case word form.")
        .center()
    ,
    newTextInput("catch_answer", "")
        .center()
        .lines(0)
        .size(100, 30)
        .print()
    ,
    newText("catch2_text", "Type the word that you hear in lower case.")
        .center()
        .css("margin-top", "50px")
        .css("margin-bottom", "15px")
    ,
    newAudio("catch2_audio", "catch_audio1.m4a")
        .center()
        .print()
    ,
    newTextInput("catch2_answer", "")
        .center()
        .lines(0)
        .size(200, 30)
        .print()
    ,
    newButton("next", "Next")
        .wait(getTextInput("catch_answer").test.text(/six/)
        .and(getTextInput("catch2_answer").test.text(/tall tree 1 2 3/)))
        
);