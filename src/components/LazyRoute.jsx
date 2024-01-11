import { Suspense } from "react";
import FullLoading from "@components/FullLoading";

export default ({ element }) => (
  <Suspense fallback={<FullLoading />}>{element}</Suspense>
);
