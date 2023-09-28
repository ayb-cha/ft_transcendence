import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import Card from "@/components/card/Card";
import CardHeader from "@/components/card/CardHeader";
import CardBody from "@/components/card/CardBody";
import CardFooter from "@/components/card/CardFooter";
import Label from "@/components/input/Label";
import Input from "@/components/input/Input";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { AxiosError } from "axios";

export default function JoinChannelButton({
  id,
  avatar,
  name,
  type,
  topic,
}: {
  id: string;
  name: string;
  avatar: string;
  type: "PUBLIC" | "PROTECTED";
  topic: string;
}) {
  let [password, setPassword] = useState("");
  let router = useRouter();

  async function joinPublicChannel() {
    await axios.post(`/chat/channel/join/${id}`);
    mutate("/chat/channel");
    router.push(`/dashboard/chat/channel/${id}`);
  }

  async function joinProtectedChannel() {
    try {
      await axios.post(`/chat/channel/protected/${id}/join`, { password });
      mutate("/chat/channel");
      router.push(`/dashboard/chat/channel/${id}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401)
        console.log("wrong password");
    }
  }

  if (type === "PUBLIC")
    return (
      <Button className="w-32" variant="secondary" onClick={joinPublicChannel}>
        Join Channel
      </Button>
    );
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-32" variant="secondary">
          Join Channel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <Card>
          <CardHeader>Channel Password</CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4 py-4 items-center">
              <Avatar src={avatar} className="w-24 h-24 border-2" />
              <div className="text-center">
                <h3 className="font-medium text-base">{name}</h3>
                <p className="text-gray-500">{topic}</p>
              </div>
            </div>
            <div className="mb-4">
              <Label>Channel Password</Label>
              <Input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button onClick={joinProtectedChannel}>Enter Channel</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
