import { useQuery } from "@tanstack/react-query";
import loading from "../assets/loading.gif";
import PlanetCard from "./PlanetCard";
export default function Planets() {
  const fetchPlanetsData = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d29fefdb6emshc22f056965ae022p17f5efjsn710a73ae2c30",
        "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
      },
    };

    const res = await fetch(
      "https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list",
      options
    );
    const data = await res.json();
    return data.slice(1, 8);
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["planetsData"],
    fetchPlanetsData
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center bg-white">
        <img src={loading} alt="earth spining" className="m-auto" />
      </div>
    );
  }

  return (
    <>
      <>
        {data.map(
          (data: {
            basicDetails: [{ mass: string; volume: string }];
            description: string;
            id: number;
            name: string;
            imgSrc: [{ img: string; imgDescription: string }];
            planetOrder: string;
            source: string;
          }) => (
            <PlanetCard data={data} />
          )
        )}
      </>
    </>
  );
}
