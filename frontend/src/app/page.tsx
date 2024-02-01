import { ExploreTopBooks } from "@/components/ExploreTopBooks";
import { Heros } from "@/components/Heros";
import { LibraryServices } from "@/components/LibraryServices";
import { FC } from "react";

const Home: FC<{}> = () => {
  return (
    <>
      <ExploreTopBooks />
      {/* <Carousel /> */}
      <Heros />
      <LibraryServices />
    </>
  );
}

export default Home;
