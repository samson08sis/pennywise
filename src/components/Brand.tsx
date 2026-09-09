import Image from "next/image";

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2759ba]`}>
        <Image src={"/images/logox192.png"} alt="Logo" width={24} height={24} />
      </div>
      <span
        className={`text-[17px] font-semibold tracking-tight ${
          light ? "text-white" : ""
        }`}>
        Pennywise
      </span>
    </div>
  );
}
