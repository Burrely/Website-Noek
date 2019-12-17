var staff;

class Staff {

    constructor(lines = 4) {

        //Config
        this.updateFPS = 24;
        this.notePixelMovementPerSecond = -100;
        this.noteLocalContentUrl = [
            "music.html",
            "shop.html",
            "tour.html",
            "biography.html",
            "contact.html"
        ];
        this.toolTipTexts = [
            "Muziek",
            "Merch",
            "Tour",
            "Biografie",
            "Contact"
        ]
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

            barNote.className = 'noteTooltip';
            noteTooltip.innerHTML = this.toolTipTexts[i];
            
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

        object.Minimize();
        
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

    Minimize = function(object = this) {

        object.staffOverlay.classList.add("minimized");
        document.body.style.overflow = "visible";

    }

    Maximize = function(object = this) {

        object.staffOverlay.classList.remove("minimized");
        document.body.style.overflow = "hidden";
        
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