package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.mockito.*;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.service.ClinicServiceImpl;
import org.testng.annotations.*;
import static org.mockito.Mockito.*;
import static org.testng.Assert.*;

@Epic("Clinic Service")
@Feature("ClinicServiceImpl Unit Tests")
public class ClinicServiceImplTest {
    @Mock
    private OwnerRepository ownerRepository;

    @InjectMocks
    private ClinicServiceImpl clinicService;

    @BeforeMethod
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test(description = "Should find owner by ID")
    @Story("Find Owner")
    public void testFindOwnerById() {
        Owner owner = new Owner();
        owner.setId(1);
        when(ownerRepository.findById(1)).thenReturn(owner);

        Owner result = clinicService.findOwnerById(1);
        assertNotNull(result);
        assertEquals(result.getId(), Integer.valueOf(1));
    }
} 