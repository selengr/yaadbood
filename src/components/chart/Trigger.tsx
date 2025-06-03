"use client"

import { useRouter } from "next/navigation";
import Button from "../atoms/Button/Button";

const ChartTrigger = () => {

    const router = useRouter();

    function openChart() {
        router.push("/chart")
      }

    return ( 
        <Button onClick={openChart} sx={{mx: "10px"}}>TradingView</Button>
     );
}
 
export default ChartTrigger;