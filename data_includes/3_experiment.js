PennController.ResetPrefix(null)

//Instructions Phase 1
newTrial("instructions_study",
    defaultText
        .cssContainer({"margin-bottom":"1em","line-height":"1.5"})
        .center()
        .print()
    ,

    newText("instructions_study1", "Great job! You are now ready to begin the study."),
    
    newText("instructions_study2", " In this section, you will see two images on the screen and hear an audio instruction. Your task is to click on the image as instructed in the audio."),

    newButton("next", "Next").wait()
);

//Phase 1: Study Trials [randomized in Sequence]
Template("bell_bottoms.csv", row =>
    newTrial("trials_study",
    
        newText("study_question","Click on the image as described in the audio")
            .center()
            .cssContainer({"margin-bottom":"1em"})
        ,
     
        //Load images
        newImage("target", row.clothing_image).size(400,500),
        newImage("distractor", row.animal_image).size(300,300),
        
        //Load audio
        newAudio("context audio", row.audio),
        
        //Display images
        newCanvas("image_study", 1000, 500)
            .add( 0, 50, getImage("target") )
            .add(500, 50, getImage("distractor") )
            .print()
            .center()
            .log()
        ,
        
        //Play audio with instructions
        getAudio("context audio")
            .play()
        ,
        
        //Allow to select
        newSelector("answer_study")
            .add(getImage("target"), getImage("distractor"))
            .shuffle()
            .frame("solid 3px green")
            .log()
            .wait()
        ,
        
        newTimer("post-trial", 1000).start().wait()
    )
    
     //Log trial variables
    .log("item_id", row.item)
	.log("condition", row.condition)

);

//Instructions Phase 2
newTrial("instructions_test",
    defaultText
        .cssContainer({"margin-bottom":"1em","line-height":"1.5"})
        .center()
        .print()
    ,
  
    newText("instructions_test1", "You have reached the end of this section. You will now begin the second (and last) part of the study."),
    
    newText("instructions_test2", "In this section, you will see one image on the screen. Your task is to click <b>OLD</b> if you remember seeing that image or click <b>NEW</b> if you don't remember seeing that image from the first part of the study."),

    newButton("next", "Next").wait()
);

//Phase 2: Test Trials [randomized in Sequence]
Template("bell_bottoms_test.csv", row =>
    newTrial("trials_test",
    
        //Question
        newText("Is this clothing item OLD or NEW?").print().center().cssContainer({"margin-bottom":"1em"}),

        //Load images
        newImage("image_presented", row.image_presented).size(300,400),

        //Display images
        newCanvas("image_test", 1000, 500)
            .add(350 , 0 , getImage("image_presented") )
            .add(350 , 450 , newButton("OLD") )
            .add("right at 65%"  , 450 , newButton("NEW") )
            .add(300, 525, newText("or LEFT ARROW"))
            .add("right at 70%" , 525, newText("or RIGHT ARROW"))
            .center()
            .print()
            .log()
        ,
        
        newSelector("answer_test")
            .add(getButton("OLD"), getButton("NEW") )
            .keys("ArrowLeft","ArrowRight")
            .log()
            .wait()
        ,

        newTimer("post-trial_test", 500).start().wait() //wait 500 ms
    )
    
    //Log trial variables
    .log("item_id", row.item)
	.log("condition", row.image_status)
	.log("correct_answer", row.correct_answer)

)
