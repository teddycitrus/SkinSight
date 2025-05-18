import React, { Suspense } from "react";
import DiagnosisClient from "./DiagnosisClient";

export default function DiagnosisPage() {
  return (
    <Suspense fallback={<div>Loading diagnosis page...</div>}>
      <DiagnosisClient />
    </Suspense>
  );
}
