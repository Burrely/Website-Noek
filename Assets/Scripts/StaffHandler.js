var staff;

class Staff {

    constructor(lines = 4) {

        //Config
        this.updateFPS = 24;
        this.notePixelMovementPerSecond = -100;
        this.noteLocalContentUrl = [
            "index.html",
            "shop.html",
            "social.html",
            "tour.html"
        ];
        this.contentContainer = document.getElementById("Content");
        this.staffOverlay = document.getElementById("NavigationStaff"); 
        this.notes = [];

        //Initialize
        this.GenerateStaffElements(lines);
        this.AssignFunctionToNotes(this.notes);
        //this.AssignUrlsToNotes(this.noteContentUrl);

    }

    GenerateStaffElements = function(lines) {

        for(var i=0; i < lines; i++) {
            
            var barLine = document.createElement("div");
            var barNote = document.createElement("div");
            var noteImage = document.createElement("div");
            var noteTooltip = document.createElement("span");
            document.getElementById("NavigationStaff").append(barLine);
            barLine.append(barNote);
            barNote.append(noteImage);
            barNote.append(noteTooltip);

            barNote.className = 'tooltip';
            noteTooltip.innerHTML = "tool tip text! uwu";
            
            this.notes.push(barNote);

        }

    }

    AssignFunctionToNotes = function(notes) {

        for(var i=0; i < notes.length; i++) {
            var object = this;
            let currentIndex = i;
            notes[currentIndex].addEventListener("click", function() { object.OnNoteClick(object.noteLocalContentUrl[currentIndex]); });
        }

    }
    
    OnNoteClick = function(url, object = this) {

        object.staffOverlay.classList.add("minimized");
        
        var contentContainer = object.contentContainer;
        var contentRequest = new XMLHttpRequest();

        contentRequest.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                contentContainer.innerHTML = contentRequest.responseText;
            }
            
        }

        contentRequest.open("GET", url, true);
        contentRequest.send();

    }

    // ## DEPRECATED ##

    // AssignUrlsToNotes = function(urls) {
    //     for(var i=0; i < urls.length; i++) {
    //         this.notes.src = urls[i];
    //     }
    // }

    // UpdateNotes = function(thisClass, behaviour = "none") {
    //     switch(behaviour) {
    //         case "none":
    //             for(var i=0; i < thisClass.notes.length; i++) {
    //                 console.log("hoi.");
    //                 thisClass.notes[i].style.left = (thisClass.notes[i].offsetLeft + thisClass.notePixelMovementPerSecond/thisClass.updateFPS) + "px";

    //                 //If note out of window..
    //                 if (thisClass.notes[i].offsetLeft + thisClass.notes[i].offsetWidth < 0) {
    //                     thisClass.notes[i].style.left = (window.innerWidth) + "px";
    //                 }
    //             }
    //         break;
    //     }
    // }

    
}



//
window.onload = function() {
    staff = new Staff(5);
}