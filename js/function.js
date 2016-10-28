    // var life = 3;
    var time_container = document.getElementById('span_timer');  
      content = $("content"),
      questionContainer = $("question"),
      choicesContainer = $("choices"),
      scoreContainer = $("score"),
      submitBtn = $("submit"),
      currentQuestion = 0,
      quesnum = 0,
      score = 0,
      time = 4,
      askingQuestion = true;



    function timer() { 
      var timerId = setInterval(function() {
        //consolef.log(i);
        time = time - 1;
        if(time < 0) {
          //Times Up!");
          checkAnswer();
          time_container.style.color = "transparent";
          
        }else if(time < 4) {
          time_container.style.color = "red"; 
          time_container.innerHTML = time;
        }else{
          time_container.innerHTML = time;
        }
      }, 1000);
    }
    

    timer();


    function $(id) { // shortcut for document.getElementById
      return document.getElementById(id);
    }
    function askQuestion() {

      var choices = quiz[currentQuestion].choices,
        choicesHtml = "";
      // loop through choices, and create radio buttons
       for (var i = 0; i < choices.length; i++) {
        choicesHtml += "<div id='style' class='btn-group  animated button fadeInUp waves-effect btn-block'><input type='radio' name='quiz" + currentQuestion +
          "' id='choice" + (i + 1) +
          "' value='" + choices[i] + "'>" +
          " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label></div>";

        
      }
      
      // load the question
        questionContainer.textContent = "Q" + (currentQuestion+1) + ". " +
        quiz[currentQuestion].question;


      // load the choices
      choicesContainer.innerHTML = choicesHtml;
      
    }

    function checkAnswer() {
      // are we asking a question, or proceeding to next question?
      if (askingQuestion) {
        submitBtn.textContent = "Next Question";
        askingQuestion = false;
        // determine which radio button they clicked
        var userpick, correctIndex,
            radios = document.getElementsByName("quiz" + currentQuestion);

            for (var i = 0; i < radios.length; i++) {

                if (radios[i].checked) { // if this radio button is checked
                  userpick = radios[i].value;}
                  // get index of correct answer
                  if (radios[i].value == quiz[currentQuestion].correct) {
                    correctIndex = i;}
            }
            

            var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
            labelStyle.fontWeight = "bold";
            labelStyle.color = "#3b5998";


            if (userpick == quiz[currentQuestion].correct) {
                score++;}

            else {
                labelStyle.color = "red";}

            scoreContainer.textContent = "Score: " + score + " right answers out of " +
            quiz.length + " possible.";

      } else { // move to next question
        // setting up so user can ask a question
          askingQuestion = true;

          // change button text back to "Submit Answer"
          submitBtn.textContent = "Submit Answer";
          // if we're not on last question, increase question number
            if (currentQuestion < quiz.length - 1) {
              currentQuestion++;
              askQuestion();
              time = 4;}

            else {
              showFinalResults();}
      }
    }
 
 
    function showFinalResults() {
        var stime = document.getElementById('timming'),
            cat = document.getElementById('examType');
        content.innerHTML = "<br><h2>Thank you!</h2>" +
        "<h2>Below are your results:</h2>" +
        "<h2>" + score + " out of " + quiz.length + " questions, " +
        Math.round(score / quiz.length * 100) + "%</h2>";
        time = 0;
        stime.style.visibility = "hidden";
        cat.style.color = "transparent";
        window.alert = function(){
          window.alert = function(text){
            "andadshkajhd";
          }
        }
    }

    window.addEventListener("load", askQuestion, false);
    submitBtn.addEventListener("click", checkAnswer, false);
