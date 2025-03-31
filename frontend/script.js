document.getElementById('signinBtn').addEventListener('click', function() {
    showModal('Sign In', 'signInForm');
});

document.getElementById('signupBtn').addEventListener('click', function() {
    showModal('Sign Up', 'signUpForm');
});

document.getElementById('closeModal').addEventListener('click', closeModal);

document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Sign In Successful!");
    closeModal();
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("SSign Up Successful!");
    closeModal();
});

function showModal(title, formId) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    document.querySelectorAll('.authForm').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}



let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-slide functionality (optional)
setInterval(() => {
    changeSlide(1);
}, 5000);

const radiusForm = document.getElementById("radiusForm");
const dataType = document.getElementById("dataType");
const valueInput = document.getElementById("valueInput");
const result = document.getElementById("result");

dataType.addEventListener("change", () => {
const selectedValue = dataType.value;
if (selectedValue === "diameter") {
    valueInput.innerHTML = `
        <label for="dataValue">Enter Diameter  </label> <br/>
        <input type="number" id="dataValue" placeholder="Enter Diameter (cm)" required>
    `;
} else if (selectedValue === "circumference") {
    valueInput.innerHTML = `
        <label for="dataValue">Enter Circumference  </label><br/>
        <input type="number" id="dataValue" placeholder="Enter Circumference (cm)" required>
    `;
} else if (selectedValue === "area") {
    valueInput.innerHTML = `
        <label for="dataValue">Enter Area  </label><br/>
        <input type="number" id="dataValue" placeholder="Enter Area (cm²)" required>
    `;
} else if (selectedValue === "area-angle") {
    valueInput.innerHTML = `
        <label for="areaValue">Enter Area  </label><br/>
        <input type="number" id="areaValue" placeholder="Enter Area (cm²)" required><br/>
        <label for="angleValue">Enter Angle  </label><br/>
        <input type="number" id="angleValue" placeholder="Enter Angle (degrees)" required>
    `;
} else if (selectedValue === "sector-area") {
    valueInput.innerHTML = `
        <label for="sectorAreaValue">Enter Sector Area  </label><br/>
        <input type="number" id="sectorAreaValue" placeholder="Enter Sector Area (cm²)" required><br/>
        <label for="sectorAngleValue">Enter Angle </label><br/>
        <input type="number" id="sectorAngleValue" placeholder="Enter Angle (degrees)" required>
    `;
}
});


document.addEventListener("DOMContentLoaded", () => {
    const radiusForm = document.getElementById("radiusForm");
    const dataType = document.getElementById("dataType");
    const valueInputDiv = document.getElementById("valueInput");
    const result = document.createElement("p");
    radiusForm.appendChild(result);

    dataType.addEventListener("change", () => {
        valueInputDiv.innerHTML = "";
        const selectedType = dataType.value;

        if (selectedType === "area-angle" || selectedType === "sector-area") {
            valueInputDiv.innerHTML = `
                <label for="value">Enter Area:</label>
                <input type="number" id="value" required>

                <label for="angle">Enter Angle:</label>
                <input type="number" id="angle" required>
            `;
        } else if (selectedType) {
            valueInputDiv.innerHTML = `
                <label for="value">Enter Value:</label>
                <input type="number" id="value" required>
            `;
        }
    });

    radiusForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const type = dataType.value;
        const value = document.getElementById("value")?.value;
        const angle = document.getElementById("angle")?.value;

        if (!type || !value) {
            result.textContent = "Please enter required values.";
            return;
        }

        let url = `http://localhost:3000/calculate-radius?type=${type}&value=${value}`;
        if (angle) {
            url += `&angle=${angle}`;
        }

        try {
            const response = await fetch(url);
            const text = await response.text();
            result.textContent = `Radius: ${text}`;
        } catch {
            result.textContent = "Error fetching radius.";
        }
    });
});

