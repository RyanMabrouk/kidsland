"use client";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Enums } from "@/types/database.types";
import updateData from "@/api/updateData";
import getSession from "@/api/getSession";
import useTranslation from "@/translation/useTranslation";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function LanguageSwitcher() {
  const [languages] = useState([
    { code: "fr", name: "FR", flag: "🇫🇷" },
    { code: "en", name: "EN", flag: "🇬🇧" },
  ] as { code: Enums<"languages_enum">; name: string; flag: string }[]);
  const { data: translation } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (newLang: Enums<"languages_enum">) => {
      const { session } = await getSession();
      if (!session) {
        throw new Error(translation?.lang["User is not authenticated"]);
      }
      await updateData({
        tableName: "profiles",
        match: { user_id: session.user.id },
        payload: { default_language: newLang },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lang"] });
      toast.success(
        translation?.lang["Language changed"] ?? "Language changed",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const language = languages.find(
    (lang) => lang.code === translation?.default_language,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Button
          variant="outline"
          className="w-[4rem] justify-between gap-1 p-1 text-sm"
        >
          {language?.flag} {language?.name}
          <ChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100px] focus:outline-none">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              mutate(lang.code);
            }}
            className="w-full min-w-max cursor-pointer justify-between text-sm"
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {language?.code === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
