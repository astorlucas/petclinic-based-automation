package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.model.Role;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Model")
@Feature("Role Model Unit Tests")
public class RoleTest {
    @Test(description = "Should set and get name")
    @Story("Role Getter/Setter")
    public void testSetAndGetName() {
        Role role = new Role();
        role.setName("ADMIN");
        assertEquals(role.getName(), "ADMIN");
    }
} 