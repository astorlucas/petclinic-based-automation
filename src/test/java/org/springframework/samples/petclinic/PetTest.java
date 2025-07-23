package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Pet;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Pet Model Unit Tests")
public class PetTest {
    @Test(description = "Should set and get name")
    @Story("Pet Getter/Setter")
    public void testSetAndGetName() {
        Pet pet = new Pet();
        pet.setName("Max");
        assertEquals(pet.getName(), "Max");
    }
} 