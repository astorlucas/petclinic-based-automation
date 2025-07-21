# Spring Petclinic REST Backend & Modern Frontend

This project is a RESTful backend for a veterinary clinic, with a modern static frontend for managing owners, pets, vets, visits, pet types, and specialties.

## 🚀 Getting Started

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
- To use MySQL or PostgreSQL, update the active profile and use the provided Docker Compose or manual Docker commands.

## 🖥️ Frontend Usage
- After login (user: `user`, password: `password`), you will see a dashboard with cards for each main section.
- Click a card to access Owners, Pets, Vets, Visits, Pet Types, Specialties, or About Us.
- The About Us section is designed for UI automation practice and requires scrolling to interact with all content.
- Specialties support bulk upload via CSV.

## 📚 Project Structure
- `src/main/java/` — Backend REST API (Spring Boot)
- `src/main/resources/static/` — Modern static frontend (HTML, CSS, JS)
- `NO-MOSTRAR/` — Example test suites and resources (see Milestones below)

## 📝 Milestones for Students
You are expected to replicate a full testing and automation suite for this project, similar in scope and structure to the contents of the `NO-MOSTRAR` folder. Your milestones should include:

### 1. Unit Testing
- Implement unit tests for backend logic.
- Use TestNG as the test framework.
- Document designed test cases and use data-sets where appropriate.

### 2. API Integration Testing
- Implement integration tests for all REST API endpoints.
- Use REST-assured for API testing.
- Document test cases and use data-sets for parameterized tests.

### 3. UI Automation
- Implement UI automation for the new frontend using Selenium WebDriver.
- Document test case design (`diseño de casos de prueba`).
- Generate a report with results, including screenshots of failed tests.
- Cover flows for login, CRUD operations, About Us scrolling, and file upload.

### 4. Data-Set Usage
- Where tests require multiple data points, use data-sets (e.g., CSV, JSON, or Excel).
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

- Use the loaded data in your test methods to drive parameterized tests.

### 5. Documentation & Reporting
- Document all designed test cases and test flows.
- For each test run, produce a report with:
  - Results summary
  - Screenshots of failed UI tests
  - Data-sets used

### 6. CI/CD Integration (GitHub Actions)
- Set up a GitHub Actions workflow to run all tests (unit, API, UI) on each push or pull request.
- Ensure the workflow produces test reports and artifacts (e.g., screenshots).

---

## ❗ Notes
- Performance testing and Newman/Postman tests are **not required**.
- All test automation should use REST-assured for API and Selenium WebDriver for UI.
- The `NO-MOSTRAR` folder contains example test suites and resources for reference only. Do not copy; use as inspiration for your own implementation.

## 📖 Further Reading
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [REST-assured](https://rest-assured.io/)
- [TestNG](https://testng.org/)
- [Selenium WebDriver](https://www.selenium.dev/documentation/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

For questions or issues, please use the issue tracker.
