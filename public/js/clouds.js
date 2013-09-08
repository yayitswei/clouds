var currentIndex = 0;
var clouds =
[
{"name": "kauai",
  "genus": "Altocumulus",
  "species": "Floccus",
  "optical": "",
  "description": "Crepuscular rays are sunbeams that appear to burst from clouds. In spite of being almost parallel, the rays appear to radiate from the clouds &#8211; the same optical phenomenon as railroad tracks getting wider when they get nearer.",
  "precipitation": "None/light",
  "level": "Mid-level cloud"},
{"name": "calistoga",
  "genus": "Stratus",
  "species": "Fractus",
  "optical": "",
  "description": "Crepuscular rays are sunbeams that appear to burst from clouds. In spite of being almost parallel, the rays appear to radiate from the clouds &#8211; the same optical phenomenon as railroad tracks getting wider when they get nearer.",
  "precipitation": "None/light",
  "level": "Low-level cloud"},
{"name": "sonoma",
  "genus": "Stratocumulus",
  "species": "",
  "optical": "",
  "description": "Crepuscular rays are sunbeams that appear to burst from clouds. In spite of being almost parallel, the rays appear to radiate from the clouds &#8211; the same optical phenomenon as railroad tracks getting wider when they get nearer.",
  "precipitation": "None/light",
  "level": "Low-level cloud"},
{"name": "nihau",
  "genus": "",
  "species": "",
  "optical": "Crepuscular Rays",
  "description": "Crepuscular rays are sunbeams that appear to burst from clouds. In spite of being almost parallel, the rays appear to radiate from the clouds &#8211; the same optical phenomenon as railroad tracks getting wider when they get nearer.",
  "precipitation": "None/light",
  "level": "Low-level cloud"},
  ];


$(document).ready(function() {
  loadCloud(currentIndex);
  for (i in clouds) {
    $('#cloudthumbs').append("<li data-index=" + i + "><img class='navcloud' src='/images/"+ clouds[i].name + "-thumb.png'></li>");
  }
  $("#cloudthumbs li").click(goToCloud);

  // // wire up the radio buttons
  $('body').on('change', 'input[name=genus-group]', null, checkGenusAnswer);
  $('body').on('change', 'input[name=species-group]', null, checkSpeciesAnswer);
  $('body').on('change', 'input[name=optical-group]', null, checkOpticalAnswer);

  // $('body').on('change', '.genus-radio', null, checkGenusAnswer);
  // $('body').on('change', '.species-radio', null, checkSpeciesAnswer);
  // $('body').on('change', '.optical-radio', null, checkOpticalAnswer);
});

function loadCloud(index) {
  currentIndex = index;
  cloudbg = $('#cloudbg');
  hideEverything();

  cloudbg.fadeOut('slow', function() {
    currentCloud = clouds[index];
    cloudbg.css("background-image","url(/images/" + clouds[index].name + ".png)");
    cloudbg.fadeIn('slow');
    $('#cloudname').html(clouds[index].genus + " " + clouds[index].species + " " + clouds[index].optical);
    $('#clouddescription').html(clouds[index].description);
    $('#cloudprecipitation').html(clouds[index].precipitation);
    $('#cloudlevel').html(clouds[index].level);


    // multiple choice
    // clear the old choices
    $("#genus-choices").html("");
    $("#species-choices").html("");
    $("#optical-choices").html("");
    // only add genus choices if the current cloud has one defined
    if (! _.isEmpty(currentCloud.genus)) {
      addMultipleChoice($('#genus-choices'), 'genus');
    } else {
      genusCorrect = true;
      opticalCorrect = true;
    }
    // only add species choices if the current cloud has one defined
    if (! _.isEmpty(currentCloud.species)) {
      addMultipleChoice($('#species-choices'), 'species');
    } else {
      speciesCorrect = true;
      opticalCorrect = true;
    }
    if (! _.isEmpty(currentCloud.optical)) {
      addMultipleChoice($('#optical-choices'), 'optical');
    } 
  });

}

function goPrevious() {
  if (currentIndex==0) {
    currentIndex=clouds.length-1;
  } else {
    currentIndex=currentIndex-1;
  }
  loadCloud(currentIndex);
}

