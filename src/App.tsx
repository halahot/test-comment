import { Container } from "@mui/material";
import { CommentList, CreateComment, Post } from "./components";

const App = () => {

  return (
    <Container>
      <Post/>
      <CreateComment/>
      <CommentList />
    </Container>
  );
}

export default App;

