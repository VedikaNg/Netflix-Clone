import useMovieList from "@/hooks/useMovieList";
import useCurrentUser from "@/hooks/useCurrentUser";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import InfoModal from "@/components/InfoModal";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return{
    props: {}
  }
}

export default function Home() {
  const { data: user }= useCurrentUser();
  const { data: movies = [] }= useMovieList();
  const { data: favorites = []} = useFavorites();

  return (
    <>
      <InfoModal visible onClose={()=>{}}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      
      </div>
    </>
  )
}
