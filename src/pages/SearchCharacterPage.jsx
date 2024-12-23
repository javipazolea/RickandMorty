import React from "react";
import CharacterInputBox from "../components/CharacterSearchModule/CharacterInputBox";
import CharacterPagination from "../components/CharacterSearchModule/CharacterPagination";
import CharacterCardList from "../components/CharacterSearchModule/CharacterCardList";
import { CharacterProvider } from "../components/CharacterSearchModule/CharacterContext"; //solo en la page se llama al provider
import { Box, Container, Button } from "@mui/material";

function SearchCharacterPage() {
  return (
    <Container>
      <CharacterProvider>
        <Box>
          <CharacterInputBox />
        </Box>
        <Box>
          <CharacterCardList />
        </Box>
        <br></br>
        <Box>
          <CharacterPagination />
        </Box>
      </CharacterProvider>
    </Container>
  );
}

export default SearchCharacterPage;
