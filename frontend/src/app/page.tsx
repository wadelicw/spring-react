import { FC } from "react";
import { Carousel } from "./_components/Carousel";
import { ExploreTopBooks } from "./_components/ExploreTopBooks";
import { Heros } from "./_components/Heros";
import { LibraryServices } from "./_components/LibraryServices";

const Home: FC<{}> = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
}

export default Home;
