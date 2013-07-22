var currentIndex = 0;
var clouds =
[
{"name": "kauai",
  "genus": "Altocumulus",
  "species": "Floccus",
  "optical": ""},
{"name": "calistoga",
  "genus": "Stratus",
  "species": "Fractus",
  "optical": ""},
{"name": "sonoma",
  "genus": "Stratocumulus",
  "species": "",
  "optical": ""},
{"name": "nihau",
  "genus": "",
  "species": "",
  "optical": "Crepuscular Rays"},
  ];


$(document).ready(function() {
  loadCloud(currentIndex);
  for (i in clouds) {
    $('#cloudthumbs').append("<li data-index=" + i + "><img class='navcloud' src='/images/"+ clouds[i].name + "-thumb.png'></li>");
  }
  $("#cloudthumbs li").click(goToCloud);
});

function loadCloud(index) {
  cloudbg = $('#cloudbg');
  cloudbg.fadeOut('slow', function() {
    cloudbg.css("background-image","url(/images/" + clouds[index].name + ".png)");
    cloudbg.fadeIn('slow');
    $('#cloudname').html(clouds[index].genus + " " + clouds[index].species + " " + clouds[index].optical);
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
