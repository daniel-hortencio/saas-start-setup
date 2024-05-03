"use client";

import { Button, Icon } from "@repo/ui/components";
import { cn } from "@repo/ui/lib/utils";

export const CardCategory = ({ icon, color, name, type, className }: any) => {
  return (
    <div className={cn("flex items-center justify-between py-2 ", className)}>
      <div className="rounded-full overflow-hidden">
        <div className="p-2" style={{ backgroundColor: color }}>
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
      <p className="ml-4">{name}</p>
      <span className="ml-4 border rounded-full px-2 block text-sm">
        {type === "REVENUE" ? "Receita" : "Despesa"}
      </span>
      <Button
        className="ml-auto aspect-square p-0 rounded-sm"
        variant="outline"
      >
        <Icon name="DotsThreeVertical" />
      </Button>
    </div>
  );
};
