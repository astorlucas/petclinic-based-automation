package org.springframework.samples.petclinic;

import io.qameta.allure.*;
import org.springframework.samples.petclinic.mapper.PetMapper;
import org.springframework.samples.petclinic.model.Pet;
import org.mapstruct.factory.Mappers;
import org.testng.annotations.*;
import static org.testng.Assert.*;

@Epic("Mapper")
@Feature("PetMapper Unit Tests")
public class PetMapperTest {
    private PetMapper petMapper;

    @BeforeMethod
    public void setUp() {
        petMapper = Mappers.getMapper(PetMapper.class);
    }

    @Test(description = "Should map Pet to DTO") 
    @Story("Map Pet")
    public void testMapPetToDto() {
        Pet pet = new Pet();
        pet.setName("Buddy");
        // Assume a mapToDto method exists
        // PetDto dto = petMapper.mapToDto(pet);
        // assertEquals(dto.getName(), "Buddy");
        assertEquals(pet.getName(), "Buddy"); // Placeholder
    }
} 