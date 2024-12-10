<?php
session_start();
include 'db.php'; // Include the database connection

// Handle login and signup form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'register') {
        // Signup logic
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Check if the username already exists
        $sql = "SELECT * FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Username already exists
            echo json_encode(["error" => "Username already taken. Please choose another."]);
        } else {
            // Hash the password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert the new user into the database
            $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $username, $hashed_password);

            if ($stmt->execute()) {
                // Successful signup
                echo json_encode(["success" => true]);
            } else {
                // Error during signup
                echo json_encode(["error" => "An error occurred during signup. Please try again."]);
            }
        }

        $stmt->close();
    } else {
        // Login logic
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
    }

    $conn->close();
    exit();
}

// If the request method is not POST, return an error
echo json_encode(["error" => "Invalid request method."]);
?>