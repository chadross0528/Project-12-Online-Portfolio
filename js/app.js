/**
 * Preload all project images
 */
function preloadImages() {
  $(projects).each(function() {
    $('<img/>')[0].src = 'images/' + this.preview;
  });
}


/**
 * Animates the Main Header
 * Recursevely animates the h1 element one character at a time
 * Fades in the remaining page elements in sequence
 */
function animateHeader() {
  var start = 0;
  var element = $('.main-heading');

  // Wraps each character in span blocks
  var plainText = element.text();
  var blockText = '';
  for (var i = 0; i < plainText.length; i++) {
    blockText += '<span>' + plainText[i] + '</span>';
  }
  element.html(blockText);

  // Helper function for generating a random number
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Recursevely shows each character of the main heading
  // with a random delay between each character
  function recursiveAnimate(el, start) {
    if (start < el.children().length) {
      el.children().eq(start).addClass('visible');
      setTimeout(function(){
        recursiveAnimate(el, start + 1);
      }, randomInt(30, 250));

    // On completion, call function to animate the remainign elements
    } else {
      setTimeout(function() {
        $('.main-intro').fadeIn(1000);
      }, 500);
      setTimeout(function() {
        $('.main-nav').fadeIn(1000);
      }, 1500);
      setTimeout(function() {
        $('.main-content').fadeIn(1000);
        $('.main-footer').fadeIn(1000);
      }, 2500);

    }
  }
  recursiveAnimate(element, start);
}

var activeProject;
var isAutoPlay = true;


/**
 * Renderes the .project-details element with content from the projects
 * list and replaces any existing content inside the div
 * @param project: Object
 */
function renderProjectDetails(project) {
  var html = '';

  // Assemble the HTML output to be appended to the DOM
  html += '<div class="project-preview"><img src="images/' + project.preview + '" alt=""></div>';
  html += '<h3>' + project.name + '</h3>';
  html += '<div class="project-links">';
  html += '  <a href="' + project.url + '" target="_blank" class="btn-project-view">View Live Demo</a>';
  html += '</div>';
  html += '<p>' + project.description + '</p>';

  // Fade out existing content and fade in the new one
  var h = $('.project-details').height();
  $('.project-details').height(h).fadeOut(300, function() {
    $(this).html(html).fadeIn(300, function() {
      $(this).height('auto');
    });
  });
}



/**
 * HELPER function that sets the appropriate active classes
 * to project list navigation elements
 **/
 function setActiveProject(id){
   activeProject = id;
   var navElement = $('*[data-id="' + id + '"]');
   $('.project-list li').removeClass('active');
   navElement.addClass('active');
 }



/**
 * EVENT handler for round project selectors
 * Grabs the project id from the data-id attribute and renderes the project
 */
$('.project-list li').click(function(e) {
  e.preventDefault();
  isAutoPlay = false;
  var projectId = $(this).attr('data-id');
  if (projectId !== activeProject) {
    renderProjectDetails(projects[projectId]);
    // Mark current project as active and set appropriate classes
    setActiveProject(projectId);
  }
});



/**
 * INTERVAL handler for auto playback feature
 * Keeps rotating automatically through all projects every 3 seconds
 * until the first project is selected and the isAutoPlay is set to false
 */
 var autoPlay = setInterval(function() {
   if (isAutoPlay) {
     if (activeProject === projects.length - 1) {
       setActiveProject(0);
     } else {
       setActiveProject(activeProject + 1);
     }
     renderProjectDetails(projects[activeProject]);
   } else {
     clearInterval(autoPlay);
   }
 }, 10000);




 var projects = [
  {
    "name" : "Online Registration Form",
    "url" : "https://chadross0528.github.io/OnlineRegistrationForm/",
    "description" : "In this project I had to build a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup files I designed a mobile and desktop version of the form using media queries, and a 'mobile-first' approach.",
    "preview" : "project-preview-1.jpg",
  },
  {
    "name" : "Interactive Photo Gallery",
    "url" : "https://chadross0528.github.io/Photo-Gallery-Project4/",
    "description" : "In this project, I had to create an interactive photo gallery using JavaScript and jQuery. Thumbnails and photos were provided with descriptions. At the top of the page there's a search area where photos will hide and show depending on user input. When the user clicks on a thumbnail the photo will display in a lightbox. There are back and previous buttons to cycle through photos.",
    "preview" : "project-preview-2.jpg",
  },
  {
    "name" : "Interactive Video Player",
    "url" : "https://chadross0528.github.io/Project-7-Interactive-Video-Player/",
    "description" : "In this project, I had to build an HTML5 video player using JavaScript and the HTML5 Video API. Using the supplied mockups, video files, and transcript, I built an interactive video player that synchronizes the video and the transcript. The transcript is placed below the video, and highlights as the video progresses. When a user clicks any part of the transcript it takes them to the appropriate place in the video.",
    "preview" : "project-preview-3.jpg",
  },
  {
    "name" : "Web App Dashboard",
    "url" : "https://chadross0528.github.io/Project-9-Web-App-Dashboard-master/",
    "description" : "In this project, I had to take a mockup and a few icons and build a beautiful, web dashboard complete with JavaScript-driven charts and graphs. I only had to take the design and create the HTML, CSS and JavaScript functionality for this one page -- no other pages were created, or any backend or database functionality.",
    "preview" : "project-preview-4.jpg",
  },
  {
    "name" : "Public API galley",
    "url" : "https://chadross0528.github.io/Project-10-Use-a-Public-API-to-Create-a-Gallery/",
    "description" : "In this project I used one of the provided APIs to grab, format and present data from that API. Items are presented on a page in an attractive gallery of images or titles. Clicking an image opens a lightbox prodiving detailed information about that item. This project includes Ajax calls using jQuery, pasring and formatting JSON with Javascript and a bit of CSS magic.",
    "preview" : "project-preview-5.jpg",
  },
  {
    "name" : "www.mickeygall.com",
    "url" : "http://www.mickeygall.com/",
    "description" : "This is a website I did for UFC fighter Mickey Gall.",
    "preview" : "project-preview-6.jpg",
  },
  {
    "name" : "www.caitandchadross.com",
    "url" : "http://www.caitandchadross.com/",
    "description" : "This is a website I did for my wedding on 28th May 2016. I was just starting with Treehouse and wanted to put some of my new skills to the test!",
    "preview" : "project-preview-7.jpg",
  }
];


$(document).ready(function() {

  // Preload Images
  preloadImages();

  // Smooth scrolling to local anchors
  $(function() {
    $('.main-nav a').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          var speed = 1500 / $('body').height() * target.offset().top;
          $('html, body').animate({
            scrollTop: target.offset().top
          }, speed);
          return false;
        }
    });
  });

  // Main animation sequence on page load
  setTimeout(function() {
    animateHeader();
  }, 3000);

  // Render the first project
  setActiveProject(0);
  renderProjectDetails(projects[activeProject]);
});