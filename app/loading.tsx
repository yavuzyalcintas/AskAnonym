import Logo from "@/src/components/global/Logo";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black">
      <div className="animate-loader">
        <Logo width={200} height={80} />
      </div>
    </div>
  );
}

export default Loading;
