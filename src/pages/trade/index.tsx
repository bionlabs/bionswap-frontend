import dynamic from "next/dynamic";

// import Trade from "views/Trade";
const Trade = dynamic(() => import("../../views/Trade"), {
  ssr: false,
});

type Props = {};

const TradePage = (props: Props) => {
  return (
    <>
      <Trade />
    </>
  );
};

export default TradePage;
