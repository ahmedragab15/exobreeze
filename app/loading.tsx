import { RotateLoader } from "react-loadly";

export default function Loading() {
  return (
    <div className="z-50 flex items-center justify-center min-h-screen">
      <RotateLoader color="#ff8080" size={60} speed={1.5} loadingText="Loading..." count={5} borderWidth={6} />
    </div>
  );
}
