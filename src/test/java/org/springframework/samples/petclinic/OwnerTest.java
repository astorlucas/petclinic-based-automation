package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Owner;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Owner Model Unit Tests")
public class OwnerTest {
    @Test(description = "Should set and get first name")
    @Story("Owner Getter/Setter")
    public void testSetAndGetFirstName() {
        Owner owner = new Owner();
        owner.setFirstName("Jane");
        assertEquals(owner.getFirstName(), "Jane");
    }
} 