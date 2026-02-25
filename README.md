# Smart AI Email Assistant

## Description
The Smart AI Email Assistant is a powerful tool designed to streamline email writing by leveraging advanced AI technology. This project consists of multiple components that work together to enhance user experience and productivity.

## Architecture
The architecture of the Smart AI Email Assistant is modular, consisting of three main components, each dedicated to handling specific tasks related to email writing and management.

## Components

### email-writer-ext
This module serves as the extension layer for integrating AI capabilities into email writing tools. It encapsulates the logic that processes user inputs and generates intelligent suggestions to improve email content.

### email-writer-react
This module is a user-friendly interface built using React. It allows users to interact with the Smart AI Email Assistant effortlessly, providing a smooth and responsive experience for writing and managing emails.

### email-writer-sb
The email-writer-sb module is responsible for the backend services that support the functionalities of the email-writer-ext and email-writer-react components. It manages data storage, user authentication, and API endpoints for seamless communication between the frontend and backend.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/realrohitsingh/smart-ai-email-assistant.git
   cd smart-ai-email-assistant
   ```

2. Install dependencies:
   For each module, navigate to its directory and run the following command:
   ```bash
   npm install
   ```

3. Run the application:
   - For the React frontend, use:
     ```bash
     npm start
     ```
   - Ensure that the backend is running by following the instructions in the email-writer-sb module.

## Features
- Intelligent email suggestions powered by AI.
- User-friendly interface for a smooth email writing experience.
- Modular architecture for easy maintenance and scalability.
- Support for multiple features to enhance email productivity.

## Contributing
Contributions are welcome! Please submit a pull request or raise an issue to contribute to this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.