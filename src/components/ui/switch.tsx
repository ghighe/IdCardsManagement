import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn((className = ""))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          (className =
            "absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 peer-data-[state=checked]:translate-x-6")
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
