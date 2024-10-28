# MEI-TDW-M1 Project

## Overview

This project is a web application built using Svelte, JavaScript, and TypeScript. It includes various features and functionalities, such as displaying news and managing todos. The project is configured to use SonarCloud for code quality analysis and GitLab CI for continuous integration.

## Features

- **Responsive Design**: The application is designed to be responsive and works well on various screen sizes.
- **News Section**: A section to find some awesome news with a link to the news page.
- **Todos Management**: A layout for managing todos.
- **Code Quality**: Integrated with SonarCloud for code quality analysis.
- **Continuous Integration**: Configured with GitLab CI to run tests and perform code analysis on merge requests and main branches.

## Project Structure

- `sonar-project.properties`: Configuration file for SonarCloud.
- `.gitlab-ci.yml`: GitLab CI configuration file.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/v1centebarros/mei-tdw-m1.git
   cd mei-tdw-m1
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

To start the development server, run:

```sh
npm run dev
```

## Running Tests

To run the tests, use:

```sh
npm test
```

## Running Type Checking

```shell
npm run check
```

## Continuous Integration

The project uses GitLab CI for continuous integration. The configuration is defined in the `.gitlab-ci.yml` file. It includes the following jobs:

- **sonarcloud-check**: Runs SonarCloud analysis.
- **run-tests**: Installs dependencies and runs tests.

## Code Quality

The project is integrated with SonarCloud for code quality analysis. The configuration is defined in the `sonar-project.properties` file.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

For any inquiries, please contact [v1centebarros](https://gitlab.com/v1centebarros).
