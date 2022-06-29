//Intro Instructions
newTrial("introduction",
    defaultText
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    
    newText("introduction-1", "Welcome!"),
    
    newText("introduction-2", "In this experiment, you will be viewing images and listening to the sentences that describe them."),
    
    newText("introduction-3", "To start the experiment, please enter your ID and then click the button below."),
    
    newTextInput("input_ID")
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait(getTextInput("input_ID").test.text(/[^\s]+/) //must be non-empty
            .failure(newText("Please enter your ID").css({"color":"red"}).print()))
    ,
    
    newVar("ID")
        .global()
        .set(getTextInput("input_ID"))
        .log()
);

//Consent Form
newTrial("consent",
    newHtml("consent_form", "consent.html"),
    
    newText("consent_question", "I have read this informed consent document and the material \
    contained in it has been explained to me verbally. All my questions have been answered, \
    and I freely and voluntarily choose to participate.")
        .center()
        .css("width", "800px")
        .css("margin-bottom", "40px")
        .css("margin-top", "20px")
    ,
    
    newScale("consent_answer", "I want to participate in this study.", 
            "I do not wish to participate in this study.")
        .radio()
        .labelsPosition("right")
        .vertical()
        .center()
        .css("width", "800px")
        .css("margin-bottom", "50px")
        .css("margin-bottom", "20px")
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

//Instructions Catch Trials
newTrial("instructions_catch_trials",
    defaultText
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    
    newText("instructions_sound1", "Before we begin, we will do a quick <b>sound check</b> to make sure that your sound equipment is adequate for inclusion in this study. If necessary, raise or lower the volume on your computer or device to a comfortable listening level, and put in headphones if you will be using them at this time. <b>You can play the audio multiple times until you reach comfortable volume level.</b>"),
    
    newText("instructions_sound2", "Please click next when you are ready to hear the audio."),

    //Disable NEXT button
    newButton("next","Next").print().disable(),
    
            //Display timer
    newVar("finishTime").set(v=>Date.now()+10000), //

    newText("countDown", "10").print(),
    
    // This Timer element will execute a callback after 1s
    newTimer("updateCountdown",1000).callback( 
        newVar("difference")
            .set(getVar("finishTime")).set(v=>v-Date.now())
            .test.is(v=>v>0) // Positive value means current time still below finish time
            .success(
            // Transform the Var element into an appropriately formatted string
                getVar("difference")
                    .set(v=>Math.round((v/1000)%60))
                ,
                getText("countDown").text(getVar("difference")) // Update the Text element
                ,
                // Relaunch the timer to update again in 1s
                getTimer("updateCountdown").start()
            )
            .failure(getText("countDown").remove())
    ).start(), // Don't forget to start the timer initially

    newTimer("wait",10000).start().wait(),
    
    getTimer("wait")
        .test.ended()
        .success(getButton("next").enable().wait())
        .failure(getButton("next").disable())

);

//Catch Trials
newTrial("catch_trials",
    newText("catch2_text", "Type the words that you hear in lower case.")
        .center()
        .css("margin-top", "10px")
        .css("margin-bottom", "10px")
    ,
    
    newAudio("catch_audio1", "catch_audio1.m4a")
        .center()
        .print()
    ,
    
    newTextInput("catch_answer1", "")
        .center()
        .lines(0)
        .size(200, 30)
        .print()
    ,
    
    newAudio("catch_audio2", "catch_audio2.m4a")
        .center()
        .print()
    ,
    
    newTextInput("catch_answer2", "")
        .center()
        .lines(0)
        .size(200, 30)
        .print()
    ,
    
    newButton("next", "Next")
        .wait(getTextInput("catch_answer1").test.text(/tall tree 1 2 3/)
        .and(getTextInput("catch_answer2").test.text(/3 2 1 blue sky/)))
);