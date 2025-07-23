package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Specialty;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Specialty Model Unit Tests")
public class SpecialtyTest {
    @Test(description = "Should set and get name")
    @Story("Specialty Getter/Setter")
    public void testSetAndGetName() {
        Specialty specialty = new Specialty();
        specialty.setName("Dentistry");
        assertEquals(specialty.getName(), "Dentistry");
    }
} 