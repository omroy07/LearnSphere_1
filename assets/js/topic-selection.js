document.addEventListener("DOMContentLoaded", function() {
    // Data for subjects and topics based on classes
    const classData = {
        11: {
            "Physics": ["Motion", "Newton's Laws of Motion", "Projectile"],
            "Chemistry": ["Atomic Structure", "Periodic Table", "Chemical Bonding"]
        },
        12: {
            "Physics": ["Electromagnetic Waves", "Ray Optics", "Electronics"]
            // "Chemistry": ["Organic Chemistry", "Solutions", "Thermodynamics"]
        }
    };

    // Get elements
    const classDropdown = document.getElementById("classDropdown");
    const subjectDropdown = document.getElementById("subjectDropdown");
    const topicDropdown = document.getElementById("topicDropdown");
    const classMenu = document.getElementById("classMenu");
    const subjectMenu = document.getElementById("subjectMenu");
    const topicMenu = document.getElementById("topicMenu");
    const continueButton = document.getElementById("continueButton");

    let selectedClass = null;
    let selectedSubject = null;
    let selectedTopic = null;

    // Populate class dropdown dynamically
    function populateClasses() {
        continueButton.disabled = true;
        // Get the classes from the classData object
        const classList = Object.keys(classData);

        // Clear existing class menu
        classMenu.innerHTML = '';

        // Add each class to the class dropdown
        classList.forEach(classNumber => {
            const li = document.createElement("li");
            li.textContent = `Class ${classNumber}`;
            li.setAttribute("data-value", classNumber);
            classMenu.appendChild(li);
        });
    }

    // Handle dropdown open/close
    function toggleDropdown(dropdownElement) {
        dropdownElement.classList.toggle("open");
    }

    // Handle class selection
    classMenu.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            selectedClass = event.target.getAttribute("data-value");
            selectedSubject = null;
            selectedTopic = null;
            document.getElementById("classSelected").textContent = `Class ${selectedClass}`;

            // Reset the subject and topic selections
            continueButton.disabled = true;
            document.getElementById("subjectSelected").textContent = "Select Subject";
            document.getElementById("topicSelected").textContent = "Select Topic";

            // Hide topic dropdown and show subject dropdown
            topicDropdown.style.display = "none";
            subjectDropdown.style.display = "block";

            populateSubjects(selectedClass);
        }
    });

    // Populate subjects based on class selection
    function populateSubjects(selectedClass) {
        subjectMenu.innerHTML = ''; // Clear previous subjects
        const subjects = Object.keys(classData[selectedClass]);
        subjects.forEach(subject => {
            const li = document.createElement("li");
            li.textContent = subject;
            li.addEventListener("click", function() {
                selectedSubject = li.textContent;
                selectedTopic = null;
                document.getElementById("subjectSelected").textContent = selectedSubject;

                // Reset topic selection
                continueButton.disabled = true;
                document.getElementById("topicSelected").textContent = "Select Topic";
                populateTopics(selectedClass, selectedSubject);
            });
            subjectMenu.appendChild(li);
        });
    }

    // Populate topics based on subject selection
    function populateTopics(selectedClass, selectedSubject) {
        topicDropdown.style.display = "block";
        topicMenu.innerHTML = ''; // Clear previous topics

        const topics = classData[selectedClass][selectedSubject];
        topics.forEach(topic => {
            const li = document.createElement("li");
            li.textContent = topic;
            li.addEventListener("click", function() {
                selectedTopic = li.textContent;
                document.getElementById("topicSelected").textContent = selectedTopic;

                // Enable the Continue button once all selections are made
                if (selectedClass && selectedSubject && selectedTopic) {
                    continueButton.disabled = false;
                }
            });
            topicMenu.appendChild(li);
        });
    }

    function redirectToTopic() {
        // const selectedClass = selectedClass;
        // const selectedSubject = selectedSubject.toLowerCase();
        // const selectedTopic = selectedTopic.toLowerCase();

        // if (selectedClass && selectedSubject && selectedTopic) {
        //     window.location.href = `./content/${className}/${subject}/${topic}/${topic}.html`;
        // } else {
        //     document.getElementById('content').innerHTML = 'Invalid or missing parameters.';
        // }
        if (selectedClass && selectedSubject && selectedTopic) {
            const topicURL = `./content/${selectedClass}/${selectedSubject.toLowerCase()}/${selectedTopic.toLowerCase()}/${selectedTopic.toLowerCase()}.html`;
            window.location.href = topicURL;  // Redirect to the topic page
        }
    }

    // Toggle class dropdown when clicked
    classDropdown.addEventListener("click", function() {
        toggleDropdown(classDropdown);
    });

    // Toggle subject dropdown when clicked
    subjectDropdown.addEventListener("click", function() {
        toggleDropdown(subjectDropdown);
    });

    // Toggle topic dropdown when clicked
    topicDropdown.addEventListener("click", function() {
        toggleDropdown(topicDropdown);
    });

    continueButton.addEventListener("click", function() {
        redirectToTopic();
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", function(event) {
        if (!classDropdown.contains(event.target)) {
            classDropdown.classList.remove("open");
        }
        if (!subjectDropdown.contains(event.target)) {
            subjectDropdown.classList.remove("open");
        }
        if (!topicDropdown.contains(event.target)) {
            topicDropdown.classList.remove("open");
        }
    });

    // Initialize by populating the class dropdown
    populateClasses();
    // continueButton.disabled = true;

    // Handle the continue button click
    // continueButton.addEventListener("click", function() {
    //     if (selectedClass && selectedSubject && selectedTopic) {
    //         // alert(`Navigating to the content for Class ${selectedClass}, Subject: ${selectedSubject}, Topic: ${selectedTopic}`);
    //         // Here you can navigate to the specific page
    //         // Example: window.location.href = `/content?class=${selectedClass}&subject=${selectedSubject}&topic=${selectedTopic}`;

    //         window.location.href = `/pages/content.html?class=${selectedClass}&subject=${selectedSubject}&topic=${selectedTopic}`;
    //     }
    // });
});