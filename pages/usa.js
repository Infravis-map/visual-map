import D3Example from "../components/D3Example";
import dynamic from "next/dynamic";
import Project from "../components/Project";

import fetch from "isomorphic-unfetch"; 

export async function getStaticProps() {
  try {
    const res = await fetch("http://app:8080/ping");

    const data = await res.json();

    console.log(data);
    return {
      props: {
        albums: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        albums: [],
      },
    };
  }
}

export default function TestPage( {albums} ) {
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {console.log(albums)}
      </ul>
    </div>
  );
}
