import { Box } from "@mui/material";
import Link from "next/link";


export default function Home() {
  return (
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Box>
      yaadbood
      </Box>


      <Link href="/event/create">
        CREATE EVENT
      </Link>
    </Box>
  );
}

