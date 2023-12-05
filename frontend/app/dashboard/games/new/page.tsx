"use client";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { ROUTER } from "@/lib/ROUTER";
import { sendEvent, useWs } from "../repo";
import { Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CompititorProps {
  className?: string;
  name: string;
  username: string;
  image?: string;
}

export function Compititor({
  className,
  name,
  username,
  image,
}: CompititorProps) {
  return (
    <div className="grow border rounded min-h-[250px] p-4 w-48 flex flex-col justify-center">
      <Avatar
        src={image ?? "http://github.com/shadcn.png"}
        className="h-20 w-20 mx-auto"
      />
      <p className="font-bold mt-2 text-xl truncate">{name}</p>
      <p className="text-gray-500 truncate">@{username}</p>
    </div>
  );
}

export default function NewGame() {
  const router = useRouter();
  const status = useWs<"PENDING" | "CONNECTING" | string>("PEERING", {
    defaultValue: "CONNECTING",
  });

  useEffect(() => {
    console.log(status);
    if (status === "PENDING" || status == "CONNECTING") return;
    router.push(ROUTER.GAME(status));
  }, [status, router]);

  useEffect(() => {
    sendEvent("PEERING", {});
  }, []);

  return (
    <div className="h-screen flex flex-col items-center gap-10 justify-center">
      {status === "PENDING" && (
        <h2 className="text-2xl font-bold"> LOOK FOR A COMPATITOR </h2>
      )}
      {status === "CONNECTING" && (
        <h2 className="text-2xl font-bold"> CONNECTING </h2>
      )}
      <p className="text-2xl">
        <span className="animate-bounce w-2 h-6 inline-block">.</span>
        <span className="animate-bounce delay-100 w-2 h-6 inline-block">.</span>
        <span className="animate-bounce delay-200 w-2 h-6 inline-block">.</span>
      </p>
      <div className="flex gap-x-5 gap-y-10 flex-wrap text-center items-center">
        <Compititor name="Ismail Ait Bella" username="Ismail" />
        <div>
          <Swords className="h-24 w-24" />
        </div>
        <Compititor name="Fatima Zehra Elbouaazaoui" username="Tema" />

        <div className="w-full ">
          <Button className="mx-auto min-w-[200px] font-bold"> Cancel</Button>
        </div>
      </div>
    </div>
  );
}
