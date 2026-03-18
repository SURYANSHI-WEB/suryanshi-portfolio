window.onload = function () {

 // Single hobby benefits list (Home section)
    var hobbyList = document.getElementById("hobby-benefits-list");
    var hobbyInput = document.getElementById("hobbyInput");
    var addHobbyBtn = document.getElementById("addHobbyBtn");

    if (hobbyList && addHobbyBtn) {
        hobbyList.querySelectorAll("li").forEach(function (item) {
            addDeleteButton(item);
        });

        addHobbyBtn.onclick = function () {
            var text = hobbyInput.value.trim();
            if (text === "") return;

            var li = document.createElement("li");
            var textSpan = document.createElement("span");
            textSpan.className = "item-text";
            textSpan.textContent = text;
            li.appendChild(textSpan);
            addDeleteButton(li);
            hobbyList.appendChild(li);

            hobbyInput.value = "";
        };
    }

    // Contact form (EmailJS)
    var form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (event) {

            event.preventDefault();

            var params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
                title: "Portfolio Contact"
            };

            var messageBox = document.getElementById("formMessage");

            emailjs.send("service_p0920sn", "template_3l1cb5i", params)
                .then(function () {
                    alert("Thank you! Your message has been sent successfully.");
                    messageBox.innerText = "Message sent successfully!";
                    messageBox.style.color = "green";

                    form.reset();

                    setTimeout(function () {
                        messageBox.innerText = "";
                    }, 3000);

                })
                .catch(function () {
                    messageBox.innerText = "Failed to send message.";
                    messageBox.style.color = "red";
                });
        });
    }

    // Date & time
    function updateDateTime() {
      var now = new Date();
      var options = {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
      };
      
      var element = document.getElementById("dateTime");
      if (element) {
          element.innerText = now.toLocaleString("en-GB", options).replace(" at", ",");
      }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Fade-in on scroll
    var fadeEls = document.querySelectorAll(".fade-in");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
        observer.observe(el);
    });
};

function addDeleteButton(li) {
    if (!li.querySelector('span.item-text')) {
        var textSpan = document.createElement('span');
        textSpan.className = 'item-text';
        textSpan.textContent = li.childNodes[0].textContent;
        li.childNodes[0].replaceWith(textSpan);
    }

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "✕";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete benefit: " + li.querySelector('.item-text').textContent.trim());
    deleteBtn.setAttribute("type", "button");

    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteBtn);
}

