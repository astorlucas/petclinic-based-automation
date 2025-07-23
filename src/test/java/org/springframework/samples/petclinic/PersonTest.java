package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Person;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Person Model Unit Tests")
public class PersonTest {
    @Test(description = "Should set and get first name")
    @Story("Person Getter/Setter")
    public void testSetAndGetFirstName() {
        Person person = new Person();
        person.setFirstName("Alex");
        assertEquals(person.getFirstName(), "Alex");
    }
} 