PennController.ResetPrefix(null)

newTrial(
    newButton("Start the experiment")
        .center()
        .print()
        .wait()
)

//Critical trials [randomized in Sequence]
Template("bell_bottoms.csv", row =>
    newTrial("trials_test",
     
        //Load images
        newImage("target", row.clothing_image).size(400,500),
        newImage("distractor", row.animal_image).size(200,200),
        
        //Load audio
        newAudio("context audio", row.audio),
        
        //Display images
        newCanvas("images", 800, 800)
            .add(0 , 0 , getImage("target") )
            .add(450 , 0 , getImage("distractor") )
            .center()
            .print()
            .log()
        ,
        
        //Play audio with instructions
        getAudio("context audio")
            .log()
            .play()
        ,
        
        newSelector("answer")
            .add(getImage("target"),getImage("distractor"))
            .shuffle()
            .keys("N","M")
            .frame("solid 5px purple")
            .log()
            .once()
            .wait()
        ,
        
        newTimer("post-trial", 500).start().wait()
    )
    
     //Log trial variables
    .log("item_id", row.item)
	.log("condition", row.condition)

)