document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); // Select the form

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Backend API endpoint
        const apiUrl = "https://0036-41-111-178-9.ngrok-free.app/api/login/";

        try {
            // Send data to the backend using fetch
            const response = await fetch(apiUrl, {
                method: "POST", // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Send data as JSON
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                // request's mode to 'no-cors' to fetch the resource with CORS disabled
                mode: 'no-cors',
            });

            // Handle the response
            if (!response.ok) {
                const errorData = await response.json();
                alert("Login failed: " + (errorData.error || "Unknown error"));
                console.error("Login failed:", errorData);
                return;
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Save token to localStorage
            localStorage.setItem("authToken", data.token);

            // Redirect based on the user's role
            if (data.role === "admin") {
                window.location.href = "Admin_Dashboard.html"; // Redirect to admin dashboard
            } else if (data.role === "employee") {
                window.location.href = "User_Dashboard.html"; // Redirect to employee dashboard
            }
        } catch (error) {
            console.error("Error connecting to the backend:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});

function goToAuthorPage(url) {
    window.location.href = url;
}