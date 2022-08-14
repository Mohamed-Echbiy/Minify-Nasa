import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

export default function Planetloading() {
  return (
    <Div className="Container ">
      <div className="Planet_reloading_card">
        <div className="Planet-loading-img min-w-150 max-w-300">
          <Skeleton variant="rectangular" width={200} height={200} />
        </div>
        <div className="Planet-loading-info min-w-150 max-w-300">
          <Skeleton variant="text" />
        </div>
      </div>
    </Div>
  );
}
const Div = styled.div`
  & .Planet_reloading_card {
    max-width: 300;
  }
`;
