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

  // wire up answer listeners
  $('body').on('change', 'input[name=genus-group]', null, checkGenusAnswer);
  $('body').on('change', 'input[name=species-group]', null, checkSpeciesAnswer);
});

function loadCloud(index) {
  cloudbg = $('#cloudbg');
  cloudbg.fadeOut('slow', function() {
    cloudbg.css("background-image","url(/images/" + clouds[index].name + ".png)");
    cloudbg.fadeIn('slow');
    $('#cloudname').html(clouds[index].genus + " " + clouds[index].species + " " + clouds[index].optical);
    $('#clouddescription').html(clouds[index].description);
    $('#cloudprecipitation').html(clouds[index].precipitation);
    $('#cloudlevel').html(clouds[index].level);
    addMultipleChoice($('#genus-choices'), 'genus');
    addMultipleChoice($('#species-choices'), 'species');
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

  // clear the element
  $element.html($element, "");

  // loop through choices and add the radio buttons (change this to restyle)
  for (i in choices) {
    $element.append("<div><input type='radio' name='"
        + field + "-group' value='" + choices[i] + "'> "
        + choices[i] + "</div>");
  }
}

function checkGenusAnswer() {
  userAnswer = $(this).val();
  correctAnswer = clouds[currentIndex].genus;
  console.log("You clicked " + userAnswer + ". The correct answer is " + correctAnswer);
}

function checkSpeciesAnswer() {
  userAnswer = $(this).val();
  correctAnswer = clouds[currentIndex].species;
  console.log("You clicked " + userAnswer + ". The correct answer is " + correctAnswer);
}
