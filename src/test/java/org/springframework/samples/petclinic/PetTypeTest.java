package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.PetType;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("PetType Model Unit Tests")
public class PetTypeTest {
    @Test(description = "Should set and get name")
    @Story("PetType Getter/Setter")
    public void testSetAndGetName() {
        PetType petType = new PetType();
        petType.setName("Cat");
        assertEquals(petType.getName(), "Cat");
    }
} 