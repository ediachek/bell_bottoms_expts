PennController.ResetPrefix(null)

// Instructions
newTrial("instructions",
    defaultText
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "In this experiment, you will see two images and hear a sentence describing one of them.")
    ,
    newText("instructions-3", "<b>Click on the image as instructed in the sentence you hear.</b>")
    ,
    newText("instructions-4", "To start the experiment, please enter your ID and then click the button below.")
    ,
    newTextInput("input_ID")
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set(getTextInput("input_ID"))
        .log()
)

//Begin Phase 1

//Phase 1: Study trials [randomized in Sequence]
Template("bell_bottoms.csv", row =>
    newTrial("trials_study",
     
        //Load images
        newImage("target", row.clothing_image).size(400,500),
        newImage("distractor", row.animal_image).size(300,300),
        
        //Load audio
        newAudio("context audio", row.audio),
        
        //Display images
        newCanvas("image_study", 1000, 500)
            .add(0 , 0 , getImage("target") )
            .add(500 , 0, getImage("distractor") )
            .center()
            .print()
            .log()
        ,
        
        //Play audio with instructions
        getAudio("context audio")
            .play()
            .wait()
        ,
        
        //Allow to select
        newSelector("answer_study")
            .add(getImage("target"),getImage("distractor"))
            .frame("solid 5px purple")
            .log()
            .wait()
        ,
        
        newTimer("post-trial", 1000).start().wait()
    )
    
     //Log trial variables
    .log("item_id", row.item)
	.log("condition", row.condition)

)

//Continue to Phase 2
newTrial(
    newButton("Continue the experiment").center().print().wait()
)

//Phase 2: Test trials [randomized in Sequence]
Template("bell_bottoms_test.csv", row =>
    newTrial("trials_test",
    
        //Question
        newText("Click <b>OLD</b> (or press LEFT ARROW) if you remember seeing this picture during study").print().center(),
        
        newText("</br> Click <b>NEW</b> (or press RIGHT ARROW) if you <b>don't</b> remember seeing this picture during study </br>").print().center(),
     
        //Load images
        newImage("image_presented", row.image_presented).size(300,400),

        //Display images
        newCanvas("image_test", 1000, 500)
            .add(350 , 0 , getImage("image_presented") )
            .add(300 , 450 , newButton("OLD") )
            .add( "right at 75%" , 450 , newButton("NEW") )
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

        newTimer("post-trial_test", 1500).start().wait() //wait 2s
    )
    
        //Log trial variables
    .log("item_id", row.item)
	.log("condition", row.image_status)
	.log("correct_answer", row.correct_answer)

)
