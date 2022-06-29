//Demographics Questions: age, sex, gender, race, ethnicity, English

newTrial("demographics",
    newText("To wrap up, please answer these demographic questions.")
        .css({"width":"700px", "margin-top":"20px", "margin-bottom":"20px"})
		.center()
	,
	newText("<b>Age:</b>")
        .css({"width":"700px", "margin-top":"20px","text-align":"left"})
		.center()
    ,
    newTextInput("enter_age", "")
        .css("width", "200px")
        .cssContainer({"width":"700px"})
        .center()
        .print()
        .log()
    ,        
    newText("<b>What is your gender?</b>")
        .css({"width":"700px", "margin-top":"10px","text-align":"left"})
		.center()
    ,
    newTextInput("enter_gender", "")
        .css("width", "200px")
        .cssContainer({"width":"700px"})
        .center()
        .print()
        .log()
    ,
    newText("<b>How do you describe your race/ethnicity?</b>")
        .css({"width":"700px", "margin-top":"20px", "margin-bottom":"20px", "text-align":"left"})
		.center()
    ,
    newScale("enter_race", 
        "American Indian or Alaska Native", "Asian",
        "Black or African American", "Native Hawaiian or Pacific Islander",
        "Other", "Prefer not to answer")
        .checkbox()
        .labelsPosition("right")
        .vertical()
        .cssContainer({"width":"700px"})
        .center()
        .print()
        .log()
    ,
    newTextInput("enter_race_writein", "")
        .before(newText("I use a different term:"))
        .css("width", "200px")
        .cssContainer({"width":"700px", "margin-top":"5px"})
        .center()
        .print()
        .log()
    ,
	newText("ethnicity","<b>Ethnicity:</b>")
        .css({"width":"700px", "margin-top":"20px", "margin-bottom":"20px", "text-align":"left"})
		.center()
    ,
    newScale("enter_ethnicity",
        "Hispanic/Latino", "Not Hispanic/Latino", "Prefer not to answer")
        .radio()
        .labelsPosition("right")
        .vertical()
        .cssContainer("width", "700px")
        .center()
        .print()
        .log()
    ,
    newText("english", "<b>Please rate your overall ability in the English language:</b>")
        .css({"width":"700px", "margin-top":"20px","text-align":"left"})
		.center()
    ,
    newScale("enter_english", 
        "Native (learned from birth)",
        "Fully competent in speaking, listening, reading, and writing, but not native", 
        "Limited but adequate competence in speaking, reading, and writing", 
        "Restricted ability (e.g. only reading or speaking/listening)", 
        "Some familiarity (e.g. a year of instruction in school)")
        .radio()
        .labelsPosition("right")
        .vertical()
        .cssContainer({"width":"700px", "margin-top":"20px"})
        .center()
        .print()
        .log()
    ,
    newButton("Next")
        .wait(getTextInput("enter_age").test.text(/\d+/)
            .and(getTextInput("enter_gender").test.text(/\w+/))
            .and(getScale("enter_race").test.selected())
            .and(getScale("enter_english").test.selected())
)).log("PROLIFIC_ID", GetURLParameter("PROLIFIC_ID"));

//Validation Instructions
newTrial("validation",
    newText("Add Prolific validation: https://doc.pcibex.net/how-to-guides/using-prolific/")
    ,
    newText("download", DownloadRecordingButton("Click here to download the recordings."))
        .print()
    ,
    newButton("End").hidden().wait()
);