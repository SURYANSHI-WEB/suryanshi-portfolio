window.onload = function () {

    // Hobby cards
    var hobbyCards = document.querySelectorAll(".hobby-card");

    hobbyCards.forEach(function (card) {

        var input = card.querySelector("input");
        var button = card.querySelector("button");
        var list = card.querySelector(".benefit-list");

        list.querySelectorAll("li").forEach(function (item) {
            addDeleteButton(item);
        });

        button.onclick = function () {

            var text = input.value.trim();
            if (text === "") return;
            if (list.children.length >= 5) return;

            var li = document.createElement("li");
            li.innerText = text;

            addDeleteButton(li);
            list.appendChild(li);

            input.value = "";
        };
    });

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
            second: "2-digit"
        };

        var element = document.getElementById("dateTime");
        if (element) {
            element.innerText = now.toLocaleString("en-IN", options);
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

    var deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "✕";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteBtn);
}