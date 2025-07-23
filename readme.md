# Spring Petclinic REST Backend & Frontend

This project is a RESTful backend for a veterinary clinic, with a modern static frontend for managing owners, pets, vets, visits, pet types, and specialties.

## Getting Started

### Running Locally

Clone the repository and start the backend:
```sh
git clone <repo-url>
cd spring-petclinic-rest
./mvnw spring-boot:run
```

The app will be available at [http://localhost:9966/petclinic/index.html](http://localhost:9966/petclinic/index.html)

### API Documentation
- Swagger UI: [http://localhost:9966/petclinic/swagger-ui.html](http://localhost:9966/petclinic/swagger-ui.html)
- OpenAPI Spec: [http://localhost:9966/petclinic/v3/api-docs](http://localhost:9966/petclinic/v3/api-docs)

### Database
- By default, uses in-memory H2. See `src/main/resources/application.properties` for configuration.

## Frontend Usage
- After login (user: `user`, password: `password`), you will see a dashboard with cards for each main section.
- Click a card to access Owners, Pets, Vets, Visits, Pet Types, Specialties, or About Us.
- Specialties support bulk upload via CSV.

## Project Structure
- `src/main/java/` — Backend REST API (Spring Boot)
- `src/main/resources/static/` — Frontend (HTML, CSS, JS)

# Milestones
You are expected to create a full testing and automation suite for this project.
Part of the requierement is to investigate and try to solve problems, so have that in mind.

###  📝 Documentation & Reporting  📝
- Document all designed test cases and test flows for each milestone.
- For each test run, produce a report with:
  - Results summary
  - Screenshots of failed UI tests
  - Data-sets used

### 6. CI/CD Integration (GitHub Actions)
- Set up a GitHub Actions workflow to run all tests (unit, API, UI) on each push or pull request.
- Ensure the workflow produces test reports and artifacts (e.g., screenshots).


### 1. Milestone 0 ✅
- Learn how the application works, test it using the front-end and Postman.
- Read about Springboot
- Read understand and use mockito (for basic usage) e.g.: https://www.youtube.com/watch?v=PJNcxY4I1F8

### 1. Milestone 1 ✅
- Identify classes/methods suitable for unit testing.
- You will find "Tests" already in the project for most of the classes that need to be tested.
- Implement unit tests for backend logic.
- Use TestNG as the test framework.
- Document designed test cases and use data-sets where appropriate.
- Use data-sets (e.g., CSV or JSON) to parameterize test data.
- Make a new branch e.g.: milestone-1 and push your changes, **THIS IS IMPORTANT**
- Run tests on GitHub Actions for every PR or push to main.
- Use the tools at your disposal, Allure Report, Surefire, JaCoCo, everything is adding to your result.
- Add the result and your conclusions to the final academic report.

#### Data-Set Usage
- Where tests require multiple data points (any milestone), use data-sets (e.g., CSV, JSON, or Excel).
- Example Java snippet for loading data from a CSV data-set:

```java
import java.nio.file.*;
import java.util.*;

public List<String[]> loadCsvData(String path) throws Exception {
    List<String[]> data = new ArrayList<>();
    for (String line : Files.readAllLines(Paths.get(path))) {
        data.add(line.split(","));
    }
    return data;
}
```
- Use the loaded data in your test methods to drive parameterized tests, **this is going to be evaluated**.

### 2. Milestone 2 ✅
- Validate API behavior with automated integration tests using Postman
- Create a collection of tests for each function provided by the API
- Use data-driven tests (https://www.youtube.com/watch?v=RH8b3gbujPY) **this is going to be evaluated**.
- User collection variables
- Write useful validations
- Add the collection and variables to the github respository
- Add the result and your conclusions to the final academic report.

### 2. Milestone 3 ✅
- Validate API behavior with automated integration tests using REST-assured
- Implement integration tests for all REST API endpoints.
- Cover all REST endpoints (GET, POST, PUT, DELETE).
- Use data-sets (e.g., CSV or JSON) to parameterize test data. (This is a plus, but is not required, it's doable with your knowleadge, I suggest doing it)
- Document test cases and use data-sets for parameterized tests.
- Make a new branch e.g.: milestone-2 and push your changes, **THIS IS IMPORTANT**
- Generate Allure reports.
- Run tests on GitHub Actions for every PR or push to main.
- Add the result and your conclusions to the final academic report.

### 3. Milestone 4 ✅
- Implement UI automation for the frontend using Selenium WebDriver.
- Document designed test cases and use data-sets where appropriate.
- Generate a report with results, including screenshots of failed tests.
- Cover flows for every function provided by the Front-End.
- Use the tools at your disposal, Allure Report, Surefire, JaCoCo, everything is adding to your result.
- User your knowleade as a tester to report and document bugs you found.
- Add the result and your conclusions to the final academic report.
- Make a new branch e.g.: milestone-3 and push your changes, **THIS IS IMPORTANT**