import { Container } from "@mui/material";
import dynamic from "next/dynamic";

const PriceCard = dynamic(() => import("@/components/PriceCard"), {
  ssr: false,
});

export default function CurrentPlan() {
  return;
  <Container>
    <PriceCard />
  </Container>;
}
