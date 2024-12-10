<?php
session_start();
include 'db.php'; // Include the database connection

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and execute the SQL statement to fetch the user
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Store user information in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username']; // Optional: store username in session

            // Return success response
            echo json_encode(["success" => true]);
        } else {
            // Invalid password
            echo json_encode(["error" => "Invalid username or password."]);
        }
    } else {
        // User not found
        echo json_encode(["error" => "Invalid username or password."]);
    }

    $stmt->close();
    $conn->close();
    exit();
}

// If the request method is not POST, return an error
echo json_encode(["error" => "Invalid request method."]);
?>