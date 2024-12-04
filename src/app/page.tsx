import { redirect } from "next/navigation";
import Component from "./component";

export default function Home() {
  async function relativeRedirectAction() {
    "use server";
    return redirect("/child");
  }
  async function externalUrlRedirectAction() {
    "use server";
    return redirect("https://nextjs.org/docs");
  }

  return (
    <Component
      relativeRedirectAction={relativeRedirectAction}
      externalUrlRedirectAction={externalUrlRedirectAction}
    />
  );
}
