import { PropsWithChildren } from "react";

export default function Label({ children }: PropsWithChildren) {
  return <label className="font-medium mb-2 block">{children}</label>;
}
