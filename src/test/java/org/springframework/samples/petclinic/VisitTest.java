package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Visit;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Visit Model Unit Tests")
public class VisitTest {
    @Test(description = "Should set and get description")
    @Story("Visit Getter/Setter")
    public void testSetAndGetDescription() {
        Visit visit = new Visit();
        visit.setDescription("Annual checkup");
        assertEquals(visit.getDescription(), "Annual checkup");
    }
} 