function goNext() {
  if (currentIndex==clouds.length-1) {
    currentIndex=0;
  } else {
    currentIndex=currentIndex+1;
  }
  loadCloud(currentIndex);
}

function goToCloud() {
  menuItem = $(this);
  index = menuItem.data("index");
  loadCloud(index);
}

function getChoices(allAnswers, correctAnswer) {
                                // see: http://underscorejs.org/#chain
  return _.chain(allAnswers)    // this lets you chain together multiple fns
    .reject(_.isEmpty)          // remove the empty choices (e.g. not every cloud has a specie)
    .shuffle()                  // shuffle the values
    .value();                   // works with chain to return the result
}

// adds choices (radio boxes) to $element for a given field ('genus', 'species', or 'optical')
function addMultipleChoice($element, field) {
  // we know the correct answer from our current cloud, clouds[currentIndex]
  choices = getChoices(_.pluck(clouds, field), clouds[currentIndex][field]);

  // Add the instructional text
  $element.append("<h3>" + field + "</h3>");

  // loop through choices and add the radio buttons (change this to restyle)
  for (i in choices) {
    $element.append("<div class='answer-inputs'><input class='" + field +"-radio radio-hidden' type='checkbox' name='"
        + field + "-group' id='"+ choices[i] + "' value='" + choices[i] + "'> "
        + "<label class='labelbox' for='" + choices[i] +  "'>" + choices[i] + "</label>"+ "</div>");
  }
}

var speciesCorrect = false;
var genusCorrect = false;
var opticalCorrect = false;


// TODO (ceci): change these two functions to display correct/incorrect
function checkGenusAnswer() {
  userAnswer = $(this).val();
  // userAnswer = $('input[name=genus-group]').val();
  console.log('Answer ' + userAnswer);

  correctAnswer = clouds[currentIndex].genus;
  if (userAnswer==correctAnswer) {
    console.log("Correct!");
    genusCorrect = true;
    $(this).next('label').addClass('correct');

    if (speciesCorrect & genusCorrect) {
      everythingCorrect();
    }

    $('#genus-validation').html("<p>Correct!</p>");
  } else {
    console.log("Incorrect");
    genusCorrect = false;
    $(this).next('label').addClass('wrong');
    $('#genus-validation').html("<p>Incorrect</p>");
  }
  // add DOM manipulation here depending on correct/incorrect answer
}

function checkSpeciesAnswer() {
  // userAnswer = $('input[name=species-group]').val();
  userAnswer = $(this).val();
  console.log('Answer ' + userAnswer);
  correctAnswer = clouds[currentIndex].species;
  if (userAnswer==correctAnswer) {
    console.log("Correct!");
    speciesCorrect = true;
    $(this).next('label').addClass('correct');

    if (speciesCorrect & genusCorrect) {
      everythingCorrect();
    }
    $('#species-validation').html("<p>Correct!</p>");
  } else {
    speciesCorrect = false;
    console.log("Incorrect");
    $(this).next('label').addClass('wrong');

    $('#species-validation').html("<p>Incorrect</p>");
  }
  // add DOM manipulation here depending on correct/incorrect answer
  
}

function checkOpticalAnswer() {
  userAnswer = $(this).val();
  correctAnswer = clouds[currentIndex].optical;
  if (userAnswer == correctAnswer) {
    $(this).next('label').addClass('correct');

    $('#optical-validation').html("<p>Correct!</p>");
    everythingCorrect();
  }
  else {
    $(this).next('label').addClass('wrong');

    $('#optical-validation').html("<p>Incorrect</p>");
  }
}




function everythingCorrect(){
  //show cloud name
  //show cloud stats
  //show cloud desc
  //hide cloud questions
  var delayTime = 1000;
  $('.cloud-name').delay(delayTime).fadeIn();
  $('.cloud-stats').delay(delayTime).fadeIn();
  $('.cloud-desc').delay(delayTime).fadeIn();
  $('.questions').fadeOut();

}

function hideEverything(){
  $('.cloud-name').hide();
  $('.cloud-stats').hide();
  $('.cloud-desc').hide();
  $('.questions').delay(800).fadeIn();
  $('#species-validation').html("");
  $('#genus-validation').html("");
  $('#optical-validation').html("");
  genusCorrect = false;
  speciesCorrect = false;
  opticalCorrect = false;

 
}




