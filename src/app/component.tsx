"use client";

import { useTransition } from "react";

type Props = {
  relativeRedirectAction: () => Promise<never>;
  externalUrlRedirectAction: () => Promise<never>;
};

export default function Component({
  relativeRedirectAction,
  externalUrlRedirectAction,
}: Props) {
  const [, startTransition] = useTransition();

  return (
    <main>
      <p>
        Both of these buttons call a server action that returns a redirect (type{" "}
        <code>never</code>). The value returned by each action is logged to the
        console.
      </p>
      <p>
        Neither of them should return anything normally (unless we were to catch
        the redirect error), but the absolute URL buttons both return undefined.
      </p>
      <p>
        Note that even if I restructure the action such that it calls
        `redirect` and then returns a normal value (e.g. a number), the client
        will still receive undefined.
      </p>

      <button
        onClick={async () => {
          const result = await relativeRedirectAction();
          console.warn("Action returned: ", result);
        }}
      >
        Call server action with relative redirect
      </button>

      <button
        onClick={async () => {
          const result = await externalUrlRedirectAction();
          console.warn("Action returned: ", result);
        }}
      >
        Call server action with absolute URL redirect
      </button>

      <button
        onClick={async () =>
          startTransition(async () => {
            const result = await externalUrlRedirectAction();
            console.log("Action returned: ", result);
          })
        }
      >
        Call server action with absolute URL redirect (in a transition)
      </button>
    </main>
  );
}
