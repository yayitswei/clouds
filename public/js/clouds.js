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
